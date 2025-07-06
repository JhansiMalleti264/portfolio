// Resume download function
function handleResumeDownload() {
  // Create a link element and trigger download
  const link = document.createElement('a');
  link.href = '/jhansi resume .pdf'; // Make sure this file is in the public folder
  link.download = 'Jhansi_Malleti_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Typing Animation
const typingText = document.getElementById('typing-text');
const phrases = ['clean and modern layouts','creative solutions', 'simple and elegant solutions', 'user-centered designs'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    
    if (charIndex === currentPhrase.length) {
      setTimeout(() => { isDeleting = true; }, 1500);
    }
  }
  
  const timeout = isDeleting ? 50 : 100;
  setTimeout(typeEffect, timeout);
}

// Start typing animation after page load
setTimeout(typeEffect, 1000);

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    
    const filter = button.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      
      if (category === filter) {
        // Show projects that match the category
        card.style.display = 'flex';
        card.classList.remove('hide');
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 10);
      } else {
        // Hide projects that don't match the category
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
          card.style.display = 'none';
          card.classList.add('hide');
        }, 300);
      }
    });
  });
});

// Initialize with first filter (Figma) active on page load
document.addEventListener('DOMContentLoaded', () => {
  const firstFilter = document.querySelector('.filter-btn[data-filter="figma"]');
  if (firstFilter) {
    firstFilter.click();
  }
});

// Mobile Navigation Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
    });
  });
}

// Update copyright year
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = 'rgba(17, 24, 39, 0.98)';
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
      header.style.background = 'rgba(17, 24, 39, 0.95)';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    }
  }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Add scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements for scroll animations
  document.querySelectorAll('.skill-card, .project-item, .contact-card, .education-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});






const scriptURL = 'https://script.google.com/macros/s/AKfycbxBmF1wIc-j8XUqeMD970Ux8MSr1y_Wk1jcmFMCAeISuAa5dR2hAQcApoJ0-OaX2VrJkA/exec'; // Replace with your deployment URL

  document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    fetch(scriptURL, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.result === 'success') {
        alert('Message sent successfully!');
        form.reset();
      } else {
        alert('Error: ' + data.error);
      }
    })
    .catch(error => {
      console.error('Error!', error.message);
      alert('Failed to send message.');
    });
  });
