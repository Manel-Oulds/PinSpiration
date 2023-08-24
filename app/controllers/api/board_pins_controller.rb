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
          
        else
          render json: { errors: ["Something went wrong"] }, status: 422
        end
    end

    def update
      @board_pin = BoardPin.find_by(board_id: params[:prev_board_id], pin_id: params[:pin_id])
      if @board_pin
        if @board_pin.update(board_pin_params)
          @prev_board = Board.find(params[:prev_board_id])
          @next_board = Board.find(params[:board_pin][:board_id])
          render :show 
        else
          render json: { errors: @board_pin.errors.full_messages }, status: 422
        end
      else
        render json: { errors: "BoardPin not found" }, status: 404
      end
    end


    def destroy
        if params[:board_id].present? && params[:pin_id].present?
          @board_pin = BoardPin.find_by(board_id: params[:board_id], pin_id: params[:pin_id])
    
          if @board_pin
            @board_pin.destroy
            render json: { message: "Board pin successfully deleted" }, status: 200
          else
            render json: { errors: "Board pin not found" }, status: 404
          end
        else
          render json: { errors: "Missing board_id or pin_id parameters" }, status: 422
        end
      end

    private
    def board_pin_params
        params.require(:board_pin).permit(:board_id,:pin_id)
        
    end
end
