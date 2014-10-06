/**
 * Created by chin on 02/07/2014.
 */

var mathjs = require('mathjs');
var math = mathjs();

var formdees = function(E, vu, thick) {

    var dees = math.matrix();

    G = E / (2 * (1.0+vu));

    dees.subset(math.index(0, 0), G*thick);
    dees.subset(math.index(0, 1), G*0);
    dees.subset(math.index(1, 0), G*0);
    dees.subset(math.index(1, 1), G*thick);

    return dees;
}
module.exports = formdees;

