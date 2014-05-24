SurfboardApp::Application.routes.draw do
	root to: "static_pages#root"

	namespace :api, :defaults => { format: :json } do
		resources :boards do
			resources :photos, only: [:index]
			resources :board_rentals, only: [:new, :create, :destroy]	
		end
		resources :photos, only: [:create, :destroy]
	end

  devise_for :users
  resources :users, only: [:show, :edit, :update]
  match 'users/:id' => 'users#show', via: :get
	# or 
	# get 'users/:id' => 'users#show'
  resources :boards do
  	resources :board_rentals, only: [:new, :create, :destroy]
  end

end