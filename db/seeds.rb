# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'open-uri'

# ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  Follow.destroy_all
  BoardPin.destroy_all
  Board.destroy_all
  Pin.destroy_all
  User.destroy_all


  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('pins')
  ApplicationRecord.connection.reset_pk_sequence!('board_pins')
  ApplicationRecord.connection.reset_pk_sequence!('boards')
  ApplicationRecord.connection.reset_pk_sequence!('follows')


  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  demo = User.create!(
    username: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password',
    birthdate: "01-01-2023"
  )
  Board.create!(user_id: demo.id, title: "All Pins")

  demo1 = User.create!({
    username: "manel",
    email: Faker::Internet.unique.email,
    password: 'password',
    birthdate: Faker::Date.birthday(min_age: 18, max_age: 65)
  })
  Board.create!(user_id: demo1.id, title: "All Pins")

  demo2 = User.create!({
    username: "Khalil",
    email: Faker::Internet.unique.email,
    password: 'password',
    birthdate: Faker::Date.birthday(min_age: 18, max_age: 65)
    
  })
  Board.create!(user_id: demo2.id, title: "All Pins")


  # More users
  10.times do 
    user = User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password',
      birthdate: Faker::Date.birthday(min_age: 18, max_age: 65)
     
    })
    Board.create!(user_id: user.id, title: "All Pins")
  end
  
  puts "Creating Pins..."
  vacation_pin = Pin.new({title: "Summer vibes", description: "Let's enjoy it", user_id: demo.id})
  vacation_pin.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/vacation/vac1.jpeg"), filename: "vacation1.jpg")
  vacation_pin.save!

  animal_pin1 = Pin.new({title: "Hello there!", description: " ", user_id: demo.id})
  animal_pin1.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/vacation/Animals/animal1.jpeg"), filename: "animal1.jpg")
  animal_pin1.save!

  animal_pin2 = Pin.new({title: "Pinky ", description: "❣️", user_id: demo.id})
  animal_pin2.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/vacation/Animals/animal2.jpeg"), filename: "animal2.jpg")
  animal_pin2.save!

  animal_pin3 = Pin.new({title: "Flowers for you!", description: "", user_id: demo.id})
  animal_pin3.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/vacation/Animals/animal7.jpeg"), filename: "animal7.jpg")
  animal_pin3.save!

  animal_pin4 = Pin.new({title: "So cute!! 😍 ", description: "Cuty black eyes", user_id: demo.id})
  animal_pin4.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/vacation/Animals/animal4.jpeg"), filename: "animal4.jpg")
  animal_pin4.save!

  animal_pin5 = Pin.new({title: "Mom and me ", description: " I love you Mom!", user_id: demo.id})
  animal_pin5.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/vacation/Animals/animal5.jpeg"), filename: "animal5.jpg")
  animal_pin5.save!

  animal_pin6 = Pin.new({title: " Hihi!! ", description: "", user_id: demo1.id})
  animal_pin6.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/vacation/Animals/animal6.jpeg"), filename: "animal6.jpg")
  animal_pin6.save!



  animal_pin7 = Pin.new({title: "I'm here 🐷 ", description: " Hello everyone!", user_id: demo1.id})
  animal_pin7.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/vacation/Animals/animal3.jpeg"), filename: "animal3.jpg")
  animal_pin7.save!


  animal_pin8 = Pin.new({title: "Little 🐰 ", description: "", user_id: demo2.id})
  animal_pin8.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/vacation/Animals/animal8.jpeg"), filename: "animal8.jpg")
  animal_pin8.save!

  animal_pin9 = Pin.new({title: "Black and white", description: " Favorite creature", user_id: demo.id})
  animal_pin9.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/summer/summer5.jpeg"), filename: "animal9.jpg")
  animal_pin9.save!


  animal_pin10 = Pin.new({title: "Dance Monkey", description: "", user_id: demo.id})
  animal_pin10.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/summer/summer7.jpeg"), filename: "summer7.jpg")
  animal_pin10.save!








  art_pin = Pin.new({title: "Golden", description: "Awesome art", user_id: demo.id})
  art_pin.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/art/art1.webp"), filename: "art1.jpg")
  art_pin.save!

  art_pin1 = Pin.new({title: "Amazing outfit", description: "", user_id: demo1.id})
  art_pin1.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/art/art2.webp"), filename: "art2.jpg")
  art_pin1.save!

  art_pin2 = Pin.new({title: "Hoho!", description: "", user_id: demo1.id})
  art_pin2.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/art/art3.webp"), filename: "art3.jpg")
  art_pin2.save!

  art_pin3 = Pin.new({title: "Beauty 🥰", description: "", user_id: demo2.id})
  art_pin3.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/art/art4.webp"), filename: "art4.jpg")
  art_pin3.save!

   art_pin4 = Pin.new({title: "Hola!", description: "", user_id: demo.id})
  art_pin4.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/art/art7.webp"), filename: "art5.jpg")
  art_pin4.save!

   art_pin5 = Pin.new({title: "The boss", description: "", user_id: demo1.id})
  art_pin5.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/art/art6.webp"), filename: "art6.jpg")
  art_pin5.save!






  place_pin = Pin.new({title: "Best vacation ever!", description: " ", user_id: demo2.id})
  place_pin.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/favorite+places/place1.jpeg"), filename: "place1.jpg")
  place_pin.save!

  place_pin1 = Pin.new({title: "Heaven!", description: "", user_id: demo.id})
  place_pin1.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/favorite+places/place2.jpeg"), filename: "place2.jpg")
  place_pin1.save!

  place_pin2 = Pin.new({title: "Some rest!", description: "", user_id: demo1.id})
  place_pin2.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/favorite+places/place3.jpeg"), filename: "place3.jpg")
  place_pin2.save!


  deco_pin = Pin.new({title: "Love my home", description: " ", user_id: demo.id})
  deco_pin.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/home/deco1.jpeg"), filename: "deco1.jpg")
  deco_pin.save!

  deco_pin1 = Pin.new({title: "Love it!", description: " ", user_id: demo2.id})
  deco_pin1.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/home/deco2.jpeg"), filename: "deco2.jpg")
  deco_pin1.save!

  deco_pin2 = Pin.new({title: "Deco plants", description: "Green home decoration ", user_id: demo2.id})
  deco_pin2.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/home/deco3.jpeg"), filename: "deco3.jpg")
  deco_pin2.save!

  deco_pin3 = Pin.new({title: "Simple Kitchen", description: " Modern amazing kitchen ", user_id: demo1.id})
  deco_pin3.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/home/deco4.jpeg"), filename: "deco4.jpg")
  deco_pin3.save!

  deco_pin4 = Pin.new({title: "Simple and amazing deco 😍", description: "Modern home ", user_id: demo2.id})
  deco_pin4.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/home/deco5.jpeg"), filename: "deco5.jpg")
  deco_pin4.save!

  deco_pin5 = Pin.new({title: "Hall deco", description: " My favorite place ", user_id: demo.id})
  deco_pin5.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/home/deco6.jpeg"), filename: "deco6.jpg")
  deco_pin5.save!

  deco_pin6 = Pin.new({title: "Home made decoration", description: " Made by me", user_id: demo2.id})
  deco_pin6.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/home/deco7.jpeg"), filename: "deco7.jpg")
  deco_pin6.save!


  med_pin = Pin.new({title: "Morning relax", description: " Positive vibes ", user_id: demo.id})
  med_pin.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/meditation/med2.jpeg"), filename: "med1.jpg")
  med_pin.save!

  med_pin1 = Pin.new({title: "Relax!", description: "", user_id: demo1.id})
  med_pin1.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/meditation/med3.jpeg"), filename: "med2.jpg")
  med_pin1.save!

  med_pin2 = Pin.new({title: "Empty your mind!", description: "Yoga time", user_id: demo.id})
  med_pin2.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/meditation/med4.jpeg"), filename: "med3.jpg")
  med_pin2.save!

  med_pin3 = Pin.new({title: "Amazing meditation art ", description: "", user_id: demo.id})
  med_pin3.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/meditation/med5.jpeg"), filename: "med4.jpg")
  med_pin3.save!


  summer_pin = Pin.new({title: "Blue sky", description: " Best place ever!", user_id: demo2.id})
  summer_pin.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/summer/summer1.jpeg"), filename: "summer1.jpg")
  summer_pin.save!

  summer_pin1 = Pin.new({title: " Best place to relax ", description: "", user_id: demo.id})
  summer_pin1.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/summer/summer2.jpeg"), filename: "summer2.jpg")
  summer_pin1.save!

  summer_pin2 = Pin.new({title: " Amazing creature 🥰 ", description: "", user_id: demo1.id})
  summer_pin2.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/summer/summer3.jpeg"), filename: "summer3.jpg")
  summer_pin2.save!

  summer_pin3 = Pin.new({title: " Hello there ", description: "", user_id: demo1.id})
  summer_pin3.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/summer/summer4.jpeg"), filename: "summer4.jpg")
  summer_pin3.save!

  summer_pin5 = Pin.new({title: " Am I gorgeous? ", description: "", user_id: demo.id})
  summer_pin5.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/summer/summer6.jpeg"), filename: "summer6.jpg")
  summer_pin5.save!


  summer_pin7 = Pin.new({title: " Flowers ", description: " 🦋 🦋", user_id: demo.id})
  summer_pin7.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/summer/summer8.jpeg"), filename: "summer8.jpg")
  summer_pin7.save!

  summer_pin8 = Pin.new({title: " I love beach ", description: "", user_id: demo2.id})
  summer_pin8.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/summer/summer9.jpeg"), filename: "summer9.jpg")
  summer_pin8.save!

  summer_pin9 = Pin.new({title: " Tinny cuty ", description: "", user_id: demo2.id})
  summer_pin9.image.attach(io: URI.open("https://pinspiration-seeds.s3.amazonaws.com/summer/summer10.jpeg"), filename: "summer10.jpg")
  summer_pin9.save!









  puts "Creating Boards..."
  board_1 = Board.create!({title: "Summer", user_id: demo.id})
  board_2 = Board.create!({title: "Vacation", user_id: demo.id})
  board_3 = Board.create!({title: "Home", user_id: demo.id})
  board_4 = Board.create!({title: "Meditation", user_id: demo.id})
  board_5 = Board.create!({title: "Art", user_id: demo.id})
  board_12 = Board.create!({title: "Animals", user_id: demo.id})


  board_6 = Board.create!({title: "Animals", user_id: demo1.id})
  board_8 = Board.create!({title: "Favorite Places", user_id: demo1.id})
  board_7 = Board.create!({title: "Home", user_id: demo1.id})
  board_11 = Board.create!({title: "Summer", user_id: demo1.id})


  board_9 = Board.create!({title: "Home", user_id: demo2.id})
  board_10 = Board.create!({title: "Meditation", user_id: demo2.id})
  board_11 = Board.create!({title: "Art", user_id: demo2.id})






  puts "Creating Board Pins..."

  board_pin_1 = BoardPin.create!({board_id: board_1.id, pin_id: summer_pin.id})
  board_pin_2 = BoardPin.create!({board_id: board_1.id, pin_id: summer_pin1.id})
  board_pin_3 = BoardPin.create!({board_id: board_1.id, pin_id: summer_pin2.id})
  board_pin_4 = BoardPin.create!({board_id: board_1.id, pin_id: summer_pin3.id})
  board_pin_5 = BoardPin.create!({board_id: board_1.id, pin_id: summer_pin5.id})
  board_pin_6 = BoardPin.create!({board_id: board_1.id, pin_id: summer_pin7.id})
  board_pin_7 = BoardPin.create!({board_id: board_11.id, pin_id: summer_pin8.id})
  board_pin_6 = BoardPin.create!({board_id: board_11.id, pin_id: summer_pin9.id})



  board_pin_8 = BoardPin.create!({board_id: board_3.id, pin_id: deco_pin.id})
  board_pin_9 = BoardPin.create!({board_id: board_7.id, pin_id: deco_pin1.id})
  board_pin_10 = BoardPin.create!({board_id: board_9.id, pin_id: deco_pin2.id})
  board_pin_11 = BoardPin.create!({board_id: board_3.id, pin_id: deco_pin3.id})
  board_pin_12 = BoardPin.create!({board_id: board_7.id, pin_id: deco_pin4.id})
  board_pin_13 = BoardPin.create!({board_id: board_9.id, pin_id: deco_pin5.id})
  board_pin_14 = BoardPin.create!({board_id: board_3.id, pin_id: deco_pin6.id})



  
  board_pin_15 = BoardPin.create!({board_id: board_10.id, pin_id: med_pin.id})
  board_pin_16 = BoardPin.create!({board_id: board_10.id, pin_id: med_pin1.id})
  board_pin_17 = BoardPin.create!({board_id: board_4.id, pin_id: med_pin2.id})
  board_pin_18 = BoardPin.create!({board_id: board_4.id, pin_id: med_pin3.id})



  board_pin_19 = BoardPin.create!({board_id: board_5.id, pin_id: art_pin.id})
  board_pin_20 = BoardPin.create!({board_id: board_5.id, pin_id: art_pin4.id})
  board_pin_27 = BoardPin.create!({board_id: board_11.id, pin_id: art_pin1.id})
  board_pin_28 = BoardPin.create!({board_id: board_11.id, pin_id: art_pin2.id})
  board_pin_29 = BoardPin.create!({board_id: board_5.id, pin_id: art_pin3.id})
  board_pin_30 = BoardPin.create!({board_id: board_5.id, pin_id: art_pin5.id})



  board_pin_21 = BoardPin.create!({board_id: board_6.id, pin_id: animal_pin1.id})
  board_pin_22 = BoardPin.create!({board_id: board_6.id, pin_id: animal_pin3.id})
  board_pin_23 = BoardPin.create!({board_id: board_6.id, pin_id: animal_pin5.id})
  board_pin_31 = BoardPin.create!({board_id: board_6.id, pin_id: animal_pin6.id})
  board_pin_32 = BoardPin.create!({board_id: board_6.id, pin_id: animal_pin2.id})
  board_pin_33 = BoardPin.create!({board_id: board_6.id, pin_id: animal_pin7.id})
  board_pin_34 = BoardPin.create!({board_id: board_6.id, pin_id: animal_pin8.id})
  board_pin_35 = BoardPin.create!({board_id: board_6.id, pin_id: animal_pin9.id})
  board_pin_36 = BoardPin.create!({board_id: board_6.id, pin_id: animal_pin10.id})



  board_pin_24 = BoardPin.create!({board_id: board_8.id, pin_id: place_pin.id})
  board_pin_25 = BoardPin.create!({board_id: board_8.id, pin_id: place_pin1.id})
  board_pin_26 = BoardPin.create!({board_id: board_8.id, pin_id: place_pin2.id})







  puts "Done!"
  # end