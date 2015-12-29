# v-slider
Work in progress.

### Requirements
* jQuery 1.10.2

### Usage

#### HTML

Add the below HTML to any container you wish to add the v_slider to

	<div class="v_slider">
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


Add the v_slider stylesheet to the head section of your html file above your custom stylesheets.

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
* Ability to have button controls like sportsmenforgod.org.
* Update Requirements section with all necessary & correct requirements.
* Figure out list of compatible browsers & devices.
* Instructions for
	* Overriding/Customizing css:
		* Buttons
		* Slider appearance
		* etc
* ...
