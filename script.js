const typingText = document.getElementById('typing-text');
const phrases = ['intuitive interfaces', 'seamless experiences', 'creative solutions'];
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function type() {
  const currentPhrase = phrases[phraseIndex];
  typingText.textContent = isDeleting
    ? currentPhrase.substring(0, charIndex--)
    : currentPhrase.substring(0, charIndex++);

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(type, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? 50 : 100);
  }
}

setTimeout(type, 1000);

// Skills animation
const skills = document.querySelectorAll('.progress');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute('data-width');
      entry.target.style.width = `${width}%`;
    }
  });
});
skills.forEach(skill => observer.observe(skill));

// Responsive nav toggle
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('show');
});

/*// Contact Form
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Message sent successfully!');
  e.target.reset();
});*/
const scriptURL = 'https://script.google.com/macros/s/AKfycbwMW1_8VBD0nkDrBv70rygFi4J_DAn_9ZMzcTgSk60BcpFrQ1wMxYRS2zFaW4QU0o57/exec'; // Replace with your deployment URL

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
