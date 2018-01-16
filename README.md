# vslider

Work in progress.

### Requirements

### Usage

#### HTML

Add the below HTML to any container you wish to add the vslider to

	 <div class="vslider slider2">
	  <div class="vslider-items">
	    <img src="image.jpg">
	    <img src="image.jpg">
	    <img src="image.jpg">
	  </div>
	  <button class="vslider-button js-vslider-previous">Previous</button>
	  <button class="vslider-button js-vslider-next">Next</button>
	 </div>


#### CSS


Add the vslider stylesheet to the head section of your html file above your custom stylesheets.

	<link rel="stylesheet" href="path/to/vslider.css">


#### Javascript

Add the vslider js file to your html just above the closing body tag
and above your main javascript file.

	 <script src="path/to/vslider.js"></script>
	 <script>
	 // Most basic usage
	 var el = vs_getAll('.slider1').vs_first();
	 var vs1 = new VSlider(el, {});

	 // Using plugin options
	 var el = vs_getAll('.slider1').vs_first();
	 var vs1 = new VSlider(el, {
	  option1: value,
	  option2: value
	 });
	 </script>


## TODO:
* Ability for linkable slides (Full width & buttons).
* Ability to add custom control arrows.
* Ability to have button controls like sportsmenforgod.org.
* Update Requirements section with all necessary & correct requirements.
* Figure out list of compatible browsers & devices.
* ...
