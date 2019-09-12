Rails.application.routes.draw do
  resources :triptrails
  resources :campstops
  resources :trails
  resources :campsites
  resources :cities
  resources :waypoints
  resources :trips
  resources :users
  post 'coms', to: 'coms#get_map'
  post 'markers', to: 'markers#get_markers'
  get 'coms', to: 'coms#get_api_key'
<<<<<<< HEAD
  post 'campgrounds', to: 'campgrounds#get_campground'
=======
  post 'weathers', to: 'weathers#get_weather'

>>>>>>> 53361eb82bdb8aeadf86477d9f3e580965a4a06c
end
