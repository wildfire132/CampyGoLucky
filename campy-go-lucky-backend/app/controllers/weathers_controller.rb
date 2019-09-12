class WeathersController < ApplicationController
    def get_weather
        string_response = RestClient.get("https://api.darksky.net/forecast/75eecb162c935d86ba52006b9ae6f74d/#{latitude},#{longitude}?exclude=[minutely,hourly]")
        response_hash = JSON.parse(string_response)
        byebug
    end
end