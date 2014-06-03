SurfboardApp::Application.routes.draw do
	root to: "static_pages#root"

	namespace :api, :defaults => { format: :json } do
		get 'boards/search', to: 'boards#search'
		resource :user, only: [:show, :update]
		resources :boards do
			resources :photos, only: [:index]
			resources :board_rentals, only: [:create, :new, :show, :destroy]
		end

		resources :board_rentals, only: [:create, :new, :show, :index] do
			post "approve", :on => :member
  		post "deny", :on => :member
		end

		resources :photos, only: [:create, :destroy]
	end

  devise_for :users, :controllers => { :registrations => "registrations" }
  resources :users, only: [:show, :update]
  match 'users/:id' => 'users#show', via: :get
	# or 
	# get 'users/:id' => 'users#show'
  resources :boards do
  	resources :board_rentals, only: [:new, :create, :destroy]
  end

end