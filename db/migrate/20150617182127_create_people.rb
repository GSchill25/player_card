class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.string :first_name
      t.string :last_name
      t.string :picture
      t.string :height
      t.string :weight
      t.text :nicknames

      t.timestamps null: false
    end
  end
end
