class Trip < ApplicationRecord
  belongs_to :user
  has_many :campstops
  has_many :campsites, through: :campstops
  has_many :triptrails
  has_many :trails, through: :triptrails

end
