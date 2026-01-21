/* ============================================
   VIRALCHOICE PREMIUM INTERACTIVE JS
   ============================================ */

(function() {
  'use strict';
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // ============================================
  // HEADER BLUR ON SCROLL
  // ============================================
  
  function initHeaderBlur() {
    const header = document.querySelector('.vc-header');
    if (!header) return;
    
    let ticking = false;
    
    function updateHeader() {
      const scrollY = window.scrollY;
      
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      ticking = false;
    }
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }
  
  // ============================================
  // MOBILE MENU
  // ============================================
  
  function initMobileMenu() {
    const toggle = document.querySelector('.vc-mobile-menu-toggle');
    const menu = document.querySelector('.vc-mobile-menu');
    const close = document.querySelector('.vc-mobile-menu__close');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', () => {
      menu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    
    if (close) {
      close.addEventListener('click', () => {
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
    
    const menuLinks = menu.querySelectorAll('.vc-mobile-menu__link');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
  
  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================
  
  function initScrollReveal() {
    if (prefersReducedMotion) return;
    
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(reveal => {
      observer.observe(reveal);
    });
  }
  
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
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherQuestion = otherItem.querySelector('.vc-faq-question');
          if (otherQuestion) {
            otherQuestion.setAttribute('aria-expanded', 'false');
          }
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
        }
      });
      
      // Set initial aria state
      question.setAttribute('aria-expanded', 'false');
    });
  }
  
  // ============================================
  // PRODUCT PAGE COLLAPSIBLES
  // ============================================
  
  function initProductCollapsibles() {
    const collapsibles = document.querySelectorAll('.vc-product-page__collapsible');
    if (collapsibles.length === 0) return;
    
    collapsibles.forEach(item => {
      const header = item.querySelector('.vc-product-page__collapsible-header');
      if (!header) return;
      
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all
        collapsibles.forEach(otherItem => {
          otherItem.classList.remove('active');
        });
        
        // Open clicked if wasn't active
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }
  
  // ============================================
  // STICKY MOBILE ATC
  // ============================================
  
  function initStickyATC() {
    const stickyATC = document.querySelector('.vc-product-page__sticky-atc');
    if (!stickyATC) return;
    
    const mainATC = document.querySelector('[name="add"], .vc-product-page__add-to-cart');
    if (!mainATC) return;
    
    let ticking = false;
    
    function checkScroll() {
      if (window.innerWidth > 768) {
        stickyATC.classList.remove('visible');
        return;
      }
      
      const mainATCRect = mainATC.getBoundingClientRect();
      const shouldShow = mainATCRect.bottom < 0;
      
      if (shouldShow) {
        stickyATC.classList.add('visible');
      } else {
        stickyATC.classList.remove('visible');
      }
      
      ticking = false;
    }
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(checkScroll);
        ticking = true;
      }
    }, { passive: true });
    
    // Handle sticky button click
    const stickyButton = stickyATC.querySelector('.vc-product-page__sticky-button');
    if (stickyButton) {
      stickyButton.addEventListener('click', () => {
        mainATC.click();
      });
    }
  }
  
  // ============================================
  // QUICK ADD TO CART
  // ============================================
  
  function initQuickAdd() {
    const quickAddButtons = document.querySelectorAll('.vc-product-card__quick-add');
    if (quickAddButtons.length === 0) return;
    
    quickAddButtons.forEach(button => {
      button.addEventListener('click', async function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (this.disabled) return;
        
        const productId = this.dataset.productId;
        const variantId = this.dataset.variantId;
        
        if (!productId || !variantId) return;
        
        // Disable button
        this.disabled = true;
        const originalText = this.textContent;
        this.textContent = 'Adding...';
        
        try {
          const response = await fetch(window.routes.cart_add_url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              items: [{
                id: variantId,
                quantity: 1
              }]
            })
          });
          
          const data = await response.json();
          
          if (response.ok) {
            this.textContent = 'Added!';
            showToast('Product added to cart');
            
            // Update cart count if element exists
            const cartCount = document.querySelector('.vc-cart-count');
            if (cartCount) {
              const currentCount = parseInt(cartCount.textContent) || 0;
              cartCount.textContent = currentCount + 1;
            }
            
            // Reset button after delay
            setTimeout(() => {
              this.disabled = false;
              this.textContent = originalText;
            }, 2000);
          } else {
            throw new Error(data.message || 'Failed to add to cart');
          }
        } catch (error) {
          console.error('Quick add error:', error);
          this.textContent = 'Error';
          showToast('Failed to add product', true);
          this.disabled = false;
          setTimeout(() => {
            this.textContent = originalText;
          }, 2000);
        }
      });
    });
  }
  
  // ============================================
  // TOAST NOTIFICATION
  // ============================================
  
  function showToast(message, isError = false) {
    // Remove existing toast
    const existingToast = document.querySelector('.vc-toast');
    if (existingToast) {
      existingToast.remove();
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = 'vc-toast';
    if (isError) {
      toast.style.borderColor = 'var(--primary)';
    }
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
      toast.classList.add('visible');
    }, 10);
    
    // Hide and remove toast
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }
  
  // ============================================
  // SMOOTH ANCHOR SCROLL
  // ============================================
  
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
  
  // ============================================
  // PRODUCT IMAGE THUMBNAILS
  // ============================================
  
  function initProductThumbnails() {
    const thumbnails = document.querySelectorAll('.vc-product-page__thumbnail');
    const mainImage = document.querySelector('.vc-product-page__image img');
    
    if (thumbnails.length === 0 || !mainImage) return;
    
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', function() {
        const imageSrc = this.querySelector('img')?.src;
        if (imageSrc) {
          mainImage.src = imageSrc;
          // Update active class
          thumbnails.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
        }
      });
    });
    
    // Set first thumbnail as active
    if (thumbnails.length > 0) {
      thumbnails[0].classList.add('active');
    }
  }
  
  // ============================================
  // INITIALIZE ALL
  // ============================================
  
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    initHeaderBlur();
    initMobileMenu();
    initScrollReveal();
    initFAQ();
    initProductCollapsibles();
    initStickyATC();
    initQuickAdd();
    initSmoothScroll();
    initProductThumbnails();
  }
  
  // Start
  init();
  
  // Re-init on section load (Shopify theme editor)
  if (typeof document.addEventListener !== 'undefined') {
    document.addEventListener('shopify:section:load', init);
  }
})();
