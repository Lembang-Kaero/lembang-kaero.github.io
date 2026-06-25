# Website Resmi Pemerintah Lembang Kaero v1.0.0

Aplikasi website profil informasi publik statis resmi milik Pemerintah Lembang Kaero, Kecamatan Sangalla', Tana Toraja.

## Langkah-Langkah Deploy ke GitHub Pages

1. **Buat Repository Baru di GitHub**:
   - Beri nama repository, contoh: `lembang-kaero`.
   - Pilih visibilitas **Public**.

2. **Siapkan Folder Lokal**:
   - Atur struktur folder aset persis seperti skema arsitektur folder utama yang telah ditentukan.
   - Pindahkan berkas gambar dari USB drive ke target direktori:
     - Ganti nama `images1.jpg` menjadi `hero-toraja.jpg` (atau pertahankan link kode).
     - Taruh `Kepala Lembang.png` ke folder `assets/images/`.
     - Taruh `LOGO TATOR3.png` ke folder `assets/images/`.
     - Taruh `kemendesa-logo-8698B6D63A-seeklogo.com.png` ke folder `assets/images/`.

3. **Inisialisasi Git & Upload Kode**:
   Buka terminal di komputer Anda pada direktori website utama, lalu jalankan perintah:
   ```bash
   git init
   git add .
   git commit -m "Initial commit website resmi Lembang Kaero"
   git branch -M main
   git remote add origin [https://github.com/USERNAME-ANDA/lembang-kaero.git](https://github.com/USERNAME-ANDA/lembang-kaero.git)
   git push -u origin main