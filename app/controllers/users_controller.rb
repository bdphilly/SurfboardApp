class UsersController < ApplicationController
  # before_action :require_signed_out!, only: [:new, :create]
  # before_action :require_signed_in!, only: [:show]

  # def new
  #   @user = User.new
  # end

  # def create
  #   @user = User.new(user_params)
  #   @user.email = SecureRandom::urlsafe_base64(16) #temporary hack for random email address to pass validation

  #   if @user.save
  #     sign_in(@user)
  #     redirect_to user_url(@user)
  #   else
  #     flash.now[:errors] = @user.errors.full_messages
  #     render :new
  #   end
  # end

  # def show
  #   @user = User.find(params[:id])
  # end

  # def edit
  #   @user = User.find(params[:id])
  # end

  # def update
  #   @user = User.find(params[:id])

  #   if @user.update_attributes(user_params)
  #     redirect_to user_url(@user)
  #   else
  #     flash.now[:errors] = @user.errors.full_messages
  #     render :edit
  #   end
  # end

  # def destroy
  #   @user = User.find(params[:id])
  #   @user.destroy
  #   redirect_to new_session_url
  # end

  # private

  # def user_params
  #   params.require(:user).permit(:username, :password, :email, :fname, :lname)
  # end
end

#  # filters
# before_filter :authenticate_user!

# # controller helpers
# user_signed_in?
# current_user

# # url helpers
# new_user_registration_path
# new_user_session_path
# destroy_user_session_path