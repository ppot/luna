class CreateClients < ActiveRecord::Migration
  def up
      create_table :clients do |t|
          t.string :identificateur, limit: 30, null: false
          t.string :mot_de_passe,   limit: 20, null: false
          t.string :nom,            limit: 15, null: false
          t.string :prenom,         limit: 15, null: false
          t.string :courriel,       limit: 40, null: false
          t.date   :date_naissance, null: false
          t.timestamps
      end
      add_index(:clients, :identificateur, unique: true)
      add_index(:clients, :courriel, unique: true, using: 'btree')
      add_index(:clients, :nom, using: 'btree')
  end
    
  def down
      drop_table :clients
  end
end
