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
const pBtn = document.getElementById('pPlayPause');

// 1. RENDU & FILTRES
function render(data = database) {
    const grid = document.getElementById('beatsGrid');
    grid.innerHTML = data.map(b => `
        <div class="beat-card">
            <div class="img-box">
                <img src="${b.cover}">
                <button class="overlay-play" onclick="playBeat(${b.id})"><i class="fas fa-play"></i></button>
            </div>
            <div class="beat-meta">
                <h3>${b.title}</h3>
                <p>${b.genre.toUpperCase()}</p>
                <button class="buy-btn" onclick="addToCart(${b.id})">39.99€ - AJOUTER</button>
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

// 2. AUDIO & VOLUME
window.playBeat = (id) => {
    const b = database.find(x => x.id === id);
    if(mainAudio.src.includes(b.audio)) {
        toggleAudio();
    } else {
        mainAudio.src = b.audio;
        document.getElementById('pTitle').innerText = b.title;
        document.getElementById('pCover').src = b.cover;
        document.getElementById('audioPlayer').classList.add('active');
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

document.getElementById('volControl').oninput = (e) => {
    mainAudio.volume = e.target.value;
};

mainAudio.ontimeupdate = () => {
    const prog = (mainAudio.currentTime / mainAudio.duration) * 100;
    document.getElementById('pProgress').value = prog || 0;
    document.getElementById('timeCurrent').innerText = formatTime(mainAudio.currentTime);
    document.getElementById('timeTotal').innerText = formatTime(mainAudio.duration);
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
    document.getElementById('cartModal').classList.add('active');
};

function updateCart() {
    document.getElementById('cartCount').innerText = cart.length;
    const items = document.getElementById('cartItems');
    const totalArea = document.getElementById('cartTotalArea');

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
            <button class="checkout-btn" onclick="checkout()">COMMANDER VIA WHATSAPP</button>
        </div>
    `;
}

window.remove = (i) => { cart.splice(i, 1); updateCart(); };
window.checkout = () => {
    window.open(`https://wa.me/221777694864?text=Salut Kaiju, je veux : ${cart.map(b => b.title).join(', ')}`);
};

// Fermeture des Modals
document.getElementById('closeCart').onclick = () => document.getElementById('cartModal').classList.remove('active');
document.getElementById('closeContact').onclick = () => document.getElementById('contactModal').classList.remove('active');
document.getElementById('cartBtn').onclick = () => document.getElementById('cartModal').classList.add('active');
document.getElementById('contactBtn').onclick = () => document.getElementById('contactModal').classList.add('active');

// Init
document.addEventListener('DOMContentLoaded', () => {
    render();
    document.getElementById('searchInput').oninput = runFilters;
    document.getElementById('genreFilter').onchange = runFilters;
});