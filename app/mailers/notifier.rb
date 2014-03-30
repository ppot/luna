class Notifier < ActionMailer::Base
  default from: 'luna.restaurant.2014@gmail.com'
  
  def notifier_client(client, commande)
    @client = client
    @commande = commande
    mail :to => @client.info.courriel, :subject => "Restaurants Luna, livraison"
  end
end
