class CreateCommandes < ActiveRecord::Migration
  def up
      create_table :commandes do |t|
          t.integer :client_id,         null: false
          t.integer :livreur_id,    null: true, default: nil
          t.string  :no_confirmation,   limit: 10,  null: false
          t.date    :date_de_commande,  null: false
          t.time    :heure_de_commande, null: false
          t.boolean :status_pret,       null: true, default: nil
          t.decimal :prix_total,        precision: 5, scale: 2, null: false
      end
      add_index(:commandes, :client_id)
      add_index(:commandes, :livreur_id)
      add_index(:commandes, :no_confirmation, unique: true)
  end
    
  def down
      drop_table :commandes
  end
end