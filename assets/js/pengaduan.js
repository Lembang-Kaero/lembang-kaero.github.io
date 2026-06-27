document
.getElementById("pengaduanForm")
.addEventListener("submit", function(e){

e.preventDefault();

const nama=document.getElementById("nama").value;

const telepon=document.getElementById("telepon").value;

const kategori=document.getElementById("kategori").value;

const lokasi=document.getElementById("lokasi").value;

const isi=document.getElementById("isi").value;

const pesan=

`*PENGADUAN MASYARAKAT*

Nama : ${nama}

No HP : ${telepon}

Kategori : ${kategori}

Lokasi : ${lokasi}

Pengaduan :

${isi}`;

const url=

"https://wa.me/6281318785080?text="+

encodeURIComponent(pesan);

window.open(url,"_blank");

});
