# == Schema Information
#
# Table name: follows
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  followee_id :integer          not null
#  follower_id :integer          not null
#
# Indexes
#
#  index_follows_on_followee_id                  (followee_id)
#  index_follows_on_follower_id                  (follower_id)
#  index_follows_on_follower_id_and_followee_id  (follower_id,followee_id) UNIQUE
#
class Follow < ApplicationRecord
    belongs_to :follower, class_name: 'User'
    belongs_to :followee, class_name: 'User'
  
    validates :follower_id, presence: true
    validates :followee_id, presence: true
    validate :cannot_follow_self
  
    private
  
    def cannot_follow_self
      errors.add(:base, "Cannot follow yourself") if follower_id == followee_id
    end
  end
  
