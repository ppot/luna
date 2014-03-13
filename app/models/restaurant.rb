class Restaurant < ActiveRecord::Base
	belongs_to :utilisateur
	has_one :menu
	has_one :adresse, as: :adresseable
	accepts_nested_attributes_for :adresse
end
