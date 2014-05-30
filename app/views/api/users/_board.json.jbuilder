json.(board, :id, :brand, :model, :length, 
						 :width, :thickness, :description,
						 :condition, :owner_id, :created_at,
						 :price, :board_type, :updated_at, 
						 :address, :city, :state, :zipcode, 
						 :country, :latitude, :longitude, 
			)

json.images board.images do |image|
	json.id image.id
	json.url image.attachment
	json.small image.attachment(:small)
	json.large image.attachment(:large)
	json.imageable_id image.imageable_id
	json.imageable_type image.imageable_type
end

json.rentals board.rentals do |rental|
	json.id rental.id
	json.start_date rental.start_date
	json.end_date rental.end_date
	json.price rental.price
	json.status rental.status
	json.renter_id rental.renter_id
end