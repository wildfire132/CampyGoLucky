class Campstop < ApplicationRecord
  belongs_to :campsite
  belongs_to :trip
end
