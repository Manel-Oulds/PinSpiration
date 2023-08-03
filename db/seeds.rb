# ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
   
    BoardPin.destroy_all
    Pin.destroy_all
    Board.destroy_all
    User.destroy_all
    Follow.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('pins')
    ApplicationRecord.connection.reset_pk_sequence!('boards')
    ApplicationRecord.connection.reset_pk_sequence!('follows')
    ApplicationRecord.connection.reset_pk_sequence!('board_pins')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    demo = User.create!(
      username: 'Demo-lition', 
      email: 'demo@user.io', 
      birthdate:  Faker::Date.birthday(min_age: 18, max_age: 65),
      password: 'password'
    )

    # More users
    10.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        birthdate:  Faker::Date.birthday(min_age: 18, max_age: 65),
        password: 'password'
      }) 
    end
  
    puts "Done!"


    puts "Creating pins..."
    # Create one user with an easy to remember username, email, and password:
    Pin.create!({})
      
    )
  # end