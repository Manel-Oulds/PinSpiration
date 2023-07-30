# == Schema Information
#
# Table name: board_pins
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  board_id   :integer          not null
#  pin_id     :integer          not null
#
# Indexes
#
#  index_board_pins_on_board_id  (board_id)
#  index_board_pins_on_pin_id    (pin_id)
#
# Foreign Keys
#
#  fk_rails_...  (board_id => boards.id)
#  fk_rails_...  (pin_id => pins.id)
#
class BoardPin < ApplicationRecord

    validates :board_id, uniqueness: { scope: :pin_id }
    belongs_to :pin
    belongs_to :board
end
