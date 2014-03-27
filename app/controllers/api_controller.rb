class ApiController < ApplicationController
include  API

  # =======================  CONNECTION function ==========================  
  def  signin
      _user = auth(params[:identificateur],params[:mot_de_passe])
      if  _user  != nil &&_user[0] != nil
          session[:current_user_id] = _user[0].id
          render json: 1 
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
end