class CreateCommandesPlats < ActiveRecord::Migration
  def up
      create_table :commandes_plats, :id => false do |t|
          t.integer :commande_id
          t.integer :plat_id
          t.integer :quantitee, null: false
      end
      add_index(:commandes_plats, :commande_id)
      add_index(:commandes_plats, :plat_id)
  end
    
  def down
      drop_table :commandes_plats
  end
end