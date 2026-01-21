/* ============================================
   VIRALCHOICE PREMIUM INTERACTIONS 2025
   Modern, smooth, high-performance JavaScript
   ============================================ */

(function() {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================
  // UTILITIES
  // ============================================

  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  // ============================================
  // HEADER - STICKY WITH SHRINK & BLUR
  // ============================================

  function initHeader() {
    const header = document.querySelector('.vc-header');
    const headerInner = document.querySelector('.vc-header__inner');
    if (!header || !headerInner) return;

    let lastScrollY = window.scrollY;
    const updateHeader = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScrollY = scrollY;
    };

    window.addEventListener('scroll', throttle(updateHeader, 100), { passive: true });
    updateHeader();

    // Mobile menu
    const mobileToggle = document.querySelector('.vc-mobile-menu-toggle');
    const mobileMenu = document.querySelector('.vc-mobile-menu');
    const mobileClose = document.querySelector('.vc-mobile-menu__close');
    const body = document.body;

    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
      });

      if (mobileClose) {
        mobileClose.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
          body.style.overflow = '';
        });
      }

      // Close on link click
      const mobileLinks = mobileMenu.querySelectorAll('.vc-mobile-menu__link');
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
          body.style.overflow = '';
        });
      });
    }

    // Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = header.offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================

  function initScrollReveal() {
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      return;
    }

    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length === 0) return;

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

    revealElements.forEach(el => observer.observe(el));
  }

  // ============================================
  // PARALLAX EFFECTS
  // ============================================

  function initParallax() {
    if (prefersReducedMotion || window.innerWidth <= 768) return;

    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length === 0) return;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(el => {
        const rate = scrolled * parseFloat(el.dataset.parallax || 0.3);
        el.style.transform = `translateY(${rate}px)`;
      });
    };

    window.addEventListener('scroll', throttle(updateParallax, 10), { passive: true });
  }

  // ============================================
  // TRENDING CAROUSEL - AUTO SCROLL
  // ============================================

  function initTrendingCarousel() {
    const scrollContainer = document.querySelector('.vc-trending__scroll');
    if (!scrollContainer) return;

    const track = scrollContainer.querySelector('.vc-trending__track');
    if (!track) return;

    if (prefersReducedMotion) return;

    let isPaused = false;
    let scrollPosition = 0;
    let animationFrameId;
    const scrollSpeed = 0.5;

    // Duplicate content for seamless loop
    if (track.children.length > 0) {
      const clone = track.cloneNode(true);
      track.parentNode.appendChild(clone);
    }

    const animateScroll = () => {
      if (isPaused) return;

      scrollPosition += scrollSpeed;
      const maxScroll = track.scrollWidth / 2;

      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(animateScroll);
    };

    // Pause on hover
    scrollContainer.addEventListener('mouseenter', () => {
      isPaused = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    });

    scrollContainer.addEventListener('mouseleave', () => {
      isPaused = false;
      animationFrameId = requestAnimationFrame(animateScroll);
    });

    // Start animation
    animationFrameId = requestAnimationFrame(animateScroll);

    // Touch/swipe support
    let isDown = false;
    let startX;
    let scrollLeft;

    scrollContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      isPaused = true;
      scrollContainer.style.cursor = 'grabbing';
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    });

    scrollContainer.addEventListener('mouseleave', () => {
      isDown = false;
      scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mouseup', () => {
      isDown = false;
      scrollContainer.style.cursor = 'grab';
      isPaused = false;
      animationFrameId = requestAnimationFrame(animateScroll);
    });

    scrollContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainer.scrollLeft = scrollLeft - walk;
    });
  }

  // ============================================
  // QUICK ADD TO CART
  // ============================================

  function initQuickAdd() {
    const quickAddButtons = document.querySelectorAll('.vc-product-card__quick-add');
    if (quickAddButtons.length === 0) return;

    quickAddButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const productId = button.dataset.productId;
        const variantId = button.dataset.variantId;

        if (!variantId) {
          showToast('Please select an option', 'error');
          return;
        }

        const originalText = button.textContent;
        button.disabled = true;
        button.textContent = 'Adding...';
        button.classList.add('loading');

        try {
          const response = await fetch(window.routes.cart_add_url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
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
            button.textContent = 'Added!';
            button.classList.remove('loading');
            showToast('Added to cart', 'success');
            
            // Update cart count
            updateCartCount();
            
            // Reset button after delay
            setTimeout(() => {
              button.textContent = originalText;
              button.disabled = false;
            }, 2000);
          } else {
            throw new Error(data.message || 'Failed to add to cart');
          }
        } catch (error) {
          console.error('Error adding to cart:', error);
          button.textContent = originalText;
          button.disabled = false;
          button.classList.remove('loading');
          showToast(error.message || 'Error adding to cart', 'error');
        }
      });
    });
  }

  // ============================================
  // PRODUCT PAGE - IMAGE GALLERY
  // ============================================

  function initProductGallery() {
    const thumbnails = document.querySelectorAll('.vc-product-page__thumbnail');
    const mainImage = document.querySelector('.vc-product-page__image img');
    if (!mainImage || thumbnails.length === 0) return;

    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', () => {
        const imageSrc = thumbnail.dataset.imageSrc || thumbnail.querySelector('img')?.src;
        if (imageSrc) {
          mainImage.src = imageSrc;
          mainImage.srcset = '';
          
          // Update active state
          thumbnails.forEach(t => t.classList.remove('active'));
          thumbnail.classList.add('active');
        }
      });
    });

    // Set first thumbnail as active
    if (thumbnails.length > 0) {
      thumbnails[0].classList.add('active');
    }
  }

  // ============================================
  // PRODUCT PAGE - COLLAPSIBLE SECTIONS
  // ============================================

  function initCollapsibleSections() {
    const collapsibles = document.querySelectorAll('.vc-product-page__collapsible, .vc-faq-item');
    
    collapsibles.forEach(item => {
      const header = item.querySelector('.vc-product-page__collapsible-header, .vc-faq-question');
      const content = item.querySelector('.vc-product-page__collapsible-content, .vc-faq-answer');
      
      if (!header || !content) return;

      // Set initial state
      if (item.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0';
      }

      header.addEventListener('click', () => {
        const isActive = item.classList.toggle('active');
        
        if (isActive) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = '0';
        }

        // Update ARIA attributes
        const ariaExpanded = header.getAttribute('aria-expanded');
        header.setAttribute('aria-expanded', ariaExpanded === 'true' ? 'false' : 'true');
      });
    });
  }

  // ============================================
  // PRODUCT PAGE - STICKY MOBILE ATC
  // ============================================

  function initStickyATC() {
    const stickyATC = document.querySelector('.vc-product-page__sticky-atc');
    const addToCartButton = document.querySelector('.vc-product-page__add-to-cart');
    if (!stickyATC || !addToCartButton) return;

    const updateStickyATC = () => {
      const rect = addToCartButton.getBoundingClientRect();
      const isVisible = rect.bottom < window.innerHeight;
      
      if (isVisible) {
        stickyATC.classList.remove('visible');
      } else {
        stickyATC.classList.add('visible');
      }
    };

    window.addEventListener('scroll', throttle(updateStickyATC, 100), { passive: true });
    updateStickyATC();

    // Connect sticky button to main button
    const stickyButton = stickyATC.querySelector('.vc-product-page__sticky-button');
    if (stickyButton) {
      stickyButton.addEventListener('click', () => {
        addToCartButton.click();
      });
    }
  }

  // ============================================
  // QUANTITY STEPPER
  // ============================================

  function initQuantityStepper() {
    const steppers = document.querySelectorAll('.vc-quantity-stepper');
    
    steppers.forEach(stepper => {
      const decreaseBtn = stepper.querySelector('.vc-quantity-btn:first-child');
      const increaseBtn = stepper.querySelector('.vc-quantity-btn:last-child');
      const input = stepper.querySelector('.vc-quantity-input');
      
      if (!decreaseBtn || !increaseBtn || !input) return;

      decreaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(input.value) || 1;
        if (currentValue > 1) {
          input.value = currentValue - 1;
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });

      increaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(input.value) || 1;
        input.value = currentValue + 1;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });
  }

  // ============================================
  // BUTTON RIPPLE EFFECT
  // ============================================

  function initRippleEffect() {
    const buttons = document.querySelectorAll('.vc-hero__cta-primary, .vc-product-page__add-to-cart, .vc-product-card__quick-add');
    
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }

  // ============================================
  // TOAST NOTIFICATIONS
  // ============================================

  function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.vc-toast');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `vc-toast vc-toast--${type}`;
    
    const icon = document.createElement('div');
    icon.className = 'vc-toast__icon';
    icon.textContent = type === 'success' ? '✓' : '×';
    
    const messageEl = document.createElement('div');
    messageEl.className = 'vc-toast__message';
    messageEl.textContent = message;
    
    toast.appendChild(icon);
    toast.appendChild(messageEl);
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('visible'), 10);
    
    // Remove after delay
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  // ============================================
  // UPDATE CART COUNT
  // ============================================

  function updateCartCount() {
    fetch(window.routes.cart_url + '.js')
      .then(response => response.json())
      .then(data => {
        const cartCountElements = document.querySelectorAll('.vc-cart-count');
        const count = data.item_count || 0;
        
        cartCountElements.forEach(el => {
          if (count > 0) {
            el.textContent = count;
            el.style.display = 'flex';
          } else {
            el.style.display = 'none';
          }
        });
      })
      .catch(error => {
        console.error('Error updating cart count:', error);
      });
  }

  // ============================================
  // PRODUCT FORM - VARIANT CHANGE
  // ============================================

  function initProductForm() {
    const variantSelect = document.querySelector('.vc-product-page__select[name="id"]');
    if (!variantSelect) return;

    variantSelect.addEventListener('change', (e) => {
      const variantId = e.target.value;
      
      // Update price if variant data is available
      // This would need variant data from Shopify
      // For now, just update the form
    });
  }

  // ============================================
  // ADD TO CART FORM HANDLER
  // ============================================

  function initAddToCartForm() {
    const forms = document.querySelectorAll('form[action*="/cart/add"]');
    
    forms.forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"], .vc-product-page__add-to-cart');
        if (!submitButton) return;

        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        submitButton.textContent = 'Adding...';

        const formData = new FormData(form);
        
        try {
          const response = await fetch(window.routes.cart_add_url, {
            method: 'POST',
            body: formData
          });

          const data = await response.json();

          if (response.ok) {
            submitButton.textContent = 'Added!';
            showToast('Added to cart', 'success');
            updateCartCount();
            
            // Redirect to cart or reset button
            setTimeout(() => {
              submitButton.textContent = originalText;
              submitButton.disabled = false;
              submitButton.classList.remove('loading');
            }, 2000);
          } else {
            throw new Error(data.message || 'Failed to add to cart');
          }
        } catch (error) {
          console.error('Error adding to cart:', error);
          submitButton.textContent = originalText;
          submitButton.disabled = false;
          submitButton.classList.remove('loading');
          showToast(error.message || 'Error adding to cart', 'error');
        }
      });
    });
  }

  // ============================================
  // INITIALIZE ALL FEATURES
  // ============================================

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    initHeader();
    initScrollReveal();
    initParallax();
    initTrendingCarousel();
    initQuickAdd();
    initProductGallery();
    initCollapsibleSections();
    initStickyATC();
    initQuantityStepper();
    initRippleEffect();
    initProductForm();
    initAddToCartForm();
  }

  init();

  // Re-initialize on Shopify section load
  if (typeof document.addEventListener !== 'undefined') {
    document.addEventListener('shopify:section:load', init);
    document.addEventListener('shopify:section:unload', init);
  }
})();
