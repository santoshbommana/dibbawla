angular.module('app.services', [])

.service('Result', ['$q','$http','$filter', function($q, $http, $filter){
    var today = new Date();
    var record_id = $filter('date')(today, "dd-MM-yyyy");
    var api_url = "https://whiznext-api.mybluemix.net/jjsmobile/v1/fetchHomeData/" + record_id ;
    var resultset = [];
    return {
        all: function(){
            var deferred = $q.defer();
            $http.get(api_url).then(function(resp){
                deferred.resolve(resp.data);
              //  console.log(resp.data);
                results[0] = resp.data.visistatha;
                results[1] = resp.data.panchangam;
                results[2] = resp.data.pariharalu;
                results[3] = resp.data.stotram;
                return results;
            }); 
           // return deferred.promise;  
         },
         getVis: function(){
             return vis;
         }
    };
}]);

//.service('HomePageData',['$q','$http', function($q, $http){