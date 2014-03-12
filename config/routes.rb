LOG::Application.routes.draw do

  get "gestionnaire_restaurateurs/index"
  get "gestionnaire_restaurateurs/ajouterRestaurateur"
  post "gestionnaire_restaurateurs/saisirInformations"
  get "gestionnaire_restaurateurs/supprimerRestaurateur"
  get "gestionnaire_restaurateurs/modifierRestaurateur"


  root 'app#index'
  get "app/index"

  get "management/ajouterRestaurateur"
  get "management/supprimerRestaurateur"
  get "management/modifierRestaurateur"
  get "management/entrepreneur"
  post "management/saisirInformations" 
  post "management/saisirInformationsRestaurant" 
  
  get "management/livraison"
  get "management/restaurateur"


  get "users/commande"
  get "users/profile"

  get "app/login"
  get "app/logout"

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"


  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
