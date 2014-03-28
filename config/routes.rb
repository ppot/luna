LOG::Application.routes.draw do

  root 'app#index'
  get "app/index"

  get "management/ajouterRestaurateur"
  get "management/supprimerRestaurateur"
  get "management/entrepreneur"
  get "management/supprimerRestaurant"
  post "management/saisirInformationsRestaurant" 

  post "management/saisirInformations" 
  get "modifierRestaurateur/:id", to: 'management#modifierRestaurateur'
  get "modifierRestaurant/:id", to: 'management#modifierRestaurant'
  get "modifierLivreur/:id", to: 'management#modifierLivreur'

  post "management/modifierLivreur"
  post "management/saisirInformationsLivreur" 
  get "management/supprimerLivreur"

  get "modifierLivreur/:id", to: 'management#modifierLivreur'

  get "management/livraison"
  get "livrerCommande/:id", to: 'management#livrerCommande'
  get "livraisonDetails/:id", to: 'management#livraisonDetails'
  get "management/restaurateur"


  get "users/commande"
  get "users/profile"

  get "api/register"
  get "api/signin"
  get "api/signout"
  get "api/user_update"
  get "api/listRestaurants"
  get "api/getRestaurantForRestaurateur"
  get "api/getRetaurantMenu"
  get "api/bindMenu"
  get "api/createPlat"
  get "api/listPlat"
  get "api/plat"
  get "api/modPlat"


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
