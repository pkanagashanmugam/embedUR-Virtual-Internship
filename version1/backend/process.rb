require 'sinatra'
require 'json'
require 'rack/cors'

use Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: [:get, :post, :put, :delete, :options]
    # resource '*', headers: :any, methods: [:get, :post, :options]
  end
end

options "*" do
  200
end

before do
  content_type :json
  response.headers['Access-Control-Allow-Origin'] = '*'
  response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
  response.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization'
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

put '/devicedet/:parameter' do
  data=JSON.parse(request.body.read)
  parameter = params['parameter']
  device= devices.find{ |d| d[:parameter] == parameter || d["parameter"] == parameter }
  if device
    device[:count]=data['count']
    device[:health]=data['health']
  else
    404
  end
end

delete '/devicedet/:parameter' do
  parameter = params['parameter']
  index = devices.find_index { |d| d[:parameter] == parameter || d["parameter"] == parameter}
  puts "Before Deletion : " + devices.to_s
  if index
    devices.delete_at(index)
  else
    404
  end
  puts "After Deletion : " + devices.to_s
end