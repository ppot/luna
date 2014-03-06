class CreateAdresses < ActiveRecord::Migration
  def up
      create_table :adresses do |t|
          t.references :adresseable, polymorphic: true
          t.string  :no_maison,      limit: 10, null: false
          t.string  :rue,            limit: 20, null: false
          t.string  :ville,          limit: 20, null: false
          t.string  :telephone,      limit: 10, null: false
          t.string  :code_postal,    limit: 6,  null: false
          t.boolean :principale,     null: false
      end
      add_index(:adresses, :telephone)     
  end
    
  def down
      drop_table :adresses
  end
end