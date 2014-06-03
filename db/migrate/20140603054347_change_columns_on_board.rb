class ChangeColumnsOnBoard < ActiveRecord::Migration
  def change
  	change_column :boards, :condition, :string
  	change_column :boards, :length, :string
  end
end
