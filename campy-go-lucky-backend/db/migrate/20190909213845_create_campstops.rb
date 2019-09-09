class CreateCampstops < ActiveRecord::Migration[5.2]
  def change
    create_table :campstops do |t|
      t.references :campsite, foreign_key: true
      t.references :trip, foreign_key: true
      t.string :state_code
      t.timestamps
    end
  end
end
