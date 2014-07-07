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
  has_attached_file :attachment, :styles => { :small => "100x100#",:medium => "200x200#", :large => "300x300#" }
  validates_attachment_content_type :attachment, :content_type => /\Aimage\/.*\Z/

  def small_attachment
    return self.attachment(:small)
  end

  def medium_attachment
    return self.attachment(:medium)
  end

  def large_attachment
    return self.attachment(:large)
  end

end
