class AddVotesToPerson < ActiveRecord::Migration
  def change
    add_column :people, :upvotes, :integer
  end
end
