/* ============================================
   VIRALCHOICE PREMIUM INTERACTIVE JAVASCRIPT
   Modern, interactive features - Red & Black theme
   ============================================ */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================
  // FAQ ACCORDION - ENHANCED
  // ============================================
  
  function initFAQ() {
    const faqItems = document.querySelectorAll('.vc-faq-item');
    if (faqItems.length === 0) return;
    
    faqItems.forEach((item, index) => {
      const question = item.querySelector('.vc-faq-question');
      if (!question) return;
      
      // Add stagger animation delay
      if (!prefersReducedMotion) {
        item.style.transitionDelay = `${index * 0.05}s`;
      }
      
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        
        // Close all other items with animation
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('is-open')) {
            otherItem.classList.remove('is-open');
          }
        });
        
        // Toggle current item
        setTimeout(() => {
          item.classList.toggle('is-open', !isOpen);
        }, isOpen ? 0 : 100);
      });
    });
  }

  // ============================================
  // STICKY MOBILE ADD TO CART - ENHANCED
  // ============================================
  
  function initStickyATC() {
    const stickyATC = document.querySelector('.vc-sticky-atc');
    if (!stickyATC) return;
    
    const mainATCButton = document.querySelector('.vc-add-to-cart-button');
    if (!mainATCButton) return;
    
    let isVisible = false;
    let ticking = false;
    
    function checkScroll() {
      if (window.innerWidth > 768) {
        if (isVisible) {
          stickyATC.classList.remove('is-visible');
          isVisible = false;
        }
        return;
      }
      
      const mainButtonRect = mainATCButton.getBoundingClientRect();
      const shouldShow = mainButtonRect.bottom < 0;
      
      if (shouldShow !== isVisible) {
        isVisible = shouldShow;
        stickyATC.classList.toggle('is-visible', shouldShow);
      }
    }
    
    // Throttled scroll handler
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    
    // Handle click on sticky button
    const stickyButton = stickyATC.querySelector('.vc-sticky-atc__button');
    if (stickyButton) {
      stickyButton.addEventListener('click', (e) => {
        e.preventDefault();
        mainATCButton.click();
        // Add pulse effect
        stickyButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
          stickyButton.style.transform = '';
        }, 150);
      });
    }
    
    window.addEventListener('resize', checkScroll, { passive: true });
  }

  // ============================================
  // SCROLL REVEAL ANIMATION - ENHANCED
  // ============================================
  
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.vc-reveal');
    if (revealElements.length === 0) return;
    
    // Make all elements visible immediately if reduced motion or if JS hasn't loaded
    if (prefersReducedMotion) {
      revealElements.forEach(el => el.classList.add('is-visible'));
      return;
    }
    
    // Show elements that are already in viewport immediately
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-visible');
      }
    });
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animation
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, index * 50);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
      if (!el.classList.contains('is-visible')) {
        observer.observe(el);
      }
    });
  }

  // ============================================
  // PRODUCT IMAGE ZOOM & THUMBNAILS - ENHANCED
  // ============================================
  
  function initProductImages() {
    if (prefersReducedMotion) return;
    
    const productImages = document.querySelectorAll('.vc-product-image');
    const thumbnails = document.querySelectorAll('.vc-product-thumbnail');
    
    // Main image hover zoom (desktop only)
    if (window.innerWidth > 768) {
      productImages.forEach(image => {
        const img = image.querySelector('img');
        if (!img) return;
        
        image.addEventListener('mouseenter', () => {
          img.style.transform = 'scale(1.1)';
          image.style.borderColor = 'var(--vc-red)';
          image.style.boxShadow = 'var(--vc-shadow-red)';
        }, { passive: true });
        
        image.addEventListener('mouseleave', () => {
          img.style.transform = 'scale(1)';
          image.style.borderColor = '';
          image.style.boxShadow = '';
        }, { passive: true });
      });
    }
    
    // Thumbnail interactions
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', function() {
        // Remove active class from all
        thumbnails.forEach(t => t.classList.remove('active'));
        // Add active class to clicked
        this.classList.add('active');
        
        // Get image source and update main image
        const imageSrc = this.getAttribute('data-image-src');
        const mainImage = document.querySelector('.vc-product-image img');
        if (imageSrc && mainImage) {
          // Fade out
          mainImage.style.opacity = '0';
          setTimeout(() => {
            mainImage.src = imageSrc;
            // Fade in
            setTimeout(() => {
              mainImage.style.opacity = '1';
            }, 50);
          }, 200);
        }
      });
      
      // Hover effect
      thumb.addEventListener('mouseenter', function() {
        if (!prefersReducedMotion) {
          this.style.transform = 'translateY(-4px) scale(1.05)';
        }
      }, { passive: true });
      
      thumb.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
          this.style.transform = '';
        }
      }, { passive: true });
    });
    
    // Set first thumbnail as active
    if (thumbnails.length > 0) {
      thumbnails[0].classList.add('active');
    }
  }

  // ============================================
  // BUTTON INTERACTIONS - ENHANCED
  // ============================================
  
  function initButtonEffects() {
    const buttons = document.querySelectorAll('.vc-button');
    
    buttons.forEach(button => {
      // Ripple effect on click
      button.addEventListener('click', function(e) {
        if (prefersReducedMotion) return;
        
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  // ============================================
  // TRUST BADGE INTERACTIONS
  // ============================================
  
  function initTrustBadges() {
    const badges = document.querySelectorAll('.vc-trust-badge');
    
    badges.forEach((badge, index) => {
      // Stagger entrance
      if (!prefersReducedMotion) {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
        setTimeout(() => {
          badge.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          badge.style.opacity = '1';
          badge.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }

  // ============================================
  // PARALLAX EFFECT (Subtle)
  // ============================================
  
  function initParallax() {
    if (prefersReducedMotion) return;
    if (window.innerWidth <= 768) return; // Mobile: no parallax
    
    const hero = document.querySelector('.vc-hero');
    if (!hero) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const rate = scrolled * 0.3;
          
          if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
          }
          
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================
  
  function initHeaderScroll() {
    const header = document.querySelector('.vc-header');
    if (!header) return;
    
    let lastScroll = 0;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.pageYOffset;
          
          if (currentScroll > 100) {
            header.style.background = 'rgba(11, 11, 11, 0.98)';
            header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.8)';
          } else {
            header.style.background = 'rgba(11, 11, 11, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
          }
          
          lastScroll = currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ============================================
  // PARTICLE SYSTEM - REMOVED (Professional Design)
  // ============================================
  
  function initParticles() {
    // Removed for professional design
    return;
  }

  // ============================================
  // CURSOR TRAIL EFFECT - REMOVED (Professional Design)
  // ============================================
  
  function initCursorTrail() {
    // Removed for professional design
    return;
        point.element.style.left = point.x + 'px';
        point.element.style.top = point.y + 'px';
      });
      requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
  }

  // ============================================
  // ADD RIPPLE ANIMATION CSS
  // ============================================
  
  function addRippleAnimation() {
    if (document.getElementById('vc-ripple-style')) return;
    
    const style = document.createElement('style');
    style.id = 'vc-ripple-style';
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ============================================
  // INITIALIZE ALL FEATURES
  // ============================================
  
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    addRippleAnimation();
    initFAQ();
    initStickyATC();
    initScrollReveal();
    initProductImages();
    initButtonEffects();
    initTrustBadges();
    initParallax();
    initHeaderScroll();
    // Particle and cursor trail effects removed for professional design
  }
  
  // Start initialization
  init();
  
  // Re-initialize on dynamic content load
  if (typeof document.addEventListener !== 'undefined') {
    document.addEventListener('shopify:section:load', init);
  }
})();
