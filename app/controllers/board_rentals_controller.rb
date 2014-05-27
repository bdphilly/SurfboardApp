class BoardRentalsController < ApplicationController

		def new
			@board_rental = BoardRental.new
		end
	
		def create
			@board_rental = BoardRental.new(board_rental_params)
			@board_rental.board_id = params[:board_id]
			@board_rental.renter_id = current_user.id
			if @board_rental.save
				redirect_to board_url(@board_rental.board)
			else
				flash.now[:errors] = @board_rental.errors.full_messages
				render :new
			end
		end

		private
		def board_rental_params
			params.require(:board_rental).permit(:board_id, :start_date, :end_date, :status, :price)
		end
end