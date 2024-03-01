const words = ["Move People", "Change People"];
let wordIndex = 0;
let charIndex = 0;
const typingDelay = 100;
const erasingDelay = 50;
const wordDelay = 1000;

const typeWords = document.querySelector("typeWords");

function type() {
    if (charIndex < words[wordIndex].length){
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
  }
// Start typing when the page loads
window.onload = type;