# == Schema Information
#
# Table name: board_rentals
#
#  id         :integer          not null, primary key
#  board_id   :integer          not null
#  start_date :date             not null
#  end_date   :date             not null
#  stats      :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#

class BoardRental < ActiveRecord::Base
	validates :board_id, :start_date, :end_date, :status
end
