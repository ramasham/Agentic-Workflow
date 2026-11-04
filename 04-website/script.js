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
