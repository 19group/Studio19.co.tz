const archiveWrapper = document.getElementById('archive-wrapper');
const categoryCheckBoxes = document.querySelectorAll('.cat-check');
const filtersContainer = document.getElementById('filters-container');
const locationFiltersContainer = document.getElementById('location-filters-container');
const tagsFiltersContainer = document.getElementById('tags-filters-container');
const searchInput = document.getElementById('search');
const locationCheckBoxes = document.querySelectorAll('.loc-check'); 
const tagsCheckBoxes = document.querySelectorAll('.tag-check'); 

let archive = [];
const archiveElements = [];

function createArchiveElement(item) {
    const archiveElement = document.createElement('div');
    archiveElement.className = 'item wow fadeIn space-y-2';
    archiveElement.innerHTML = `
    <div class="flex justify-center relative overflow-hidden group cursor-pointer border rounded-xl">
        <img src="${item.imgurl}" alt="${item.title}" class="w-full h-full object-cover" />
        <div class="video-play-button">
            <i class="fa-solid fa-play text-white text-4xl"></i>
        </div>
        <div class="video-link">
            <a class="popup-video" href="${item.videourl}"></a>
        </div>
    </div>
    <p class="text-base">${item.title}</p>
    `;
    const playButton = archiveElement.querySelector('.video-play-button');
    playButton.addEventListener('click', function() {
        $(archiveElement.querySelector('.popup-video')).magnificPopup('open');
    });
    return archiveElement;
}

document.addEventListener("DOMContentLoaded", function() {
    fetch('./js/archive.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
        return response.json()
    })
    .then(data => {
        console.log('Data fetched successfully:', data);
        archive = data;
        archive.forEach((item) => {
            const archiveElement = createArchiveElement(item);
            archiveElements.push(archiveElement);
            archiveWrapper.appendChild(archiveElement);
        });
        initializeMagnificPopup();
        applyFiltersFromURL();  
    })
    .catch(error => console.error('Error fetching data:', error));
});

function initializeMagnificPopup() {
    $('.popup-video').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
}

filtersContainer.addEventListener('change', () => {
    filterArchive();
    updateURLWithFilters();
});
searchInput.addEventListener('input', () => {
    filterArchive();
    updateURLWithFilters();
});
locationFiltersContainer.addEventListener('change', () => {
    filterArchive();
    updateURLWithFilters();
});
tagsFiltersContainer.addEventListener('change', () => {
    filterArchive();
    updateURLWithFilters();
});

function filterArchive() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const checkedCategories = Array.from(categoryCheckBoxes)
        .filter((catCheck) => catCheck.checked)
        .map((catCheck) => catCheck.id);
    const checkedLocations = Array.from(locationCheckBoxes)
        .filter((locCheck) => locCheck.checked)
        .map((locCheck) => locCheck.id);
    const checkedTags = Array.from(tagsCheckBoxes)
        .filter((tagsCheck) => tagsCheck.checked)
        .map((tagsCheck) => tagsCheck.id);
  
    archiveElements.forEach((archiveElement, index) => {
        const archiveItem = archive[index]; 
        const matchesSearchTerm = archiveItem.title.toLowerCase().includes(searchTerm);
        const isInCheckedCategory = checkedCategories.length === 0 || checkedCategories.includes(archiveItem.category);
        const isInCheckedLocation = checkedLocations.length === 0 || checkedLocations.includes(archiveItem.location.toLowerCase());
        const isInCheckedTags = checkedTags.length === 0 || checkedTags.includes(archiveItem.tag);

        if (matchesSearchTerm && isInCheckedCategory && isInCheckedLocation && isInCheckedTags) {
            archiveElement.classList.remove('hidden');
        } else {
            archiveElement.classList.add('hidden');
        }
    });
    initializeMagnificPopup();
}

function updateURLWithFilters() {
    const searchTerm = encodeURIComponent(searchInput.value.trim().toLowerCase());
    const checkedCategories = Array.from(categoryCheckBoxes)
        .filter((catCheck) => catCheck.checked)
        .map((catCheck) => catCheck.id);
    const checkedLocations = Array.from(locationCheckBoxes)
        .filter((locCheck) => locCheck.checked)
        .map((locCheck) => locCheck.id);
    const checkedTags = Array.from(tagsCheckBoxes)
        .filter((tagsCheck) => tagsCheck.checked)
        .map((tagsCheck) => tagsCheck.id);
    
    const params = new URLSearchParams();
    params.append('filter', 'on');
    if (searchTerm) params.append('search', searchTerm);
    checkedCategories.forEach(category => params.append('category', category));
    checkedLocations.forEach(location => params.append('location', location));
    checkedTags.forEach(tag => params.append('tag', tag));
    
    const baseURL = window.location.origin + window.location.pathname;
    const filterURL = `${baseURL}?${params.toString()}`;
    
    console.log('Constructed URL:', filterURL); 
    window.history.replaceState({}, '', filterURL); 
}

function applyFiltersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);

    const searchTerm = urlParams.get('search');
    searchInput.value = searchTerm || '';

    const categories = urlParams.getAll('category');
    console.log('Categories:', categories); 
    categoryCheckBoxes.forEach(checkbox => {
        checkbox.checked = categories.includes(checkbox.id);
    });

    const locations = urlParams.getAll('location');
    console.log('Locations:', locations); 
    locationCheckBoxes.forEach(checkbox => {
        checkbox.checked = locations.includes(checkbox.id);
    });

    const tags = urlParams.getAll('tag');
    console.log('Tags:', tags); 
    tagsCheckBoxes.forEach(checkbox => {
        checkbox.checked = tags.includes(checkbox.id);
    });

    filterArchive();
}

window.addEventListener('DOMContentLoaded', () => {
    applyFiltersFromURL();
});
