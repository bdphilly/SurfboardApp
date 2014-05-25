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

class User::Avatar < Photo
  has_attached_file :attachment, :styles => { :small => "100x100#", :large => "200x200>" }
end
