// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var mainapp = angular.module('app', ['ionic', 
                                     'app.controllers', 
                                     'app.routes', 
                                     'app.directives',
                                     'app.services',
                                     'uiGmapgoogle-maps',
                                     'googlemaps.init',
                                     'ngCordova',
                                     'youtube-embed'
                                     ])
 

// Global variables to be used in this file only.
mainapp.constant('appglobals', 
                              {
                                GCM_SENDERID: '568959423988', // what is this.. for push notifications. 
                                CONTENT_TYPE: 'application/json; charset=utf-8',
                                STORETOKEN_URL: 'https://whiznextapi.mybluemix.net/tokens/v1/storeTokens'
                              }
                )

mainapp.config(function($ionicConfigProvider, $sceDelegateProvider){
  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);
})

mainapp.run(function($ionicPlatform, $cordovaDevice, appglobals, $http, $cordovaToast, $cordovaNetwork, $rootScope, $ionicPopup, $ionicHistory,$ionicLoading,$global,
			   $timeout) {
  $ionicPlatform.ready(function() 
  {
    
    $rootScope.loadHome = false;
    $rootScope.loadSchedule = false;
    $rootScope.loadFestivals = false;
   
     if(window.Connection) {
     if(navigator.connection.type == Connection.NONE) {
       $ionicPopup.confirm({
         title: 'No Internet Connection',
         content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
       })
       .then(function(result) {
         if(!result) {
           ionic.Platform.exitApp();
         }
             });
           }
         }
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

      // App initialization code

//   registerDeviceIdForPushNotification(appglobals, $cordovaDevice, $http, $cordovaToast);

   $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
     $rootScope.online =true;
   });

   $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
     $rootScope.online =false;
   });



///Device backbutton event
$ionicPlatform.registerBackButtonAction(function(e) 
{
    e.preventDefault();
 
    if( confirm('Are you sure you want to exit the app?') )
    {
      ionic.Platform.exitApp();
    }

    return false;
  }, 101);


  });
});

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
mainapp.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",  
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
mainapp.directive('hrefInappbrowser', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var place = attrs['hrefInappbrowser'] || '_system';
      element.bind('click', function (event) {

        var href = event.currentTarget.href;

        window.open(href, place, 'location=yes');

        event.preventDefault();
        event.stopPropagation();

      });
    }
  };
});


//function registerDeviceIdForPushNotification(appglobals, $cordovaDevice, $http, $cordovaToast)
//{
// var platform = $cordovaDevice.getPlatform()
//
//}

mainapp.factory('httpService', function($http) {
    var data = function (value) {
            return $http.get(value);
    };

    return { data: data };
});
//factory for get and set methods
mainapp.factory('$global', function() {
  var department ={};
	var profile = [];
	var notifications = [];
	var userData = [];
	var menu = true;
  var number ={};
	return{
		setprofile:function(val){
			profile = val;
		},
		getprofile:function(){
			return profile;
		},
		setuserData:function(val){
			userData = val;
		},
		getuserData:function(){
			return userData;
		},
		setdepartment:function(val){
			department = val;
		},
    setNumber:function(val){
       number = val;
    },
    getNumber:function(){
      return number
    },
		getdepartment:function(){
			return department;
		},
		setnotifications:function(val){
			notifications = val;
		},
		getnotifications:function(){
			return notifications;
		},
		setmenu:function(val){
			menu = val;
		},
		getmenu:function(){
			return menu;
		}
	};
});





