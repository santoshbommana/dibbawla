angular.module('app.SideMenucontrollers', [])

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

	});
mainapp.filter('secondsToDateTime', [function () {
	return function (seconds) {
		return new Date(1970, 0, 1).setSeconds(seconds);
	};
}]);
