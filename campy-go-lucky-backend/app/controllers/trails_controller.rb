class TrailsController < ApplicationController
    # def get_trail_markers
        
    #     # lat = 40.0274
    #     # long = -105.2519
    #     lat = params["latLong"]["lat"]
    #     long = params["latLong"]["lng"]
    #     string_response = RestClient.get("https://www.hikingproject.com/data/get-trails?lat=#{lat}&lon=#{long}&key=#{ENV["CAMPGROUNDS_API_KEY"]}")
         
    #     markers_hash = JSON.parse(string_response)
    #     @results = []
    #     byebug
    #     markers_hash["campgrounds"].each do |marker|
    #         one_marker = {
    #         latlong: { lat: marker["latitude"], lng: marker["longitude"]},
    #         address: marker["location"],
    #         camp_name: marker["name"],
    #         url: marker["url"],
    #         imgUrl: marker["imgUrl"]
    #         }
    #         @results << one_marker
    #     end

    #     render :json => @results

  
    # end
end
