SurfboardApp::Application.routes.draw do

  devise_for :users
  resources :boards do
  	resources :board_rentals, only: [:new, :create, :destroy]
  end
  root to: "boards#index"

end
