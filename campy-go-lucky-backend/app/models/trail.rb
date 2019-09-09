class Trail < ApplicationRecord
  has_many :triptrails
  has_many :trips, through: :triptrails
end
