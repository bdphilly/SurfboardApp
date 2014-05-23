# == Schema Information
#
# Table name: photos
#
#  id                   :integer          not null, primary key
#  imageable_id         :integer
#  imageable_type       :string(255)
#  name                 :string(255)
#  attachment_file_name :string(255)
#  attachment_file_size :integer
#  created_at           :datetime
#  updated_at           :datetime
#

class Photo < ActiveRecord::Base
	belongs_to :imageable, polymorphic: true
	delegate :url, to: :attachment

end
