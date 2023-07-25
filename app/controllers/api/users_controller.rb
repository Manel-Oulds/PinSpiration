class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']
  # before_action :require_logged_out, only: [:create]
  # before_action :require_logged_in, only: [:update]

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render 'api/users/show'
    else
      render json: {errors: @user.errors.full_messages }, status: :unprocessable_entity 
    end
  end

  def update
    @user = current_user
    if @user && @user.update(user_params)
      render 'api/users/show'
    else
      render json: {errors: @user.errors.full_messages }, status: :unprocessable_entity 
    end
  end

  

  private 
  def user_params
    params.require(:user).permit(:email, :username, :birthdate, :password)
  end
end
