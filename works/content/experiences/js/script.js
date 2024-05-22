const archive = [
    {
        title: 'Canso Africa Conference',
        url: 'canso-africa-conference-2019/images/thumbnail/canso-africa-conference-thumb.png',
        pageUrl:'canso-africa-conference-2019',
        videourl:"",
        category: 'event',
        location: 'Tanzania',
        tag:'aviation',
    },
    {
        title: 'FOSS4G Conference',
        url: 'FOSS4G-conference-summary/images/thumbnail/thumb.png',
        pageUrl:'FOSS4G-conference-summary',
        videourl:"",
        category: 'event',
        location: 'Tanzania',
        tag:'technology',
    },
    {
        title: 'Binti Day Event',
        url: 'binti-day/images/thumbnail/thumb.png',
        pageUrl:'binti-day',
        videourl:"",
        category: 'event',
        location: 'Tanzania',
        tag:'women',
    },
    {
        title: 'Go Blue Launch Event',
        url: 'go-blue-launch-event/images/thumbnail/thumb.png',
        pageUrl:'go-blue-launch-event',
        videourl:"",
        category: 'event',
        location: 'Tanzania',
        tag:'children',
    },
    {
        title: 'The National Financial Inclusion Framework Launch',
        url: 'financial-inclusion/images/thumbnail/thumb.png',
        pageUrl:'financial-inclusion',
        videourl:"",
        category: 'event',
        location: 'Tanzania',
        tag:'financial',
    },
    {
        title: 'Improving Post-harvest Management',
        url: 'harvest-management/images/thumbnail/thumb.png',
        pageUrl:'harvest-management',
        videourl:"",
        category: 'documentary',
        location: 'Tanzania',
        tag:'agriculture',
    },
    {
        title: "GRREAT Diana's story",
        url: 'great-diana-story/images/thumbnail/thumb.png',
        pageUrl:'great-diana-story',
        videourl:"",
        category: 'documentary',
        location: 'Tanzania',
        tag:'women',
    },
    {
        title: "Participatory GIS and land Planning in Tanzania",
        url: 'gis-landplanning/images/thumbnail/thumb.png',
        pageUrl:'gis-landplanning',
        videourl:"",
        category: 'documentary',
        location: 'Tanzania',
        tag:'technology',
    },
    {
        title: "GOUI-POWERING LIFE",
        url: 'goui-powering-life/images/thumbnail/thumb.png',
        pageUrl:'goui-powering-life',
        videourl:"https://www.youtube.com/watch?v=yj7eMj_05Zg",
        category: 'documentary',
        location: 'Tanzania',
        tag:'energy',
    },
    {
        title: "Doris Mkiva International Day of Disability",
        url: 'international-dayofdisability/images/thumbnail/thumb.png',
        pageUrl:'international-dayofdisability',
        videourl:"",
        category: 'documentary',
        location: 'Tanzania',
        tag:'women',
    },
    {
        title: "Development of the National Strategy on Post harvest Management",
        url: 'national-strategy-postharvest-management/images/thumbnail/thumb.png',
        pageUrl:'national-strategy-postharvest-management',
        videourl:"",
        category: 'documentary',
        location: 'Tanzania',
        tag:'agriculture',
    },
    {
        title: "Artisans Producing Metal Silos",
        url: 'artisanproducing-metalsilos/images/thumbnail/thumb.png',
        pageUrl:'artisanproducing-metalsilos',
        videourl:"",
        category: 'documentary',
        location: 'Tanzania',
        tag:'agriculture',
    },
    {
        title: "Mr and Mrs Nassoro",
        url: 'mr-mrs-nassoro/images/thumbnail/thumb.png',
        pageUrl:'mr-mrs-nassoro',
        videourl:"",
        category: 'documentary',
        location: 'Tanzania',
        tag:'women',
    },
    {
        title: "Buni Hub Documentary",
        url: 'mr-mrs-nassoro/images/thumbnail/thumb.png',
        pageUrl:'mr-mrs-nassoro',
        videourl:'',
        category: 'documentary',
        location: 'Tanzania',
        tag:'technology',
    },
    {
        title: "Amorette TVC",
        url: 'mr-mrs-nassoro/images/thumbnail/thumb.png',
        pageUrl:'mr-mrs-nassoro',
        videourl:"",
        videourl:'',
        category: 'tvc',
        location: 'Tanzania',
        tag:'technology',
    },
    {
        title: "Dawasco TVC",
        url: 'mr-mrs-nassoro/images/thumbnail/thumb.png',
        pageUrl:'mr-mrs-nassoro',
        videourl:"",
        videourl:'',
        category: 'tvc',
        location: 'Tanzania',
        tag:'energy',
    },
    {
        title: "A PATH TO HIGHER EDUCATION AND EMPLOYMENT FOR REFUGEES",
        url: 'mr-mrs-nassoro/images/thumbnail/thumb.png',
        pageUrl:'mr-mrs-nassoro',
        videourl:'https://www.ted.com/talks/chrystina_russell_a_path_to_higher_education_and_employment_for_refugees',
        category: 'documentary',
        location: 'kenya',
        tag:'energy',
    },
    {
        title: "Towards a Blue Future in the Tanga-Pemba Seascape Initiative",
        url: 'mr-mrs-nassoro/images/thumbnail/thumb.png',
        pageUrl:'mr-mrs-nassoro',
        videourl:'https://vimeo.com/756844476/ae9dd09650',
        category: 'documentary',
        location: 'zanzibar',
        tag:'energy',
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
    <p class="text-base">${item.title}</p>
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
