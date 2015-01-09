var healingcalc = function() {

	var table = [[0.02279, 0.02735, 0.03191, 0.03646, 0.04102, 0.04558], [0.02174, 0.02609, 0.03044, 0.03478, 0.03913, 0.04348], [0.02069, 0.02483, 0.02897, 0.0331, 0.03724, 0.04138], [0.01964, 0.02357, 0.0275, 0.03142, 0.03535, 0.03928], [0.01859, 0.02231, 0.02603, 0.02974, 0.03346, 0.03718], [0.01754, 0.02105, 0.02456, 0.02806, 0.03157, 0.03508], [0.0165, 0.0198, 0.0231, 0.0264, 0.0297, 0.033], [0.01545, 0.01854, 0.02163, 0.02472, 0.02781, 0.0309], [0.0144, 0.01728, 0.02016, 0.02304, 0.02592, 0.0288], [0.01335, 0.01602, 0.01869, 0.02136, 0.02403, 0.0267], [0.0123, 0.01476, 0.01722, 0.01968, 0.02214, 0.0246], [0.01125, 0.0135, 0.01575, 0.018, 0.02025, 0.0225], [0.0102, 0.01224, 0.01428, 0.01632, 0.01836, 0.0204], [0.00915, 0.01098, 0.01281, 0.01464, 0.01647, 0.0183], [0.00811, 0.00973, 0.01135, 0.01298, 0.0146, 0.01622], [0.00706, 0.00847, 0.00988, 0.0113, 0.01271, 0.01412], [0.00601, 0.00721, 0.00841, 0.00962, 0.01082, 0.01202], [0.00496, 0.00595, 0.00694, 0.00794, 0.00893, 0.00992], [0.00391, 0.00469, 0.00547, 0.00626, 0.00704, 0.00782], [0.00286, 0.00343, 0.004, 0.00458, 0.00515, 0.00572], [0.00181, 0.00217, 0.00253, 0.0029, 0.00326, 0.00362], [0.00077, 0.00092, 0.00108, 0.00123, 0.00139, 0.00154]];
        
    if (sublevel !== 0) {
        sublevel = sublevel;
    } else {
        sublevel = weeks;
    }

    var age = parseInt(document.getElementById('age').value);
    var weeks = parseFloat(document.getElementById('weeks').value);
    var docs = parseInt(document.getElementById('mediclevel').value);
    
    var local3 = (table[(age - 17)][docs]) * 10;
    var local4 = ((sublevel - 0.99) / local3).toFixed(2);
    var local5 = ((sublevel / local3)).toFixed(2);
    var local6 = [0,0];
    var local7 = [0,0];

    if (local4 > 0) {  
        local6[0] = Math.floor(local4 / 7);
        local6[1] = Math.ceil(local4 % 7);
        if (local6[1] === 7) {
            local6[1] = 0;
            local6[0] = local6[0] + 1;
        } 
     else {
        local6[0] = 0;
        local6[1] = 0;
        local4 = 0;
    }

    if (local5 > 0) {
        local7[0] = Math.floor(local5 / 7);
        local7[1] = Math.ceil(local5 % 7);
        if (local7[1] === 7) {
            local7[1] = 0;
            local7[0] = local7[0] + 1;
        }
    else {
        local7[0] = 0;
        local7[1] = 0;
        local5 = 0;
    }

    var update_b = local4;
    var week_b = local6[0];
    var day_b = local6[1];
    var update = local5;
    var week= local7[0];
    var day = local7[1];

}


var sublevelcalc = function() {

	var TSIA = parseInt(document.getElementById('TSIA').value);
    var TSIB = parseInt(document.getElementById('experience').value);

    var sublevel = (((TSIB-TSIA) / TSIB) * 10).toFixed(2);
}