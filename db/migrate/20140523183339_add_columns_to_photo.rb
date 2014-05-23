class AddColumnsToPhoto < ActiveRecord::Migration
  def change
  	add_column :photos, :attachment_content_type, :string
  	add_column :photos, :attachment_updated_at, :datetime
  end
end