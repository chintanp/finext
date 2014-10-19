var sylvester = require('sylvester'),
	numeric = require('numeric'),
	math = require('mathjs');


var plate_analyser = function(len, wid, thk, div_x, div_y, element_type, end_type, load_type, loadVal) {

	var Q4_mesh = require('./mesher').Q4_mesh;
	var Q8_mesh = require('./mesher').Q8_mesh;
	var formdeeb = require('./formdeeb');
	var formdees = require('./formdees');
	var gauss = require('./gauss');
	var platelem_q8 = require('./platelem_q8');
	var fmlin = require('./fmlin');
	var fmquad = require('./fmquad');
	var formbeeb = require('./formbeeb');
	var formbees = require('./formbees');
	var form_KK = require('./form_KK');

	var Matrix = sylvester.Matrix,
		Vector = sylvester.Vector;

//  var	math = mathjs();

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
	var Lx = body.length; //  localModel.length; 			// Test values, will update from UI later on
	var Ly = body.breadth;
	var thick = body.thickness;

	var divx = body.divx;			// Divisions in X and Y
	var divy = body.divy;

	var etype_index = body.elementTypeSelected.value;    // Type of element, 1=4-noded or 2=8-noded
	var end_index = body.endTypeSelected;      // Type of end condition, 1=SS, 2=Fixed, 3=Beams
	var loadtype_index = body.loadData.loadTypeSelected.value;     // Type of load - 1=Conc, 2=UDL

	var X_origin = 0;
	var Y_origin = 0;
	var dim = 2;

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
	else if (etype_index == 2)           // 8-noded thick plate
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

	density = 0.090318230000872;
	E = 30.e+6;
	vu = 0.3;

	deeb = formdeeb(E, vu, thick);
	dees = formdees(E, vu, thick);

// ********************************************
// Boundary Conditions

	nf = math.ones(nnd, nodof);         // each row of nf corresponds to w_z, theta_x, and theta_y

	if (end_index == 1)              // Simply supported Ends
	{
		for (var i = 1; i <= nnd; i++) {
			if (geom._data[i - 1][0] == 0)                 // subset(math.index(i - 1, 0))
			{
				nf.subset(math.index(i - 1, 0), 0);
				nf.subset(math.index(i - 1, 2), 0);
			}
			else if (geom._data[i - 1][1] == 0)         // subset(math.index(i - 1, 1))
			{
				nf.subset(math.index(i - 1, 0), 0);
				nf.subset(math.index(i - 1, 1), 0);
			}
			else if (geom._data[i - 1][0] == Lx)        // subset(math.index(i - 1, 0))
			{
				nf.subset(math.index(i - 1, 1), 0);
			}
			else if (geom._data[i - 1][1] == Ly)        // subset(math.index(i - 1, 1))
			{
				nf.subset(math.index(i - 1, 2), 0);
			}
		}
	}
	else if (end_index == 2)                // Fixed Ends
	{
		for (var i = 1; i <= nnd; i++) {
			if (geom._data[i - 1][0] == 0)          // subset(math.index(i - 1, 0))
			{
				nf.subset(math.index(i - 1, 0), 0);
				nf.subset(math.index(i - 1, 1), 0);
				nf.subset(math.index(i - 1, 2), 0);
			}
			else if (geom._data[i - 1][1] == 0)         // subset(math.index(i - 1, 1))
			{
				nf.subset(math.index(i - 1, 0), 0);
				nf.subset(math.index(i - 1, 1), 0);
				nf.subset(math.index(i - 1, 2), 0);
			}
			else if (geom._data[i - 1][0] == Lx)            // subset(math.index(i - 1, 0))
			{
				nf.subset(math.index(i - 1, 1), 0);
			}
			else if (geom._data[i - 1][1] == Ly)          // subset(math.index(i - 1, 1))
			{
				nf.subset(math.index(i - 1, 2), 0);
			}
		}
	}
	else if (end_index == 3)                 // Beam supported slab
	{
		// Write Code to implement the flexibility of beams.
	}

// Count the free degrees of freedom

	n = 0;

	for (var i = 1; i <= nnd; i++) {
		for (var j = 1; j <= nodof; j++) {
			if (nf.subset(math.index(i - 1, j - 1)) != 0) {
				n = n + 1;
				nf.subset(math.index(i - 1, j - 1), n);
			}
		}
	}

//****************************************
// Load assignment

//Initialize the load matrix
	load = math.zeros(nnd, 3);



	if (loadtype_index == 1)                 // Concentrated Load
	{
		var conc_load = body.loadData.loadValue;

		for (var i = 1; i <= nnd; i++) {
			if (geom._data[i - 1][0] == Lx && geom._data[i - 1][1] == Ly) {           // subset(math.index(i - 1, 0))  &  subset(math.index(i - 1, 1))
				load.subset(math.index(i - 1, 0), -1 * conc_load / 4);             // -1 to account for -Y axis and /4 as the conc load get divided among four symmetric plates
			}
		}
	}
	else if (loadtype_index == 2)           // UDL
	{
		var dead_load = density * thick;
		var live_load = body.loadData.loadValue;              // To be updated from UI
		var total_load_int = dead_load + live_load;         // Total intensity of loading
		var total_load = total_load_int * Lx * Ly;          // Multiplied by area to get total load

		// Distribute to nodes based on the type of element
		if (etype_index == 1) {
			for (var i = 1; i <= nnd; i++) {
				count = 0;
				connec.forEach(function (value, index, matrix) {
					if (value == i) {
						count = count + 1;
					}
				});
				load.subset(math.index(i - 1, 0), -1 * count * total_load / (4 * nel));
			}
		}
		else if (etype_index == 2) {
			for (var i = 1; i <= nnd; i++) {
				count = 0;
				connec.forEach(function (value, index, matrix) {
					if (value == i) {
						count = count + 1;
					}
				});
				load.subset(math.index(i - 1, 0), -1 * count * total_load / (8 * nel));
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

	for (var i = 1; i <= nnd; i++) {
		for (var j = 1; j <= nodof; j++) {
			if (nf.subset(math.index(i - 1, j - 1)) != 0) {
				//var row = nf.subset(math.index(i-1, j-1))
				fg.subset(math.index(nf.subset(math.index(i - 1, j - 1)) - 1), load.subset(math.index(i - 1, j - 1)));
			}
		}
	}

// Form the matrix containing the abscissa and weights of the Gauss points
	sampb = gauss(ngpb);
	samps = gauss(ngps);

// Numerical integration and assembly of global stiffness matrix
//
// Initialize the global stiffness matrix to zero
	var kk = math.zeros(n, n);
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

	for (var i = 1; i <= nel; i++) {
		coord = platelem_q8(inputs, i).coord;
		g = platelem_q8(inputs, i).g;

		// Initialize the element bending stiffness matrix to zero
		var keb = math.zeros(eldof, eldof);

		// Initialize the element shear stiffness matrix to zero
		var kes = math.zeros(eldof, eldof);

		// Integrate element bending stiffness and assemble it in global matrix

		for (var ig = 1; ig <= ngpb; ig++) {
			wi = sampb._data[ig - 1][1];               // subset(math.index(ig-1, 1))
			for (var jg = 1; jg <= ngpb; jg++) {
				wj = sampb._data[jg - 1][1];           // subset(math.index(jg-1, 1))

				if (etype_index == 1) {
					der = fmlin(sampb, ig, jg).der;
					fun = fmlin(sampb, ig, jg).fun;
				}
				else if (etype_index == 2) {
					der = fmquad(sampb, ig, jg).der;
					fun = fmquad(sampb, ig, jg).fun;
				}

				jac = math.multiply(der.valueOf(), coord.valueOf());    // Tweak to make the multiply work .valueOf()

				// Create a clone of the matrix, but a sylvester object now
				var jacs = Matrix.create(jac);              // This change as jac is now purely an array, and doesnt have other mathjs stuff

				// Calculate the inverse of the sylvester matrix
				var jacis = jacs.inverse();

				// Take it back to the mathjs matrix
				for (var p = 1; p <= jacis.rows(); p++) {
					for (var q = 1; q <= jacis.cols(); q++) {
						jacim.subset(math.index(p - 1, q - 1), jacis.e(p, q)); // sylvester matrix brought to a mathjs matrix
					}
				}

				deriv = math.multiply(jacim.valueOf(), der.valueOf());
				beeb = formbeeb(deriv, nne, eldof);

				// Transpose the matrix
				var row_count = beeb._size[0];
				var col_count = beeb._size[1];

				for (var p = 0; p <= row_count - 1; p++) {
					for (var q = 0; q <= col_count - 1; q++) {
						beebt.subset(math.index(q, p), beeb._data[p][q]);				// beebt._data[q][p] = beeb._data[p][q]    // subset(math.index(q,p), beeb.subset(math.index(p, q))); // subset(math.index(p, q))
					}
				}

				// Integrate the stiffness matrix
				keb = math.add(keb.valueOf(), math.multiply(math.multiply(beebt.valueOf(), math.multiply(deeb.valueOf(), beeb.valueOf())), d * wi * wj));   // valueOf()

			}
		}

		// Assemble global stiffness matrix
		kk = form_KK(inputs, kk, keb, g);

		// Integrate element Shear stiffness and assemble it in global matrix

		for (var ig = 1; ig <= ngps; ig++) {
			wi = samps._data[ig - 1][1];        // subset(math.index(ig-1, 1));
			for (var jg = 1; jg <= ngps; jg++) {
				wj = samps._data[jg - 1][1];        // subset(math.index(jg-1, 1));

				if (etype_index == 1) {
					der = fmlin(samps, ig, jg).der;
					fun = fmlin(samps, ig, jg).fun;
				}
				else if (etype_index == 2) {
					der = fmquad(samps, ig, jg).der;
					fun = fmquad(samps, ig, jg).fun;
				}

				jac = math.multiply(der.valueOf(), coord.valueOf());   // valueof()
				d = math.det(jac);

				// Create a clone of the matrix, but a sylvester object now
				var jacs = Matrix.create(jac);          // No need of _data here as jac now just an array

				// Calculate the inverse of the sylvester matrix
				var jacis = jacs.inverse();

				// Take it back to the mathjs matrix
				for (var p = 1; p <= jacis.rows(); p++) {
					for (var q = 1; q <= jacis.cols(); q++) {
						jacim._data[p - 1][q - 1] = jacis.e(p, q); // subset(math.index(p-1,q-1), ); // sylvester matrix brought to a mathjs matrix
					}
				}

				deriv = math.multiply(jacim.valueOf(), der.valueOf());
				bees = formbees(deriv, fun, nne, eldof);

				// Tranpose the matrix
				var row_count = bees._size[0];
				var col_count = bees._size[1];
				for (var p = 0; p <= row_count - 1; p++) {
					for (var q = 0; q <= col_count - 1; q++) {
						beest.subset(math.index(q, p), bees._data[p][q]); // subset(math.index(q,p), bees.subset(math.index(p,q)));
					}
				}

				// Integrate the stiffness matrix
				kes = math.add(kes.valueOf(), math.multiply(math.multiply(beest.valueOf(), math.multiply(dees.valueOf(), bees.valueOf())), (5 / 6) * d * wi * wj));

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

	var deltan = numeric.solve(kkn, fgn);

	//TODO to look at how to return more than one value,  look at the implementation of mesher
	return deltan;

}


module.exports = plate_analyser;
