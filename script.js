// Loading Screen Handler
const LOADING_DURATION = 5000; // 5 seconds
const loadingScreen = document.getElementById('loadingScreen');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');

function initializeLoadingScreen() {
  let progress = 0;
  const startTime = Date.now();
  
  const interval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    progress = Math.min((elapsed / LOADING_DURATION) * 100, 99);
    
    progressBar.style.width = progress + '%';
    progressText.textContent = Math.floor(progress);
  }, 30);

  // Hide loading screen after 5 seconds
  setTimeout(() => {
    clearInterval(interval);
    progressBar.style.width = '100%';
    progressText.textContent = '100';
    
    // Add fade-out animation
    loadingScreen.classList.add('hidden');
    
    // Completely remove from DOM after animation
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      loadingScreen.style.pointerEvents = 'none';
    }, 800);
  }, LOADING_DURATION);
}

// Start loading screen when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeLoadingScreen);
} else {
  initializeLoadingScreen();
}

// Navbar Scroll Effect
const header = document.querySelector('.header');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth Scrolling for Navigation Links
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

// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.about-card, .service-card, .section-title, .hero-content').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  observer.observe(element);
});

// Button Click Effects
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function (e) {
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    // Remove previous ripple if exists
    const prevRipple = this.querySelector('.ripple');
    if (prevRipple) {
      prevRipple.remove();
    }

    this.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Navbar Link Active State
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href && href.slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Service Card Tilt Effect
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) * 0.1;
    const rotateY = (centerX - x) * 0.1;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  });
});

// Newsletter Subscription
const newsletterBtn = document.querySelector('.newsletter-btn');
if (newsletterBtn) {
  newsletterBtn.addEventListener('click', function () {
    const input = this.previousElementSibling;
    const email = input.value;
    
    if (email && email.includes('@')) {
      // Show success message
      const originalText = this.textContent;
      this.textContent = '✓ Subscribed!';
      this.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
      
      input.value = '';
      
      setTimeout(() => {
        this.textContent = originalText;
        this.style.background = '';
      }, 3000);
    } else {
      input.style.borderColor = '#ff4444';
      setTimeout(() => {
        input.style.borderColor = '';
      }, 2000);
    }
  });
}

// Add active state style to CSS
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white !important;
  }

  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Page Load Animation
window.addEventListener('load', () => {
  document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description').forEach((el, index) => {
    el.style.animation = `fadeInDown 0.8s ease-out ${index * 0.2}s both`;
  });
});
