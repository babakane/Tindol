/**
 * Tindol Blog Shared Scripts
 * - Copy-to-clipboard for code blocks
 * - Sticky nav scroll shadow
 * - Search & category filtering (index page)
 */

(function () {
    'use strict';

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
    /* INIT                                       */
    /* ═══════════════════════════════════════════ */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initCopyButtons();
            initNavScroll();
            initBlogFilters();
        });
    } else {
        initCopyButtons();
        initNavScroll();
        initBlogFilters();
    }
})();
