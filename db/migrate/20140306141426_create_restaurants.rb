class CreateRestaurants < ActiveRecord::Migration
  def up
      create_table :restaurants do |t|
          t.integer :restaurateur_id,  null: true
          t.string  :nom,             limit: 25, null: false
      end
      add_index :restaurants, :restaurateur_id, :unique => true
  end
    
  def down
      drop_table :restaurants
  end
end