class AppController < ApplicationController
  layout 'application'
  include API
  
  def index
     @_user = current_client
  end
end
