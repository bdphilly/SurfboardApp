json.(board, :id, :model, :length, 
						 :width, :thickness, :description,
						 :condition, :owner_id, :created_at,
						 :updated_at 
			)

json.images board.images do |image|
	json.id image.id
	json.url image.url
end