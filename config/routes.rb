LOG::Application.routes.draw do

  root 'app#index'
  get "app/index"

  get "management/entrepreneur"
  
  post "management/saisirInformations"  #créer nouveau restaurateur
  put "management/modifierRestaurateur"
  delete "management/supprimerRestaurateur"

  post "management/saisirInformationsRestaurant" 
  put "management/modifierRestaurant"
  delete "management/supprimerRestaurant"
  
  
  post "management/saisirInformationsLivreur" 
  put "management/modifierLivreur"
  delete "management/supprimerLivreur"
  #fin de la section entrepreneur

  get "management/livraison"  #affiche les commandes à livrer
  get "management/livraisonDetails" #affiche une commande particulière
  post "management/livrerCommande"
  #fin de la section des livreurs

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
  get "api/restaurant_menu"
  get "api/menu_plats"
  get "api/confirmer_cart"
  get "api/confirmer_cart_plat"
  get "api/nAdresse"
  get "api/adresses"
  get "api/commandesRestaurantsNotReady"
  get "api/commandeOrder"
  get "api/commandeAddr"
  get "api/commandeOrderItems"
  get "api/commandeOrderReady"


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
