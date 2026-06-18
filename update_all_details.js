const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');

if (!fs.existsSync(filePath)) {
    console.error("Error: File index.html tidak ditemukan!");
    process.exit(1);
}

let html = fs.readFileSync(filePath, 'utf8');

// ==========================================
// 1. Ganti Nama Pengantin & Orang Tua (Berdasarkan input sebelumnya)
// ==========================================
html = html.replace(/Anis Hidayanti/g, "Jihan Syahiroh Rhamadani");
html = html.replace(/Anis/g, "Jihan");
html = html.replace(/Muhammad Fadli/g, "Anang Syaiful Ma'arif");
html = html.replace(/Fadli/g, "Anang");

// Orang tua (Wanita lalu Pria)
const parentPlaceholder = "Bpk. Mempelai &amp; Ibu Mempelai";
html = html.replace(parentPlaceholder, "Bapak Anton Haryanto Putra &amp; Ibu Suwiah");
html = html.replace(parentPlaceholder, "Bapak Muslikh &amp; Ibu Hartini ");

// ==========================================
// 2. Ganti Tanggal Utama & Sesi Acara
// ==========================================
// Tanggal utama / cover
html = html.replace(/Sabtu, 27 April 2024/g, "Senin, 3 Agustus 2026");
// Tanggal SEO & Meta
html = html.replace(/31 Desember 2024/g, "3 Agustus 2026");
// Tanggal Akad & Resepsi
html = html.replace(/Rabu, 1 Januari 2025/g, "Senin, 3 Agustus 2026");

// ==========================================
// 3. Waktu/Jam
// ==========================================
// Pukul Akad (Kemunculan pertama dari "09.00 - 10.00 WIB")
html = html.replace("09.00 - 10.00 WIB", "09:00 WIB - Selesai");
// Pukul Resepsi (Kemunculan kedua setelah Akad diganti)
html = html.replace("09.00 - 10.00 WIB", "10:00 WIB - Selesai");

// ==========================================
// 4. Lokasi & Alamat & Google Maps Link
// ==========================================
// Alamat Akad & Resepsi
const oldAddress = "Jl. Alun Alun, Curug Kulon, Kec. Curug, Kabupaten Tangerang, Banten 15810";
const newAddress = "Alian Rt 04 Rw 03 Ambal kec. Karangkobar Kab. Banjarnegara Jawa Tengah";
html = html.replaceAll(oldAddress, newAddress);

// Google Maps Link
const oldMapsLink = "https://www.google.com/maps/place/Lepas+Penat+Coffee/@-6.2620944,106.5563391,15z/data=!4m2!3m1!1s0x0:0x2982978d7a3b014f?sa=X&ved=1t:2428&ictx=111";
const newMapsLink = "https://maps.app.goo.gl/MADHcJ5uvDHyvw1X6";
html = html.replaceAll(oldMapsLink, newMapsLink);

// ==========================================
// 5. Countdown Timer
// ==========================================
// Senin, 3 Agustus 2026 09:00:00 GMT+7 (Asia/Jakarta) = 1785816000
html = html.replace('data-due-date="1735664400"', 'data-due-date="1785816000"');

// ==========================================
// 6. Rekening (Hanya 1: BCA)
// ==========================================
// Ganti Nomor Rekening & Nama Pemilik BCA
// BCA No Rekening: 12345678 -> 2950808627
// BCA Pemilik: Anang Syaiful Ma'arif (karena Muhammad Fadli telah diganti di atas, nama pemilik di item BCA sekarang adalah "Anang Syaiful Ma'arif" - mari kita ubah ke "jihan syahiroh r")
html = html.replace('data-clipboard-text="12345678"', 'data-clipboard-text="2950808627"');
html = html.replace('<p class="elementor-heading-title elementor-size-default">12345678</p>', '<p class="elementor-heading-title elementor-size-default">2950808627</p>');
html = html.replace('<p class="elementor-heading-title elementor-size-default">Anang Syaiful Ma\'arif</p>', '<p class="elementor-heading-title elementor-size-default">jihan syahiroh r</p>');

// Menghapus rekening kedua (Mandiri)
// Cari bagian Mandiri item
const mandiriStart = html.indexOf('wp-content/uploads/2025/03/mandiri.png');
if (mandiriStart !== -1) {
    // Cari tag pembuka item Mandiri sebelumnya
    const itemStartTag = '<div class="jet-listing-grid__item jet-listing-dynamic-post-11786 elementor-dcss-14184873550733606"';
    const lastStartIdx = html.lastIndexOf(itemStartTag, mandiriStart);
    
    // Cari tag penutup item Mandiri setelahnya
    // Kita cari tag pembuka penutup grid item berikutnya atau penutup div
    const nextItemIdx = html.indexOf('</div></div></div>				</div>', mandiriStart);
    
    if (lastStartIdx !== -1 && nextItemIdx !== -1) {
        // Hapus blok tersebut (dari lastStartIdx sampai sebelum penutup)
        const part1 = html.substring(0, lastStartIdx);
        const part2 = html.substring(nextItemIdx);
        html = part1 + part2;
    }
}

// ==========================================
// 7. Update URL metadata calendar
// ==========================================
const oldTitleUrl = encodeURIComponent("The Wedding Of Anis & Fadli");
const newTitleUrl = encodeURIComponent("The Wedding Of Jihan & Anang");
html = html.replaceAll(oldTitleUrl, newTitleUrl);

const oldTitleUrl2 = encodeURIComponent("The Wedding Of Anis &amp; Fadli");
const newTitleUrl2 = encodeURIComponent("The Wedding Of Jihan & Anang");
html = html.replaceAll(oldTitleUrl2, newTitleUrl2);

const oldTitleRaw = "The%20Wedding%20Of%20Anis%20%26%20Fadli";
const newTitleRaw = encodeURIComponent("The Wedding Of Jihan & Anang");
html = html.replaceAll(oldTitleRaw, newTitleRaw);

fs.writeFileSync(filePath, html, 'utf8');
console.log("=================================================");
console.log("Sukses! Semua data undangan berhasil diperbarui.");
console.log("=================================================");
