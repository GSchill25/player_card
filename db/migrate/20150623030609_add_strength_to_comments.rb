class AddStrengthToComments < ActiveRecord::Migration
  def change
    add_column :comments, :strength, :boolean
  end
end
