class Livreur < Utilisateur
	has_many :commandes
	has_one :livraison, :through => :commandes 
	def self.model_name
    	Utilisateur.model_name
    end
end
