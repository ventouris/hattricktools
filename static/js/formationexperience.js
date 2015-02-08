 /* ========================================================================
 * HT-Tools Hattrick Manager Assistant 
 *
 * Copyright 2014-2015 Ventouris Anastasios
 * Licensed under GPL v3
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * ======================================================================== */


function addformation(){
    var form = $('#addform :selected').text();
    var lvl = $('#addlevel').val();

    if ( lvl > 10.3 ) {
    	lvl = "10.3";
    } else if ( lvl < 3 ) {
    	lvl = "3";
    }

    var bar = document.getElementById('progressbar'+(form));
    bar.innerHTML = lvl.concat("/10");

    var m = lvl*10;
    var width = m + "%";
    
    bar.setAttribute("style","width:".concat(width));
    
    bar.setAttribute( "value", lvl );
}

function resetformation() {
	var lines = ["5-5-0", "5-4-1", "5-3-2", "5-2-3", "4-5-1", "4-4-2", "4-3-3", "3-5-2", "3-4-3", "2-5-3"];
	
	for (var i=0; i < lines.length; i++) {
		var bar = document.getElementById('progressbar'+lines[i]);
    	bar.innerHTML = "3/10";

   
    	bar.setAttribute("style","width: 30%");
    
    	bar.setAttribute( "value", "3" );
	}

    $('#teams')[0].selectedIndex = 0;;
}

function formationexperiencecalc() {
	var minutes = document.getElementsByName("minutes");
	var formations = document.getElementsByName("formation");

	var lines = ["5-5-0", "5-4-1", "5-3-2", "5-2-3", "4-5-1", "4-4-2", "4-3-3", "3-5-2", "3-4-3", "2-5-3"];
	result = {};

	for (var i=0; i < lines.length; i++) {
		var bar = document.getElementById('progressbar'+lines[i]);
		result[lines[i]] = parseFloat(bar.getAttribute( "value" ));

	}
	
	minut = [];
	for ( i = 0; i < minutes.length; i++ ){
		if ( minutes[i].value ) {
			v = minutes[i].value;
		} else {
			v = 0;
		}
		minut.push(parseInt(v));
	}

	formation = [];
	for ( j = 0; j < formations.length; j++ ){
		formation.push(formations[j].options[formations[j].selectedIndex].text);
	}


	if ( minut[3] === 0 && minut[4] === 0 && minut[5] === 0 ) {
        week = 0;
	}
    else if ( minut[6] === 0 && minut[7] === 0 && minut[8] === 0 ) {
        week = 1;
    }
    else if ( minut[9] === 0 && minut[10] === 0 && minut[11] === 0 ) {
        week = 2
    }
    else {
        week = 3;
    }

    var flag = 0;
    var end = minut.slice(0, week*3+3);

    for ( i = 0; i < end.length; i++ ) {

        if ( result[formation[i]] > 8 ) { 
            result[formation[i]] += minut[i]*1.35/90
        }

        else if ( (result[formation[i]] + minut[i]*2.7/90) > 8 && result[formation[i]] < 8 ) {
            x = (8-result[formation[i]])*90/2.7
            result[formation[i]] += x*2.7/90
            result[formation[i]] += (minut[i]-x)*1.35/90
        }
        else {
            result[formation[i]] += minut[i]*2.7/90
        }

        for ( var j in result ) {
            if ( result[j] < 3.5 ) {
                result[j] = 3
            }
            else if ( result[j] > 10.3 ) {
                result[j] = 10.3
            }
        }
      
        if ( flag === 2 || flag === 5 || flag === 8 || flag === 11 ) {
             for ( var j in result ) {
                if ( result[j] ===  3 ) {
                    continue;
                }
                else if ( result[j] < 8 ) {
                    result[j] -= 0.3
                }
                else {
                    result[j] -= 0.15
       			}		
       		}
    	}
        flag += 1

	}

	for (var i=0; i < lines.length; i++) {
		var bar = document.getElementById('progressbar'+lines[i]);
		lvl = result[lines[i]];

		bar.innerHTML = lvl.toFixed(1) + "/10";

    	var m = lvl*10;
    	var width = m + "%";
    
    	bar.setAttribute("style","width:".concat(width));
    
    	bar.setAttribute( "value", lvl );

	}
    
};