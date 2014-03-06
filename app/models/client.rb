class Client < ActiveRecord::Base
	has_many :commandes
	has_many :adresses, as: :adresseable
end
