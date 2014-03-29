class Adresse < ActiveRecord::Base
	belongs_to :adresseable, polymorphic: true
	validates_presence_of :no_maison, :rue, :ville, :code_postal, :telephone, message: "Le champ ne doit pas être vide"
 	validates_length_of	:no_maison, maximum: 15, too_long: "Ne doit pas dépasser 15 caractères"
 	validates_numericality_of :telephone, only_integer: true, message: "Le champ doit être alphanumérique"
 	validates :code_postal, format: { with: /\A[a-zA-Z]\d[a-zA-Z]\d[a-zA-Z]\d\z/, message: "code postal invalide" }
end
