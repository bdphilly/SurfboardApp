class AddPriceColumnToBoardRental < ActiveRecord::Migration
  def change
  	add_column :board_rentals, :price, :integer
  end
end
