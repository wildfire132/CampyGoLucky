class CreateCampsites < ActiveRecord::Migration[5.2]
  def change
    create_table :campsites do |t|
      t.string :name
      t.string :latitude
      t.string :longitude
      t.string :url

      t.timestamps
    end
  end
end
