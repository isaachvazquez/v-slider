/*==========================================================================
v_slider
==========================================================================

Project Name: v_slider
Author: Isaac Vazquez
Site: isaacv.net
License: MIT
Version: 2.0
Tested: Chrome


-----------------------------------------------------------------------------
Summary: Responsive Image Slider
-----------------------------------------------------------------------------
The v_slider Plugin counts the number of images contained in the
v_slider_container and creates all the necessary settings to make the slider
responsive for all image sizes and orientations.
-----------------------------------------------------------------------------
-----------------------------------------------------------------------------

**Notes**

Change all selectors to hav $el.find in front
fix all options. variables


var find_something = 'find';
$el[find_something]('img');


==========================================================================*/
(function($) {
  "use strict";

  // These locally scoped variables help minification by aliasing strings
  var data_key = 'v_slider_options', // Namespace plugin data
    event_suffix = '.v_slider_', // Namspace events
    class_prefix = '.v_slider-', // Namspace events


    // Custom events
    evt_component_initialized = 'component_initialized' + event_suffix, // Custom event when plugin is done initializing
    evt_modified = 'modified' + event_suffix;

  // Scope Methods
  var methods = {

    // Ran when plugin is initialized for setup
    init: function(settings) {

      var $el = $(this),
        // Options added here are defaults, if different values are passed when initiallized, these will be overridden
        options = $.extend({
          slide_selector: 'img',
          speed: 5000, //Default slide duration
          transition_speed: 1000, //Default transition speed
          paused: false, //Auto Play on page load
          fixed_container_height: null, //Change to specified px if you want a fixed height. Non responsive
          slider_width_px: null, //Default null so slider defaults with 100% and fits it's containing element. Non responsive
          slider_width_percent: 100, //Default Container Width
          full_width_links: false,
          max_slider_width: 1400,
        }, settings);

      //Plugin Variables
      options.elements = '';
      options.slider = $el;
      options.numberOfSlides = $el.children(options.slide_selector).length;
      options.currentSlide = 1;
      options.linkContainer = $el.find('' + class_prefix + 'links');
      options.numberOfLinks = $el.find('' + class_prefix + 'links').children('a').length; //Get the number of slides on the page.

      console.log('Number of Slides: ', options.numberOfSlides);
      console.log('Number of Links: ' + options.numberOfLinks);

      // Store data on the element for use later
      $el.data(data_key, options);

      //Initialize and Create all the plugin elements
      //===============================================
      console.log('==Initiallized==');
      methods._create_plugin_elements.apply(this);


      // Begin Timer
      //=============
      if (options.paused) {
        //do not start v_slider_timer
      } else {
        //start v_slider_timer
        var v_slider_timer = setInterval(function() {
          $el.v_slider('next_image');
        }, options.speed);
      }

      // Click events
      //==============
      $el.find('' + class_prefix + 'next_button').click(function() {
        window.clearInterval(v_slider_timer);
        $el.v_slider('next_image');
      });

      $el.find('' + class_prefix + 'back_button').click(function() {
        window.clearInterval(v_slider_timer);
        $el.v_slider('previous_image');
      });

      return $el;
    },

    _create_plugin_elements: function() {

      var $el = $(this),
        // Retrieve data stored on element
        options = $el.data(data_key);

      // ADD CLASS v_slider_image TO ALL IMAGES WITHIN v_slider_container
      //==========================================================================

      // Create CONTROLS
      //==================
      // <div class="v_slider_controls">
      //   <a href="#" data-action="back">
  		// 	 <img src="images/v-slider-left-arrow.png">
  		//   </a>
  		//   <a href="#" data-action="next">
  		// 		<img src="images/v-slider-right-arrow.png">
  		// 	</a>
  		// </div>


      // SET LINK STYLES
      //==================
      if (options.full_width_links == true) {
        // $el.find('' + class_prefix + 'links').addClass('full_width_links');
        // $el.find('' + class_prefix + 'next_button').addClass('test');
        // $el.find('' + class_prefix + 'back_button').addClass('test');
      }


      // ADD data-order attribute index to each image in v_slider
      //==========================================================================
      var tallestPortraitImageHeight = 0, //used later to set the height of container
        tallestPortraitImageWidth = 0,
        tallestLandscapeImageHeight = 0,
        tallestLandscapeImageWidth = 0,
        sliderHeight = null,
        aspectRatio = null,
        hasPortraitImages = false, // boolean value
        hasLandscapeImages = false, // boolean value
        sliderWidth = $el.width(); // Needs to be slider width

      console.log('Screen Width: ' + sliderWidth);
      console.log('V Slider Width: ' + sliderWidth);

      var imageIndex = 1;
      //Display first image in slider. (i.e. set opacity to 1)
      $el.children('img:nth-child(' + imageIndex + ')').addClass('v_active');


      //=============================================================
      //=============================================================
      //=============================================================
      for (var i = 0; i < options.numberOfSlides; i++) {
        $el.children('img:nth-child(' + imageIndex + ')').attr('data-order', imageIndex);

        //Check image size, and addClass('narrow')
        // Get on screen image
        //==========================================================================================
        var currentImage = $el.children('img:nth-child(' + imageIndex + ')');

        // Get accurate measurements from that.
        var imageWidth = currentImage.width(),
          imageHeight = currentImage.height();


        // Portrait/Landscape Test
        //=========================
        if (imageHeight < imageWidth) {
          var imageOrientation = 'landscape'
        } else
        if (imageHeight > imageWidth) {
          var imageOrientation = 'portrait'
          $el.children('img:nth-child(' + imageIndex + ')').addClass('narrow');
        }

        // Handle Landscape Image
        //========================
        if (imageOrientation == 'landscape' && imageHeight > tallestLandscapeImageHeight) {
          tallestLandscapeImageHeight = imageHeight;
          tallestLandscapeImageWidth = imageWidth;

          // Prints tallest image file name
          // console.log(currentImage.attr('src'));
          // console.log('Tallest Landscape Image Dimensions: ' + tallestLandscapeImageHeight + ' x ' + tallestLandscapeImageWidth);

          // Flag for later use
          hasLandscapeImages = true;
        }

        // Handle Portrait Image
        //=======================
        if (imageOrientation == 'portrait' && imageHeight > tallestPortraitImageHeight) {
          tallestPortraitImageHeight = imageHeight;
          tallestPortraitImageWidth = imageWidth;

          // Prints tallest image file name
          // console.log(currentImage.attr('src'));
          // console.log('Tallest Portrait Image Dimensions: ' + tallestPortraitImageHeight + ' x ' + tallestPortraitImageWidth);

          // Flag for later use
          hasPortraitImages = true;
        }

        // Set the Aspect Ratio & Slider Height
        //======================================
        if (hasPortraitImages && !hasLandscapeImages) {
          // This covers if there are only Portrait Oriented Images
          aspectRatio = tallestPortraitImageHeight / tallestPortraitImageWidth;
          sliderHeight = ((sliderWidth * aspectRatio) / 2);
          // console.log('Slider Height: ' + sliderHeight + 'px');
        } else {
          // This covers all other combinations
          aspectRatio = tallestLandscapeImageHeight / tallestLandscapeImageWidth;
          sliderHeight = sliderWidth * aspectRatio;
          // console.log('Slider Height: ' + sliderHeight + 'px');
        }
        console.log('Aspect Ratio: ' + aspectRatio);

        // TODO

        console.log('i: ' + i + ', imageIndex: ' + imageIndex);
        imageIndex++;
      } // End For Loop (Looping through images to get heights)


      //=============================================================
      //=============================================================
      //=============================================================
      // Check options.max_slider_width
      if (options.max_slider_width != null) {
        if (sliderWidth < options.max_slider_width) {
          //use parent width
          sliderWidth = $el.width();
        } else {
          sliderWidth = options.max_slider_width;
        }
        $el.css({ 'max-width': sliderWidth + 'px'});
      }else{
        // Default max-width for the image slider to the screen width
        sliderWidth = screen.width;
        $el.css({ 'max-width': sliderWidth + 'px'});
      }

      // Set Slider Width
      //==================
      // $el.css({ 'max-width': sliderWidth + 'px'});

      // Set Slider height
      //===================
      var sliderHeight = sliderWidth * aspectRatio;
      console.log(sliderHeight);
      $el.css({'height': sliderHeight + 'px'});


      //=============================================================
      //=============================================================
      //=============================================================
      // Window Resize Function
      //========================
      // Note: Update to use debounce
      var currentSliderHeight = null;
      $(window).resize(function() {
        // ========================================
        if ($(document).width() <= options.max_slider_width) {
          if (aspectRatio > 1) {
            currentSliderHeight = (($el.width() * aspectRatio) / 2);
            console.log('Slider Height: ' + currentSliderHeight + 'px');
          } else {
            currentSliderHeight = $el.width() * aspectRatio;
            console.log('Slider Height: ' + currentSliderHeight + 'px');
          }
         $el.css({'height': sliderHeight + 'px'});
          console.log('==============================');
        }
        // ========================================
        // if (options.max_slider_width === null) {
        //   console.log('max_slider_width not set');
        //
        // }
      });

      return $el;
    }, // END METHOD _create_plugin_elements

    // ====================
    // NEXT IMAGE FUNCTION
    // ====================
    next_image: function() {

      var $el = $(this),
        // Retrieve data stored on element
        options = $el.data(data_key);

      $el.children('[data-order="' + options.currentSlide + '"]').removeClass('v_active');

      // Increment options.currentSlide
      if (options.currentSlide < options.numberOfSlides && options.currentSlide > 0) {
        options.currentSlide = options.currentSlide + 1;
      } else {
        options.currentSlide = 1;
      }

      $el.children('[data-order="' + options.currentSlide + '"]').addClass('v_active');

      // console.log('options.currentSlide: ' + options.currentSlide);

      return $el;
    }, //END METHOD next_image

    // ====================
    // PREVIOUS IMAGE FUNCTION
    // ====================
    previous_image: function() {

      var $el = $(this),
        // Retrieve data stored on element
        options = $el.data(data_key);
      // console.log('Previous Image function FIRED!!');

      // Decrement options.currentSlide
      if (options.currentSlide > 1 && options.currentSlide <= options.numberOfSlides) {
        options.currentSlide = options.currentSlide - 1;
      } else {
        options.currentSlide = options.numberOfSlides;
      }

        // console.log('options.currentSlide: ' + options.currentSlide);

      return $el;
    }

  }; // END METHOD previous_image

  $.fn.v_slider = function(method) {
    /**
     * Used to prevent use of functions prefixed with an underscore
     * if a method is provided call that, otherwise treat it as an initiation
     * Do not edit below this
     **/
    var args = arguments;
    if (methods[method] && method.charAt(0) !== '_') {
      // jQuery.map() is used to return results properly
      return $(this).map(function(i, val) {
        return methods[method].apply(this, Array.prototype.slice.call(args, 1));
      });
    } else if (typeof method === 'object' || !method) {
      return $(this).map(function(i, val) {
        return methods.init.apply(this, args);
      });
    }
  };

})(jQuery);
