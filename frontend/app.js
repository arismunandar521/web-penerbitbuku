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
let isAdmin = sessionStorage.getItem('isAdmin') === 'true';

// Fungsi login admin
function loginAdmin() {
  const pass = document.getElementById('adminPassword').value;
  if (pass === 'sanadguru2024') { // ganti dengan password admin yang kamu inginkan
    isAdmin = true;
    sessionStorage.setItem('isAdmin', 'true');
    document.getElementById('adminLogin').style.display = 'none';
    renderBooks();
  } else {
    document.getElementById('loginError').style.display = 'inline';
  }
}

// Sembunyikan menu CRUD jika bukan admin
function renderBooks(booksToRender = filteredBooks) {
  // ... kode render sebelumnya ...
  // Ubah bagian tombol
  if (currentView === 'grid') {
    grid.innerHTML = paginatedBooks.map(book => `
      <div class="book-card ...">
        <!-- ... -->
        ${isAdmin ? `
          <div class="flex gap-2">
            <button onclick="editBook(${book.id})" ...>Edit</button>
            <button onclick="deleteBook(${book.id})" ...>Hapus</button>
          </div>
        ` : ''}
      </div>
    `).join('');
  } else {
    // Bagian list view
    list.innerHTML = paginatedBooks.map(book => `
      <div class="book-card ...">
        <!-- ... -->
        <div class="flex gap-2">
          <button ...>Beli</button>
          ${isAdmin ? `
            <button onclick="editBook(${book.id})" ...>Edit</button>
            <button onclick="deleteBook(${book.id})" ...>Hapus</button>
          ` : ''}
        </div>
      </div>
    `).join('');
  }
  // ... lanjut pagination ...
}

// Sembunyikan tombol tambah buku
function showAddBookForm() {
  if (!isAdmin) return; // hanya admin
  // ... lanjut fungsi ...
}

// Pada halaman load, sembunyikan form CRUD jika bukan admin
document.addEventListener('DOMContentLoaded', function() {
  if (!isAdmin) {
    document.getElementById('adminLogin').style.display = 'block';
  } else {
    document.getElementById('adminLogin').style.display = 'none';
  }
  renderBooks();
  // ... fungsi lain ...
});
