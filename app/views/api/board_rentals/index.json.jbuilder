json.board_rentals @board_rentals do |rental|
  json.id rental.id
  json.board_id rental.board_id
  json.start_date rental.start_date
  json.end_date rental.end_date
  json.status rental.status
  json.renter_id rental.renter_id
end