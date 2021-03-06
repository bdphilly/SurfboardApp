# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  reset_password_token   :string(255)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string(255)
#  last_sign_in_ip        :string(255)
#  created_at             :datetime
#  updated_at             :datetime
#  username               :string(255)
#  fname                  :string(255)
#  lname                  :string(255)
#  avatar_file_name       :string(255)
#  avatar_content_type    :string(255)
#  avatar_file_size       :integer
#  avatar_updated_at      :datetime
#  about                  :text
#

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :boards, 
    class_name: "Board",
    foreign_key: :owner_id

  ##JOIN TABLE (Board Rental Requests)
  has_many :rentals,
    class_name: "BoardRental",
    foreign_key: :renter_id

  has_many :rented_in_boards, through: :rentals, source: :board
  has_many :customer_rentals, through: :boards, source: :rentals
  has_many :rented_out_boards, through: :customer_rentals, source: :board

  has_one :avatar, :as => :imageable, :class_name => "User::Avatar", :dependent => :destroy
  accepts_nested_attributes_for :avatar

  def owns_board?(board)
    board.owner_id == self.id
  end

end
