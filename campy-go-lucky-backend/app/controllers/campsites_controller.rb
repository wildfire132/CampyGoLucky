class CampsitesController < ApplicationController
    def index
        campsites = Campsite.all
        render json: campsites
    end

    def show
        campsite = Campsite.find(params[:id])
        render json: campsite
    end

end
