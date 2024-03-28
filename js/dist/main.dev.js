"use strict";

/* Light YouTube Embeds by @labnol */

/* Web: http://labnol.org/?p=27941 */
document.addEventListener("DOMContentLoaded", function () {
  var div,
      n,
      v = document.getElementsByClassName("youtube-player");

  for (n = 0; n < v.length; n++) {
    div = document.createElement("div");
    div.setAttribute("data-id", v[n].dataset.id);
    div.innerHTML = labnolThumb(v[n].dataset.id);
    div.onclick = labnolIframe;
    v[n].appendChild(div);
  }
});

function labnolThumb(id) {
  var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
      play = '<div class="play"></div>';
  return thumb.replace("ID", id) + play;
}

function labnolIframe() {
  var iframe = document.createElement("iframe");
  var embed = "https://www.youtube.com/embed/ID"; //var embed = "https://www.youtube.com/embed/ID?autoplay=1";

  iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("allowfullscreen", "1");
  this.parentNode.replaceChild(iframe, this);
}
/*---------------------------------------------------------------------------------
/*
/* Main JS
/*
-----------------------------------------------------------------------------------*/


(function ($) {
  "use strict";
  /*---------------------------------------------------- */

  /* Preloader
  ------------------------------------------------------ */

  $(window).load(function () {
    // will first fade out the loading animation
    $("#loader").fadeOut("slow", function () {// will fade out the whole DIV that covers the website.
      //$("#preloader").delay(300).fadeOut("slow");
    });
  });

  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js').then(function (registration) {
      console.log('ServiceWorker registration successful with scope:', registration.scope);
    })["catch"](function (error) {
      console.log('ServiceWorker registration failed:', error);
    });
  }
  /*----------------------------------------------------*/

  /* Flexslider
  /*----------------------------------------------------*/


  $(window).load(function () {
    $('#hero-slider').flexslider({
      namespace: "flex-",
      controlsContainer: ".hero-container",
      animation: 'fade',
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false,
      before: function before(slider) {
        $(slider).find(".animated").each(function () {
          $(this).removeAttr("class");
        });
      },
      start: function start(slider) {
        $(slider).find(".flex-active-slide").find("h1").addClass("animated fadeInDown show").next().addClass("animated fadeInUp show");
        $(window).trigger('resize');
      },
      after: function after(slider) {
        $(slider).find(".flex-active-slide").find("h1").addClass("animated fadeInDown show").next().addClass("animated fadeInUp show");
      }
    });
    $('#testimonial-slider').flexslider({
      namespace: "flex-",
      controlsContainer: "",
      animation: 'slide',
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false
    });
  });
  /*----------------------------------------------------*/

  /* Adjust Primary Navigation  Opacity
  ------------------------------------------------------*/

  $(window).on('scroll', function () {
    var h = $('header').height();
    var y = $(window).scrollTop();
    var header = $('#main-header');

    if (y > h + 30 && $(window).outerWidth() > 768) {
      header.addClass('opaque');
    } else {
      if (y < h + 30) {
        header.removeClass('opaque');
      } else {
        header.addClass('opaque');
      }
    }
  });
  /*----------------------------------------------------*/

  /* Highlight the current section in the navigation bar
  ------------------------------------------------------*/

  var sections = $("section"),
      navigation_links = $("#nav-wrap a");
  sections.waypoint({
    handler: function handler(direction) {
      var active_section;
      active_section = $('section#' + this.element.id);
      if (direction === "up") active_section = active_section.prev();
      var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');
      navigation_links.parent().removeClass("current");
      active_link.parent().addClass("current");
    },
    offset: '25%'
  });
  /*----------------------------------------------------*/

  /* FitText Settings
  ------------------------------------------------------ */

  setTimeout(function () {
    $('#hero-slider h1').fitText(1, {
      minFontSize: '30px',
      maxFontSize: '49px'
    });
  }, 100);
  /*-----------------------------------------------------*/

  /* Mobile Menu
  ------------------------------------------------------ */

  var menu_icon = $("<span class='menu-icon'>Menu</span>");
  var toggle_button = $("<a>", {
    id: "toggle-btn",
    html: "",
    title: "Menu",
    href: "#"
  });
  var nav_wrap = $('nav#nav-wrap');
  var nav = $("ul#nav");
  /* if JS is enabled, remove the two a.mobile-btns
  and dynamically prepend a.toggle-btn to #nav-wrap */

  nav_wrap.find('a.mobile-btn').remove();
  toggle_button.append(menu_icon);
  nav_wrap.prepend(toggle_button);
  toggle_button.on("click", function (e) {
    e.preventDefault();
    nav.slideToggle("fast");
  });
  if (toggle_button.is(':visible')) nav.addClass('mobile');
  $(window).resize(function () {
    if (toggle_button.is(':visible')) nav.addClass('mobile');else nav.removeClass('mobile');
  });
  $('ul#nav li a').on("click", function () {
    if (nav.hasClass('mobile')) nav.fadeOut('fast');
  });
  /*----------------------------------------------------*/

  /* Smooth Scrolling
  ------------------------------------------------------ */

  $('.smoothscroll').on('click', function (e) {
    e.preventDefault();
    var target = this.hash,
        $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 800, 'swing', function () {
      window.location.hash = target;
    });
  });
  /*----------------------------------------------------*/

  /*	Modal Popup
  ------------------------------------------------------*/

  $('.item-wrap a').magnificPopup({
    type: 'inline',
    fixedContentPos: false,
    removalDelay: 300,
    showCloseBtn: false,
    mainClass: 'mfp-fade'
  });
  $(document).on('click', '.popup-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });
  /*----------------------------------------------------*/

  /*	contact form
  ------------------------------------------------------*/

  /* local validation */

  $('#contactForm').validate({
    /* submit via ajax */
    submitHandler: function submitHandler(form) {
      var sLoader = $('#submit-loader');
      $.ajax({
        type: "POST",
        url: "inc/sendEmail.php",
        data: $(form).serialize(),
        beforeSend: function beforeSend() {
          sLoader.fadeIn();
        },
        success: function success(msg) {
          // Message was sent
          if (msg == 'OK') {
            sLoader.fadeOut();
            $('#message-warning').hide();
            $('#contactForm').fadeOut();
            $('#message-success').fadeIn();
          } // There was an error
          else {
              sLoader.fadeOut();
              $('#message-warning').html(msg);
              $('#message-warning').fadeIn();
            }
        },
        error: function error() {
          sLoader.fadeOut();
          $('#message-warning').html("Something went wrong. Please try again.");
          $('#message-warning').fadeIn();
        }
      });
    }
  });
})(jQuery);
/* --------------------------------------------------
 * plugin | owl carousel
 * --------------------------------------------------*/


function load_owl() {
  jQuery("#items-carousel").owlCarousel({
    center: false,
    rewind: true,
    margin: 25,
    nav: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    dots: false,
    responsive: {
      1000: {
        items: 3
      },
      600: {
        items: 2
      },
      0: {
        items: 1
      }
    }
  });
  jQuery(".carousel-3").owlCarousel({
    center: false,
    items: 3,
    rewind: true,
    margin: 25,
    nav: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    dots: false,
    responsive: {
      1000: {
        items: 3
      },
      600: {
        items: 2
      },
      0: {
        items: 1
      }
    }
  });
  jQuery("#carousel__testimonial").owlCarousel({
    center: false,
    loop: true,
    items: 1,
    singleItem: true,
    rewind: true,
    margin: 25,
    nav: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    dots: false
  });
  jQuery("#collection-carousel").owlCarousel({
    center: false,
    items: 4,
    loop: true,
    margin: 25,
    nav: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    dots: false,
    responsive: {
      1000: {
        items: 4
      },
      600: {
        items: 2
      },
      0: {
        items: 1
      }
    }
  });
  jQuery("#items-carousel-big").owlCarousel({
    center: false,
    animateOut: 'fadeOut',
    animateIn: 'flipInY',
    items: 1,
    loop: true,
    margin: 0,
    nav: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    dots: false
  });
  jQuery("#before-after-carousel-big").owlCarousel({
    center: false,
    animateOut: 'fadeOut',
    animateIn: 'flipInY',
    items: 1,
    loop: true,
    margin: 0,
    nav: false,
    mouseDrag: false,
    touchDrag: false,
    dots: true
  });
  jQuery("#items-carousel-5-cols").owlCarousel({
    center: false,
    items: 5,
    rewind: true,
    margin: 25,
    nav: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    dots: false,
    responsive: {
      1000: {
        items: 5
      },
      800: {
        items: 3
      },
      600: {
        items: 2
      },
      0: {
        items: 1
      }
    }
  });
  jQuery("#collection-carousel-5-cols").owlCarousel({
    center: false,
    items: 5,
    loop: true,
    margin: 25,
    nav: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    dots: false,
    responsive: {
      1000: {
        items: 5
      },
      800: {
        items: 3
      },
      600: {
        items: 2
      },
      0: {
        items: 1
      }
    }
  });
  jQuery("#item-carousel-big").owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    dots: false,
    responsive: {
      1000: {
        items: 3
      },
      600: {
        items: 2
      },
      0: {
        items: 1
      }
    }
  });
  jQuery("#item-carousel-big-type-3").owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    dots: false,
    responsive: {
      1000: {
        items: 2
      },
      600: {
        items: 2
      },
      0: {
        items: 1
      }
    }
  });
  jQuery("#item-carousel-big-type-2").owlCarousel({
    autoplay: true,
    loop: true,
    margin: 25,
    nav: false,
    dots: false,
    responsive: {
      1000: {
        items: 1
      },
      600: {
        items: 1
      },
      0: {
        items: 1
      }
    }
  });
  jQuery("#item-carousel-big-type-4").owlCarousel({
    center: true,
    loop: true,
    margin: 0,
    nav: false,
    dots: false,
    responsive: {
      1000: {
        items: 4
      },
      600: {
        items: 2
      },
      0: {
        items: 2
      }
    }
  });
  var owl = $('#item-carousel-big,#item-carousel-big-type-4');
  owl.owlCarousel();
  $('.d-carousel .d-arrow-right').on("click", function () {
    owl.trigger('next.owl.carousel');
  });
  $('.d-carousel .d-arrow-left').on("click", function () {
    owl.trigger('prev.owl.carousel');
  });
  var owl_2 = $('#item-carousel-big-type-2');
  owl_2.owlCarousel();
  $('.d-carousel .d-arrow-right').on("click", function () {
    owl_2.trigger('next.owl.carousel');
  });
  $('.d-carousel .d-arrow-left').on("click", function () {
    owl_2.trigger('prev.owl.carousel');
  });
  var owl_3 = $('#item-carousel-big-type-3');
  owl_3.owlCarousel();
  $('.d-carousel .d-arrow-right').on("click", function () {
    owl_3.trigger('next.owl.carousel');
  });
  $('.d-carousel .d-arrow-left').on("click", function () {
    owl_3.trigger('prev.owl.carousel');
  });
  jQuery("#event-carousel").owlCarousel({
    center: false,
    items: 3,
    loop: true,
    margin: 0,
    nav: false,
    dots: false,
    responsive: {
      1000: {
        items: 3
      },
      600: {
        items: 3
      },
      0: {
        items: 1
      }
    }
  });
  jQuery("#crypto-carousel").owlCarousel({
    center: false,
    items: 4,
    loop: true,
    margin: 25,
    nav: false,
    dots: false,
    responsive: {
      1000: {
        items: 4
      },
      600: {
        items: 3
      },
      0: {
        items: 1
      }
    }
  });
  jQuery("#ss-carousel").owlCarousel({
    center: true,
    items: 4,
    loop: true,
    margin: 60,
    responsive: {
      1000: {
        items: 4
      },
      600: {
        items: 3
      },
      0: {
        items: 2
      }
    }
  });
  jQuery(".rtl #testimonial-carousel").owlCarousel({
    center: false,
    loop: true,
    margin: 25,
    rtl: true,
    responsive: {
      1000: {
        items: 3
      },
      600: {
        items: 1
      },
      0: {
        items: 1
      }
    }
  });
  jQuery("#testimonial-carousel").owlCarousel({
    center: false,
    loop: true,
    margin: 25,
    responsive: {
      1000: {
        items: 3
      },
      600: {
        items: 1
      },
      0: {
        items: 1
      }
    }
  });
  jQuery("#blog-carousel").owlCarousel({
    center: false,
    items: 3,
    loop: true,
    margin: 25,
    responsive: {
      1000: {
        items: 3
      },
      600: {
        items: 2
      },
      0: {
        items: 1
      }
    }
  });
  jQuery("#carousel-blog").owlCarousel({
    center: false,
    items: 5,
    loop: false,
    margin: 25,
    responsive: {
      1000: {
        items: 3
      },
      600: {
        items: 2
      },
      0: {
        items: 1
      }
    }
  });
  jQuery("#carousel-blog-2-cols").owlCarousel({
    center: false,
    items: 2,
    loop: false,
    margin: 25,
    responsive: {
      1000: {
        items: 2
      },
      600: {
        items: 2
      },
      0: {
        items: 1
      }
    }
  });
  jQuery("#owl-logo").owlCarousel({
    center: false,
    items: 6,
    loop: true,
    dots: false,
    margin: 25,
    autoplay: true,
    autoplayTimeout: 2000,
    responsive: {
      1000: {
        items: 6
      },
      600: {
        items: 4
      },
      0: {
        items: 2
      }
    }
  });
  jQuery(".project-carousel-4-nav").owlCarousel({
    center: true,
    items: 4,
    loop: true,
    margin: 15,
    responsive: {
      1000: {
        items: 4
      },
      600: {
        items: 3
      },
      0: {
        items: 1
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var openFormBtn = document.getElementById('openFormBtn');
  var closeFormBtn = document.getElementById('closeFormBtn');
  var formContainer = document.getElementById('formContainer');
  var briefForm = document.getElementById('briefForm');
  openFormBtn.addEventListener('click', function () {
    formContainer.classList.add('open');
  });
  closeFormBtn.addEventListener('click', function () {
    formContainer.classList.remove('open');
  });
  briefForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission
    // Here you can add code to send the form data using AJAX or any other method
    // For demonstration, let's just close the form after submission

    formContainer.classList.remove('open'); // You can also reset the form fields if needed

    briefForm.reset();
  });
});
document.getElementById("mc-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission behavior

  var email = document.getElementById("mc-email").value;
  subscribe(email);
});

function subscribe(email) {
  // Display prompt message
  document.getElementById("promptMessage").style.display = "block"; // Simulate a delay of 5 seconds (5000 milliseconds)

  setTimeout(function () {
    // Here, you would typically make an AJAX request to submit the form data to Mailchimp
    // For demonstration purposes, we'll just log the email to console
    console.log("Subscribed email: " + email); // Reset the form and hide the prompt message after subscription is complete

    document.getElementById("subscriptionForm").reset();
    document.getElementById("promptMessage").style.display = "none";
  }, 5000);
}