/**
 * Created by chin on 02/07/2014.
 */

var mathjs = require('mathjs');
var math = mathjs();

var gauss = function(ngp) {

    // This function returns the abscissa and weights of the Gauss points for ngp upto 4

    var samp = math.zeros(ngp,2);

    if(ngp == 1)
    {
        samp.subset(math.index(0,0), 0.0);
        samp.subset(math.index(0,1), 2.0);
    }
    else if (ngp == 2)
    {
        samp.subset(math.index(0,0), -1.0/Math.sqrt(3));
        samp.subset(math.index(0,1), 1.0);
        samp.subset(math.index(1,0), 1.0/Math.sqrt(3));
        samp.subset(math.index(1,1), 1.0);
    }
    else if (ngp == 3)
    {
        samp.subset(math.index(0,0), -0.2*Math.sqrt(15.0));
        samp.subset(math.index(0,1), 5.0/9.0);
        samp.subset(math.index(1,0), 0.0);
        samp.subset(math.index(1,1), 8.0/9.0);
        samp.subset(math.index(2,0), 0.2*Math.sqrt(15.0));
        samp.subset(math.index(2,1), 5.0/9.0);
    }
    else if (ngp == 4)
    {
        samp.subset(math.index(0,0), -0.861136311594053);
        samp.subset(math.index(0,1), 0.347854845137454);
        samp.subset(math.index(1,0), -0.339981043584856);
        samp.subset(math.index(1,1), 0.652145154862546);
        samp.subset(math.index(2,0), 0.339981043584856);
        samp.subset(math.index(2,1), 0.652145154862546);
        samp.subset(math.index(3,0), 0.861136311594053);
        samp.subset(math.index(3,1), 0.347854845137454);
    }
    return samp;

}

module.exports = gauss;
