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

  


var fancalc = function() {

	var fans_number = parseInt(document.getElementById('fans').value);
    var fans_mood = parseInt(document.getElementById('fansmood-value').value);
   
    if (fans_mood === 0) {
    	var coef = 10;	
    } else if (fans_mood === 1) {
    	var coef = 11.3;
    } else if (fans_mood === 2) {
    	var coef = 12.6;
    } else if (fans_mood === 3) {
    	var coef = 13.9;
    } else if (fans_mood === 4) {
    	var coef = 15.2;
    } else if (fans_mood === 5) {
    	var coef = 16.5;
    } else if (fans_mood === 6) {
    	var coef = 17.8;
    } else if (fans_mood === 7) {
    	var coef = 19.1;
    } else if (fans_mood === 8) {
    	var coef = 20.4;
    } else if (fans_mood === 9) {
    	var coef = 21.7;
    } else if (fans_mood === 10) {
    	var coef = 23;
    } else if (fans_mood === 11) {
    	var coef = 24.3;
    }

    var total_fan = fans_number * coef;
    var terraces = parseInt(0.6 * total_fan);
    var basic = parseInt(0.235 * total_fan);
    var roof = parseInt(0.14 * total_fan);
    var vip = parseInt(0.025 * total_fan);

    var income = Math.ceil(7 * terraces + 10 * basic + 19 * roof + 35 * vip);
    var weekly_cost = Math.ceil(0.5 * terraces + 0.7 * basic + roof + 2.5 * vip);

    var tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
    realterraces = tableobj.rows[0].cells[1].innerHTML;
    realbasic = tableobj.rows[1].cells[1].innerHTML;
    realroof = tableobj.rows[2].cells[1].innerHTML;
    realvip = tableobj.rows[3].cells[1].innerHTML;
    realtotal = tableobj.rows[4].cells[1].innerHTML;

    if (realterraces != "") {
        var newterrances = terraces - realterraces;
        var newbasic = basic - realbasic;
        var newroof = roof - realroof;
        var newvip = vip - realvip;

        tableobj.rows[0].cells[2].innerHTML = newterrances;
        tableobj.rows[1].cells[2].innerHTML = newbasic;
        tableobj.rows[2].cells[2].innerHTML = newroof;
        tableobj.rows[3].cells[2].innerHTML = newvip;
        tableobj.rows[4].cells[2].innerHTML = (terraces + basic + roof + vip) - realtotal;
        tableobj.rows[7].cells[2].innerHTML = constructioncost(newterrances, newbasic , newroof, newvip) + "€";
    }

    tableobj.rows[0].cells[3].innerHTML = terraces;
    tableobj.rows[1].cells[3].innerHTML = basic;
    tableobj.rows[2].cells[3].innerHTML = roof;
    tableobj.rows[3].cells[3].innerHTML = vip;
    tableobj.rows[4].cells[3].innerHTML = terraces + basic + roof + vip;
    tableobj.rows[5].cells[3].innerHTML = income + "€";
    tableobj.rows[6].cells[3].innerHTML = weekly_cost + "€";



};


var sizecalc = function() {
	var fans_number = parseInt(document.getElementById('fans').value);
    var fan_mood =  parseInt(document.getElementById('fansmood-value').value);
    var totalsize = parseFloat(document.getElementById('arenasize').value);
    var terper = parseFloat(document.getElementById('terper').value);
    var basper = parseFloat(document.getElementById('basper').value);
    var roofper = parseFloat(document.getElementById('roofper').value);
    var vipper = parseFloat(document.getElementById('vipper').value);
            
    var terraces = Math.round(terper / 100 * totalsize);
    var basic = Math.round(basper / 100 * totalsize);
    var roof = Math.round(roofper / 100 * totalsize);
    var vip = Math.round(vipper / 100 * totalsize);

    var dif = totalsize - (terraces + basic + roof + vip)
    if ( dif !== 0) {
        vip += dif
    }
        
    var income = Math.ceil(7 * terraces + 10 * basic + 19 * roof + 35 * vip);
    var weekly_cost = Math.ceil(0.5 * terraces + 0.7 * basic + roof + 2.5 * vip);

    var tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
    realterraces = tableobj.rows[0].cells[1].innerHTML;
    realbasic = tableobj.rows[1].cells[1].innerHTML;
    realroof = tableobj.rows[2].cells[1].innerHTML;
    realvip = tableobj.rows[3].cells[1].innerHTML;
    realtotal = tableobj.rows[4].cells[1].innerHTML;

    if (realterraces != "") {
        var newterrances = terraces - realterraces;
        var newbasic = basic - realbasic;
        var newroof = roof - realroof;
        var newvip = vip - realvip;

        tableobj.rows[0].cells[2].innerHTML = newterrances;
        tableobj.rows[1].cells[2].innerHTML = newbasic;
        tableobj.rows[2].cells[2].innerHTML = newroof;
        tableobj.rows[3].cells[2].innerHTML = newvip;
        tableobj.rows[4].cells[2].innerHTML = (terraces + basic + roof + vip) - realtotal;
        tableobj.rows[7].cells[2].innerHTML = constructioncost(newterrances, newbasic , newroof, newvip) + "€";
    }

    tableobj.rows[0].cells[3].innerHTML = terraces;
    tableobj.rows[1].cells[3].innerHTML = basic;
    tableobj.rows[2].cells[3].innerHTML = roof;
    tableobj.rows[3].cells[3].innerHTML = vip;
    tableobj.rows[4].cells[3].innerHTML = terraces + basic + roof + vip;
    tableobj.rows[5].cells[3].innerHTML = income + "€";
    tableobj.rows[6].cells[3].innerHTML = weekly_cost + "€";
}


var constructioncost = function(terraces,basic,roof,vip) {
    var sumi = 10000

    if (terraces > 0){
        sumi += Math.abs(terraces)*45
    } else {
        sumi += Math.abs(terraces)*6
    }

    if (basic > 0){
        sumi += Math.abs(basic)*75
    } else {
        sumi += Math.abs(basic)*6
    }

    if (roof > 0){
        sumi += Math.abs(roof)*90
    } else {
        sumi += Math.abs(roof)*6
    }

    if (vip > 0){
        sumi += Math.abs(vip)*300
    } else {
        sumi += Math.abs(vip)*6
    }
                                 
    return sumi                       
                             
}

