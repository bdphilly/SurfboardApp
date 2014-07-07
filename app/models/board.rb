# == Schema Information
#
# Table name: boards
#
#  id                 :integer          not null, primary key
#  brand              :string(255)
#  model              :string(255)
#  length             :string(255)
#  width              :string(255)
#  description        :text
#  condition          :string(255)
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
#  price              :integer
#  board_type         :string(255)
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

  has_one :owner_avatar, through: :owner, source: :avatar

  def self.search(params)
    results = []

    boards = Board.all
    boards = Board.find_by_type(params) if params[:board_type]
    boards = boards.find_by_price(params) if params["max_price"]
    boards = boards.find_by_location(params) if params["sw-lat"]
    # boards = boards.find_by_availability(params) if params["start_date"]

    boards
  end

  def self.find_by_type(params)
    self.where({:board_type => params[:board_type]})
  end

  def self.find_by_price(params)
    self.where("price <= ?", params["max_price"])
  end

  def self.find_by_location(params)
    conditions = <<-SQL
      (
        (latitude BETWEEN :sw_lat AND :ne_lat)
        AND 
        (longitude BETWEEN :sw_lng AND :ne_lng)
      )
    SQL

    in_bounds_boards = self.where(conditions, {
      sw_lat: params["sw-lat"],
      sw_lng: params["sw-lng"],
      ne_lat: params["ne-lat"],
      ne_lng: params["ne-lng"],
      })
  end

  def self.find_by_availability(params)
    self.where(BoardRental.new({
      start_date: params["start_date"],
      end_date: params["end_date"],
      board_id: self.id, ##THIS DOESN'T WORK!
      status: 'Pending'
      }).valid?)
  end

  def address_to_string
    [address, city, state, zipcode, country].compact.join(", ")
  end

  def address_changed?
    address_changed? || city_changed? || state_changed? || zipcode_changed? || country_changed?
  end
end
