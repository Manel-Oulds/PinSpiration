class Api::BoardPinsController < ApplicationController
    def create
        @board_pin = BoardPin.new(board_pin_params)
        if @board_pin.save
          render :show
        else
          render json: { errors: ["Something went wrong"] }, status: 422
        end
    end

    def update
        @board_pin = BoardPin.find_by(id: params[:id])
        if @board_pin && @board_pin.update(board_pin_params)
            render :show
          
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
