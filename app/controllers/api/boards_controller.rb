class Api::BoardsController < ApplicationController
	# wrap_parameters :board, include: [:images_attributes]
	wrap_parameters :board, include: [:images_attributes, :brand, :model, 
			:length, :width, :thickness, :description, :condition, :images,
			:address, :city, :state, :zipcode, :country, :price, :type, :board_type
		]

	def index
		@boards = Board.search(params)
	end

	def show
		@board = Board.find(params[:id])
	end

	def new
		@board = current_user.boards.new
		# 4.times do
    	@board.images.build
  	# end
	end

	def create
		@board = current_user.boards.new(board_params)
		if @board.save
			render :json => @board
			# redirect_to boards_url
		else
			# render :json => { error: @board.errors.full_messages }, status: :unprocessable_entity
			flash.now[:errors] = @board.errors.full_messages
			render :new
		end
	end

	def edit
		@board = Board.find(params[:id])
	end

	def update
		@board = Board.find(params[:id])
		if @board.update_attributes(board_params)
			flash[:notices] = ["Board updated successfully!"]
			redirect_to boards_url
		else
			flash.now[:errors] = @board.errors.full_messages
			render :edit
		end
	end
	
	def destroy
		board.find(params[:id])
		board.destroy
		flash[:notices] = ["Board has been removed"]
		redirect_to boards_url
	end

	def search
		@boards = Board.search(params)
	end

	private

	def board_params
		params.require(:board).permit(
			:brand, 
			:model, 
			:length, 
			:width,
			:thickness,
			:description,
			:condition,
			:images,
			:address,
			:city,
			:state,
			:zipcode,
			:country,
			:price,
			:type,
			:board_type,
			:start_date,
			:end_date,
			:images_attributes => [:attachment]
		)
	end
end