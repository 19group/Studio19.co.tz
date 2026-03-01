"use strict";

var logoSlide = document.querySelector('.client-logo-slide');

function duplicateLogos() {
  var logos = logoSlide.querySelectorAll('img');
  logos.forEach(function (logo) {
    var clone = logo.cloneNode(true);
    logoSlide.appendChild(clone);
  });
}

duplicateLogos();