angular.module('app.aboutPagecontrollers', []).controller('aboutPageCtrl', ['$scope',
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
			var url = "http://google.com"

			$scope.loadingMasg = true;
			$http.get(url).success(function (data) {
				$scope.about = data;
				$ionicLoading.hide();
				console.log('get function called', data);

			}).error(function (data, status, header, config) {
				var ResponseDetails = "Data: " + data +
					"<hr />status: " + status +
					"<hr />headers: " + header +
					"<hr />config: " + config;
				console.log("Failed to save record. " + ResponseDetails);
				$scocpe.error = 'Oops! Check your Internet Connection.'
				$ionicLoading.hide();

			});

		}
	])