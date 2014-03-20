class Restaurateur < Utilisateur
	has_one :restaurant #pareil que on delete cascade set null
	accepts_nested_attributes_for :restaurant
	has_one :adresse, through: :restaurant
	def self.model_name
    	Utilisateur.model_name
    end

end
