require 'sinatra'
require 'json'
require 'rack/cors'
require 'bcrypt'
require 'pg'

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

#POSTGRESQL Connection Establishment
conn = PG.connect(host: "localhost", dbname: "dashboard_task",port: 5432,user: "postgres",password: "admin123" )  

#API handling login requests
post '/login' do
    message={message:"",code:0,user_id:0}
    data=JSON.parse(request.body.read)
    result = conn.exec_params("SELECT * FROM USERS WHERE email=$1", [data['email']])
    if result.ntuples == 0
        message[:message]="User Not Found. Try Creating an Account!!"
        message[:code]=401
        return message.to_json
    end
    if result[0]['pass'] == data['password']
        user_id=result[0]['user_id']
        session_result = conn.exec_params("INSERT INTO SESSIONS(USER_ID,LOGGED_IN) VALUES ($1,$2)", [user_id,"true"])
        message[:message]="Login successful"
        message[:code]=200
        message[:user_id]=user_id
    else
        message[:message]="Bad credentials. Try Again!!"
        message[:code]=401
    end
    status 200
    message.to_json
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
    data=JSON.parse(request.body.read)

    result = conn.exec_params("SELECT COUNT(*) FROM USERS WHERE email=$1", [data['email']])
    user_exists = result[0]['count'].to_i

    if user_exists == 0 
        result=conn.exec_params("INSERT INTO USERS(email,pass) VALUES ($1,$2) RETURNING *",[data['email'],data['password']])
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
    result=conn.exec_params("SELECT * FROM DEVICES WHERE user_id=$1",[user_id])
    result.to_a.to_json
end

#API handling device update
put '/device/:user_id' do
    user_id=params['user_id'].to_i
    data=JSON.parse(request.body.read)
    puts "UPDATE: user id : "+user_id.to_s+" data: "+data.to_s
    result = conn.exec_params(
        "UPDATE DEVICES SET count=$3, health=$4 WHERE user_id=$1 AND header=$2 ",[user_id, data['header'], data['count'], data['health']]
    )
    status 200
end

#API handling device delete
delete '/device/:user_id' do
    user_id=params['user_id'].to_i
    data=JSON.parse(request.body.read)
    puts "DELETE: user id : "+user_id.to_s+" data: "+data.to_s
    result = conn.exec_params(
        "DELETE FROM DEVICES WHERE user_id=$1 AND header=$2 AND count=$3 AND health=$4",[user_id, data['header'], data['count'], data['health']]
    )
    status 200
end