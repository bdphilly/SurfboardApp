class Api::PhotosController < ApplicationController

	def index
		@photos = Photo.all
	end

	def create
		@photo = Photo.new(photo_params)
		##need to write the rest
	end

	private

	def photo_params
		params.require(:photo).permit(:imageable_id, :imageable_type, :attachment)
	end

end