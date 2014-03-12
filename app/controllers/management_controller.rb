class ManagementController < ApplicationController
  layout 'application'

    def ajouterRestaurateur
         @un_restaurateur = Restaurateur.new
    end

    def saisirInformations
        @restaurateur = Restaurateur.new(restaurateur_params)
        
        #Utilisattion des fonctions prédéfinis de rails
        #Pas de nécessité de créer Restaurateur.setInfo comme dans le RDCU1 
        if @restaurateur.save
            redirect_to :action => "entrepreneur", notice: "add was successfully"
            if !params[:restaurant].to_s.match(/-1/)
               Restaurant.update(params[:restaurant], utilisateur_id: @restaurateur.id)
            end
        else
            redirect_to :action => "entrepreneur", alert: "add was not successfully"
        end 
    end

    def supprimerRestaurateur
        
        res = Restaurateur.find(params[:id]).destroy
        redirect_to :action => "entrepreneur" 

     end

    def modifierRestaurateur
        @restaurateur_modification = Restaurateur.find(params[:id])
        respond_to do |format|
            if @restaurateur_modification != nil
              format.json { render json: @restaurateur_modification, status: :created}
            end
        end
    end

  def entrepreneur
  	@restaurateur = Restaurateur.all
  	@nouveau_restaurateur = Restaurateur.new
    @nouveau_restaurant = Restaurant.new
    @restaurants = Restaurant.all
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

end

