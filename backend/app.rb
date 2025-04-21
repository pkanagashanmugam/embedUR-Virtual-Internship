require 'sinatra'
require 'json'
require 'rack/cors'
require 'bcrypt'

use Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: [:get, :post, :options]
  end
end

options "*" do
  200
end

before do
  content_type :json
  headers 'Access-Control-Allow-Origin' => '*'
end

post '/login' do
    response={
        message:"",
        code:0,
    }
    File.open("./User_details.txt","r") do |file|
        arr = file.readlines()
        user_found=0
        det=JSON.parse(request.body.read)
        email_check=det['email']
        pass_check=det['password']

        arr.each do |data|
            begin
                login = JSON.parse(data)
                if email_check == login['email']
                    user_found=1
                    if BCrypt::Password.new(login['password'].to_s) == pass_check
                        response[:message] = "Login Successful"
                        response[:code] = 200
                    else
                        response[:message] = "Incorrect Password.Try Again!"
                        response[:code] = 401
                    end
                    break
                end
            rescue JSON::ParserError => e
                puts "Failed to parse JSON: #{e.message}"
            end
        end
        if user_found == 0
            response[:message] = "Wrong Email Id Entered. Try Again or Sign Up!"
            response[:code] = 401
        end  
    end
    response.to_json
end

post '/signup' do
  response={
        message:"",
        code:0,
    }
  existing_users=[]
  File.open("./User_details.txt","r") do |file|
    arr = file.readlines()
    arr.each do |datas|
      existing_users.push(JSON.parse(datas)['email'])
    end
  end
  puts existing_users

  file=File.open("User_details.txt","a")
  data=JSON.parse(request.body.read)
  user_email=data['email']
  user_pass=BCrypt::Password.create(data['password'])

  user_crendentials = {
    email: user_email,
    password: user_pass
  } 

  if existing_users.include?(user_email)
    response[:message] = "User exists"
    response[:code] = 401
  else
    file.write(user_crendentials.to_json)
    file.write("\n")
    response[:message] = "Sign Up Successful"
    response[:code] = 200
  end
  file.close()
  return response.to_json
end

