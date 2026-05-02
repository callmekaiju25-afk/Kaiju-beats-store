const database = [
    { id: 1, title: "BERGHAIN", genre: "hood-trap", cover: "assets/IMAGE/Rosalia.jpg", audio: "assets/MP3/Berghain.mp3" },
    { id: 2, title: "MIRAGE", genre: "trap", cover: "assets/IMAGE/MIRAGE.jpg", audio: "assets/MP3/MIRAGE.mp3" },
    { id: 3, title: "Distancia", genre: "afro", cover: "assets/IMAGE/Distancia.png", audio: "assets/MP3/Distancia.mp3" },
    { id: 4, title: "Sunset", genre: "afro", cover: "assets/IMAGE/Sun-Set.png", audio: "assets/MP3/Sun-Set.mp3" },
    { id: 5, title: "BAD", genre: "afro", cover: "assets/IMAGE/BAD.png", audio: "assets/MP3/Bad.mp3" },
    { id: 6, title: "Elevation", genre: "trap", cover: "assets/IMAGE/Elevation.png", audio: "assets/MP3/Elevation.mp3" },
    { id: 7, title: "Sabah", genre: "Oriental", cover: "assets/IMAGE/Sabah.png", audio: "assets/MP3/Laïle.mp3" },
    { id: 8, title: "CARNAGE", genre: "hood-trap", cover: "assets/IMAGE/CARNAGE.png", audio: "assets/MP3/Carnage.mp3" },
    { id: 9, title: "EMPIRE", genre: "trap", cover: "assets/IMAGE/EMPIRE.png", audio: "assets/MP3/EMPIRE.mp3" },
    { id: 10, title: "Renaissance", genre: "Boom bap", cover: "assets/IMAGE/Renaissance.png", audio: "assets/MP3/Renaissance.mp3" },
    { id: 11, title: "MEMORIES", genre: "Drill", cover: "assets/IMAGE/MEMORIES.png", audio: "assets/MP3/MEMORIES.mp3" },
    { id: 12, title: "SHAKE", genre: "Amapiano", cover: "assets/IMAGE/SHAKE.png", audio: "assets/MP3/SHAKE.mp3" },
    { id: 13, title: "ECLIPSE", genre: "Drill", cover: "assets/IMAGE/ECLIPSE.png", audio: "assets/MP3/ECLIPSE.mp3" },
    { id: 14, title: "Solitude", genre: "Acoustic", cover: "assets/IMAGE/Solitude.png", audio: "assets/MP3/Solitude.mp3" },
    { id: 16, title: "Aurore", genre: "Acoustic", cover: "assets/IMAGE/Aurore.png", audio: "assets/MP3/Aurore.mp3" },
    { id: 17, title: "SOLUNA", genre: "trap", cover: "assets/IMAGE/SOLUNA.jpg", audio: "assets/MP3/SOLUNA.mp3" },
    { id: 18, title: "Ombre", genre: "Drill", cover: "assets/IMAGE/Ombre.png", audio: "assets/MP3/Ombre.mp3" },
    { id: 19, title: "LARME", genre: "Acoustic", cover: "assets/IMAGE/LARME.png", audio: "assets/MP3/LARME.mp3" },
    { id: 20, title: "TRUTH", genre: "afro", cover: "assets/IMAGE/TRUTH.png", audio: "assets/MP3/TRUTH.mp3" },
    { id: 21, title: "Illusion", genre: "afro", cover: "assets/IMAGE/Illusion.png", audio: "assets/MP3/Illusion.mp3" },
    { id: 22, title: "ZURA", genre: "afro", cover: "assets/IMAGE/ZURA.png", audio: "assets/MP3/Zura.mp3" },
    { id: 23, title: "ANUBIS", genre: "trap", cover: "assets/IMAGE/Anubis.png", audio: "assets/MP3/Anubis.mp3" },
    { id: 24, title: "Brooklyn 1964", genre: "trap", cover: "assets/IMAGE/BROOKLYN_1964.png", audio: "assets/MP3/BROOKLYN_1964.mp3" },
    { id: 25, title: "I KNOW", genre: "afro", cover: "assets/IMAGE/I_KNOW.png", audio: "assets/MP3/I_Know.mp3" },
    { id: 26, title: "SMOKE", genre: "trap", cover: "assets/IMAGE/SMOKE.png", audio: "assets/MP3/SMOKE.mp3" },
    { id: 27, title: "NIGHT", genre: "afro", cover: "assets/IMAGE/NIGHT.png", audio: "assets/MP3/NIGHT.mp3" },
    { id: 28, title: "Heaven", genre: "afro", cover: "assets/IMAGE/Heaven.png", audio: "assets/MP3/Heaven.mp3" },
    { id: 29, title: "RANSOM", genre: "Drill", cover: "assets/IMAGE/Ransom.png", audio: "assets/MP3/Ransom.mp3" },
    { id: 30, title: "Vulture", genre: "trap", cover: "assets/IMAGE/VULTURE.png", audio: "assets/MP3/vautour.mp3" },
    
];

// ==================== LANGUE ====================
const translations = {
    fr: {
        search: "Rechercher un beat...",
        allStyles: "TOUS LES STYLES",
        addToCart: "39.99€ - AJOUTER AU PANIER",
        cartTitle: "VOTRE PANIER",
        cartSub: "Beats sélectionnés",
        cartEmpty: "Votre panier est vide.",
        promo: "OFFRE 2+1 APPLIQUÉE ✅",
        checkout: "PASSER LA COMMANDE",
        contactSub: "Contactez-moi pour vos projets",
        promoBar: "2 BEATS ACHETÉS = LE 3ÈME OFFERT (AUTO-APPLIQUÉ)",
        prodBy: "PROD BY KAIJU",
        beatsSelected: "Beats sélectionnés",
        socialsSub: "Retrouve-moi sur les réseaux",
    },
    en: {
        search: "Search a beat...",
        allStyles: "ALL STYLES",
        addToCart: "39.99€ - ADD TO CART",
        cartTitle: "YOUR CART",
        cartSub: "Selected beats",
        cartEmpty: "Your cart is empty.",
        promo: "2+1 DEAL APPLIED ✅",
        checkout: "PLACE ORDER",
        contactSub: "Contact me for your projects",
        promoBar: "BUY 2 BEATS = GET THE 3RD FREE (AUTO-APPLIED)",
        prodBy: "PROD BY KAIJU",
        beatsSelected: "Selected beats",
        socialsSub: "Find me on social media",
    }
};

let currentLang = 'fr';

const readmeContent = {
    fr: `
        <div class="readme-warn">⚠️</div>
        <h2>ATTENTION – CONDITIONS D'UTILISATION </h2>
        <div class="readme-block">
            <p>L'utilisation <strong>gratuite</strong> de cette prod est autorisée uniquement sur <span class="highlight">YouTube</span>, y compris pour les vidéos monétisées, à condition de créditer correctement le producteur.</p>
        </div>
        <div class="readme-block">
            <p>Toute <strong>utilisation commerciale</strong>, incluant la distribution sur des plateformes de streaming telles que <span class="highlight">Spotify, Apple Music</span> ou autres, nécessite l'achat d'une <strong>licence</strong>.</p>
        </div>
        <div class="readme-block">
            <p>Il est <strong>strictement interdit</strong> d'enregistrer un morceau utilisant cette prod auprès d'organismes de gestion de droits <span class="highlight">(BMI, ASCAP, OMPI, etc.)</span> ou d'activer un système de <strong>Content ID</strong> sans avoir acquis une licence exclusive.</p>
        </div>
        <div class="readme-divider"></div>
        <div class="readme-important">
            <p><strong>Important :</strong><br>En cas d'utilisation gratuite, vous devez obligatoirement mentionner <span class="highlight">"prod. Kaiju"</span> et inclure le lien du beat dans la description.</p>
        </div>
    `,
    en: `
        <div class="readme-warn">⚠️</div>
        <h2>WARNING – USAGE TERMS </h2>
        <div class="readme-block">
            <p><strong>Free use</strong> of this beat is permitted on <span class="highlight">YouTube</span> only, including monetized videos, provided proper credit is given to the producer.</p>
        </div>
        <div class="readme-block">
            <p>Any <strong>commercial use</strong>, including distribution on streaming platforms such as <span class="highlight">Spotify, Apple Music</span>, or others, requires the purchase of a <strong>license</strong>.</p>
        </div>
        <div class="readme-block">
            <p>It is <strong>strictly prohibited</strong> to register any song using this beat with performing rights organizations <span class="highlight">(BMI, ASCAP, WIPO, etc.)</span> or to apply <strong>Content ID</strong> without obtaining an exclusive license.</p>
        </div>
        <div class="readme-divider"></div>
        <div class="readme-important">
            <p><strong>Important:</strong><br>If you use the free version, you must credit <span class="highlight">"prod. Kaiju"</span> and include the beat link in the video description.</p>
        </div>
    `
};

window.setLang = (lang) => {
    currentLang = lang;
    localStorage.setItem('kaijuLang', lang);
    const modal = document.getElementById('langModal');
    modal.classList.add('hidden');
    document.getElementById('readmeBtnLabel').textContent = lang === 'fr' ? 'LIS MOI' : 'READ ME';
    applyTranslations(lang);
};

function applyTranslations(lang) {
    const t = translations[lang];
    document.getElementById('searchInput').placeholder = t.search;
    const allOpt = document.querySelector('#genreFilter option[value="all"]');
    if (allOpt) allOpt.textContent = t.allStyles;
    // update custom select label if "all" is selected
    const customLabel = document.getElementById('customSelectLabel');
    const hiddenFilter = document.getElementById('genreFilter');
    if (customLabel && hiddenFilter && hiddenFilter.value === 'all') {
        customLabel.textContent = t.allStyles;
        const allItem = document.querySelector('.custom-select-item[data-value="all"]');
        if (allItem) allItem.textContent = t.allStyles;
    }
    document.getElementById('cartTitle') && (document.getElementById('cartTitle').textContent = t.cartTitle);
    document.getElementById('cartSub') && (document.getElementById('cartSub').textContent = t.cartSub);
    document.getElementById('socialsSub') && (document.getElementById('socialsSub').textContent = t.socialsSub);
    document.querySelector('.promo-bar span') && (document.querySelector('.promo-bar span').textContent = t.promoBar);
    document.querySelector('#pCover') && document.querySelector('.p-meta small') && 
        (document.querySelector('.p-meta small').innerHTML = `<i class="fas fa-record-vinyl"></i> ${t.prodBy}`);
    // Re-render pour mettre à jour les boutons
    render();
}

let cart = [];
const mainAudio = document.getElementById('mainAudio');
const pBtn = document.getElementById('pPlayPause');
const progressBar = document.getElementById('pProgress');

// 1. RENDU & FILTRES
function render(data = database) {
    const t = translations[currentLang];
    const grid = document.getElementById('beatsGrid');
    grid.innerHTML = data.map(b => `
        <div class="beat-card">
            <div class="img-box">
                <img src="${b.cover}">
                <button class="overlay-play" onclick="playBeat(${b.id})"><i class="fas fa-play"></i></button>
            </div>
            <div class="beat-meta">
                <h3>${b.title}</h3>
                <p style="font-size:0.7rem; color:#555;">${b.genre.toUpperCase()}</p>
                <button class="buy-btn" onclick="addToCart(${b.id})">${t.addToCart}</button>
            </div>
        </div>
    `).join('');
}

function runFilters() {
    const s = document.getElementById('searchInput').value.toLowerCase();
    const g = document.getElementById('genreFilter').value;
    const filtered = database.filter(b => b.title.toLowerCase().includes(s) && (g === 'all' || b.genre === g));
    render(filtered);
}

// ==================== CUSTOM SELECT LOGIC ====================
(function() {
    const select = document.getElementById('customSelect');
    const btn = document.getElementById('customSelectBtn');
    const label = document.getElementById('customSelectLabel');
    const list = document.getElementById('customSelectList');
    const hidden = document.getElementById('genreFilter');
    const items = list.querySelectorAll('.custom-select-item');

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        select.classList.toggle('open');
    });

    items.forEach(item => {
        item.addEventListener('click', () => {
            // update active state
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            // update label and hidden input
            label.textContent = item.textContent;
            hidden.value = item.dataset.value;
            // close dropdown
            select.classList.remove('open');
            // trigger filter
            runFilters();
            // rebuild shuffle if active
            if (typeof shuffleMode !== 'undefined' && shuffleMode) {
                buildShuffleQueue();
                playShuffle(0);
            }
        });
    });

    // close on outside click
    document.addEventListener('click', () => {
        select.classList.remove('open');
    });
})();

// 2. LOGIQUE AUDIO (Navigation & Skip)
window.playBeat = (id) => {
    const b = database.find(x => x.id === id);
    document.getElementById('audioPlayer').style.display = "block";

    if(mainAudio.src.includes(b.audio)) {
        toggleAudio();
    } else {
        mainAudio.src = b.audio;
        document.getElementById('pTitle').innerText = b.title;
        document.getElementById('pCover').src = b.cover;
        mainAudio.play();
        pBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
};

function toggleAudio() {
    if(mainAudio.paused) {
        mainAudio.play();
        pBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        mainAudio.pause();
        pBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

pBtn.onclick = toggleAudio;

window.changeTime = (amount) => {
    mainAudio.currentTime += amount;
};

// Helper pour mettre à jour le gradient d'une barre
function updateSliderGradient(el, pct) {
    el.style.background = `linear-gradient(to right, #00ff88 0%, #00ff88 ${pct}%, #1a1a1a ${pct}%, #1a1a1a 100%)`;
}

// Rendre la barre maniable
progressBar.oninput = (e) => {
    const seekTime = (e.target.value / 100) * mainAudio.duration;
    mainAudio.currentTime = seekTime;
    updateSliderGradient(progressBar, e.target.value);
};

mainAudio.ontimeupdate = () => {
    if (!isNaN(mainAudio.duration)) {
        const prog = (mainAudio.currentTime / mainAudio.duration) * 100;
        progressBar.value = prog;
        updateSliderGradient(progressBar, prog);
        document.querySelector('.player-progress-fill').style.width = prog + '%';
        document.getElementById('timeCurrent').innerText = formatTime(mainAudio.currentTime);
        document.getElementById('timeTotal').innerText = formatTime(mainAudio.duration);
    }
};

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// 3. PANIER & MODALS
window.addToCart = (id) => {
    const b = database.find(x => x.id === id);
    if(!cart.find(item => item.id === id)) cart.push(b);
    updateCart();
    saveCart();
    document.getElementById('cartModal').classList.add('active');
};

function updateCart() {
    const t = translations[currentLang];
    document.getElementById('cartCount').innerText = cart.length;
    const items = document.getElementById('cartItems');
    const totalArea = document.getElementById('cartTotalArea');

    if(cart.length === 0) {
        items.innerHTML = `<p style='text-align:center; padding:20px;'>${t.cartEmpty}</p>`;
        totalArea.innerHTML = "";
    } else {
        items.innerHTML = cart.map((b, i) => `
            <div class="cart-item">
                <span>${b.title}</span>
                <button onclick="remove(${i})"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');

        let total = 0;
        for (let i = 1; i <= cart.length; i++) { if (i % 3 !== 0) total += 39.99; }
        
        totalArea.innerHTML = `
            <div class="total-box">
                <h3>TOTAL : ${total.toFixed(2)}€</h3>
                ${cart.length >= 3 ? `<p style="color:var(--primary); font-size:0.7rem; margin-bottom:10px;">${t.promo}</p>` : ''}
                <button class="checkout-btn" onclick="checkout()">${t.checkout}</button>
            </div>
        `;
    }
}

window.remove = (i) => { cart.splice(i, 1); updateCart(); saveCart(); };
window.checkout = () => {
    saveCart();
    window.location.href = 'checkout.html';
};

function saveCart() {
    localStorage.setItem('kaijuCart', JSON.stringify(cart));
}

// Gestion des ouvertures/fermetures
document.getElementById('socialsBtn').onclick = () => document.getElementById('socialsModal').classList.add('active');
document.getElementById('closeSocials').onclick = () => document.getElementById('socialsModal').classList.remove('active');
document.getElementById('cartBtn').onclick = () => document.getElementById('cartModal').classList.add('active');
document.getElementById('closeCart').onclick = () => document.getElementById('cartModal').classList.remove('active');
document.getElementById('contactBtn').onclick = () => document.getElementById('contactModal').classList.add('active');
document.getElementById('closeContact').onclick = () => document.getElementById('contactModal').classList.remove('active');
document.getElementById('readmeBtn').onclick = () => {
    document.getElementById('readmeContent').innerHTML = readmeContent[currentLang];
    document.getElementById('readmeModal').classList.add('active');
};
document.getElementById('closeReadme').onclick = () => document.getElementById('readmeModal').classList.remove('active');

// Volume & Init
function updateVolSlider(val) {
    const volEl = document.getElementById('volControl');
    updateSliderGradient(volEl, val * 100);
}

document.getElementById('volControl').oninput = (e) => {
    mainAudio.volume = e.target.value;
    updateVolSlider(e.target.value);
};

document.addEventListener('DOMContentLoaded', () => {
    render();
    updateVolSlider(1); // volume à 100% par défaut
    document.getElementById('searchInput').oninput = runFilters;
    document.getElementById('genreFilter').onchange = runFilters;
});
// ==================== SHUFFLE MODE ====================
let shuffleMode = false;
let shuffleQueue = [];
let shuffleIndex = 0;
let lastPlayedId = null;

function fisherYates(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildShuffleQueue(currentId = null) {
  const g = document.getElementById('genreFilter').value;
  const s = document.getElementById('searchInput').value.toLowerCase();
  const pool = database.filter(b =>
    b.title.toLowerCase().includes(s) && (g === 'all' || b.genre === g)
  );
  let arr = fisherYates([...pool]);
  // Garantit que la track en cours ne revient pas en 1er
  if (currentId && arr.length > 1 && arr[0].id === currentId) {
    arr.push(arr.shift());
  }
  shuffleQueue = arr;
  shuffleIndex = 0;
}

function playShuffle(index) {
  if (!shuffleQueue.length) return;
  const b = shuffleQueue[index];
  lastPlayedId = b.id;
  document.getElementById('audioPlayer').style.display = 'block';
  document.getElementById('pTitle').innerText = b.title;
  document.getElementById('pCover').src = b.cover;
  pBtn.innerHTML = '<i class="fas fa-pause"></i>';
  // On assigne src et on attend canplaythrough avant de lancer
  mainAudio.src = b.audio;
  mainAudio.load();
  const onReady = () => {
    mainAudio.play().catch(() => {});
    mainAudio.removeEventListener('canplaythrough', onReady);
  };
  mainAudio.addEventListener('canplaythrough', onReady);
}

document.getElementById('shuffleBtn').onclick = () => {
  shuffleMode = !shuffleMode;
  document.getElementById('shuffleBtn').classList.toggle('active', shuffleMode);
  if (shuffleMode) {
    buildShuffleQueue(lastPlayedId);
    playShuffle(0);
  }
};

// Rebuild queue si genre change pendant shuffle
document.getElementById('genreFilter').addEventListener('change', () => {
  if (shuffleMode) { buildShuffleQueue(lastPlayedId); playShuffle(0); }
});

// Auto-play next beat quand la track se termine
document.getElementById('mainAudio').addEventListener('ended', () => {
  if (!shuffleMode) return;
  shuffleIndex++;
  // Fin de la queue : on remélanges en évitant la dernière prod jouée
  if (shuffleIndex >= shuffleQueue.length) buildShuffleQueue(lastPlayedId);
  playShuffle(shuffleIndex);
});

// Translations for shuffle & testimonials
const extraTranslations = {
  fr: { shuffleLabel: "SHUFFLE", testimonialsSubtitle: "Ce que disent les artistes" },
  en: { shuffleLabel: "SHUFFLE", testimonialsSubtitle: "What artists say" }
};

const _origSetLang = window.setLang;
window.setLang = (lang) => {
  _origSetLang(lang);
  const ex = extraTranslations[lang];
  document.getElementById('shuffleBtnLabel') && (document.getElementById('shuffleBtnLabel').textContent = ex.shuffleLabel);
  document.getElementById('testimonialsSubtitle') && (document.getElementById('testimonialsSubtitle').textContent = ex.testimonialsSubtitle);
};
// ==================== PREMIUM UPGRADES ====================

// Custom cursor
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

if (cursor && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth ring follow
    function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effects on interactive elements
    const hoverEls = document.querySelectorAll('button, a, .beat-card, .nav-link-btn, .cart-trigger, .lang-btn, .custom-select-btn, input, select');
    hoverEls.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorRing.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorRing.classList.remove('hover');
        });
    });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// Beat cards animated entry on scroll
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, i * 60);
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.05 });

function observeCards() {
    document.querySelectorAll('.beat-card').forEach(card => {
        cardObserver.observe(card);
    });
    // Also add hover cursor effect to new cards
    if (cursor) {
        document.querySelectorAll('.beat-card').forEach(card => {
            card.addEventListener('mouseenter', () => { cursor.classList.add('hover'); cursorRing.classList.add('hover'); });
            card.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); cursorRing.classList.remove('hover'); });
        });
    }
}

// Override render to add waveform + genre badge + scroll animation
const _origRender = window.render || function(){};
const origRenderFn = render;

function render(data = database) {
    const t = translations[currentLang];
    const grid = document.getElementById('beatsGrid');
    grid.innerHTML = data.map(b => `
        <div class="beat-card">
            <div class="img-box">
                <img src="${b.cover}" loading="lazy">
                <button class="overlay-play" onclick="playBeat(${b.id})"><i class="fas fa-play"></i></button>
            </div>
            <div class="beat-meta">
                <div class="waveform">
                    <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
                    <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
                    <div class="wave-bar"></div>
                </div>
                <h3>${b.title}</h3>
                <div class="genre-badge">${b.genre.toUpperCase()}</div>
                <button class="buy-btn" onclick="addToCart(${b.id})">${t.addToCart}</button>
            </div>
        </div>
    `).join('');
    setTimeout(observeCards, 50);
}

// Re-render with upgrades
render();

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});