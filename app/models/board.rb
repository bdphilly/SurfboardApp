class Board < ActiveRecord::Base
	validates :owner_id, presence: true

	belongs_to(
		:owner,
		class_name: "User",
		foreign_key: :owner_id,
		dependent: :destroy
	)

end