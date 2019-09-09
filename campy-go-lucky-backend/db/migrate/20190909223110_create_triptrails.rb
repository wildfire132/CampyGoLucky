class CreateTriptrails < ActiveRecord::Migration[5.2]
  def change
    create_table :triptrails do |t|
      t.references :trip, foreign_key: true
      t.references :trail, foreign_key: true
      t.string :state_code

      t.timestamps
    end
  end
end
