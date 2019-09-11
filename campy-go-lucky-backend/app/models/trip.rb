class Trip < ApplicationRecord
  belongs_to :user
  has_many :campstops
  has_many :campsites, through: :campstops
  has_many :triptrails
  has_many :trails, through: :triptrails

  def instant_query
      search_term = self.start_location.gsub(" ","+")
      byebug
      api_call(search_term)
      
  end

  def api_call(term)
    string_response = RestClient.get("https://maps.googleapis.com/maps/api/geocode/json?address=#{term}&key=#{ENV["GOOGLE_MAPS_API_KEY"]}")
    response_hash = JSON.parse(string_response)

     lat_long_hash = response_hash["results"][0]["geometry"]["location"]
     formatted_address = response_hash["results"][0]["formatted_address"]
     @results = {
       latlong: lat_long_hash,
       address: formatted_address
      }
      render :json => @results
    
  end

end
