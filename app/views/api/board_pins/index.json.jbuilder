
  @board_pins.group_by(&:board_id).each do |board_id, pins|
    json.set! board_id do
      json.array! pins.map(&:pin_id)
    end
  end

