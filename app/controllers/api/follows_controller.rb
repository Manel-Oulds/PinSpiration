class Api::FollowsController < ApplicationController
    def create
        user = User.find(params[:follower_id])
        @followee = User.find(params[:followee_id])
    
        if @followee && !user.followees.include?(@followee)
          user.followees << @followee
          render json: { message: 'Followed successfully' }
        else
          render json: { errors: ['Unable to follow'] }, status: 422
        end
      end

    def followers
        user = User.find(params[:id])
        @followers = user.followers
        render json: @followers, status: :ok
      end
    
      def followees
        user = User.find(params[:id])
        @followees = user.followees
        render json: @followees, status: :ok
      end
    
      def destroy
        @follower = User.find(params[:follower_id])
        @followee = User.find(params[:id])
        @follower.followees.delete(@followee)
        render json: { message: 'Unfollowed successfully' }
      end
  
   
  
   
  end
  