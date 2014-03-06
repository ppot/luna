class CreateMenus < ActiveRecord::Migration
  def up
      create_table :menus do |t|
          t.integer :restaurant_id
          t.string  :nom, limit: 15, null: true, default: nil
      end
  end
    
  def down
      drop_table :menus
  end
end