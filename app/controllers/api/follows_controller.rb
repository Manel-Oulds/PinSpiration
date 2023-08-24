class Api::FollowsController < ApplicationController

    def index
        user = User.find(params[:user_id]) # Assuming you're passing user_id in the request params
        
        if params[:type] == 'followers'
          followers = user.followers
          render json: followers, status: :ok
        elsif params[:type] == 'followees'
          followees = user.followees
          render json: followees, status: :ok
        else
          render json: { error: 'Invalid type parameter' }, status: :unprocessable_entity
        end
      end
  
    def create
      followee = User.find(params[:followee_id])
      if followee && !@user.followees.include?(followee)
        @user.followees << followee
        render json: { message: 'Followed successfully' }
      else
        render json: { errors: ['Unable to follow'] }, status: 422
      end
    end
  
    def destroy
      followee = User.find(params[:followee_id])
      if followee && @user.followees.include?(followee)
        @user.followees.delete(followee)
        render json: { message: 'Unfollowed successfully' }
      else
        render json: { errors: ['Unable to unfollow'] }, status: 422
      end
    end
  
    def followers
      followers = @user.followers
      render json: followers, status: 200
    end
  
    def followees
      followees = @user.followees
      render json: followees, status: 200
    end
  
   
  end
  