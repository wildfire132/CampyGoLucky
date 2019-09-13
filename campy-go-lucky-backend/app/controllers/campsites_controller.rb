class CampsitesController < ApplicationController
    def index
        campsites = Campsite.all
        render json: campsites, include: [:trips]
    end

    def show
        campsite = Campsite.find(params[:id])
        render json: campsite, include: [:trips]
    end

    def create
        campsite = Campsite.new(name: params[:name], latitude: params[:latitude], longitude: params[:longitude])
        trip = Trip.all.find(params[:trip_id])
        trip.campsites << campsite
        # byebug
        campsite.save
        render json: [campsite, trip]
    end

    # def destroy
    #     campsite = Campsite.find(params[:id])
    #     campsite.campstop.destroy
    #     need to delete the campstop - need the trip id too
        
    # end

end
