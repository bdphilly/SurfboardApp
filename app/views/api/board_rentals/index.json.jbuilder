json.rentals board.rentals do |rental|
	json.start_date rental.start_date
	json.end_date rental.end_date
	json.price rental.price
	json.status rental.status
	json.renter_id rental.renter_id
end