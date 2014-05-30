class Api::BoardRentalsController < ApplicationController
	  before_action :authenticate_user!, :only => [:approve, :deny]
	  before_action :require_board_ownership!, :only => [:approve, :deny]

		def new
			@board_rental = BoardRental.new
		end

		def index
			@board_rentals = BoardRental.all
		end

		def show
			@board_rental = BoardRental.find(params[:id])
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

		def approve
			@board_rental = BoardRental.find(params[:id])
			@board_rental.approve!
			render :json => @board_rental
		end

		def deny
			@board_rental = BoardRental.find(params[:id])
			@board_rental.deny!
			render :json => @board_rental
		end

		private

		def current_board
	    current_board_rental_request.board
		end

		def current_board_rental_request
			@board_rental ||= BoardRental.includes(:board).find(params[:id])
		end

		def board_rental_params
			params.require(:board_rental).permit(:board_id, :start_date, :end_date, :status, :price)
		end

		def require_board_ownership!
    	redirect_to new_user_session unless current_user.owns_board?(current_cat)
  	end

end