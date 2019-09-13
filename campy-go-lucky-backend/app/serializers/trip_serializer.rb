class TripSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_date, :start_location, :description, :campsites, :trails
  has_one :user
end
