// Small on purpose: menu, active link, progress bar, back-to-top, reveal on scroll.
(function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mobile menu
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.getElementById('site-nav');
    if (menuBtn && nav) {
        const setOpen = (open) => {
            nav.classList.toggle('active', open);
            menuBtn.setAttribute('aria-expanded', String(open));
            menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
            menuBtn.querySelector('i').className = open ? 'fas fa-xmark' : 'fas fa-bars';
        };
        menuBtn.addEventListener('click', () => setOpen(!nav.classList.contains('active')));
        nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    }

    // Highlight the nav link of the section on screen (home page only)
    const links = [...document.querySelectorAll('nav a[href^="#"]')];
    const targets = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    if (targets.length && 'IntersectionObserver' in window) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                links.forEach((a) => {
                    const on = a.getAttribute('href') === '#' + entry.target.id;
                    a.classList.toggle('active', on && !a.classList.contains('nav-cta'));
                    if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        targets.forEach((t) => spy.observe(t));
    }

    // Scroll progress + back to top
    const bar = document.querySelector('.scroll-progress');
    const topBtn = document.querySelector('.back-to-top-btn');
    let ticking = false;
    const onScroll = () => {
        ticking = false;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (bar) bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
        if (topBtn) topBtn.classList.toggle('show', window.scrollY > 600);
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();
    if (topBtn) topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

    // Reveal on scroll. Case-study pages add content late, so they call window.observeReveal() again.
    const io = ('IntersectionObserver' in window && !reduceMotion)
        ? new IntersectionObserver((entries) => {
            entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('reveal-visible'); io.unobserve(e.target); } });
        }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' })
        : null;
    window.observeReveal = () => {
        document.querySelectorAll('.reveal:not(.reveal-visible)').forEach((el) => {
            if (io) io.observe(el); else el.classList.add('reveal-visible');
        });
    };
    window.observeReveal();
})();
