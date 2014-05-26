json.(board, :id, :brand, :model, :length, 
						 :width, :thickness, :description,
						 :condition, :owner_id, :created_at,
						 :updated_at, :address, :city, :state,
						 :zipcode, :country, :latitude, :longitude 
			)

json.images board.images do |image|
	json.id image.id
	json.url image.attachment
	json.small image.attachment(:small)
	json.large image.attachment(:large)
	json.imageable_id image.imageable_id
	json.imageable_type image.imageable_type
end
