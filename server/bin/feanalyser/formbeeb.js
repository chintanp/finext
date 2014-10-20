/**
 * Created by chin on 02/07/2014.
 */

var math = require('mathjs');
//var math = mathjs();

var formbeeb = function(deriv, nne, eldof) {

    // This function assembles the matrix [beeb] from the derivatives of the
    // shape functions in global coordinates for a thick plate element (bending action)

    var beeb = math.zeros(3, eldof);
    var k = 0;
    var j = 0;
    var x = 0;
    var y = 0;


    for(var m = 1; m <= nne; m++)
    {
        k = 3 * m;
        j = k - 1;
        x = deriv[0][m-1];      // Removed as type-error due to upstream change  .subset(math.index(0,m-1));
        beeb._data[0][j-1] = x;   // Changed .subset(math.index(0,j-1), x);
        beeb._data[2][k-1] = x;   // Changed subset(math.index(2, k-1), x);
        y = deriv[1][m-1];         // Changed .subset(math.index(1,m-1));
        beeb._data[1][k-1] = y;   // Changed subset(math.index(1,k-1), y);
        beeb._data[2][j-1] = y;     // Changed subset(math.index(2, j-1), y);
    }
    return beeb;

}

	module.exports = formbeeb;

