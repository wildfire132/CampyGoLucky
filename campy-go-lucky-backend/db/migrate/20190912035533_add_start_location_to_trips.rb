class AddStartLocationToTrips < ActiveRecord::Migration[5.2]
  def change
    add_column :trips, :start_location, :string
  end
end
