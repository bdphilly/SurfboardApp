json.(current_user, :id, :email, :fname, :lname, :about, :sign_in_count)

if current_user.avatar
	json.avatar current_user.avatar, :id, :attachment, 
			:small_attachment, :medium_attachment, :large_attachment,
			:imageable_id, :imageable_type
end

if current_user.boards
	json.boards current_user.boards do |board|
		json.partial!("board", :board => board)
	end	
end

json.rentals current_user.rentals do |rental|
	json.id rental.id
	json.board_id rental.board_id
	json.start_date rental.start_date
	json.end_date rental.end_date
	json.price rental.price
	json.status rental.status
	json.renter_id rental.renter_id
end

json.rented_in_boards current_user.rented_in_boards do |board|
	json.partial!("board", :board => board)
end	

json.customer_rentals current_user.customer_rentals do |rental|
	json.id rental.id
	json.start_date rental.start_date
	json.end_date rental.end_date
	json.price rental.price
	json.status rental.status
	json.renter_id rental.renter_id

	if rental.renter.avatar
		json.renter_avatar rental.renter.avatar, :id, :attachment, 
					:small_attachment, :medium_attachment, :large_attachment,
					:imageable_id, :imageable_type
	end
end	

json.rented_out_boards current_user.rented_out_boards.uniq do |board|
	json.partial!("board", :board => board)
end	