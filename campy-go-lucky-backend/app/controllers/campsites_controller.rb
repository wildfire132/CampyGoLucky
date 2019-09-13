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
        campsite = Campsite.new(name: params[:name], latitude: params[:latitude], longitude: params[:longitude], url: params[:url], img: params[:img])
        trip = Trip.all.find(params[:trip_id])
        trip.campsites << campsite
        # campsite.trips << trip
        # byebug
        campsite.save
        render json: [campsite, trip]
    end

    def destroy
        campsite = Campsite.find(params[:id])
        # byebug
        camp_stop = Campstop.all.find(campsite_id = campsite.id)
        camp_stop.delete
        campsite.delete
        # need to delete the campstop - need the trip id too
        # render json: campsite
    end

end
