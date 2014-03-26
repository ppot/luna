class CreateInfos < ActiveRecord::Migration
  def up
	  create_table :infos do |t|
	      t.integer :client_id, null: false
	      t.string :courriel,       limit: 40, null: false
	      t.date   :date_naissance, null: false
	      t.timestamps
	  end
	  add_index(:infos, :client_id, unique: true)
	  add_index(:infos, :courriel, unique: true, using: 'btree')
	end

	def down
	  drop_table :infos
	end
end
