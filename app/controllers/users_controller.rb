class UsersController < ApplicationController
	
	before_filter :authenticate_user!, :only => [:update, :show]
	
	def new
		redirect_to new_user_session_path
	end

	def show
		@user = User.find(params[:id])
	end

	def update
		@user = User.find(params[:id])
		
		if @user.update_attributes(user_params)
			redirect_to boards_url
		else
			flash.now[:errors] = @user.errors.full_messages
			redirect_to edit_user_registration_url
		end
	end

	private
  
  def user_params
  	params.require(:user).permit(:email, :password, :avatar_attributes => [:attachment])
  end
	
end