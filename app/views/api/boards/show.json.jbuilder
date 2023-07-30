json.board do
    json.extract! @board, :id, :title, :user_id, :pins, :created_at, :updated_at
end