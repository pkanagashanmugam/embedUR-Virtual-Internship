#Faced some issues with rspec file so had to create a sample rspec.rb

describe HelloWorld do 
    context When testing the API calls do 
       
       it "The /login API call should return status code with a message" do 
        payload = {
            email: "cisco@gmail.com",
            password: "cisco@123"
        }

        post '/login', payload.to_json, { "CONTENT_TYPE" => "application/json" }

        expect(last_response).to be_ok
        expect(JSON.parse(last_response.body)['message']).to eq('Login Successful')
       end
       
    end 
 end