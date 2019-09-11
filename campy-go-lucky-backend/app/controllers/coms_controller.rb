class ComsController < ApplicationController
    def get_map
        byebug
        search_term = params['startLocation'].gsub(" ","+")
        string_response = RestClient.get("https://maps.googleapis.com/maps/api/geocode/json?address=#{search_term}&key=#{ENV["GOOGLE_MAPS_API_KEY"]}")
      response_hash = JSON.parse(string_response)
  
       lat_long_hash = response_hash["results"][0]["geometry"]["location"]
       formatted_address = response_hash["results"][0]["formatted_address"]
       @results = {
         latlong: lat_long_hash,
         address: formatted_address
        }
        render :json => @results
    end

    private


end