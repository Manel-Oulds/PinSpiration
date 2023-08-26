Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  # post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    get '/pins/search', to: 'pins#search'
    put '/board_pins/:prev_board_id/:pin_id', to: 'board_pins#update', as: 'update_board_pin'
    resources :users, only: [:create,:show,:update,:index]
    resource :session, only: [:show, :create, :destroy]
    resources :pins 
    resources :boards, only: [:index, :create, :show, :destroy, :update]
    resources :board_pins, only: [:create, :index] do
      collection do
        # Define the custom route for the destroy action
        delete 'destroy'
      end
    end
    resources :follows, only: [:create, :destroy]
    resources :users, only: [] do
      member do
        get 'followers', to: 'follows#followers'
        get 'followees', to: 'follows#followees'
      end
    end

  end
  get '*path', to: "static_pages#frontend_index"

end
