json.(board, :id, :brand, :model, :length, 
						 :width, :thickness, :description,
						 :condition, :owner_id, :created_at,
						 :updated_at 
			)

json.images board.images do |image|
	json.id image.id
	json.url image.url
	json.imageable_id image.imageable_id
	json.imageable_type image.imageable_type
end
