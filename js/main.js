// ========================================
// Jinghao Personal Homepage - Main Script
// ========================================

(function () {
  'use strict';

  // --- Typewriter Effect ---
  const typewriterEl = document.getElementById('typewriter');
  const phrases = [
    'Cloud Computing',
    'GPU Scheduling',
    'LLM Systems',
    'PhD @ BUAA'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typewrite() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500; // Pause before next phrase
    }

    setTimeout(typewrite, typeSpeed);
  }

  // Start typewriter after page load animation
  setTimeout(typewrite, 1500);

  // --- Navigation Scroll Effect ---
  const nav = document.getElementById('nav');

  function handleNavScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // --- Mobile Hamburger Menu ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // --- Scroll Reveal with IntersectionObserver ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // --- Skill Cards Stagger Animation ---
  const skillCards = document.querySelectorAll('.skill-card');

  const skillObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.skill-card');
          cards.forEach(function (card, index) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(function () {
              card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 80);
          });
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  const skillsGrid = document.querySelector('.skills__grid');
  if (skillsGrid) {
    skillObserver.observe(skillsGrid);
  }

  // --- Project Card 3D Tilt Effect ---
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform =
        'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
