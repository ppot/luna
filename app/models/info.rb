class Info < ActiveRecord::Base
	belongs_to :client , dependent: :delete #on delete cascade
end
