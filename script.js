const database = [
    { id: 1, title: "BERGHAIN", genre: "hood-trap", cover: "assets/IMAGE/Rosalia.jpg", audio: "assets/MP3/Berghain.mp3" },
    { id: 2, title: "MIRAGE", genre: "trap", cover: "assets/IMAGE/MIRAGE.jpg", audio: "assets/MP3/MIRAGE.mp3" },
    { id: 3, title: "Distancia", genre: "afro", cover: "assets/IMAGE/Distancia.png", audio: "assets/MP3/Distancia.mp3" },
    { id: 4, title: "Sunset", genre: "afro", cover: "assets/IMAGE/Sun-Set.png", audio: "assets/MP3/Sun-Set.mp3" },
    { id: 5, title: "BAD", genre: "afro", cover: "assets/IMAGE/BAD.png", audio: "assets/MP3/Bad.mp3" },
    { id: 6, title: "Elevation", genre: "trap", cover: "assets/IMAGE/Elevation.png", audio: "assets/MP3/Elevation.mp3" }
];

let cart = [];
const mainAudio = document.getElementById('mainAudio');
const playPauseBtn = document.getElementById('playPauseBtn');

// --- 1. FONCTION DE RENDU (L'affichage) ---
function render(data = database) {
    const grid = document.getElementById('beatsGrid');
    if(!grid) return;
    
    grid.innerHTML = data.map(b => `
        <div class="beat-card">
            <div class="img-box">
                <img src="${b.cover}">
                <button onclick="playBeat(${b.id})" class="play-btn-overlay">
                    <i class="fas fa-play"></i>
                </button>
            </div>
            <div class="beat-details">
                <h3>${b.title}</h3>
                <p>${b.genre.toUpperCase()}</p>
                <button onclick="addToCart(${b.id})" class="buy-btn">39.99€ - AJOUTER</button>
            </div>
        </div>
    `).join('');
    document.getElementById('beatsCount').innerText = data.length;
}

// --- 2. FILTRAGE (Le problème du catalogue) ---
function filterBeats() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const genreValue = document.getElementById('genreFilter').value;

    const filtered = database.filter(beat => {
        const matchesSearch = beat.title.toLowerCase().includes(searchValue);
        const matchesGenre = genreValue === 'all' || beat.genre === genreValue;
        return matchesSearch && matchesGenre;
    });

    render(filtered);
}

// --- 3. LOGIQUE PLAYER & BOUTON PAUSE ---
window.playBeat = (id) => {
    const beat = database.find(b => b.id === id);
    document.getElementById('audioPlayer').style.display = "block";
    
    if (mainAudio.src.includes(beat.audio) && !mainAudio.paused) {
        mainAudio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        mainAudio.src = beat.audio;
        document.getElementById('playerTitle').innerText = beat.title;
        document.getElementById('playerImage').src = beat.cover;
        mainAudio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
};

playPauseBtn.onclick = () => {
    if (mainAudio.paused) {
        mainAudio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        mainAudio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
};

window.skipTime = (amount) => { mainAudio.currentTime += amount; };

mainAudio.ontimeupdate = () => {
    if (!isNaN(mainAudio.duration)) {
        const prog = (mainAudio.currentTime / mainAudio.duration) * 100;
        document.getElementById('progressBar').value = prog;
        const curM = Math.floor(mainAudio.currentTime / 60);
        const curS = Math.floor(mainAudio.currentTime % 60);
        document.getElementById('currentTime').innerText = `${curM}:${curS < 10 ? '0' : ''}${curS}`;
        const durM = Math.floor(mainAudio.duration / 60);
        const durS = Math.floor(mainAudio.duration % 60);
        document.getElementById('durationTime').innerText = `${durM}:${durS < 10 ? '0' : ''}${durS}`;
    }
};

// --- 4. PANIER (Logique complète) ---
window.addToCart = (id) => {
    const beat = database.find(b => b.id === id);
    if (!cart.find(item => item.id === id)) {
        cart.push(beat);
        updateCart();
    }
};

function updateCart() {
    document.getElementById('cartCount').innerText = cart.length;
    const cartBody = document.getElementById('cartBody');
    const cartModal = document.getElementById('cartModal');

    if (cart.length === 0) {
        cartBody.innerHTML = "<p style='text-align:center; padding:20px;'>Ton panier est vide.</p>";
    } else {
        cartBody.innerHTML = cart.map((item, index) => `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid #222; padding-bottom:10px;">
                <span>${item.title}</span>
                <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer;"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');

        // Calcul du prix avec Promo 2+1
        let total = 0;
        for (let i = 1; i <= cart.length; i++) {
            if (i % 3 !== 0) total += 39.99;
        }
        
        cartBody.innerHTML += `
            <div style="margin-top:20px; border-top:1px solid var(--primary); padding-top:15px; text-align:right;">
                <h3 style="color:var(--primary);">TOTAL : ${total.toFixed(2)}€</h3>
                ${cart.length >= 3 ? '<p style="font-size:0.7rem; color:#00ff88;">PROMO APPLIQUÉE ✅</p>' : ''}
            </div>
        `;
    }
}

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCart();
};

// --- 5. INITIALISATION ---
document.addEventListener('DOMContentLoaded', () => {
    render();

    // Ecouteurs pour le filtrage
    document.getElementById('searchInput').addEventListener('input', filterBeats);
    document.getElementById('genreFilter').addEventListener('change', filterBeats);

    // Modals
    document.getElementById('contactBtn').onclick = () => document.getElementById('contactModal').classList.add('active');
    document.getElementById('contactClose').onclick = () => document.getElementById('contactModal').classList.remove('active');
    
    document.getElementById('cartBtn').onclick = () => {
        document.getElementById('cartModal').classList.add('active');
        updateCart();
    };
    
    // Fermeture panier (si tu as un bouton cartCloseBtn ou en cliquant sur le fond)
    const cartClose = document.getElementById('cartCloseBtn');
    if(cartClose) cartClose.onclick = () => document.getElementById('cartModal').classList.remove('active');
});