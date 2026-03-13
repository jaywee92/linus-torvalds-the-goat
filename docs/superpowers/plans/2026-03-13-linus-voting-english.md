# Linus Torvalds Page — Voting System, Photo & English Translation

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a real photo of Linus Torvalds, a localStorage-based upvote system with sort-by-votes, and translate the entire page to humorous English.

**Architecture:** Pure static site (HTML/CSS/JS). A new `votes.js` file handles all voting logic and DOM manipulation. Votes persist in `localStorage`. The quotes section gets a sort toggle. No build step, no dependencies.

**Tech Stack:** Vanilla JS (ES modules), CSS custom properties, localStorage API, GitHub Pages static hosting.

---

## Chunk 1: New JS File + HTML Restructure

### Task 1: Create `votes.js` — voting logic

**Files:**
- Create: `votes.js`

- [ ] **Step 1: Create `votes.js` with the full voting module**

```js
// votes.js — Quote voting system backed by localStorage
// Key: "linus-votes", Value: { [quoteId]: number }

const STORAGE_KEY = 'linus-votes';

export function loadVotes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export function saveVotes(votes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
}

export function upvote(quoteId) {
  const votes = loadVotes();
  votes[quoteId] = (votes[quoteId] || 0) + 1;
  saveVotes(votes);
  return votes[quoteId];
}

export function getCount(quoteId) {
  return loadVotes()[quoteId] || 0;
}

export function getSortedIds(ids) {
  const votes = loadVotes();
  return [...ids].sort((a, b) => (votes[b] || 0) - (votes[a] || 0));
}
```

- [ ] **Step 2: Commit**

```bash
git add votes.js
git commit -m "feat: add localStorage voting module"
```

---

### Task 2: Rewrite `index.html` — full English + photo + voting UI

**Files:**
- Modify: `index.html` (full rewrite)

This is the main task. Replace all German text with English + humor, add the Linus photo in the hero, and wire up the voting system in the quotes section.

**Key structural changes:**
- Hero: add `<div class="hero__photo">` with a `<img>` tag next to the body content. Use Wikimedia Commons photo (CC-BY-SA): `https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg/440px-LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg`
- Each `<article class="quote-card">` gets a `data-id="q01"` attribute (q01–q10) and a vote button + counter
- Sort toggle added above the grid: `<div class="quotes__controls">`
- All German text → English with wit
- `<html lang="de">` → `<html lang="en">`
- Add `<script type="module" src="votes.js">` ... actually we use inline `<script type="module">` at bottom to wire DOM events after the module

- [ ] **Step 1: Replace `index.html` entirely with the new version**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Linus Torvalds — The GOAT of Open Source</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,600;0,700;1,400&family=IBM+Plex+Sans:wght@300;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <!-- SCANLINES OVERLAY -->
  <div class="scanlines" aria-hidden="true"></div>

  <!-- ═══ HERO ═══ -->
  <header class="hero">
    <div class="hero__terminal-bar">
      <span class="dot dot--red"></span>
      <span class="dot dot--yellow"></span>
      <span class="dot dot--green"></span>
      <span class="terminal-title">torvalds@kernel.org — bash — 80×24</span>
    </div>

    <div class="hero__body">
      <p class="hero__prompt"><span class="prompt-sign">$</span> whoami<span class="cursor">▌</span></p>

      <h1 class="hero__name">LINUS<br /><span class="hero__name--accent">TORVALDS</span></h1>

      <div class="hero__tags">
        <span class="tag">LINUX KERNEL</span>
        <span class="tag">GIT</span>
        <span class="tag">OPEN SOURCE</span>
        <span class="tag">PROFESSIONAL COMPLAINER</span>
      </div>

      <p class="hero__born">
        <span class="label">born</span> 28 Dec 1969 — Helsinki, Finland<br />
        <span class="label">kernel v0.01</span> 17 Sep 1991 — "just a hobby, won't be big"
      </p>
    </div>

    <div class="hero__photo">
      <div class="photo-frame">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg/440px-LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg"
          alt="Linus Torvalds at LinuxCon Europe"
          class="photo-img"
          loading="lazy"
        />
        <div class="photo-caption">
          <span class="prompt-sign">$</span> identify linus.jpg<br />
          <span class="photo-caption__data">440×556 · CC-BY-SA · LinuxCon Europe</span>
        </div>
      </div>
    </div>

    <div class="hero__ascii" aria-hidden="true">
<pre>
  ██╗     ██╗███╗   ██╗██╗   ██╗██╗  ██╗
  ██║     ██║████╗  ██║██║   ██║╚██╗██╔╝
  ██║     ██║██╔██╗ ██║██║   ██║ ╚███╔╝
  ██║     ██║██║╚██╗██║██║   ██║ ██╔██╗
  ███████╗██║██║ ╚████║╚██████╔╝██╔╝ ██╗
  ╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝
</pre>
    </div>
  </header>

  <!-- ═══ BIO ═══ -->
  <section class="bio">
    <div class="section-label">
      <span class="prompt-sign">$</span> cat bio.txt
    </div>
    <div class="bio__grid">
      <div class="bio__block bio__block--highlight">
        <p>Linus Benedict Torvalds is a Finnish-American software engineer and the most influential grumpy person in computing history. In 1991 he started the Linux kernel as a hobby project — it now runs on over <strong>97% of all supercomputers</strong>, the entire Android ecosystem, every cloud data center, and billions of devices worldwide. His hobby got slightly out of hand.</p>
      </div>
      <div class="bio__block">
        <p>In 2005 he rewrote the world's version control system in <strong>two weeks</strong> because he was dissatisfied with the existing tools. He named it Git, which is British slang for an unpleasant person. He has stated this was intentional.</p>
      </div>
      <div class="bio__block">
        <p>He is famous for his zero-tolerance policy on bad code, his legendary rants on the Linux Kernel Mailing List, and the firm belief that good code speaks for itself. <em>"Talk is cheap. Show me the code."</em></p>
      </div>
    </div>
  </section>

  <!-- ═══ QUOTES ═══ -->
  <section class="quotes">
    <div class="section-label">
      <span class="prompt-sign">$</span> grep -i "torvalds" quotes.db <span id="sort-label" class="comment"># sorted by: chronological</span>
    </div>

    <div class="quotes__controls">
      <button class="sort-btn" id="sort-btn" aria-pressed="false">
        <span class="prompt-sign">$</span> sort --by=<span id="sort-mode-label">votes</span>
      </button>
      <span class="sort-hint">click to rank by community upvotes</span>
    </div>

    <div class="quotes__grid" id="quotes-grid">

      <article class="quote-card quote-card--large" data-id="q01">
        <div class="quote-card__index">01</div>
        <div class="quote-card__savagery" title="Savagery Rating">🌶️🌶️</div>
        <blockquote>
          <p class="quote-text">"Talk is cheap. Show me the code."</p>
        </blockquote>
        <div class="quote-card__meta">lkml.org · 2000</div>
        <div class="quote-card__vote">
          <button class="vote-btn" data-id="q01" aria-label="Upvote">
            <span class="vote-btn__arrow">▲</span>
            <span class="vote-btn__label">UPVOTE</span>
          </button>
          <span class="vote-count" data-id="q01">0</span>
          <span class="vote-unit">pts</span>
        </div>
      </article>

      <article class="quote-card" data-id="q02">
        <div class="quote-card__index">02</div>
        <div class="quote-card__savagery" title="Savagery Rating">🌶️🌶️🌶️</div>
        <blockquote>
          <p class="quote-text">"Software is like sex: it's better when it's free."</p>
        </blockquote>
        <div class="quote-card__meta">linus torvalds</div>
        <div class="quote-card__vote">
          <button class="vote-btn" data-id="q02" aria-label="Upvote">
            <span class="vote-btn__arrow">▲</span>
            <span class="vote-btn__label">UPVOTE</span>
          </button>
          <span class="vote-count" data-id="q02">0</span>
          <span class="vote-unit">pts</span>
        </div>
      </article>

      <article class="quote-card" data-id="q03">
        <div class="quote-card__index">03</div>
        <div class="quote-card__savagery" title="Savagery Rating">🌶️</div>
        <blockquote>
          <p class="quote-text">"Intelligence is the ability to avoid doing work, yet getting the work done."</p>
        </blockquote>
        <div class="quote-card__meta">linus torvalds</div>
        <div class="quote-card__vote">
          <button class="vote-btn" data-id="q03" aria-label="Upvote">
            <span class="vote-btn__arrow">▲</span>
            <span class="vote-btn__label">UPVOTE</span>
          </button>
          <span class="vote-count" data-id="q03">0</span>
          <span class="vote-unit">pts</span>
        </div>
      </article>

      <article class="quote-card quote-card--accent" data-id="q04">
        <div class="quote-card__index">04</div>
        <div class="quote-card__savagery" title="Savagery Rating">🌶️🌶️🌶️</div>
        <blockquote>
          <p class="quote-text">"If Microsoft ever does applications for Linux it means I've won."</p>
        </blockquote>
        <div class="quote-card__meta">linus torvalds · 1998 · aged like fine wine</div>
        <div class="quote-card__vote">
          <button class="vote-btn" data-id="q04" aria-label="Upvote">
            <span class="vote-btn__arrow">▲</span>
            <span class="vote-btn__label">UPVOTE</span>
          </button>
          <span class="vote-count" data-id="q04">0</span>
          <span class="vote-unit">pts</span>
        </div>
      </article>

      <article class="quote-card quote-card--wide" data-id="q05">
        <div class="quote-card__index">05</div>
        <div class="quote-card__savagery" title="Savagery Rating">🌶️🌶️</div>
        <blockquote>
          <p class="quote-text">"Bad programmers worry about the code.<br />Good programmers worry about data structures and their relationships."</p>
        </blockquote>
        <div class="quote-card__meta">linus torvalds · every code review ever</div>
        <div class="quote-card__vote">
          <button class="vote-btn" data-id="q05" aria-label="Upvote">
            <span class="vote-btn__arrow">▲</span>
            <span class="vote-btn__label">UPVOTE</span>
          </button>
          <span class="vote-count" data-id="q05">0</span>
          <span class="vote-unit">pts</span>
        </div>
      </article>

      <article class="quote-card" data-id="q06">
        <div class="quote-card__index">06</div>
        <div class="quote-card__savagery" title="Savagery Rating">🌶️🌶️🌶️</div>
        <blockquote>
          <p class="quote-text">"An infinite number of monkeys typing into GNU emacs would never make a good program."</p>
        </blockquote>
        <div class="quote-card__meta">linux newsgroups · emacs users still coping</div>
        <div class="quote-card__vote">
          <button class="vote-btn" data-id="q06" aria-label="Upvote">
            <span class="vote-btn__arrow">▲</span>
            <span class="vote-btn__label">UPVOTE</span>
          </button>
          <span class="vote-count" data-id="q06">0</span>
          <span class="vote-unit">pts</span>
        </div>
      </article>

      <article class="quote-card" data-id="q07">
        <div class="quote-card__index">07</div>
        <div class="quote-card__savagery" title="Savagery Rating">🌶️🌶️</div>
        <blockquote>
          <p class="quote-text">"Linux is evolution, not intelligent design."</p>
        </blockquote>
        <div class="quote-card__meta">linus torvalds · darwin would approve</div>
        <div class="quote-card__vote">
          <button class="vote-btn" data-id="q07" aria-label="Upvote">
            <span class="vote-btn__arrow">▲</span>
            <span class="vote-btn__label">UPVOTE</span>
          </button>
          <span class="vote-count" data-id="q07">0</span>
          <span class="vote-unit">pts</span>
        </div>
      </article>

      <article class="quote-card quote-card--dark" data-id="q08">
        <div class="quote-card__index">08</div>
        <div class="quote-card__savagery" title="Savagery Rating">🌶️</div>
        <blockquote>
          <p class="quote-text">"Most good programmers do programming not because they expect to get paid, but because it is fun to program."</p>
        </blockquote>
        <div class="quote-card__meta">linus torvalds · your boss disagrees</div>
        <div class="quote-card__vote">
          <button class="vote-btn" data-id="q08" aria-label="Upvote">
            <span class="vote-btn__arrow">▲</span>
            <span class="vote-btn__label">UPVOTE</span>
          </button>
          <span class="vote-count" data-id="q08">0</span>
          <span class="vote-unit">pts</span>
        </div>
      </article>

      <article class="quote-card quote-card--wide" data-id="q09">
        <div class="quote-card__index">09</div>
        <div class="quote-card__savagery" title="Savagery Rating">🌶️</div>
        <blockquote>
          <p class="quote-text">"I am not a visionary. I'm an engineer. I want to fix the pothole that is right in front of me before I fall in."</p>
        </blockquote>
        <div class="quote-card__meta">linus torvalds · ted talk · 2016 · 30 years of potholes fixed</div>
        <div class="quote-card__vote">
          <button class="vote-btn" data-id="q09" aria-label="Upvote">
            <span class="vote-btn__arrow">▲</span>
            <span class="vote-btn__label">UPVOTE</span>
          </button>
          <span class="vote-count" data-id="q09">0</span>
          <span class="vote-unit">pts</span>
        </div>
      </article>

      <article class="quote-card" data-id="q10">
        <div class="quote-card__index">10</div>
        <div class="quote-card__savagery" title="Savagery Rating">🌶️🌶️🌶️</div>
        <blockquote>
          <p class="quote-text">"Nobody actually creates perfect code the first time around, except me."</p>
        </blockquote>
        <div class="quote-card__meta">linus torvalds · no, seriously</div>
        <div class="quote-card__vote">
          <button class="vote-btn" data-id="q10" aria-label="Upvote">
            <span class="vote-btn__arrow">▲</span>
            <span class="vote-btn__label">UPVOTE</span>
          </button>
          <span class="vote-count" data-id="q10">0</span>
          <span class="vote-unit">pts</span>
        </div>
      </article>

    </div>
  </section>

  <!-- ═══ STATS ═══ -->
  <section class="stats">
    <div class="section-label">
      <span class="prompt-sign">$</span> uname -a <span class="comment"># fun facts, kernel edition</span>
    </div>
    <div class="stats__grid">
      <div class="stat">
        <span class="stat__num">35+</span>
        <span class="stat__label">Years of Linux</span>
      </div>
      <div class="stat">
        <span class="stat__num">30M+</span>
        <span class="stat__label">Lines of Kernel Code</span>
      </div>
      <div class="stat">
        <span class="stat__num">97%</span>
        <span class="stat__label">of all Supercomputers</span>
      </div>
      <div class="stat">
        <span class="stat__num">1</span>
        <span class="stat__label">Finn who changed everything</span>
      </div>
    </div>
  </section>

  <!-- ═══ FOOTER ═══ -->
  <footer class="footer">
    <p class="footer__cmd"><span class="prompt-sign">$</span> echo "Just for fun." <span class="comment"># — Linus Torvalds, autobiography, 2001</span></p>
    <p class="footer__copy">© 2026 — A tribute to the man who keeps the internet running. Votes stored locally. No servers were harmed.</p>
  </footer>

  <script type="module">
    import { upvote, getCount, getSortedIds } from './votes.js';

    const grid = document.getElementById('quotes-grid');
    const sortBtn = document.getElementById('sort-btn');
    const sortModeLabel = document.getElementById('sort-mode-label');
    const sortLabel = document.getElementById('sort-label');
    let sortedByVotes = false;

    // Initialise all vote counts on page load
    function refreshCounts() {
      document.querySelectorAll('.vote-count').forEach(el => {
        el.textContent = getCount(el.dataset.id);
      });
    }

    // Re-order cards in the DOM by vote count (preserves grid classes)
    function sortByVotes() {
      const cards = [...grid.querySelectorAll('.quote-card')];
      const ids = cards.map(c => c.dataset.id);
      const sorted = getSortedIds(ids);
      sorted.forEach(id => {
        const card = grid.querySelector(`[data-id="${id}"]`);
        grid.appendChild(card);
      });
    }

    // Reset to original order (by data-id alphabetically = q01..q10)
    function sortByDefault() {
      const cards = [...grid.querySelectorAll('.quote-card')];
      cards.sort((a, b) => a.dataset.id.localeCompare(b.dataset.id));
      cards.forEach(c => grid.appendChild(c));
    }

    // Vote button handler
    grid.addEventListener('click', e => {
      const btn = e.target.closest('.vote-btn');
      if (!btn) return;
      const id = btn.dataset.id;
      const newCount = upvote(id);
      grid.querySelector(`.vote-count[data-id="${id}"]`).textContent = newCount;
      btn.classList.add('vote-btn--voted');
      btn.disabled = true;
      if (sortedByVotes) sortByVotes();
    });

    // Sort toggle
    sortBtn.addEventListener('click', () => {
      sortedByVotes = !sortedByVotes;
      sortBtn.setAttribute('aria-pressed', sortedByVotes);
      if (sortedByVotes) {
        sortModeLabel.textContent = 'votes';
        sortLabel.textContent = '# sorted by: votes ↓';
        sortByVotes();
      } else {
        sortModeLabel.textContent = 'votes';
        sortLabel.textContent = '# sorted by: chronological';
        sortByDefault();
      }
    });

    refreshCounts();
  </script>

</body>
</html>
```

- [ ] **Step 2: Verify the file is saved correctly and opens in a browser (visual check)**

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: translate to English, add Linus photo, add voting UI"
```

---

## Chunk 2: CSS Updates

### Task 3: Add CSS for photo, vote buttons, sort toggle, savagery badges

**Files:**
- Modify: `style.css`

- [ ] **Step 1: Add the following CSS blocks to `style.css` (append after the existing SCROLLBAR/SELECTION section)**

```css
/* ══════════════════════════════════════════════════
   HERO PHOTO
══════════════════════════════════════════════════ */
.hero__body {
  /* existing styles — no change needed unless layout breaks */
}

/* Make hero layout two-column when photo is present */
@media (min-width: 760px) {
  .hero {
    grid-template-rows: auto 1fr auto;
  }
  .hero__body {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    column-gap: clamp(2rem, 5vw, 5rem);
  }
  .hero__body > *:not(.hero__photo) {
    /* text content stays in left column */
  }
}

.hero__photo {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0 clamp(1.5rem, 5vw, 6rem) 2rem;
  animation: fadeIn 0.8s ease 0.5s both;
}

.photo-frame {
  border: 1px solid var(--amber-dim);
  padding: 0;
  background: var(--black-3);
  max-width: 220px;
  width: 100%;
  position: relative;
  box-shadow: 4px 4px 0 var(--amber-dim), 0 0 40px rgba(255,140,0,0.08);
}

.photo-frame::before {
  content: 'IMG_1991.jpg';
  display: block;
  background: var(--black-4);
  color: var(--amber-dim);
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  padding: 0.4rem 0.75rem;
  border-bottom: 1px solid var(--border);
}

.photo-img {
  display: block;
  width: 100%;
  height: auto;
  filter: grayscale(30%) sepia(20%) contrast(1.05);
  transition: filter 0.3s;
}

.photo-img:hover {
  filter: grayscale(0%) sepia(0%) contrast(1.1);
}

.photo-caption {
  font-size: 0.58rem;
  color: var(--white-dim);
  padding: 0.5rem 0.75rem;
  line-height: 1.6;
  border-top: 1px solid var(--border);
}

.photo-caption__data {
  color: var(--amber-dim);
  display: block;
  opacity: 0.7;
}

@media (max-width: 759px) {
  .hero__photo {
    justify-content: center;
    padding: 1.5rem clamp(1.5rem, 5vw, 6rem);
    border-top: 1px solid var(--border);
  }
  .photo-frame {
    max-width: 180px;
  }
}

/* ══════════════════════════════════════════════════
   QUOTE VOTING
══════════════════════════════════════════════════ */
.quote-card__savagery {
  font-size: 0.65rem;
  letter-spacing: 0.05em;
  line-height: 1;
  margin-top: -0.25rem;
}

.quote-card__vote {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
}

.vote-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: 1px solid var(--amber-dim);
  color: var(--amber-dim);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  padding: 0.3rem 0.65rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.1s;
  text-transform: uppercase;
}

.vote-btn:hover:not(:disabled) {
  background: var(--amber);
  border-color: var(--amber);
  color: var(--black);
  transform: translateY(-1px);
}

.vote-btn:active:not(:disabled) {
  transform: translateY(0);
}

.vote-btn--voted,
.vote-btn:disabled {
  border-color: var(--border);
  color: var(--white-dim);
  cursor: not-allowed;
  opacity: 0.5;
}

.vote-btn__arrow {
  font-size: 0.7rem;
}

.vote-count {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--amber);
  min-width: 1.5ch;
  text-align: right;
  transition: color 0.2s;
}

.vote-unit {
  font-size: 0.55rem;
  color: var(--white-dim);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* ══════════════════════════════════════════════════
   SORT CONTROLS
══════════════════════════════════════════════════ */
.quotes__controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
}

.sort-btn {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--white-dim);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  padding: 0.4rem 1rem;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.sort-btn:hover,
.sort-btn[aria-pressed="true"] {
  background: var(--black-3);
  border-color: var(--amber-dim);
  color: var(--amber);
}

.sort-hint {
  font-size: 0.6rem;
  color: var(--white-dim);
  opacity: 0.5;
  letter-spacing: 0.1em;
  text-transform: lowercase;
}

/* Quote card transition for sort animation */
.quote-card {
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, order 0.3s ease;
}
```

- [ ] **Step 2: Open in browser and check:**
  - Photo renders in hero section with amber frame
  - Vote buttons appear on each quote card
  - Savagery rating (🌶️) badges visible
  - Sort toggle button visible above grid
  - All text is in English

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "feat: add CSS for photo frame, vote buttons, sort toggle, savagery badges"
```

---

## Chunk 3: Final polish & verification

### Task 4: Verify everything works end-to-end

- [ ] **Step 1: Open `index.html` in browser (or push to GitHub Pages)**

- [ ] **Step 2: Verify voting**
  - Click upvote on a quote — count increments
  - Button becomes disabled after voting
  - Reload page — votes persist (localStorage)

- [ ] **Step 3: Verify sort**
  - Upvote several quotes different amounts
  - Click sort toggle — cards reorder by vote count descending
  - Toggle again — cards return to q01..q10 order

- [ ] **Step 4: Verify photo**
  - Photo loads in hero
  - Hover removes color filter
  - Mobile (< 760px): photo moves below hero text

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: final verification pass — voting, photo, english translation"
git push origin main
```
