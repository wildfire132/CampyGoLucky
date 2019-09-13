class CreateTrips < ActiveRecord::Migration[5.2]
  def change
    create_table :trips do |t|
      t.references :user, foreign_key: true
      t.string :name
      t.string :start_date
      t.string :start_location
      t.string :description

      t.timestamps
    end
  end
end
