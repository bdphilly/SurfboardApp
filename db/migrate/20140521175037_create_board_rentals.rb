class CreateBoardRentals < ActiveRecord::Migration
  def change
    create_table :board_rentals do |t|
    	t.integer :board_id, null: false
    	t.date :start_date, null: false
    	t.date :end_date, null: false
    	t.string :status, null: false
      t.timestamps
    end
    add_index :board_rentals, :board_id
  end
end
