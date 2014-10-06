var mathjs = require('mathjs');
var math = mathjs();


var formdeeb = function(E, vu, thick) {

    var deeb = math.matrix();

    DR = E * Math.pow(thick, 3)/(12 * (1.0 - vu*vu));

    deeb.subset(math.index(0, 0), DR*1);
    deeb.subset(math.index(0, 1), DR*vu);
    deeb.subset(math.index(0, 2), DR*0);
    deeb.subset(math.index(1, 0), DR*vu);
    deeb.subset(math.index(1, 1), DR*1);
    deeb.subset(math.index(1, 2), DR*0);
    deeb.subset(math.index(2, 0), DR*0);
    deeb.subset(math.index(2, 1), DR*0);
    deeb.subset(math.index(2, 2), DR*(1.0 - vu)/2);

    return deeb;
}

module.exports = formdeeb;
