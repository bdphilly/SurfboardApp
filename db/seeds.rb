# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

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
		brand: Faker::Lorem.word,
		description: Faker::Lorem.paragraph,
		condition: Faker::Number.number(1),
		owner_id: new_user	
	})

end