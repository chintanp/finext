var debug = require('debug')('my-application');
var app = require('../app');

app.set('port', process.env.PORT || 3000);

/**
 * Created by chin on 03/10/2014.
 */
// Variable declaration
// Some of these are matrices, so they will need to treated separately

var sylvester = require('sylvester'),
	numeric = require('numeric'),
	mathjs = require('mathjs');

var Q4_mesh = require('./serverjs/mesher').Q4_mesh;
var Q8_mesh = require('./serverjs/mesher').Q8_mesh;
var formdeeb = require('./serverjs/formdeeb');
var formdees = require('./serverjs/formdees');
var gauss = require('./serverjs/gauss');
var platelem_q8 = require('./serverjs/platelem_q8');
var fmlin = require('./serverjs/fmlin');
var fmquad = require('./serverjs/fmquad');
var formbeeb = require('./serverjs/formbeeb');
var formbees = require('./serverjs/formbees');
var form_KK = require('./serverjs/form_KK');

var Firebase = require('firebase');

const FIREBASE_URL = 'http://finext.firebaseio.com/';

// var finext = new Firebase('http://finext.firebaseio.com/');

var modelRef = new Firebase( FIREBASE_URL + '/modelInfo/');

modelRef.endAt().limit(1).on('child_added', function(snapshot) {

	var localModel = snapshot.val();

	console.log(localModel.length);
	/*console.log("modelInfo object properties: ");

	 console.log("length:  " + localModel.length);
	 console.log("breadth:  " + localModel.breadth);
	 console.log("thickness:  " + localModel.thickness);
	 console.log("Load Type:  " + localModel.loadtype);
	 console.log("End Type:  " + localModel.endtype);
	 console.log("Element Type:  " + 	localModel.elementtype);
	 console.log("Divisions in X:  " + localModel.divx);
	 console.log("Divisions in Y:  " + localModel.divy);*/



	/*
	 var Matrix = sylvester.Matrix,
	 Vector = sylvester.Vector;


	 var	math = mathjs();



	 var nnd, nel, nne, nodof, eldof, n, ngpb, ngps;
	 var dim;
	 var W, MX, MY, MXY, QX, QY;

	 var geom = math.matrix();
	 var connec = math.matrix();
	 var deeb = math.matrix();
	 var dees = math.matrix();
	 var nf = math.matrix();
	 var load = math.matrix();
	 var sampb = math.matrix();
	 var samps = math.matrix();


	 // ******** These are the dimensions of the quarter plate, for total dimension of plate multiply each by two.******
	 var Lx = 6; //  localModel.length; 			// Test values, will update from UI later on
	 var Ly = localModel.breadth;
	 var thick = localModel.thickness;

	 var divx = localModel.divx;			// Divisions in X and Y
	 var divy =localModel.divy;

	 var etype_index = localModel.elementtype + 1;    // Type of element, 1=4-noded or 2=8-noded
	 var end_index = localModel.endtype + 1;      // Type of end condition, 1=SS, 2=Fixed, 3=Beams
	 var loadtype_index = localModel.loadtype;     // Type of load - 1=Conc, 2=UDL

	 var X_origin = 0;
	 var Y_origin = 0;
	 var dim = 2;

	 *//*var form_KK = function(input, KK, kg, g) {

	 // This function assembles the global stiffness matrix

	 // var KK = math.matrix();

	 for(var i = 1; i <= input.eldof; i++)
	 {
	 var gi = g.subset(math.index(i-1));
	 if(gi != 0)
	 {
	 for(var j = 1; j <= input.eldof; j++)
	 {
	 var gj = g.subset(math.index(j-1));
	 if(gj != 0)
	 {
	 KK.subset(math.index(gi-1, gj-1), KK.subset(math.index(gi-1, gj-1)) + kg.subset(math.index(i-1,j-1)));
	 }
	 }
	 }
	 }

	 return KK;
	 }*//*
	 // ******************************************************************************
	 // ******************************************************************************
	 if (etype_index == 1)           // 4-noded thick plate
	 {
	 nne = 4;

	 nel = Q4_mesh(Lx, Ly, divx, divy, X_origin, Y_origin).nel;
	 nnd = Q4_mesh(Lx, Ly, divx, divy, X_origin, Y_origin).nnd;
	 geom = Q4_mesh(Lx, Ly, divx, divy, X_origin, Y_origin).geom;
	 connec = Q4_mesh(Lx, Ly, divx, divy, X_origin, Y_origin).connec;

	 ngpb = 2;
	 ngps = 1;
	 }
	 else if(etype_index == 2)           // 8-noded thick plate
	 {
	 nne = 8;

	 nel = Q8_mesh(Lx, Ly, divx, divy, X_origin, Y_origin).nel;
	 nnd = Q8_mesh(Lx, Ly, divx, divy, X_origin, Y_origin).nnd;
	 geom = Q8_mesh(Lx, Ly, divx, divy, X_origin, Y_origin).geom;
	 connec = Q8_mesh(Lx, Ly, divx, divy, X_origin, Y_origin).connec;

	 ngpb = 3;
	 ngps = 2;
	 }

	 nodof = 3;              // Number of degrees of freedom per node
	 eldof = nne * nodof;    // number of degrees of freedom per element

	 density = 0.090318230000872 ;
	 E = 30.e+6;
	 vu = 0.3;

	 deeb = formdeeb(E, vu, thick);
	 dees = formdees(E, vu, thick);

	 // ********************************************
	 // Boundary Conditions

	 nf = math.ones(nnd, nodof);         // each row of nf corresponds to w_z, theta_x, and theta_y

	 if(end_index == 1)              // Simply supported Ends
	 {
	 for (var i = 1; i <= nnd; i++)
	 {
	 if (geom.subset(math.index(i - 1, 0)) == 0)
	 {
	 nf.subset(math.index(i - 1, 0), 0);
	 nf.subset(math.index(i - 1, 2), 0);
	 }
	 else if (geom.subset(math.index(i - 1, 1)) == 0)
	 {
	 nf.subset(math.index(i - 1, 0), 0);
	 nf.subset(math.index(i - 1, 1), 0);
	 }
	 else if (geom.subset(math.index(i - 1, 0)) == Lx)
	 {
	 nf.subset(math.index(i - 1, 1), 0);
	 }
	 else if (geom.subset(math.index(i - 1, 1)) == Ly)
	 {
	 nf.subset(math.index(i - 1, 2), 0);
	 }
	 }
	 }
	 else if (end_index == 2)                // Fixed Ends
	 {
	 for (var i = 1; i <= nnd; i++)
	 {
	 if (geom.subset(math.index(i - 1, 0)) == 0)
	 {
	 nf.subset(math.index(i - 1, 0), 0);
	 nf.subset(math.index(i - 1, 1), 0);
	 nf.subset(math.index(i - 1, 2), 0);
	 }
	 else if (geom.subset(math.index(i - 1, 1)) == 0)
	 {
	 nf.subset(math.index(i - 1, 0), 0);
	 nf.subset(math.index(i - 1, 1), 0);
	 nf.subset(math.index(i - 1, 2), 0);
	 }
	 else if (geom.subset(math.index(i - 1, 0)) == Lx)
	 {
	 nf.subset(math.index(i - 1, 1), 0);
	 }
	 else if (geom.subset(math.index(i - 1, 1)) == Ly)
	 {
	 nf.subset(math.index(i - 1, 2), 0);
	 }
	 }
	 }
	 else if(end_index == 3)                 // Beam supported slab
	 {
	 // Write Code to implement the flexibility of beams.
	 }


	 // Count the free degrees of freedom

	 n = 0;

	 for (var i = 1; i <= nnd; i++)
	 {
	 for (var j = 1; j <= nodof; j++)
	 {
	 if(nf.subset(math.index(i-1, j-1)) != 0)
	 {
	 n = n + 1;
	 nf.subset(math.index(i-1, j-1), n);
	 }
	 }
	 }

	 /*//****************************************
	 // Load assignment


	 //Initialize the load matrix
	 load = math.zeros(nnd, 3);

	 var conc_load = 1000;           // This concentrated load will be updated from UI
	 var dead_load = density * thick;
	 var live_load = 5;              // To be updated from UI
	 var total_load_int = dead_load + live_load;         // Total intensity of loading
	 var total_load = total_load_int * Lx * Ly;          // Multiplied by area to get total load


	 if(loadtype_index == 1)                 // Concentrated Load
	 {
		for(var i = 1; i <= nnd; i++)
		{
			if (geom.subset(math.index(i - 1, 0)) == Lx && geom.subset(math.index(i - 1, 1)) == Ly) {
				load.subset(math.index(i - 1, 0), -1 * conc_load / 4);             // -1 to account for -Y axis and /4 as the conc load get divided among four symmetric plates
			}
		}
	}
	 else if (loadtype_index == 2)           // UDL
	 {
		// Distribute to nodes based on the type of element
		if(etype_index == 1)
		{
			for(var i = 1; i <= nnd; i++)
			{
				count = 0;
				connec.forEach(function(value, index, matrix) {
					if(value == i) {
						count = count + 1;
					}
				});
				load.subset(math.index(i - 1, 0), -1 * count * total_load / (4*nel));
			}
		}
		else if(etype_index == 2)
		{
			for(var i = 1; i <= nnd; i++)
			{
				count = 0;
				connec.forEach(function(value, index, matrix) {
					if(value == i) {
						count = count + 1;
					}
				});
				load.subset(math.index(i - 1, 0), -1 * count * total_load / (8*nel));
			}
		}
	}

	 // Define an inputs object that carries all the required inputs required for all the functions
	 var inputs = {nne: nne,
		nodof: nodof,
		eldof: eldof,
		geom: geom,
		connec: connec,
		nf: nf,
		dim: dim};

	 // ************************ End of Input *************

	 // Assemble the global force vector
	 var fg = math.zeros(n);

	 for(var i = 1; i <= nnd; i++)
	 {
		for (var j = 1; j <= nodof; j++)
		{
			if(nf.subset(math.index(i-1, j-1)) != 0)
			{
				//var row = nf.subset(math.index(i-1, j-1))
				fg.subset(math.index(nf.subset(math.index(i-1, j-1))-1), load.subset(math.index(i-1, j-1)));
			}
		}
	}

	 // Form the matrix containing the abscissa and weights of the Gauss points
	 sampb = gauss(ngpb);
	 samps = gauss(ngps);

	 // Numerical integration and assembly of global stiffness matrix
	 //
	 // Initialize the global stiffness matrix to zero
	 var kk = math.zeros(n,n);
	 var wi = 0;
	 var wj = 0;
	 var der = math.matrix();
	 var fun = math.matrix();
	 var jac = math.matrix();
	 var jacim = math.matrix();
	 var deriv = math.matrix();
	 var beeb = math.matrix();
	 var beebt = math.matrix();
	 var bees = math.matrix();
	 var beest = math.matrix();
	 var coord = math.matrix();
	 var g = math.matrix();

	 var d = 0;



	 for(var i = 1; i <= nel; i++)
	 {
		coord = platelem_q8(inputs, i).coord;
		g = platelem_q8(inputs, i).g;

		// Initialize the element bending stiffness matrix to zero
		var keb = math.zeros(eldof, eldof);

		// Initialize the element shear stiffness matrix to zero
		var kes = math.zeros(eldof, eldof);

		// Integrate element bending stiffness and assemble it in global matrix

		for(var ig = 1; ig <= ngpb; ig++)
		{
			wi = sampb.subset(math.index(ig-1, 1));
			for(var jg = 1; jg <= ngpb; jg++)
			{
				wj = sampb.subset(math.index(jg-1, 1));

				if(etype_index == 1)
				{
					der = fmlin(sampb, ig, jg).der;
					fun = fmlin(sampb, ig, jg).fun;
				}
				else if(etype_index == 2)
				{
					der = fmquad(sampb, ig, jg).der;
					fun = fmquad(sampb, ig, jg).fun;
				}

				jac = math.multiply(der, coord);
				d = math.det(jac);

				// Create a clone of the matrix, but a sylvester object now
				var jacs = Matrix.create(jac._data);

				// Calculate the inverse of the sylvester matrix
				var jacis = jacs.inverse();

				// Take it back to the mathjs matrix
				for(var p = 1; p <= jacis.rows(); p++)
				{
					for(var q = 1; q <= jacis.cols(); q++)
					{
						jacim.subset(math.index(p-1,q-1), jacis.e(p,q)); // sylvester matrix brought to a mathjs matrix
					}
				}

				deriv = math.multiply(jacim, der);
				beeb = formbeeb(deriv, nne, eldof);

				// Tranpose the matrix
				var row_count = beeb._size[0];
				var col_count = beeb._size[1];
				for(var p = 0; p <= row_count-1; p++)
				{
					for(var q = 0; q <= col_count-1; q++)
					{
						beebt.subset(math.index(q,p), beeb.subset(math.index(p, q)));
					}
				}

				// Integrate the stiffness matrix
				keb = math.add(keb, math.multiply(math.multiply(beebt, math.multiply(deeb, beeb)), d * wi * wj ));

			}
		}

		// Assemble global stiffness matrix
		kk = form_KK(inputs, kk, keb, g);

		// Integrate element Shear stiffness and assemble it in global matrix

		for(var ig = 1; ig <= ngps; ig++)
		{
			wi = samps.subset(math.index(ig-1, 1));
			for(var jg = 1; jg <= ngps; jg++)
			{
				wj = samps.subset(math.index(jg-1, 1));

				if(etype_index == 1)
				{
					der = fmlin(samps, ig, jg).der;
					fun = fmlin(samps, ig, jg).fun;
				}
				else if(etype_index == 2)
				{
					der = fmquad(samps, ig, jg).der;
					fun = fmquad(samps, ig, jg).fun;
				}

				jac = math.multiply(der, coord);
				d = math.det(jac);

				// Create a clone of the matrix, but a sylvester object now
				var jacs = Matrix.create(jac._data);

				// Calculate the inverse of the sylvester matrix
				var jacis = jacs.inverse();

				// Take it back to the mathjs matrix
				for(var p = 1; p <= jacis.rows(); p++)
				{
					for(var q = 1; q <= jacis.cols(); q++)
					{
						jacim.subset(math.index(p-1,q-1), jacis.e(p,q)); // sylvester matrix brought to a mathjs matrix
					}
				}

				deriv = math.multiply(jacim, der);
				bees = formbees(deriv, fun, nne, eldof);

				// Tranpose the matrix
				var row_count = bees._size[0];
				var col_count = bees._size[1];
				for(var p = 0; p <= row_count-1; p++)
				{
					for(var q = 0; q <= col_count-1; q++)
					{
						beest.subset(math.index(q,p), bees.subset(math.index(p,q)));
					}
				}

				// Integrate the stiffness matrix
				kes = math.add(kes, math.multiply(math.multiply(beest, math.multiply(dees, bees)),(5/6) * d * wi * wj));

			}
		}

		// Assemble global stiffness matrix
		kk = form_KK(inputs, kk, kes, g);
	}

	 // **********************************************************
	 // ********* End of Assembly ********************************

	 //var kks = Matrix.create(kk._daita);
	 //var fgs = Matrix.create(fg._data);
	 //var delta = kks.solve(fgs);

	 var kkn = kk._data;
	 var fgn = fg._data;

	 var deltan = numeric.solve(kkn,fgn);

	 console.log(nnd);
	 console.log(geom);
	 console.log(connec);*/
});


var server = app.listen(app.get('port'), function() {
	debug('Express server listening on port ' + server.address().port);
});