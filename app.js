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

    // Active nav link highlight & dark section header adapter
    let currentId = '';
    let isCurrentSectionDark = false;
    const scrollPosition = window.scrollY + 100; // Trigger slightly before it enters

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
        isCurrentSectionDark = section.classList.contains('section-dark');
      }
    });

    // Toggle header dark mode styles dynamically based on current section
    if (isCurrentSectionDark) {
      document.body.classList.add('section-dark-active');
    } else {
      document.body.classList.remove('section-dark-active');
    }

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
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'grid';
          // Smooth fade in
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

      // Close all FAQ items
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
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  // ==========================================
  // SCOPE & ROI ESTIMATOR LOGIC
  // ==========================================
  const selectBtns = document.querySelectorAll('.estimator-select-btn');
  const scopeSlider = document.getElementById('scope-slider');
  const trafficSlider = document.getElementById('traffic-slider');
  const revenueSlider = document.getElementById('revenue-slider');

  const pagesLabel = document.getElementById('pages-label');
  const trafficLabel = document.getElementById('traffic-label');
  const revenueLabel = document.getElementById('revenue-label');

  const calcPrice = document.getElementById('calc-price');
  const calcRoi = document.getElementById('calc-roi');
  const calcSpeed = document.getElementById('calc-speed');
  const estimatorCta = document.getElementById('estimator-cta');

  // Sliders mapping values
  const scopeMap = {
    1: { name: '1-5 Pages / Core Setup', multiplier: 1.0 },
    2: { name: '5-12 Pages / Intermediate features', multiplier: 1.35 },
    3: { name: '12-25 Pages / High complexity', multiplier: 1.75 },
    4: { name: 'Unlimited Pages / Custom scaling', multiplier: 2.2 }
  };

  const trafficMap = {
    1: { value: 5000, display: '5,000' },
    2: { value: 15000, display: '15,000' },
    3: { value: 40000, display: '40,000' },
    4: { value: 100000, display: '100,000' },
    5: { value: 250000, display: '250,000+' }
  };

  const revenueMap = {
    1: { value: 50000, display: '₹50,000' },
    2: { value: 200000, display: '₹2,00,000' },
    3: { value: 600000, display: '₹6,00,000' },
    4: { value: 1500000, display: '₹15,00,000' },
    5: { value: 4000000, display: '₹40,00,000+' }
  };

  let activeType = 'website';
  let activeBasePrice = 150000;

  // Change project type
  selectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      selectBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeType = btn.getAttribute('data-type');
      activeBasePrice = parseInt(btn.getAttribute('data-base'));
      updateEstimator();
    });
  });

  // Event listeners for sliders
  if (scopeSlider && trafficSlider && revenueSlider) {
    scopeSlider.addEventListener('input', updateEstimator);
    trafficSlider.addEventListener('input', updateEstimator);
    revenueSlider.addEventListener('input', updateEstimator);
    updateEstimator(); // Initial calculation
  }

  function updateEstimator() {
    const scopeIndex = parseInt(scopeSlider.value);
    const trafficIndex = parseInt(trafficSlider.value);
    const revenueIndex = parseInt(revenueSlider.value);

    // Get current parameters
    const scope = scopeMap[scopeIndex];
    const traffic = trafficMap[trafficIndex];
    const revenue = revenueMap[revenueIndex];

    // Update labels text
    pagesLabel.textContent = `Project Scope: ${scope.name}`;
    trafficLabel.textContent = `Monthly Traffic: ${traffic.display} Visitors`;
    revenueLabel.textContent = `Average Monthly Sales: ${revenue.display}`;

    // Price calculation
    const calculatedBase = activeBasePrice * scope.multiplier;
    const minPrice = Math.round(calculatedBase / 10000) * 10000;
    const maxPrice = Math.round((calculatedBase * 1.25) / 10000) * 10000;
    
    calcPrice.textContent = `₹${minPrice.toLocaleString('en-IN')} - ₹${maxPrice.toLocaleString('en-IN')}`;

    // ROI calculation based on revenue lift (conversion optimization lifts: Web: 15%, Ecom: 22%, App: 18%)
    let conversionLift = 0.15;
    if (activeType === 'ecommerce') conversionLift = 0.22;
    if (activeType === 'webapp') conversionLift = 0.18;
    if (activeType === 'mobile') conversionLift = 0.20;

    const roiLift = Math.round((revenue.value * conversionLift) / 5000) * 5000;
    calcRoi.textContent = `+₹${roiLift.toLocaleString('en-IN')}/mo`;

    // Speed Promise
    if (activeType === 'website') calcSpeed.textContent = '< 0.6s';
    if (activeType === 'ecommerce') calcSpeed.textContent = '< 0.8s';
    if (activeType === 'webapp') calcSpeed.textContent = '< 1.0s';
    if (activeType === 'mobile') calcSpeed.textContent = 'Native (60fps)';

    // Update CTA WhatsApp Link with dynamic details
    const textMsg = `Hi Grow With Us, I want to discuss a new project! Here are my estimator details:
- Project Type: ${activeType.toUpperCase()}
- Scope: ${scope.name}
- Current Traffic: ${traffic.display} visitors
- Current Monthly Sales: ${revenue.display}
- Expected ROI Lift: +₹${roiLift.toLocaleString('en-IN')}/mo
Please share a customized proposal.`;

    const encodedMsg = encodeURIComponent(textMsg);
    estimatorCta.setAttribute('href', `https://wa.me/918630170462?text=${encodedMsg}`);
  }

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
});
