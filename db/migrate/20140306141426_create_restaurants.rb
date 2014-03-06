class CreateRestaurants < ActiveRecord::Migration
  def up
      create_table :restaurants do |t|
          t.integer :utilisateur_id,  null: true
          t.string  :nom,             limit: 25, null: false
      end
  end
    
  def down
      drop_table :restaurants
  end
end