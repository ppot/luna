class Adresse < ActiveRecord::Base
	belongs_to :adresseable, polymorphic: true
	validates_presence_of :no_maison, :rue, :ville, :code_postal, :telephone, message: "Le champ ne doit pas être vide"
 	validates_length_of	:no_maison, maximum: 15, too_long: "Ne doit pas dépasser 15 caractères"
end
