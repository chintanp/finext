/**
 * Created by chin on 02/07/2014.
 */

var math = require('mathjs');
//var math = mathjs();

var platelem_q8 = function(input, i) {

    // This function returns the coordinates of the nodes of element i
    // and its steering vector
    this.coord = math.zeros(input.nne, input.dim);
    this.g = math.matrix();

    for(var k = 1; k <= input.nne; k++)
    {
        for(var j = 1; j <= input.dim; j++)
        {
            this.coord.subset(math.index(k-1,j-1), input.geom.subset(math.index(input.connec.subset(math.index(i-1,k-1))-1,j-1)));
        }
    }
    var l = 0;
    for(var k = 1; k <= input.nne; k++)
    {
        for(var j = 1; j <= input.nodof; j++)
        {
            l = l + 1;
            this.g.subset(math.index(l-1), input.nf._data[input.connec.subset(math.index(i-1, k-1))-1][j-1]);                    // subset(math.index(input.connec.subset(math.index(i-1,k-1))-1, j-1))
        }
    }
    return {coord: this.coord, g: this.g};
}

module.exports = platelem_q8;

