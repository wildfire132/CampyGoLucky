class CampgroundsController < ApplicationController
    # before_action :set_params, only: :get_campground
    # def get_campground
    #     latlong = params["latlong"]
    #     address = params["address"]
    #     stateCode = address.split(" ")[-3].downcase
    #     camp_name = params["camp_name"]
    #     search_term = camp_name
    #     # byebug
    #     # search terms I've tried aren't effective -- what if we try... 
    #     # using state or park code (ugh that might be another api call)...
    #     # to narrow down possible results and then do a .find on the latlong
    #     # or park name

    #     # https://developer.nps.gov/api/v1/campgrounds?stateCode=tn&limit=100&fields=addresses
    #     string_response = RestClient.get("https://developer.nps.gov/api/v1/campgrounds?stateCode=#{stateCode}&limit=100&fields=addresses&api_key=#{ENV["NATIONAL_PARKS_API_KEY"]}")
    #     byebug
    #     response_hash = JSON.parse(string_response)
    #     campgroundName = response_hash["data"][0]["name"]
    #     campgroundLoc = response_hash["data"][0]["latLong"]
    #     # byebug
    #     # @results = []
    #     # markers_hash["results"].each do |marker|
    #     #     one_marker = {
    #     #     latlong: marker["geometry"]["location"],
    #     #     address: marker["formatted_address"],
    #     #     camp_name: marker["name"]
    #     #     }
    #     #     @results << one_marker
    #     # end
        
    # #    @results = {
    # #      latlong: lat_long_hash,
    # #      address: formatted_address,
    # #      camp_name: camp_name
    # #     }

    #     # render :json => @results

  
    #   end

    #   private

    #   def set_params
    #     params.require(:campground).permit(:latlong, :address, :camp_name)
    #   end

end