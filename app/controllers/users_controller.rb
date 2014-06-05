class UsersController < ApplicationController
	
	before_filter :authenticate_user!
	
	def show
		@user = current_user
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