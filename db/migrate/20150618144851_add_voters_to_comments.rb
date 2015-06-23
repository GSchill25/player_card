class AddVotersToComments < ActiveRecord::Migration
  def change
  	add_column :comments, :voter_ids, :text, array:true, default: []
  end
end
