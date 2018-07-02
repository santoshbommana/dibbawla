angular.module('app.homeController', [])
.controller('homeContoller', ['$scope',
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
		$ionicModal.fromTemplateUrl('my-modal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		 }).then(function(modal) {
			$scope.modal = modal;
		 });
		  
		 $scope.openModal = function() {
			$scope.modal.show();
		 };
		//  setTimeout(function(){
		// 	$scope.openModal();
		//  },500);
		 $scope.closeModal = function() {
			$scope.modal.hide();
		 };
		  

		$scope.homeData = [];
		$scope.slideChanged = function (index) {
			$scope.slideIndex = index;
		};
		// $ionicHistory.nextViewOptions({
		// 	disableBack: true

		// });
		$scope.image1 = "img/2.jpg";
		$scope.navigation = "side-menu21.Home({})"

		$scope.goToDineOut = function(){
			
			$state.go("side-menu21.dineOutPage");
		}

		// function getAllBased() {

		// 	$ionicLoading.show({
		// 		content: 'Loading Data',
		// 		animation: 'fade-in',
		// 		showBackdrop: false,
		// 		maxWidth: 200,
		// 		showDelay: 500
		// 	});
		// 	//http call for all homeData
		// 	var URL = '';
		// 	var config = {
		// 		headers: {
		// 			'Content-Type': 'application/json; charset=utf-8'
		// 		},

		// 	};
		// 	$http.get(URL, config)
		// 		.success(function (data, status, headers, config) {
		// 			$scope.homeData = data;
		// 			$ionicLoading.hide();
		// 			console.log("get call data ", $scope.homeData[0]);
		// 		})
		// 		.error(function (data, status, header, config) {

		// 			var ResponseDetails = "Data: " + data +
		// 				"<hr />status: " + status +
		// 				"<hr />headers: " + header +
		// 				"<hr />config: " + config;
		// 			console.log("Failed to save document under Remibursement DB. " + ResponseDetails);
		// 			//$location.path('/error');
		// 			// error massage.
		// 			$scope.errorMassage = "OOPS! Check Your Interent Connection.";


		// 		});
		// }

	}])


