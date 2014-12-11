/**
 * Created by chin on 28/10/2014.
 */

app.controller('GraphCtrl', function($scope, $rootScope, $location, $filter, ModelSync, Auth, socket, $window) {

	var data = null;
	var graph = null;

	google.load("visualization", "1");

	// Set callback to run when API is loaded
	google.setOnLoadCallback(drawVisualization);

	function custom(x, y) {
		return Math.sin(x/50) * Math.cos(y/50) * 50 + 50;
	}

	// Called when the Visualization API is loaded.
	function drawVisualization() {
		// Create and populate a data table.
		data = new google.visualization.DataTable();
		data.addColumn('number', 'x');
		data.addColumn('number', 'y');
		data.addColumn('number', 'value');

		// create some nice looking data with sin/cos
		var steps = 25;  // number of datapoints will be steps*steps
		var axisMax = 314;
		axisStep = axisMax / steps;
		for (var x = 0; x < axisMax; x+=axisStep) {
			for (var y = 0; y < axisMax; y+=axisStep) {
				var value = custom(x,y);
				data.addRow([x, y, value]);
			}
		}

		// specify options
		options = {width:  "400px",
			height: "400px",
			style: "surface",
			showPerspective: true,
			showGrid: true,
			showShadow: false,
			keepAspectRatio: true,
			verticalRatio: 0.5
		};

		// Instantiate our graph object.
		graph = new links.Graph3d(document.getElementById('mygraph'));

		// Draw our graph with the created data and options
		graph.draw(data, options);
	}




 /* google.load("visualization", "1");
  google.setOnLoadCallback(setUp);

  function setUp() {
    var numRows = 45.0;
    var numCols = 45;

    var tooltipStrings = new Array();
    var data = new google.visualization.DataTable();

    for (var i = 0; i < numCols; i++) {
      data.addColumn('number', 'col' + i);
    }

    data.addRows(numRows);
    var d = 360 / numRows;
    var idx = 0;

    for (var i = 0; i < numRows; i++) {
      for (var j = 0; j < numCols; j++) {
        //var value = (Math.cos(i * d * Math.PI / 180.0) * Math.cos(j * d * Math.PI / 180.0) + Math.sin(i * d * Math.PI / 180.0));
        var value = (Math.cos(i * d * Math.PI / 180.0) * Math.cos(j * d * Math.PI / 180.0));
        //var value = (Math.sin(i * d * Math.PI / 180.0) * Math.cos(j * d * Math.PI / 180.0)) * 1.5;

        data.setValue(i, j, value / 4.0);

        tooltipStrings[idx] = "x:" + i + ", y:" + j + " = " + value;
        idx++;
      }
    }

    var surfacePlot = new greg.ross.visualisation.SurfacePlot(document.getElementById("surfacePlotDiv"));
    var surfacePlot2 = new greg.ross.visualisation.SurfacePlot(document.getElementById("surfacePlotDiv2"));

    // Don't fill polygons in IE. It's too slow.
    var fillPly = true;

    // Define a colour gradient.
    var colour1 = {red: 0, green: 0, blue: 255};
    var colour2 = {red: 0, green: 255, blue: 255};
    var colour3 = {red: 0, green: 255, blue: 0};
    var colour4 = {red: 255, green: 255, blue: 0};
    var colour5 = {red: 255, green: 0, blue: 0};
    var colours = [colour1, colour2, colour3, colour4, colour5];

    // Axis labels.
    var xAxisHeader = "X";
    var yAxisHeader = "Y";
    var zAxisHeader = "Z";

    var options = {
      xPos: 300, yPos: 50, width: 500, height: 500, colourGradient: colours, fillPolygons: fillPly,
      tooltips: tooltipStrings, xTitle: xAxisHeader, yTitle: yAxisHeader, zTitle: zAxisHeader, restrictXRotation: false
    };

    surfacePlot.draw(data, options);
    surfacePlot2.draw(data, options);

    // http://almende.github.io/chap-links-library/js/graph3d/doc/
    // http://www.sitepoint.com/creating-visualization-app-using-google-charts-api-angularjs/


	 *//* $window.onload( function() {
		  surfacePlot.draw(data, options);
		  surfacePlot2.draw(data, options);
	  });*//*

  }

  setUp();
*/
});

