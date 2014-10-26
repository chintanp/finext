/**
 * Created by chin on 02/07/2014.
 */

var math = require('mathjs');
//var math = mathjs();


var Q4_mesh = function(len, wid, div_x, div_y, xo, yo) {

    var Length = len;
    var Width = wid;
    var NXE = div_x;
    var NYE = div_y;
    var X_origin = xo;
    var Y_origin = yo;
    var dhx = Length / NXE;
    var dhy = Width / NYE;

    this.geom = math.matrix();
    this.connec = math.matrix();
    this.nel = 0;
    this.nnd = 0;
    var k = 0;

    for( var i = 1; i <= NXE; i++ )
    {
        for( var j = 1; j <= NYE; j++ )
        {
            k = k + 1;

            n1 = j + (i-1) * (NYE+1);
            n2 = j + i * (NYE+1);
            n3 = n1 + 1;
            n4 = n2 + 1;

            this.geom.subset(math.index(n1-1, 0), (i-1)*dhx-X_origin);
            this.geom.subset(math.index(n1-1, 1), (j-1)*dhy-Y_origin);
            this.geom.subset(math.index(n2-1, 0), (i)*dhx-X_origin);
            this.geom.subset(math.index(n2-1, 1), (j-1)*dhy-Y_origin);
            this.geom.subset(math.index(n3-1, 0), (i-1)*dhx-X_origin);
            this.geom.subset(math.index(n3-1, 1), (j)*dhy-Y_origin);
            this.geom.subset(math.index(n4-1, 0), (i)*dhx-X_origin);
            this.geom.subset(math.index(n4-1, 1), (j)*dhy-Y_origin);

            this.nel = k;
            this.nnd = n4;

            this.connec.subset(math.index(this.nel-1, 0), n1);
            this.connec.subset(math.index(this.nel-1, 1), n2);
            this.connec.subset(math.index(this.nel-1, 2), n4);
            this.connec.subset(math.index(this.nel-1, 3), n3);

        }
    }

    return {nel: this.nel, nnd: this.nnd, geom: this.geom, connec: this.connec};
}

var Q8_mesh = function(len, wid, div_x, div_y, xo, yo) {

    var Length = len;
    var Width = wid;
    var NXE = div_x;
    var NYE = div_y;
    var X_origin = xo;
    var Y_origin = yo;
    var dhx = Length / NXE;
    var dhy = Width / NYE;

    this.geom = math.matrix();
    this.connec = math.matrix();
    this.nel = 0;
    this.nnd = 0;
    var k = 0;

    for( var i = 1; i <= NXE; i++ )
    {
        for( var j = 1; j <= NYE; j++ )
        {
            k = k + 1;

            n1 = (i-1) * (3*NYE + 2) + 2*j - 1;
            n2 = i * (3*NYE + 2) + j - NYE - 1;
            n3 = i * (3*NYE + 2) + 2*j - 1;
            n4 = n3 + 1;
            n5 = n3 + 2;
            n6 = n2 + 1;
            n7 = n1 + 2;
            n8 = n1 + 1;

            this.geom.subset(math.index(n1-1, 0), (i-1)*dhx-X_origin);
            this.geom.subset(math.index(n1-1, 1), (j-1)*dhy-Y_origin);
            this.geom.subset(math.index(n3-1, 0), (i)*dhx-X_origin);
            this.geom.subset(math.index(n3-1, 1), (j-1)*dhy-Y_origin);

            this.geom.subset(math.index(n2-1, 0), (this.geom.subset(math.index(n1-1, 0))+this.geom.subset(math.index(n3-1, 0)))/2);
            this.geom.subset(math.index(n2-1, 1), (this.geom.subset(math.index(n1-1, 1))+this.geom.subset(math.index(n3-1, 1)))/2);

            this.geom.subset(math.index(n5-1, 0), (i)*dhx-X_origin);
            this.geom.subset(math.index(n5-1, 1), (j)*dhy-Y_origin);

            this.geom.subset(math.index(n4-1, 0), (this.geom.subset(math.index(n3-1, 0))+this.geom.subset(math.index(n5-1, 0)))/2);
            this.geom.subset(math.index(n4-1, 1), (this.geom.subset(math.index(n3-1, 1))+this.geom.subset(math.index(n5-1, 1)))/2);

            this.geom.subset(math.index(n7-1, 0), (i-1)*dhx-X_origin);
            this.geom.subset(math.index(n7-1, 1), (j)*dhy-Y_origin);

            this.geom.subset(math.index(n6-1, 0), (this.geom.subset(math.index(n5-1, 0))+this.geom.subset(math.index(n7-1, 0)))/2);
            this.geom.subset(math.index(n6-1, 1), (this.geom.subset(math.index(n5-1, 1))+this.geom.subset(math.index(n7-1, 1)))/2);

            this.geom.subset(math.index(n8-1, 0), (this.geom.subset(math.index(n1-1, 0))+this.geom.subset(math.index(n7-1, 0)))/2);
            this.geom.subset(math.index(n8-1, 1), (this.geom.subset(math.index(n1-1, 1))+this.geom.subset(math.index(n7-1, 1)))/2);

            this.nel = k;
            this.nnd = n5;

            this.connec.subset(math.index(this.nel-1, 0), n1);
            this.connec.subset(math.index(this.nel-1, 1), n2);
            this.connec.subset(math.index(this.nel-1, 2), n3);
            this.connec.subset(math.index(this.nel-1, 3), n4);
            this.connec.subset(math.index(this.nel-1, 4), n5);
            this.connec.subset(math.index(this.nel-1, 5), n6);
            this.connec.subset(math.index(this.nel-1, 6), n7);
            this.connec.subset(math.index(this.nel-1, 7), n8);
        }
    }

    return {nel: this.nel, nnd: this.nnd, geom: this.geom, connec: this.connec};
}

module.exports = { Q4_mesh: Q4_mesh, Q8_mesh: Q8_mesh};
