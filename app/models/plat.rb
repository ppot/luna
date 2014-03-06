class Plat < ActiveRecord::Base
	belongs_to :menu
	has_many :commandes_plats
	has_many :commandes, through: => :commandes_plats
end
