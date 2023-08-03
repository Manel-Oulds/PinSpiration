class Api::PinsController < ApplicationController
    wrap_parameters include: Pin.attribute_names + [:image]

    # def index
    #     @pins = Pin.where(user_id: params[:user_id]).sort { |a,b| a.created_at <=> b.created_at }
  
    #     render 'api/pins/index'
    # end

    def index
        if params[:user_id].present?
          @pins = Pin.where(user_id: params[:user_id]).order(created_at: :desc)
        else
          @pins = Pin.all.order(created_at: :asc)
        end
      
        render 'api/pins/index'
      end

    def show
        @pin = Pin.find(params[:id])
        if @pin.save
            render 'api/pins/show'
        else
            render json: {errors: @pin.errors.full_messages } , status: :unauthorized
        end
    end

    def create 
        @pin = Pin.new(pin_params)
        if @pin.save
          render 'api/pins/show'
        else
          render json: {errors: @pin.errors.full_messages } , status: :unauthorized
        end
    end

    def update
        @pin = Pin.find_by(id: params[:id])
        if @pin && @pin.update(pin_params)
            render 'api/pins/show'
          
        else
          render json: {errors: "Error" }, status: :unauthorized
        end

    end

    def destroy
        @pin = Pin.find(params[:id])
        if @pin
             @pin&.destroy
            
        else
            render json: {errors: @pin.errors.full_messages}, status: :unauthorized
        end

    end

    def search
      query = params[:query]
      @pins = Pin.where('title ILIKE  ?', "%#{query}%")

      render :search
    end
private
    def pin_params
        params.require(:pin).permit(:user_id,:title,:description, :image)
    end

end
