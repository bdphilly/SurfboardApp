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
#

class BoardRental < ActiveRecord::Base
	STATUS_STATES = ["Pending", "Denied", "Unavailable", "Approved"]

	##take this out after app is functional, let user choose...
  # before_validation :assign_available_status

	validates :board_id, :start_date, :end_date, :status, presence: true

	validates :status, inclusion: STATUS_STATES

	validate :does_not_overlap_approved_request

	belongs_to :board,
		class_name: "Board",
		foreign_key: :board_id

	belongs_to :renter,
		class_name: "User",
		foreign_key: :renter_id

  def approve!
    raise "not pending" unless self.status == "Pending"
    transaction do
      self.status = "Approved"
      self.save!

      overlapping_pending_requests.update_all(status: "Denied")
    end
  end

  def deny!
  	self.status = "Denied"
  	self.save!
  end

  def pend!
		self.status = "Pending"
		self.save!
	end

	def approved?
		self.status == "Approved"
	end

	def pending?
		self.status == "Pending"
	end

	def denied?
		self.status == "Denied"
	end

	# def available?
	# 	self.status == "Available"
	# end

	def unavailable?
		self.status == "Unavailable" || self.status == "Approved" || self.status == "Denied"
	end

	private

	def assign_unavailable_status
		self.status ||= "Unavailable"
	end

	# def mark_available!
	# 	self.status = "Available"
	# end

	def mark_unavailable!
		self.status = "Unavailable"
	end
	
	def overlapping_requests
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

	  overlapping_requests = BoardRental.where(conditions, {
	  	board_id: self.board_id,
	  	start_date: self.start_date,
	  	end_date: self.end_date
		})

	  if self.id.nil?
	    overlapping_requests
	  else
	    overlapping_requests.where("id != ?", self.id)
	  end
	end
################

	def overlapping_approved_requests
    overlapping_requests.where("status = 'Approved'")
  end

	def overlapping_pending_requests
    overlapping_requests.where("status = 'Pending'")
  end
   
  def does_not_overlap_approved_request
    # A denied request doesn't need to be checked. A pending request should be
    # checked; users shouldn't be able to make requests for periods during
    # which a board has already been spoken for.
    return if self.denied?

    unless overlapping_approved_requests.empty?
      errors[:base] << "Request conflicts with existing approved request"
    end
  end

  # def valid_rental
  #   overlapping_rentals.where("status = 'Available'")
  # end

  # def invalid_rental
  #   puts overlapping_rentals.where("status = 'Rented'" || "status = 'Unavailable'")
		# overlapping_rentals.where("status = 'Rented'" || "status = 'Unavailable'")
  # end

  # def does_not_overlap_rental
  #   unless valid_rental.empty?
  #     errors[:base] << "The board cannot be rented for this date!"
  #   end
  # end
end
