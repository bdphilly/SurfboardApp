class ChangeColumnsInBoardsTable < ActiveRecord::Migration
  def change
  	change_column :boards, :width, :string
  	change_column :boards, :description, :text

  	add_column :users, :about, :text
  end
end
