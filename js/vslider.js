/*==========================================================================
v_slider
==========================================================================

Project Name: vslider
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

// vs_getAll() helper Function
// ===
// returns an array of elements by selector
// usage: vs_getAll('selector'); -OR- element.vs_getAll('childSelector');
Object.prototype.vs_getAll = function(selector) {
  var obj = this !== window ? this : document;
  return Array.prototype.slice.call(obj.querySelectorAll(selector));
}


// vs_first() helper Function
// ===
// returns the first item of an array
// usage: vs_getAll('selector').vs_first();
Object.prototype.vs_first = function() {
  return this[0];
}



function VSlider(element, options) {
  // Current VSlider element
  this.el = element;
  this.timer = null;

  var defaults = {
    speed: 5000,
    slide_selector: 'img'
  };

  // Merge defualts with user defined options
  this.options = Object.assign({}, defaults, options);

  // Initialize
  this.init();

  return this;
}


// Public Methods
VSlider.prototype.init = function() {
  var _this = this,
      el = this.el;

  _this._setupElements();

  // Click events (Move to a separate function??)
  //==============
  var previousButton = el.vs_getAll('.js-vslider-previous').vs_first();
  var nextButton = el.vs_getAll('.js-vslider-next').vs_first();

  previousButton.addEventListener('click', _this.previousItem.bind(this));
  nextButton.addEventListener('click', _this.nextItem.bind(this));

  return this;
}

VSlider.prototype.nextItem = function() {
  var el = this.el,
      options = this.options;

  var currentItem = el.vs_getAll('.active').vs_first(),
      currentItemIndex = Number(currentItem.dataset.v),
      totalItems = el.vs_getAll('.vslider-items ' + options.slide_selector).length;

  // Remove .active from currentItem
  currentItem.classList.remove('active');

  // Increment currentItemIndex
  currentItemIndex === totalItems ? currentItemIndex = 1 : currentItemIndex++;

  // add .active to new currentItem
  el.vs_getAll('[data-v="' + currentItemIndex + '"]').vs_first().classList.add('active');
}

VSlider.prototype.previousItem = function() {
  var el = this.el,
      options = this.options;

  var currentItem = el.vs_getAll('.active').vs_first(),
      currentItemIndex = Number(currentItem.dataset.v),
      totalItems = el.vs_getAll('.vslider-items ' + options.slide_selector).length;

  // Remove .active from currentItem
  currentItem.classList.remove('active');

  // Decrement currentItemIndex
  currentItemIndex === 1 ? currentItemIndex = totalItems : currentItemIndex--;

  // add .active to new currentItem
  el.vs_getAll('[data-v="' + currentItemIndex + '"]').vs_first().classList.add('active');   
}

VSlider.prototype._setupElements = function() {
  var el = this.el,
      options = this.options;

  var tallestLandscapeItemHeight = 0,
      tallestItemAspectRatio = 1,
      v_slider_item_container = el.vs_getAll('.vslider-items').vs_first(),
      v_slider_items = v_slider_item_container.vs_getAll(options.slide_selector);

  v_slider_items.forEach(function(item, index) {
    var item = v_slider_items[index],
        itemWidth = item.clientWidth,
        itemHeight = item.clientHeight,
        itemAspectRatio = itemHeight / itemWidth;

    // Get tallest landscape item's height
    if(itemAspectRatio < 1) {
      if(itemHeight > tallestLandscapeItemHeight) {
        tallestLandscapeItemHeight = itemHeight;
        tallestItemAspectRatio = itemAspectRatio;
      }
    }

    // Add Portrait/Landscape class
    itemAspectRatio > 1 ? item.classList.add('portrait') : item.classList.add('landscape');

    // Add vslider-item class
    item.classList.add('vslider-item');

    // Set data-v attribute to index
    item.dataset.v = (index + 1);
  });

  // Set max-width of vslider
  el.style.maxWidth = options.max_slider_width + 'px';

  // Set height of vslider
  var sliderHeight = 100 * tallestItemAspectRatio;
  v_slider_item_container.style.paddingTop = sliderHeight + '%';

  // Set first slider item to active
  v_slider_items.vs_first().classList.add('active');

  // Ready to begin Timer
  // v_slider.timer_active = !options.paused;

  setTimeout(function() { // 0.5s delay to avoid flash images
    v_slider_item_container.classList.add('ready');
    // if(v_slider.timer_active) { methods.beginTimer(); }
  }, 500);
}
