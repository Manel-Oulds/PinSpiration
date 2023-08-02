class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']
  # before_action :require_logged_out, only: [:create]
  # before_action :require_logged_in, only: [:update]

  # def create
  #   @user = User.new(user_params)
  #   if @user.save
  #     login!(@user)
  #     render 'api/users/show'
  #   else
  #     render json: {errors: @user.errors.full_messages }, status: :unprocessable_entity 
  #   end
  # end
  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)

      # Create a new board for the user with the title "All Pins"
      @board = Board.new(user_id: @user.id, title: "All Pins")
      if @board.save
        render 'api/users/show'
      else
        render json: { errors: @board.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
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

  def show 
    @user = User.find(params[:id])
    render :show
  end

  

  private 
  def user_params
    params.require(:user).permit(:email, :username, :birthdate, :password)
  end
end
