SurfboardApp::Application.routes.draw do

  devise_for :users
  # resource :session, only: [:create, :destroy, :new]
  # resources :users
  resources :boards

  root to: "boards#index"

end
