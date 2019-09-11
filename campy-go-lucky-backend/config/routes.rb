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
  get 'coms', to: 'coms#get_api_key'

end
