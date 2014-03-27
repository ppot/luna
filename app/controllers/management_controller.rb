class ManagementController < ApplicationController
  layout 'application'
  include API

    def entrepreneur  
      @restaurateur = Restaurateur.all #left join fait a l'interne grace aux has_one dans les modeles
      @restaurateurs_sans_restaurants = Restaurateur.includes(:restaurant).where(restaurants: {restaurateur_id: nil})
      @nouveau_restaurateur = Restaurateur.new
      @restaurants = Restaurant.where(restaurateur_id: nil) #on veut les restaurants qui n'ont pas de restaurateur d'assigne
      @nouveau_restaurant = Restaurant.new
      @restaurants_restaurateurs = Restaurant.all
      @nouveau_livreur = Livreur.new
      @livreurs = Livreur.all
      # @_user = current_client
    end

    #fonction pour ajouter un restaurateur
  def saisirInformations
        restaurateur = Restaurateur.new(utilisateur_params)
        #Utilisattion des fonctions prédéfinis de rails
        #Pas de nécessité de créer Restaurateur.setInfo comme dans le RDCU1 
        if restaurateur.save
          if params[:restaurant] != "-1"  #un restaurant a ete selectionne
            restaurant = Restaurant.find(params[:restaurant])
            restaurant.update(restaurateur_id: restaurateur.id)
          end
            redirect_to  :action => "entrepreneur", notice: "add was successfully"
        else
            redirect_to  :action => "entrepreneur", alert: "add was not successfully"
        end 
  end

    def supprimerRestaurateur

        res = Restaurateur.find(params[:id]).destroy
        redirect_to :action => "entrepreneur"
    end

  def modifierRestaurateur
        restaurateur = Restaurateur.find(params[:id])
        if restaurateur.update_attributes(utilisateur_params)

          #modification des parametres du restaurateur
          if params[:restaurant] != "-1"
              restaurant_modification = Restaurant.find(params[:restaurant])
              restaurateur.restaurant.update(restaurateur_id: nil) unless restaurateur.restaurant.nil?
              restaurant_modification.update(restaurateur_id: restaurateur.id)

              redirect_to :action => "entrepreneur", notice: "modification was successfully"
          else
              redirect_to :action => "entrepreneur", alert: "modification of restaurant was not successfull"
          end

        end 
  end

  #fonction pour ajouter un restaurateur
  def saisirInformationsLivreur
      livreur = Livreur.new(utilisateur_params)
      #Utilisattion des fonctions prédéfinis de rails
      #Pas de nécessité de créer Restaurateur.setInfo comme dans le RDCU1 
      if livreur.save
          redirect_to  :action => "entrepreneur", notice: "add was successfully"
      else
          redirect_to  :action => "entrepreneur", alert: "add was not successfully"
      end 
  end

  def supprimerLivreur
    Livreur.find(params[:id]).destroy
    redirect_to :action => "entrepreneur" 
  end

  def modifierLivreur
    livreur = Livreur.find(params[:id])
    if livreur.update_attributes(utilisateur_params)
        redirect_to :action => "entrepreneur", notice: "modification was successfully"
    else
        redirect_to :action => "entrepreneur", alert: "modification of restaurant was not successfull"
    end
  end

  #---------------------Section pour le restaurant-----------------------
  #fonction pour ajouter un restaurant
  def saisirInformationsRestaurant
       @nouveau_restaurant = Restaurant.new(restaurant_params)
       @restaurant_adresse = @nouveau_restaurant.build_adresse(adresse_params)    #va creer une adresse avec la cle etrangere de restaurant
       @restaurant_adresse.principale = true

        #Utilisattion des fonctions prédéfinis de rails
        #Pas de nécessité de créer Restaurateur.setInfo comme dans le RDCU1

        if @nouveau_restaurant.save
            @restaurant_adresse.save
            @nouveau_restaurant.update(:restaurateur_id => params[:restaurateur]) unless params[:restaurateur] == "-1"
            redirect_to :action => "entrepreneur", notice: "add was successfully"
        else
            redirect_to :action => "entrepreneur", alert: "add was not successfully"
        end
  end

  def supprimerRestaurant
      restaurant = Restaurant.find(params[:id]).destroy
      redirect_to :action => "entrepreneur"
  end

  def modifierRestaurant
      restaurant = Restaurant.find(params[:id])

        if restaurant.update_attributes(restaurant_params)
           restaurant_adresse = restaurant.adresse.update_attributes(adresse_params)
          if params[:restaurateur] != "-1"
              restaurateur_modification = Restaurateur.find(params[:restaurateur])
              restaurateur_modification.restaurant.update(restaurateur_id: nil) unless restaurateur_modification.restaurant.nil?
              restaurant.update(restaurateur_id: params[:restaurateur])
 
              redirect_to :action => "entrepreneur", notice: "modification was successfully"
          else
              redirect_to :action => "entrepreneur", alert: "modification of restaurant was not successfull"
          end

        end
  end

  #-----------------------------Section du livrerur---------------------------
  def livraison  
      @commandes = Commande.where(status_pret: true, livreur_id: nil).order(heure_de_commande: :asc)   #on récupère toutes les commandes prêtes qui n'ont pas été livrés
  end

  def livraisonDetails
      commande_actuelle = Commande.find(params[:id])
      adresse_client = Adresse.where(:client_id => commande_actuelle.client_id, :principale => true) #adresse du client
      #requete pour optenir l'adresse du restaurant
      adresse_restaurant = Adresse.find_by_sql "SELECT * FROM adresses INNER JOIN restaurants ON adresses.adresseable_id = restaurants.id 
                                                                        INNER JOIN menus ON restaurants.id = menus.id
                                                                        INNER JOIN plats ON menus.id = plats.id
                                                                        INNER JOIN commandes_plats ON plats.id = commandes_plats.plat_id
                                                                        AND commandes_plats.commande_id = #{commande_actuelle.id}"
      respond_to do |format|
        format.html 
        format.json { render :json => { :adresse_client => adresse_client, :adresse_restaurant => adresse_restaurant } }
      end
  end

  def livrerCommande
      d = Date.today.to_formatted_s(:rfc822)  #2014-03-22
      t = Time.now.strftime("%I:%M%p") #formatage de l'heure actuelle
      livraison = Livraison.new(:commande_id => params[:id],:date_de_livraison => d, :heure_de_livraison => t)
      if livraison.save
          Commande.update(:params[:id], :livreur_id => '1')     #param session requis
          redirect_to :action => "livraison"
          # redirect_to :action => "livraison", notice: "Livraison enregistré"
      else
          # redirect_to :action => "livraison", alert: "enregistrement échoué"
          redirect_to :action => "livraison"
      end
  end

  #obtention des permissions sur les parametres
  def restaurant_params
      params.require(:restaurant).permit! #facon courte de tout permettre
  end

  def adresse_params
      params.require(:adresse).permit!
  end

  def utilisateur_params
      params.require(:utilisateur).permit(:identificateur, :mot_de_passe, :nom, :prenom)
  end

end
