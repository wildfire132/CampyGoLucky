class Campsite < ApplicationRecord
  has_many :campstops
  has_many :trips, through: :campstops
end
