angular.module('playerNews', ['ui.router', 'templates', 'Devise'])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home/_home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['people', function(people){
          return people.getAll();
        }]
      }
    });

  $stateProvider
    .state('people', {
      url: '/people/{id}',
      templateUrl: 'people/_people.html',
      controller: 'PeopleCtrl',
      resolve: {
        person: ['$stateParams', 'people', function($stateParams, people) {
          return people.get($stateParams.id);
        }]
      }
    });

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'auth/_login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
          $state.go('home');
        })
      }]
    });

$stateProvider
    .state('register', {
      url: '/register',
      templateUrl: 'auth/_register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
          $state.go('home');
        })
      }]
    });

  $urlRouterProvider.otherwise('home');
}]);






