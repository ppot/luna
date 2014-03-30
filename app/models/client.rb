class Client < Utilisateur
	has_one :info, dependent: :destroy
	has_many :commandes
	has_many :adresses, as: :adresseable, dependent: :destroy
	
	def self.model_name
    	Utilisateur.model_name
    end
end
