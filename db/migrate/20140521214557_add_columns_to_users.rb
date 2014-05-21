class AddColumnsToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :username, :string
  	add_column :users, :fname, :string
  	add_column :users, :lname, :string
  	add_index :users, :username, unique: true
  end
end