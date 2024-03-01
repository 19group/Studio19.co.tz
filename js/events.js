const Events = () => {
  viewMoreImages()
}

Events();

function viewMoreImages() {
  const btnViewAllImages = document.querySelector(".btn-view-all-images");
  const imageGallery = document.querySelector(".unicef-gallery");
  
  btnViewAllImages.addEventListener("click", () => {
    if (imageGallery.className == "unicef-gallery") {
      imageGallery.classList.add("unicef-gallery-more");
      btnViewAllImages.innerHTML = "";
      btnViewAllImages.innerHTML = "View Less Images";
    } else {
      imageGallery.classList.remove("unicef-gallery-more");
      btnViewAllImages.innerHTML = "";
      btnViewAllImages.innerHTML = "View More Images";
    }    
  })
}