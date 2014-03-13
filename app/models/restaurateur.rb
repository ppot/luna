class Restaurateur < Utilisateur
	has_one :restaurant
	accepts_nested_attributes_for :restaurant
	def self.model_name
    	Utilisateur.model_name
    end

end
