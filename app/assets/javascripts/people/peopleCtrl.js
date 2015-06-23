angular.module('playerNews')
.controller('PeopleCtrl', [
'$scope',
'people',
'person',
'Auth',
function($scope, people, person, Auth){
  $scope.person = person;
  $scope.flag = false;

  $scope.addComment = function(){
    if($scope.body === '') { return; }
    people.addComment(person.id, {
      body: $scope.body,
      strength: $scope.strength,
      author: 'user',
    }).success(function(comment) {
      $scope.person.comments.push(comment);
      });
    $scope.body = '';
  };

  Auth.currentUser().then(function (user){
    $scope.user = user;
  });

  $scope.incrementUpvotes = function(comment){
    if(contains(comment.voter_ids, String($scope.user.id))){
      $scope.flag = true;
      people.upvoteComment(person, comment);
    }
  };

  function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return false;
        }
    }
    return true;
  }

  
}]);