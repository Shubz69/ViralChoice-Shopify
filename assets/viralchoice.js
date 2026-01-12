/* ============================================
   VIRALCHOICE INTERACTIVE JAVASCRIPT
   Lightweight vanilla JS - respects prefers-reduced-motion
   ============================================ */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================
  // FAQ ACCORDION
  // ============================================
  
  function initFAQ() {
    const faqItems = document.querySelectorAll('.vc-faq-item');
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
      const question = item.querySelector('.vc-faq-question');
      if (!question) return;
      
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        
        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('is-open');
          }
        });
        
        // Toggle current item
        item.classList.toggle('is-open', !isOpen);
      });
    });
  }

  // ============================================
  // STICKY MOBILE ADD TO CART
  // ============================================
  
  function initStickyATC() {
    const stickyATC = document.querySelector('.vc-sticky-atc');
    if (!stickyATC) return;
    
    const mainATCButton = document.querySelector('.vc-add-to-cart-button');
    if (!mainATCButton) return;
    
    let isVisible = false;
    let ticking = false;
    
    function checkScroll() {
      // Only show on mobile
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
      });
    }
    
    // Check on resize
    window.addEventListener('resize', checkScroll, { passive: true });
  }

  // ============================================
  // SCROLL REVEAL ANIMATION (Lightweight)
  // ============================================
  
  function initScrollReveal() {
    // Skip if user prefers reduced motion
    if (prefersReducedMotion) return;
    
    const revealElements = document.querySelectorAll('.vc-reveal');
    if (revealElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
  }

  // ============================================
  // PRODUCT IMAGE ZOOM (Desktop only, respects motion)
  // ============================================
  
  function initProductImageZoom() {
    if (prefersReducedMotion) return;
    
    const productImages = document.querySelectorAll('.vc-product-image');
    if (productImages.length === 0) return;
    
    // Only on desktop
    if (window.innerWidth <= 768) return;
    
    productImages.forEach(image => {
      const img = image.querySelector('img');
      if (!img) return;
      
      image.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
      }, { passive: true });
      
      image.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
      }, { passive: true });
    });
  }

  // ============================================
  // INITIALIZE ALL FEATURES
  // ============================================
  
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    initFAQ();
    initStickyATC();
    initScrollReveal();
    initProductImageZoom();
  }
  
  // Start initialization
  init();
  
  // Re-initialize on dynamic content load (for Shopify sections)
  if (typeof document.addEventListener !== 'undefined') {
    document.addEventListener('shopify:section:load', init);
  }
})();
