const logoSlide = document.querySelector('.client-logo-slide');

function duplicateLogos() {
  const logos = logoSlide.querySelectorAll('img');
  logos.forEach((logo) => {
    const clone = logo.cloneNode(true);
    logoSlide.appendChild(clone);
  });
}

duplicateLogos();
