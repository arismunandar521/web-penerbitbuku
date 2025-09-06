// Data buku disimpan di localStorage agar tetap sederhana dan bertahan saat browser dibuka ulang
let daftarBuku = JSON.parse(localStorage.getItem('daftarBuku')) || [];

function renderBuku() {
  const list = document.getElementById('daftar-buku');
  list.innerHTML = '';
  daftarBuku.forEach((buku, idx) => {
    const li = document.createElement('li');
    li.textContent = `${buku.judul} - ${buku.penulis} [${buku.kategori}] `;
    li.innerHTML += `<button onclick="editBuku(${idx})">Edit</button> <button onclick="hapusBuku(${idx})">Hapus</button>`;
    list.appendChild(li);
  });
}

function tambahBuku() {
  const judul = document.getElementById('judul').value.trim();
  const penulis = document.getElementById('penulis').value.trim();
  const kategori = document.getElementById('kategori').value.trim();

  if (judul && penulis && kategori) {
    daftarBuku.push({ judul, penulis, kategori });
    localStorage.setItem('daftarBuku', JSON.stringify(daftarBuku));
    renderBuku();
    tutupFormBuku();
  } else {
    alert('Mohon lengkapi semua kolom!');
  }
}

function hapusBuku(idx) {
  if (confirm('Hapus buku ini?')) {
    daftarBuku.splice(idx, 1);
    localStorage.setItem('daftarBuku', JSON.stringify(daftarBuku));
    renderBuku();
  }
}

function editBuku(idx) {
  const buku = daftarBuku[idx];
  document.getElementById('judul').value = buku.judul;
  document.getElementById('penulis').value = buku.penulis;
  document.getElementById('kategori').value = buku.kategori;
  tampilFormBuku();

  // Setelah edit, hapus dulu data lama, nanti ditambahkan lagi sebagai data baru
  daftarBuku.splice(idx, 1);
  localStorage.setItem('daftarBuku', JSON.stringify(daftarBuku));
  renderBuku();
}

function tampilFormBuku() {
  document.getElementById('form-buku').style.display = 'block';
}

function tutupFormBuku() {
  document.getElementById('form-buku').style.display = 'none';
  document.getElementById('judul').value = '';
  document.getElementById('penulis').value = '';
  document.getElementById('kategori').value = '';
}

// Render daftar buku saat halaman dibuka
window.onload = renderBuku;
