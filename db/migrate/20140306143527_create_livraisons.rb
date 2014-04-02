class CreateLivraisons < ActiveRecord::Migration
  def up
      create_table :livraisons do |t|
          t.integer :commande_id,        null: false
          t.date    :date_de_livraison,  null: false
          t.time    :heure_de_livraison, null: false
      end
       add_index(:livraisons, :commande_id, unique: true)
  end
    
  def down
      drop_table :livraisons
  end
end