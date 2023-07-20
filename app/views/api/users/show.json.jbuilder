json.user do
    json.extract! @user, :id, :email, :username, :birthdate, :created_at, :updated_at
end