class CreateBoards < ActiveRecord::Migration
  def change
    create_table :boards do |t|
    	t.string :brand
			t.string :model
			t.integer :length
			t.integer	:width
			t.integer :thickness
			t.string :description
			t.integer :condition

			t.integer :owner_id, null: false
      t.timestamps
    end
  end
end
