class Board::Image < Photo
  has_attached_file :attachment, :styles => { :small => "100x100#", :large => "200x200>" }
end