# == Schema Information
#
# Table name: boards
#
#  id                 :integer          not null, primary key
#  brand              :string(255)
#  model              :string(255)
#  length             :integer
#  width              :integer
#  thickness          :integer
#  description        :string(255)
#  condition          :integer
#  owner_id           :integer          not null
#  created_at         :datetime
#  updated_at         :datetime
#  photo_file_name    :string(255)
#  photo_content_type :string(255)
#  photo_file_size    :integer
#  photo_updated_at   :datetime
#

class Board < ActiveRecord::Base
  validates :owner_id, presence: true

  belongs_to :owner,
    class_name: "User",
    foreign_key: :owner_id,
    dependent: :destroy

  has_many :rentals,
    class_name: "BoardRental",
    foreign_key: :board_id

	has_many :images, :as => :imageable, :class_name => "Board::Image", :dependent => :destroy
  accepts_nested_attributes_for :images

  def address_to_string
    
  end
end