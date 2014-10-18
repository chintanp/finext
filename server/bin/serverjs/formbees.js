/**
 * Created by chin on 02/07/2014.
 */

var math = require('mathjs');
//var math = mathjs();

var formbees = function(deriv, fun, nne, eldof) {

    // This function assembles the matrix [bees] from the derivatives of the
    // shape functions in global coordinates for the shear action in plate element

    var bees = math.zeros(2, eldof);
    var k = 0;
    var j = 0;
    var x = 0;
    var y = 0;
    var i = 0;


    for(var m = 1; m <= nne; m++)
    {
        k = 3 * m;
        j = k - 1;
        i = k - 2;
        x = deriv[0][m-1];   // subset(math.index(0,m-1));
        y = deriv[1][m-1];   // .subset(math.index(1,m-1));
        bees.subset(math.index(1,i-1), -1*x);
        bees.subset(math.index(0,i-1), -1*y);
        bees.subset(math.index(0,k-1), fun.subset(math.index(m-1,0)));
        bees.subset(math.index(1,j-1), fun.subset(math.index(m-1,0)));
    }
    return bees;

}

module.exports = formbees;
