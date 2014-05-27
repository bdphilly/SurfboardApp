# == Schema Information
#
# Table name: board_rentals
#
#  id         :integer          not null, primary key
#  board_id   :integer          not null
#  start_date :date             not null
#  end_date   :date             not null
#  status     :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#  renter_id  :integer
#  price      :integer
#

class BoardRental < ActiveRecord::Base
	STATUS_STATES = ["Available", "Unavailable", "Rented"]

	##take this out after app is functional, let user choose...
  before_validation :assign_available_status

	validates :board_id, :start_date, :end_date, :status, presence: true

	validates :status, inclusion: STATUS_STATES

	validate :does_not_overlap_rental

	belongs_to :board,
		class_name: "Board",
		foreign_key: :board_id

	belongs_to :renter,
		class_name: "User",
		foreign_key: :renter_id

	def rented?
		self.status == "Rented"
	end

	def available?
		self.status == "Available"
	end

	def unavailable?
		self.status == "Unavailable" || self.status == "Rented"
	end

	private

	def assign_available_status
		self.status ||= "Available"
	end

	def mark_available!
		self.status = "Available"
	end

	def mark_unavailable!
		self.status = ""
	end
	
	def overlapping_rentals
	  conditions = <<-SQL
	    (
	      (board_id = :board_id)
	      AND (
	        (
	          (start_date BETWEEN :start_date AND :end_date)
	          OR (end_date BETWEEN :start_date AND :end_date)
	        ) OR (
	          (:start_date BETWEEN start_date AND end_date)
	          OR (:end_date BETWEEN start_date AND end_date)
	        )
	      )
	    )
	  SQL

	  overlapping_rentals = BoardRental.where(conditions, {
	  	board_id: self.board_id,
	  	start_date: self.start_date,
	  	end_date: self.end_date
		})

	  if self.id.nil?
	    overlapping_rentals
	  else
	    overlapping_rentals.where("id != ?", self.id)
	  end
	end
################

  def valid_rental
    overlapping_rentals.where("status = 'Available'")
  end

  def invalid_rental
    puts overlapping_rentals.where("status = 'Rented'" || "status = 'Unavailable'")
		overlapping_rentals.where("status = 'Rented'" || "status = 'Unavailable'")
  end

  def does_not_overlap_rental
    unless valid_rental.empty?
      errors[:base] << "The board cannot be rented for this date!"
    end
  end
end
