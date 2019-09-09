class CreateWaypoints < ActiveRecord::Migration[5.2]
  def change
    create_table :waypoints do |t|
      t.references :trip, foreign_key: true
      t.references :city, foreign_key: true

      t.timestamps
    end
  end
end
