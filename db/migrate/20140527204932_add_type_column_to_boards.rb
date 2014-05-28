class AddTypeColumnToBoards < ActiveRecord::Migration
  def change
  	add_column :boards, :board_type, :string
  end
end
