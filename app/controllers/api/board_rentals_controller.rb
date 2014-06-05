class Api::BoardRentalsController < ApplicationController
	  before_action :authenticate_user!, :only => [:approve, :deny]
	  before_action :require_board_ownership!, :only => [:approve, :deny]
	  before_action :require_can_not_request_own_board!, :only => [:create]

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
			# @board_rental.board_id = params[:board_id]
			@board_rental.renter_id = current_user.id
			if @board_rental.save
				render :json => @board_rental
			else
				render :json => @board_rental.errors.full_messages, status: 422
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

		def pend
			@board_rental = BoardRental.find(params[:id])
			@board_rental.pend!
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
			params.require(:board_rental).permit(:board_id, :start_date, :end_date, :status)
		end

		def require_board_ownership!
    	#RENDER A JSON ERROR!
    	redirect_to new_user_session_url unless current_user.owns_board?(current_board)
  	end

  	def require_can_not_request_own_board!
  		#RENDER A JSON ERROR!
    	redirect_to new_user_session_url unless !current_user.owns_board?(current_board)
  	end
end