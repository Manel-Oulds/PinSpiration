class Api::BoardPinsController < ApplicationController

    def index
        if params[:board_id].present?
            @board_pins = BoardPin.where(board_id: params[:board_id]).order(created_at: :desc)
        else
            @board_pins = BoardPin.all.order(created_at: :asc)
        end
      
        render :index
    end

    def create
        @board_pin = BoardPin.new(board_pin_params)
        if @board_pin.save
          render :index
        else
          render json: { errors: ["Something went wrong"] }, status: 422
        end
    end

    def update
        @board_pin = BoardPin.find_by(id: params[:id])
        if @board_pin && @board_pin.update(board_pin_params)
            render :index
          
        else
          render json: {errors: "Error Updating" }, status: 422
        end

    end

    def destroy
        @board_pin = BoardPin.find(params[:id]);
        if @board_pin
            @board_pin&.delete
        else
            render json: {errors: "Error deleting " }, status: 422
        end


    end

    private
    def board_pin_params
        params.require(:board_pin).permit(:board_id,:pin_id)
        
    end
end
