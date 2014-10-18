/**
 * Created by chin on 02/07/2014.
 */

var math = require('mathjs');
//var math = mathjs();

var form_KK = function(input, KK, kg, g) {

    // This function assembles the global stiffness matrix

    // var KK = math.matrix();

    for(var i = 1; i <= input.eldof; i++)
    {
        var gi = g.subset(math.index(i-1));
        if(gi != 0)
        {
            for(var j = 1; j <= input.eldof; j++)
            {
                var gj = g.subset(math.index(j-1));
                if(gj != 0)
                {
                    KK._data[gi-1][gj-1] = KK._data[gi-1][gj-1] + kg[i-1][j-1];  // subset(math.index(i-1,j-1))); //subset(math.index(gi-1, gj-1)) //subset(math.index(gi-1, gj-1)
                  }
            }
        }
    }

    return KK;
}

module.exports = form_KK;
