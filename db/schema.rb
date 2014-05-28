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

ActiveRecord::Schema.define(version: 20140527204932) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "board_rentals", force: true do |t|
    t.integer  "board_id",   null: false
    t.date     "start_date", null: false
    t.date     "end_date",   null: false
    t.string   "status",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "renter_id"
    t.integer  "price"
  end

  add_index "board_rentals", ["board_id"], name: "index_board_rentals_on_board_id", using: :btree

  create_table "boards", force: true do |t|
    t.string   "brand"
    t.string   "model"
    t.integer  "length"
    t.integer  "width"
    t.integer  "thickness"
    t.string   "description"
    t.integer  "condition"
    t.integer  "owner_id",           null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
    t.string   "address"
    t.string   "city"
    t.string   "state"
    t.string   "zipcode"
    t.string   "country"
    t.float    "latitude"
    t.float    "longitude"
    t.integer  "price"
    t.string   "board_type"
  end

  create_table "photos", force: true do |t|
    t.integer  "imageable_id"
    t.string   "imageable_type"
    t.string   "name"
    t.string   "attachment_file_name"
    t.integer  "attachment_file_size"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "attachment_content_type"
    t.datetime "attachment_updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "username"
    t.string   "fname"
    t.string   "lname"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
