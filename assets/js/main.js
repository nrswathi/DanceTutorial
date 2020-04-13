
!(function($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top + 2;

        if ($('#header').length) {
          scrollto -= $('#header').outerHeight()

        }

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('.mobile-nav .nav-logo').remove();
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 110;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
    });
  });

  // Stick the header at top on scroll
  $("#header").sticky({
    topSpacing: 0,
    zIndex: '50'
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.tutorials-container').isotope({
      itemSelector: '.tutorials-item',
      layoutMode: 'fitRows'
    });

    $('#tutorials-flters li').on('click', function() {
      $("#tutorials-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
    });
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Portfolio details carousel
  $(".tutorials-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Initi AOS
  AOS.init({
    duration: 600
  });

})(jQuery);
/*
$('#start_btn').on('click', function (e) {
  e.preventDefault();
  $(this).text(function (_, text) {
      return text === 'Stop Recording' ? 'Start recording' : 'Stop Recording';
  }).toggleClass('stop_button');
});

*/

 // live sessions

//live video access

function start_recording(){
  var video = document.getElementById('start_video');
  var btn = document.getElementById('start_btn');
  var stream = document.getElementById('stream_session');
  stream.value="Stream Session";
  stream.innerHTML="Stream Session";
  stream.style.opacity="1";
  var count;

if(btn.value=="Start recording"){
// Get access to the camera!
    btn.style.backgroundColor="orangered";
    btn.value="Pause Recording";
    btn.innerHTML ="Pause Recording";
        if( typeof(count)=='undefined') {
          if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function(stream) {
                //video.src = window.URL.createObjectURL(stream);
                video.srcObject = stream;
                video.play();
            });
        }
          count=1;
        }
        else {
            video.play();
        }
     
    }
  else{
    btn.style.backgroundColor="limegreen";
    btn.value="Start recording";
    btn.innerHTML ="Start recording";
    video.pause();
  }
}

//end session
function end_session(){
  var live_icon = document.getElementById('live_tutorial_cont');
  live_icon.style.backgroundColor="red";

  //window.open("tutorials.html","_self");
}




 
 /*
  var Now = new Date(),
  CurrentDay = Now.getDay(),
  OpeningTime = new Date(Now.getFullYear(), Now.getMonth(), Now.getDate(), 8, 30),
  ClosingTime = new Date(Now.getFullYear(), Now.getMonth(), Now.getDate(), 23, 30),
  Open = (Now.getTime() > OpeningTime.getTime() && Now.getTime() < ClosingTime.getTime());

  if (Open) {
    $('.openstatus').show();
  }
  */
/*if (CurrentDay !== 6 && CurrentDay !== 0 && Open) {
    $('.openstatus').toggle();
} 
*/
