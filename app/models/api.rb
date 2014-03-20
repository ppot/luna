module API
	def current_client
	  	if session[:current_user_id] != nil 
	  		_user = Client.find(session[:current_user_id])
	  	else
	  		nil
	  	end
  	end

  	def client_adresse
  		_adresse = Adresse.where("adresseable_id =? AND principale = true",session[:current_user_id])
  	end

	def auth(aka,password)
		if aka != "" && password != ""
	  		_user = Client.where("identificateur = ? AND mot_de_passe = ?", aka, password)
	  	end
	end

end