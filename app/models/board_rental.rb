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
#

class BoardRental < ActiveRecord::Base
	STATUS_STATES = ["AVAILABLE", "UNAVAILABLE", "RENTED"]

	##take this out after app is functional, let user choose...
  before_validation :assign_available_status

	validates :board_id, :start_date, :end_date, :status, presence: true

	validates :status, inclusion: STATUS_STATES

	belongs_to :board,
		class_name: "Board",
		foreign_key: :board_id

	def rented?
		self.status == 'RENTED'
	end

	def available?
		self.status == "AVAILABLE"
	end

	def unavailable?
		self.status == "UNAVAILABLE" || self.status == "RENTED"
	end

	private

	def assign_available_status
		self.status ||= "AVAILABLE"
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

  overlapping_rentals = BoardRental.where(conditions {
  	board_id: self.board_id,
  	start_date: self.start_date,
  	end_date: self.end_date
	})

  if self.id.nil?
    overlapping_rentals
  else
    overlapping_rentals.where("id != ?", self.id)
  end

################

  def valid_rental
    overlapping_rental.where("status = 'AVAILABLE'")
  end

  def invalid_rental
    overlapping_requests.where("status = 'RENTED'" || "status = 'UNAVAILABLE'")
  end

  def does_not_overlap_approved_request
    unless overlapping_approved_requests.empty?
      errors[:base] << "The board cannot be rented for this date!"
    end
  end
end

end