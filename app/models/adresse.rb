class Adresse < ActiveRecord::Base
	belongs_to :adresseable, polymorphic: true
end
