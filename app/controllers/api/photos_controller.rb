class Api::PhotosController < ApplicationController

	def index
		@photos = Photo.all
	end

	def create
		@photo = Photo.new(photo_params)
		
		if @photo.save
			redirect_to boards_url
		else
			flash.now[:errors] = @photo.errors.full_messages
			render :new
		end


	end

	private

	def photo_params
		params.require(:photo).permit(:imageable_id, :imageable_type, :attachment)
	end

end