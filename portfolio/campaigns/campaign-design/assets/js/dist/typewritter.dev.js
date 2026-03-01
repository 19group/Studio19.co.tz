"use strict";

var words = ["Move People", "Change People"];
var wordIndex = 0;
var charIndex = 0;
var typingDelay = 100;
var erasingDelay = 50;
var wordDelay = 1000;
var typeWords = document.querySelector("typeWords");

function type() {
  if (charIndex < words[wordIndex].length) {
    typeWords.textContent += words[wordIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, wordDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typeWords.textContent = words[wordIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, typingDelay);
  }
} // Start typing when the page loads


window.onload = type;