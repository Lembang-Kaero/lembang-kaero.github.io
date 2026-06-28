/**
 * Header.js - Lembang Kaero Official Website Component
 * Berfungsi untuk memuat komponen Header (Navigasi) secara otomatis di seluruh halaman.
 */

document.addEventListener("DOMContentLoaded", function () {
    const headerElement = document.getElementById("header-component");
    
    if (headerElement) {
        // Render struktur HTML Navbar ke dalam elemen <header id="header-component"></header>
        headerElement.innerHTML = `
        <!-- Bagian Kop Atas (Identitas Instansi Resmi) -->
        <div class="bg-white py-3 border-bottom">
            <div class="container d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div class="d-flex align-items-center">
                    <!-- Logo Kabupaten Tana Toraja & Lambang Terkait -->
                    <img src="assets/img/logo.png" alt="Logo Tana Toraja" class="me-3" style="max-height: 70px; width: auto; object-fit: contain;">
                    <div>
                        <span class="text-secondary tracking-wider text-uppercase small d-block mb-1" style="font-size: 11px; font-weight: 600;">Website Resmi Pemerintah</span>
                        <h1 class="fw-bold text-uppercase m-0 tracking-wide" style="font-size: 26px; color: #8B0000; font-family: 'Poppins', sans-serif;">Lembang Kaero</h1>
                        <span class="text-muted small d-block mt-1" style="font-size: 12px;">Kecamatan Sangalla' • Kabupaten Tana Toraja • Provinsi Sulawesi Selatan</span>
                    </div>
                </div>
                <!-- Slogan Transparansi -->
                <div class="d-none d-md-block text-end">
                    <span class="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill fw-semibold text-uppercase tracking-wider" style="font-size: 10px;">
                        Transparan • Informatif • Melayani
                    </span>
                </div>
            </div>
        </div>

        <!-- Bagian Menu Navigasi Utama -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top py-2">
            <div class="container">
                <!-- Label Navigasi Mini untuk Tampilan Mobile -->
                <a class="navbar-brand d-lg-none fw-bold text-uppercase" href="index.html" style="font-size: 14px; tracking-spacing: 1px;">Menu Utama</a>

                <!-- Tombol Hamburger Menu (Responsif Ponsel) -->
                <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Wrapper Menu yang Didistribusikan Secara Merata -->
                <div class="collapse navbar-collapse px-3 px-lg-0" id="mainNavbar">
                    <ul class="navbar-nav w-100 justify-content-between align-items-center text-uppercase fw-semibold" style="font-size: 13px;">
                        <li class="nav-item"><a class="nav-link" href="index.html">Beranda</a></li>
                        <li class="nav-item"><a class="nav-link" href="profil.html">Profil</a></li>
                        <li class="nav-item"><a class="nav-link" href="pemerintahan.html">Pemerintahan</a></li>
                        <li class="nav-item"><a class="nav-link" href="berita.html">Berita</a></li>
                        <li class="nav-item"><a class="nav-link" href="layanan.html">Layanan</a></li>
                        <li class="nav-item"><a class="nav-link" href="transparansi.html">Transparansi</a></li>
                        <li class="nav-item"><a class="nav-link" href="galeri.html">Galeri</a></li>
                        <li class="nav-item"><a class="nav-link" href="regulasi.html">Regulasi</a></li>
                        <li class="nav-item"><a class="nav-link" href="kontak.html">Kontak</a></li>
                        
                        <!-- MENU PENGADUAN BARU -->
                        <li class="nav-item">
                            <a class="nav-link text-warning" href="pengaduan.html">
                                <i class="bi bi-exclamation-triangle-fill me-1"></i>Pengaduan
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        `;

        // --- SISTEM DETEKSI HALAMAN AKTIF (AUTOMATIC ACTIVE LINK) ---
        // Mengambil nama file HTML yang sedang dibuka saat ini
        const currentPath = window.location.pathname.split("/").pop();
        const navLinks = headerElement.querySelectorAll(".navbar-nav .nav-link");

        navLinks.forEach(link => {
            const linkHref = link.getAttribute("href");
            
            // Logika pencocokan URL halaman aktif
            if (currentPath === linkHref || (currentPath === "" && linkHref === "index.html")) {
                if (link.classList.contains("text-warning")) {
                    // Jika halaman yang aktif adalah Pengaduan, pertahankan warna kuning dan tebalkan font
                    link.classList.add("fw-bold", "border-bottom", "border-warning");
                } else {
                    // Jika halaman biasa, berikan kelas active bawaan Bootstrap
                    link.classList.add("active");
                }
            }
        });
    }
});
