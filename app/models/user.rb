# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  birthdate       :date             not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  username        :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email          (email) UNIQUE
#  index_users_on_session_token  (session_token) UNIQUE
#  index_users_on_username       (username) UNIQUE
#
class User < ApplicationRecord
  has_secure_password

  validates :email,:username, presence: true, uniqueness:true
  validates :email, format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i, message: "Invalid email format" },length: { in: 3..255 }
  validates :username, length: { in: 3..30 },format: { without: URI::MailTo::EMAIL_REGEXP, message:  "Username can't be an email" }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true
  validates :birthdate, presence:true
  validate :birthdate_cannot_be_in_the_future 

  has_one_attached :picture
  has_many :pins
  has_many :boards
 
  before_validation :ensure_session_token

  def self.find_by_credentials(credential, password)
    field = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :username
    user = User.find_by(field => credential)
    user&.authenticate(password)
  end

  def birthdate_cannot_be_in_the_future
    return if birthdate.blank?

    if birthdate > Date.today
      errors.add(:birthdate, "can't be in the future")
    end
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  private
  def generate_unique_session_token
      loop do
        token = SecureRandom.base64
        break token unless User.exists?(session_token: token)
      end
  end

  

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end


end
