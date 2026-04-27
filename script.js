const database = [
    { id: 1, title: "BERGHAIN", genre: "hood-trap", cover: "assets/IMAGE/Rosalia.jpg", audio: "assets/MP3/Berghain.mp3" },
    { id: 2, title: "MIRAGE", genre: "trap", cover: "assets/IMAGE/MIRAGE.jpg", audio: "assets/MP3/MIRAGE.mp3" },
    { id: 3, title: "Distancia", genre: "afro", cover: "assets/IMAGE/Distancia.png", audio: "assets/MP3/Distancia.mp3" },
    { id: 4, title: "Sunset", genre: "afro", cover: "assets/IMAGE/Sun-Set.png", audio: "assets/MP3/Sun-Set.mp3" }
];

let cart = [];

// Éléments
const mainAudio = document.getElementById('mainAudio');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');

// --- PANIER ---
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
        body.innerHTML = "<p>Ton panier est vide frérot.</p>";
        footer.style.display = "none";
    } else {
        body.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <span>${item.title}</span>
                <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#ff4444; cursor:pointer;"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
        
        let total = cart.length * 39.99;
        if (cart.length >= 3) { // Offre 2+1
            total -= 39.99;
            document.getElementById('cartTotalDisplay').innerHTML = `<p style="color:var(--primary)">Offre 2+1 appliquée !</p><strong>Total : ${total.toFixed(2)}€</strong>`;
        } else {
            document.getElementById('cartTotalDisplay').innerHTML = `<strong>Total : ${total.toFixed(2)}€</strong>`;
        }
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

function formatTime(s) {
    const min = Math.floor(s/60);
    const sec = Math.floor(s%60);
    return `${min}:${sec < 10 ? '0'+sec : sec}`;
}

// --- BOUTONS ---
document.getElementById('cartBtn').onclick = () => document.getElementById('cartModal').classList.add('active');
document.getElementById('cartClose').onclick = () => document.getElementById('cartModal').classList.remove('active');
document.getElementById('playerClose').onclick = () => { mainAudio.pause(); document.getElementById('audioPlayer').style.display = 'none'; };

document.getElementById('checkoutWhatsapp').onclick = () => {
    const msg = `Salut KAIJU 🦖! Je veux commander : ${cart.map(b => b.title).join(', ')}`;
    window.open(`https://wa.me/221777694864?text=${encodeURIComponent(msg)}`);
};

// Affichage initial
function render() {
    document.getElementById('beatsGrid').innerHTML = database.map(beat => `
        <div class="beat-card">
            <div class="beat-img-container">
                <img src="${beat.cover}" class="beat-img">
                <button class="play-overlay" onclick="playBeat(${beat.id})"><i class="fas fa-play"></i></button>
            </div>
            <div class="beat-content">
                <h3>${beat.title}</h3>
                <p>${beat.genre.toUpperCase()} | 39.99€</p>
                <button class="btn-primary" onclick="addToCart(${beat.id})">AJOUTER AU PANIER</button>
            </div>
        </div>
    `).join('');
    document.getElementById('beatsCount').innerText = database.length;
}

render();