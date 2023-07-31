Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  # post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create,:show,:update,:index]
    resource :session, only: [:show, :create, :destroy]
    resources :pins 
    resources :boards, only: [:index, :create, :show, :destroy, :update]
    resources :board_pins, only: [:create, :destroy, :update, :index]

  end
  get '*path', to: "static_pages#frontend_index"

end
