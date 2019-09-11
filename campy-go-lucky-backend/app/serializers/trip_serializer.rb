class TripSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :start_date, :start_location, :campsites, :trails
  has_one :user
end
