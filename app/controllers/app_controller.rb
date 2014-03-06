class AppController < ApplicationController
  layout 'application'
  def index
  end

  def login
    session[:user]="bob"
    redirect_to :action => 'index'
  end

  def logout
    session[:user] = nil
    redirect_to :action => 'index'
  end

end
