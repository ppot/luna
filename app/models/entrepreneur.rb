has_many :adresses, as: :adresseable
class Entrepreneur < Utilisateur
    def self.model_name
        Utilisateur.model_name
    end
end
