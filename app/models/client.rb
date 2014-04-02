class Client < Utilisateur
	has_one :info
	has_many :commandes
	has_many :adresse, as: :adresseable
	def self.model_name
        Utilisateur.model_name
    end
end
