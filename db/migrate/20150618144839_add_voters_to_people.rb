class AddVotersToPeople < ActiveRecord::Migration
  def change
  	add_column :people, :voter_ids, :text, array:true, default: []
  end
end
