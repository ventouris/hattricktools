var fancalc = function() {

	var fans_number = parseInt(document.getElementById('fans_number').value);
    var fans_mood = parseInt(document.getElementById('fans_mood').value);
   
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
    var terraces = 0.6 * total_fan;
    var basic = 0.235 * total_fan;
    var roof = 0.14 * total_fan;
    var vip = 0.025 * total_fan;

    var income = Math.ceil(7 * terraces + 10 * basic + 19 * roof + 35 * vip);
    var weekly_cost = Math.ceil(0.5 * terraces + 0.7 * basic + roof + 2.5 * vip);
};


var sizecalc = function() {
	var fans_number = parseInt(document.getElementById('fans_number').value);
    var fan_mood =  parseInt(document.getElementById('fans_mood').value);
    var totalsize = parseFloat(document.getElementById('totalsize').value);
    var terper = parseFloat(document.getElementById('terper').value);
    var basper = parseFloat(document.getElementById('basper').value);
    var roofper = parseFloat(document.getElementById('roofper').value);
    var vipper = parseFloat(document.getElementById('vipper').value);
            
    var terraces = terper / 100 * totalsize;
    var basic = basper / 100 * totalsize;
    var roof = roofper / 100 * totalsize;
    var vip = vipper / 100 * totalsize;
        
    var income = Math.ceil(7 * terraces + 10 * basic + 19 * roof + 35 * vip);
    var weekly_cost = Math.ceil(0.5 * terraces + 0.7 * basic + roof + 2.5 * vip);
}