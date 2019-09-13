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
    def get_campground_info
        mechanize = Mechanize.new
        page = mechanize.get("#{params["info_url"]}")
    
        camp_info = page.search("div.description")
        
        activities = page.search("div.activity div")
    
        puts camp_info[0].text.strip
    
        puts ""
    
        puts "Activities"

        array_of_activities = []
        activities.each do |activity|
            array_of_activities << activity.text
        end

        @results {
            arrayOfActivities: array_of_activities
            camp_info: camp_info[0].text.strip
        }
        render :json => @results
    end
end