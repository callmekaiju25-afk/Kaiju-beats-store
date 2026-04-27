const database = [
    { id: 1, title: "BERGHAIN", genre: "hood-trap", cover: "assets/IMAGE/Rosalia.jpg", audio: "assets/MP3/Berghain.mp3" },
    { id: 2, title: "MIRAGE", genre: "trap", cover: "assets/IMAGE/MIRAGE.jpg", audio: "assets/MP3/MIRAGE.mp3" },
    { id: 3, title: "Distancia", genre: "afro", cover: "assets/IMAGE/Distancia.png", audio: "assets/MP3/Distancia.mp3" },
    { id: 4, title: "Sunset", genre: "afro", cover: "assets/IMAGE/Sun-Set.png", audio: "assets/MP3/Sun-Set.mp3" }
];

let cart = [];

const mainAudio = document.getElementById('mainAudio');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');

// --- FONCTIONS PANIER ---
window.addToCart = function(id) {
    const beat = database.find(b => b.id === id);
    if (!cart.some(item => item.id === id)) {
        cart.push(beat);
        updateCartUI();
    }
    document.getElementById('cartModal').classList.add('active');
};

function updateCartUI() {
    document.getElementById('cartCount').innerText = cart.length;
    const body = document.getElementById('cartBody');
    const footer = document.getElementById('cartFooter');
    
    if(cart.length === 0) {
        body.innerHTML = "<p style='text-align:center;'>Ton panier est vide frérot.</p>";
        footer.style.display = "none";
    } else {
        body.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <span>${item.title}</span>
                <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#ff4444; cursor:pointer;"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
        
        let total = cart.length * 39.99;
        let displayTotal = total.toFixed(2);
        
        if (cart.length >= 3) {
            total -= 39.99;
            displayTotal = `${total.toFixed(2)}€ <span style="color:var(--primary); font-size:0.8rem;">(OFFRE 2+1 APPLIQUÉE)</span>`;
        } else {
            displayTotal += "€";
        }
        
        document.getElementById('cartTotalDisplay').innerHTML = `<h4 style="margin-bottom:15px;">TOTAL : ${displayTotal}</h4>`;
        footer.style.display = "block";
    }
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
};

// --- LECTEUR AUDIO ---
window.playBeat = function(id) {
    const beat = database.find(b => b.id === id);
    document.getElementById('audioPlayer').style.display = 'block';
    mainAudio.src = beat.audio;
    document.getElementById('playerTitle').innerText = beat.title;
    document.getElementById('playerImage').src = beat.cover;
    document.getElementById('playerGenre').innerText = beat.genre.toUpperCase();
    mainAudio.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
};

mainAudio.addEventListener('timeupdate', () => {
    const progress = (mainAudio.currentTime / mainAudio.duration) * 100;
    progressBar.value = progress || 0;
    document.getElementById('currentTime').innerText = formatTime(mainAudio.currentTime);
});

mainAudio.addEventListener('loadedmetadata', () => {
    document.getElementById('durationTime').innerText = formatTime(mainAudio.duration);
});

progressBar.addEventListener('input', () => {
    const time = (progressBar.value * mainAudio.duration) / 100;
    mainAudio.currentTime = time;
});

function formatTime(s) {
    const min = Math.floor(s/60);
    const sec = Math.floor(s%60);
    return `${min}:${sec < 10 ? '0'+sec : sec}`;
}

// --- BOUTONS ---
document.getElementById('cartBtn').onclick = () => document.getElementById('cartModal').classList.add('active');
document.getElementById('cartClose').onclick = () => document.getElementById('cartModal').classList.remove('active');
document.getElementById('playerClose').onclick = () => { mainAudio.pause(); document.getElementById('audioPlayer').style.display = 'none'; };

playPauseBtn.onclick = () => {
    if (mainAudio.paused) { mainAudio.play(); playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'; }
    else { mainAudio.pause(); playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'; }
};

document.getElementById('restartBtn').onclick = () => mainAudio.currentTime = 0;
document.getElementById('forwardBtn').onclick = () => mainAudio.currentTime += 10;

document.getElementById('checkoutWhatsapp').onclick = () => {
    const msg = `Salut KAIJU 🦖! Je veux commander ces beats : ${cart.map(b => b.title).join(', ')}`;
    window.open(`https://wa.me/221777694864?text=${encodeURIComponent(msg)}`);
};

// --- RENDU ---
function render() {
    const grid = document.getElementById('beatsGrid');
    grid.innerHTML = database.map(beat => `
        <div class="beat-card">
            <div class="beat-img-container">
                <img src="${beat.cover}" class="beat-img">
                <button class="play-overlay" onclick="playBeat(${beat.id})"><i class="fas fa-play"></i></button>
            </div>
            <div class="beat-content">
                <h3 class="beat-title">${beat.title}</h3>
                <p style="margin-bottom:15px;">${beat.genre.toUpperCase()} | 39.99€</p>
                <button class="btn-primary" onclick="addToCart(${beat.id})">AJOUTER AU PANIER</button>
            </div>
        </div>
    `).join('');
    document.getElementById('beatsCount').innerText = database.length;
}

document.addEventListener('DOMContentLoaded', render);