document.addEventListener("DOMContentLoaded", function () {
    const footerElement = document.querySelector('footer');
    
    if (footerElement) {
        // Trik parameter waktu (?v=) memaksa browser mendownload data paling baru dari server
        const antiCacheUrl = 'assets/components/footer.html?v=' + new Date().getTime();

        fetch(antiCacheUrl)
            .then(response => {
                if (!response.ok) throw new Error('Gagal mengambil file footer.');
                return response.text();
            })
            .then(htmlData => {
                footerElement.innerHTML = htmlData;
            })
            .catch(error => console.error('Kendala sistem Footer:', error));
    }
});
