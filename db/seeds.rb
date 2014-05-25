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

10.times do |new_user|
	
	User.create({
		email: Faker::Internet.email,
		username: Faker::Name.name,
		password: Faker::Internet.password(8)
	})

	Board.create({
		brand: Faker::Lorem.word,
		model: Faker::Lorem.word,
		length: Faker::Number.number(3),
		width: Faker::Number.number(2),
		thickness: Faker::Number.number(2),
		description: Faker::Lorem.paragraph,
		condition: Faker::Number.number(1),
		owner_id: (new_user + 1),
		address: addresses[new_user],
		city: "San Francisco",
		state: "CA",
		zipcode: zipcodes[new_user],
		country: "USA"
	})

end

# :photo => File.open(File.join('http://apm-assets.s3.amazonaws.com', '/photos/1/original/image.jppg'))