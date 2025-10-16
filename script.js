
  // Fungsi salin no rekening
    function copyText(id) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text);
    // alert("✅ Nomor rekening telah disalin: " + text);
    Swal.fire ({
    icon: 'success',
    title: 'Nomor rekening disalin!',
    text: `✅ ${text}`,
    timer: 1800,
    showConfirmButton: false,
    timerProgressBar: true,
    showClass: { popup: 'animate__animated animate__fadeInDown' },
    hideClass: { popup: 'animate__animated animate__fadeOutUp' }
    });
  }

  // Fungsi validasi WA
  const waField = document.getElementById("wa");
  const form = document.getElementById("orderForm");

  function validateWA() {
    let wa = waField.value.replace(/\D/g, ""); // hanya angka
    waField.value = wa; // update input

    const isValid = /^\d{10,13}$/.test(wa); // minimal 10, maksimal 13 digit
    if (!isValid) {
      waField.classList.add("is-invalid");
    } else {
      waField.classList.remove("is-invalid");
    }
    return isValid;
  }

  // Real-time validasi (langsung saat mengetik)
  waField.addEventListener("input", validateWA);

  // Saat form disubmit
  form.addEventListener("submit", function (e) {
    if (!validateWA()) {
      e.preventDefault();
      waField.focus();
    }
  });

  const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbwnhTNcpCmCsgouD6RgiF7LH8Qrx_xAr6A56p_THvmpG-4U9frxsLVgkZ5LF9_YSbJeQw/exec";
  const ADMIN_WA = "6287713314496";

  // === Ambil daftar produk secara dinamis ===
  async function loadProduk() {
    try {
      const res = await fetch(WEBAPP_URL);
      const data = await res.json();
      const select = document.getElementById("produk");
      select.innerHTML = "";

      if (data.result === "success" && data.produk.length > 0) {
        select.innerHTML = '<option value="">-- Pilih Paket --</option>';
        data.produk.forEach(p => {
          const opt = document.createElement("option");
          opt.value = p;
          opt.textContent = p;
          select.appendChild(opt);
        });
      } else {
        select.innerHTML = '<option value="">❌ Gagal memuat produk</option>';
      }
    } catch (err) {
      document.getElementById("produk").innerHTML = '<option value="">⚠️ Error memuat produk</option>';
      console.error(err);
    }
  }

  // === Konversi file ke Base64 ===
  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (err) => reject(err);
    });
  }

  // === Proses Submit Form ===
  document.getElementById("orderForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const btn = document.getElementById("submitBtn");
    btn.classList.add("loading");

    const buktiFile = form.bukti.files[0];
      if (!buktiFile) {
      alert("❌ Harap upload bukti transfer");
      btn.classList.remove("loading");
      return;
    }
    if (buktiFile.size > 2 * 1024 * 1024) {
      alert("❌ Ukuran file maksimal 2MB");
      btn.classList.remove("loading");
      return;
    }

    try {
    const buktiBase64 = await toBase64(buktiFile);

    const data = {
      nama: form.nama.value,
      wa: form.wa.value,
      produk: form.produk.value,
      namaRek: form.namaRek.value,
      bukti: buktiBase64,
      buktiNama: buktiFile.name
    };

    const res = await fetch(WEBAPP_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await res.json();
    Swal.close(); // tutup loader

    if (result.result === "success") {
      const fileUrl = result.fileUrl || "-";
      const pesan = `Halo min, saya sudah transfer untuk iklan\n\n- Nama: ${data.nama}\n- WA: ${data.wa}\n- Produk: ${data.produk}\n- Nama Pemilik Rekening: ${data.namaRek}\n- Bukti transfer: ${fileUrl}`;
      const pesanUrl = `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(pesan)}`;

      Swal.fire({
        icon: 'success',
        title: 'Order berhasil disimpan!',
        text: 'Silakan kirim bukti ke admin via WhatsApp.',
        confirmButtonText: 'Kirim ke Admin',
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' }
      }).then(() => {
        window.location.href = pesanUrl;
        form.reset();
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Gagal menyimpan order!',
        text: result.message,
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' }
      });
    }

    } catch (err) {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Terjadi kesalahan!',
        text: err.message,
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' }
      });
    }
  });

  window.addEventListener("DOMContentLoaded", loadProduk);
