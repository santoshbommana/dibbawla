angular.module('app.routes', ['ngSanitize','ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('side-menu21.Home', {
    url: '/page1',
	params: {
		vis: ""		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/Home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('side-menu21', {
    url: '/side-menu21',
    templateUrl: 'templates/side-menu21.html',
    controller: 'side-menu21Ctrl'
  })

.state('side-menu21.adminLP', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/adminLoginPage.html',
        controller: 'adminLgoinPageCtrl'
      }
    }
  }).state('side-menu21.about', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/about.html',
        controller: 'aboutPageCtrl'
      }
    }
  }).state('side-menu21.login', {
    url: '/page4',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  }).state('side-menu21.logout', {
    url: '/page5',
    views: {
      'side-menu21': {
        templateUrl: 'templates/logout.html',
        controller: 'logoutCtrl'
      }
    }
  }).state('side-menu21.dineOutPage', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/dineOutPage.html',
        controller: 'dineOutPageCtrl'
      }
    }
  }).state('side-menu21.dineOutItemPage', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/dineOutItem.html',
        controller: 'dineOutItemCtrl'
      }
    }
  });


$urlRouterProvider.otherwise('/side-menu21/page1');

});
