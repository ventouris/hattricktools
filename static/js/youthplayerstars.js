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


    $("#positionselect").change(function(){
            $( "#positionselect option:selected").each(function(){
                if($(this).attr("value")=="gk"){
                    $(".box").hide();
                    $(".gk").slideToggle( "slow" );
                }
                if($(this).attr("value")=="cdnorm"){
                    $(".box").hide();
                    $(".cdnorm").slideToggle( "slow" );
                }

                if($(this).attr("value")=="cdoff"){
                    $(".box").hide();
                    $(".cdoff").slideToggle( "slow" );
                }

                if($(this).attr("value")=="cdtw"){
                    $(".box").hide();
                    $(".cdtw").slideToggle( "slow" );
                }

                 if($(this).attr("value")=="wbnorm"){
                    $(".box").hide();
                    $(".wbnorm").slideToggle( "slow" );
                }

                 if($(this).attr("value")=="wboff"){
                    $(".box").hide();
                    $(".wboff").slideToggle( "slow" );
                }

                 if($(this).attr("value")=="wbdef"){
                    $(".box").hide();
                    $(".wbdef").slideToggle( "slow" );
                }

                 if($(this).attr("value")=="wbtm"){
                    $(".box").hide();
                    $(".wbtm").slideToggle( "slow" );
                }

                 if($(this).attr("value")=="winnorm"){
                    $(".box").hide();
                    $(".winnorm").slideToggle( "slow" );
                }

                 if($(this).attr("value")=="winoff"){
                    $(".box").hide();
                    $(".winoff").slideToggle( "slow" );
                }

                 if($(this).attr("value")=="wintm"){
                    $(".box").hide();
                    $(".wintm").slideToggle( "slow" );
                }

                 if($(this).attr("value")=="windef"){
                    $(".box").hide();
                    $(".windef").slideToggle( "slow" );
                }

                 if($(this).attr("value")=="imnorm"){
                    $(".box").hide();
                    $(".imnorm").slideToggle( "slow" );
                }

                 if($(this).attr("value")=="imoff"){
                    $(".box").hide();
                    $(".imoff").slideToggle( "slow" );
                }

                 if($(this).attr("value")=="imtw"){
                    $(".box").hide();
                    $(".imtw").slideToggle( "slow" );
                }

                 if($(this).attr("value")=="imdef"){
                    $(".box").hide();
                    $(".imdef").slideToggle( "slow" );
                }

                 if($(this).attr("value")=="fwnorm"){
                    $(".box").hide();
                    $(".fwnorm").slideToggle( "slow" );
                }

                 if($(this).attr("value")=="fwtw"){
                    $(".box").hide();
                    $(".fwtw").slideToggle( "slow" );
                }

                 if($(this).attr("value")=="fwdef"){
                    $(".box").hide();
                    $(".fwdef").slideToggle( "slow" );
                }
                
            });
        }).change();

    $('table tr:not(table tr:first) td:first-child').each(function () {

        var starsnum = $(this).html()
        var stars = $(this).html().split('.');

        var bigstars = parseInt(stars[0]/5)
        var smallstars = stars[0]-bigstars*5
        var halfstars = stars[1]

        $(this).html("")
        for (var i = 0; i < bigstars;  i++) {
           $(this).append('<img src="/static/images/star_big_blue.png">');
        };
        for (var i = 0; i<smallstars; i++) {
           $(this).append('<img src="/static/images/star_blue.png">');
        };
        if (halfstars == 5)  {
           $(this).append('<img src="/static/images/star_half_blue.png">');
        };
        $(this).attr('title', starsnum)
});  
