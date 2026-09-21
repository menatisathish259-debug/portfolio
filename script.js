document.addEventListener('DOMContentLoaded', () => {

  // 1. Dark / Light Mode Toggle with Persistence
  const themeToggleBtn = document.getElementById('theme-toggle');
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  const lightIcon = document.getElementById('theme-toggle-light-icon');

  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      darkIcon?.classList.add('hidden');
      lightIcon?.classList.remove('hidden');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      lightIcon?.classList.add('hidden');
      darkIcon?.classList.remove('hidden');
      localStorage.setItem('theme', 'light');
    }
  }

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    applyTheme(true);
  } else {
    applyTheme(false);
  }

  themeToggleBtn?.addEventListener('click', () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    applyTheme(!isCurrentlyDark);
  });

  // 2. Mobile Responsive Navbar Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.add('hidden');
    });
  });

  // 3. Dynamic Typing Text Effect
  const roles = [
    "Full Stack Developer",
    "B.Tech CSE Student",
    "Creative Problem Solver",
    "Cloud & API Builder"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById('typing-text');
  const typeSpeed = 100;
  const eraseSpeed = 50;
  const delayBetweenWords = 1800;

  function typeWriter() {
    if (!typingElement) return;

    const currentWord = roles[roleIndex];
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeWriter, delayBetweenWords);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeWriter, 300);
    } else {
      setTimeout(typeWriter, isDeleting ? eraseSpeed : typeSpeed);
    }
  }
  typeWriter();

  // 4. Skills Category Filtering
  const filterButtons = document.querySelectorAll('.skill-filter-btn');
  const skillItems = document.querySelectorAll('.skill-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');

      filterButtons.forEach(btn => {
        btn.classList.remove('bg-indigo-600', 'text-white');
        btn.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
      });
      button.classList.add('bg-indigo-600', 'text-white');
      button.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');

      skillItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 5. Contact Form Validation & Toast Notification
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const messageInput = document.getElementById('form-message');

  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorMessage = document.getElementById('error-message');
  const toast = document.getElementById('toast-notification');

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    if (!nameInput?.value.trim()) {
      errorName?.classList.remove('hidden');
      isValid = false;
    } else {
      errorName?.classList.add('hidden');
    }

    if (!isValidEmail(emailInput?.value.trim() || '')) {
      errorEmail?.classList.remove('hidden');
      isValid = false;
    } else {
      errorEmail?.classList.add('hidden');
    }

    if ((messageInput?.value.trim().length || 0) < 10) {
      errorMessage?.classList.remove('hidden');
      isValid = false;
    } else {
      errorMessage?.classList.add('hidden');
    }

    if (isValid) {
      if (toast) {
        toast.classList.remove('translate-y-24', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
      }

      contactForm.reset();

      setTimeout(() => {
        if (toast) {
          toast.classList.add('translate-y-24', 'opacity-0');
          toast.classList.remove('translate-y-0', 'opacity-100');
        }
      }, 3500);
    }
  });

});
