require 'sinatra'
require 'json'
require 'rack/cors'

use Rack::Cors do
  allow do
    origins '*'
    # resource '*', headers: :any, methods: [:get, :post, :put, :delete, :options]
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

devices=[]
post '/devicedet' do
  data=JSON.parse(request.body.read);
  puts data
  device_health={
    parameter:data['parameter'],
    count:data['count'],
    health:data['health']
  }
  devices.push(device_health)
  puts devices
end

get '/devicedet' do
  devices.to_json
end