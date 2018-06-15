angular.module('app.controllers', [])

.controller('homeCtrl', ['$scope',
	'$state',
	'$filter',
	'$http',
	'$ionicModal',
	'$timeout',
	'$ionicLoading',
	'httpService',
	'$rootScope',
	'$cordovaToast',
	'$ionicPlatform',
	'$state',
	'$global',
	'$ionicHistory',
	'$ionicSlideBoxDelegate',
	'$ionicSideMenuDelegate',
	function ($scope,
		$state,
		$filter,
		$http,
		$ionicModal,
		$timeout,
		$ionicLoading,
		httpService,
		$rootScope,
		$cordovaToast,
		$ionicPlatform,
		$state,
		$global,
		$ionicHistory,
		$ionicSlideBoxDelegate,
		$ionicSideMenuDelegate
	) {
		$ionicSideMenuDelegate.canDragContent(false);
		$scope.isActive1 = true;
		$scope.isActive2= false;
		$scope.isActive3= false;
		$scope.dine_list = true;
		$scope.delivery_list =false;
		$scope.collections_list = false;
		$scope.dineOutData = [
			{
				img:'img/creolespicedcornthumb_640x480.jpg',
				title:'Creole spiced cornt',
				content:'North Indian, Chinese, South Indian, Juices',
				cost:'100',
				offer:'5'

			},
			{
				img:'img/y4nkk1dilwvytyzu2tte.jpg',
				title:'Amul Tiffins Corner',
				content:'Tilak Road, Abids & Koti',
				cost:'150',
				offer:'8'

			},
			{
				img:'img/creolespicedcornthumb_640x480.jpg',
				title:'Creole spiced cornt',
				content:'North Indian, Chinese, South Indian, Juices',
				cost:'300',
				offer:'15'

			}
		];
		$scope.deliveryData = [
			{
				img:'img/y4nkk1dilwvytyzu2tte.jpg',
				title:'Amul Tiffins Corne',
				content:'North Indian, Chinese, South Indian, Juices',
				cost:'200',
				offer:'15'

			},
			{
				img:'img/creolespicedcornthumb_640x480.jpg',
				title:'Creole spiced cornt',
				content:'Tilak Road, Abids & Koti',
				cost:'150',
				offer:'8'

			},
			{
				img:'img/y4nkk1dilwvytyzu2tte.jpg',
				title:'Amul Tiffins Corner',
				content:'North Indian, Chinese, South Indian, Juices',
				cost:'350',
				offer:'10'

			},
			{
				img:'img/creolespicedcornthumb_640x480.jpg',
				title:'Creole spiced cornt',
				content:'Tilak Road, Abids & Koti',
				cost:'150',
				offer:'8'

			},
			{
				img:'img/y4nkk1dilwvytyzu2tte.jpg',
				title:'Amul Tiffins Corner',
				content:'North Indian, Chinese, South Indian, Juices',
				cost:'350',
				offer:'10'

			}
		];
		$scope.collectionsData = [
			{
				img:'img/creolespicedcornthumb_640x480.jpg',
				title:'Creole spiced cornt',
				content:'Tilak Road, Abids & Koti',
				cost:'150',
				offer:'8'

			}
		]
		$scope.click_tab_One = function(){
			$scope.isActive1 = true;
			$scope.isActive2= false;
			$scope.isActive3= false;
			$scope.dine_list = true;
			$scope.delivery_list =false;
			$scope.collections_list = false;
		}
		$scope.click_tab_two = function(){
			$scope.isActive2 = true;
			$scope.isActive1= false;
			$scope.isActive3= false;
			$scope.dine_list = false;
			$scope.delivery_list =true;
			$scope.collections_list = false;
		}
		
		$scope.click_tab_three = function(){
			$scope.isActive2 = false;
			$scope.isActive1= false;
			$scope.isActive3= true;
			$scope.dine_list = false;
			$scope.delivery_list =false;
			$scope.collections_list = true;
		}

		$scope.homeData = [];
		$scope.slideChanged = function (index) {
			$scope.slideIndex = index;
		};
		$ionicHistory.nextViewOptions({
			disableBack: true

		});
		$scope.image1 = "img/2.jpg";
		$scope.navigation = "side-menu21.Home({})"

		

		function getAllBased() {

			$ionicLoading.show({
				content: 'Loading Data',
				animation: 'fade-in',
				showBackdrop: false,
				maxWidth: 200,
				showDelay: 500
			});
			//http call for all homeData
			var URL = '';
			var config = {
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				},

			};
			$http.get(URL, config)
				.success(function (data, status, headers, config) {
					$scope.homeData = data;
					$ionicLoading.hide();
					console.log("get call data ", $scope.homeData[0]);
				})
				.error(function (data, status, header, config) {

					var ResponseDetails = "Data: " + data +
						"<hr />status: " + status +
						"<hr />headers: " + header +
						"<hr />config: " + config;
					console.log("Failed to save document under Remibursement DB. " + ResponseDetails);
					//$location.path('/error');
					// error massage.
					$scope.errorMassage = "OOPS! Check Your Interent Connection.";


				});
		}

	}
])

.controller('side-menu21Ctrl', ['$scope',
	'$stateParams',
	'$rootScope',
	'$ionicHistory',
	'$global',
	'$timeout',
	'$cordovaDevice',
	'$ionicLoading',
	'$http',

	function ($scope,
		$stateParams,
		$rootScope,
		$ionicHistory,
		$global,
		$timeout,
		$cordovaDevice,
		$ionicLoading,
		$http
	) {
		$scope.otp = [];
		$scope.profileData = [];
		$scope.one = true;
		$scope.two = false;
		$scope.three = true;
		$scope.four = false;
		$scope.profileMenu = false;

		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$scope.shoeProfileMenu = function () {
			$scope.profileMenu = !$scope.profileMenu;
		};
		$scope.shoesub = function () {
			$scope.temple = !$scope.temple;
			$scope.page = !$scope.page;
			$scope.advertise = !$scope.advertise;
			$scope.one = !$scope.one;
			$scope.two = !$scope.two;
		};
		$scope.shoesub1 = function () {
			$scope.leaves = !$scope.leaves;
			$scope.holiday = !$scope.holiday;
			$scope.expenseReimbursement = !$scope.expenseReimbursement;
			$scope.three = !$scope.three;
			$scope.four = !$scope.four;
		};
		///logout call
		$scope.logout = function () {
			if (confirm('Are you sure you want to logout?')) {
				ionic.Platform.exitApp();
			}

			return false;
		};
	}
])
	.controller('adminLgoinPageCtrl', ['$scope',
		'$stateParams',
		function ($scope,
			$stateParams) {



		}
	])
	.service('Map', function ($q) {

		this.init = function () {
			var options = {
				center: new google.maps.LatLng(17.418751, 78.457922),
				zoom: 13,
				disableDefaultUI: true
			}
			this.map = new google.maps.Map(
				document.getElementById("map"), options
			);
			this.places = new google.maps.places.PlacesService(this.map);
		}

		this.search = function (str) {
			var d = $q.defer();
			this.places.textSearch({
				query: str
			}, function (results, status) {
				if (status == 'OK') {
					d.resolve(results[0]);
				} else d.reject(status);
			});
			return d.promise;
		}

		this.addMarker = function (res) {
			if (this.marker) this.marker.setMap(null);
			this.marker = new google.maps.Marker({
				map: this.map,
				position: res.geometry.location,
				animation: google.maps.Animation.DROP
			});
			this.map.setCenter(res.geometry.location);
		}

	}).controller('aboutPageCtrl', ['$scope',
		'$stateParams',
		'$http',
		'$ionicLoading',
		'$ionicHistory',

		function ($scope,
			$stateParams,
			$http,
			$ionicLoading,
			$ionicHistory
		) {
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$scope.about = [];
			$ionicLoading.show({
				content: 'Loading Data',
				animation: 'fade-in',
				showBackdrop: false,
				maxWidth: 200,
				showDelay: 500
			});
			

		}]).controller('loginCtrl', ['$scope',
		'$stateParams',
		'$http',
		'$ionicLoading',
		'$state',
		'$ionicHistory',
		'$timeout',
		'$cordovaDevice',
		'$global',
		'$ionicSideMenuDelegate',




		function ($scope,
			$stateParams,
			$http,
			$ionicLoading,
			$state,
			$ionicHistory,
			$timeout,
			$cordovaDevice,
			$global,
			$ionicSideMenuDelegate



		) {
			$ionicSideMenuDelegate.canDragContent(false);
		
		}]);
mainapp.filter('secondsToDateTime', [function () {
	return function (seconds) {
		return new Date(1970, 0, 1).setSeconds(seconds);
	};
}]);
