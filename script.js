// 1. Theme Toggle (Dark / Light Mode)
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
  document.documentElement.classList.add('dark');
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
} else {
  document.documentElement.classList.remove('dark');
  themeIcon.classList.remove('fa-sun');
  themeIcon.classList.add('fa-moon');
}

themeToggleBtn.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  if (isDark) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
});

// 2. Mobile Drawer Navigation Toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

mobileBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// 3. User Photo Upload & Local Storage Handler
const photoInput = document.getElementById('photo-upload-input');
const profileImg = document.getElementById('profile-img');

// Check if user previously uploaded a custom photo
const storedPhoto = localStorage.getItem('custom_profile_photo');
if (storedPhoto) {
  profileImg.src = storedPhoto;
}

photoInput.addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      profileImg.src = e.target.result;
      try {
        localStorage.setItem('custom_profile_photo', e.target.result);
      } catch(err) {
        console.warn('Image too large for localStorage, displayed in session');
      }
    };
    reader.readAsDataURL(file);
  }
});

// 4. Contact Form Handler (Opens default email client with populated info)
const contactForm = document.getElementById('contact-form');
const feedbackBox = document.getElementById('form-feedback');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('sender-name').value.trim();
  const email = document.getElementById('sender-email').value.trim();
  const subject = document.getElementById('message-subject').value.trim() || 'Portfolio Inquiry';
  const body = document.getElementById('message-body').value.trim();

  if (!name || !email || !body) {
    feedbackBox.className = 'mt-4 p-3 rounded-xl text-xs font-medium text-center bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800';
    feedbackBox.textContent = 'Please fill out all required fields.';
    feedbackBox.classList.remove('hidden');
    return;
  }

  const mailtoUrl = `mailto:menatisathish259@gmail.com?subject=${encodeURIComponent(subject + ' - from ' + name)}&body=${encodeURIComponent(body + '\n\nSender Email: ' + email)}`;
  
  feedbackBox.className = 'mt-4 p-3 rounded-xl text-xs font-medium text-center bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800';
  feedbackBox.innerHTML = `<span><i class="fa-solid fa-circle-check mr-1"></i> Opening email client to send to <strong>menatisathish259@gmail.com</strong>...</span>`;
  feedbackBox.classList.remove('hidden');

  setTimeout(() => {
    window.location.href = mailtoUrl;
  }, 600);

  contactForm.reset();
});