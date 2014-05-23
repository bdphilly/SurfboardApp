class Photo < ActiveRecord::Base
	belongs_to :imageable, polymorphic: true
	delegate :url, to: :attachment

end