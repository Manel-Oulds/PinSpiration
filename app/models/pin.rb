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

    belongs_to :user
    has_one_attached :image
    validate :ensure_photo

    def ensure_photo
        unless self.image.attached?
          errors.add(:image, "must be attached")
        end
    end


end
