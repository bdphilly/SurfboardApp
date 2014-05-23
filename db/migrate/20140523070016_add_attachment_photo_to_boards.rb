class AddAttachmentPhotoToBoards < ActiveRecord::Migration
  def self.up
    change_table :boards do |t|
      t.attachment :photo
    end
  end

  def self.down
    drop_attached_file :boards, :photo
  end
end
