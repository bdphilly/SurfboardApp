class Api::BoardsController < ApplicationController

	def index
		@boards = Board.all
	end

	def show
		@board = Board.find(params[:id])
	end

	def new
		@board = current_user.boards.new
	end

	def create
		@board = current_user.boards.new(board_params)

		if @board.save
			redirect_to boards_url
		else
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

	private

	def board_params
		params.require(:board).permit(
			:brand,  
			:model,
			:length, 
			:width,
			:thickness,
			:description,
			:condition
		)
	end
end