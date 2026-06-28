document.addEventListener("DOMContentLoaded", function () {
    const headerElement = document.querySelector('header');
    
    if (headerElement) {
        // DISESUAIKAN: Menggunakan huruf kecil 'components/header.html' sesuai folder asli GitHub Anda
        const antiCacheToken = new Date().getTime();
        const headerUrl = 'assets/components/header.html?v=' + antiCacheToken;

        fetch(headerUrl)
            .then(response => {
                if (!response.ok) throw new Error('Gagal memuat komponen header');
                return response.text();
            })
            .then(htmlContent => {
                // Memasukkan isi HTML Kop ke dalam wadah <header>
                headerElement.innerHTML = htmlContent;
                
                // MENGATUR MENU AKTIF WARNA KUNING SECARA OTOMATIS
                try {
                    const currentPath = window.location.pathname.toLowerCase();
                    const currentFile = currentPath.split('/').pop();
                    
                    const navLinks = headerElement.querySelectorAll('.navbar-nav .nav-link');
                    
                    navLinks.forEach(link => {
                        const linkHref = link.getAttribute('href').toLowerCase();
                        
                        const isAbsoluteMatch = currentFile === linkHref;
                        const isFolderEndMatch = (currentPath.endsWith('/') || currentFile === '') && linkHref === 'index.html';
                        const isPartialMatch = currentFile.includes(linkHref) && linkHref !== '';

                        if (isAbsoluteMatch || isFolderEndMatch || isPartialMatch) {
                            link.classList.add('active', 'text-warning');
                        } else {
                            link.classList.remove('active', 'text-warning');
                        }
                    });
                } catch (navError) {
                    console.warn("Deteksi menu aktif dilewati:", navError);
                }
            })
            .catch(error => console.error('Kendala sistem Header:', error));
    }
  
});
