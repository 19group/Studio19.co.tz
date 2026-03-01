"use strict";

var btnLeft = document.querySelector('.left-button');
var btnRight = document.querySelector('.right-button');
var tabMenu = document.querySelector('.tab-menu');

var IconVisibility = function IconVisibility() {
  var scrollLeftValue = Math.ceil(tabMenu.scrollLeft);
  var scrollableWidth = tabMenu.scrollWidth - tabMenu.clientWidth;
  btnLeft.style.display = scrollLeftValue > 0 ? "block" : "none";
  btnRight.style.display = scrollableWidth > scrollLeftValue ? "block" : "none";
};

btnRight.addEventListener('click', function () {
  tabMenu.scrollLeft += 100;
  setTimeout(function () {
    IconVisibility();
  }, 50);
});
btnLeft.addEventListener('click', function () {
  tabMenu.scrollLeft -= 100;
  setTimeout(function () {
    IconVisibility();
  }, 50);
});

window.onload = function () {
  btnRight.style.display = tabMenu.scrollWidth > tabMenu.clientWidth || tabMenu.scrollWidth >= window.innerWidth ? "block" : "none";
  btnLeft.style.display = tabMenu.scrollWidth >= window.innerWidth ? "block" : "none";
};

window.onresize = function () {
  btnRight.style.display = tabMenu.scrollWidth > tabMenu.clientWidth || tabMenu.scrollWidth >= window.innerWidth ? "block" : "none";
  var scrollLeftValue = Math.round(tabMenu.scrollLeft);
  btnLeft.style.display = scrollLeftValue > 0 ? "block" : "none";
}; // Dragging


var activeDrag = false;
tabMenu.addEventListener('mousemove', function (drag) {
  if (!activeDrag) return;
  tabMenu.scrollLeft -= drag.movementX;
  IconVisibility();
  tabMenu.classList.add('dragging');
});
document.addEventListener('mouseup', function () {
  activeDrag = false;
  tabMenu.classList.remove('dragging');
});
tabMenu.addEventListener('mousedown', function () {
  activeDrag = true;
}); // view Tab contents on click tab button

var tabs = document.querySelectorAll('.tab');
var tabBtns = document.querySelectorAll('.tab-btn');

var tab_Nav = function tab_Nav(tabBtnClick) {
  tabBtns.forEach(function (tabBtn) {
    tabBtn.classList.remove('active');
  });
  tabs.forEach(function (tab) {
    tab.classList.remove('active');
  });
  tabBtns[tabBtnClick].classList.add('active');
  tabs[tabBtnClick].classList.add('active');
};

tabBtns.forEach(function (tabBtn, i) {
  tabBtn.addEventListener('click', function () {
    tab_Nav(i);
  });
});