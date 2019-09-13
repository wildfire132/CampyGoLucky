class GettrailsController < ApplicationController
    def get_trails_markers
        # lat = 40.0274
        # long = -105.2519
        
        lat = params["latLong"]["lat"]
        long = params["latLong"]["lng"]
        string_response = RestClient.get("https://www.hikingproject.com/data/get-trails?lat=#{lat}&lon=#{long}&key=#{ENV["CAMPGROUNDS_API_KEY"]}")
         
        markers_hash = JSON.parse(string_response)
        @results = []
        
        markers_hash["trails"].each do |marker|
            case marker["difficulty"]
            when "green"
                difficulty = "Green Hike - Easy"
            else 
                difficulty = "Blue Hike - Intermediate"
            end

            one_marker = {
            latlong: {lat: marker["latitude"], lng: marker["longitude"]},
            address: marker["location"],
            trail_name: marker["name"],
            url: marker["url"],
            imgUrl: marker["imgSmallMed"],
            summary: marker["summary"],
            rating: "#{marker["stars"]} stars",
            difficulty: difficulty,
            lengthInMilesToPoint: "#{marker["length"]} miles",
            ascentHeight: "Ascent: #{marker["ascent"]}ft",
            descentHeight: "Descent: #{marker["descent"]}ft"
            }
            @results << one_marker
        end
        
        render :json => @results
  
    end
end