json.rental_id rental.id
json.board_id rental.board_id
json.start_date rental.start_date
json.end_date rental.end_date
json.price rental.price
json.status rental.status
json.renter_id rental.renter_id
json.board rental.board
json.owner rental.board.owner

if rental.board.owner.avatar
	json.avatar rental.board.owner.avatar, :id, :attachment, 
			:small_attachment, :medium_attachment, :large_attachment,
			:imageable_id, :imageable_type
end

json.images rental.board.images do |image|
	json.id image.id
	json.url image.attachment
	json.small image.attachment(:small)
	json.large image.attachment(:large)
	json.imageable_id image.imageable_id
	json.imageable_type image.imageable_type
end