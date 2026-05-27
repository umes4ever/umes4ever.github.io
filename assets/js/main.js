/**
* Template Name: MyResume - v4.1.0
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  // Performance optimization: Use passive event listeners where possible
  const addPassiveListener = (element, event, handler) => {
    if (element) {
      element.addEventListener(event, handler, { passive: true });
    }
  };

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    const icon = this.querySelector('i')
    if (icon) {
      icon.classList.toggle('bi-list')
      icon.classList.toggle('bi-x')
    }
    this.setAttribute(
      'aria-expanded',
      select('body').classList.contains('mobile-nav-active')
    )
  })

  /**
   * Scroll with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()
      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        const icon = navbarToggle ? navbarToggle.querySelector('i') : null
        if (icon) {
          icon.classList.remove('bi-x')
          icon.classList.add('bi-list')
        }
        if (navbarToggle) {
          navbarToggle.setAttribute('aria-expanded', 'false')
        }
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll top of the page
   */
  on('click', '.back-to-top', function (e) {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    const hidePreloader = () => {
      preloader.style.opacity = '0';
      preloader.style.transition = 'opacity 0.5s ease-out';
      setTimeout(() => {
        if (preloader.parentNode) {
          preloader.remove();
        }
      }, 500);
    };

    // Hide preloader when page is loaded
    if (document.readyState === 'complete') {
      hidePreloader();
    } else {
      window.addEventListener('load', hidePreloader);
    }

    // Fallback: hide preloader after 3 seconds maximum
    setTimeout(hidePreloader, 3000);
  }

  /**
   * Hero type effect
   */
  let typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    if (typed_strings && typeof Typed !== 'undefined') {
      typed_strings = typed_strings.split(',')
      try {
        new Typed('.typed', {
          strings: typed_strings,
          loop: true,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000
        });
      } catch (error) {
        console.warn('Typed.js failed to initialize:', error);
        // Fallback: show first string
        if (typed_strings.length > 0) {
          typed.textContent = typed_strings[0];
        }
      }
    } else {
      // Fallback if Typed.js is not loaded
      if (typed_strings) {
        const strings = typed_strings.split(',');
        if (strings.length > 0) {
          typed.textContent = strings[0];
        }
      }
    }
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer && typeof Isotope !== 'undefined') {
      try {
        let portfolioIsotope = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item'
        });

        let portfolioFilters = select('#portfolio-flters li', true);

        on('click', '#portfolio-flters li', function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');

          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          portfolioIsotope.on('arrangeComplete', function () {
            if (typeof AOS !== 'undefined') {
              AOS.refresh();
            }
          });
        }, true);
      } catch (error) {
        console.warn('Isotope failed to initialize:', error);
      }
    }
  });

  /**
   * Initiate portfolio lightbox 
   */
  if (typeof GLightbox !== 'undefined') {
    try {
      const portfolioLightbox = GLightbox({
        selector: '.portfolio-lightbox'
      });

      const portfolioDetailsLightbox = GLightbox({
        selector: '.portfolio-details-lightbox',
        width: '90%',
        height: '90vh'
      });
    } catch (error) {
      console.warn('GLightbox failed to initialize:', error);
    }
  }

  /**
   * Portfolio details slider
   */
  if (typeof Swiper !== 'undefined' && document.querySelector('.portfolio-details-slider')) {
    try {
      new Swiper('.portfolio-details-slider', {
        speed: 400,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        }
      });
    } catch (error) {
      console.warn('Swiper failed to initialize:', error);
    }
  }

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
      try {
        AOS.init({
          duration: 1000,
          easing: "ease-in-out",
          once: true,
          mirror: false
        });
      } catch (error) {
        console.warn('AOS failed to initialize:', error);
      }
    } else {
      console.warn('AOS library not loaded');
    }
  });

  /**
   * Enhanced Liquid Glass Effects
   */

  // Generate placeholder image for missing profile images
  const generatePlaceholderImage = (imgElement, text = 'Profile') => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = 200;

    canvas.width = size;
    canvas.height = size;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#007AFF');
    gradient.addColorStop(1, '#5856D6');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Add text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, size / 2, size / 2);

    return canvas.toDataURL();
  };

  // Parallax effect for hero section
  const heroSection = select('#hero');
  if (heroSection) {
    let ticking = false;

    const updateParallax = () => {
      // Only apply parallax on large screens
      if (window.innerWidth < 992) {
        heroSection.style.transform = '';
        ticking = false;
        return;
      }
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.08; // Much less intense parallax
      const maxTranslate = -100; // px, adjust as needed
      heroSection.style.transform = `translateY(${Math.max(rate, maxTranslate)}px)`;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', updateParallax); // Reset on resize
  }

  // Smooth reveal animations for sections
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  let sectionObserver;

  try {
    sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
  } catch (error) {
    console.warn('IntersectionObserver not supported:', error);
    sectionObserver = null;
  }

  // Observe all sections for smooth reveal
  if (sectionObserver) {
    const sections = select('section', true);
    sections.forEach(section => {
      // Skip hero section as it has its own animations
      if (section.id === 'hero') return;

      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      sectionObserver.observe(section);
    });
  } else {
    // Fallback: show all sections immediately
    const sections = select('section', true);
    sections.forEach(section => {
      if (section.id === 'hero') return;
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    });
  }

  // Enhanced dynamic spotlight and 3D tilt for iOS 26 Glass Cards
  const glassCards = select('.bento-card, .portfolio-item, .resume-item', true);
  glassCards.forEach(card => {
    if (!card) return;

    // Create a spotlight glow layer inside each card if not present
    if (!card.querySelector('.glass-spotlight')) {
      const spotlight = document.createElement('div');
      spotlight.className = 'glass-spotlight';
      card.appendChild(spotlight);
    }

    card.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Spotlight tracking
      this.style.setProperty('--mouse-x', `${x}px`);
      this.style.setProperty('--mouse-y', `${y}px`);

      // 3D Tilt calculation (subtle and high-fidelity)
      const cardWidth = rect.width;
      const cardHeight = rect.height;
      const centerX = cardWidth / 2;
      const centerY = cardHeight / 2;
      
      const rotateX = ((y - centerY) / centerY) * -4; // max 4 degrees
      const rotateY = ((x - centerX) / centerX) * 4; // max 4 degrees

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.015)`;
      this.style.boxShadow = document.body.classList.contains('dark-theme')
        ? '0 30px 80px rgba(0, 0, 0, 0.55), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)'
        : '0 25px 60px rgba(10, 10, 20, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.5)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
      this.style.boxShadow = '';
    });
  });

  // Smooth cursor following effect for social links
  const socialLinks = select('.social-links a', true);
  socialLinks.forEach(link => {
    if (link) {
      link.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
      });
    }
  });

  // Style the Typed.js cursor via CSS injection (do not create a manual cursor element
  // as Typed.js manages .typed-cursor itself and re-inserts it after each string)
  if (!document.querySelector('#typed-cursor-styles')) {
    const style = document.createElement('style');
    style.id = 'typed-cursor-styles';
    style.textContent = `
      .typed-cursor {
        color: var(--primary-color);
        font-weight: 300;
        font-size: 1.5rem;
        opacity: 1;
        animation: typed-blink 0.7s infinite;
      }

      @keyframes typed-blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // Smooth scroll behavior enhancement
  const smoothScroll = (target, duration = 1000) => {
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  };

  // Enhanced scroll to top with smooth easing
  const backToTopBtn = select('.back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Generative Canvas Particle Constellation Background for Hero
  const initHeroCanvas = () => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isVisible = true; // track hero visibility to pause when off-screen
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const particles = [];
    const maxParticles = window.innerWidth < 768 ? 35 : 75;
    const maxDistance = 120;
    const mouse = { x: null, y: null, radius: 150 };

    // Resize handler
    const resizeCanvas = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resizeCanvas);

    // Mouse movement
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      });
      heroSection.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
      });

      // Pause canvas animation when hero scrolls out of view
      try {
        const heroVisibilityObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            isVisible = entry.isIntersecting;
            if (isVisible && !animationFrameId) {
              animate(); // resume
            }
          });
        }, { threshold: 0 });
        heroVisibilityObserver.observe(heroSection);
      } catch (e) {
        // IntersectionObserver not supported — always animate
      }
    }

    // Particle template
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce borders
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction (gentle attraction)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.hypot(dx, dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x += (dx / distance) * force * 0.3;
            this.y += (dy / distance) * force * 0.3;
          }
        }
      }

      draw() {
        const isDark = document.body.classList.contains('dark-theme');
        ctx.fillStyle = isDark ? 'rgba(41, 151, 255, 0.45)' : 'rgba(0, 122, 255, 0.25)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Generate particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    // Loop — pauses automatically when hero is off-screen
    const animate = () => {
      if (!isVisible) {
        animationFrameId = null;
        return; // stop scheduling frames; heroVisibilityObserver will resume
      }

      ctx.clearRect(0, 0, width, height);

      // Render & connect particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.hypot(dx, dy);

          if (distance < maxDistance) {
            const isDark = document.body.classList.contains('dark-theme');
            const alpha = (1 - distance / maxDistance) * (isDark ? 0.15 : 0.12);
            ctx.strokeStyle = isDark ? `rgba(175, 82, 222, ${alpha})` : `rgba(0, 122, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Connect to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const distance = Math.hypot(dx, dy);
          if (distance < mouse.radius) {
            const alpha = (1 - distance / mouse.radius) * 0.18;
            ctx.strokeStyle = document.body.classList.contains('dark-theme') 
              ? `rgba(255, 55, 95, ${alpha})` 
              : `rgba(88, 86, 214, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Attach reference to cleanup later
    window._canvasCleanup = () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  };

  // Initialize canvas on load
  window.addEventListener('load', initHeroCanvas);

  // Enhanced mobile navigation with backdrop blur
  const mobileNavToggle = select('.mobile-nav-toggle');
  const header = select('#header');

  if (mobileNavToggle && header) {
    mobileNavToggle.addEventListener('click', () => {
      // The backdrop filter is already set in CSS, no need to modify it here
      // This prevents potential conflicts with the existing mobile nav functionality
    });
  }

  // Add loading animation for images with error handling
  const images = select('img', true);
  images.forEach(img => {
    // Set initial state
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95)';
    img.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

    // Handle successful load
    img.addEventListener('load', function () {
      this.style.opacity = '1';
      this.style.transform = 'scale(1)';
    });

    // Handle load error
    img.addEventListener('error', function () {
      console.warn('Image failed to load:', this.src);

      // Generate placeholder for profile images
      if (this.src.includes('profile-img') || this.alt.toLowerCase().includes('profile')) {
        this.src = generatePlaceholderImage(this, 'Profile');
      } else {
        // For other images, show with reduced opacity
        this.style.opacity = '1';
        this.style.transform = 'scale(1)';
        this.style.filter = 'grayscale(100%) opacity(0.3)';
      }
    });

    // If image is already loaded (cached), trigger load event
    if (img.complete) {
      img.style.opacity = '1';
      img.style.transform = 'scale(1)';
    }
  });

  // Track all timeout IDs for safe cleanup
  const _timeoutIds = [];
  const _safeTimeout = (fn, delay) => {
    const id = setTimeout(fn, delay);
    _timeoutIds.push(id);
    return id;
  };

  // Enhanced section transitions with stagger effect
  const staggerElements = (elements, delay = 100) => {
    elements.forEach((el, index) => {
      _safeTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * delay);
    });
  };

  // Apply stagger effect to resume and portfolio items
  if (sectionObserver) {
    const resumeSection = select('#resume');
    const portfolioSection = select('#portfolio');

    if (resumeSection) {
      const resumeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.resume-item');
            if (items.length > 0) {
              staggerElements(items, 150);
            }
            resumeObserver.unobserve(entry.target);
          }
        });
      }, observerOptions);

      resumeObserver.observe(resumeSection);
    }

    if (portfolioSection) {
      const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.portfolio-item');
            if (items.length > 0) {
              staggerElements(items, 150);
            }
            portfolioObserver.unobserve(entry.target);
          }
        });
      }, observerOptions);

      portfolioObserver.observe(portfolioSection);
    }
  }

  // Cleanup function to prevent memory leaks
  const cleanup = () => {
    // Disconnect all IntersectionObservers
    if (sectionObserver) {
      sectionObserver.disconnect();
    }
    // Cancel canvas animation loop
    if (typeof window._canvasCleanup === 'function') {
      window._canvasCleanup();
    }
    // Clear only timeouts tracked by this script
    _timeoutIds.forEach(id => clearTimeout(id));
    _timeoutIds.length = 0;
  };

  // Add cleanup on page unload
  window.addEventListener('beforeunload', cleanup);
  window.addEventListener('unload', cleanup);

})();

// Enhanced Theme toggle logic with system preference detection
(function() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-toggle-icon');
  const body = document.body;
  const THEME_KEY = 'umes4ever-theme';

  // Function to detect system theme preference
  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  // Function to apply theme
  function setTheme(theme) {
    const isDark = theme === 'dark';
    
    if (isDark) {
      body.classList.add('dark-theme');
      if (themeIcon) {
        themeIcon.classList.remove('bi-sun');
        themeIcon.classList.add('bi-moon');
      }
    } else {
      body.classList.remove('dark-theme');
      if (themeIcon) {
        themeIcon.classList.remove('bi-moon');
        themeIcon.classList.add('bi-sun');
      }
    }
  }

  // Function to get current theme preference
  function getCurrentTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    
    // If user has explicitly set a preference, use it
    if (savedTheme && savedTheme !== 'system') {
      return savedTheme;
    }
    
    // Otherwise, use system preference
    return getSystemTheme();
  }

  // Initialize theme based on preference
  function initializeTheme() {
    const currentTheme = getCurrentTheme();
    setTheme(currentTheme);
  }

  // Listen for system theme changes
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemChange = (e) => {
      const savedTheme = localStorage.getItem(THEME_KEY);
      // Only auto-switch if user hasn't set an explicit preference
      if (!savedTheme || savedTheme === 'system') {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
    } 
    // Fallback for older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemChange);
    }
  }

  // Initialize theme on page load
  initializeTheme();

  // Single theme toggle click handler with triple-click detection
  if (themeToggle) {
    let clickCount = 0;
    let clickTimer = null;

    themeToggle.addEventListener('click', function() {
      clickCount++;
      
      if (clickCount === 1) {
        // Single click - toggle theme
        const currentTheme = getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        setTheme(newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
        this.blur();
        
        // Set timer to reset click count
        clickTimer = setTimeout(() => {
          clickCount = 0;
        }, 500);
      } else if (clickCount === 3) {
        // Triple click - reset to system preference
        clearTimeout(clickTimer);
        clickCount = 0;
        
        localStorage.setItem(THEME_KEY, 'system');
        const systemTheme = getSystemTheme();
        setTheme(systemTheme);
        this.blur();
        
        // Optional: Show a brief notification
        console.log('Theme reset to system preference:', systemTheme);
      }
    });
  }
})();