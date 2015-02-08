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


function totalexperiencecalc(){

        var sumAttr1 = null;
        var bestProductName = null;
        var maxScorePart = null;

        $('input:checkbox:checked').each(function() {
          var experience = parseInt($(this).attr('experience'));
          sumAttr1 += experience;
        });

        $('input:checkbox:checked').each(function() {
            var experience = parseInt($(this).attr('experience'));
            var leadership = parseInt($(this).attr('leadership'));
            var currentScorePart = (sumAttr1 + experience) / 12 * (1 - (7 - leadership)/ 20);
            if(currentScorePart > maxScorePart) {
              maxScorePart = currentScorePart;
              bestProductName = $(this).attr('playername');
            }
        });

        var tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
        tableobj.rows[0].cells[0].innerHTML = Math.round(maxScorePart * 100) / 100;
        tableobj.rows[0].cells[1].innerHTML = bestProductName;  

        return false;
}