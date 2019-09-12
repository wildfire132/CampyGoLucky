# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


require 'faker'

User.destroy_all
Trip.destroy_all
Campsite.destroy_all
Trail.destroy_all

50.times do |user|
    username = Faker::Name.first_name
    new_user = User.new(username: username)
    new_user.trips = []
    new_user.save
end

50.times do |trip|
    tripname = Faker::Games::ElderScrolls.city
    new_trip = Trip.new(name: tripname, user: (User.all.sample), start_date: Time.now, start_location: Faker::Address.city)
    new_trip.campsites = []
    new_trip.save
end

50.times do |campsite|
    campname = Faker::Games::ElderScrolls.last_name
    new_camp = Campsite.create(name: campname)
    Trip.all.sample.campsites << new_camp
end


50.times do |trail|
    trailname = Faker::Games::ElderScrolls.first_name
    new_trail = Trail.create(name: trailname)
    Trip.all.sample.trails << new_trail
end