json.(board, :id, :brand, :model, :length, 
						 :width, :description,
						 :condition, :owner_id, :created_at,
						 :price, :board_type, :updated_at, 
						 :address, :city, :state, :zipcode, 
						 :country, :latitude, :longitude
			)

json.owner_fname board.owner.fname
json.owner_lname board.owner.lname

if board.owner_avatar
	json.owner_avatar board.owner_avatar, :id, :attachment, 
				:small_attachment, :medium_attachment, :large_attachment,
				:imageable_id, :imageable_type
end

json.images board.images do |image|
	json.id image.id
	json.url image.attachment
	json.small image.attachment(:small)
	json.large image.attachment(:large)
	json.imageable_id image.imageable_id
	json.imageable_type image.imageable_type
end

json.rentals board.rentals do |rental|
	json.renter_fname rental.renter.fname
	json.renter_lname rental.renter.lname

	if rental.renter.avatar
		json.renter_avatar rental.renter.avatar, :id, :attachment, 
					:small_attachment, :medium_attachment, :large_attachment,
					:imageable_id, :imageable_type
	end
	
	json.owner_fname board.owner.fname
	json.owner_lname board.owner.lname
	json.id rental.id
	json.start_date rental.start_date
	json.end_date rental.end_date
	json.status rental.status
	json.renter_id rental.renter_id
end