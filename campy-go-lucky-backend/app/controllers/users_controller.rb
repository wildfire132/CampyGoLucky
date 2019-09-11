class UsersController < ApplicationController
    def index
        users = User.all
        render json: users.to_json(:include => {:trips => {:include => :campsites}})
    end

    def show
        user = User.find(params[:id])
        render json: user
    end

    # def new
    # end

    def create
        user = User.new(username: params[:username])
        user.save
        render json: user
    end

end
