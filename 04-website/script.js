// Highlight the section currently in view without changing native navigation.
if ('IntersectionObserver' in window) {
  const links = document.querySelectorAll('.nav-list a');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-15% 0px -70% 0px' });

  document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
}

// A subtle visual acknowledgement; cards remain visible without JavaScript.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element));
}
