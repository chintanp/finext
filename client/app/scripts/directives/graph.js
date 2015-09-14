angular.module('prep').directive('ghVisualization', function () {

  // constants
  var margin = 20,
    width = 960,
    height = 500 - .5 - margin,
    color = d3.interpolateRgb("#f77", "#77f");

  return {
    restrict: 'E',
    transclude: true,
    template: '<div id="chart"></div>',

    controller: function ($scope, $element) {

      $scope.changeText = function(data_from_server) {

        // Create and populate a data table.
        var data = new vis.DataSet();
        // create some nice looking data with sin/cos
        var counter = 0;
        var steps_x = $scope.model.divx; //50;  // number of datapoints will be steps*steps
        var steps_y = $scope.model.divy;

        var axis_x_Max = $scope.model.length; //314;
        var axis_y_Max = $scope.model.breadth;

        var axis_x_Step = axis_x_Max / steps_x; // axisMax / steps;
        var axis_y_Step = axis_y_Max / steps_y;

        if(data_from_server.inputs.element_type == 1) {
          for (var i = 0;  i <= steps_x; i++) {
            for (var j = 0; j <= steps_y; j++) {
              var value = data_from_server.w[i*(steps_y+1)+j]; //(Math.sin(x / 50) * Math.cos(y / 50) * 50 + 50);
              data.add({id: counter++, x: i*axis_x_Step, y: j*axis_y_Step, z: value, style: value});
            }
          }

          /*for (var x = 0, i = 0; x <= axis_x_Max, i <= steps_x; x += axis_x_Step, i++) {
            for (var y = 0, j = 0; y <= axis_y_Max, j <= steps_y; y += axis_y_Step, j++) {
              var value = data_from_server.w[i][j]//(Math.sin(x / 50) * Math.cos(y / 50) * 50 + 50);
              data.add({id: counter++, x: x, y: y, z: value, style: value});
            }
          }*/
        }


        // specify options
        var options = {
          width: '500px',
          height: '552px',
          style: 'surface',
          showPerspective: true,
          showGrid: true,
          showShadow: false,
          keepAspectRatio: true,
          verticalRatio: 0.5
        };

        // Instantiate our graph object.
        var container = document.getElementById('chart');
        var graph3d = new vis.Graph3d(container, data, options);
      };

      $scope.$on('changeText',function(event, data){
        $scope.changeText(data)
      });



    }
  }
});
