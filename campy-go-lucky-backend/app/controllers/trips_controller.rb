class TripsController < ApplicationController
    def index
        trips = Trip.all
        render json: trips, include: [:campsites]
    end

    def show
        trip = Trip.find(params[:id])
        render json: trip, include: [:campsites]
    end

    def create
        trip = Trip.new(user_id: params[:user_id], name: params[:name], start_date: params[:start_date], start_location: params[:start_location])
        trip.campsites = []
        trip.save
        render json: trip
    end
  
    

end


