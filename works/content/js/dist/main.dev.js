"use strict";

/* Light YouTube Embeds by @labnol */

/* Web: http://labnol.org/?p=27941 */
document.addEventListener("DOMContentLoaded", function () {
  /* New Hero Section Code */
  var images = [{
    title: "Studio 19 Intro",
    number: "1",
    bg: "url('images/videoBg.jpg')",
    video: "https://player.vimeo.com/external/336582700.hd.mp4?s=76179007cda9a68e6c6e6f4e8f8e8d16dc18f4d6&profile_id=175"
  }, {
    title: "Education Documentaries",
    number: "2",
    bg: "url('images/unicef-thumbnail.jpg')",
    video: "https://player.vimeo.com/video/951113503?h=8534d5225e"
  }, {
    title: "Agriculture Documetnaries",
    number: "3",
    bg: "url('images/agriculture-thumbnail.jpg')",
    video: "https://player.vimeo.com/video/953133765?h=9150c0eff2"
  }, {
    title: "Education Documentaries",
    number: "4",
    bg: "url('images/school-thumbnail.jpg')",
    video: "https://player.vimeo.com/video/951080803?h=e1392ad1aa"
  }];
  var currentIndex = 0;
  var currentIndexOne = 0;

  function updateHeroSection() {
    var hero = document.getElementById('hero-section');
    var title = document.getElementById('image-title');
    var trailerVideo = document.getElementById('trailer-video');
    hero.style.backgroundImage = images[currentIndex].bg;
    title.textContent = images[currentIndex].title;
    trailerVideo.src = images[currentIndex].video;
  }

  document.getElementById('trailer-btn').addEventListener('click', function () {
    var currentProject = images[currentIndex];
    var trailerVideo = document.getElementById('trailer-video');
    trailerVideo.src = currentProject.video;
    $('#trailer-modal').modal('show');
  });
  var projectNumbers = document.querySelectorAll('.project-number');
  projectNumbers.forEach(function (number, index) {
    number.addEventListener('click', function (event) {
      event.preventDefault();
      currentIndex = index;
      updateHeroSection();
    });
  });
  setInterval(function () {
    currentIndex = (currentIndex + 1) % images.length;
    updateHeroSection();
  }, 5000);
  updateHeroSection();
  /* Light YouTube Embeds */

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
  var embed = "https://www.youtube.com/embed/ID";
  iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("allowfullscreen", "1");
  this.parentNode.replaceChild(iframe, this);
}
/* Main JS */


(function ($) {
  "use strict";
  /* Preloader */

  $(window).load(function () {
    $("#loader").fadeOut("slow");
  });

  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js').then(function (registration) {
      console.log('ServiceWorker registration successful with scope:', registration.scope);
    })["catch"](function (error) {
      console.log('ServiceWorker registration failed:', error);
    });
  }
  /* Flexslider */


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
  /* Adjust Primary Navigation Opacity */

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
  /* Highlight the current section in the navigation bar */

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
  /* FitText Settings */

  setTimeout(function () {
    $('#hero-slider h1').fitText(1, {
      minFontSize: '30px',
      maxFontSize: '49px'
    });
  }, 100);
  /* Mobile Menu */

  var menu_icon = $("<span class='menu-icon'>Menu</span>");
  var toggle_button = $("<a>", {
    id: "toggle-btn",
    html: "",
    title: "Menu",
    href: "#"
  });
  var nav_wrap = $('nav#nav-wrap');
  var nav = $("ul#nav");
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
  /* Smooth Scrolling */

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
  /* Modal Popup */

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
  /* Placeholder Plugin Settings */

  $('input, textarea').placeholder();
  /* Contact Form */

  $('#contactForm').validate({
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
          if (msg == 'OK') {
            sLoader.fadeOut();
            $('#message-warning').hide();
            $('#contactForm').fadeOut();
            $('#message-success').fadeIn();
          } else {
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
  /* Video Popup */

  $('.popup-video').magnificPopup({
    type: 'iframe'
  });
  /* Form Button Section */

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
      e.preventDefault();
      formContainer.classList.remove('open');
      briefForm.reset();
    });
  }); // document.addEventListener("DOMContentLoaded", function() {
  //     const form = document.getElementById("mc-form");
  //     if (form) {
  //         form.addEventListener("submit", function(event) {
  //             event.preventDefault();
  //             const email = document.getElementById("mc-email").value;
  //             subscribe(email);
  //         });
  //     } else {
  //         console.error("Form with ID 'mc-form' not found in the DOM.");
  //     }
  // });
})(jQuery);