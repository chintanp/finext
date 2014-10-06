/**
 * Created by chin on 02/10/2014.
 */

'use strict';

app.controller('InputCtrl', function($scope, ModelSync, socket) {

		//var myFireBaseRef = new Firebase("http://finext.firebaseio.com/modelInfo");

		$scope.modelInfo = ModelSync.all; /*{ length : " ",
													breadth : " ",
													thickness : " ",
													divx : " ",
													divy : " "
													};
*/

		$scope.model = { length : ' ',
			breadth : '',
			thickness : '',
			divx : '',
			divy : ''
		};

		$scope.endTypeOptions = [
			{
				text: 'Simply Supported',
				value: 0
			},
			{
				text: 'Fixed',
				value: 1
			},
			{
				text: 'Beam Supported',
				value: 2
			}
		];

		$scope.model.endTypeSelected = {};

		$scope.loadTypeOptions = [
			{
				text: 'UDL',
				value: 0
			},
			{
				text: 'Concentrated at Center',
				value: 1
			}
		];

		$scope.model.loadData = {};
		$scope.model.loadData.loadTypeSelected = {};
		$scope.model.loadData.loadValue = {};

		$scope.elementTypeOptions = [
			{
				text: '4-Noded',
				value: 0
			},
			{
				text: '8-Noded',
				value: 1
			}
		];

		$scope.model.elementTypeSelected = {};

		$scope.contextTypeOptions = [
			{
				text: 'Use Context',
				value: 0
			},
			{
				text: 'Use Default',
				value: 1
			},
			{
				divider: true
			},
			{
				text: 'Context Settings',
				value: 2
			}
		];

		$scope.contextTypeSelected = {};


		$scope.solve = function() {
				ModelSync.create($scope.model).then(function() {

					//console.log("$push returned : " + ref.name());
					// May reset the UI to initial state.
					alert("Data saved, new model created");
				});
		};

		/*socket.on('newz', function(data) {
			console.log("The server sent: " + data);
			//alert("The server sent: " + data);
			socket.emit('event', {my: 'data'});
		});*/

});
