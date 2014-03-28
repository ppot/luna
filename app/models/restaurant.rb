class Restaurant < ActiveRecord::Base
	belongs_to :restaurateur
	has_one :menu
	has_one :adresse, as: :adresseable
	accepts_nested_attributes_for :adresse

	validates_presence_of :nom, message: "Le champ ne doit pas être vide"
 	validates_length_of	:nom, in: 2..15, too_short: "Doit avoir deux caractères", too_long: "Ne doit pas dépasser 15 caractères"
end
