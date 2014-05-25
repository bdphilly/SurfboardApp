class AddAddressAndLatLongToBoards < ActiveRecord::Migration
  def change
  	add_column :boards, :address, :string
  	add_column :boards, :city, :string
  	add_column :boards, :state, :string
  	add_column :boards, :zipcode, :string
  	add_column :boards, :country, :string
  	add_column :boards, :latitude, :float
  	add_column :boards, :longitude, :float
  end
end
