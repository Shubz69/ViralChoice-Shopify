/* ============================================
   VIRALCHOICE MODERN INTERACTIVE JS
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
    
    let lastScroll = 0;
    let ticking = false;
    
    function updateHeader() {
      const scrollY = window.scrollY;
      
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = scrollY;
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
    
    // Close on link click
    const menuLinks = menu.querySelectorAll('.vc-mobile-menu__link');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
  
  // ============================================
  // TRENDING CAROUSEL AUTO-SCROLL
  // ============================================
  
  function initTrendingCarousel() {
    const carousel = document.querySelector('.trending-carousel');
    if (!carousel) return;
    
    const track = carousel.querySelector('.trending-carousel__track');
    if (!track) return;
    
    // Duplicate items for seamless loop
    const items = track.querySelectorAll('.trending-carousel__item');
    if (items.length === 0) return;
    
    items.forEach(item => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
      if (!prefersReducedMotion) {
        track.style.animationPlayState = 'paused';
      }
    });
    
    carousel.addEventListener('mouseleave', () => {
      if (!prefersReducedMotion) {
        track.style.animationPlayState = 'running';
      }
    });
  }
  
  // ============================================
  // FAQ ACCORDION
  // ============================================
  
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;
      
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }
  
  // ============================================
  // PRODUCT PAGE COLLAPSIBLES
  // ============================================
  
  function initProductCollapsibles() {
    const collapsibles = document.querySelectorAll('.product-page__collapsible');
    if (collapsibles.length === 0) return;
    
    collapsibles.forEach(item => {
      const header = item.querySelector('.product-page__collapsible-header');
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
    const stickyATC = document.querySelector('.product-page__sticky-atc');
    if (!stickyATC) return;
    
    const mainATC = document.querySelector('[name="add"]');
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
    const stickyButton = stickyATC.querySelector('.product-page__sticky-button');
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
    const quickAddButtons = document.querySelectorAll('.product-card__quick-add');
    if (quickAddButtons.length === 0) return;
    
    quickAddButtons.forEach(button => {
      button.addEventListener('click', async function(e) {
        e.preventDefault();
        const productId = this.dataset.productId;
        const variantId = this.dataset.variantId;
        
        if (!productId || !variantId) return;
        
        // Disable button
        this.disabled = true;
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
            // Update cart count if element exists
            const cartCount = document.querySelector('.vc-cart-count');
            if (cartCount) {
              const currentCount = parseInt(cartCount.textContent) || 0;
              cartCount.textContent = currentCount + 1;
            }
            
            // Reset button after delay
            setTimeout(() => {
              this.disabled = false;
              this.textContent = 'Quick Add';
            }, 2000);
          } else {
            throw new Error(data.message || 'Failed to add to cart');
          }
        } catch (error) {
          console.error('Quick add error:', error);
          this.textContent = 'Error';
          this.disabled = false;
          setTimeout(() => {
            this.textContent = 'Quick Add';
          }, 2000);
        }
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
  // PARALLAX HERO (SUBTLE)
  // ============================================
  
  function initParallax() {
    if (prefersReducedMotion) return;
    if (window.innerWidth <= 768) return; // No parallax on mobile
    
    const hero = document.querySelector('.viral-hero__background');
    if (!hero) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const rate = scrolled * 0.3;
          hero.style.transform = `translateY(${rate}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
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
    initTrendingCarousel();
    initFAQ();
    initProductCollapsibles();
    initStickyATC();
    initQuickAdd();
    initScrollReveal();
    initParallax();
  }
  
  // Start
  init();
  
  // Re-init on section load (Shopify theme editor)
  if (typeof document.addEventListener !== 'undefined') {
    document.addEventListener('shopify:section:load', init);
  }
})();
