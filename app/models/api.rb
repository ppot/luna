module API
	def current_client
	  	if session[:current_user_id] != nil
	  		_user = Utilisateur.find(session[:current_user_id])
	  	else
	  		nil
	  	end
  	end

  	def getRestaurateurRestaurant
  		_restaurant = Restaurant.where("restaurateur_id = ?",session[:current_user_id])
  	end
  	
  	def client_adresse
  		_adresse = Adresse.where("adresseable_id =? AND principale = true",session[:current_user_id]).first
  	end

  	def client_adresses
  		_adresses = Adresse.where("adresseable_id =?",session[:current_user_id])
  	end

	def auth(aka,password)
		if aka != "" && password != ""
	  		_user = Utilisateur.where("identificateur = ? AND mot_de_passe = ?", aka, password)
	  	end
	end

end