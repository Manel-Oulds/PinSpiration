# == Schema Information
#
# Table name: pins
#
#  id          :bigint           not null, primary key
#  description :text
#  title       :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :integer          not null
#
# Indexes
#
#  index_pins_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Pin < ApplicationRecord
    validates :title, presence:true
    validates :user_id, presence:true

    before_destroy :destroy_with_board_pins

    belongs_to :user
    has_one_attached :image
    validate :ensure_photo
    has_many :board_pins, dependent: :destroy

    def ensure_photo
        unless self.image.attached?
          errors.add(:image, "must be attached")
        end
    end

    def destroy_with_board_pins
      # Remove associated board_pins records
      board_pins.destroy_all
    end


end
