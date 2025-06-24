// Typing Animation
const typingText = document.getElementById('typing-text');
const phrases = ['intuitive interfaces', 'seamless experiences', 'creative solutions'];
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
      isDeleting = true;
    }
  }
  
  const timeout = isDeleting ? 50 : 100;
  setTimeout(typeEffect, timeout);
}

// Start typing animation after page load
setTimeout(typeEffect, 1000);

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const viewMoreBtn = document.getElementById('view-more-btn');
const viewMoreContainer = document.querySelector('.view-more-container');
const hiddenProjects = document.querySelectorAll('.hidden-project');
let showingAll = false;

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    
    const filter = button.getAttribute('data-filter');
    
    // Handle view more button and hidden projects based on filter
    if (filter === 'all') {
      viewMoreContainer.style.display = 'block';
      // Reset to initial state when switching to "all"
      hiddenProjects.forEach(project => {
        project.classList.remove('show-hidden');
      });
      viewMoreBtn.textContent = 'View More Projects';
      showingAll = false;
    } else {
      viewMoreContainer.style.display = 'none';
      // Reset hidden projects state for other filters
      hiddenProjects.forEach(project => {
        project.classList.remove('show-hidden');
      });
      showingAll = false;
    }
    
    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category').split(' ');
      
      if (filter === 'all' || categories.includes(filter)) {
        card.classList.remove('hide');
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
          card.classList.add('hide');
        }, 300);
      }
    });
  });
});

// View More Projects Functionality
viewMoreBtn.addEventListener('click', () => {
  if (!showingAll) {
    // Show hidden projects
    hiddenProjects.forEach((project, index) => {
      setTimeout(() => {
        project.classList.add('show-hidden');
        project.style.opacity = '0';
        project.style.transform = 'scale(0.8)';
        setTimeout(() => {
          project.style.opacity = '1';
          project.style.transform = 'scale(1)';
        }, 50);
      }, index * 100);
    });
    viewMoreBtn.textContent = 'Show Less';
    showingAll = true;
  } else {
    // Hide projects
    hiddenProjects.forEach((project, index) => {
      setTimeout(() => {
        project.style.opacity = '0';
        project.style.transform = 'scale(0.8)';
        setTimeout(() => {
          project.classList.remove('show-hidden');
        }, 300);
      }, index * 50);
    });
    viewMoreBtn.textContent = 'View More Projects';
    showingAll = false;
  }
});

// Skills Animation with Intersection Observer
const skillsSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.progress');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !skillsAnimated) {
      progressBars.forEach((progress, index) => {
        const width = progress.getAttribute('data-width');
        setTimeout(() => {
          progress.style.width = `${width}%`;
        }, index * 200);
      });
      skillsAnimated = true;
    }
  });
}, { threshold: 0.3 });

skillsObserver.observe(skillsSection);

// Mobile Navigation Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Change button state
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // Simulate form submission (replace with actual form handling)
  setTimeout(() => {
    alert('Message sent successfully!');
    contactForm.reset();
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  }, 1000);
});

// Update copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();

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

// Add scroll effect to header
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(26, 26, 26, 0.95)';
    header.style.backdropFilter = 'blur(10px)';
  } else {
    header.style.background = 'var(--bg)';
    header.style.backdropFilter = 'none';
  }
});
