angular.module('app.dineOutcontrollers', [])
.controller('dineOutPageCtrl', ['$scope','$stateParams','$ionicModal','$state',
function ($scope,$stateParams,$ionicModal,$state) {
	$scope.goToDineItemPage = function(){
		$state.go("side-menu21.dineOutItemPage");
	}
	  $scope.searchPage = "";
	     
		$scope.onChange = function(val){
			console.log("Selected Filter value",val);
			
		}
		 
		

	$scope.dineOutData = [
		{
			img:'img/creolespicedcornthumb_640x480.jpg',
			title:'Creole spiced cornt veg2',
			content:'North Indian, Chinese, South Indian, Juices',
			cost:'100',
			offer:'5',
			type:'veg'

		},
		{
			img:'img/y4nkk1dilwvytyzu2tte.jpg',
			title:'Amul Tiffins Corner veg',
			content:'Tilak Road, Abids & Koti',
			cost:'150',
			offer:'8',
			type:'veg'

		},
		{
			img:'img/creolespicedcornthumb_640x480.jpg',
			title:'Creole spiced cornt veg',
			content:'North Indian, Chinese, South Indian, Juices',
			cost:'300',
			offer:'15',
			type:'veg'

		},
		{
			img:'img/y4nkk1dilwvytyzu2tte.jpg',
			title:'Amul Tiffins Corner',
			content:'Tilak Road, Abids & Koti',
			cost:'150',
			offer:'8',
			type:'Non'

		},
		{
			img:'img/creolespicedcornthumb_640x480.jpg',
			title:'Creole spiced cornt',
			content:'North Indian, Chinese, South Indian, Juices',
			cost:'300',
			offer:'15',
			type:'Non'

		}
	];
		$ionicModal.fromTemplateUrl('filterModel.html', {
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


}
])