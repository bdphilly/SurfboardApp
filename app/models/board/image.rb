# == Schema Information
#
# Table name: photos
#
#  id                      :integer          not null, primary key
#  imageable_id            :integer
#  imageable_type          :string(255)
#  name                    :string(255)
#  attachment_file_name    :string(255)
#  attachment_file_size    :integer
#  created_at              :datetime
#  updated_at              :datetime
#  attachment_content_type :string(255)
#  attachment_updated_at   :datetime
#

class Board::Image < Photo
# validates :attachment, :attachment_content_type => { :content_type => ['image/png', 'image/jpg']}
  
  has_attached_file :attachment, :styles => { :small => "200x150#", :medium => "400x300#", :large => "640x480#" }
	validates_attachment_content_type :attachment, :content_type => /\Aimage\/.*\Z/

end
