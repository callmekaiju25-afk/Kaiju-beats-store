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
    { id: 15, title: "Solitude", genre: "Acoustic", cover: "assets/IMAGE/Solitude.png", audio: "assets/MP3/Solitude.mp3" },
    { id: 16, title: "Aurore", genre: "Acoustic", cover: "assets/IMAGE/Aurore.png", audio: "assets/MP3/Aurore.mp3" },
    { id: 17, title: "SOLUNA", genre: "trap", cover: "assets/IMAGE/SOLUNA.png", audio: "assets/MP3/SOLUNA.mp3" },
    { id: 18, title: "Ombre", genre: "Drill", cover: "assets/IMAGE/Ombre.png", audio: "assets/MP3/Ombre.mp3" },
    { id: 19, title: "LARME", genre: "Acoustic", cover: "assets/IMAGE/LARME.png", audio: "assets/MP3/LARME.mp3" },



];

let cart = [];
const mainAudio = document.getElementById('mainAudio');
const pBtn = document.getElementById('pPlayPause');
const progressBar = document.getElementById('pProgress');

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
                <p style="font-size:0.7rem; color:#555;">${b.genre.toUpperCase()}</p>
                <button class="buy-btn" onclick="addToCart(${b.id})">39.99€ - AJOUTER AU PANIER</button>
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

// Rendre la barre maniable
progressBar.oninput = (e) => {
    const seekTime = (e.target.value / 100) * mainAudio.duration;
    mainAudio.currentTime = seekTime;
};

mainAudio.ontimeupdate = () => {
    if (!isNaN(mainAudio.duration)) {
        const prog = (mainAudio.currentTime / mainAudio.duration) * 100;
        progressBar.value = prog;
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
    document.getElementById('cartModal').classList.add('active');
};

function updateCart() {
    document.getElementById('cartCount').innerText = cart.length;
    const items = document.getElementById('cartItems');
    const totalArea = document.getElementById('cartTotalArea');

    if(cart.length === 0) {
        items.innerHTML = "<p style='text-align:center; padding:20px;'>Votre panier est vide.</p>";
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
                ${cart.length >= 3 ? '<p style="color:var(--primary); font-size:0.7rem; margin-bottom:10px;">OFFRE 2+1 APPLIQUÉE ✅</p>' : ''}
                <button class="checkout-btn" onclick="checkout()">COMMANDER SUR WHATSAPP</button>
            </div>
        `;
    }
}

window.remove = (i) => { cart.splice(i, 1); updateCart(); };
window.checkout = () => {
    const list = cart.map(b => b.title).join(', ');
    window.open(`https://wa.me/221777694864?text=Salut Kaiju ! Je veux commander : ${list}`);
};

// Gestion des ouvertures/fermetures
document.getElementById('cartBtn').onclick = () => document.getElementById('cartModal').classList.add('active');
document.getElementById('closeCart').onclick = () => document.getElementById('cartModal').classList.remove('active');
document.getElementById('contactBtn').onclick = () => document.getElementById('contactModal').classList.add('active');
document.getElementById('closeContact').onclick = () => document.getElementById('contactModal').classList.remove('active');

// Volume & Init
document.getElementById('volControl').oninput = (e) => mainAudio.volume = e.target.value;

document.addEventListener('DOMContentLoaded', () => {
    render();
    document.getElementById('searchInput').oninput = runFilters;
    document.getElementById('genreFilter').onchange = runFilters;
});