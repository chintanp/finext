/**
 * Created by chin on 02/07/2014.
 */

var math = require('mathjs');
//var math = mathjs();

var fmquad = function(samp, ig, jg) {

    // This function returns the vector of the shape function and their derivatives
    // with respect to xi and eta at the Gauss points for an 8-noded quadrilateral
    var xi = samp.subset(math.index(ig-1,0));
    var eta = samp.subset(math.index(jg-1,0));
    var etam = (1.0 - eta);
    var etap = (1.0 + eta);
    var xim = (1.0 - xi);
    var xip = (1.0 + xi);

    this.der = math.matrix();
    this.fun = math.matrix();

    this.fun.subset(math.index(0), -0.25*xim*etam*(1.0 + xi + eta));
    this.fun.subset(math.index(1), 0.5*(1.0 - Math.pow(xi,2))*etam);
    this.fun.subset(math.index(2), -0.25*xip*etam*(1.0 - xi + eta));
    this.fun.subset(math.index(3), 0.5*xip*(1.0 - Math.pow(eta,2)));
    this.fun.subset(math.index(4), -0.25*xip*etap*(1.0 - xi - eta));
    this.fun.subset(math.index(5), 0.5*(1.0 - Math.pow(xi,2))*etap);
    this.fun.subset(math.index(6), -0.25*xim*etap*(1.0 + xi - eta));
    this.fun.subset(math.index(7), 0.5*xim*(1.0 - Math.pow(eta,2)));

    this.der.subset(math.index(0,0), 0.25*etam*(2.0*xi + eta));
    this.der.subset(math.index(0,1), -1.0*etam*xi);
    this.der.subset(math.index(0,2), 0.25*etam*(2.0*xi - eta));
    this.der.subset(math.index(0,3), 0.5*(1 - Math.pow(eta,2)));
    this.der.subset(math.index(0,4), 0.25*etap*(2.0*xi + eta));
    this.der.subset(math.index(0,5), -1.0*etap*xi);
    this.der.subset(math.index(0,6), 0.25*etap*(2.0*xi - eta));
    this.der.subset(math.index(0,7), -0.5*(1.0 - Math.pow(eta,2)));
    this.der.subset(math.index(1,0), 0.25*xim*(2.0*eta + xi));
    this.der.subset(math.index(1,1), -0.5*(1.0 - Math.pow(xi,2)));
    this.der.subset(math.index(1,2), -0.25*xip*(xi - 2.0*eta));
    this.der.subset(math.index(1,3), -1.0*xip*eta);
    this.der.subset(math.index(1,4), 0.25*xip*(xi + 2.0*eta));
    this.der.subset(math.index(1,5), 0.5*(1.0 - Math.pow(xi,2)));
    this.der.subset(math.index(1,6), -0.25*xim*(xi - 2.0*eta));
    this.der.subset(math.index(1,7), -1.0*xim*eta);

    return {der: this.der, fun: this.fun};

}

module.exports = fmquad;
