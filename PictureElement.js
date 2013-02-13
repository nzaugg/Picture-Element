/*! Picture Element - Responsive Images that work today. 
Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 
Modified by: Nate Zaugg to mimic the HTML spec more closely
*/

// Add support for picture element in IE6-8
document.createElement('picture');

(function( w ){
	
	// Enable strict mode
	"use strict";

	w.picturefill = function() {
		var ps = w.document.getElementsByTagName( "picture" );
		
		// Loop the pictures
		for( var i = 0, il = ps.length; i < il; i++ ){

			var sources = ps[ i ].getElementsByTagName( "source" ),
				matches = [];
		
			// See if which sources match
			for( var j = 0, jl = sources.length; j < jl; j++ ){
				var media = sources[ j ].getAttribute( "media" );
				// if there's no media specified, OR w.matchMedia is supported 
				if( !media || ( w.matchMedia && w.matchMedia( media ).matches ) ){
					matches.push( sources[ j ] );
				}
			}

			// Find any existing img element in the picture element
			var picImg = ps[ i ].getElementsByTagName( "img" )[ 0 ];

			if( matches.length ){			
				if( !picImg ){
				    picImg = w.document.createElement("img");

				    // Copy over any/all attributes (especially alt & class)
				    var attrs;
				    for (var a = 0, attrs = ps[i].attributes, l = attrs.length; a < l; a++) {
				        picImg.setAttribute([attrs.item(a).nodeName], attrs.item(a).nodeValue);
				    }

					ps[i].appendChild(picImg);
				}
				
				picImg.src =  matches.pop().getAttribute( "src" );
			}
			else if( picImg ){
				ps[ i ].removeChild( picImg );
			}
		}
	};
	
	// Run on resize and domready (w.load as a fallback)
	if( w.addEventListener ){
		w.addEventListener( "resize", w.picturefill, false );
		w.addEventListener( "DOMContentLoaded", function(){
			w.picturefill();
			// Run once only
			w.removeEventListener( "load", w.picturefill, false );
		}, false );
		w.addEventListener( "load", w.picturefill, false );
	}
	else if( w.attachEvent ){
		w.attachEvent( "onload", w.picturefill );
	}
	
}( this ));