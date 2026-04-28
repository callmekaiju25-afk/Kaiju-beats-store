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
const playBtn = document.getElementById('playPauseBtn');

// --- AFFICHAGE & FILTRES ---
function render(data = database) {
    const grid = document.getElementById('beatsGrid');
    grid.innerHTML = data.map(b => `
        <div class="beat-card">
            <div class="img-box">
                <img src="${b.cover}">
                <button onclick="playBeat(${b.id})" class="play-overlay">
                    <i class="fas fa-play"></i>
                </button>
            </div>
            <div class="beat-info">
                <h3>${b.title}</h3>
                <p style="color:#555; font-size:0.7rem;">${b.genre.toUpperCase()}</p>
                <button onclick="addToCart(${b.id})" class="add-to-cart">39.99€ - AJOUTER AU PANIER</button>
            </div>
        </div>
    `).join('');
    document.getElementById('beatsCount').innerText = data.length;
}

function filter() {
    const s = document.getElementById('searchInput').value.toLowerCase();
    const g = document.getElementById('genreFilter').value;
    const filtered = database.filter(b => b.title.toLowerCase().includes(s) && (g === 'all' || b.genre === g));
    render(filtered);
}

// --- LOGIQUE AUDIO ---
window.playBeat = (id) => {
    const beat = database.find(b => b.id === id);
    const player = document.getElementById('audioPlayer');
    player.style.display = "block";

    if (mainAudio.src.includes(beat.audio)) {
        togglePlay();
    } else {
        mainAudio.src = beat.audio;
        document.getElementById('playerTitle').innerText = beat.title;
        document.getElementById('playerImage').src = beat.cover;
        mainAudio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
};

function togglePlay() {
    if (mainAudio.paused) {
        mainAudio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        mainAudio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

playBtn.onclick = togglePlay;
window.changeTime = (v) => mainAudio.currentTime += v;

mainAudio.ontimeupdate = () => {
    const p = (mainAudio.currentTime / mainAudio.duration) * 100;
    document.getElementById('progressBar').value = p || 0;
    document.getElementById('currentTime').innerText = formatTime(mainAudio.currentTime);
    document.getElementById('durationTime').innerText = formatTime(mainAudio.duration);
};

function formatTime(s) {
    if (isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}

// --- PANIER & PROMO ---
window.addToCart = (id) => {
    const beat = database.find(b => b.id === id);
    if (!cart.find(i => i.id === id)) cart.push(beat);
    updateCart();
    document.getElementById('cartModal').classList.add('active');
};

function updateCart() {
    document.getElementById('cartCount').innerText = cart.length;
    const body = document.getElementById('cartItems');
    const foot = document.getElementById('cartSummary');
    
    if (cart.length === 0) {
        body.innerHTML = "<p style='text-align:center;'>Panier vide</p>";
        foot.innerHTML = "";
    } else {
        body.innerHTML = cart.map((item, i) => `
            <div style="display:flex; justify-content:space-between; margin-bottom:15px; padding:10px; background:#111; border-radius:5px;">
                <span>${item.title}</span>
                <button onclick="remove(${i})" style="background:none; border:none; color:red; cursor:pointer;"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');

        let total = 0;
        for (let i = 1; i <= cart.length; i++) { if (i % 3 !== 0) total += 39.99; }

        foot.innerHTML = `
            <div style="text-align:right; margin-top:20px;">
                <h3>TOTAL : ${total.toFixed(2)}€</h3>
                ${cart.length >= 3 ? '<p style="color:var(--primary); font-size:0.8rem;">OFFRE APPLIQUÉE ✅</p>' : ''}
                <button onclick="checkout()" class="add-to-cart" style="background:var(--primary); color:black; margin-top:15px;">COMMANDER SUR WHATSAPP</button>
            </div>
        `;
    }
}

window.remove = (i) => { cart.splice(i, 1); updateCart(); };

window.checkout = () => {
    const list = cart.map(b => b.title).join(', ');
    window.open(`https://wa.me/221777694864?text=Salut Kaiju ! Je veux commander : ${list}`);
};

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    render();
    document.getElementById('searchInput').oninput = filter;
    document.getElementById('genreFilter').onchange = filter;
    
    // Modals events
    document.getElementById('contactBtn').onclick = () => document.getElementById('contactModal').classList.add('active');
    document.getElementById('contactClose').onclick = () => document.getElementById('contactModal').classList.remove('active');
    document.getElementById('cartBtn').onclick = () => document.getElementById('cartModal').classList.add('active');
    document.getElementById('cartClose').onclick = () => document.getElementById('cartModal').classList.remove('active');
    
    // Volume
    document.getElementById('volumeSlider').oninput = (e) => mainAudio.volume = e.target.value;
    document.getElementById('muteBtn').onclick = () => {
        mainAudio.muted = !mainAudio.muted;
        document.getElementById('muteBtn').innerHTML = mainAudio.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    };
});