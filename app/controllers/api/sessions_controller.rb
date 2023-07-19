class Api::SessionsController < ApplicationController
  def show
    if current_user
      @user = current_user
      # render "api/views/show"
      render json: {user: @user}
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.find_by_credentials(params[:credential],params[:password])
    if @user
      login!(@user)
      # render "api/view/show"
      render json: {user: @user}
    else
      render json: { errors: ['Incorrect Email/Username or Password.'] }, 
      status: :unauthorized
    end
  end

  def destroy
    logout!
    render json: { message: 'LOGGED OUT' }
  end


end
