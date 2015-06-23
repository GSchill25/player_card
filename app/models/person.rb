class Person < ActiveRecord::Base
	has_many :comments
	belongs_to :user

	mount_uploader :picture, PictureUploader
	#validates_presence_of :first_name, :last_name, :picture

	def as_json(options = {})
		super(options.merge(include: [:user, comments: { include: :user }]))
	end
end
