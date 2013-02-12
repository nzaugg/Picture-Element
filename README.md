# Picture Element

A Responsive Images approach that you can use today, that mimics the [proposed picture element](http://www.w3.org/community/respimg/wiki/Picture_Element_Proposal).

* Based on Picturefill by Scott Jehl
* License: MIT/GPLv2

**Demo URL:** [https://github.com/nzaugg/Picture-Element](https://github.com/nzaugg/Picture-Element)

**Note:** Picture Element works best in browsers that support CSS3 media queries. 
It includes the [matchMedia polyfill](https://github.com/paulirish/matchMedia.js/) 
which makes matchMedia work in `media-query`-supporting browsers that don't have 
`matchMedia`, or at least allows media types to be tested in most any browser. 
`matchMedia` and the `matchMedia` polyfill are not required for `picturefill` 
to work, but they are required to support the `media` attributes on `picture` `source` elements.

## Size and delivery

Currently, `PictureElement.js` compresses to around 498bytes (~0.5kb), after minify and gzip. 
To minify, you might try these online tools: [Uglify]:(http://marijnhaverbeke.nl/uglifyjs), 
[Yahoo Compressor]:(http://refresh-sf.com/yui/), or [Closure Compiler](http://closure-compiler.appspot.com/home). Serve with gzip compression.

## Markup pattern and explanation

Mark up your responsive images like this. 

```html
	<picture alt="A giant stone face at The Bayon temple in Angkor Thom, Cambodia">
		<source src="small.jpg" />
		<source src="medium.jpg"     media="(min-width: 400px)" />
		<source src="large.jpg"      media="(min-width: 800px)" />
		<source src="extralarge.jpg" media="(min-width: 1000px)" />

		<!-- Fallback content for non-JS browsers. Same img src as the initial, unqualified source element. -->
		<noscript>
			<img src="external/imgs/small.jpg" alt="A giant stone face at The Bayon temple in Angkor Thom, Cambodia">
		</noscript>
	</picture>
```

Each `source` element’s `media` attribute accepts any and all CSS3 media queries—such as `min` or `max` width, or even `min-device-pixel-ratio` for HD (retina) displays. 

### Explained...

Notes on the markup above...

* The `picture` element's `alt` attribute is used as alternate text for the generated `img` element.
* The `picture` element can have any number of `source` elements. The above example may contain more than the average situation would call for.
* Each `source` element must have a `src` attribute specifying the image path. 
* It's generally a good idea to include one source element with no `media` qualifier, so it'll apply everywhere.
* Each `source` element can have an optional `media` attribute to make it apply in different media settings. Both media types and queries can be used, like any `media` attribute, but support for media queries depends on the browser (unsupporting browsers fail silently).
* The `MatchMedia.js` polyfill (included) is necessary to support the `media` attribute across browsers, even in browsers that support media queries, although it is becoming more widely supported in new browsers.
* The `noscript` element wraps the fallback image for non-JavaScript environments, and including this wrapper prevents browsers from fetching the fallback image during page load (causing unnecessary overhead). Generally, it's a good idea to reference a small image here, as it's likely to be loaded in older/underpowered mobile devices.
	
### HD Media Queries

Picturefill natively supports HD(Retina) image replacement.  While numerous other solutions exist, picturefill has the added benefit of performance for the user in only getting served one image.

* The `media` attribute supports [compound media queries](https://developer.mozilla.org/en-US/docs/CSS/Media_queries), allowing for very specific behaviors to emerge.  For example, a `data-media="(min-width: 400px) and (min-device-pixel-ratio: 2.0)` attribute can be used to serve a higher resolution version of the source instead of a standard definition image. Note you currently also need to add the `-webkit-min-device-pixel-ratio` prefix (e.g. for iOS devices).

```html
	<picture alt="A giant stone face at The Bayon temple in Angkor Thom, Cambodia">
		<source src="small.jpg" />
		<source src="small.jpg"         media="(min-device-pixel-ratio: 2.0)" />
		<source src="medium.jpg"        media="(min-width: 400px)" />
		<source src="medium_x2.jpg"     media="(min-width: 400px) and (min-device-pixel-ratio: 2.0)" />
		<source src="large.jpg"         media="(min-width: 800px)" />
		<source src="large_x2.jpg"      media="(min-width: 800px) and (min-device-pixel-ratio: 2.0)" />
		<source src="extralarge.jpg"    media="(min-width: 1000px)" />
		<source src="extralarge_x2.jpg" data-media="(min-width: 1000px) and (min-device-pixel-ratio: 2.0)" />

		<!-- Fallback content for non-JS browsers. Same img src as the initial, unqualified source element. -->
		<noscript>
			<img src="external/imgs/small.jpg" alt="A giant stone face at The Bayon temple in Angkor Thom, Cambodia">
		</noscript>
	</picture>
```

* Note: Supporting this many breakpoints quickly adds size to the DOM and increases implementation and maintenance time, so use this technique sparingly.

### Supporting IE Desktop

Internet Explorer 8 and older have no support for CSS3 Media Queries, so in the examples above, IE will receive the first `src`
 image reference (or the last one it finds that has no `media` attribute. If you'd like to serve a larger image to IE desktop
browsers, you might consider using conditional comments, like this:

```html
	<picture alt="A giant stone face at The Bayon temple in Angkor Thom, Cambodia">
		<source src="small.jpg" />
		<source src="medium.jpg" media="(min-width: 400px)" />

		<!--[if (lt IE 9) & (!IEMobile)]>
		    <source src="medium.jpg" />
		<![endif]-->

		<!-- Fallback content for non-JS browsers. Same img src as the initial, unqualified source element. -->
		<noscript>
			<img src="small.jpg" alt="A giant stone face at The Bayon temple in Angkor Thom, Cambodia">
		</noscript>
	</picture>
```

## Support

Picture Element supports a broad range of browsers and devices (there are currently no known unsupported browsers), provided that you stick with the markup conventions provided.

