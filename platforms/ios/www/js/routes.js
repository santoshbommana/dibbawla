angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('side-menu21.jayaJayaShankara', {
    url: '/page1',
	params: {
		vis: ""		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/jayaJayaShankara.html',
        controller: 'jayaJayaShankaraCtrl'
      }
    }
  })

  .state('side-menu21', {
    url: '/side-menu21',
    templateUrl: 'templates/side-menu21.html',
    controller: 'side-menu21Ctrl'
  })

  .state('aboutUs', {
    url: '/page4',
    templateUrl: 'templates/aboutUs.html',
    controller: 'aboutUsCtrl'
  })

  .state('advertise', {
    url: '/page5',
    templateUrl: 'templates/advertise.html',
    controller: 'advertiseCtrl'
  })

  .state('side-menu21.contact', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/contact.html',
        controller: 'contactCtrl'
      }
    }
  })

  .state('side-menu21.schedule', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/schedule.html',
        controller: 'scheduleCtrl'
      }
    }
  })


  .state('side-menu21.festivals', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/festivals.html',
        controller: 'festivalsCtrl'
      }
    }
  })

  .state('side-menu21.dharmaSandehalu', {
    url: '/page9',
    views: {
      'side-menu21': {
        templateUrl: 'templates/dharmaSandehalu.html',
        controller: 'dharmaSandehaluCtrl'
      }
    }
  })

  .state('side-menu21.events', {
    url: '/page13',
    views: {
      'side-menu21': {
        templateUrl: 'templates/events.html',
        controller: 'eventsCtrl'
      }
    }
  })
  .state('side-menu21.social', {
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/social.html',
        controller: 'socialCtrl'
      }
    }
  })

  .state('signup', {
    url: '/page12',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })
.state('video', {
    url: '/page10',
    templateUrl: 'templates/video.html',
    controller: 'videoCtrl',
     cache: false,
    params: {
    vid: "vWLJkWsHURQ"    
    }

  })


$urlRouterProvider.otherwise('/side-menu21/page1')

  

});
