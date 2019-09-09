class CreateCities < ActiveRecord::Migration[5.2]
  def change
    create_table :cities do |t|
      t.integer :latitude
      t.integer :longitude
      t.string :city_name

      t.timestamps
    end
  end
end
