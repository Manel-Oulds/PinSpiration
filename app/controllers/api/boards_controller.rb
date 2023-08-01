class Api::BoardsController < ApplicationController
    def show
        @board = Board.find(params[:id])
        if @board.save
            render :show
        else
            render json: {errors: @board.errors.full_messages } , status: :unauthorized
        end

    end

    def index
        if params[:user_id].present?
            @boards = Board.where(user_id: params[:user_id]).order(created_at: :desc)
          else
            @boards = Board.all.order(created_at: :asc)
          end
        
          render :index

    end
    def create
        @board = Board.new(board_params)
        if @board.save
          render :show
        else
          render json: {errors: @board.errors.full_messages} , status: :unauthorized
        end

    end

    def destroy
        @board = Board.find_by(id: params[:id])
        if @board
             @board&.destroy 
        else
            render json: {errors: @board.errors.full_messages}, status: :unauthorized
        end
    end

    def update
        @board = Board.find_by(id: params[:id])
        if @board && @bosrd.update(board_params)
            render :show
          
        else
          render json: {errors: "Error" }, status: :unauthorized
        end

    end


    private
    def board_params
        params.require(:board).permit(:user_id,:title)

    end

    end
    

