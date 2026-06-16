document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // STICKY HEADER & ACTIVE NAVIGATION LINKS
  // ==========================================
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function handleScroll() {
    // Scroll header styling
    if (window.scrollY > 20) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    // Active nav link highlight
    let currentId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial call

  // ==========================================
  // MOBILE MENU TOGGLE
  // ==========================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // ==========================================
  // PORTFOLIO FILTERING
  // ==========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active to current button
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'grid';
          // Force reflow for fade-in animations if needed
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ==========================================
  // FAQ ACCORDION
  // ==========================================
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const isActive = parent.classList.contains('active');

      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle current FAQ item
      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });

  // ==========================================
  // CONTACT FORM SIMULATION / SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Gather input data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const budget = document.getElementById('budget').value;
      const message = document.getElementById('message').value;

      // Simulate API post
      formStatus.textContent = 'Submitting message...';
      formStatus.className = 'form-status';
      formStatus.style.display = 'block';

      setTimeout(() => {
        formStatus.textContent = `Thank you, ${name}! Your inquiry has been received. We'll contact you shortly.`;
        formStatus.className = 'form-status success';
        contactForm.reset();
      }, 1000);
    });
  }

  // ==========================================
  // REVEAL ON SCROLL ANIMATION
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters view
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
});
