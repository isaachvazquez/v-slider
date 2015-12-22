/*===============================================================
Main.js
===============================================================

Author: Isaac Vazquez


===============================================================*/


$(document).ready(function() {
	$('#loader').fadeTo(200, 0);
        $('header').fadeTo(500, 1);
        $('.mainwrap').fadeTo(500, 1);
        $('footer').fadeTo(500, 1);
        $('img').show();

        $('.boss').v_slider({
        speed                           : 4000, //Speed of slides (4000 = 4s)
        transition_speed                : 1000, //Speed of transition between slides
        paused                          : false, //Change to true if you dont want the slider to start on load
        // full_width_links             : true,
        // max_slider_width        : 700, //Set this equal to the size of the parent elements max width
        // fixed_container_height               : 250,
        });

        $('.v11').v_slider({
        speed                           : 3000, //Speed of slides (4000 = 4s)
        transition_speed                : 2000, //Speed of transition between slides
        paused                          : false, //Change to true if you dont want the slider to start on load
        full_width_links                : true,
        });

        $('.v22').v_slider({
        speed                           : 4000, //Speed of slides (4000 = 4s)
        transition_speed                : 700, //Speed of transition between slides
        paused                          : false, //Change to true if you dont want the slider to start on load
        full_width_links                : false,
        });

        $('.v33').v_slider({
        speed                           : 3000, //Speed of slides (4000 = 4s)
        transition_speed                : 500, //Speed of transition between slides
        paused                          : false, //Change to true if you dont want the slider to start on load
        });

        $('.loner').v_slider({
        speed                           : 60000, //Speed of slides (4000 = 4s)
        transition_speed                : 2000, //Speed of transition between slides
        paused                          : false, //Change to true if you dont want the slider to start on load
        // full_width_links             : true,
        // max_slider_width        : 700, //Set this equal to the size of the parent elements max width
        // fixed_container_height               : 250,
        });

});


$(this).on('click.feature', function(e) {
        var tooltip = $(e.target).attr('data-tooltip');
        // $(this).slideToggle(300);
});

$('.title').click(function() {
        $("html, body").stop(true, false).animate({ scrollTop: $('.v1').offset().top }, 1200, 'easeOutExpo');
});

var menuState = 0;
$('.mobile-menu-icon').click(function() {
        if(menuState === 0){
                // $('.mainwrap').fadeTo('slow', 0.1);
                // $("nav").stop(true, false).animate({ top: "0%" });
                $(".ni1").delay(100).animate({ left: "0%" });
                $(".ni2").delay(200).animate({ left: "0%" });
                $(".ni3").delay(300).animate({ left: "0%" });
                $(".ni4").delay(400).animate({ left: "0%" });
                $(".ni5").delay(500).animate({ left: "0%" });
                $("nav").delay(700).animate({ top: "0%" });
                menuState = 1;
        }else{
                // $('.mainwrap').fadeTo('slow', 1);
                // $("nav").stop(true, false).animate({ top: "-100%" });
                $(".ni5").delay(100).animate({ left: "100%" });
                $(".ni4").delay(200).animate({ left: "100%" });
                $(".ni3").delay(300).animate({ left: "100%" });
                $(".ni2").delay(400).animate({ left: "100%" });
                $(".ni1").delay(500).animate({ left: "100%" });
                $("nav").animate({ top: "-110%" });
                menuState = 0;
        }
});
