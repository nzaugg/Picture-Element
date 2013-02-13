/* 
Picture Element - Responsive Images that work today. 
Author: Scott Jehl, Filament Group, 2012
Modified by: Nate Zaugg to mimic the HTML spec more closely

License: MIT/GPLv2 
*/

// Add support for picture element in IE6-8
document.createElement('picture');

(function(w){
	
	// Enable strict mode
	"use strict";

	w.pictureElement = function() {
		var ps = w.document.getElementsByTagName('picture');
		
		// Loop the pictures
		for (var i = 0; i < ps.length; i++) {

			var sources = ps[i].getElementsByTagName('source'),
				matches = [];
		
			// See if which sources match
			for (var j = 0; j < sources.length; j++){
				var media = sources[j].getAttribute('media');
				// if there's no media specified, OR w.matchMedia is supported 
				if (!media || (w.matchMedia && w.matchMedia(media).matches)) {
					matches.push(sources[j]);
				}
			}

			// Find any existing img element in the picture element
			var picImg = ps[i].getElementsByTagName('img')[0];

			if (matches.length) {
				if (!picImg){
				    picImg = w.document.createElement('img');

				    // Copy over any/all attributes (especially alt & class)
				    var attrs = ps[i].attributes;
				    for (var a = 0; a < attrs.length; a++) {
				        picImg.setAttribute([attrs.item(a).nodeName], attrs.item(a).nodeValue);
				    }

					ps[i].appendChild(picImg);
				}
				
				picImg.src =  matches.pop().getAttribute('src');
			}
			else if (picImg) {
				ps[i].removeChild(picImg);
			}
		}
	};
	
	// Run on resize and domready (w.load as a fallback)
	if (w.addEventListener) {
		w.addEventListener('resize', w.pictureElement, false);
		w.addEventListener('DOMContentLoaded', function(){
			w.pictureElement();
			// Run once only
			w.removeEventListener('load', w.pictureElement, false);
		}, false );
		w.addEventListener('load', w.pictureElement, false);
	}
	else if (w.attachEvent) {
		w.attachEvent('onload', w.pictureElement);
	}
	
}( this ));