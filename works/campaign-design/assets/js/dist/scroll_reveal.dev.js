"use strict";

ScrollReveal().reveal({
  reset: true,
  distance: '60px',
  duration: 2500,
  delay: 400
});
ScrollReveal().reveal('.banner_big_title, .image_widget, .section_heading', {
  delay: 500,
  origin: 'left',
  distance: '200px'
});
ScrollReveal().reveal('.banner_description, .heading_description', {
  delay: 900,
  origin: 'right',
  distance: '200px',
  interval: 200
});