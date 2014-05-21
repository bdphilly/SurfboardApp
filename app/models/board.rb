# == Schema Information
#
# Table name: boards
#
#  id          :integer          not null, primary key
#  brand       :string(255)
#  model       :string(255)
#  length      :integer
#  width       :integer
#  thickness   :integer
#  description :string(255)
#  condition   :integer
#  owner_id    :integer          not null
#  created_at  :datetime
#  updated_at  :datetime
#  renter_id   :integer
#

class Board < ActiveRecord::Base
  validates :owner_id, presence: true

  belongs_to :owner,
    class_name: "User",
    foreign_key: :owner_id,
    dependent: :destroy

  belongs_to :renter,
    class_name: "User",
    foreign_key: :renter_id

  has_many :rentals,
    class_name: "BoardRental",
    foreign_key: :board_id

end