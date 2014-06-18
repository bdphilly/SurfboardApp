# # # This file should contain all the record creation needed to seed the database with its default values.
# # # The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
# # #
# # # Examples:
# # #
# # #   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
# # #   Mayor.create(name: 'Emanuel', city: cities.first)
# # addresses = [
# # 	"800 Great Hwy",
# # 	"3896 Noriega St",
# # 	"2830 Sloat Blvd",
# # 	"4500 Irving St",
# # 	"1200 Clay St",
# # 	"953 Mission St",
# # 	"207 Powell St.",
# # 	"1701 Turk St",
# # 	"1199 E Beach",
# # 	"610 3rd St"
# # ]

# # zipcodes = [
# # 	94121,
# # 	94122,
# # 	94116,
# # 	94112,
# # 	94108,
# # 	94103,
# # 	94102,
# # 	94117,
# # 	94129,
# # 	94107
# # ]

# # prices = [
# # 	10,
# # 	20,
# # 	30,
# # 	40,
# # 	50,
# # 	60,
# # 	70,
# # 	80,
# # 	90,
# # 	100
# # ]

# # types = [
# # 	'shortboard',
# # 	'longboard'
# # ]

# # 1.times do |new_user|
	
# # 	User.create({
# # 		email: Faker::Internet.email,
# # 		fname: Faker::Name.name,
# # 		lname: Faker::Name.name,
# # 		password: Faker::Internet.password(8)
# # 	})

# # 	board = Board.new({
# # 		brand: Faker::Lorem.word,
# # 		model: Faker::Lorem.word,
# # 		length: Faker::Number.number(3),
# # 		width: Faker::Number.number(2),
# # 		description: Faker::Lorem.paragraph,
# # 		condition: Faker::Number.number(1),
# # 		owner_id: (new_user + 1),
# # 		address: addresses[new_user],
# # 		city: "San Francisco",
# # 		state: "CA",
# # 		zipcode: zipcodes[new_user],
# # 		country: "USA",
# # 		price: prices[new_user],
# # 		board_type: types[new_user % 2]
# # 		# :images => File.open('./app/assets/images/001.jpg')
# # 	})

# # file_path = './app/assets/images/001.jpg'

# # my_model_instance = board.images.new
# # file = File.open(file_path)
# # my_model_instance.attachment = file
# # file.close
# # board.save!
# # my_model_instance.save!

# # end

# # # Photo.create({
# # # 	File.open('https://s3-us-west-1.amazonaws.com/brahboards/boards/AM1.jpg')
# # # 	})

# # # :photo => File.open(File.join('http://apm-assets.s3.amazonaws.com', '/photos/1/original/image.jppg'))

###############################USERS###############################USERS###############################

emails = [
	'kelly@slater.com',	
	'cj@hobgood.com',
	'nat@young.com',
	'lakey@peterson.com',
	'carissa@moore.com',
	'patrick@swayze.com',
	'keanu@reeves.com',
	'joel@parkinson.com',
	'eric@cartman.com',
	'coco@ho.com',
	'stephanie@gilmore.com',
	'courtney@conlogue.com',
	'kolohe@andino.com',
	'josh@kerr.com',
	'taj@burrow.com',
	'jordy@smith.com',
	'mick@fanning.com',
	'peter@mel.com',
	'greg@long.com',
	'mark@healey.com',
	'shane@dorian.com',
	'dexter@morgan.com',
	'jesse@pinkman.com',
	'walter@white.com',
	'barack@obama.com',
	'jamie@obrien.com',
	'random@dude.com',
	'jack@nicholson.com',
	'christopher@walken.com',
	'gary@busey.com',
	'ricky@bobby.com',
	'adam@sandler.com',
	'layne@beachley.com',
	'anastasia@ashley.com',
	'karina@petroni.com',
	'marissa@miller.com',
	'malia@jones.com',
	'megan@abubo.com',
	'serena@brooke.com'
]

fnames = [
	'Kelly',
	'CJ',
	'Nat',
	'Lakey',
	'Carissa',
	'Patrick',
	'Keanu',
	'Joel',
	'Eric',
	'Coco',
	'Stephanie',
	'Courtney',
	'Kolohe',
	'Josh',
	'Taj',
	'Jordy',
	'Mick',
	'Peter',
	'Greg',
	'Mark',
	'Shane',
	'Dexter',
	'Jesse',
	'Walter',
	'Barack',
	'Jamie',
	'Random',
	'Jack',
	'Christopher',
	'Gary',
	'Ricky',
	'Adam',
	'Layne',
	'Anastasia',
	'Karina',
	'Marissa',
	'Malia',
	'Megan',
	'Serena'
]

lnames = [
	'Slater',
	'CJ',
	'Nat',
	'Lakey',
	'Carissa',
	'Swayze',
	'Reeves',
	'Parkinson',
	'Cartman',
	'Ho',
	'Gilmore',
	'Conlogue',
	'Andino',
	'Kerr',
	'Burrow',
	'Smith',
	'Fanning',
	'Mel',
	'Long',
	'Healey',
	'Dorian',
	'Morgan',
	'Pinkman',
	'White',
	'Obama',
	'Obrien',
	'Dude',
	'Nicholson',
	'Walken',
	'Busey',
	'Bobby',
	'Sandler',
	'Beachley',
	'Ashley',
	'Petroni',
	'Miller',
	'Jones',
	'Abubo',
	'Brooke'
]

file_paths = [
'./app/assets/images/avatars/kelly_slater.png',
'./app/assets/images/avatars/cj_hobgood.png',
'./app/assets/images/avatars/nat_young.png',
'./app/assets/images/avatars/lakey_peterson.png',
'./app/assets/images/avatars/carissa_moore.png',
'./app/assets/images/avatars/patrick_swayze.png',
'./app/assets/images/avatars/keanu_reeves.png',
'./app/assets/images/avatars/joel_parkinson.png',
'./app/assets/images/avatars/eric_cartman.png',
'./app/assets/images/avatars/coco_ho.png',
'./app/assets/images/avatars/stephanie_gilmore.png',
'./app/assets/images/avatars/courtney_conlogue.png',
'./app/assets/images/avatars/kolohe_andino.png',
'./app/assets/images/avatars/josh_kerr.png',
'./app/assets/images/avatars/taj_burrow.png',
'./app/assets/images/avatars/jordy_smith.png',
'./app/assets/images/avatars/mick_fanning.png',
'./app/assets/images/avatars/peter_mel.png',
'./app/assets/images/avatars/greg_long.png',
'./app/assets/images/avatars/mark_healey.png',
'./app/assets/images/avatars/shane_dorian.png',
'./app/assets/images/avatars/dexter_morgan.png',
'./app/assets/images/avatars/jesse_pinkman.png',
'./app/assets/images/avatars/walter_white.png',
'./app/assets/images/avatars/barack_obama.png',
'./app/assets/images/avatars/jamie_obrien.png',
'./app/assets/images/avatars/random_dude.png',
'./app/assets/images/avatars/jack_nicholson.png',
'./app/assets/images/avatars/christopher_walken.png',
'./app/assets/images/avatars/gary_busey.png',
'./app/assets/images/avatars/ricky_bobby.png',
'./app/assets/images/avatars/adam_sandler.png',
'./app/assets/images/avatars/layne_beachley.png',
'./app/assets/images/avatars/anastasia_ashley.png',
'./app/assets/images/avatars/karina_petroni.png',
'./app/assets/images/avatars/marissa_miller.png',
'./app/assets/images/avatars/malia_jones.png',
'./app/assets/images/avatars/megan_abubo.png',
'./app/assets/images/avatars/serena_brooke.png'
]

38.times do |new_user|

	user = User.create({
		email: emails[new_user],
		fname: fnames[new_user],
		lname: lnames[new_user],
		password: 'asdfasdf'
	})

	file_path = file_paths[new_user];

	my_model_instance = user.avatar.new
	file = File.open(file_path)
	my_model_instance.attachment = file
	file.close
	user.save!
	my_model_instance.save!

end

# file_path = './app/assets/images/avatars/cj_hobgood.png'

# my_model_instance = user.avatar.new
# file = File.open(file_path)
# my_model_instance.attachment = file
# file.close
# user.save!
# my_model_instance.save!

#############################################################################################


