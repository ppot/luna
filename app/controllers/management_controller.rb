class ManagementController < ApplicationController
  layout 'application'

    def ajouterRestaurateur
         @un_restaurateur = Restaurateur.new
    end

    def saisirInformations
        restaurateur = Restaurateur.new(restaurateur_params)
        restaurant = Restaurant.find(params[:restaurant])
        #Utilisattion des fonctions prédéfinis de rails
        #Pas de nécessité de créer Restaurateur.setInfo comme dans le RDCU1 
        if restaurateur.save
            restaurant.update(restaurateur_id: restaurateur.id)
            redirect_to :action => "entrepreneur", notice: "add was successfully"
        else
            redirect_to :action => "entrepreneur", alert: "add was not successfully"
        end 
    end

    def supprimerRestaurateur
        
        res = Restaurateur.find(params[:id]).destroy
        redirect_to :action => "entrepreneur" 

     end

    def modifierRestaurateur
        restaurateur = Restaurateur.find(params[:id])
        if restaurateur.update_attributes(restaurateur_params)
            msg = "modification of restaurateur was successfully "

          #puisqu'on recoit l'information complete du client, la commande save est quivalante a celle de modification
          if params[:restaurant] != "-1"
              restaurant_modification = Restaurant.find(params[:restaurant])
              restaurant_modification.update(restaurateur_id: restaurateur.id)
              redirect_to :action => "entrepreneur", notice: "modification was successfully"
          else
              redirect_to :action => "entrepreneur", alert: "modification of restaurant was not successfull"
          end

        end 

    end

  def entrepreneur
  	@restaurateur = Restaurateur.all
  	@nouveau_restaurateur = Restaurateur.new
    @restaurants = Restaurant.all
    @nouveau_restaurant = Restaurant.new

  end

  def livraison
  end

  def restaurateur
  end
  
  def saisirInformationsRestaurant
       @nouveau_restaurant = Restaurant.new(restaurant_params)
       @restaurant_adresse = @nouveau_restaurant.build_adresse(adresse_params)
       @restaurant_adresse.principale = true

        #Utilisattion des fonctions prédéfinis de rails
        #Pas de nécessité de créer Restaurateur.setInfo comme dans le RDCU1 
        if @nouveau_restaurant.save
            @restaurant_adresse.save
            redirect_to :action => "entrepreneur", notice: "add was successfully"
        else
            redirect_to :action => "entrepreneur", alert: "add was not successfully"
        end 
  end 

  #obtention des permissions sur les parametres
  private def restaurateur_params
      params.require(:utilisateur).permit(:identificateur, :mot_de_passe, :nom, :prenom)
  end
  private def restaurant_params
      params.require(:restaurant).permit!
  end
  private def adresse_params
      params.require(:adresse).permit!
  end

    private def restaurateur_modif_params
      params.require(:utilisateur).permit(:id, :identificateur, :mot_de_passe, :nom, :prenom)
  end

end

