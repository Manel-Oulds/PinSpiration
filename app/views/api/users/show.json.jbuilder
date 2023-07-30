json.user do
    json.extract! @user, :id, :email, :username, :birthdate, :created_at, :updated_at, :pin_ids
    json.board_ids @user.boards.pluck(:id)
    json.img_url @user.picture.url

end