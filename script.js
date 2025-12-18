// Form validation and interactions
document.addEventListener('DOMContentLoaded', () => {
  // Navigation functionality
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle mobile menu
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Add shadow to navbar on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth scroll for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Smooth scroll for footer links
  const footerLinks = document.querySelectorAll('.footer-link[href^="#"]');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Search functionality
  const searchInput = document.getElementById('searchInput');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      
      if (searchTerm.length > 0) {
        // Search in service cards
        const serviceCards = document.querySelectorAll('.service-card');
        const projectCards = document.querySelectorAll('.project-card');
        
        let found = false;
        
        // Search in services
        serviceCards.forEach(card => {
          const title = card.querySelector('.service-title')?.textContent.toLowerCase();
          const description = card.querySelector('.service-description')?.textContent.toLowerCase();
          
          if (title?.includes(searchTerm) || description?.includes(searchTerm)) {
            card.style.display = 'flex';
            card.style.border = '2px solid var(--color-primary)';
            found = true;
          } else {
            card.style.display = 'flex';
            card.style.opacity = '0.3';
            card.style.border = '1px solid var(--color-border)';
          }
        });
        
        // Search in projects
        projectCards.forEach(card => {
          const title = card.querySelector('.project-title')?.textContent.toLowerCase();
          
          if (title?.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.border = '2px solid var(--color-primary)';
            found = true;
          } else {
            card.style.display = 'block';
            card.style.opacity = '0.3';
          }
        });
        
      } else {
        // Reset all cards when search is empty
        const allCards = document.querySelectorAll('.service-card, .project-card');
        allCards.forEach(card => {
          card.style.display = '';
          card.style.opacity = '';
          card.style.border = '';
        });
      }
    });
    
    // Clear search on Escape key
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.blur();
      }
    });
  }

  // Form elements
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoader = submitBtn.querySelector('.btn-loader');

  // Error elements
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  // Validation rules
  const validators = {
    name: (value) => {
      if (!value.trim()) {
        return 'Name is required';
      }
      if (value.trim().length < 2) {
        return 'Name must be at least 2 characters';
      }
      return '';
    },
    
    email: (value) => {
      if (!value.trim()) {
        return 'Email is required';
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
      return '';
    },
    
    message: (value) => {
      if (!value.trim()) {
        return 'Message is required';
      }
      if (value.trim().length < 10) {
        return 'Message must be at least 10 characters';
      }
      return '';
    }
  };

  // Validate single field
  const validateField = (input, errorElement, validatorName) => {
    const error = validators[validatorName](input.value);
    
    if (error) {
      input.classList.add('error');
      errorElement.textContent = error;
      return false;
    } else {
      input.classList.remove('error');
      errorElement.textContent = '';
      return true;
    }
  };

  // Real-time validation on input
  nameInput.addEventListener('input', () => {
    validateField(nameInput, nameError, 'name');
  });

  emailInput.addEventListener('input', () => {
    validateField(emailInput, emailError, 'email');
  });

  messageInput.addEventListener('input', () => {
    validateField(messageInput, messageError, 'message');
  });

  // Validate all fields
  const validateForm = () => {
    const isNameValid = validateField(nameInput, nameError, 'name');
    const isEmailValid = validateField(emailInput, emailError, 'email');
    const isMessageValid = validateField(messageInput, messageError, 'message');
    
    return isNameValid && isEmailValid && isMessageValid;
  };

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all fields
    if (!validateForm()) {
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';

    // Simulate API call
    setTimeout(() => {
      // Hide loading state
      btnText.style.display = 'inline-block';
      btnLoader.style.display = 'none';
      submitBtn.disabled = false;

      // Show success message
      alert('Message sent successfully! We will get back to you soon.');
      
      // Reset form
      form.reset();
      nameInput.classList.remove('error');
      emailInput.classList.remove('error');
      messageInput.classList.remove('error');
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
    }, 2000);
  });

  // Hero CTA button interaction
  const heroCta = document.getElementById('heroCta');
  heroCta.addEventListener('click', () => {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
  });

  // Scroll animations (optional but subtle)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections
  const sections = document.querySelectorAll('.services, .projects, .contact');
  sections.forEach(section => {
    observer.observe(section);
  });

  // Observe service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Observe project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
});
