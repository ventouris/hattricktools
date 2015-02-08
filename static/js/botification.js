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



var botificationcalc = function(ownerless) {
	
    var bot = false;
    var bottime = new Date(2014, 10, 25).getTime();

    while ( bot === false ) {
		

		if ( bottime + (1000 * 60 * 60 * 24) >= ownerless) {
			bot = true;
			datet = bottime;

		} else if (bottime + (1000 * 60 * 60 * 24 * 49) >= ownerless) {
			bot = true;
			datet = bottime + (1000 * 60 * 60 * 24 * 49);

		} else if (bottime + (1000 * 60 * 60 * 24 * 98) >= ownerless) {
			bot = true;
			datet = bottime + (1000 * 60 * 60 * 24 * 98);

		} else if (bottime + (1000 * 60 * 60 * 24 * 106) >= ownerless) {
   			bot = true;
   			datet = bottime + (1000 * 60 * 60 * 24 * 106);

  		}

		bottime = bottime + (1000 * 60 * 60 * 24 * 112);  	
	}

	if ( ownerless === datet ) {
		datet = new Date(datet);
		return datet.getDate() + "/" + (datet.getMonth() + 1) + "/" + datet.getFullYear() + "  -  " + botificationcalc(ownerless + (1000*60*60*24));  

	} else {
 	
		datet = new Date(datet)
		return datet.getDate() + "/" + (datet.getMonth() + 1) + "/" + datet.getFullYear();   
	
	}
}


var botification = function() {

	$input = $('.datepicker').pickadate();
	var picker = $input.pickadate('picker');
	var lastlogin = picker.get('select').pick;

	var ownerless = lastlogin + (1000 * 60 * 60 * 24 * 49);
	var res1 = new Date(ownerless);

	var tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
	
	last = new Date(lastlogin);

	tableobj.rows[0].cells[0].innerHTML = last.getDate() + "/" + (last.getMonth() + 1) + "/" + last.getFullYear();
	tableobj.rows[0].cells[1].innerHTML = res1.getDate() + "/" + (res1.getMonth() + 1) + "/" + res1.getFullYear();
	tableobj.rows[0].cells[2].innerHTML = botificationcalc( ownerless );
}

var botification2 = function(last,ownerlesstr) {
	if (last === "0001-01-01") {
		var ownerless = new Date()
		var res1 = ownerlesstr;
		last = "";

	} else {
		var lastlogin = new Date(last).getTime();
		var ownerless = lastlogin + (1000 * 60 * 60 * 24 * 49);
		var res1 = new Date(ownerless);
		res1 = res1.getDate() + "/" + (res1.getMonth() + 1) + "/" + res1.getFullYear();

		last = new Date(last);
		last = last.getDate() + "/" + (last.getMonth() + 1) + "/" + last.getFullYear();
	}
	

	var tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
	
	tableobj.rows[0].cells[0].innerHTML = last;
	tableobj.rows[0].cells[1].innerHTML = res1;
	tableobj.rows[0].cells[2].innerHTML = botificationcalc( ownerless );
}

var today = new Date().getTime();

if ( today === botificationcalc(today) ) {
	$("#message2").show();
	$("#message2").append( "<b> " + botificationcalc(today + (1000 * 60 * 60 * 24)) + "</b>" );
	} else {
	$("#message1").show();
	$("#message1").append( "<b> " + botificationcalc(today) + "</b>" );
}
