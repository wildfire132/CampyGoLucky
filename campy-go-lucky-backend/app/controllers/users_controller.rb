class UsersController < ApplicationController
    def index
        users = User.all
        render json: users.to_json(:include => {:trips => {:include => :campsites}})
    end

    def show
        user = User.find(params[:id])
        render json: user.to_json(:include => {:trips => {:include => :campsites}})
    end

    # def new
    # end

    def create
        user = User.new(username: params[:username].downcase.capitalize)
        user.trips = []
        user.save
        render json: user
    end

end
