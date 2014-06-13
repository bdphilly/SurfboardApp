# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
addresses = [
	"800 Great Hwy",
	"3896 Noriega St",
	"2830 Sloat Blvd",
	"4500 Irving St",
	"1200 Clay St",
	"953 Mission St",
	"207 Powell St.",
	"1701 Turk St",
	"1199 E Beach",
	"610 3rd St"
]

zipcodes = [
	94121,
	94122,
	94116,
	94112,
	94108,
	94103,
	94102,
	94117,
	94129,
	94107
]

prices = [
	10,
	20,
	30,
	40,
	50,
	60,
	70,
	80,
	90,
	100
]

types = [
	'shortboard',
	'longboard'
]

5.times do |new_user|
	
	User.create({
		email: Faker::Internet.email,
		fname: Faker::Name.name,
		lname: Faker::Name.name,
		password: Faker::Internet.password(8)
	})

	board = Board.new({
		brand: Faker::Lorem.word,
		model: Faker::Lorem.word,
		length: Faker::Number.number(3),
		width: Faker::Number.number(2),
		description: Faker::Lorem.paragraph,
		condition: Faker::Number.number(1),
		owner_id: (new_user + 1),
		address: addresses[new_user],
		city: "San Francisco",
		state: "CA",
		zipcode: zipcodes[new_user],
		country: "USA",
		price: prices[new_user],
		board_type: types[new_user % 2]
		# :images => File.open('./app/assets/images/001.jpg')
	})

file_path = './app/assets/images/001.jpg'

my_model_instance = board.images.new
file = File.open(file_path)
my_model_instance.attachment = file
file.close
board.save!
my_model_instance.save!

end



# Photo.create({
# 	File.open('https://s3-us-west-1.amazonaws.com/brahboards/boards/AM1.jpg')
# 	})

 

# :photo => File.open(File.join('http://apm-assets.s3.amazonaws.com', '/photos/1/original/image.jppg'))