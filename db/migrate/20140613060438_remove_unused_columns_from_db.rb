class RemoveUnusedColumnsFromDb < ActiveRecord::Migration
  def change
  	remove_column :board_rentals, :price
  	remove_column :boards, :thickness
  end
end
