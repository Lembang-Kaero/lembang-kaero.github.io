document.addEventListener("DOMContentLoaded", function () {
    const headerElement = document.querySelector('header');
    
    if (headerElement) {
        const antiCacheToken = new Date().getTime();
        const headerUrl = 'assets/components/header.html?v=' + antiCacheToken;

        fetch(headerUrl)
            .then(response => {
                if (!response.ok) throw new Error('Gagal memuat komponen header');
                return response.text();
            })
            .then(htmlContent => {
                headerElement.innerHTML = htmlContent;
                
                // MENGATUR MENU AKTIF — TERMASUK DROPDOWN
                try {
                    const currentPath = window.location.pathname.toLowerCase();
                    const currentFile = currentPath.split('/').pop();
                    
                    // 1. Deteksi link navigasi utama (non-dropdown)
                    const navLinks = headerElement.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
                    
                    navLinks.forEach(link => {
                        const linkHref = link.getAttribute('href');
                        if (!linkHref) return;
                        
                        const linkFile = linkHref.toLowerCase().split('/').pop();
                        
                        const isAbsoluteMatch = currentFile === linkFile;
                        const isFolderEndMatch = (currentPath.endsWith('/') || currentFile === '') && linkFile === 'index.html';

                        if (isAbsoluteMatch || isFolderEndMatch) {
                            link.classList.add('active');
                        }
                    });

                    // 2. Deteksi item dropdown
                    const dropdownItems = headerElement.querySelectorAll('.dropdown-item');
                    
                    dropdownItems.forEach(item => {
                        const itemHref = item.getAttribute('href');
                        if (!itemHref) return;
                        
                        const itemFile = itemHref.toLowerCase().split('/').pop();
                        
                        if (currentFile === itemFile) {
                            // Tandai item dropdown sebagai aktif
                            item.classList.add('active');
                            
                            // Tandai parent dropdown-toggle sebagai aktif
                            const parentDropdown = item.closest('.dropdown');
                            if (parentDropdown) {
                                const dropdownToggle = parentDropdown.querySelector('.dropdown-toggle');
                                if (dropdownToggle) {
                                    dropdownToggle.classList.add('active');
                                }
                            }
                        }
                    });
                } catch (navError) {
                    console.warn("Deteksi menu aktif dilewati:", navError);
                }
            })
            .catch(error => console.error('Kendala sistem Header:', error));
    }
});
