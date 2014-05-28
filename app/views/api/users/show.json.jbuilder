json.(current_user, :id, :email, :fname, :lname, :sign_in_count)

json.avatar current_user.avatar, :id, :attachment, 
		:small_attachment, :medium_attachment, :large_attachment,
		:imageable_id, :imageable_type

json.rentals current_user.rentals do |rental|
	json.start_date rental.start_date
	json.end_date rental.end_date
	json.price rental.price
	json.status rental.status
	json.renter_id rental.renter_id
end