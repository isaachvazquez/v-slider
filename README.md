# v-slider
Unfinished.

### Requirements
* jQuery

### Usage

#### HTML

Add the below HTML to any container you wish to add the v_slider to

	<div class="v_slider">
		<!-- <div class="v_slider_links">
			Add links with text to have a button link show up on the slider with each slide
			<a href="http://www.example.com">www.example.com</a>
	    ...
	  	...
	  	...
			<a href="http://www.example.com">www.example.com</a>

			Remove the text from the links and add (full_width_links : true) to your main.js file to make the links full width.
			<a href="http://www.example.com"></a>
	    ...
	  	...
	  	...
			<a href="http://www.example.com"></a>
		</div> -->
		<img src="..path/to/image.jpg">
		...
		...
		...
		<img src="..path/to/image.jpg">
	  <div class="v_slider_controls">
			<a href="#" data-action="previous" class="v_slider_back_button">
			 <img src="images/v-slider-left-arrow.png">
		  </a>
		  <a href="#" data-action="next" class="v_slider_next_button">
				<img src="images/v-slider-right-arrow.png">
	 		</a>
		</div>
	</div>


#### CSS


Add the v_slider stylesheet to the <head></head> section of your html file above your custom stylesheets.

	<link rel="stylesheet" href="path/to/v_slider_styles.css">


#### Javascript/JQuery

Add the v_slider js file to your html just above the closing body tag
and above your main javascript file.

	<script src="path/to/v_slider.js"></script>
	<script>
		// Most basic usage
		$('.slider-name').v_slider();
		
		// Using plugin options
		$('.slider-name').v_slider({
			max_slider_width: 600,
			logging: true,
			paused: true
		});
	</script>


## TODO:
* Ability for linkable slides (Full width & buttons).
* Ability to add custom control arrows.
* Update Requirements section with all necessary & correct requirements.
* Figure out list of compatible browsers & devices.
* Instructions for
	* Overriding/Customizing css:
		* Buttons
		* Slider appearance
		* etc
* ...

