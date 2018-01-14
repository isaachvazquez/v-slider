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
Any event handlers should follow the pattern:
=> $el.on('eventName', 'selector', function(){});
instead of,
=> $(body).on('eventName', 'selector', function(){});

==========================================================================*/

// (function($) {
//   "use strict";

//   // These locally scoped variables help minification by aliasing strings
//   var data_key = 'v_slider_options', // Namespace plugin data
//     event_suffix = '-v_slider', // Namspace events
//     class_prefix = '.v_slider-', // Namspace css classes


//     // Custom events
//     evt_component_initialized = 'component_initialized' + event_suffix, // Custom event when plugin is done initializing
//     evt_modified = 'modified' + event_suffix;

//   // Scope Methods
//   var methods = {

//     // Ran when plugin is initialized for setup
//     init: function(settings) {

//       var $el = $(this),
//         // Options added here are defaults, if different values are passed when initiallized, these will be overridden
//         options = $.extend({
//           slide_selector: 'img',
//           speed: 5000, // Default slide duration
//           transition_speed: 0.5, // Default transition speed
//           paused: false, // Auto Play on page load
//           fixed_container_height: null, // Change to specified px if you want a fixed height. Non responsive
//           slider_width_px: null, // Default null so slider defaults with 100% and fits it's containing element. Non responsive
//           slider_width_percent: 100, // Default Container Width
//           full_width_links: false, // TODO: Not in use currently.
//           max_slider_width: 2400, // Sets a max-width on the slider (pixels only right now, add % later)
//           controls: true, // TODO: Eventually will allow overriding controls.
//           dev: false, // Tells the plugin to log dev information to the console or not.
//           logging: false // Tells the plugin to print the plugin options in use.
//         }, settings);

//       if(options.logging){
//         console.log('[== Plugin Options ==]')
//         console.log('=> speed: ' + options.speed + 'ms');
//         console.log('=> transition_speed: ' + options.transition_speed + 's');
//         console.log('=> paused: ' + options.paused);
//         console.log('=> max_slider_width: ' + options.max_slider_width + 'px');
//         // console.log('=> : ' + options.);
//         console.log('==============================');
//       }

//       // Locally Scoped Variables. (Not accessible via instantiation)
//       options.numberOfSlides = $el.children(options.slide_selector).length;
//       options.currentSlide = 1;
//       // options.linkContainer = $el.find('' + class_prefix + 'links');
//       // options.numberOfLinks = $el.find('' + class_prefix + 'links').children('a').length; //Get the number of slides on the page.

//       if(options.dev){
//         // console.log('Number of Links: ' + options.numberOfLinks);
//       }

//       // Store data on the element for use later
//       $el.data(data_key, options);

//       //Initialize and Create all the plugin elements
//       //===============================================
//       if(options.dev){
//         console.log('[== Initiallized ==]');
//       }
//       methods._create_plugin_elements.apply(this);

//       // Begin Timer
//       //=============
//       if (options.paused) {
//         //do not start v_slider_timer
//       } else {
//         //start v_slider_timer
//         var v_slider_timer = setInterval(function() {
//           $el.v_slider('next_image');
//         }, options.speed);
//       }

//       // Click events
//       //==============
//       $el.on('click', '.v_slider_controls a', function(e) {
//         e.preventDefault();
//         var action = $(this).attr('data-action');
//         window.clearInterval(v_slider_timer);
//         if(action === 'next'){
//           $el.v_slider('next_image');
//         }else
//         if(action === 'previous'){
//           $el.v_slider('previous_image');
//         }
//       });

//       return $el;
//     },

//     _create_plugin_elements: function() {

//       var $el = $(this),
//         // Retrieve data stored on element
//         options = $el.data(data_key);


//       // Set the transition specified
//       //==============================
//       $el.children('img').css({
//         '-webkit-transition-duration': options.transition_speed + 's',
//         'transition-duration': options.transition_speed + 's'
//       });


//       // Create CONTROLS
//       //==================

//       if(options.controls){
//         // add in the controls for each v_slider
//       }


//       // SET LINK STYLES
//       //==================
//       if (options.full_width_links == true) {
//         // $el.find('' + class_prefix + 'links').addClass('full_width_links');
//         // $el.find('' + class_prefix + 'next_button').addClass('test');
//         // $el.find('' + class_prefix + 'back_button').addClass('test');
//       }


//       // ADD data-order attribute index to each image in v_slider
//       //==========================================================================
//       var tallestPortraitImageHeight = 0, //used later to set the height of container
//         tallestPortraitImageWidth = 0,
//         tallestLandscapeImageHeight = 0,
//         tallestLandscapeImageWidth = 0,
//         sliderHeight = 0,
//         aspectRatio = 0,
//         hasPortraitImages = false, // boolean value
//         hasLandscapeImages = false, // boolean value
//         sliderWidth = $el.width(); // Needs to be slider width

//       if(options.dev){
//         console.log('[== Printing Container Widths ==]');
//         console.log('Screen Width: ' + sliderWidth);
//         console.log('V Slider Width: ' + sliderWidth);
//         console.log('=============================');
//       }
//       var imageIndex = 1;
//       //Display first image in slider. (i.e. set opacity to 1)
//       $el.children('img:nth-child(' + imageIndex + ')').addClass('v_active');


//       //=============================================================
//       //=============================================================
//       //=============================================================
//       if(options.dev){
//         console.log('[== Finding largest Image ==]');
//       }

//       for (var i = 0; i < options.numberOfSlides; i++) {
//         $el.children('img:nth-child(' + imageIndex + ')').attr('data-order', imageIndex).attr('id', 'v-' + imageIndex);

//         //Check image size, and addClass('narrow')
//         // Get on screen image
//         //==========================================================================================
//         var currentImage = $el.children('img:nth-child(' + imageIndex + ')');
//         var currentImageObject = document.getElementById('v-' + imageIndex);

//         // Get accurate measurements from that.
//         var imageWidth = currentImageObject.width,
//           imageHeight = currentImageObject.height;

//         // Portrait/Landscape Test
//         //=========================
//         if (imageHeight < imageWidth) {
//           var imageOrientation = 'landscape'
//         } else
//         if (imageHeight > imageWidth) {
//           var imageOrientation = 'portrait'
//           $el.children('img:nth-child(' + imageIndex + ')').addClass('narrow');
//         }

//         // Handle Landscape Image
//         //========================
//         if (imageOrientation == 'landscape' && imageHeight > tallestLandscapeImageHeight) {
//           tallestLandscapeImageHeight = imageHeight;
//           tallestLandscapeImageWidth = imageWidth;

//           if(options.dev){
//             // Prints tallest image file name
//             console.log(currentImage.attr('src'));
//             console.log('Tallest Landscape Image Dimensions: ' + tallestLandscapeImageHeight + ' x ' + tallestLandscapeImageWidth);
//           }
//           // Flag for later use
//           hasLandscapeImages = true;
//         }

//         // Handle Portrait Image
//         //=======================
//         if (imageOrientation == 'portrait' && imageHeight > tallestPortraitImageHeight) {
//           tallestPortraitImageHeight = imageHeight;
//           tallestPortraitImageWidth = imageWidth;

//           if(options.dev){
//             // Prints tallest image file name
//             console.log(currentImage.attr('src'));
//             console.log('Tallest Portrait Image Dimensions: ' + tallestPortraitImageHeight + ' x ' + tallestPortraitImageWidth);
//           }

//           // Flag for later use
//           hasPortraitImages = true;
//         }

//         // Set the Aspect Ratio & Slider Height
//         //======================================
//         if (hasPortraitImages && !hasLandscapeImages) {
//           // This covers if there are only Portrait Oriented Images
//           aspectRatio = tallestPortraitImageHeight / tallestPortraitImageWidth;
//           sliderHeight = ((sliderWidth * aspectRatio) / 2);
//         } else {
//           // This covers all other combinations
//           aspectRatio = tallestLandscapeImageHeight / tallestLandscapeImageWidth;
//           sliderHeight = sliderWidth * aspectRatio;
//         }

//         imageIndex++;
//       } // End For Loop (Looping through images to get heights)

//       // Print results from largest image test
//       if(options.dev){
//         console.log('[== Printing Largest Image Aspect Ration & Height ==]');
//         console.log('Aspect Ratio: ' + aspectRatio);
//         console.log('----------------------------');
//       }

//       //=============================================================
//       //=============================================================
//       //=============================================================
//       // Set Slider width
//       if (options.max_slider_width != null) {
//         if (sliderWidth < options.max_slider_width) {
//           $el.css({ 'max-width': options.max_slider_width + 'px'});
//         } else {
//           sliderWidth = options.max_slider_width;
//           $el.css({ 'max-width': sliderWidth + 'px'});
//         }
//       }else{
//         // Default max-width for the image slider to the screen width
//         $el.css({ 'max-width': '100%'});
//       }

//       if(options.dev){
//         console.log('[== Setting Slider Width ==]');
//         console.log('Slider Width: ' + sliderWidth);
//       }

//       // Set Slider height
//       //===================
//       var sliderHeight = sliderWidth * aspectRatio;
//       if(options.dev){
//         console.log('[== Setting Slider Height ==]');
//         console.log('Slider Height: ' + sliderHeight);
//       }
//       $el.css({'height': sliderHeight + 'px'});


//       //=============================================================
//       //=============================================================
//       //=============================================================
//       // Window Resize Function
//       //========================
//       // Note: Update to use debounce
//       var currentSliderHeight = null;
//       $(window).resize(function() {
//         // ========================================
//         var breakpointTest = $(document).width() <= options.max_slider_width;
//         if(options.dev){
//           console.log(breakpointTest);
//         }
//         if (breakpointTest) {
//           if (aspectRatio > 1) {
//             currentSliderHeight = (($el.width() * aspectRatio) / 2);
//             if(options.dev){
//               console.log('Slider Height: ' + currentSliderHeight + 'px');
//             }
//           } else {
//             currentSliderHeight = $el.width() * aspectRatio;
//             if(options.dev){
//               console.log('Slider Height: ' + currentSliderHeight + 'px');
//             }
//           }
//          $el.css({'height': currentSliderHeight + 'px'});
//          if(options.dev){
//            console.log('==============================');
//          }
//         }
//       });

//       if(options.dev){
//         console.log('=============================================================');
//         console.log('END OF SLIDER INIT');
//         console.log('=============================================================');
//       }

//       return $el;
//     }, // END METHOD _create_plugin_elements

//     // ====================
//     // NEXT IMAGE FUNCTION
//     // ====================
//     next_image: function() {

//       var $el = $(this),
//         // Retrieve data stored on element
//         options = $el.data(data_key);

//       $el.children('[data-order="' + options.currentSlide + '"]').removeClass('v_active');

//       // Increment options.currentSlide
//       if (options.currentSlide < options.numberOfSlides && options.currentSlide > 0) {
//         options.currentSlide = options.currentSlide + 1;
//       } else {
//         options.currentSlide = 1;
//       }

//       $el.children('[data-order="' + options.currentSlide + '"]').addClass('v_active');

//       if(options.dev){
//         console.log('options.currentSlide: ' + options.currentSlide);
//       }

//       return $el;
//     }, //END METHOD next_image

//     // ========================
//     // PREVIOUS IMAGE FUNCTION
//     // ========================
//     previous_image: function() {

//       var $el = $(this),
//         // Retrieve data stored on element
//         options = $el.data(data_key);

//       $el.children('[data-order="' + options.currentSlide + '"]').removeClass('v_active');

//       // Decrement options.currentSlide
//       if (options.currentSlide > 1 && options.currentSlide <= options.numberOfSlides) {
//         options.currentSlide = options.currentSlide - 1;
//       } else {
//         options.currentSlide = options.numberOfSlides;
//       }

//       $el.children('[data-order="' + options.currentSlide + '"]').addClass('v_active');

//       if(options.dev){
//         console.log('options.currentSlide: ' + options.currentSlide);
//       }

//       return $el;
//     }

//   }; // END METHOD previous_image

//   $.fn.v_slider = function(method) {
//     /**
//      * Used to prevent use of functions prefixed with an underscore
//      * if a method is provided call that, otherwise treat it as an initiation
//      * Do not edit below this
//      **/
//     var args = arguments;
//     if (methods[method] && method.charAt(0) !== '_') {
//       // jQuery.map() is used to return results properly
//       return $(this).map(function(i, val) {
//         return methods[method].apply(this, Array.prototype.slice.call(args, 1));
//       });
//     } else if (typeof method === 'object' || !method) {
//       return $(this).map(function(i, val) {
//         return methods.init.apply(this, args);
//       });
//     }
//   };

// })(jQuery);












/* ============================================
Vanilla JS Plugin

Author: Isaac Vazquez
Version: 1.0

Notes:

Supported Browsers:
Chrome, ...
============================================ */

(function() {
  "use strict";

  Object.prototype.vslider = function() {
    var v_slider = this, // 'this' is the element which invoked the Object.prototype.plugin function. (ex: element.plugin();)
        v_slider_timer = null,
        body = document.querySelector('body');

    v_slider.options = arguments[0];

    // Default options
    var defaultOptions = {
      slide_selector: 'img',
      speed: 5000, // Default slide duration
      transition_speed: 0.5, // Default transition speed
      paused: false, // Auto Play on page load
      fixed_container_height: null, // Change to specified px if you want a fixed height. Non responsive
      slider_width_px: null, // Default null so slider defaults with 100% and fits it's containing element. Non responsive
      slider_width_percent: 100, // Default Container Width
      full_width_links: false, // TODO: Not in use currently.
      max_slider_width: 2400, // Sets a max-width on the slider (pixels only right now, add % later)
      controls: true, // TODO: Eventually will allow overriding controls.
      dev: false, // Tells the plugin to log dev information to the console or not.
      logging: false // Tells the plugin to print the plugin options in use.
    }

    var options = Object.assign({}, defaultOptions, v_slider.options);



    if(options.logging) {
      console.log('[== Plugin Options ==]');
      console.log('=> speed: ' + options.speed + 'ms');
      console.log('=> transition_speed: ' + options.transition_speed + 's');
      console.log('=> paused: ' + options.paused);
      console.log('=> max_slider_width: ' + options.max_slider_width + 'px');
      // console.log('=> : ' + options.);
      console.log('==============================');
    }

    var methods = {
      init: function() {
        v_slider.initialized = true;

        methods._setupPluginElements(methods.beginTimer);

        // Click events
        //==============
        body.addEventListener('click', function(e) {
          e.preventDefault();

          var target = e.target.className,
              jsSliderNext = "js-vslider-next",
              jsSliderPrevious = "js-vslider-previous";

          if(target.indexOf(jsSliderNext) != -1) {
            // if(sliderActive) { methods.pauseTimer(); }
            methods.nextItem();
          }

          if(target.indexOf(jsSliderPrevious) != -1) {
            // if(sliderActive) { methods.pauseTimer(); }
            methods.previousItem();
          }

        });
      },
      _setupPluginElements: function(callback) {
        var v_slider_items = v_slider.getElementsByClassName('vslider-items')[0];

        // // Add vslider classes
        Object.keys(v_slider_items.children).forEach(function(index) {
          var item = v_slider_items.children[index],
              itemWidth = item.clientWidth,
              itemHeight = item.clientHeight,
              itemAspectRatio = itemHeight / itemWidth;

          itemAspectRatio > 1 ? item.classList.add('portrait') : item.classList.add('landscape');
          item.classList.add('vslider-item');
          item.dataset.v = index;
        });

        v_slider.style.height = "777px";

        // Set first slider item to active


        callback();
      },
      _privateMethod: function() {
        console.log('Private Method');
      },
      pauseTimer: function() {
        console.log('Pause Timer');
        window.clearInterval(v_slider_timer);
      },
      beginTimer: function() {
        console.log('Begin Timer');
        if (options.paused) {
          //do not start v_slider_timer
        } else {
          //start v_slider_timer
          v_slider_timer = setInterval(function() {
            v_slider.vslider('nextItem');
          }, options.speed);
        }
      },
      nextItem: function() {
        console.log('Next Item');
      },
      previousItem: function() {
        console.log('Previous Item');
      }
    }

    // Either apply the options, or run a public Method
    // Deny all requests to run a private Method.
    // (i.e. if the arguments[0] begin with '_')
    // =================================================
    if(typeof v_slider.options === 'object') {
      // Override Default Options
      options = Object.assign(options, v_slider.options);
    }else if (v_slider.options.charAt(0) !== '_' && typeof v_slider.options !== 'object' && typeof v_slider.options === 'string' && methods[v_slider.options]) {
      methods[v_slider.options]();
    }

    // Initialize Plugin if it hasn't been already
    // ===========================================
    if(v_slider.initialized !== true) {
      methods.init();
    }

  }
})();
