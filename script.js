    
  body {
    font-family: 'Segoe UI', sans-serif;
    background-color: #b4befe;
    color: #fff;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.2rem;
  }

  .form-container {
    background-color: #1a1a2f;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
    padding: 2rem;
    width: 100%;
    max-width: 500px;
  }

  h2 {
    color: #ffcc00;
    font-weight: 700;
    font-size: clamp(24px, 2.5vw, 32px);
    text-align: center;
    margin-top: 1.5rem;
    margin-bottom: 2rem;
  }

  /* Atur tinggi semua field input dan select */
  input.form-control,
  select.form-select,
  textarea.form-control {
    height: 45px;              /* tinggi field uniform */
    padding: 0.6rem 1rem;      /* jarak teks ke tepi */
    font-size: 1rem;           /* ukuran teks */
    border-radius: 10px;       /* sudut melengkung */
    border: 1px solid #ccc;
  }

  /* Field file upload lebih tinggi sedikit */
  input[type="file"].form-control {
    height: auto; /* tinggi menyesuaikan isi */
    padding: 0.5rem;
  }

  /* Saat klik input, efek warna elegan */
  input:focus,
  select:focus,
  textarea:focus {
    border-color: #f39c12;
    box-shadow: 0 0 0 0.2rem rgba(243, 156, 18, 0.25);
  }

  /* Label agar punya jarak yang pas */
  label.form-label {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  /* Jarak antar field */
  .form-control,
  .form-select {
    margin-bottom: 1rem;
  }

  .invalid-feedback {
    display: none;
    color: #dc3545;
    font-size: 0.9rem;
    margin-top: 1px;
  }

  input.is-invalid + .invalid-feedback {
    display: block;
  }

  .copy-btn {
    background: none;
    border: none;
    color: #ffcc00;
    cursor: pointer;
  }

  .copy-btn:hover {
    color: #fff;
  }

  .btn-submit {
    background: linear-gradient(45deg, #f39c12, #e67e22);
    border: none;
    font-weight: bold;
    color: #1a1a2f;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .btn-submit:hover {
    opacity: 0.9;
    color: #1a1a2f;
  }

  .rekening p {
    margin-bottom: 0.5rem;
  }

  button.loading {
    pointer-events: none;
    opacity: 0.7;
    position: relative;
  }

  button.loading::after {
    content: "";
    position: absolute;
    right: 16px;
    top: 50%;
    width: 18px;
    height: 18px;
    border: 2px solid white;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    transform: translateY(-50%);
  }

  @keyframes spin {
    to {
      transform: translateY(-50%) rotate(360deg);
    }
  }
