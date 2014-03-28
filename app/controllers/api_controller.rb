class ApiController < ApplicationController
include  API

  # =======================  CONNECTION function ==========================  
  def  signin
      _user = auth(params[:identificateur],params[:mot_de_passe])
      if  _user  != nil &&_user[0] != nil
          session[:current_user_id] = _user[0].id
          if _user[0].type == 'Client'
            render json: 1
          elsif _user[0].type == 'Restaurateur'
            render json: 2
          elsif _user[0].type == 'Livreur'
            render json: 3
          elsif _user[0].type == 'Entrepreneur'
            render json: 4
          end
      else
        render json: 0
      end
  end

  def signout
      session[:current_user_id]  = nil
      redirect_to  :controller => 'app', :action => 'index'
  end

  def register
    user = Client.new(client_params)
    user.created_at=DateTime.now
    # user.type = ;
      if user.save
        infos = Info.new(infos_params)
        infos.client_id = user.id
        infos.created_at = user.created_at

        adress = Adresse.new(adress_params) 
        adress.adresseable_id  =  user.id 
        adress.principale  =  true

        if adress.no_maison != nil
            adress.save  
            p adress
        end

          session[:current_user_id]  = user.id
          render json: 1

      else
        render json: 0
      end
  end

  def client_params
      params.require(:utilisateur).permit(:identificateur, :mot_de_passe, :nom, :prenom)
  end
  def infos_params
      params.require(:infos).permit(:courriel, :date_naissance)
  end
  def adress_params
      params.require(:adress).permit(:no_maison, :rue, :ville, :telephone, :code_postal)
  end

  # =================================================
  # ========================  USER Function  =========================
  def user_update
    _user = current_client
    _user.mot_de_passe = params[:mot_de_passe]
    # _user.update(:mot_de_passe,params[:mot_de_passe])
    _adresse = client_adresse[0]
    _adresse.update_attributes(adress_params)
    render json: _adresse
  end
  # ===================================================
  # ========================  Restaurant Function  =========================
  def listRestaurants
    _restaurants = Restaurant.all
    render json: _restaurants
  end

  def getRestaurantForRestaurateur
       _restaurant = getRestaurateurRestaurant
      if  _restaurant  != nil && _restaurant[0] != nil
          _restaurant = _restaurant[0]
      else
        _restaurant = nil
      end
      render json: _restaurant
  end

  def getRetaurantMenu
       _restaurant = getRestaurateurRestaurant
       _menu = nil
      if  _restaurant  != nil && _restaurant[0] != nil
          if _restaurant[0].menu != nil
            _menu = _restaurant[0].menu 
          end
      else
        _menu = nil
      end
      render json: _menu
  end

  def bindMenu
    _restaurant = getRestaurateurRestaurant
    if  _restaurant  != nil && _restaurant[0] != nil
      _menu = Menu.new()
      _menu.nom = params[:nom]
      _menu.id = _restaurant[0].id
      _menu.save
      _restaurant[0].menu = _menu
      _restaurant[0].save
     render json: 1
    else
      render json: 0
    end
  end

  def createPlat
    _restaurant = getRestaurateurRestaurant
    if  _restaurant  != nil && _restaurant[0] != nil
      if _restaurant[0].menu != nil
      _plat = Plat.new()
      _plat.nom = params[:nom]
      _plat.prix = params[:prix]
      _plat.description = params[:description]
      _plat.menu_id =  _restaurant[0].menu.id
      _plat.save
      render json: _plat
      end
    else
      render json: 0
    end
  end

  def modPlat
      _plat = Plat.find(params[:id])
      if(_plat !=  nil)
        _plat.nom = params[:nom]
        _plat.prix = params[:prix]
        _plat.description = params[:description]
        _plat.save
        render json: _plat
      else
        render json: 0
      end
  end

  def listPlat
    _restaurant = getRestaurateurRestaurant
    if  _restaurant  != nil && _restaurant[0] != nil
      if _restaurant[0].menu != nil
        _plats = Plat.where("menu_id = ?",_restaurant[0].menu.id)
        render json: _plats
      end
    end
  end

  def plat
    _plat = Plat.find(params[:id])
    render json:_plat
  end
  # ===================================================
end