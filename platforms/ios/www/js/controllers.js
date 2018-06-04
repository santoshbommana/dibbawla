angular.module('app.controllers', [])
  
.controller('jayaJayaShankaraCtrl', ['$scope', '$state', '$filter', '$http', '$ionicModal', '$timeout', '$ionicLoading', 'httpService', '$rootScope', '$cordovaToast', '$ionicPlatform', 'globalService',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

//In the below HomePageData is the name of the service in the services.js page
function ($scope, $state, $filter, $http, $ionicModal, $timeout, $ionicLoading, httpService, $rootScope, $cordovaToast, $ionicPlatform, globalService) {
    //$scope.liveUrl = 'https://www.youtube.com/watch?v=4lhrHRd0_B8';
    $scope.changePage1 = function(){
       globalService.setVid('2BOe3nxjYBHM');
       globalService.setCPage('HOME_PAGE');
       $state.go('video');
    }
    $ionicPlatform.ready(function() {
    $scope.liveUrl = '';
    var today = new Date();
    var record_id = $filter('date')(today, "dd-MM-yyyy");
    var api_url = "https://whiznext-api.mybluemix.net/jjsmobile/v1/fetchHomeData/" + record_id;
    //var api_url = "https://whiznext-api.mybluemix.net/jjsmobile/v1/fetchHomeData/" + "08-01-2017";
    
    $scope.visistatha = '';
    $scope.panchangam = '';
    $scope.pariharalu = '';
    $scope.stotram = '';

    

    $scope.$watch(
        function()
        {
          return $rootScope.online;
        }, 
        function()
        {
            if($rootScope.online === false)
            {
                $cordovaToast
                  .show('Please check your data connection!!', 'long', 'center')
                  .then(function(success) {
                    // success
                  }, function (error) {
                    // error
                  });
            }
            else if( $rootScope.online === true)
            {
                reloadData(true);
            }
                
        }
    );


    function reloadData(bshowToast)
    {
      if( $scope.visistatha == '' || $scope.panchangam == '' || $scope.pariharalu == '' || $scope.stotram == '' )
        {
            $ionicLoading.show({
              content: 'Loading Data',
              animation: 'fade-in',
              showBackdrop: false,
              maxWidth: 200,
              showDelay: 500
          });

          received_data = httpService.data(api_url);

          received_data.then(
                function(response){
                    $timeout( function(){
                      $scope.visistatha = response.data.visistatha;
                      $scope.panchangam = response.data.panchangam;
                      $scope.pariharalu = response.data.pariharalu;
                      $scope.stotram = response.data.stotram;                  
                      $ionicLoading.hide();
                    }, 0);
                    
                }, function(){
                  if( $scope.visistatha == '' || $scope.panchangam == '' || $scope.pariharalu == '' || $scope.stotram == '' )
                  {
                    if(bshowToast)
                    {
                      if( $rootScope.online === true)
                      {
                          $cordovaToast
                            .show('Failed to fetch data from server.', 'long', 'center')
                            .then(function(success) {
                              // success
                            }, function (error) {
                              // error
                            });
                          }
                  }
                }
                 
                  $ionicLoading.hide();
            });
        }
    }


$scope.$on('$locationChangeSuccess', function(event) {
   if($rootScope.online === false && $rootScope.loadHome)
   {
    if( $scope.visistatha == '' || $scope.panchangam == '' || $scope.pariharalu == '' || $scope.stotram == '' )
    {
      $cordovaToast
      .show('Please check your data connection!!', 'long', 'center')
      .then(function(success) {
        // success
      }, function (error) {
      // error
     });
    }
  }
  if( $rootScope.loadHome)
  {
    reloadData(true);  
  }
  $rootScope.loadHome = false;
  $rootScope.loadFestivals = true;
  $rootScope.loadSchedule = true;


 

});



  });


}])
   
.controller('side-menu21Ctrl', ['$scope', '$stateParams', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope) {
 
}])
   
.controller('aboutUsCtrl', ['$scope', '$stateParams', '$ionicLoading', '$rootScope', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicLoading, $rootScope, $state) {
 
}])
   
.controller('advertiseCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


$scope.data= {
    'name':$scope.name,
    'email':$scope.email,
    'mobile':$scope.mobile,
    'message':$scope.message
    
}

 
}

])
   
.controller('contactCtrl', ['$scope', '$stateParams', '$filter', '$http', '$ionicModal', '$timeout', '$ionicLoading', 'httpService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $filter, $http, $ionicModal, $timeout, $ionicLoading, httpService) {

 $scope.data= {
    'name':$scope.name,
    'mobile':$scope.mobile,
    'email':$scope.email,
    'message':$scope.message,
    'subject':$scope.subject
}

 $scope.sendMail = function(){
    
    var URL = 'https://whiznext-api.mybluemix.net/jjsmobile/v1/sendmail';
    var config = {
            headers : {
                'Content-Type': 'application/json; charset=utf-8'
                }
    };

    $ionicLoading.show({
          content: 'Loading Data',
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 200,
          showDelay: 500
      });

    console.log( 'Mobile data to send: ' + JSON.stringify($scope.data));

    $http.post(URL, $scope.data, config)
            .success(function (data, status, headers, config) 
            {
                console.log( data + ": " + status );
                $ionicLoading.hide();
                alert( 'Thank you for your interest. Our concerned team will get back to you.');
                $scope.data= {
                                'name':'',
                                'mobile':'',
                                'email':'',
                                'message':'',
                                'subject':''
                            }

            })
            .error(function (data, status, header, config) {
                var ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
                    console.log( "Failed to save document under jjsadmin-festival DB. " + ResponseDetails);
                    $ionicLoading.hide();
                alert( 'Error while sending details. Please check if you had entered all the entries.');      
            }); 

 }

 
}])
   
.controller('scheduleCtrl', ['$scope', '$stateParams', '$filter', '$http', '$ionicModal', '$timeout', '$ionicLoading', 'httpService', '$rootScope', '$cordovaToast',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $filter, $http, $ionicModal, $timeout, $ionicLoading, httpService, $rootScope, $cordovaToast) {

  var today = new Date();
  var record_id = $filter('date')(today, "dd-MM-yyyy");
  var api_url = "https://whiznext-api.mybluemix.net/jjsmobile/v1/fetchSchedule/" + record_id ;
  //var api_url = "https://whiznext-api.mybluemix.net/jjsmobile/v1/fetchSchedule/" + "08-01-2017" ;

  $scope.todaydate = $filter('date')(today, "EEEE, MMMM d, y");

  $scope.scheduleList = [];

    $scope.$watch(
        function()
        {
          return $rootScope.online;
        }, 
        function()
        {
            if($rootScope.online === false)
            {
                $cordovaToast
                  .show('Please check your data connection!!', 'long', 'center')
                  .then(function(success) {
                    // success
                  }, function (error) {
                    // error
                  });
            }
            else if( $rootScope.online === true)
            {
                reloadData(true);
            }
                
        }
    );


    function reloadData(bshowToast)
    {
      if( $scope.scheduleList.length == 0)
      {
        $ionicLoading.show({
            content: 'Loading Data',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 500
        });


        received_data = httpService.data(api_url);
        
        received_data.then(
                  function(response){
                      $timeout( function(){
                        $scope.scheduleList = response.data.schedule;
                        $ionicLoading.hide();
                      }, 0);
                      
                  }, function(){
                    if( $scope.scheduleList.length == 0)
                    {
                      if( bshowToast)
                      {
                      if( $rootScope.online === true)
                      {
                        $cordovaToast
                            .show('Failed to fetch data from server.', 'long', 'center')
                            .then(function(success) {
                              // success
                            }, function (error) {
                              // error
                            });
                          }
                        }
                    }
                    $ionicLoading.hide();
              });

      }
    }

    $scope.$on('$locationChangeSuccess', function(event) {
      if($rootScope.online === false && $rootScope.loadSchedule)
      {
        if( $scope.scheduleList.length == 0)
        {
        $cordovaToast
        .show('Please check your data connection!!', 'long', 'center')
        .then(function(success) {
          // success
        }, function (error) {
              // error
          });
      }
      }
      if( $rootScope.loadSchedule)
      {
        reloadData(true);  
      }
      $rootScope.loadSchedule = false;
       $rootScope.loadHome = true;
      $rootScope.loadFestivals = true;

      
  });


  
}])
   
.controller('videoCtrl', ['$scope', '$stateParams', 'globalService', '$ionicHistory', '$state',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, globalService, $ionicHistory, $state) {

var cPage = globalService.getCPage();
if( cPage === 'DS_PAGE')
{
  $scope.vid = "https://www.youtube.com/embed/" + globalService.getVid() + "?rel=0&amp;showinfo=0&quot;";
  $scope.title = "Dharma Sandehalu";
}
else if( cPage === 'HOME_PAGE')
{
  $scope.vid = "https://www.youtube.com/embed/live_stream?channel=UCLFlwOaDRXvYIBNAQMKJ2Rw"; 
  $scope.title = "Live TV";
}


console.log( 'in video: ' + $scope.vid);
  
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('jjsIframe', {
        events: {
          'onStateChange': YT.onPlayerStateChange
        }
    });
    console.log( 'you tube ready');
  }

  $scope.$watch(
        function()
        {
          return globalService.getVid();
        }, 
        function()
        {
          var cPage = globalService.getCPage();
          if( cPage === 'DS_PAGE')
          {
            $scope.vid = "https://www.youtube.com/embed/" + globalService.getVid() + "?rel=0&amp;showinfo=0&quot;";
          }
          else if( cPage === 'HOME_PAGE')
          {
            $scope.vid = "https://www.youtube.com/embed/live_stream?channel=UCLFlwOaDRXvYIBNAQMKJ2Rw"; 
          }
          console.log( 'in video: ' + $scope.vid);
        }
    );

  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
 
  function onPlayerStateChange(event) {
    event.target.pauseVideo();
  } 

}

])
   
.controller('festivalsCtrl', ['$scope', '$stateParams', '$filter', '$http', '$ionicModal', '$timeout', '$ionicLoading', 'httpService', '$rootScope', '$cordovaToast',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $filter, $http, $ionicModal, $timeout, $ionicLoading, httpService, $rootScope, $cordovaToast) {

  var today = new Date();
  var record_id = $filter('date')(today, "MM-yyyy");
  var api_url = "https://whiznext-api.mybluemix.net/jjsmobile/v1/fetchFestivals/" + record_id ;
  
  $scope.monthyear = $filter('date')(today, "MMMM, yyyy");

  $scope.festivals = [];

  
  $scope.$watch(
        function()
        {
          return $rootScope.online;
        }, 
        function()
        {
            if($rootScope.online === false)
            {
                $cordovaToast
                  .show('Please check your data connection!!', 'long', 'center')
                  .then(function(success) {
                    // success
                  }, function (error) {
                    // error
                  });
            }
            else if( $rootScope.online === true)
            {
                reloadData(true);
            }
                
        }
    );

  function reloadData(bshowToast)
  {
    if( $scope.festivals.length == 0)
        {
            $ionicLoading.show({
          content: 'Loading Data',
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 200,
          showDelay: 500
            });


        received_data = httpService.data(api_url);
        
        received_data.then(
                  function(response){
                      $timeout( function(){
                        $scope.festivals = response.data.festivals;
                        $ionicLoading.hide();
                      }, 0);
                      
                  }, function(){
                    if( $scope.festivals.length == 0)
                    {
                      if( bshowToast)
                      {
                      if( $rootScope.online === true)
                      {
                        $cordovaToast
                            .show('Failed to fetch data from server.', 'long', 'center')
                            .then(function(success) {
                              // success
                            }, function (error) {
                              // error
                            });
                          }
                        }
                    }
                    $ionicLoading.hide();
              });
        }
  }

    $scope.$on('$locationChangeSuccess', function(event) {
      if($rootScope.online === false && $rootScope.loadFestivals)
      {
        if( $scope.festivals.length == 0)
        {
        $cordovaToast
        .show('Please check your data connection!!', 'long', 'center')
        .then(function(success) {
          // success
        }, function (error) {
              // error
          });
      }
      }
      if( $rootScope.loadFestivals)
      {
        reloadData(true);  
      }
      
      $rootScope.loadFestivals = false;
      $rootScope.loadHome = true;
      $rootScope.loadSchedule = true;

      
      
  });

}])
   
.controller('dharmaSandehaluCtrl', ['$scope', '$stateParams', '$state', 'globalService', '$ionicLoading', '$cordovaToast', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, globalService, $ionicLoading, $cordovaToast, $rootScope) {
  var playlistId, nextPageToken, prevPageToken;
    playlistId = "PLk4E4F_tqhes0TIzkesuQuomzWbMrqqj3";
    //$scope.playlistItems = globalService.getCurrentplist();
    $scope.playlistItems = [];

    console.log( ' PlaylistItems length: ' + $scope.playlistItems.length);
    //console.log( ' globalService : ' + globalService.getCurrentplist());

    $scope.$watch(
        function()
        {
          return $rootScope.online;
        }, 
        function()
        {
            if($rootScope.online === false)
            {
               $ionicLoading.hide();
                $cordovaToast
                  .show('Please check your data connection!!', 'long', 'center')
                  .then(function(success) {
                    // success
                  }, function (error) {
                    // error
                  });
            }
            else if( $rootScope.online === true)
            {
              if( $scope.playlistItems.length == 0 )
              {
                $ionicLoading.show({
                  content: 'Loading Data',
                  animation: 'fade-in',
                  showBackdrop: false,
                  maxWidth: 200,
                  showDelay: 500
                    }); 
                  requestVideoPlaylist(playlistId);
                }
            }
                
        }
    );

    if( $scope.playlistItems.length == 0)
    {
           

       if($rootScope.online === false)
       {
            if( $scope.playlistItems.length == 0)
            {
            $cordovaToast
            .show('Please check your data connection!!', 'long', 'center')
            .then(function(success) {
              // success
            }, function (error) {
                  // error
              });
          } 
       }
       else
       {
        $ionicLoading.show({
              content: 'Loading Data',
              animation: 'fade-in',
              showBackdrop: false,
              maxWidth: 200,
              showDelay: 500
                }); 
        requestVideoPlaylist(playlistId);
       }
  }
 
    // Retrieve the list of videos in the specified playlist
    function requestVideoPlaylist(playlistId, pageToken) 
    {
        playlistId = "PLk4E4F_tqhes0TIzkesuQuomzWbMrqqj3";
        var requestOptions = {
          apiKey: 'AIzaSyBmd8kr7HfBVdgUINdV0C9miPBD8z-8jL4',
          playlistId: playlistId,
          part: 'snippet',
          maxResults: 10
        };
        if (pageToken) {
          requestOptions.pageToken = pageToken;
        }
        gapi.client.setApiKey('AIzaSyBmd8kr7HfBVdgUINdV0C9miPBD8z-8jL4');
        gapi.client.load('youtube', 'v3');
        gapi.client.init({
          'apiKey': 'AIzaSyBmd8kr7HfBVdgUINdV0C9miPBD8z-8jL4',
          'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
         }).then(function() {
          // 3. Initialize and make the API request.
          return gapi.client.youtube.playlistItems.list(requestOptions);
         }).then(function(response) 
         {
              var _playlistItems = response.result.items;
              var resultItems = {'vids' : []};

              for (item in _playlistItems)
              {
                  resultItems.vids.push({
                    "videoID" : _playlistItems[item].snippet.resourceId.videoId,
                    "desc" : _playlistItems[item].snippet.description,
                    "title" : _playlistItems[item].snippet.title,
                    "thumbnail" : _playlistItems[item].snippet.thumbnails.high.url
                  })
              }
              
              $scope.playlistItems = resultItems.vids;
              globalService.setplist(resultItems.vids);
              $ionicLoading.hide();
          
          }, function(reason) 
          {
             console.log('Error: ' + reason);
          });    

     }

   // Youtube code ends here



     $scope.changePage = function(value)
     {
       globalService.setVid(value);
       globalService.setCPage('DS_PAGE');
       $state.go('video');
    }

 

}])
   
.controller('socialCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

 

}])


.controller('eventsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

  $scope.events = [
      {
        'title': 'Annadatha Sukhibhava',
        'image': 'img/OoDp5DqITMyH3s2E0U2s_annadatha1.jpg',
        'details': 'సర్వోత్క్రుష్టమైన దానములలో అన్నదానం ఒకటి. అన్నం పరభ్రహ్మ స్వరూపం. సర్వజీవాధారం. సామాన్యుడి నుంచి సంపన్నుడి వరకు అందరి క్షుద్బాధను తీర్చేది అన్నం మాత్రమే. అన్నార్తులను ఆదుకునేందుకు మహాస్వామి వారు \" పిడికెడు బియ్యం \" కార్యక్రమాన్ని ప్రారంభించారు. అన్నార్తులకు ఆదుకునేందుకు ఉడత సాయంగా \" అన్నదాత సుఖీభవ \" కార్యక్రమాన్ని ప్రారంభించింది జయ జయ శంకర టీవీ. దాతల నుంచి గృహస్థుల నుంచి బియ్యాన్ని స్వీకరించి అందులోని భీమా భాగాన్ని శరణాలయాలలో , వేద పాఠశాలల్లోని వారికీ అందచేయటం, శేష భాగాన్ని మహాదేవుని అన్నాభిషేకానికి వినియోగించటమే \" అన్నదాత సుఖీభవ \" కార్యక్రమం. ఈ కార్యక్రమ వివరాలు ఎప్పటికప్పుడు జయ జయ శంకర టీవిలో ప్రసారం చేయబడతాయి.'
      },

      {
        'title': 'Utsav',
        'image': 'img/LtFC0wqtRM2JacX8YBQb_Utsav1.jpg',
        'details': 'Celebrations to welcome the new year 2017 @ Sathya Sai Nigamagamam, Hyderabad'
      },

      {
        'title': 'Sri Matha Sri Maha Ragni',
        'image': 'img/INMIA0jLRcavzZrPAbPO_srilalitha1.jpg',
        'details': 'శ్రీ శ్రీ శృంగేరి జగద్గురువులు ప్రప్రధమంగా పూజ చేసిన మరకత \" శ్రీ చక్రం తో \" \" శ్రీ మాతా - శ్రీ మహారాజ్ఞి \" (సామూహిక లలితానామ పారాయణం) కార్యక్రమాన్ని ఆదిదంపతుల కృపాకటాక్షాలతో జయప్రదంగా నిర్వహిస్తున్న జయ జయ శంకర టీవీ 18 కోట్ల శ్రీ లలితనామ పారాయణ కార్యక్రమానికి శ్రీకారం చుట్టింది. ప్రతి ధార్మిక గృహం శ్రీమాత నిలయం కావాలన్నా సత్సంకల్పంతో ఈ కార్యక్రమాన్ని వాడవాడలా నిర్వహించి శ్రీమాత కృపకు మనమంతా పాత్రులం కావాలని, కుటుంబసమేతంగా అందరూ \" శ్రీ మాతా - శ్రీ మహారాజ్ఞి \" సామూహిక లలితాపారాయణ కార్యక్రమంలో పాల్గొనాలని జయ జయ శంకర టీవీ ఆకాంక్షిస్తోంది.'
      }

  ];


 $scope.toggleEvent = function(event) {
    if ($scope.isEventShown(event)) {
      $scope.shownEvent = null;
    } else {
      $scope.shownEvent = event;
    }
  };
  $scope.isEventShown = function(event) {
    return $scope.shownEvent === event;
  };


 
}])
   
.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

 $scope.$on('$locationChangeSuccess', function(event) {
      $rootScope.loadHome = true;
      $rootScope.loadFestivals = true;
      $rootScope.loadSchedule = true;
  });

}])
 
