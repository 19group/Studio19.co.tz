const archive = [
    {
        title: 'one',
        url: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'event',
        location: 'Tanzania',
        pageUrl:'#',
    },
    {
        title: 'two',
        url: 'https://images.unsplash.com/photo-1562342918-28657524a992?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWR2ZXJ0fGVufDB8fDB8fHww',
        category: 'commercials',
        location: 'kenya',
        pageUrl:'#',

    },
    {
        title: 'three',
        url: 'https://images.unsplash.com/photo-1612623683850-c5bdd627e288?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fGRvY3VtZW50YXJ5fGVufDB8fDB8fHww',
        category: 'documentary',
        location: 'Uganda',
        pageUrl:'#',

    },
    {
        title: 'four',
        url: 'https://images.unsplash.com/photo-1616418625298-baef98bc34f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWR2ZXJ0fGVufDB8fDB8fHww',
        category: 'commercials',
        location: 'Malawi',
        pageUrl:'#',

    },
    {
        title: 'five',
        url: 'https://images.unsplash.com/photo-1613399421098-f943ea81f1c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGRvY3VtZW50YXJ5fGVufDB8fDB8fHww',
        category: 'documentary',
        location: 'Usa',
        pageUrl:'#',

    },
    {
        title: 'six',
        url: 'https://images.unsplash.com/photo-1561489396-888724a1543d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'event',
        location: 'Kenya',
        pageUrl:'#',

    },
    {
        title: '7',
        url: 'https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGRvY3VtZW50YXJ5fGVufDB8fDB8fHww',
        category: 'documentary',
        location: 'Tanzania',
        pageUrl:'#',

    },
    {
        title: '8',
        url: 'https://images.unsplash.com/photo-1619851831409-773a3c8a3cb3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWR2ZXJ0fGVufDB8fDB8fHww',
        category: 'commercials',
        location: 'Uganda',
        pageUrl:'#',

    },
    {
        title: 'nine',
        url: 'https://images.unsplash.com/photo-1584445743187-cd8ba040349a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFkdmVydHxlbnwwfHwwfHx8MA%3D%3D',
        category: 'commercials',
        location: 'Tanzania',
        pageUrl:'#',

    },
    {
        title: 'ten',
        url: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGV2ZW50fGVufDB8fDB8fHww',
        category: 'event',
        location: 'Usa',
        pageUrl:'#',

    },
    {
        title: 'eleven',
        url: 'https://images.unsplash.com/photo-1510511233900-1982d92bd835?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGV2ZW50fGVufDB8fDB8fHww',
        category: 'event',
        location: 'Kenya',
        pageUrl:'#',

    },
    {
        title: 'twelve',
        url: 'https://images.unsplash.com/photo-1612623684062-f5101b1cecec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRvY3VtZW50YXJ5fGVufDB8fDB8fHww',
        category: 'documentary ',
        location: 'Malawi',
        pageUrl:'#',

    },
];

const archiveWrapper = document.getElementById('archive-wrapper');
const categoryCheckBoxes = document.querySelectorAll('.cat-check');
const filtersContainer = document.getElementById('filters-container');
const locationFiltersContainer = document.getElementById('location-filters-container');
const searchInput = document.getElementById('search');
const locationCheckBoxes = document.querySelectorAll('.loc-check'); 


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
        <button class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0"
        Add To Cart
        </button
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


function filterArchive() {
    const searchTerm = searchInput.value.trim().toLowerCase();
  
    const checkedCategories = Array.from(categoryCheckBoxes)
        .filter((catCheck) => catCheck.checked)
        .map((catCheck) => catCheck.id);
  
    const checkedLocations = Array.from(locationCheckBoxes)
        .filter((locCheck) => locCheck.checked)
        .map((locCheck) => locCheck.id);
  
    archiveElements.forEach((archiveElement) => {
        const index = archiveElements.indexOf(archiveElement);
        if (index >= 0 && index < archive.length) {
            const archiveItem = archive[index]; 
  
            const matchesSearchTerm = archiveItem.title.toLowerCase().includes(searchTerm);
            const isInCheckedCategory = checkedCategories.length === 0 || checkedCategories.includes(archiveItem.category);
            const isInCheckedLocation = checkedLocations.length === 0 || checkedLocations.includes(archiveItem.location.toLowerCase());
  
            if (matchesSearchTerm && isInCheckedCategory && isInCheckedLocation) {
                archiveElement.classList.remove('hidden');
            } else {
                archiveElement.classList.add('hidden');
            }
        }
    });
}