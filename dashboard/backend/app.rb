require 'sinatra'
require 'json'
require 'rack/cors'
require 'bcrypt'
require 'pg'
require 'openssl'
require 'base64'

use Rack::Cors do
    allow do
        origins '*'
        resource '*', headers: :any, methods: [:get, :post, :put, :delete, :options]
    end
end

options "*" do
    response.headers["Allow"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = 'Authorization, Content-Type'
    200
end

before do
    content_type :json
    headers 'Access-Control-Allow-Origin' => '*'
end


#Two Way Encryption - Key Generation (If not already present)
unless File.exist?("private.pem") && File.exist?("public.pem")
    rsa_key = OpenSSL::PKey::RSA.new(2048)
    File.write("private.pem",rsa_key.to_pem)
    File.write("public.pem",rsa_key.public_key.to_pem)
end
PRIVATE_KEY = OpenSSL::PKey::RSA.new(File.read("private.pem"))

#Sending Server's Public Key to Front end
get '/get_public_key' do
    content_type 'text/plain'
    File.read('public.pem')
end

#POSTGRESQL Connection Establishment
begin
    conn = PG.connect(
      host: ENV["DB_HOST"] ,
      dbname: ENV["DB_NAME"] ,
      port: ENV["DB_PORT"] ,
      user: ENV["DB_USER"] ,
      password: ENV["DB_PASSWORD"] 
      )
      puts "Database connection successful"
    rescue PG::Error => e
        puts "Database connection error: #{e.message}"
end
# conn = PG.connect(host: "localhost", dbname: "dashboard_task",port: 5432,user: "postgres",password: "admin123" )  

#Creating tables if they don't exist already
begin
    conn.exec <<-SQL
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        email VARCHAR(50),
        pass VARCHAR(100)
      );
    SQL
    
    conn.exec <<-SQL
      CREATE TABLE IF NOT EXISTS sessions (
        user_id int PRIMARY KEY,
        logged_in boolean
      );
    SQL
    
    conn.exec <<-SQL
      CREATE TABLE IF NOT EXISTS devices (
        user_id int,
        header varchar(50),
        count varchar(50),
        health varchar(50)
      );
    SQL
    
    puts "Tables created successfully"
rescue PG::Error => e
    puts "Error while creating tables : #{e.message}"
end


post '/login' do
    headers 'Access-Control-Allow-Origin' => '*'
    begin
        #   request.body.rewind
      data = JSON.parse(request.body.read)
      email = data['email']
      encrypted_password = data['password']
  
      # Decrypt password with private key
      password = PRIVATE_KEY.private_decrypt(Base64.decode64(encrypted_password))
  
      # Fetch user from DB
      result = conn.exec_params("SELECT * FROM users WHERE email = $1", [email])
  
      if result.ntuples == 0
        { message: "User not found..Try Signing Up",code:401 }.to_json
      end
  
      user = result[0]
  
      if BCrypt::Password.new(user['pass'].to_s) == password
        session_retrieve = conn.exec_params("SELECT * FROM SESSIONS where user_id=$1", [user["user_id"]])
        if session_retrieve.ntuples==0
          session_result = conn.exec_params("INSERT INTO SESSIONS(USER_ID,LOGGED_IN) VALUES ($1,$2)", [user["user_id"],"true"])
          { message: "Login successful", user_id: user["user_id"],code:200 }.to_json
        else
          {message: "User is Already Logged in! Continue Browsing",code:303}.to_json
        end
      else
        { message: "Invalid password..Try Again!!",code:401 }.to_json
      end
    rescue => e
      puts "Login error: #{e.message}"
      { message: "User not found..Try Signing Up", error: "Internal server error", detail: e.message }.to_json
    end
end
  

#API handling user sessions - Log Out
delete '/logout/:user_id' do
    user_id=params['user_id'].to_i
    result=conn.exec_params("DELETE FROM SESSIONS WHERE user_id=$1",[user_id])
    {code:200}.to_json
end

#API handling registration -Sign Up
post '/signup' do
    message={message:"",code:0}
    #Parsing and decrypting the password sent by user 
    data=JSON.parse(request.body.read)
    puts "DATA FROM FRONT END : "+data.to_s
    #private_key = OpenSSL::PKey::RSA.new(File.read('private.pem'))
    decrypted_password = PRIVATE_KEY.private_decrypt(Base64.decode64(data['password']))
    puts "LOGGING DECRYPTED PASSWORD : "+decrypted_password
    
    #Hasing the decrypted password for safe storage in database using BCrypt
    hashed_decrypted_password = BCrypt::Password.create(decrypted_password)
    puts "Hashed Password : "+hashed_decrypted_password
    result = conn.exec_params("SELECT COUNT(*) FROM USERS WHERE email=$1", [data['email']])
    user_exists = result[0]['count'].to_i

    #Checks if user already exists, if not, adds them to database
    if user_exists == 0 
        result=conn.exec_params("INSERT INTO USERS(email,pass) VALUES ($1,$2) RETURNING *",[data['email'],hashed_decrypted_password])
        message[:message]="Registration successful"
        message[:code]=200
    else
        message[:message]="User Already exists!! Try Logging in Again"
        message[:code]=401
    end
    message.to_json
end

#API handling device status - Add Device Status
post '/device' do
    data=JSON.parse(request.body.read)
    result=conn.exec_params("INSERT INTO DEVICES(user_id,header,count,health) VALUES ($1,$2,$3,$4)",[data['user_id'],data['header'],data['count'],data['health']]) 
end

#API handling device retrieval
get '/device/:user_id' do
    user_id=params['user_id'].to_i
    if user_id == 3
      result=conn.exec_params("SELECT * FROM DEVICES")
    else
      result=conn.exec_params("SELECT * FROM DEVICES WHERE user_id=$1",[user_id])
    end
    result.to_a.to_json
end

#API handling device update
put '/device/:user_id' do
    user_id=params['user_id'].to_i
    data=JSON.parse(request.body.read)

    #Updates count and health of device identifying them by user id, device header and old count of the device
    result = conn.exec_params(
        "UPDATE DEVICES SET count=$4, health=$5 WHERE user_id=$1 AND header=$2 AND count=$3",[user_id, data['header'], data['oldcount'], data['count'], data['health']]
    )
    status 200
end

#API handling device delete
delete '/device/:user_id' do
    user_id=params['user_id'].to_i
    data=JSON.parse(request.body.read)

    #Deletes device identifying them by all the fields 
    result = conn.exec_params(
        "DELETE FROM DEVICES WHERE user_id=$1 AND header=$2 AND count=$3 AND health=$4",[user_id, data['header'], data['count'], data['health']]
    )
    status 200
end

set :bind, '0.0.0.0'
set :port, 4500

# rsa_key = OpenSSL::PKey::RSA.new(2048)
# File.write("private.pem",rsa_key.to_pem)#PEM- Privacy Enhanced Mail
# File.write("public.pem",rsa_key.public_key.to_pem)#PEM- Privacy Enhanced Mail

#API handling login requests    
# post '/login' do
#     headers 'Access-Control-Allow-Origin' => '*'
#     message={message:"",code:0,user_id:0}

#     #Parsing the input data which has password encrypted with server's Public Key and decrypting the password using Server's Private Key
#     data=JSON.parse(request.body.read)
#     puts "DATA FROM FRONT END : "+data.to_s
#     private_key = OpenSSL::PKey::RSA.new(File.read('private.pem'))
#     decrypted_password = PRIVATE_KEY.private_decrypt(Base64.decode64(data['password']))
#     puts "LOGGING DECRYPTED PASSWORD : "+decrypted_password

#     #Executing query to retrieve password of the user (if it exists)
#     result = conn.exec_params("SELECT * FROM USERS WHERE email=$1", [data['email']])
#     if result.ntuples == 0
#         message[:message]="User Not Found. Try Creating an Account!!"
#         message[:code]=401
#         return message.to_json
#     end

#     # Comparing the hashed password with decrypted password and providing Authentication
#     puts "De-Hashed password : " + BCrypt::Password.new(result[0]['pass'].to_s)
#     if BCrypt::Password.new(result[0]['pass'].to_s) == decrypted_password
#         user_id=result[0]['user_id']
#         session_result = conn.exec_params("INSERT INTO SESSIONS(USER_ID,LOGGED_IN) VALUES ($1,$2)", [user_id,"true"])
#         message[:message]="Login successful"
#         message[:code]=200
#         message[:user_id]=user_id
#     else
#         message[:message]="Bad credentials. Try Again!!"
#         message[:code]=401
#     end
#     status 200
#     message.to_json
# end