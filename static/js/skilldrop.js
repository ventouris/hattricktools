var skilldropcalc = function() {
	var i = 1;
    var x = parseFloat(document.getElementById('skilllevel').value);
    var skilldrop = [x];

    while (x > 15.02) {
        x = x - Math.pow(x,7.5) * 8 / math.pow(10,12);
        skilldrop.push(x.toFixed(3));
        weeks.push(i);
        i++;
    }
}