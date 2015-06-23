Rails.application.routes.draw do
  devise_for :users
  root to: 'application#angular'

  resources :people, only: [:create, :index, :show] do
    resources :comments, only: [:show, :create] do
      member do
        put '/upvote' => 'comments#upvote'
        get '/upvote' => 'comments#get_upvotes'
      end
    end

    member do
      put 'upvote' => 'people#upvote'
    end
  end
end
