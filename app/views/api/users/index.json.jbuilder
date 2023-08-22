json.array! @users do |user|
    json.extract! user, :id, :email, :username, :birthdate, :created_at, :updated_at
    json.board_ids user.boards.pluck(:id)
    # json.img_url user.picture.url
  end