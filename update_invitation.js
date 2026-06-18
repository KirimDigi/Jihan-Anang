const fs = require('fs');
const path = require('path');

// ==========================================
// UBAH DATA DI BAWAH INI SESUAI DATA ANDA
// ==========================================
const data = {
    // Mempelai Wanita
    wanita: {
        namaLengkap: "Jihan Syahiroh Rhamadani",
        namaPanggilan: "Jihan",
        orangTua: "Bapak Anton Haryanto Putra & Ibu Suwiah" // contoh: Bpk. Ahmad & Ibu Siti
    },
    // Mempelai Pria
    pria: {
        namaLengkap: "Anang Syaiful Ma'arif",
        namaPanggilan: "Anang",
        orangTua: "Bapak Muslikh & Ibu Hartini "
    },
    // Informasi Acara
    tanggalAcara: "Senin, 3 Agustus 2026", // Teks tanggal di deskripsi
};

// ==========================================
// PROSES PENGERJAAN SCRIPT (JANGAN DIUBAH)
// ==========================================

const filePath = path.join(__dirname, 'index.html');

if (!fs.existsSync(filePath)) {
    console.error("Error: File index.html tidak ditemukan di root folder!");
    process.exit(1);
}

let html = fs.readFileSync(filePath, 'utf8');

// 1. Ganti Nama Mempelai Wanita
html = html.replace(/Anis Hidayanti/g, data.wanita.namaLengkap);
html = html.replace(/Anis/g, data.wanita.namaPanggilan);

// 2. Ganti Nama Mempelai Pria
html = html.replace(/Muhammad Fadli/g, data.pria.namaLengkap);
html = html.replace(/Fadli/g, data.pria.namaPanggilan);

// 3. Ganti nama orang tua (jika di HTML tertulis 'Bpk. Mempelai &amp; Ibu Mempelai' atau 'Bpk. Mempelai & Ibu Mempelai')
// Kita ganti spesifik sesuai urutan kemunculan di HTML
// Kemunculan pertama (Wanita)
const parentWanitaPlaceholder = "Bpk. Mempelai &amp; Ibu Mempelai";
if (html.includes(parentWanitaPlaceholder)) {
    html = html.replace(parentWanitaPlaceholder, data.wanita.orangTua.replace(/&/g, "&amp;"));
}
// Kemunculan kedua (Pria) setelah yang pertama diganti
if (html.includes(parentWanitaPlaceholder)) {
    html = html.replace(parentWanitaPlaceholder, data.pria.orangTua.replace(/&/g, "&amp;"));
}

// 4. Update data-settings / meta yang ter-URL encode (seperti link Google Calendar atau metadata json)
// Ganti url encoded names
const oldTitleUrl = encodeURIComponent("The Wedding Of Anis & Fadli");
const newTitleUrl = encodeURIComponent(`The Wedding Of ${data.wanita.namaPanggilan} & ${data.pria.namaPanggilan}`);
html = html.replaceAll(oldTitleUrl, newTitleUrl);

const oldTitleUrl2 = encodeURIComponent("The Wedding Of Anis &amp; Fadli");
const newTitleUrl2 = encodeURIComponent(`The Wedding Of ${data.wanita.namaPanggilan} & ${data.pria.namaPanggilan}`);
html = html.replaceAll(oldTitleUrl2, newTitleUrl2);

const oldTitleRaw = "The%20Wedding%20Of%20Anis%20%26%20Fadli";
const newTitleRaw = encodeURIComponent(`The Wedding Of ${data.wanita.namaPanggilan} & ${data.pria.namaPanggilan}`);
html = html.replaceAll(oldTitleRaw, newTitleRaw);

fs.writeFileSync(filePath, html, 'utf8');
console.log("=================================================");
console.log("Sukses! Data mempelai di index.html berhasil diubah.");
console.log(`Mempelai Wanita: ${data.wanita.namaLengkap} (${data.wanita.namaPanggilan})`);
console.log(`Mempelai Pria  : ${data.pria.namaLengkap} (${data.pria.namaPanggilan})`);
console.log("=================================================");
