class FixRentalIdColumnMixup < ActiveRecord::Migration
  def change
  	remove_column :boards, :renter_id
  	add_column :board_rentals, :renter_id, :integer
  end
end
