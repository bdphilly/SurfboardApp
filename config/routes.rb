SurfboardApp::Application.routes.draw do

  devise_for :users
  resources :boards

  root to: "boards#index"

end
