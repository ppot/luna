class Commande < ActiveRecord::Base
	has_many :commandes_plats
	has_many :plats, through: :commandes_plats
end
