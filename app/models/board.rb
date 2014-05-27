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
#  address            :string(255)
#  city               :string(255)
#  state              :string(255)
#  zipcode            :string(255)
#  country            :string(255)
#  latitude           :float
#  longitude          :float
#

class Board < ActiveRecord::Base
  # attr_accessible :address, :city, :state, :zip, :country

  validates :owner_id, presence: true

  geocoded_by :address_to_string, if: :address_changed?

  after_validation :geocode

  belongs_to :owner,
    class_name: "User",
    foreign_key: :owner_id,
    dependent: :destroy

  has_many :rentals,
    class_name: "BoardRental",
    foreign_key: :board_id

	has_many :images, :as => :imageable, :class_name => "Board::Image", :dependent => :destroy
  accepts_nested_attributes_for :images

  def self.search(params)
    params.each do |param|
      puts param
    end
  end

  def address_to_string
    [address, city, state, zipcode, country].compact.join(', ')
  end

  def address_changed?
    address_changed? || city_changed? || state_changed? || zipcode_changed? || country_changed?
  end
end