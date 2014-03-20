# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140320152623) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "adresses", force: true do |t|
    t.integer "adresseable_id"
    t.string  "adresseable_type"
    t.string  "no_maison",        limit: 10, null: false
    t.string  "rue",              limit: 20, null: false
    t.string  "ville",            limit: 20, null: false
    t.string  "telephone",        limit: 10, null: false
    t.string  "code_postal",      limit: 6,  null: false
    t.boolean "principale",                  null: false
  end

  add_index "adresses", ["telephone"], name: "index_adresses_on_telephone", using: :btree

  create_table "clientInfos", force: true do |t|
    t.integer  "client_id",                 null: false
    t.string   "courriel",       limit: 40, null: false
    t.date     "date_naissance",            null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "clientInfos", ["client_id"], name: "index_clientInfos_on_client_id", unique: true, using: :btree
  add_index "clientInfos", ["courriel"], name: "index_clientInfos_on_courriel", unique: true, using: :btree

  create_table "client_infos", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "clients", force: true do |t|
    t.string   "identificateur", limit: 30, null: false
    t.string   "mot_de_passe",   limit: 20, null: false
    t.string   "nom",            limit: 15, null: false
    t.string   "prenom",         limit: 15, null: false
    t.string   "courriel",       limit: 40, null: false
    t.date     "date_naissance",            null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "clients", ["courriel"], name: "index_clients_on_courriel", unique: true, using: :btree
  add_index "clients", ["identificateur"], name: "index_clients_on_identificateur", unique: true, using: :btree
  add_index "clients", ["nom"], name: "index_clients_on_nom", using: :btree

  create_table "commandes", force: true do |t|
    t.integer "client_id",                                            null: false
    t.integer "livreur_id"
    t.string  "no_confirmation",   limit: 10,                         null: false
    t.date    "date_de_commande",                                     null: false
    t.time    "heure_de_commande",                                    null: false
    t.boolean "status_pret"
    t.decimal "prix_total",                   precision: 5, scale: 2, null: false
  end

  add_index "commandes", ["client_id"], name: "index_commandes_on_client_id", using: :btree
  add_index "commandes", ["livreur_id"], name: "index_commandes_on_livreur_id", using: :btree
  add_index "commandes", ["no_confirmation"], name: "index_commandes_on_no_confirmation", unique: true, using: :btree

  create_table "commandes_plats", id: false, force: true do |t|
    t.integer "commande_id"
    t.integer "plat_id"
    t.integer "quantitee",   null: false
  end

  add_index "commandes_plats", ["commande_id"], name: "index_commandes_plats_on_commande_id", using: :btree
  add_index "commandes_plats", ["plat_id"], name: "index_commandes_plats_on_plat_id", using: :btree

  create_table "infos", force: true do |t|
    t.integer  "client_id",                 null: false
    t.string   "courriel",       limit: 40, null: false
    t.date     "date_naissance",            null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "infos", ["client_id"], name: "index_infos_on_client_id", unique: true, using: :btree
  add_index "infos", ["courriel"], name: "index_infos_on_courriel", unique: true, using: :btree

  create_table "livraisons", force: true do |t|
    t.integer "commande_id",        null: false
    t.date    "date_de_livraison",  null: false
    t.time    "heure_de_livraison", null: false
  end

  create_table "menus", force: true do |t|
    t.integer "restaurant_id"
    t.string  "nom",           limit: 15
  end

  create_table "plats", force: true do |t|
    t.integer "menu_id"
    t.integer "commande_id"
    t.string  "nom",         limit: 25,                         null: false
    t.decimal "prix",                   precision: 5, scale: 2, null: false
    t.text    "description"
  end

  add_index "plats", ["commande_id"], name: "index_plats_on_commande_id", using: :btree
  add_index "plats", ["menu_id"], name: "index_plats_on_menu_id", using: :btree
  add_index "plats", ["nom"], name: "index_plats_on_nom", using: :btree

  create_table "restaurants", force: true do |t|
    t.integer "restaurateur_id"
    t.string  "nom",             limit: 25, null: false
  end

  add_index "restaurants", ["restaurateur_id"], name: "index_restaurants_on_restaurateur_id", unique: true, using: :btree

  create_table "utilisateurs", force: true do |t|
    t.string   "identificateur", limit: 30, null: false
    t.string   "mot_de_passe",   limit: 20, null: false
    t.string   "nom",            limit: 15, null: false
    t.string   "prenom",         limit: 15, null: false
    t.string   "type",           limit: 12, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "utilisateurs", ["identificateur"], name: "index_utilisateurs_on_identificateur", unique: true, using: :btree
  add_index "utilisateurs", ["nom"], name: "index_utilisateurs_on_nom", using: :btree

end
