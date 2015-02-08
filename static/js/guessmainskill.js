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


var guessmainskillcalc = function(skill) {
    
    var age = parseInt(document.getElementById('age-value').value);
    var wage = parseFloat(document.getElementById('wage').value);
    var dropdown = document.getElementById('skill');
    var mainskill = dropdown.options[dropdown.selectedIndex].value;
    

    if ( age > 28 ) {
        main_wage = (wage-250)*(10.0/(38-Math.min(age,37)))
    } else {
        main_wage = wage-250
    }

    if ( mainskill === "Keeper" ) {
        if ( main_wage > 20000 ) {
            sublevel = ((Math.log((((main_wage+250)+1818.37)/635))/0.247734)+1)
        } else {
            sublevel = ((Math.log((((main_wage+250)-84.18)/130.8))/0.352008)+1)
        }
    }    
    if ( mainskill === "Defender" ) {
        sublevel = (Math.pow(((Math.min(main_wage,20000)+Math.max(((main_wage-20000)/0.8),0))/0.00083),(1/6.4))+1)
    }
    if ( mainskill === "Playmaker" ) {
        sublevel = (Math.pow(((Math.min(main_wage,20000)+Math.max(((main_wage-20000)/0.8),0))/0.00104),(1/6.4))+1)
    }
    if ( mainskill === "Scorer" ) {
        sublevel = (Math.pow(((Math.min(main_wage,20000)+Math.max(((main_wage-20000)/0.8),0))/0.000935),(1/6.4))+1)
    }
    if ( mainskill === "Winger" ) {
        sublevel = (Math.pow(((Math.min(main_wage,20000)+Math.max(((main_wage-20000)/0.8),0))/0.000525),(1/6.4))+1)
    }
    if ( mainskill === "Passer" ) {
        sublevel = (Math.pow(((Math.min(main_wage,20000)+Math.max(((main_wage-20000)/0.8),0))/0.000605),(1/6.4))+1)
    }

    /**create table with results**/
    var tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
    tableobj.rows[0].cells[0].innerHTML = skill;
    tableobj.rows[0].cells[1].innerHTML = sublevel.toFixed(2);
}