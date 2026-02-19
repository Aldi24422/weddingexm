// 0. AMBIL NAMA TAMU DARI URL
// Mendukung 2 format:
//   - Path:  https://weddingexm.vercel.app/Aldi
//   - Query: https://weddingexm.vercel.app/?to=Aldi
(function () {
    let namaTamu = 'Tamu Spesial';

    // Cek dari path dulu (misal /Aldi atau /Budi%20Santoso)
    const path = window.location.pathname.replace(/^\//, ''); // hapus slash depan
    if (path && path !== 'index.html') {
        namaTamu = decodeURIComponent(path);
    } else {
        // Fallback ke query param ?to=NamaTamu
        const params = new URLSearchParams(window.location.search);
        if (params.get('to')) {
            namaTamu = params.get('to');
        }
    }

    document.getElementById('nama-tamu').textContent = namaTamu;
    document.getElementById('input-nama').value = namaTamu;
})();

// 1. LOGIKA BUKA UNDANGAN & MUSIK
const lagu = document.getElementById('lagu');
const musicBtn = document.getElementById('music-control');
let isPlaying = false;

function bukaUndangan() {
    document.getElementById('cover').style.transform = 'translateY(-100vh)';
    document.getElementById('main-content').style.display = 'block';
    document.body.classList.remove('no-scroll');
    musicBtn.style.display = 'flex';

    lagu.play();
    isPlaying = true;

    // Mulai Slideshow setelah dibuka
    showSlides();
}

function toggleMusic() {
    if (isPlaying) {
        lagu.pause();
        musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        isPlaying = false;
    } else {
        lagu.play();
        musicBtn.innerHTML = '<i class="fa-solid fa-compact-disc fa-spin"></i>';
        isPlaying = true;
    }
}

// 2. LOGIKA SLIDESHOW (FOTO BERGERAK)
let slideIndex = 0;
function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");

    // Sembunyikan semua gambar
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }

    // Tampilkan gambar aktif
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); // Ganti gambar setiap 3 detik
}

// 3. LOGIKA COPY NO REKENING
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function () {
        alert('Nomor Rekening Berhasil Disalin!');
    }, function (err) {
        console.error('Gagal menyalin: ', err);
    });
}

// 4. LOGIKA HITUNG MUNDUR (28 Agt 2028)
const tanggalTujuan = new Date("Aug 28, 2028 08:00:00").getTime();
setInterval(function () {
    const sekarang = new Date().getTime();
    const selisih = tanggalTujuan - sekarang;

    document.getElementById("days").innerHTML = Math.floor(selisih / (1000 * 60 * 60 * 24));
    document.getElementById("hours").innerHTML = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("minutes").innerHTML = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById("seconds").innerHTML = Math.floor((selisih % (1000 * 60)) / 1000);
}, 1000);

// 5. ANIMASI SCROLL (MUNCUL & KELUAR)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
});

const hiddenElements = document.querySelectorAll('.reveal');
hiddenElements.forEach((el) => observer.observe(el));

// 6. KIRIM UCAPAN VIA WHATSAPP
function kirimKeWhatsApp() {
    const nama = document.getElementById('input-nama').value;
    const pesan = document.getElementById('input-pesan').value;

    if (!pesan.trim()) {
        alert('Silakan tulis doa & ucapan terlebih dahulu 😊');
        return;
    }

    // Ganti nomor WhatsApp ini dengan nomor mempelai
    const nomorWA = '6281234567890';
    const teksWA = `Assalamu'alaikum, saya *${nama}* ingin menyampaikan ucapan untuk pernikahan Faisal & Nadin:%0A%0A${encodeURIComponent(pesan)}`;

    window.open(`https://wa.me/${nomorWA}?text=${teksWA}`, '_blank');
}