class CreateUtilisateurs < ActiveRecord::Migration
  def up
      create_table :utilisateurs do |t|
          t.string :identificateur, limit: 30, null: false
          t.string :mot_de_passe,   limit: 20, null: false
          t.string :nom,            limit: 15, null: false
          t.string :prenom,         limit: 15, null: false
          t.string :type,           limit: 12, null: false
          t.timestamps
      end
      add_index(:utilisateurs, :identificateur, unique: true)
      add_index(:utilisateurs, :nom, using: 'btree') 
  end

  def down
      drop_table :utilisateurs
  end
end