/**
 * Menati Sathish - Portfolio & Resume Script
 * Handles icon initialization, smooth scrolling, print triggers,
 * form submission, and image loading fallbacks.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Print / Download PDF Triggers
  const printBtn = document.getElementById('printBtn');
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 3. Contact Form Submission Handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const senderName = document.getElementById('senderName')?.value.trim();
      const senderEmail = document.getElementById('senderEmail')?.value.trim();
      const msgSubject = document.getElementById('msgSubject')?.value.trim();
      const msgBody = document.getElementById('msgBody')?.value.trim();

      if (!senderName || !senderEmail || !msgBody) {
        alert('Please fill out all required fields.');
        return;
      }

      // Generate a mailto link so it opens the user's default email client
      const mailtoSubject = encodeURIComponent(msgSubject || 'Portfolio Contact Inquiry');
      const mailtoBody = encodeURIComponent(
        `Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${msgBody}`
      );

      // Open email client with pre-filled message
      window.location.href = `mailto:menatisathish259@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

      alert(`Thank you, ${senderName}! Your message is prepared. You can now send it directly to Menati Sathish.`);
      contactForm.reset();
    });
  }

  // 4. Smooth Scrolling for Navbar Links
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .hero-buttons a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // 5. Profile Image Fallback Handler
  const profileImg = document.getElementById('profileImg');
  if (profileImg) {
    profileImg.addEventListener('error', () => {
      // Fallback in case local profile.jpeg is missing
      profileImg.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80';
    });
  }
});