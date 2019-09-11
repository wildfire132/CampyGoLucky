class MarkersController < ApplicationController
    def get_markers
        search_term = params['startLocation'].gsub(" ","+")
          string_response = RestClient.get("https://maps.googleapis.com/maps/api/place/textsearch/json?query=campgrounds+in+#{search_term}&key=#{ENV["GOOGLE_MAPS_API_KEY"]}&radius=50000")
        markers_hash = JSON.parse(string_response)

        @results = []
        markers_hash["results"].each do |marker|
            one_marker = {
            latlong: marker["geometry"]["location"],
            address: marker["formatted_address"],
            camp_name: marker["name"]
            }
            @results << one_marker
        end
        
    #    @results = {
    #      latlong: lat_long_hash,
    #      address: formatted_address,
    #      camp_name: camp_name
    #     }

        render :json => @results

  
      end

end