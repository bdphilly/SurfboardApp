SurfboardApp::Application.routes.draw do

  resource :session, only: [:create, :destroy, :new]
  resources :users
  resources :boards

  root to: "users#show"

end
