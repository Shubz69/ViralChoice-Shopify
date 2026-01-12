/* ============================================
   VIRALCHOICE INTERACTIVE JAVASCRIPT
   Lightweight vanilla JS for interactions
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // FAQ ACCORDION
  // ============================================
  
  function initFAQ() {
    const faqItems = document.querySelectorAll('.vc-faq-item');
    
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
        if (isOpen) {
          item.classList.remove('is-open');
        } else {
          item.classList.add('is-open');
        }
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
    
    function checkScroll() {
      if (window.innerWidth > 768) {
        stickyATC.classList.remove('is-visible');
        return;
      }
      
      const mainButtonRect = mainATCButton.getBoundingClientRect();
      const shouldShow = mainButtonRect.bottom < 0;
      
      if (shouldShow && !isVisible) {
        stickyATC.classList.add('is-visible');
        isVisible = true;
      } else if (!shouldShow && isVisible) {
        stickyATC.classList.remove('is-visible');
        isVisible = false;
      }
    }
    
    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
    
    // Handle click on sticky button
    const stickyButton = stickyATC.querySelector('.vc-sticky-atc__button');
    if (stickyButton) {
      stickyButton.addEventListener('click', (e) => {
        e.preventDefault();
        mainATCButton.click();
      });
    }
  }

  // ============================================
  // SCROLL REVEAL ANIMATION
  // ============================================
  
  function initScrollReveal() {
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
      rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
  }

  // ============================================
  // SMOOTH PRODUCT IMAGE ZOOM
  // ============================================
  
  function initProductImageZoom() {
    const productImages = document.querySelectorAll('.vc-product-image');
    
    productImages.forEach(image => {
      const img = image.querySelector('img');
      if (!img) return;
      
      image.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
      });
      
      image.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
      });
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
