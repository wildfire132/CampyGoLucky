class WeathersController < ApplicationController
    def get_weather
        latitude = params["latlong"]["lat"]
        longitude = params["latlong"]["lng"]
        string_response = RestClient.get("https://api.darksky.net/forecast/75eecb162c935d86ba52006b9ae6f74d/#{latitude},#{longitude}?exclude=[minutely,hourly]")
        response_hash = JSON.parse(string_response)

    @summary = {
        weekly_summary: response_hash["daily"]["summary"]
    }


    current_icon = case response_hash["currently"]["icon"]
    when "clear-day", "clear-night"
        icon = "https://i.imgur.com/WhwmkoO.png"
    when "rain"
        icon = "https://i.imgur.com/d6iCdYU.png"
    when "snow" 
        icon = "https://i.imgur.com/HjSJTBN.png"
    when "sleet"
        icon = "https://i.imgur.com/nk50PD4.png"
    when "wind"
        icon = "https://i.imgur.com/J6XtvKt.png"
    when "fog"
        icon = "https://i.imgur.com/wXrFBo7.png"
    when "cloudy", "mostly-cloudy"
        icon = "https://i.imgur.com/d667pgi.png"
    when "partly-cloudy-day", "partly-cloudy-night"
        icon = "https://i.imgur.com/sBnF5jO.png"
    else 
        icon = "https://i.imgur.com/vhbGJo3.png" 
    end

    # byebug

    @currentResults = {
        current_time: Time.at(response_hash["currently"]["time"]).to_datetime.strftime("%a %m/%d/%Y"),
        current_summary: response_hash["currently"]["summary"],
        current_icon: current_icon,
        current_temperature: "#{response_hash["currently"]["temperature"]}℉",
        current_precipProb: "#{(response_hash["currently"]["precipProbability"]*100).to_s[0..4].to_i}%",
        current_visibility: "#{(response_hash["currently"]["visibility"]).to_s[0..3].to_i} miles",
        current_windSpeed: "#{(response_hash["currently"]["windSpeed"]).to_s[0..4].to_i} miles/hour"
    }
    
    @weeklyResults = []

    response_hash["daily"]["data"].each do |daily_weather|
        icon = case daily_weather["icon"]
            when "clear-day","clear-night"
                icon = "https://i.imgur.com/WhwmkoO.png"
            when "rain"
                icon = "https://i.imgur.com/d6iCdYU.png"
            when "snow" 
                icon = "https://i.imgur.com/HjSJTBN.png"
            when "sleet"
                icon = "https://i.imgur.com/nk50PD4.png"
            when "wind"
                icon = "https://i.imgur.com/J6XtvKt.png"
            when "fog"
                icon = "https://i.imgur.com/wXrFBo7.png"
            when "cloudy"
                icon = "https://i.imgur.com/d667pgi.png"
            when "partly-cloudy-day","partly-cloudy-night"
                icon = "https://i.imgur.com/sBnF5jO.png"
            else 
                icon = "https://i.imgur.com/vhbGJo3.png" 
        end

        new_hash = {
            daily_summary: daily_weather["summary"],
            time: Time.at(daily_weather["time"]).to_datetime.strftime("%a %m/%d"),
            icon: icon,
            chance_rain: "#{(daily_weather["precipProbability"]*100).to_s[0..4].to_i}%",
            highest_temp: "#{daily_weather["temperatureHigh"]}℉",
            lowest_temp: "#{daily_weather["temperatureLow"]}℉",
            wind_speed: "#{(daily_weather["windSpeed"]).to_s[0..4].to_i} miles/hour",
            cloud_cover: "#{(daily_weather["cloudCover"]*100).to_s[0..4].to_i}%",
            visibility: "#{(daily_weather["visibility"]).to_s[0..3].to_i} miles"
        }  
        
        @weeklyResults << new_hash
    end

    @weeklyResults.pop
    @weeklyResults.shift(2)

        render json: [@currentResults,@weeklyResults,@summary]
    end
end