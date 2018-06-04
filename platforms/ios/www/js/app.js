// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var mainapp = angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services','uiGmapgoogle-maps','googlemaps.init', 'ngCordova'])

// Global variables to be used in this file only.


mainapp.constant('appglobals', 
                              {
                                GCM_SENDERID: '568959423988',
                                CONTENT_TYPE: 'application/json; charset=utf-8',
                                STORETOKEN_URL: 'https://whiznext-api.mybluemix.net/jjsmobile/v1/storetoken'
                              }
                )

mainapp.config(function($ionicConfigProvider, $sceDelegateProvider){
  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);
})

mainapp.run(function($ionicPlatform, $cordovaDevice, appglobals, $http, $cordovaToast, $cordovaNetwork, $rootScope, $ionicPopup, $ionicHistory) {
  $ionicPlatform.ready(function() 
  {
    
    $rootScope.loadHome = false;
    $rootScope.loadSchedule = false;
    $rootScope.loadFestivals = false;
   
    if(window.Connection) 
    {
      if(navigator.connection.type == Connection.NONE) {
        $rootScope.online = false;
      }
      else{
        $rootScope.online = true;
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

    registerDeviceIdForPushNotification(appglobals, $cordovaDevice, $http, $cordovaToast);

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


})

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


function registerDeviceIdForPushNotification(appglobals, $cordovaDevice, $http, $cordovaToast)
{

  //alert("Registering device ID for push notification");

  var pushConfig = 
  {
    android: {
      senderID: appglobals.GCM_SENDERID,
      icon: 'ic_stat_icon',
      iconColor: "#FF0000"
    }
  };

  var push = window.PushNotification.init(pushConfig);
  pushObj = push;

  push.on('registration', function(data) 
  {
    var token = data.registrationId
    console.log('OK: register notfy ', token);
    //alert( 'OK: ' + token);

    //alert( 'platform: ' +  $cordovaDevice.getPlatform());

    var data = 
    {
      id: token,
      platform: $cordovaDevice.getPlatform()
    };
        
    var config = 
    {
      headers : {
                 'Content-Type': appglobals.CONTENT_TYPE
                }
    };

    
    $http.post(appglobals.STORETOKEN_URL, data, config)
            .success(function (data, status, headers, config) 
            {
              //Token saved successfully
            })
            .error(function (data, status, header, config) 
            {
                var ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });

  });


  push.on('notification', function(data) {
    $cordovaToast
    .show(data.message, 'long', 'center')
    .then(function(success) {
      // success
    }, function (error) {
      // error
    });


  });

  push.on('error', function(e) {
    // e.message
    //alert( 'An error occurred: ' + e.message);
  });

}

mainapp.factory('httpService', function($http) {
    var data = function (value) {
            return $http.get(value);
    }

    return { data: data }
});

mainapp.factory('globalService', function() {
    var vid = '';
    var cPage = 'HOME_PAGE';
    var getVid = function () {
            return vid;
    }
    var setVid = function (value) {
            vid = value;
    }
    
    var plvids = {'vids' : []};

    var setplist = function (value) {
          plvids = {'vids' : []};
          plvids = value;
    }
    var getplist = function () {
    return plvids;
    }
    
    var setCPage = function(value){
      cPage = value;
    }
    var getCPage = function(){
      return cPage;
    }

   

       return { getVid : getVid,
                setVid : setVid,
                setplist : setplist,
                getplist : getplist,
                getCPage : getCPage,
                setCPage : setCPage 
  }
});