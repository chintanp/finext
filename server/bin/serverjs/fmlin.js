/**
 * Created by chin on 02/07/2014.
 */

var mathjs = require('mathjs');
var math = mathjs();

var fmlin = function(samp, ig, jg) {

    // This function returns the vector of shape function and its derivative
    // for 4-noded bi-linear quadrilateral element
    var xi = samp.subset(math.index(ig-1,0));
    var eta = samp.subset(math.index(jg-1,0));

    this.fun = math.matrix();
    this.der = math.matrix();

    this.fun.subset(math.index(0,0), 0.25*(1.0-xi-eta+xi*eta));
    this.fun.subset(math.index(1,0), 0.25*(1.0+xi-eta-xi*eta));
    this.fun.subset(math.index(2,0), 0.25*(1.0+xi+eta+xi*eta));
    this.fun.subset(math.index(3,0), 0.25*(1.0-xi+eta-xi*eta));

    this.der.subset(math.index(0,0), 0.25*(eta-1));
    this.der.subset(math.index(0,1), 0.25*(1-eta));
    this.der.subset(math.index(0,2), 0.25*(eta+1));
    this.der.subset(math.index(0,3), -0.25*(eta+1));
    this.der.subset(math.index(1,0), 0.25*(xi-1));
    this.der.subset(math.index(1,1), -0.25*(xi+1));
    this.der.subset(math.index(1,2), 0.25*(xi+1));
    this.der.subset(math.index(1,3), 0.25*(1-xi));

    return {der: this.der, fun: this.fun};
}

module.exports = fmlin;
