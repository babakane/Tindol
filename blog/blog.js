/**
 * Tindol Blog Shared Scripts
 * - Copy-to-clipboard for code blocks
 * - Sticky nav scroll shadow
 * - Search & category filtering (index page)
 * - Dark mode toggle
 * - Reading progress bar
 * - Table of contents
 * - Anchor links for headings
 * - Related articles
 */

(function () {
    'use strict';

    /* ═══════════════════════════════════════════ */
    /* DARK MODE TOGGLE                           */
    /* ═══════════════════════════════════════════ */
    function initDarkMode() {
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;
        
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
    }

    /* ═══════════════════════════════════════════ */
    /* READING PROGRESS BAR                       */
    /* ═══════════════════════════════════════════ */
    function initReadingProgress() {
        const progressBar = document.querySelector('.reading-progress');
        if (!progressBar) return;
        
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
    }

    /* ═══════════════════════════════════════════ */
    /* TABLE OF CONTENTS                          */
    /* ═══════════════════════════════════════════ */
    function initTableOfContents() {
        const tocContainer = document.getElementById('toc');
        const content = document.querySelector('.article-content');
        if (!tocContainer || !content) return;
        
        const headings = content.querySelectorAll('h2, h3');
        if (headings.length === 0) return;
        
        const tocList = document.createElement('ul');
        headings.forEach((heading, index) => {
            const id = heading.id || `section-${index}`;
            heading.id = id;
            
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${id}`;
            a.textContent = heading.textContent;
            a.dataset.target = id;
            
            if (heading.tagName === 'H3') {
                li.style.paddingLeft = '12px';
            }
            
            li.appendChild(a);
            tocList.appendChild(li);
        });
        
        tocContainer.innerHTML = '<h4>Contents</h4>';
        tocContainer.appendChild(tocList);
        
        // Highlight active section
        const tocLinks = tocContainer.querySelectorAll('a');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tocLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = tocContainer.querySelector(`a[data-target="${entry.target.id}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        }, { rootMargin: '-20% 0% -80% 0%' });
        
        headings.forEach(heading => observer.observe(heading));
    }

    /* ═══════════════════════════════════════════ */
    /* ANCHOR LINKS FOR HEADINGS                  */
    /* ═══════════════════════════════════════════ */
    function initAnchorLinks() {
        const content = document.querySelector('.article-content');
        if (!content) return;
        
        const headings = content.querySelectorAll('h2, h3');
        headings.forEach(heading => {
            if (!heading.id) return;
            
            const anchor = document.createElement('a');
            anchor.href = `#${heading.id}`;
            anchor.className = 'heading-anchor';
            anchor.innerHTML = '#';
            anchor.title = 'Copy link to this section';
            
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                navigator.clipboard.writeText(window.location.href.split('#')[0] + '#' + heading.id);
                anchor.textContent = 'copied!';
                setTimeout(() => anchor.textContent = '#', 1500);
            });
            
            heading.appendChild(anchor);
        });
    }

    /* ═══════════════════════════════════════════ */
    /* COPY TO CLIPBOARD FOR CODE BLOCKS          */
    /* ═══════════════════════════════════════════ */
    function initCopyButtons() {
        const blocks = document.querySelectorAll('.code-block');

        blocks.forEach(block => {
            const btn = document.createElement('button');
            btn.className = 'copy-btn';
            btn.setAttribute('aria-label', 'Copy code to clipboard');
            btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';

            btn.addEventListener('click', async () => {
                const code = block.querySelector('pre')?.textContent || '';
                try {
                    await navigator.clipboard.writeText(code);
                    btn.classList.add('copied');
                    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                    setTimeout(() => {
                        btn.classList.remove('copied');
                        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
                    }, 2000);
                } catch (err) {
                    console.warn('Clipboard copy failed:', err);
                }
            });

            block.appendChild(btn);
        });
    }

    /* ═══════════════════════════════════════════ */
    /* STICKY NAV SCROLL SHADOW                   */
    /* ═══════════════════════════════════════════ */
    function initNavScroll() {
        const nav = document.querySelector('.blog-nav');
        if (!nav) return;

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    nav.classList.toggle('scrolled', window.scrollY > 10);
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    /* ═══════════════════════════════════════════ */
    /* BLOG INDEX: SEARCH & CATEGORY FILTERS      */
    /* ═══════════════════════════════════════════ */
    function initBlogFilters() {
        const searchInput = document.getElementById('blog-search');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const cards = document.querySelectorAll('.article-card');
        const countLabel = document.getElementById('article-count');
        if (!cards.length) return;

        let activeCategory = 'all';

        function updateCount(visible) {
            if (countLabel) {
                countLabel.textContent = `${visible} article${visible !== 1 ? 's' : ''}`;
            }
        }

        function filterCards() {
            const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
            let visible = 0;

            cards.forEach(card => {
                const tag = card.querySelector('.article-card-tag')?.textContent.trim() || '';
                const title = card.querySelector('h2')?.textContent.toLowerCase() || '';
                const desc = card.querySelector('p')?.textContent.toLowerCase() || '';

                const matchesCategory = activeCategory === 'all' || tag === activeCategory;
                const matchesSearch = !query || title.includes(query) || desc.includes(query);

                const show = matchesCategory && matchesSearch;
                card.style.display = show ? '' : 'none';
                if (show) visible++;
            });

            updateCount(visible);
        }

        if (searchInput) {
            searchInput.addEventListener('input', filterCards);
        }

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeCategory = btn.dataset.category;
                filterCards();
            });
        });
    }

    /* ═══════════════════════════════════════════ */
    /* TIP JAR / BUY ME A COFFEE WIDGET           */
    /* ═══════════════════════════════════════════ */
    function initTipJar() {
        const content = document.querySelector('.article-content');
        if (!content) return;

        const tipJarHTML = `
            <div class="tip-jar-widget" style="margin-top: 60px; padding: 30px; background: var(--bg-alt); border-radius: 12px; text-align: center; border: 1px solid var(--border-light);">
                <h3 style="margin-bottom: 12px; font-size: 20px;">Found this useful?</h3>
                <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 15px;">We publish our research and architectures for free. If this saved you time, consider supporting our work.</p>
                <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                    <a href="https://buy.stripe.com/test_TIP_5" target="_blank" class="btn btn-ghost" style="border-color: #10b981; color: #10b981;">☕ Tip $5</a>
                    <a href="https://buy.stripe.com/test_TIP_15" target="_blank" class="btn btn-ghost" style="border-color: #3b82f6; color: #3b82f6;">🚀 Tip $15</a>
                    <a href="../../membership.html" class="btn btn-primary">Join Research Club</a>
                </div>
            </div>
        `;

        // Insert before the article-footer-note if it exists, otherwise at the end of content
        const footerNote = content.querySelector('.article-footer-note');
        if (footerNote) {
            footerNote.insertAdjacentHTML('beforebegin', tipJarHTML);
        } else {
            content.insertAdjacentHTML('beforeend', tipJarHTML);
        }
    }

    /* ═══════════════════════════════════════════ */
    /* INIT                                       */
    /* ═══════════════════════════════════════════ */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initDarkMode();
            initReadingProgress();
            initTableOfContents();
            initAnchorLinks();
            initCopyButtons();
            initNavScroll();
            initBlogFilters();
            initTipJar();
        });
    } else {
        initDarkMode();
        initReadingProgress();
        initTableOfContents();
        initAnchorLinks();
        initCopyButtons();
        initNavScroll();
        initBlogFilters();
        initTipJar();
    }
})();
