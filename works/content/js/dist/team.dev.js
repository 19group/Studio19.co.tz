"use strict";

var imgBx = document.querySelectorAll('.imgBx');
var contentBx = document.querySelectorAll('.contentBx');

for (var i = 0; i < imgBx.length; i++) {
  imgBx[i].addEventListener('mouseover', function () {
    for (var _i = 0; _i < contentBx.length; _i++) {
      contentBx[_i].className = 'contentBx';
    }

    document.getElementById(this.dataset.id).className = 'contentBx active';

    for (var _i2 = 0; _i2 < imgBx.length; _i2++) {
      imgBx[_i2].className = 'imgBx';
    }

    this.className = "imgBx active";
  });
}