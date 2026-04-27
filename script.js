const database = [
    { id: 1, title: "BERGHAIN", genre: "hood-trap", cover: "assets/IMAGE/Rosalia.jpg", audio: "assets/MP3/Berghain.mp3" },
    { id: 2, title: "MIRAGE", genre: "trap", cover: "assets/IMAGE/MIRAGE.jpg", audio: "assets/MP3/MIRAGE.mp3" },
    { id: 3, title: "Distancia", genre: "afro", cover: "assets/IMAGE/Distancia.png", audio: "assets/MP3/Distancia.mp3" },
    { id: 4, title: "Sunset", genre: "afro", cover: "assets/IMAGE/Sun-Set.png", audio: "assets/MP3/Sun-Set.mp3" }
];

let cart = [];
const mainAudio = document.getElementById('mainAudio');

// --- PANIER ---
window.addToCart = function(id) {
    const beat = database.find(b => b.id === id);
    if (!cart.some(i => i.id === id)) {
        cart.push(beat);
        updateUI();
        showToast(`"${beat.title}" ajouté !`);
    } else {
        showToast("Déjà dans le panier");
    }
};

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 2000);
}

function updateUI() {
    document.getElementById('cartCount').innerText = cart.length;
    const body = document.getElementById('cartBody');
    const footer = document.getElementById('cartFooter');
    
    if (cart.length === 0) {
        body.innerHTML = "<p style='text-align:center; color:#555;'>Panier vide.</p>";
        footer.style.display = "none";
    } else {
        body.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <span>${item.title}</span>
                <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer;"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
        
        let total = cart.length * 39.99;
        if (cart.length >= 3) total -= 39.99;
        
        document.getElementById('cartTotalDisplay').innerHTML = `
            <div style="margin-top:20px; border-top:1px solid #333; padding-top:10px;">
                <p style="color:#00ff88">${cart.length >= 3 ? 'PROMO 2+1 ACTIVE' : ''}</p>
                <h3 style="font-family:Orbitron">TOTAL : ${total.toFixed(2)}€</h3>
            </div>`;
        footer.style.display = "block";
    }
}

window.removeFromCart = function(i) { cart.splice(i, 1); updateUI(); };

// --- FILTRES ---
function filterBeats() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const selectedGenre = document.getElementById('genreFilter').value.toLowerCase();
    
    const filtered = database.filter(beat => {
        const matchesSearch = beat.title.toLowerCase().includes(query);
        const matchesGenre = selectedGenre === 'all' || beat.genre.toLowerCase() === selectedGenre;
        return matchesSearch && matchesGenre;
    });
    
    render(filtered);
}

// --- LECTEUR ---
window.playBeat = function(id) {
    const beat = database.find(b => b.id === id);
    const player = document.getElementById('audioPlayer');
    player.style.display = 'block';
    mainAudio.src = beat.audio;
    document.getElementById('playerTitle').innerText = beat.title;
    document.getElementById('playerGenre').innerText = beat.genre.toUpperCase();
    document.getElementById('playerImage').src = beat.cover;
    mainAudio.play();
    document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-pause"></i>';
};

mainAudio.ontimeupdate = () => {
    const prog = (mainAudio.currentTime / mainAudio.duration) * 100 || 0;
    document.getElementById('progressBar').value = prog;
    document.getElementById('currentTime').innerText = formatTime(mainAudio.currentTime);
};

mainAudio.onloadedmetadata = () => {
    document.getElementById('durationTime').innerText = formatTime(mainAudio.duration);
};

document.getElementById('progressBar').oninput = (e) => {
    mainAudio.currentTime = (e.target.value * mainAudio.duration) / 100;
};

function formatTime(s) {
    const m = Math.floor(s/60);
    const sc = Math.floor(s%60);
    return `${m}:${sc < 10 ? '0'+sc : sc}`;
}

// --- CONTROLES ---
document.getElementById('playPauseBtn').onclick = () => {
    if (mainAudio.paused) { mainAudio.play(); document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-pause"></i>'; }
    else { mainAudio.pause(); document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-play"></i>'; }
};

document.getElementById('cartBtn').onclick = () => document.getElementById('cartModal').classList.add('active');
document.getElementById('cartClose').onclick = () => document.getElementById('cartModal').classList.remove('active');
document.getElementById('playerClose').onclick = () => { mainAudio.pause(); document.getElementById('audioPlayer').style.display='none'; };
document.getElementById('restartBtn').onclick = () => mainAudio.currentTime = 0;
document.getElementById('forwardBtn').onclick = () => mainAudio.currentTime += 10;

document.getElementById('checkoutWhatsapp').onclick = () => {
    const text = `Salut KAIJU 🦖! Je veux ces beats : ${cart.map(b => b.title).join(', ')}`;
    window.open(`https://wa.me/221777694864?text=${encodeURIComponent(text)}`);
};

// --- RENDER ---
function render(items = database) {
    const grid = document.getElementById('beatsGrid');
    grid.innerHTML = items.map(beat => `
        <div class="beat-card">
            <div class="img-box">
                <img src="${beat.cover}">
                <button class="play-btn-overlay" onclick="playBeat(${beat.id})"><i class="fas fa-play"></i></button>
            </div>
            <div class="beat-info">
                <h3>${beat.title}</h3>
                <p>${beat.genre.toUpperCase()} | 39.99€</p>
                <button class="btn-add" onclick="addToCart(${beat.id})">AJOUTER AU PANIER</button>
            </div>
        </div>
    `).join('');
    document.getElementById('beatsCount').innerText = items.length;
}

document.addEventListener('DOMContentLoaded', () => {
    render();
    document.getElementById('searchInput').addEventListener('input', filterBeats);
    document.getElementById('genreFilter').addEventListener('change', filterBeats);
});