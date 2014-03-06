class CreatePlats < ActiveRecord::Migration
  def up
      create_table :plats do |t|
          t.integer :menu_id
          t.integer :commande_id
          t.string  :nom,            limit: 25, null: false
          t.decimal :prix,           precision: 5, scale: 2, null: false
          t.text    :description,    null: true, limit: 255
      end
      add_index(:plats, :menu_id)
      add_index(:plats, :commande_id)
      add_index(:plats, :nom, using: 'btree')
  end
      def down
      drop_table :plats
  end
end