class Restaurateur < Utilisateur
	has_one :restaurant
	def self.model_name
    	Utilisateur.model_name
    end
end
