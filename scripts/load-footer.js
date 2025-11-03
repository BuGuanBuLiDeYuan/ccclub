// Load footer component dynamically
(function() {
    // Function to load footer
    function loadFooter() {
        const footerPlaceholder = document.getElementById('footer-placeholder');

        if (!footerPlaceholder) {
            console.warn('Footer placeholder not found');
            return;
        }

        // Determine the correct path based on current page location
        const currentPath = window.location.pathname;
        let footerPath = 'components/footer.html';

        // Adjust path for pages in subdirectories
        if (currentPath.includes('/tutorials/') || currentPath.includes('/examples/')) {
            footerPath = '../components/footer.html';
        }

        // Fetch and insert footer
        fetch(footerPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Footer not found');
                }
                return response.text();
            })
            .then(html => {
                footerPlaceholder.innerHTML = html;

                // Adjust links for subdirectories
                if (currentPath.includes('/tutorials/') || currentPath.includes('/examples/')) {
                    adjustLinksForSubdirectory(footerPlaceholder);
                }
            })
            .catch(error => {
                console.error('Error loading footer:', error);
            });
    }

    // Adjust links for pages in subdirectories
    function adjustLinksForSubdirectory(container) {
        const links = container.querySelectorAll('a[href]:not([href^="http"]):not([href^="mailto"])');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (!href.startsWith('../') && !href.startsWith('/')) {
                link.setAttribute('href', '../' + href);
            }
        });

        // Adjust image paths
        const images = container.querySelectorAll('img[src]');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (!src.startsWith('../') && !src.startsWith('/') && !src.startsWith('http')) {
                img.setAttribute('src', '../' + src);
            }
        });
    }

    // Load footer when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadFooter);
    } else {
        loadFooter();
    }
})();
