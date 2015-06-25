class PeopleController < ApplicationController
  before_filter :authenticate_user!, only: [:create, :upvote]
  
	def index
    respond_with Person.all
  end

  def create
    respond_with Person.create(person_params.merge(user_id: current_user.id))
  end

  def show
    respond_with Person.find(params[:id])
  end

  def upvote
    person = Person.find(params[:id])
    puts person.voter_ids
    unless person.voter_ids.include?(current_user.id.to_s)
      person.increment!(:upvotes) 
      person.voter_ids << current_user.id
      person.save
    end
    respond_with person
  end

  private

	def person_params
		params.require(:person).permit(:first_name, :last_name, :picture, :height, :weight, :nicknames, :voter_ids, :upvotes, :user_id)
	end
end
