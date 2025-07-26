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
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
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
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
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
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
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

  // Enhanced hover effects for cards
  const cards = select('.resume-item, .portfolio-item, .about .content', true);
  cards.forEach(card => {
    if (card) {
      card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
      });

      card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
      });
    }
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

  // Enhanced typing animation with cursor blink
  const typedElement = select('.typed');
  if (typedElement) {
    // Remove existing cursor if any
    const existingCursor = typedElement.parentNode.querySelector('.typed-cursor');
    if (existingCursor) {
      existingCursor.remove();
    }

    const cursor = document.createElement('span');
    cursor.className = 'typed-cursor';
    cursor.innerHTML = '|';
    cursor.style.color = 'var(--primary-color)';
    cursor.style.animation = 'blink 1s infinite';
    typedElement.parentNode.appendChild(cursor);
  }

  // Add CSS for cursor blink animation
  if (!document.querySelector('#typed-cursor-styles')) {
    const style = document.createElement('style');
    style.id = 'typed-cursor-styles';
    style.textContent = `
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
      
      .typed-cursor {
        font-weight: 300;
        font-size: 1.5rem;
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

  // Add floating particles effect to hero section
  const createParticles = () => {
    const hero = select('#hero');
    if (!hero) return;

    // Clear existing particles to prevent duplicates
    const existingParticles = hero.querySelectorAll('.floating-particle');
    existingParticles.forEach(particle => particle.remove());

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.cssText = `
        position: absolute;
        width: 3px;
        height: 3px;
        background: rgba(0, 122, 255, 0.2);
        border-radius: 50%;
        pointer-events: none;
        animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 2}s;
        z-index: 1;
      `;
      hero.appendChild(particle);
    }
  };

  // Initialize particles on load
  window.addEventListener('load', createParticles);

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

  // Enhanced section transitions with stagger effect
  const staggerElements = (elements, delay = 100) => {
    elements.forEach((el, index) => {
      setTimeout(() => {
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
    // Remove event listeners and observers when page unloads
    if (sectionObserver) {
      sectionObserver.disconnect();
    }

    // Clear any intervals or timeouts
    const highestTimeoutId = setTimeout(";");
    for (let i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }
  };

  // Add cleanup on page unload
  window.addEventListener('beforeunload', cleanup);
  window.addEventListener('unload', cleanup);

})();