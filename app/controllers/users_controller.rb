class UsersController < ApplicationController
  layout 'application'
  include API

  def commande
  end

  def profile
    @_user = current_client
    @_adresse = nil
    if @_user == nil
      redirect_to  :controller => 'app', :action => 'index'
    else
      @_adresse  = client_adresse[0]
    end
  end
end
