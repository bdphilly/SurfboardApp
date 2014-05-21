SurfboardApp::Application.routes.draw do

  resource :session, only: [:create, :destroy, :new]
  resources :users

  root to: "users#show"

end
