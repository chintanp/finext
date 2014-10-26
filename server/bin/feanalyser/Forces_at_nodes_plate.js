/**
 * Created by chin on 24/10/2014.
 */

var math = require('mathjs');

var Forces_at_nodes_plate = function(input, Element_Forces) {

	// This function averages the stresses at the nodes

	  this.MX = math.matrix(),
		this.MY = math.matrix(),
		this.MXY = math.matrix(),
		this.QX = math.matrix(),
		this.QY = math.matrix();

	for(var k = 1; k <= input.nnd; k++) {
		var mx = 0,
			my = 0,
			mxy = 0,
			qx = 0,
			qy = 0,
			ne = 0;

		for(var iel = 1; iel <= input.nel; iel++) {
			for(var jel = 1; jel <= input.nne; jel++) {
				if(connec._data[iel-1][jel-1] == k) {
					ne = ne + 1;
					mx = mx + Element_Forces._data[iel-1][0];
					my = my + Element_Forces._data[iel-1][1];
					mxy = mxy + Element_Forces._data[iel-1][2];
					qx = qx + Element_Forces._data[iel-1][3];
					qy = qy + Element_Forces._data[iel-1][4];
				}
			}
		}

		this.MX.subset(math.index(k-1), mx/ne);
		this.MY.subset(math.index(k-1), my/ne);
		this.MXY.subset(math.index(k-1), mxy/ne);
		this.QX.subset(math.index(k-1), qx/ne);
		this.QY.subset(math.index(k-1), qy/ne);

	}

	return { MX: this.MX,  MY: this.MY,  MXY: this.MXY,  QX: this.QX,  QY: this.QY };
}

module.exports = Forces_at_nodes_plate;