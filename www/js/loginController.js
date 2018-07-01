
angular.module('app.LoginController', []).controller('loginCtrl', ['$scope',
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
			// deviceValidation();

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
						$state.go('side-menu21.Home');
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
	]);
