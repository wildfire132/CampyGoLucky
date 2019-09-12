class WeathersController < ApplicationController
    def get_weather
        latitude = params["latlong"]["lat"]
        longitude = params["latlong"]["lng"]
        string_response = RestClient.get("https://api.darksky.net/forecast/75eecb162c935d86ba52006b9ae6f74d/#{latitude},#{longitude}?exclude=[minutely,hourly]")
        response_hash = JSON.parse(string_response)
        byebug

        case icon
            when clear-day || clear-night
            when rain
            when snow, sleet
            when wind, 
            when fog, 
            when cloudy
            when partly-cloudy-day || partly-cloudy-night
            else 
        end
    end
end