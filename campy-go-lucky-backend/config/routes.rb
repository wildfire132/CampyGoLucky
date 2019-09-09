Rails.application.routes.draw do
  resources :triptrails
  resources :campstops
  resources :trails
  resources :campsites
  resources :cities
  resources :waypoints
  resources :trips
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
