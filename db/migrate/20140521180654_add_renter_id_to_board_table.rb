class AddRenterIdToBoardTable < ActiveRecord::Migration
  def change
  	add_column :boards, :renter_id, :integer
  end
end
