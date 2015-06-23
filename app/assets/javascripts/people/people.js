angular.module("playerNews")
.factory('people', ['$http', 
	function($http){
  	var p = {
    	people: []
  	};
  

		p.getAll = function() {
			return $http.get('/people.json').success(function(data){
			angular.copy(data, p.people);
			});
		};

		p.create = function(person) {
			return $http.post('people.json', person).success(function(data){
				p.people.push(data);
			});
		};

		p.upvote = function(person) {
			return $http.put('/people/' + person.id + '/upvote.json').success(function(data){
				person.upvotes += 1;
			});
		};

		p.get = function(id) {
			return $http.get('/people/' + id + '.json').then(function(res){
				return res.data;
			});
		};

		p.addComment = function(id, comment) {
			return $http.post('/people/' + id + '/comments.json', comment);
		};

		p.upvoteComment = function(person, comment) {
			return $http.put('/people/' + person.id + '/comments/' + comment.id + '/upvote.json').success(function(data, e){
				comment.upvotes = p.getUpvote(person.id, comment);
			});
		};

		p.getUpvote = function(person_id, comment) {
			return $http.get('/people/' + person_id + '/comments/' + comment.id + '/upvote.json').then(function(data, e){
        comment.upvotes = data["data"];
			});
		};
		return p;
}])
