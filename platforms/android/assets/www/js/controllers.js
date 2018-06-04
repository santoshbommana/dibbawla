angular.module('app.controllers', [])

.controller('jayaJayaShankaraCtrl', ['$scope',
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
		$ionicSlideBoxDelegate
	) {

		$scope.homeData = [];
		$scope.slideChanged = function (index) {
			$scope.slideIndex = index;
		};
		$ionicHistory.nextViewOptions({
			disableBack: true

		});
		$scope.image1 = "img/2.jpg";
		$scope.navigation = "side-menu21.jayaJayaShankara({})"

		var department = $global.getdepartment();


		function getAllBased() {

			$ionicLoading.show({
				content: 'Loading Data',
				animation: 'fade-in',
				showBackdrop: false,
				maxWidth: 200,
				showDelay: 500
			});
			//http call for all homeData
			var URL = 'https://whiznextapi.mybluemix.net/homePage/v1/getHomePage';
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
		getAllBased();

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


.controller('templeCtrl', ['$scope',
		'$stateParams', '$http', '$cordovaGeolocation', 'Map',
		'$q', '$ionicLoading', '$ionicHistory',
		function ($scope,
			$stateParams, $http, $cordovaGeolocation, Map,
			$q, $ionicLoading, $ionicHistory) {

			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			auto();
			// Auto generate Number 
			function auto() {

				var url = 'https://whiznextapi.mybluemix.net/devotional/v1/getAllTempleDetails/';
				$http.get(url).success(function (data) {
					templeData = data.length;
					//console.log("//",templeData);          
					$scope.loading = false;
					$scope.autoiID = templeData + 1;
					//console.log("ahsdgfkasd",  $scope.autoiID);
				});

			}
			$scope.submit = function (templeData) {
				$scope.templeData = templeData;

				if (templeData.templeName === " " || templeData.templeName == null || templeData.templeName == undefined) {
					$scope.errorTempleName = "Enter Temple Name";
				}

				if (templeData.level === " " || templeData.level == null || templeData.level == undefined) {
					$scope.errorLevel = "Select Level Of Temple ";
				}
				if (templeData.godName === " " || templeData.godName == null || templeData.godName == undefined) {
					$scope.errorGodName = "Enter God Name ";
				}
				if (templeData.phoneNumber === " " || templeData.phoneNumber == null || templeData.phoneNumber == undefined) {
					$scope.errorReporterPhone = "Enter Reporter Mobile Number ";
				}
				if (templeData.reporterName === " " || templeData.reporterName == null || templeData.reporterName == undefined) {
					$scope.errorReporterName = "Enter Reporter Name  ";
				} else {
					var URL = 'https://whiznextapi.mybluemix.net/devotional/v1/storeTempleDeatils/';
					var data = {

						_id: $scope.autoiID.toString(),
						templeNmae: $scope.templeData.templeName,
						godName: $scope.templeData.godName,
						level: $scope.templeData.level,
						peethamName: $scope.templeData.peethamName,
						eoName: $scope.templeData.eoName,
						eoPhoneNumber: $scope.templeData.eoPhoneNumber,
						chairmanName: $scope.templeData.chairmanName,
						chairmanphoneNumber: $scope.templeData.chairmanphoneNumber,
						trustName: $scope.templeData.trustName,
						trustyPhoneNumber: $scope.templeData.trustyPhoneNumber,
						templeAreaName: $scope.templeData.templeAreaName,
						villageName: $scope.templeData.villageName,
						mandalName: $scope.templeData.mandalName,
						districtName: $scope.templeData.districtName,
						state: $scope.templeData.state,
						reporterName: $scope.templeData.reporterName,
						phoneNumber: $scope.templeData.phoneNumber,
						localCablenetworkDetails: $scope.templeData.localCablenetworkDetails,
						location: $scope.place,
						poojariName: $scope.templeData,
						poojariNumber: $scope.templeData.poojariNumber,
						importantEventsName: $scope.templeData.importantEventsName,
						importantEventDate: $scope.templeData.importantEventDate,
						templeCeremony: $scope.templeData.templeCeremony,
						additionalInfo: $scope.templeData.additionalInfo
					}

					$ionicLoading.show({
						content: 'Loading Data',
						animation: 'fade-in',
						showBackdrop: false,
						maxWidth: 200,
						showDelay: 500
					});

					console.log('Data to Store in the DB', data);

					var config = {
						headers: {
							'Content-Type': 'application/json; charset=utf-8'
						},

					};
					//console.log( "API : " + URL);
					console.log("Data passed to the API call: " + data);

					$http.post(URL, data, config)
						.success(function (data, status, headers, config) {
							console.log(data + ": " + status);
							$ionicLoading.hide();
							reset();


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
				// removing the Error Masages On change 
				$scope.onTempleChange = function () {
					$scope.errorTempleName = " ";
				};
				$scope.onSelectLevel = function () {
					$scope.errorLevel = " ";
				};
				$scope.onChangeGodName = function () {
					$scope.errorGodName = " ";
				};
				$scope.onChangeReporterName = function () {
					$scope.errorReporterName = " ";
				};
				$scope.onChangeReporterPhone = function () {
					$scope.errorReporterPhone = " ";
				};
			};

			// rest Function 

			function reset() {

				console.log("** Reset Function Called**");
				$scope.templeData.templeName = " ";
				$scope.templeData.godName = " ";
				$scope.templeData.level = " ";
				$scope.templeData.eoName = " ";
				$scope.templeData.eoPhoneNumber = " ";
				$scope.templeData.chairmanName = " ";
				$scope.templeData.chairmanphoneNumber = " ";
				$scope.templeData.trustName = " ";
				$scope.templeData.trustyPhoneNumber = " ";
				$scope.templeData.templeAreaName = " ";
				$scope.templeData.villageName = " ";
				$scope.templeData.mandalName = " ";
				$scope.templeData.districtName = " ";
				$scope.templeData.state = " ";
				$scope.templeData.reporterName = " ";
				$scope.templeData.phoneNumber = " ";
				$scope.templeData.localCablenetworkDetails = " ";
				$scope.place = {};
				$scope.templeData.poojariNumber = " ";
				$scope.templeData.importantEventsName = " ";
				$scope.templeData.importantEventDate = " ";
				$scope.templeData.templeCeremony = "";
				$scope.templeData.additionalInfo = "";


			}

			$scope.place = {};
			$scope.search = function (searchPlace) {

				var userEntredAddress = searchPlace;
				console.log('userEntredAddress', userEntredAddress);

				Map.search(searchPlace)
					.then(
						function (res) { // success
							Map.addMarker(res);
							$scope.place.name = res.name;
							$scope.place.lat = res.geometry.location.lat();
							$scope.place.lng = res.geometry.location.lng();
							$scope.place.userEntredAddress = userEntredAddress;
							$scope.place.from = "Mobile";
							//console.log("onEnterSearchAddress", $scope.place);
						},
						function (status) { // error
							$scope.apiError = "Location Not Found.";
							$scope.apiStatus = status;
						}
					);
			};
			Map.init();

		}
	])
	.controller('pageCtrl', ['$scope',
		'$stateParams',
		'$http',
		'$ionicLoading',
		'$ionicHistory',
		function ($scope,
			$stateParams,
			$http,
			$ionicLoading, $ionicHistory) {

			$ionicHistory.nextViewOptions({
				disableBack: true
			});

			// empty Arrays
			$scope.validationPhoneNumberData = [];
			var fullRecordData = [];

			//get call phone Number
			validationPhoneNumber();

			function validationPhoneNumber() {
				//$scope.loadingAuto = true;

				$ionicLoading.show({
					content: 'Loading Data',
					animation: 'fade-in',
					showBackdrop: false,
					maxWidth: 200,
					showDelay: 500
				});

				var url = 'https://whiznextapi.mybluemix.net/devotional/v1/getAllDevotionalDetails/';
				$http.get(url).success(function (data) {
					var sarvamData = data;
					fullRecordData.push(sarvamData);
					//console.log("//",fullRecordData);

					//$scope.loadingAuto = false;
					$ionicLoading.hide();
					for (var i = 0; i < sarvamData.length; i++) {
						var phoneData = sarvamData[i].phoneNumber
							//console.log('phoneData',phoneData);
						$scope.validationPhoneNumberData.push(phoneData);
						//showing profile
						// console.log('phoneData',$scope.validationPhoneNumberData);
					}

				});
			}
			// phone Number validation 
			$scope.phoneNumberValidation = function (pagedata) {
				$scope.pagedata = pagedata;
				$scope.phoneNumber = pagedata.phoneNumber;

				$scope.validationPhoneNumberData.indexOf($scope.pagedata.phoneNumber) === -1 ? $scope.validationError =
					"" : $scope.validationError = " **Profile Already Exists";
				$scope.existingRecordData = false;

				for (var j = 0; j < fullRecordData[0].length; j++) {
					var fullRecords = fullRecordData[0][j].phoneNumber;
					var userEntredPhoneNumnber = $scope.pagedata.phoneNumber;
					//console.log('number//', userEntredPhoneNumnber);
					//console.log('db number',fullRecords);
					if (fullRecordData[0][j].phoneNumber === userEntredPhoneNumnber) {
						//console.log('if called');
						var nameDB = fullRecordData[0][j].name;
						var pageType = fullRecordData[0][j].type;
						//$scope.updatedByDB =fullRecordData[0][j].updatedBy;
						//$scope.createdDateDB =  $filter('date')(fullRecordData[0][j].createdDate, "yyyy-MM-dd");
						//console.log("profile" + $scope.nameDB );
						//console.log("upDatedBy" + $scope.updatedByDB);
						$scope.existingRecordData = true;
						//						alert("Profile alredy exits." + '\n' + " Profile-Name:" + nameDB + '\n' + "Page-Type" + pageType);

					}
				}

			};

			$scope.enableSaveButton = function () {
				//Enable or disable save button
				var phoneNumberLength = $scope.phoneNumber === undefined ? 0 : $scope.phoneNumber.length;
				return (phoneNumberLength === 0 || $scope.validationError.length != 0);

			};

			$scope.save = function (pagedata) {
				// save Data Function. 
				$scope.pagedata = pagedata;
				console.log('data', $scope.pagedata.name);

				var URL = 'https://whiznextapi.mybluemix.net/devotional/v1/storeDevotionalDeatils/';
				var data = {

					name: $scope.pagedata.name,
					contactPerson: $scope.pagedata.contactPerson,
					address: $scope.pagedata.address,
					phoneNumber: $scope.pagedata.phoneNumber,
					updatedBy: $scope.pagedata.updatedBy,
					type: $scope.pagedata.type,
					//mediaPresents:$scope.mediaPresents,
					level: $scope.pagedata.level,
					facebook: $scope.pagedata.facebook,
					youtube: $scope.pagedata.youtube,
					website: $scope.pagedata.website,
					mobileapp: $scope.pagedata.mobileapp

				}

				console.log('Data to Store in the DB', data);

				var config = {
					headers: {
						'Content-Type': 'application/json; charset=utf-8'
					},

				};
				$ionicLoading.show({
					content: 'Loading Data',
					animation: 'fade-in',
					showBackdrop: false,
					maxWidth: 200,
					showDelay: 500
				});
				console.log("API : " + URL);
				console.log("Data passed to the API call: " + data);

				$http.post(URL, data, config)
					.success(function (data, status, headers, config) {
						console.log(data + ": " + status);
						$ionicLoading.hide();

					})
					.error(function (data, status, header, config) {
						var ResponseDetails = "Data: " + data +
							"<hr />status: " + status +
							"<hr />headers: " + header +
							"<hr />config: " + config;
						console.log("Failed to save document under Remibursement DB. " + ResponseDetails);

					});

			};


		}
	])
	.controller('adminLgoinPageCtrl', ['$scope',
		'$stateParams',
		function ($scope,
			$stateParams) {



		}
	])


.controller('advertisePageCtrl', ['$scope',
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
		$scope.data = [];
		$scope.submitButton = true;
		$scope.data.phoneNumber = "";
		$scope.changeNumber = function () {
			console.log($scope.data.phoneNumber.length);
			var number = $scope.data.phoneNumber.toString();
			if (number.length === 10) {
				$scope.submitButton = false;
			} else {
				$scope.submitButton = true;
			}
		};
		$scope.save = function () {

				var data = {

					companyname: $scope.data.companyname,
					type: $scope.data.type,
					city: $scope.data.city,
					email: $scope.data.email,
					contactPerson: $scope.data.contactPerson,
					phoneNumber: $scope.data.phoneNumber

				};

				//console.log('Data to Store in the DB',data);

				var URL = 'https://whiznextapi.mybluemix.net/advertisement/v1/storeAdvertisement';
				var config = {
					headers: {
						'Content-Type': 'application/json; charset=utf-8'
					},

				};
				$ionicLoading.show({
					content: 'Loading Data',
					animation: 'fade-in',
					showBackdrop: false,
					maxWidth: 200,
					showDelay: 500
				});

				console.log("API : " + URL);
				console.log("Data passed to the API call: " + JSON.stringify(data));

				$http.post(URL, data, config)
					.success(function (data, status, headers, config) {
						$scope.successMessage = 'Data Is Saved. Concern Team will get back to you.';
						$ionicLoading.hide();
						reset();

					})
					.error(function (data, status, header, config) {
						var ResponseDetails = "Data: " + data +
							"<hr />status: " + status +
							"<hr />headers: " + header +
							"<hr />config: " + config;
						console.log("Failed to save document under advertisement DB. " + ResponseDetails);
						$scope.errorMessage = ' Oops! check your Internet Connection.'
						$ionicLoading.hide();
					});


			} // function closed
		function reset() {

			$scope.data.companyname = " ";
			$scope.data.type = " ";
			$scope.data.city = " ";
			$scope.data.email = " ";
			$scope.data.contactPerson = " ";
			$scope.data.phoneNumber = 0;
		}
	}
])

.controller('offersPageCtrl', ['$scope',
	'$stateParams',
	'$http',
	'$ionicLoading', '$ionicHistory',

	function ($scope,
		$stateParams,
		$http,
		$ionicLoading, $ionicHistory
	) {

		$ionicHistory.nextViewOptions({
			disableBack: true
		});

		$scope.shareAnyWhere = function ($index) {
			// alert('shareAnyWhere called');
			$scope.itemsList = [];
			//$scope.finalitemsList =[];
			var index = $index;
			var tariff = $scope.groups[index];
			var name = $scope.groups[index].name;
			var cost = $scope.groups[index].cost;


			for (var i = 0; i < $scope.groups[index].items.length; i++) {
				//console.log('fisrt loop');
				$scope.itemsList.push($scope.groups[index].items[i].offerDetals);
				//console.log('tarif',$scope.itemsList);
				for (var k = 0; k < $scope.itemsList.length; k++) {
					//$scope.finalitemsList.push($scope.itemsList[k].split("a)"));
					//console.log($scope.finalitemsList);
					var FINAL_TARGET = 'Tariff Name:' + name + ' \n ' + 'Cost: ' + cost + '\n' + 'Tariff Details: ' + $scope.itemsList;
				}

			}


			/*console.log('FullData',tariff)
			console.log('index',index);
			console.log('name',name);
			console.log('cost',cost);*/


			var webSite = 'http://www.jayajayashankara.tv/';
			var youtube = 'https://www.youtube.com/channel/UC2lXJEFZI_t1ewgiUOg-Amw';
			var facebook = 'https://www.facebook.com/jayajayashankaratv';

			var finalText = 'JayaJayaShankara TV.Tariff Packages - ' + FINAL_TARGET + '\n' + 'For more updates visit www.jayajayashankara.tv ' + '\n' +
				'Follow us on: ' + '\n' + "youtube: " + youtube + '\n' + "facebook: " + facebook;
			console.log('text', finalText);

			window.plugins.socialsharing.share(finalText, null, null,
				function (errormsg) {
					alert("Error: Cannot via Share")
				});

		}

		$scope.offers = [];


		$ionicLoading.show({
			content: 'Loading Data',
			animation: 'fade-in',
			showBackdrop: false,
			maxWidth: 200,
			showDelay: 500
		})

		function offerData() {
			var URL = 'https://whiznextapi.mybluemix.net/offers/v1/getOffers/';

			var config = {
				headers: {
					'Content-Type': 'application/json; charset=utf-8;image/jpeg'

				}
			};
			$http.get(URL, config)
				.success(function (data, status, headers, config) {

					$scope.offers.push(data);
					console.log("***********", $scope.offers);
					$scope.groups = [];
					// for html content
					//  for (var i=0; i<$scope.offers[0].length; i++) {
					//    $scope.groups[i] = {
					//      name: $scope.offers[0][i].offerName,
					//      items: [],
					//      show: false
					//    };
					//
					//      $scope.groups[i].items.push($scope.offers[0][i].offerDetails);
					//      $ionicLoading.hide();  
					//  }
					for (var i = 0; i < $scope.offers[0].length; i++) {
						$scope.groups[i] = {
							name: $scope.offers[0][i].offerName,
							cost: $scope.offers[0][i].offerCost,
							items: $scope.offers[0][i].offerDetails,
							show: false
						};
						//      $scope.groups[i].items.push($scope.offers[0][i].offerDetails);
						$ionicLoading.hide();
					}

					/*
					 * if given group is the selected group, deselect it
					 * else, select the given group
					 */
					$scope.toggleGroup = function (group) {
						group.show = !group.show;
					};
					$scope.isGroupShown = function (group) {
						return group.show;
					};

				})
				.error(function (data, status, header, config) {
					var ResponseDetails = "Data: " + data +
						"<hr />status: " + status +
						"<hr />headers: " + header +
						"<hr />config: " + config;
					console.log("Failed to save record. " + ResponseDetails);
					$scocpe.error = 'Oops! Check your Internet Connection.'
					$ionicLoading.hide();

				});

		} //fucntion closed
		offerData();
	}
])

.controller('eventsPageCtrl', ['$scope',
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
			$scope.shareAnyWhere = function ($index) {
				// alert('shareAnyWhere called');
				var index = $index;
				var image = $scope.groups[index].items[0];
				var res = image.split(" ");
				var imageURL = res[1].split("=");
				var finalShareImage = imageURL[1];
				var shareImageDescription = $scope.groups[index].name;
				var webSite = 'http://www.jayajayashankara.tv/';
				var youtube = 'https://www.youtube.com/channel/UC2lXJEFZI_t1ewgiUOg-Amw';
				var facebook = 'https://www.facebook.com/jayajayashankaratv';

				var finalText = 'JayaJayaShankara TV.Conducting a prestigious Event - ' + shareImageDescription + ': ' + finalShareImage + '\n' + 'For more updates visit www.jayajayashankara.tv ' + '\n' +
					'Follow us on: ' + '\n' + "youtube: " + youtube + '\n' + "facebook: " + facebook;
				console.log('text', finalText);

				window.plugins.socialsharing.share(finalText, null, null,
					function (errormsg) {
						alert("Error: Cannot via Share")
					});

			}
			$scope.events = [];


			$ionicLoading.show({
				content: 'Loading Data',
				animation: 'fade-in',
				showBackdrop: false,
				maxWidth: 200,
				showDelay: 500
			})

			function eventData() {
				var URL = 'https://whiznextapi.mybluemix.net/events/v1/getEvents/';

				var config = {
					headers: {
						'Content-Type': 'application/json; charset=utf-8;image/jpeg'

					}
				};
				$http.get(URL, config)
					.success(function (data, status, headers, config) {

						$scope.events.push(data);
						console.log("***********", $scope.events);
						$scope.groups = [];
						for (var i = 0; i < $scope.events[0].length; i++) {
							$scope.groups[i] = {
								name: $scope.events[0][i].eventName,
								items: [],
								show: false
							};
							$scope.groups[i].items.push($scope.events[0][i].eventDescription);
							$ionicLoading.hide();
						}

						/*
						 * if given group is the selected group, deselect it
						 * else, select the given group
						 */
						$scope.toggleGroup = function (group) {
							group.show = !group.show;
						};
						$scope.isGroupShown = function (group) {
							return group.show;
						};

					})
					.error(function (data, status, header, config) {
						var ResponseDetails = "Data: " + data +
							"<hr />status: " + status +
							"<hr />headers: " + header +
							"<hr />config: " + config;
						console.log("Failed to save record. " + ResponseDetails);
						$scocpe.error = 'Oops! Check your Internet Connection.'
						$ionicLoading.hide();

					});

			} //fucntion closed
			eventData();

		}
	])
	.controller('PromosPageCtrl', ['$scope',
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
			$scope.videos = [];


			var playlistId = "PLvb06kiu0PuHKYG5Ug4CI26SGFSU9mzSH";
			//'https://www.googleapis.com/youtube/v3/search';

			$scope.youtubeParams = {
				playlistId: 'https://www.youtube.com/playlist?list=PLvb06kiu0PuHKYG5Ug4CI26SGFSU9mzSH',
				//playlistId: playlistId,
				key: 'AIzaSyByQseV--m8k2TAAMpETBpMuSr2cBBfVEE',
				type: 'video',
				maxResults: '25',
				part: 'id,snippet',
				order: 'rating',
				channelId: 'UCLFlwOaDRXvYIBNAQMKJ2Rw',
			}

			$ionicLoading.show({
				content: 'Loading Data',
				animation: 'fade-in',
				showBackdrop: false,
				maxWidth: 200,
				showDelay: 500
			});

			$http.get('https://www.googleapis.com/youtube/v3/search', {
				params: $scope.youtubeParams
			}).success(function (response) {
				console.log(response);
				angular.forEach(response.items, function (child) {
					$scope.videos.push(child);
					$ionicLoading.hide();
				});
				//console.log($scope.videos);
			});

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
			var url = "https://whiznextapi.mybluemix.net/about/v1/getAbout"

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
	]).controller('distributionNumbersPageCtrl', ['$scope',
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
			$scope.distributionNumbers = [];
//			$scope.andhraPradesh = false;
//			$scope.telangana = false;

			function distributionData() {
				var URL = 'https://whiznextapi.mybluemix.net/distribution/v1/getDistributionChanel';

				var config = {
					headers: {
						'Content-Type': 'application/json; charset=utf-8;image/jpeg'

					}
				};
				$http.get(URL, config)
					.success(function (data, status, headers, config) {

							$scope.distributionNumbers = data;


							$ionicLoading.hide();
							console.log("$scope.distributionNumbers", $scope.distributionNumbers)
						}



					)
					.error(function (data, status, header, config) {
						var ResponseDetails = "Data: " + data +
							"<hr />status: " + status +
							"<hr />headers: " + header +
							"<hr />config: " + config;
						console.log("Failed to save record. " + ResponseDetails);
						$scocpe.error = 'Oops! Check your Internet Connection.'
						$ionicLoading.hide();

					});

			} //fucntion closed
			distributionData();

		}
	]).controller('SociallinksPageCtrl', ['$scope',
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

		}
	]).controller('feedbackPageCtrl', ['$scope',
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
			$scope.feedback = [];
			$scope.successMessage = "";
			$scope.feedbackError = "";
			$scope.reset = function () {
				$scope.feedback.name = "";
				$scope.feedback.mobileNumber = "";
				$scope.feedback.message = "";
			}
			$scope.submit = function () {
				if ($scope.feedback.message.length === 0) {

					$scope.feedbackError = "Please enter message";
				} else {
					$scope.feedbackError = "";
					$ionicLoading.show({
						content: 'Loading Data',
						animation: 'fade-in',
						showBackdrop: false,
						maxWidth: 200,
						showDelay: 500
					});

					var data = {
						_id: $scope.feedback.name,
						name: $scope.feedback.name,
						number: $scope.feedback.mobileNumber,
						message: $scope.feedback.message
					}
					var URL = "https://whiznextapi.mybluemix.net/feedback/v1/storeFeedback";
					var config = {
						headers: {
							'Content-Type': 'application/json; charset=utf-8'
						},

					};
					//console.log( "API : " + URL);
					console.log("Data passed to the API call: " + data);

					$http.post(URL, data, config)
						.success(function (data, status, headers, config) {
							console.log(data + ": " + status);
							$ionicLoading.hide();
							$scope.reset();
							$scope.successMessage = "Thanks for your feedback."

						})
						.error(function (data, status, header, config) {

							var ResponseDetails = "Data: " + data +
								"<hr />status: " + status +
								"<hr />headers: " + header +
								"<hr />config: " + config;
							console.log("Failed to save document under Remibursement DB. " + ResponseDetails);

							$scope.errorMassage = "OOPS! Check Your Interent Connection."


						});
				}

			};


		}
	]).controller('loginCtrl', ['$scope',
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
			$scope.one = true;
			$scope.two = false;
			$scope.three = false;
			$scope.four = false;
			$scope.five = false;
			$scope.six = false;
			$scope.seven = false;
			$scope.eight = false;
			$scope.value = true;
			$scope.value1 = true;
			$scope.ContinueButton = true;
			$scope.isDisabled = true;
			$scope.otptime = true;
			$scope.resendOTPButton = true;
			$scope.changePinButton = true;
			$scope.randomValue = Math.floor(1000 + Math.random() * 9000);
			$scope.login = [];
			$scope.otp = [];
			$scope.updatedOTP = [];
			$scope.login.otpnumber = "";
			$scope.login.passCode = "";
			$scope.login.rePassCode = "";
			$scope.phoneNumberError = "";

			$scope.pnone = function () {
				$scope.one = !$scope.one;
				$scope.two = !$scope.two;


			};
			//register device validation
			function deviceValidation() {
				setTimeout(function () {
					var URL = ' https://whiznext-services.mybluemix.net/otp/v1/fetchBasedOnDeviceId?';
					var deviceId = $cordovaDevice.getUUID();
					
					// alert(deviceId);
					var finalURL = URL + "deviceId=" + deviceId;
					$ionicLoading.show({
						content: 'Loading Data',
						animation: 'fade-in',
						showBackdrop: false,
						maxWidth: 200,
						showDelay: 500
					});

					var config = {
						headers: {
							'Content-Type': 'application/json; charset=utf-8'
						},

					}

					$http.get(finalURL, config)
						.success(function (data, status, headers, config) {

							// alert(JSON.stringify(data));
							if (data.total_rows === 0) {
								$ionicLoading.hide();
								// alert("no data");
							}
							$scope.otp.push(data.rows[0].doc);
							$global.setuserData($scope.otp);
							$ionicLoading.hide();
							console.log("get call data ", $scope.otp);

							// alert(JSON.stringify($scope.otp));
							// alert("get allrecords called");
							for (var i = 0; i < $scope.otp.length; i++) {
								console.log("*//*/*/*/*/*/*/", $scope.otp[i].uuid);
								if ($scope.otp[i].uuid === $cordovaDevice.getUUID() && $scope.otp[i].state === "notApproved") {

									$scope.one = false;
									$scope.two = false;
									$scope.three = false;
									$scope.four = false;
									$scope.five = true;
									$scope.six = false;
									// alert("device matched notApproved");


								} else if ($scope.otp[i].uuid === $cordovaDevice.getUUID() && $scope.otp[i].state === "approved") {

									$scope.one = false;
									$scope.two = false;
									$scope.three = false;
									$scope.four = false;
									$scope.five = false;
									$scope.six = true;
									$global.setdepartment($scope.otp[i].department);
									$global.setprofile($scope.otp[i].profile);
									$global.setNumber($scope.otp[i].number)
									// alert($scope.otp[i]);
									// alert("device matched approved");


								} else {
									$scope.one = true;
									$scope.two = false;
									$scope.three = false;
									$scope.four = false;
									$scope.five = false;
									// alert("device not matched");

								}
							}


						})
						.error(function (data, status, header, config) {

							var ResponseDetails = "Data: " + data +
								"<hr />status: " + status +
								"<hr />headers: " + header +
								"<hr />config: " + config;
							console.log("Failed to save document under Remibursement DB. " + ResponseDetails);
							//$location.path('/error');
							// error massage.
							$scope.errorMassage = "OOPS! Check Your Interent Connection."


						});

				}, 2000);



			}
			deviceValidation();

			//phone number length validation 
			$scope.phoneNumberLength = function () {
				var number = $scope.login.number.toString()
				if (number.length === 10) {
					$scope.ContinueButton = false;
				} else {
					$scope.ContinueButton = true;
				}

			};

			$scope.continueotp = function () {
				$scope.three = true;
				$scope.two = false;
				$scope.otp = [];
				var number = $scope.login.number;
				var name = $scope.login.name;
				var platform = $cordovaDevice.getPlatform();
				var uuid = $cordovaDevice.getUUID();
				var otp = $scope.randomValue;

				//twilio OTP call start

				var otpURL = "https://whiznext-services.mybluemix.net/otp/v1/sendMobileotp?";
				var staffNumber = parseInt(number);
				var otp = otp;
				var message = "JJS-Staff";
				var finalURl = otpURL + "number=" + staffNumber + "&otp=" + otp + "&message=" + message;

				var config = {
					headers: {
						'Content-Type': 'application/json; charset=utf-8'
					},

				};
				//console.log( "API : " + URL);
				console.log("Data passed to the API call: " + finalURl);

				$http.post(finalURl, config)
					.success(function (status, headers, config) {
						console.log(finalURl + ": " + status);
						$ionicLoading.hide();
					})
					.error(function (status, header, config) {

						var ResponseDetails = "Data: " +
							"<hr />status: " + status +
							"<hr />headers: " + header +
							"<hr />config: " + config;
						console.log("Failed to save document under Remibursement DB. " + ResponseDetails);
						//$location.path('/error');
						// error massage.
						$scope.errorMassage = "OOPS! Check Your Interent Connection."


					});

				//twilio OTP call end

			};
			$scope.continueotpBack = function () {
				$scope.three = false;
				$scope.two = true;
			};
			//OTP validation/////////////////////////////
			$scope.otpValidate = function () {
				var userEnteredOTP = parseInt($scope.login.otpnumber);
				// alert($scope.randomValue);
				if (userEnteredOTP === $scope.randomValue) {
					$scope.three = false;
					$scope.four = true;
					// alert("matched");
				} else {
					// alert("not matched");
					$scope.otpError = "OTP is Wrong";
				}


			}


			//re-send OTP call
			var count = 0;
			$scope.reSendOTP = function () {
				count++;
				// alert(count);
				$scope.isDisabled = true;
				var userEnteredOTP = parseInt($scope.login.otpnumber);
				var number = $scope.login.number;
				if (count > 1) {
					$scope.otptime = false;
					$scope.resendOTPButton = false;
				}
				//twilio OTP call start


				var otpURL = "https://whiznext-services.mybluemix.net/otp/v1/sendMobileotp?";
				var staffNumber = parseInt(number);
				var otp = $scope.randomValue;
				var message = "JJS-Staff";
				var finalURl = otpURL + "number=" + staffNumber + "&otp=" + otp + "&message=" + message;

				var config = {
					headers: {
						'Content-Type': 'application/json; charset=utf-8'
					},

				};
				//console.log( "API : " + URL);
				console.log("Data passed to the API call: " + finalURl);

				$http.post(finalURl, config)
					.success(function (status, headers, config) {
						console.log(finalURl + ": " + status);
						$ionicLoading.hide();
					})
					.error(function (status, header, config) {

						var ResponseDetails = "Data: " +
							"<hr />status: " + status +
							"<hr />headers: " + header +
							"<hr />config: " + config;
						console.log("Failed to save document under Remibursement DB. " + ResponseDetails);
						//$location.path('/error');
						// error massage.
						$scope.errorMassage = "OOPS! Check Your Interent Connection."


					});

				//twilio OTP call end

			};

			$scope.timmer = function () {
				$scope.counter = 60;
				$scope.onTimeout = function () {
					if ($scope.counter == 0) {
						$scope.counter = 0;
						$scope.isDisabled = false;
					} else {
						$scope.counter--;
						mytimeout = $timeout($scope.onTimeout, 1000);

					}
				};
				var mytimeout = $timeout($scope.onTimeout, 1000);
			}
			$scope.timmer1 = function () {
				$scope.counter = 60;
			}
			$scope.passCode = function () {
				$scope.three = !$scope.three;
				$scope.four = !$scope.four;
			};
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$scope.confirmPassCode = function () {
				if ($scope.login.passCode === $scope.login.rePassCode) {
					$scope.value1 = false;

				} else {
					$scope.value1 = true;
				}
			};

			//saving passCode
			$scope.passCodeSave = function () {
				$ionicLoading.show({
						content: 'Loading Data',
						animation: 'fade-in',
						showBackdrop: false,
						maxWidth: 200,
						showDelay: 500
					});
				var id = $scope.login.number.toString();

//				 alert(id);
				var data = {
					_id: id,
					number: $scope.login.number,
					name: $scope.login.name,
					platform: $cordovaDevice.getPlatform(),
					uuid: $cordovaDevice.getUUID(),
					otp: $scope.randomValue,
					passCode: $scope.login.rePassCode,
					state: "notApproved"
				}
//				alert(JSON.stringify(data));
				var URL = "https://whiznext-services.mybluemix.net/otp/v1/storeotp";
				var config = {
					headers: {
						'Content-Type': 'application/json; charset=utf-8'
					},

				};
				//console.log( "API : " + URL);
				console.log("Data passed to the API call: " + data);

				$http.post(URL, data, config)
					.success(function (data, status, headers, config) {
						console.log(data + ": " + status);
						$ionicLoading.hide();
						$scope.five = true;
						$scope.four = false;
						// alert($scope.otp);

					})
					.error(function (data, status, header, config) {

						var ResponseDetails = "Data: " + data +
							"<hr />status: " + status +
							"<hr />headers: " + header +
							"<hr />config: " + config;
						console.log("Failed to save document under Remibursement DB. " + ResponseDetails);

						$scope.errorMassage = "OOPS! Check Your Interent Connection."


					});


			};


			$scope.loginSuccess = function () {
				$ionicLoading.show({
					content: 'Loading Data',
					animation: 'fade-in',
					showBackdrop: false,
					maxWidth: 200,
					showDelay: 500
				});


				// alert("enter into login page");
				for (var i = 0; i < $scope.otp.length; i++) {
					if ($scope.otp[i].uuid === $cordovaDevice.getUUID() && $scope.login.passPin === $scope.otp[i].passCode && $scope.otp[i].state === "approved") {
						$ionicLoading.hide();
						// alert("login matched");
						$state.go('side-menu21.jayaJayaShankara');
					} else {
						// alert("login not matched");
						$scope.passCodeError = "Enter correct pin";
						$ionicLoading.hide();
					}
				}

			};
			$scope.forgotPin = function () {
					$scope.six = false;
					$scope.seven = true;
				}
				///phone number validation at change pin option
			$scope.phoneNumberValidation = function () {
				var enteredPhoneNumber = parseInt($scope.login.phoneNumber);
					$ionicLoading.show({
						content: 'Loading Data',
						animation: 'fade-in',
						showBackdrop: false,
						maxWidth: 200,
						showDelay: 500
					});
					for (var i = 0; i < $scope.otp.length; i++) {
						if ($scope.otp[i].uuid === $cordovaDevice.getUUID() && enteredPhoneNumber === $scope.otp[i].number && $scope.otp[i].state === "approved") {
							$ionicLoading.hide();
							// alert("login matched");
							$scope.seven = false;
							$scope.eight = true;
						} else {
							// alert("login not matched");
							$ionicLoading.hide();
							$scope.phoneNumberError = "Enter correct number";
						}
					}

				}
				///end
				// change pin validation
			$scope.changePinValidation = function () {
					if ($scope.login.newPassPin !== $scope.login.reEnternewPassPin) {
						$scope.changePinError = "pin not matched";
					} else {
						$scope.changePinError = "";
						$scope.changePinButton = false;
					}

				} //end
				//change pin submit call
			$scope.changePin = function () {
				// alert($scope.otp[0]._rev);
				// alert("passCode changed data");

				var data = {
					_id: $scope.otp[0]._id,
					_rev: $scope.otp[0]._rev,
					name: $scope.otp[0].name,
					number: $scope.otp[0].number,
					platform: $scope.otp[0].platform,
					uuid: $scope.otp[0].uuid,
					otp: $scope.otp[0].otp,
					department: $scope.otp[0].department,
					passCode: $scope.login.reEnternewPassPin,
					state: $scope.otp[0].state,
					profile: $scope.otp[0].profile,
					createdDate: $scope.otp[0].createdDate
				};
				$scope.otp = [];
				$scope.otp.push(data);
				// alert($scope.otp);
				$ionicLoading.show({
					content: 'Loading Data',
					animation: 'fade-in',
					showBackdrop: false,
					maxWidth: 200,
					showDelay: 500
				});
				var URL = 'https://whiznext-services.mybluemix.net/otp/v1/updateotp';
				var config = {
					headers: {
						'Content-Type': 'application/json; charset=utf-8'
					},

				};
				//console.log( "API : " + URL);
				console.log("Data passed to the API call: " + data);

				$http.post(URL, data, config)
					.success(function (data, status, headers, config) {
						console.log(data + ": " + status);
						$ionicLoading.hide();
						$scope.six = true;
						$scope.eight = false;

					})
					.error(function (data, status, header, config) {

						var ResponseDetails = "Data: " + data +
							"<hr />status: " + status +
							"<hr />headers: " + header +
							"<hr />config: " + config;
						console.log("Failed to save document under Remibursement DB. " + ResponseDetails);

						$scope.errorMassage = "OOPS! Check Your Interent Connection."


					});

			}; //end
			$scope.enableButtton = function () {
				if ($scope.login.otpnumber.length === 4) {
					$scope.otpError = "";
					$scope.value = false;
				}
				console.log("$scope.login.otpnumber.length ", $scope.login.otpnumber.length);
			};



		}
	]).controller('leavesCtrl', ['$scope',
		'$stateParams',
		'$http',
		'$ionicLoading',
		'$filter',
		'$global',

		function ($scope,
			$stateParams,
			$http,
			$ionicLoading,
			$filter,
			$global
		) {
			var employeeNumber=$global.getNumber();
			alert(employeeNumber);
			$scope.leave = [];
			var userData = $global.getuserData();
			$scope.leave.department = userData[0].department;
			$scope.leave.name = userData[0].name;
			$scope.leave.date = new Date();
			

			function leaveReset() {
				$scope.leave.designation = "";
				$scope.leave.employeeId = "";
				$scope.leave.type = "";
				$scope.leave.from = 0;
				$scope.leave.to = 0;
				$scope.leave.reason = "";
				$scope.leave.email = "";
			};
			$scope.submit = function () {
				$ionicLoading.show({
					content: 'Loading Data',
					animation: 'fade-in',
					showBackdrop: false,
					maxWidth: 200,
					showDelay: 500
				});

				// POST method for save data in to DB
				//data for email
				var data = {
					date: $filter('date')($scope.leave.date, "dd-MM-yyyy"),
					name: $scope.leave.name,
					designation: $scope.leave.designation,
					department: $scope.leave.department,
					id: $scope.leave.employeeId,
					leaveType: $scope.leave.type,
					from: $filter('date')($scope.leave.from, "dd-MM-yyyy"),
					to: $filter('date')($scope.leave.to, "dd-MM-yyyy"),
					reason: $scope.leave.reason,
					fromMail: $scope.leave.email
				}
				//data for DB store
				var data1 = {
					date: $filter('date')($scope.leave.date, "dd-MM-yyyy"),
					name: $scope.leave.name,
					designation: $scope.leave.designation,
					department: $scope.leave.department,
					id: $scope.leave.employeeId,
					leaveType: $scope.leave.type,
					from: $filter('date')($scope.leave.from, "dd-MM-yyyy"),
					to: $filter('date')($scope.leave.to, "dd-MM-yyyy"),
					reason: $scope.leave.reason,
					fromMail: $scope.leave.email,
					state :"notApproved"
				}

				var URL1 = 'https://whiznextapi.mybluemix.net/leave/v1/storeLeaveRecord';
				var config = {
					headers: {
						'Content-Type': 'application/json; charset=utf-8'
					},

				};

				$http.post(URL1,data1, config)
					.success(function (status,data, headers, config) {
					console.log("data posted:",data1);
					$ionicLoading.hide();

					})
					.error(function (status, header, config) {

						// error massage.
						$scope.errorMassage = "OOPS! Check Your Interent Connection."

					});
				

				//This is the function  convert the data object to URL 

				function serialize(data) {
					/*console.log("serialize Called");
					 console.log(TARGET_URL);*/

					var str = []

					for (var p in data) {
						if (data.hasOwnProperty(p)) {
							str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]))
						}
					}

					return str.join('&');
				}
				var URL = 'https://whiznextapi.mybluemix.net/leave/v1/sendEmail';
				var q = serialize(data)
				var TARGET_URL = URL + "?" + q;

				//final step:

				//call the HTTP : and append the SEND THE URL  POST method 

				var config = {
					headers: {
						'Content-Type': 'application/json; charset=utf-8'
					},

				};
				console.log("API : " + TARGET_URL);
				console.log("Data passed to the API call: " + JSON.stringify(data));

				$http.post(TARGET_URL, config)
					.success(function (status, headers, config) {
					$ionicLoading.hide();
					leaveReset();
						$scope.sucessMassage = " Your request is submitted ";

					})
					.error(function (status, header, config) {

						// error massage.
						$scope.errorMassage = "OOPS! Check Your Interent Connection."

					});

			};

		}
	]).controller('holidayCtrl', ['$scope',
		'$stateParams',
		'$http',
		'$ionicLoading',

		function ($scope,
			$stateParams,
			$http,
			$ionicLoading
		) {

		}
	]).controller('expenseReimbursementCtrl', ['$scope',
		'$stateParams',
		'$http',
		'$ionicLoading',

		function ($scope,
			$stateParams,
			$http,
			$ionicLoading
		) {

		}
	]).controller('notificationCtrl', ['$scope',
		'$stateParams',
		'$http',
		'$ionicLoading',
		'$global',
		'$ionicHistory',

		function ($scope,
			$stateParams,
			$http,
			$ionicLoading,
			$global,
			$ionicHistory
		) {
			$ionicHistory.nextViewOptions({
				disableBack: true

			});

			$scope.notifications = [];
			var department = $global.getdepartment();


			function getAllBased() {

				$ionicLoading.show({
					content: 'Loading Data',
					animation: 'fade-in',
					showBackdrop: false,
					maxWidth: 200,
					showDelay: 500
				});
				//http call for all notifications
				var URL = 'https://whiznextapi.mybluemix.net/notifications/v1/fetchWithDepartment?';
				var finalURL = URL + "department=all";



				var config = {
					headers: {
						'Content-Type': 'application/json; charset=utf-8'
					},

				};
				$http.get(finalURL, config)
					.success(function (data, status, headers, config) {
						$scope.notifications = data.body;

						console.log("get call data ", $scope.notifications);

						getDepartBased();

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
			getAllBased();

			function getDepartBased() {
				//			alert(JSON.stringify(department));
				var URL = 'https://whiznextapi.mybluemix.net/notifications/v1/fetchWithDepartment?';
				var finalURL = URL + "department=" + department;

				var config = {
					headers: {
						'Content-Type': 'application/json; charset=utf-8'
					},

				};
				$http.get(finalURL, config)
					.success(function (data, status, headers, config) {
						$scope.notifications1 = data.body;
						$scope.notifications = $scope.notifications.concat($scope.notifications1);
						$global.setnotifications($scope.notifications);
						$ionicLoading.hide();
					})
					.error(function (data, status, header, config) {
						$ionicLoading.hide();

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
	]).controller('settingsCtrl', ['$scope',
		'$stateParams',
		'$http',
		'$ionicLoading',
		'$global',
		'$cordovaCamera',
		'$ionicPopup',
		'$ionicPlatform',
		'$timeout',
		function ($scope,
			$stateParams,
			$http,
			$ionicLoading,
			$global,
			$cordovaCamera,
			$ionicPopup,
			$ionicPlatform,
			$timeout


		) {
			$scope.Profile = {};
			$scope.fname = true;
			$scope.lname = true;
			$scope.email = true;
			$scope.number = true;
			$scope.settingButton = true;
			$scope.profileSaveSuccess = "";
			$scope.profileEdit = function () {
				$scope.fname = false;
				$scope.lname = false;
				$scope.email = false;
				$scope.number = false;
				$scope.settingButton = false;

			}
			$scope.getproifedata = $global.getprofile();
			if ($scope.getproifedata === undefined) {
				$scope.Profile.fname = "";
				$scope.Profile.lname = "";
				$scope.Profile.email = "";
				$scope.Profile.mobileNumber = "";
				$scope.Profile.image = "img/user.png";
			} else {
				// alert(JSON.stringify($scope.getproifedata));

				$scope.Profile.fname = $scope.getproifedata.fname;
				$scope.Profile.lname = $scope.getproifedata.lname;
				$scope.Profile.email = $scope.getproifedata.email;
				$scope.Profile.mobileNumber = $scope.getproifedata.mobileNumber;
				$scope.Profile.image = $scope.getproifedata.image;

			}

			$scope.userPic = function () {
				// alert('image function called');
				$ionicPopup.show({
					template: '<p>Take picture or use from library</p>',
					title: 'Choose',
					buttons: [{
						text: '<b>Camera</b>',
						onTap: function (e) {
							return "camera";
						}
					}, {
						text: '<b>Library</b>',
						type: 'button-positive',
						onTap: function (e) {
							return "library";
						}
					}, ]
				}).then(function (resp) {
					$scope.takePicture(resp);
					// alert('resp', resp);
				});
			}

			$scope.takePicture = function (resp) {
					// alert("takePicture function got called");
					// alert(resp);
					var source;
					if (resp == "camera") {
						source = Camera.PictureSourceType.CAMERA;
					} else {
						source = Camera.PictureSourceType.PHOTOLIBRARY;
					};
					var options = {
						quality: 75,
						destinationType: Camera.DestinationType.FILE_URI,
						sourceType: source,
						allowEdit: true,
						encodingType: Camera.EncodingType.JPEG,
						targetWidth: 200,
						targetHeight: 200,
						popoverOptions: CameraPopoverOptions,
						saveToPhotoAlbum: true
					};
					// alert(options);
					$cordovaCamera.getPicture(options).then(function (imageData) {

						$scope.Profile.image = imageData;
						// alert(imageData);
					}, function (err) {
						alert(err);
						// error
					});
				}
				/// post cal for save profile
			var userData = $global.getuserData();
			// alert(JSON.stringify(userData[0]._id));

			$scope.profileSave = function () {
				// alert("update data with profile");

				var data = {
					_id: userData[0]._id,
					_rev: userData[0]._rev,
					name: userData[0].name,
					number: userData[0].number,
					platform: userData[0].platform,
					uuid: userData[0].uuid,
					otp: userData[0].otp,
					department: userData[0].department,
					passCode: userData[0].passCode,
					state: userData[0].state,
					profile: $scope.Profile,
					createdDate: userData[0].createdDate
				};
				// alert(JSON.stringify(data));
				$ionicLoading.show({
					content: 'Loading Data',
					animation: 'fade-in',
					showBackdrop: false,
					maxWidth: 200,
					showDelay: 500
				});
				var URL = 'https://whiznext-services.mybluemix.net/otp/v1/updateotp';
				var config = {
					headers: {
						'Content-Type': 'application/json; charset=utf-8'
					},

				};
				//console.log( "API : " + URL);
				console.log("Data passed to the API call: " + data);

				$http.post(URL, data, config)
					.success(function (data, status, headers, config) {
						console.log(data + ": " + status);
						$ionicLoading.hide();
						$scope.fname = true;
						$scope.lname = true;
						$scope.email = true;
						$scope.number = true;
						$scope.settingButton = true;
						$scope.profileSaveSuccess = "Profile Saved Successfully";
						setTimeout(function () {
							$scope.profileSaveSuccess = ""
						}, 500);

					})
					.error(function (data, status, header, config) {

						var ResponseDetails = "Data: " + data +
							"<hr />status: " + status +
							"<hr />headers: " + header +
							"<hr />config: " + config;
						console.log("Failed to save document under Remibursement DB. " + ResponseDetails);

						$scope.errorMassage = "OOPS! Check Your Interent Connection."


					});
			}





		}
	]).controller('dailyprogramsCtrl', ['$scope',
		'$stateParams',
		'$http',
		'$ionicLoading',
		'$global',
		'$filter',

		function ($scope,
			$stateParams,
			$http,
			$ionicLoading,
			$global,
			$filter
		) {
			$scope.schedule = [];
			$ionicLoading.show({
				content: 'Loading Data',
				animation: 'fade-in',
				showBackdrop: false,
				maxWidth: 200,
				showDelay: 500
			});
			var url = "https://whiznext-api.mybluemix.net/jjsmobile/v1/fetchSchedule/"
			var today = new Date();
			var record_id = $filter('date')(today, "dd-MM-yyyy");
			$scope.currentDate = record_id;
			var api_url = url + record_id;

			$scope.loadingMasg = true;
			$http.get(api_url).success(function (data) {
				$scope.schedule = data.schedule;
				$ionicLoading.hide();
				console.log('get function called', data);

			}).error(function (data, status, header, config) {
				$ionicLoading.hide();
				var ResponseDetails = "Data: " + data +
					"<hr />status: " + status +
					"<hr />headers: " + header +
					"<hr />config: " + config;
				console.log("Failed to save record. " + ResponseDetails);
				$scope.error = 'sorry for the inconveenience.'


			});
		}
	]);
mainapp.filter('secondsToDateTime', [function () {
	return function (seconds) {
		return new Date(1970, 0, 1).setSeconds(seconds);
	};
}]);
