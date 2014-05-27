class AddPriceColumnToBoard < ActiveRecord::Migration
  def change
  	add_column :boards, :price, :integer
  end
end
