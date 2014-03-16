class Restaurant < ActiveRecord::Base
	belongs_to :restaurateur
	has_one :menu
	has_one :adresse, as: :adresseable
	accepts_nested_attributes_for :adresse
end
