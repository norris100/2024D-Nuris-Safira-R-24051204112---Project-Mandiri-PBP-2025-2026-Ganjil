document.addEventListener('DOMContentLoaded', function () {
// BACK TO TOP
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    const check = () => backToTop.classList.toggle('show', window.scrollY > 300);
    check();
    window.addEventListener('scroll', check, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.blur();
    });
  }

  // menutup navbar saat di perangkat kecil
  const navbarCollapse = document.getElementById('navbarNav');
  if (navbarCollapse) {
    const navLinks = navbarCollapse.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        try {
          if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
            const inst = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
            inst.hide();
          } else {
            navbarCollapse.classList.remove('show');
          }
        } catch (e) {}
      });
    });
  }

  // validasi form contact
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let ok = true;

      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const subject = form.querySelector('#subject');
      const message = form.querySelector('#message');

      const setErr = (input, msg) => {
        const small = input ? input.parentElement.querySelector('.error-message') : null;
        if (small) small.textContent = msg || '';
      };
      //reset error
      [name, email, subject, message].forEach(i => i && setErr(i, ''));

      if (!name || !name.value.trim()) { setErr(name, 'Nama wajib diisi.'); ok = false; }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { setErr(email, 'Email tidak valid.'); ok = false; }
      if (!subject || !subject.value.trim()) { setErr(subject, 'Subject wajib diisi.'); ok = false; }
      if (!message || message.value.trim().length < 5) { setErr(message, 'Tulis pesan minimal 5 karakter.'); ok = false; }

      if (!ok) {
        const first = form.querySelector('.error-message:empty ~ input, .error-message:not(:empty)') || form.querySelector('input, textarea');
        if (first && first.focus) first.focus();
        return;
      }

      //tampilkan pesan sukses
      const success = document.getElementById('successMessage');
      if (success) {
        success.style.display = 'block';
        setTimeout(() => success.style.display = 'none', 10000);
      }
      form.reset();
    });
  }

  // membuka pilihan aplikasi email 
  const emailAnchors = document.querySelectorAll('.contact-info a');
  emailAnchors.forEach(a => {
    const href = a.getAttribute('href') || '';
    const txt = (a.textContent || '').trim();
    if ((href === '#' || href === '') && txt.includes('@')) {
      a.setAttribute('href', 'mailto:' + txt);
    }
  });
  
});