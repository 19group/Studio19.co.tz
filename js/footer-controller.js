// Detect the site root path from this script's own src attribute
let footerRootPath = './';
const _fscripts = document.getElementsByTagName('script');
for (let i = 0; i < _fscripts.length; i++) {
    const src = _fscripts[i].getAttribute('src');
    if (src && src.includes('footer-controller.js')) {
        footerRootPath = src.replace('js/footer-controller.js', '');
        if (footerRootPath === '') footerRootPath = './';
        break;
    }
}

async function loadContactFooter() {
    try {
        const fetchPath = `${footerRootPath}inc/contact-footer.html?v=2`.replace('//', '/');
        const response = await fetch(fetchPath);
        if (!response.ok) throw new Error('Failed to load contact footer');

        let html = await response.text();
        // Resolve the logo and any other root-relative assets
        html = html.replace(/\{ROOT_PATH\}/g, footerRootPath);

        const existing = document.querySelector('footer, #footer');
        if (existing) {
            existing.outerHTML = html;
        } else {
            document.body.insertAdjacentHTML('beforeend', html);
        }
    } catch (err) {
        console.error('Footer loading error:', err);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadContactFooter);
} else {
    loadContactFooter();
}
