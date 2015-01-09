var trainingintensity = function() {

	var TIbefore = parseFloat(document.getElementById('TIbefore').value);
    var TSbefore = parseFloat(document.getElementById('TSbefore').value);
    var TIafter = parseFloat(document.getElementById('TIafter').value);
    var TSafter = parseFloat(document.getElementById('TSafter').value);

	if (document.getElementById('TI').checked) {

		TSafter = (TSbefore * Math.pow(1.2, Math.log(TIafter * 1/ TIbefore, 0.7))).toFixed(2);

		if (TSafter > 10) {
			TSafter = 10;
		}

	} else if (document.getElementById('TS').checked) {
		
		TIafter = Math.floor(TIbefore * math.pow(TSafter * 1 / TSbefore, Math.log(0.7,1.2)));
	}

}