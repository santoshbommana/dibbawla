angular.module('app.routes', ['ngSanitize','ionic'])

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
.state('side-menu21.temple', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/temple.html',
        controller: 'templeCtrl'
      }
    }
  })
.state('side-menu21.pages', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/page.html',
        controller: 'pageCtrl'
      }
    }
  })

.state('side-menu21.adminLP', {
    url: '/page4',
    views: {
      'side-menu21': {
        templateUrl: 'templates/adminLoginPage.html',
        controller: 'adminLgoinPageCtrl'
      }
    }
  })

.state('side-menu21.advertise', {
    url: '/page5',
    views: {
      'side-menu21': {
        templateUrl: 'templates/advertisePage.html',
        controller: 'advertisePageCtrl'
      }
    }
  })
  .state('side-menu21.events', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/events.html',
        controller: 'eventsPageCtrl'
      }
    }
  }) .state('side-menu21.Promos', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/Promos.html',
        controller: 'PromosPageCtrl'
      }
    }
  }) .state('side-menu21.Offers', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/Offers.html',
        controller: 'offersPageCtrl'
      }
    }
  }).state('side-menu21.about', {
    url: '/page9',
    views: {
      'side-menu21': {
        templateUrl: 'templates/about.html',
        controller: 'aboutPageCtrl'
      }
    }
  }).state('side-menu21.distribution', {
    url: '/page10',
    views: {
      'side-menu21': {
        templateUrl: 'templates/distributionNumbers.html',
        controller: 'distributionNumbersPageCtrl'
      }
    }
  }).state('side-menu21.Sociallinks', {
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/sociallinks.html',
        controller: 'SociallinksPageCtrl'
      }
    }
  }).state('side-menu21.feedback', {
    url: '/page12',
    views: {
      'side-menu21': {
        templateUrl: 'templates/feedback.html',
        controller: 'feedbackPageCtrl'
      }
    }
  }).state('side-menu21.login', {
    url: '/page13',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  }).state('side-menu21.leaves', {
    url: '/page14',
    views: {
      'side-menu21': {
        templateUrl: 'templates/leaves.html',
        controller: 'leavesCtrl'
      }
    }
  }).state('side-menu21.holiday', {
    url: '/page15',
    views: {
      'side-menu21': {
        templateUrl: 'templates/holiday.html',
        controller: 'holidayCtrl'
      }
    }
  }).state('side-menu21.expenseReimbursement', {
    url: '/page16',
    views: {
      'side-menu21': {
        templateUrl: 'templates/expenseReimbursement.html',
        controller: 'expenseReimbursementCtrl'
      }
    }
  }).state('side-menu21.notification', {
    url: '/page17',
    views: {
      'side-menu21': {
        templateUrl: 'templates/notification.html',
        controller: 'notificationCtrl'
      }
    }
  }).state('side-menu21.settings', {
    url: '/page18',
    views: {
      'side-menu21': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  }).state('side-menu21.logout', {
    url: '/page19',
    views: {
      'side-menu21': {
        templateUrl: 'templates/logout.html',
        controller: 'logoutCtrl'
      }
    }
  }).state('side-menu21.dailyprograms', {
    url: '/page20',
    views: {
      'side-menu21': {
        templateUrl: 'templates/dailyprograms.html',
        controller: 'dailyprogramsCtrl'
      }
    }
  });


$urlRouterProvider.otherwise('/side-menu21/page14');

});
