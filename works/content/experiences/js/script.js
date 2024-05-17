const archive = [
    {
        title: 'Canso Africa Conference',
        url: 'canso-africa-conference-2019/images/thumbnail/canso-africa-conference-thumb.png',
        category: 'event',
        location: 'Tanzania',
        tag:'coverage',
        pageUrl:'canso-africa-conference-2019',
    },
    {
        title: 'FOSS4G Conference summary',
        url: 'FOSS4G-conference-summary/images/thumbnail/thumb.png',
        category: 'event',
        location: 'Tanzania',
        tag:'conference',
        pageUrl:'FOSS4G-conference-summary',

    },
    {
        title: 'Binti Day Event',
        url: 'binti-day/images/thumbnail/thumb.png',
        category: 'event',
        location: 'Tanzania',
        pageUrl:'binti-day',
        tag:'animation',

    },
    {
        title: 'Go Blue Launch Event',
        url: 'go-blue-launch-event/images/thumbnail/thumb.png',
        category: 'event',
        location: 'Tanzania',
        pageUrl:'go-blue-launch-event',

    },
    {
        title: 'The National Financial Inclusion Framework Launch',
        url: 'financial-inclusion/images/thumbnail/thumb.png',
        category: 'event',
        location: 'Tanzania',
        pageUrl:'financial-inclusion',
        tag:'educational',

    },
    {
        title: 'Improving Post-harvest Management',
        url: 'harvest-management/images/thumbnail/thumb.png',
        category: 'documentary',
        location: 'Tanzania',
        pageUrl:'harvest-management',
        tag:'animation',
    },
    
];

const archiveWrapper = document.getElementById('archive-wrapper');
const categoryCheckBoxes = document.querySelectorAll('.cat-check');
const filtersContainer = document.getElementById('filters-container');
const locationFiltersContainer = document.getElementById('location-filters-container');
const tagsFiltersContainer = document.getElementById('tags-filters-container');
const searchInput = document.getElementById('search');
const locationCheckBoxes = document.querySelectorAll('.loc-check'); 
const tagsCheckBoxes = document.querySelectorAll('.tag-check'); 


const archiveElements = [];

function createArchiveElement(item) {
    const archiveElement = document.createElement('a');
    archiveElement.className = 'item space-y-2';
    archiveElement.href = item.pageUrl;
    archiveElement.innerHTML = `
    <div class="flex justify-center relative overflow-hidden group cursor-pointer border rounded-xl">
        <img 
            src="${item.url}" 
            alt="${item.title}"
            class="w-full h-full object-cover"
        />
        
    </div>
    <p class="text-xl">${item.title}</p>
    `;

    archiveElement
    .querySelector('.status')
    // .addEventListener('click');

    return archiveElement;
}

archive.forEach((item) => {
    const archiveElement = createArchiveElement(item);
    archiveElements.push(archiveElement);
    archiveWrapper.appendChild(archiveElement);

    // Add event listener to each archive item
    archiveElement.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        window.location.href = item.pageUrl; // Redirect to single archive page
    });
});

filtersContainer.addEventListener('change', filterArchive);
searchInput.addEventListener('input', filterArchive);

locationFiltersContainer.addEventListener('change', filterArchive);
searchInput.addEventListener('input', filterArchive);

tagsFiltersContainer.addEventListener('change', filterArchive);
searchInput.addEventListener('input', filterArchive);


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
  
    archiveElements.forEach((archiveElement) => {
        const index = archiveElements.indexOf(archiveElement);
        if (index >= 0 && index < archive.length) {
            const archiveItem = archive[index]; 
  
            const matchesSearchTerm = archiveItem.title.toLowerCase().includes(searchTerm);
            const isInCheckedCategory = checkedCategories.length === 0 || checkedCategories.includes(archiveItem.category);
            const isInCheckedLocation = checkedLocations.length === 0 || checkedLocations.includes(archiveItem.location.toLowerCase());
            const isInCheckedTags = checkedTags.length === 0 || checkedTags.includes(archiveItem.tag);
  
            if (matchesSearchTerm && isInCheckedCategory && isInCheckedLocation &&isInCheckedTags) {
                archiveElement.classList.remove('hidden');
            } else {
                archiveElement.classList.add('hidden');
            }
        }
    });
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
    params.append('search', searchTerm);
    checkedCategories.forEach(category => params.append('category', category));
    checkedLocations.forEach(location => params.append('location', location));
    checkedTags.forEach(tag => params.append('tag', tag));
    
    
    const baseURL = window.location.origin + window.location.pathname;
    const filterURL = `${baseURL}?${params.toString()}`; 
    
    window.history.replaceState({}, '', filterURL); 
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

function applyFiltersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);

    const searchTerm = urlParams.get('search');
    searchInput.value = searchTerm || '';

    const categories = urlParams.getAll('category');
    categoryCheckBoxes.forEach(checkbox => {
        checkbox.checked = categories.includes(checkbox.id);
    });

    const locations = urlParams.getAll('location');
    locationCheckBoxes.forEach(checkbox => {
        checkbox.checked = locations.includes(checkbox.id);
    });

    const tags = urlParams.getAll('tag');
    tagsCheckBoxes.forEach(checkbox => {
        checkbox.checked = tags.includes(checkbox.id);
    });

    filterArchive();
}

window.addEventListener('DOMContentLoaded', () => {
    applyFiltersFromURL();
});
