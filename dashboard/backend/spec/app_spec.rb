require 'spec_helper' 
require_relative '../app.rb' 
require 'rack/test'

RSpec.describe 'API' do
  include Rack::Test::Methods

  def app
    Sinatra::Application 
  end

  describe 'when testing the /login API call' do
    it 'returns status 200  with a success message' do
      payload = {
        email: "cisco@gmail.com",
        password: "cis@cis"
      }
      header 'Content-Type', 'application/json'
      post '/login', payload.to_json

      expect(last_response.status).to eq(200)
      body = JSON.parse(request.body.read)
      puts body
      expect(body['message']).to eq('Login successful')
    end
  end
end
