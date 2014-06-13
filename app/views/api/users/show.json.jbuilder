json.(current_user, :id, :email, :fname, :lname, :about, :sign_in_count)

if current_user.avatar
	json.avatar current_user.avatar, :id, :attachment, 
			:small_attachment, :medium_attachment, :large_attachment,
			:imageable_id, :imageable_type
end

json.boards current_user.boards do |board|
	json.partial!("board", :board => board)
end	

json.rentals current_user.rentals do |rental|
	json.partial!("rental", :rental => rental)
end

json.customers current_user.customer_rentals do |rental|	
	json.partial!("customer", :rental => rental)
end	

json.rented_out_boards current_user.rented_out_boards.uniq do |board|
	json.partial!("board", :board => board)
end	

json.rented_in_boards current_user.rented_in_boards do |board|
	json.partial!("board", :board => board)
end	