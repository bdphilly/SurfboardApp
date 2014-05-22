SurfboardApp::Application.routes.draw do
	root to: "boards#index"

	namespace :api, :defaults => { format: => :json } do
		resources :boards do
			resources :board_rentals, only: [:new, :create, :destroy]	
		end
	end

  devise_for :users
  resources :boards do
  	resources :board_rentals, only: [:new, :create, :destroy]
  end
  

end
