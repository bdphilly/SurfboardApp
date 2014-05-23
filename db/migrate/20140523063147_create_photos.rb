class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
    	t.references :imageable, polymorphic: true
    	t.string :name
    	t.string :attachment_file_name
    	t.integer :attachment_file_size
      t.timestamps
    end

  end
end