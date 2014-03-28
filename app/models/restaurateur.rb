class Restaurateur < Utilisateur
	has_one :restaurant, dependent: :nullify #pareil que on delete cascade set null
	accepts_nested_attributes_for :restaurant
	has_one :adresse, through: :restaurant

	validates_presence_of :nom, :prenom, :identificateur, :mot_de_passe, message: "Le champ ne doit pas être vide"
 	validates_length_of	:nom, in: 2..15, too_short: "Doit avoir deux caractères", too_long: "Ne doit pas dépasser 15 caractères"
 	validates_uniqueness_of :identificateur, message: "Le nom d'utilisateur est déja pris"
 	validates_length_of	:mot_de_passe, maximum: 15, too_long: "Ne doit pas dépasser 15 caractères"
	
	def self.model_name
    	Utilisateur.model_name
    end

end
