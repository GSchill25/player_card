angular.module('playerNews')
.controller('MainCtrl', [
'$scope', 'people', 'Auth',
function($scope, people, Auth){
  $scope.people = people.people;

  $scope.addPerson = function(){
  if(!$scope.first_name || $scope.first_name === '') { return; }
  people.create({
  	first_name: $scope.first_name,
    last_name: $scope.last_name,
    height: $scope.height,
    weight: $scope.weight,
    nickname: $scope.nickname,
    picture: 'default.png',
  	upvotes: 0,
  	comments: []
  });

  $scope.first_name = '';
  $scope.last_name = '';
  $scope.height = '';
  $scope.weight = '';
  $scope.nickname = '';
  $scope.picture = '';
  };

  $scope.incrementUpvotes = function(person) {
    if(contains(person.voter_ids, String($scope.user.id))){
      person.voter_ids << $scope.user.id;
      people.upvote(person);
    }
  };

  Auth.currentUser().then(function (user){
    $scope.user = user;
  });

  function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return false;
        }
    }
    return true;
  }

}])