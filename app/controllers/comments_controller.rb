class CommentsController < ApplicationController
  before_filter :authenticate_user!, only: [:create, :upvote]
  
  def create
    person = Person.find(params[:person_id])
    comment = person.comments.create(comment_params.merge(user_id: current_user.id))
    respond_with person, comment
  end

  def upvote
    person = Person.find(params[:person_id])
    comment = person.comments.find(params[:id])
    unless comment.voter_ids.include?(current_user.id.to_s)
       comment.increment!(:upvotes) 
       comment.voter_ids << current_user.id
       comment.save
    end
    respond_with person, comment
  end

  def get_upvotes
    person = Person.find(params[:person_id])
    comment = person.comments.find(params[:id])
    respond_with comment.upvotes
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :voter_ids, :strength)
  end
end
