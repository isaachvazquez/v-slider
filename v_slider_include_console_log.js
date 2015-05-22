/*==========================================================================
v_slider
========================================================================== 

Project Name: v_slider
Author: Isaac Vazquez
Company: Clockwork Acive Media Systems
Company Site: clockwork.net
License: 
Copyright: 
Version: 1.0
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
(function ($) {
        "use strict";

        // These locally scoped variables help minification by aliasing strings
        var data_key               =  'v_slider_options', // Namespace plugin data
                event_suffix           =  '.v_slider',        // Namspace events
                class_prefix           =  '.v_slider_',        // Namspace events


                // Custom events
                evt_component_initialized  =  'component_initialized' + event_suffix, // Custom event when plugin is done initializing
                evt_modified               =  'modified'              + event_suffix;

        // Scope Methods
        var methods  =  {

                // Ran when plugin is initialized for setup
                init  :  function (settings) {

                        var $el  =  $(this),
                                // Options added here are defaults, if different values are passed when initiallized, these will be overridden
                                options  =  $.extend({
                                        container_class         : 'v_slider_container',
                                        slide_selector          : 'img',
                                        speed                   : 5000, //Default slide speed
                                        transition_speed        : 1000, //Default transition speed
                                        paused                  : false, //Auto Play on page load
                                        fixed_container_height  : null, //Change to specified px if you want a fixed height. Non responsive
                                        slider_width_px         : null, //Default null so slider defaults with 100% and fits it's containing element. Non responsive
                                        slider_width_percent    : 100, //Default Container Width
                                        full_width_links        : false,
                                        max_slider_width        : null,
                                }, settings);

                        //Plugin Variables
                        options.elements         = '';
                        options.slider           = $el;
                        options.container        = $el.find('' + class_prefix + 'container');
                        options.numberOfSlides   = $el.find('.' + options.container_class + ' > ' + options.slide_selector).length; //Get the number of slides on the page.
                        options.previousSlide    = 0;
                        options.currentSlide     = 1;
                        options.nextSlide        = 2;
                        options.linkContainer    = $el.find('' + class_prefix + 'links');
                        options.numberOfLinks    = $el.find('' + class_prefix + 'links').children('a').length; //Get the number of slides on the page.
                        console.log('Number of Links: ' + options.numberOfLinks);

                        if(options.max_slider_width === null){
                            options.max_slider_width = screen.width; //Default max-width for the image slider
                        }

                        // Store data on the element for use later
                        $el.data(data_key, options);

                        //Initialize and Create all the plugin elements
                        //===============================================
                        //initialize
                        console.log('==Initiallized==');
                        //create elements
                        methods._create_plugin_elements.apply(this);


                        //Begin Timer
                        //==============
                        if(options.paused){
                            //do not start v_slider_timer
                        }else{
                            //start v_slider_timer
                            var v_slider_timer = setInterval(function() {
                                $el.v_slider('next_image');
                            }, options.speed);
                        }

                        //Capture Click events
                        //======================
                        $el.find('' + class_prefix + 'next_button').click(function(){
                            window.clearInterval(v_slider_timer);
                            console.log('Interval Cleared.');
                            $el.v_slider('next_image');
                        });

                        $el.find('' + class_prefix + 'back_button').click(function(){
                            window.clearInterval(v_slider_timer);
                            console.log('Interval Cleared.');
                            $el.v_slider('previous_image');
                        });

                        return $el;
                },

                _create_plugin_elements  :  function () {

                    var $el = $(this),
                        // Retrieve data stored on element
                        options  =  $el.data(data_key);

                    //ADD CLASS v_slider_image TO ALL IMAGES WITHIN v_slider_container
                    //==========================================================================
                    $el.find('.v_slider_container').children('img').addClass('v_slider_image');

                    //SET LINK STYLES
                    if(options.full_width_links == true){
                        $el.find('' + class_prefix + 'links').css({
                            width       : '100%',
                            height      : '100%',
                            background  : 'transparent',
                            top         : 0,
                            left        : 0
                        });

                        $el.find('' + class_prefix + 'links').children('a').css({
                            width       : '100%',
                            height      : '100%',
                            background  : 'transparent',
                            top         : 0,
                            left        : 0
                        });

                        $el.find('' + class_prefix + 'next_button').css({
                            position: 'absolute',
                            zIndex: 999,
                            right: 0
                        });

                        $el.find('' + class_prefix + 'back_button').css({
                            position: 'absolute',
                            zIndex: 999,
                            left: 0
                        });
                    }


                    //ADD CLASS 'i' + index to each image in v_slider_container(aka container)
                    //retrieve number of images in v_slider_container
                    //==========================================================================
                    var numOfImageElements = $el.find(".v_slider_container > img").length,
                        tallestPortraitImageHeight = 0, //used later to set the height of container
                        tallestPortraitImageWidth = 0,
                        tallestLandscapeImageHeight = 0,
                        tallestLandscapeImageWidth = 0,
                        sliderHeight = null,
                        aspectRatio = null,
                        hasPortraitImages = false, // boolean value
                        hasLandscapeImages = false, // boolean value 
                        screenWidth = $(document).width();
                        console.log('Images in v_slider: ' + numOfImageElements);


                    var imageIndex = 1;
                    //Display first image in slider. (i.e. set opacity to 1)
                    $el.find('' + class_prefix + 'container img:nth-child(' + imageIndex + ')').fadeTo(options.transition_speed, 1);
                    $el.find('' + class_prefix + 'links a:nth-child(' + imageIndex + ')').fadeTo(options.transition_speed, 1);

                    for(var i = 0; i < numOfImageElements; i++){
                        $el.find('' + class_prefix + 'container img:nth-child(' + imageIndex + ')').addClass('i' + imageIndex);

                        //Check image size, and addClass('narrow')
                        // Get on screen image
                        //==========================================================================================
                        var currentImage = $el.find('' + class_prefix + 'container img:nth-child(' + imageIndex + ')');

                        // Get accurate measurements from that.
                        var imageWidth = currentImage.width(),
                            imageHeight = currentImage.height();


                        //=============================================================
                        //=============================================================
                        //=============================================================
                        console.log('-=[]=-');
                        // Portrait/Landscape Test
                        if(imageHeight < imageWidth){
                            var imageOrientation = 'landscape'
                        } else
                        if(imageHeight > imageWidth){
                            var imageOrientation = 'portrait'
                            $el.find('' + class_prefix + 'container img:nth-child(' + imageIndex + ')').addClass('narrow');
                            console.log('Added Class Narrow');
                        }
                        console.log(imageOrientation);

                        // Handle Landscape Image
                        if(imageOrientation == 'landscape' && imageHeight > tallestLandscapeImageHeight) {
                            tallestLandscapeImageHeight = imageHeight;
                            tallestLandscapeImageWidth = imageWidth;

                            // Prints tallest image file name
                            console.log(currentImage.attr('src'));
                            console.log('Tallest Landscape Image Dimensions: ' + tallestLandscapeImageHeight + ' x ' + tallestLandscapeImageWidth);
                            
                            // Flag for later use
                            hasLandscapeImages = true;
                        }

                        // Handle Portrait Image
                        if(imageOrientation == 'portrait' && imageHeight > tallestPortraitImageHeight) {
                            tallestPortraitImageHeight = imageHeight;
                            tallestPortraitImageWidth = imageWidth;

                            // Prints tallest image file name
                            console.log(currentImage.attr('src'));
                            console.log('Tallest Portrait Image Dimensions: ' + tallestPortraitImageHeight + ' x ' + tallestPortraitImageWidth);

                            // Flag for later use
                            hasPortraitImages = true;
                        }

                        //=============================================================
                        // Set the Aspect Ratio & Slider Height
                        if(hasPortraitImages && !hasLandscapeImages) {
                            // This covers if there are only Portrait Oriented Images
                            aspectRatio = tallestPortraitImageHeight / tallestPortraitImageWidth;
                            sliderHeight = ((screenWidth * aspectRatio) / 2);
                            console.log('Slider Height: ' + sliderHeight + 'px');
                        } else {
                            // This covers all other combinations
                            aspectRatio = tallestLandscapeImageHeight / tallestLandscapeImageWidth;
                            sliderHeight = screenWidth * aspectRatio;
                            console.log('Slider Height: ' + sliderHeight + 'px');
                        }
                        console.log('Aspect Ratio: ' + aspectRatio);

                        // Check options.max_slider_width
                        if (options.max_slider_width != null) {
                            if(screenWidth < options.max_slider_width){
                                //use parent width
                                screenWidth = $el.parent().width();
                            }else{
                                screenWidth = options.max_slider_width;
                            }
                        }

                        console.log('i: ' + i + ', imageIndex: ' + imageIndex);
                        imageIndex++;
                    } // End For Loop (Looping through images to get heights)



                    //SET CONTAINER HEIGHT
                    //==========================================================================
                    if(options.fixed_container_height != null){
                        options.container.css('height', '' + options.fixed_container_height + 'px');
                    }else{
                        options.container.css('height', '' + sliderHeight + 'px');
                        // $('.slider-height').text(sliderHeight);// console.log('Container Height Set to ' + sliderHeight + 'px!');
                    }


                    // Window Resize Function
                    var currentSliderHeight = null;
                    //Resize Slider on browser resize
                    $(window).resize(function(){
                        console.log('Browser Resized');
                        if(options.fixed_container_height === null && $(document).width() <= options.max_slider_width){
                            console.log('Aspect Ratio: ' + aspectRatio);

                            if(aspectRatio > 1) {
                                console.log('Aspect Ratio: ' + aspectRatio);
                                currentSliderHeight = (($el.parent().width() * aspectRatio) /  2);
                                console.log('Slider Height: ' + currentSliderHeight + 'px');
                            }else{
                                currentSliderHeight = $el.parent().width() * aspectRatio;
                                console.log('Slider Height: ' + currentSliderHeight + 'px');
                            }
                            console.log('==============================');
                            options.container.css('height', '' + currentSliderHeight + 'px');
                        }
                    });

                    console.log('Fixed Container Height Option: ' + options.fixed_container_height);

                    //SET CONTAINER/SLIDE WIDTHS
                    //==========================================================================
                    if(options.slider_width_px === null){
                        //Set variables
                        var image_container_width = (options.numberOfSlides * options.slider_width_percent), //ORIGINAL CODE
                            image_slide_width = (options.slider_width_percent / options.numberOfSlides), //ORIGINAL CODE
                            narrow_slide_width = (image_slide_width / 2),
                            narrow_slide_margin = (narrow_slide_width / 2);

                        //Print variables
                        console.log('v_slider Container Width: ' + image_container_width + '%');
                        console.log('v_slider Image Width: ' + image_slide_width + '%');
                        console.log('v_slider "narrow" class Width: ' + narrow_slide_width + '%');

                        //set v_slider widths
                        options.slider.css({
                            width       : '' + options.slider_width_percent + '%',
                            maxWidth    : '' + options.max_slider_width + 'px'
                        });


                        options.container.css('width', '' + image_container_width + '%');
                        $el.find('' + class_prefix + 'image').css('width', '' + image_slide_width + '%');

                        $el.find('.narrow').css({
                            width       : narrow_slide_width + '%',
                            margin      : '0 ' + narrow_slide_margin + '%'
                        });
                    }else{
                        //Set variables
                        image_container_width = (options.numberOfSlides * options.slider_width_px),
                        image_slide_width = (image_container_width / options.numberOfSlides);

                        //Print variables
                        console.log('v_slider Container Width: ' + image_container_width + 'px');
                        console.log('v_slider Image Width: ' + image_slide_width + 'px');

                        //set v_slider widths
                        options.slider.css('width', '' + options.slider_width_px + 'px');
                        options.container.css('width', '' + image_container_width + 'px');
                        $el.find('' + class_prefix + 'image').css('width', '' + image_slide_width + 'px');
                    }

                    return $el;
                }, // END METHOD _create_plugin_elements

                next_image  :  function () {

                    var $el = $(this),
                        // Retrieve data stored on element 
                        options  =  $el.data(data_key);
                        console.log('Next Image function FIRED!!');
                        
                        //
                        //=====================================================================
                        if(options.currentSlide < options.numberOfSlides && options.currentSlide > 0){
                            $el.find('.i' + options.currentSlide).fadeTo(options.transition_speed, 0);
                            $el.find('.i' + options.nextSlide).fadeTo(options.transition_speed, 1);
                            $el.find('' + class_prefix + 'links a:nth-child(' + options.currentSlide + ')').fadeTo(options.transition_speed, 0);
                            $el.find('' + class_prefix + 'links a:nth-child(' + options.nextSlide + ')').fadeTo(options.transition_speed, 1);
                            $el.find('' + class_prefix + 'links a:nth-child(' + options.currentSlide + ')').css('z-index', 0);
                            $el.find('' + class_prefix + 'links a:nth-child(' + options.nextSlide + ')').css('z-index', options.numberOfSlides);
                            options.currentSlide++;
                            options.previousSlide = options.currentSlide - 1;
                            options.nextSlide = options.currentSlide + 1;
                        }else{
                            options.previousSlide = options.numberOfSlides;
                            options.currentSlide = 1;
                            options.nextSlide = 2;
                            $el.find('.i' + options.previousSlide).fadeTo(options.transition_speed, 0);
                            $el.find('.i' + options.currentSlide).fadeTo(options.transition_speed, 1);
                            $el.find('' + class_prefix + 'links a:nth-child(' + options.previousSlide + ')').fadeTo(options.transition_speed, 0);
                            $el.find('' + class_prefix + 'links a:nth-child(' + options.currentSlide + ')').fadeTo(options.transition_speed, 1);
                            $el.find('' + class_prefix + 'links a:nth-child(' + options.previousSlide + ')').css('z-index', 0);
                            $el.find('' + class_prefix + 'links a:nth-child(' + options.currentSlide + ')').css('z-index', options.numberOfSlides);
                        }

                        console.log('options.previousSlide: ' + options.previousSlide + ', options.currentSlide: ' + options.currentSlide + ', options.nextSlide: ' + options.nextSlide);

                    return $el;
                }, //END METHOD next_image

                previous_image  :  function () {

                    var $el = $(this),
                        // Retrieve data stored on element
                        options  =  $el.data(data_key);
                        console.log('Previous Image function FIRED!!');

                        //
                        //==============================================================
                        if(options.currentSlide > 1 && options.currentSlide <= options.numberOfSlides){
                            $el.find('.i' + options.currentSlide).fadeTo(options.transition_speed, 0);
                            $el.find('.i' + options.previousSlide).fadeTo(options.transition_speed, 1);
                            $el.find('' + class_prefix + 'links a:nth-child(' + options.currentSlide + ')').fadeTo((options.transition_speed / 2), 0);
                            $el.find('' + class_prefix + 'links a:nth-child(' + options.previousSlide + ')').fadeTo((options.transition_speed / 2), 1);
                            $el.find('' + class_prefix + 'links a:nth-child(' + options.currentSlide + ')').css('z-index', 0);
                            $el.find('' + class_prefix + 'links a:nth-child(' + options.previousSlide + ')').css('z-index', options.numberOfSlides);

                            options.currentSlide--;
                            options.previousSlide = options.currentSlide - 1;
                            options.nextSlide = options.currentSlide + 1;
                        }else{
                            options.previousSlide = options.numberOfSlides;
                            options.currentSlide = 1;

                            $el.find('.i' + options.currentSlide).fadeTo(options.transition_speed, 0);
                            $el.find('.i' + options.previousSlide).fadeTo(options.transition_speed, 1);
                            $el.find('' + class_prefix + 'links a:nth-child(' + options.currentSlide + ')').fadeTo(options.transition_speed, 0);
                            $el.find('' + class_prefix + 'links a:nth-child(' + options.previousSlide + ')').fadeTo(options.transition_speed, 1);
                            $el.find('' + class_prefix + 'links a:nth-child(' + options.currentSlide + ')').css('z-index', 0);
                            $el.find('' + class_prefix + 'links a:nth-child(' + options.previousSlide + ')').css('z-index', options.numberOfSlides);
                            options.previousSlide = options.numberOfSlides - 1;
                            options.currentSlide = options.numberOfSlides;
                            options.nextSlide = 1;
                        }

                        console.log('options.previousSlide: ' + options.previousSlide + ', options.currentSlide: ' + options.currentSlide + ', options.nextSlide: ' + options.nextSlide);

                    return $el;
                }
                
        }; // END METHOD previous_image

        $.fn.v_slider  =  function (method) {

                /**
                * Used to prevent use of functions prefixed with an underscore
                * if a method is provided call that, otherwise treat it as an initiation
                * Do not edit below this
                **/
        var args = arguments;
        if (methods[method] && method.charAt(0) !== '_') {
            // jQuery.map() is used to return results properly
            return $(this).map(function(i, val) { return methods[method].apply(this, Array.prototype.slice.call(args, 1)); });
        } else if (typeof method === 'object' || !method) {
            return $(this).map(function(i, val) { return methods.init.apply(this, args); });
        }
        };

})(jQuery);