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


var skilldropcalc = function(level,skilldropstr, skilllevel, weekstr) {
	var i = 1;
    var x = parseFloat(document.getElementById('skilllevel-value').value);
    var skilldrop = [x];
    weeks = [];

    while (x > 15.02) {
        x = x - Math.pow(x,7.5) * 8 / Math.pow(10,12);
        skilldrop.push(parseFloat(x.toFixed(3)));
        weeks.push(i);
        i++;
    }

    for (j = 0; j < weeks.length; j++) {
    	var table = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
    	var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');

        var text1 = document.createTextNode(weeks[j]);
        var text2 = document.createTextNode(skilldrop[j]);

        td1.appendChild(text1);
        td2.appendChild(text2);

        tr.appendChild(td1);
        tr.appendChild(td2);

        table.appendChild(tr);
    }

    $('#resultstable').dataTable({
        "sDom": 'l<"clear">tp',
        "bJQueryUI": true,
        "bSort": false,
        "sPaginationType": "full_numbers",
        "bLengthChange": false,
        "bDestroy": true,
        "sPaginationType":"full_numbers",
        "oLanguage": {
      		"oPaginate": {
        		"sFirst": "<img src='/static/images/transparent.gif' class='fg-button first_button'/>",
        		"sLast": "<img src='/static/images/transparent.gif' class='fg-button last_button'/>",
        		"sNext": "<img src='/static/images/transparent.gif' class='fg-button next_button'/>",
        		"sPrevious": "<img src='/static/images/transparent.gif' class='fg-button previous_button'/>"
      		}
  		}
    });

    $('#container').show();
    $('#container').highcharts({
                  title: {
                      useHTML: true,
                      text: skilldropstr,
                      x: -20 //center
                  },
                
                  yAxis: {
                      title: {
                          useHTML: true,
                          text: skilllevel
                      },
                      plotLines: [{
                          value: 0,
                          width: 1,
                          color: '#808080'
                      }]
                  },
      
                   xAxis: {
                      title: {
                          useHTML: true,
                          text: weekstr
                      }},

                  series: [{
                  	  name: level,
                      data: skilldrop
                  }]
              });

}