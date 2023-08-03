json.pins({})

json.users do 
    @users.each do |pin|
        json.set! user.id do
            json.extract! user, :id, :username, :email
        end
    end
end