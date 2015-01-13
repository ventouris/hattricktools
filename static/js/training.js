var trainingcalc = function() {

    //coefficients arrays

    var skillvalues = {
        'GK': 0.335,
        'Def': 0.206,
        'DefPos': 0.094,
        'Cross': 0.315,
        'Cross 50%': 0.1575,
        'WingAtt': 0.219,
        'PM': 0.22,
        'PM 50%': 0.11,
        'Sco': 0.218,
        'Shoot': 0.097,
        "Pass": 0.237,
        'ThPass': 0.178,
        "SP": 0.941,
        "SP 25%": 1.183
    };
    var agekoef = [1, 0.982, 0.963, 0.946, 0.928, 0.911, 0.894, 0.877, 0.861, 0.845, 0.830, 0.814, 0.799, 0.784, 0.770, 0.756, 0.742, 0.728];
    var assistkoef = [0.66, 0.692, 0.724, 0.756, 0.788, 0.82, 0.852, 0.884, 0.916, 0.948, 0.98, 1.012, 1.044, 1.076, 1.108, 1.14];
    var coachkoef = [0, 0, 0, 0, 0.774, 0.867, 0.9430, 1, 1.045];
    var agetable = [0.000, 16.000, 31.704, 47.117, 62.246, 77.094, 91.668, 105.972, 120.012, 133.791, 147.316, 160.591, 173.620, 186.408, 198.960, 211.279, 223.370, 235.238];

    //retrieve inputs from HTML form and parse them as integers
    var years = parseInt(document.getElementById('years-value').value);
    var days = parseInt(document.getElementById('days-value').value);
    var skilllevel = parseInt(document.getElementById('skilllevel-value').value);
    var subskill = parseInt(document.getElementById('subskill-value').value);
    var coachlevel = parseInt(document.getElementById('coachlevel-value').value);
    var assistants = parseInt(document.getElementById('assistantslevel-value').value);
    var intensity = parseInt(document.getElementById('trainingintensity-value').value);
    var stamina = parseInt(document.getElementById('staminashare-value').value);
    var dropdown = document.getElementById('skill');
    var skill = dropdown.options[dropdown.selectedIndex].value;
    if (skill === "") {
        toast("You should choose a skill first!", 3000, 'rounded') // 'rounded' is the class I'm applying to the toast
        return;
    }

    //set personal parameters through coefficients
    var coachK = coachkoef[coachlevel];
    var assistK = assistkoef[assistants];
    var intensK = intensity / 100.0;
    var staminaK = (100 - stamina) / 100.0;
    var trainK = skillvalues[skill];
    var totalK = coachK * assistK * intensK * staminaK * trainK;

    //initialize parameters
    var level = skilllevel;
    var sublevel = subskill / 100;
    var years0 = agetable[years - 17];
    var years1 = agetable[years - 16];
    var age0 = (days / 112) * (years1 - years0) + years0;
    var skill0lost = Math.pow(6.0896 * totalK, 1 / 0.72);
    var ageee = years * 1 + days / 112;
    var shtraf = 0;
    var oldweek = years * 112 + days * 1;
    var drop = 0;
    var age1 = years * 1 + days / 112;
    var age1old = 0;
    var ageold = 0;

    //start calculation
    var results = [];
    var startpoint = skilllevel + 1;
    for (lev = startpoint; lev < 21; lev++) {
        if (lev < 9) {
            xxx1 = (Math.pow(lev, 1.72) - 1) * (1 / 6.0896 / 1.72);
        } else {
            xxx1 = 2.45426 + (1 / 4.7371 / 1.96) * Math.pow(lev - 5, 1.96);
        }

        if (level < 9) {
            yyy1 = (Math.pow(level + sublevel, 1.72) - 1) * (1 / 6.0896 / 1.72);
        } else {
            yyy1 = 2.45426 + Math.pow(level + sublevel - 5, 1.96) * (1 / 4.7371 / 1.96);
        }

        xxx = (xxx1 - yyy1) / totalK + age0;

        for (i = 17; i < 35; i++) {
            if (xxx <= agetable[i - 17]) {
                break
            }
        }

        agge = i - 1;
        stolH = agetable[agge - 17];
        stolI = agetable[agge - 16];
        ageeeold = ageee;
        ageee = agge + (xxx - stolH) / (stolI - stolH);

        if (lev > (level + sublevel + 1)) {
            sh = 1;
            shtrafx = 1 / 16 - ageee + ageeeold;
            if (shtrafx > 0) {
                shtraf = shtraf + shtrafx;
            }
        } else {
            sh = 2;
            shtrafx = (1 / 16 - ageee + years * 1 + days / 112) * (lev - (level + sublevel));
            if (shtrafx > 0) {
                shtraf = shtraf + shtrafx;
            }
        }
        if (lev > 15) {
            drop = Math.pow(lev, 7.5) * 8 / Math.pow(10, 12);
        } else {
            drop = 0;
        }

        if (lev <= 15) {
            age1 = ageee;
        }

        if (lev > 15) {
            age1 = age1 + (ageee - ageeeold) / (1 - drop * (ageee - ageeeold) * 16);
        }

        resyears = Math.floor(age1 + shtraf + 0.0089);
        resdays = Math.floor((age1 + shtraf - resyears + 0.0089) * 112);
        weekss = ((resyears * 112 + resdays) - (oldweek)) / 7;
        oldweek = resyears * 112 + resdays;

        if (resdays < 10) {
            resdays = '0' + resdays;
        }
        if (resyears > 31) {
            break;
        }


        results.push([lev, weekss.toFixed(1), resyears + "." + resdays]);
    }

    //create table with results
    $("#resultstable tbody tr").remove();
    var table = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
    var totalweeks = 0;
    for (i = 0; i < results.length; i++) {

        totalweeks += parseFloat(results[i][1]);
        var tr = document.createElement('tr');
        tr.setAttribute("class", "tooltipped");
        tr.setAttribute("data-position", "top");
        tr.setAttribute("data-tooltip", "Total Weeks: " + totalweeks.toFixed(1));

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');

        var text1 = document.createTextNode(results[i][0]);
        var text2 = document.createTextNode(results[i][1]);
        var text3 = document.createTextNode(results[i][2]);

        td1.appendChild(text1);
        td2.appendChild(text2);
        td3.appendChild(text3);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        table.appendChild(tr);
    }

    $('.tooltipped').tooltip();
}