/**
 * Tindol Landing Page Scripts
 * - Mobile nav toggle
 * - Scroll reveal animations
 * - Nav scroll shadow
 * - Article preview population
 * - Dark mode toggle
 * - Newsletter signup
 * - Reading progress bar
 */

(function () {
    'use strict';

    /* ═══════════════════════════════════════════ */
    /* DARK MODE TOGGLE                           */
    /* ═══════════════════════════════════════════ */
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('tindol-theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.setAttribute('data-theme', 'dark');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = html.getAttribute('data-theme') === 'dark';
            if (isDark) {
                html.removeAttribute('data-theme');
                localStorage.setItem('tindol-theme', 'light');
            } else {
                html.setAttribute('data-theme', 'dark');
                localStorage.setItem('tindol-theme', 'dark');
            }
        });
    }

    /* ═══════════════════════════════════════════ */
    /* NEWSLETTER SIGNUP                          */
    /* ═══════════════════════════════════════════ */
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('emailInput').value;
            // Store locally for demo (replace with actual service)
            const subscribers = JSON.parse(localStorage.getItem('tindol-subscribers') || '[]');
            subscribers.push({ email, date: new Date().toISOString() });
            localStorage.setItem('tindol-subscribers', JSON.stringify(subscribers));
            
            // Show success message
            const btn = newsletterForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Subscribed!';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                newsletterForm.reset();
            }, 2000);
        });
    }

    /* ═══════════════════════════════════════════ */
    /* READING PROGRESS BAR                       */
    /* ═══════════════════════════════════════════ */
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.prepend(progressBar);
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                progressBar.style.width = scrolled + '%';
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    /* ═══════════════════════════════════════════ */
    /* MOBILE NAV TOGGLE                          */
    /* ═══════════════════════════════════════════ */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const spans = navToggle.querySelectorAll('span');
            if (navLinks.classList.contains('open')) {
                spans[0].style.transform = 'translateY(7px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            });
        });
    }

    /* ═══════════════════════════════════════════ */
    /* NAV SCROLL SHADOW                          */
    /* ═══════════════════════════════════════════ */
    const siteNav = document.getElementById('siteNav');
    if (siteNav) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    siteNav.classList.toggle('scrolled', window.scrollY > 10);
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    /* ═══════════════════════════════════════════ */
    /* SCROLL REVEAL                              */
    /* ═══════════════════════════════════════════ */
    const revealEls = document.querySelectorAll('.feature-card, .article-preview-card, .section-header, .philosophy-layout, .cta-block');

    if (revealEls.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
    } else {
        revealEls.forEach(el => el.classList.add('visible'));
    }

    /* ═══════════════════════════════════════════ */
    /* POPULATE ARTICLE PREVIEWS                  */
    /* ═══════════════════════════════════════════ */
    const articles = [
        { tag: 'Security', title: 'How to Securely Store API Keys in Vite + React', desc: 'Professional patterns for handling secrets in modern frontend applications.', url: './blog/articles/secure-api-keys-vite-react.html', read: '8 min' },
        { tag: 'System Admin', title: 'Building a Single-File Python App to Control Internet Access', desc: 'Cross-platform GUI for toggling network access per application.', url: './blog/articles/python-network-isolation.html', read: '12 min' },
        { tag: 'Architecture', title: 'Running PWAs Locally Without a Server', desc: 'Offline-first principles and packaging browser apps for disconnected environments.', url: './blog/articles/offline-first-pwa.html', read: '10 min' },
        { tag: 'App Design', title: 'Designing a Multi-Tab TV/Radio Streaming App', desc: 'Modular architecture with predictive search and favorites.', url: './blog/articles/modular-streaming-workspace.html', read: '14 min' },
        { tag: 'Automation', title: 'Lightweight Python Scripts with Ollama', desc: 'Local AI automation for journaling, code review, and artifact generation.', url: './blog/articles/minimal-python-automation.html', read: '11 min' },
        { tag: 'Cross-Platform', title: 'Managing App Connectivity Across Windows, macOS, and Linux', desc: 'Unified Python abstraction for firewall control on all major OSes.', url: './blog/articles/cross-platform-firewall.html', read: '9 min' }
    ];

    const grid = document.getElementById('articleGrid');
    if (grid) {
        grid.innerHTML = articles.map(a => `
            <a href="${a.url}" class="article-preview-card">
                <span class="preview-tag">${a.tag}</span>
                <h3 class="preview-title">${a.title}</h3>
                <p class="preview-desc">${a.desc}</p>
                <span class="preview-meta">${a.read} read &middot; May 2026</span>
            </a>
        `).join('');
    }

    /* ═══════════════════════════════════════════ */
    /* SMOOTH SCROLL FOR ANCHOR LINKS             */
    /* ═══════════════════════════════════════════ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();
