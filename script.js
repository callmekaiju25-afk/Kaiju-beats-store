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

// --- FILTRAGE & RECHERCHE ---
function updateDisplay() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const genre = document.getElementById('genreFilter').value;
    const filtered = database.filter(b => {
        return b.title.toLowerCase().includes(search) && (genre === 'all' || b.genre === genre);
    });
    render(filtered);
}

// --- RENDER DES COVERS ---
function render(data = database) {
    const grid = document.getElementById('beatsGrid');
    grid.innerHTML = data.map(b => `
        <div class="beat-card">
            <div class="img-box">
                <img src="${b.cover}">
                <button onclick="playBeat(${b.id})" style="position:absolute; inset:0; background:rgba(0,0,0,0.5); border:none; color:white; font-size:2.5rem; cursor:pointer; opacity:0; transition:0.3s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0"><i class="fas fa-play"></i></button>
            </div>
            <div style="padding:20px; text-align:center;">
                <h3 style="font-family:Orbitron; font-size:0.9rem; margin-bottom:5px;">${b.title}</h3>
                <p style="font-size:0.6rem; color:#666; margin-bottom:15px; font-family:Orbitron;">${b.genre.toUpperCase()}</p>
                <button onclick="addToCart(${b.id})" style="background:none; border:1px solid #00ff88; color:#00ff88; padding:10px; width:100%; cursor:pointer; font-family:Orbitron; font-size:0.75rem; transition:0.3s;" onmouseover="this.style.background='#00ff88'; this.style.color='black'" onmouseout="this.style.background='none'; this.style.color='#00ff88'">
                    39.99€ - AJOUTER
                </button>
            </div>
        </div>
    `).join('');
    document.getElementById('beatsCount').innerText = data.length;
}

// --- PANIER (2+1 OFFERT) ---
window.addToCart = (id) => {
    const beat = database.find(b => b.id === id);
    if (!cart.find(i => i.id === id)) {
        cart.push(beat);
        updateCart();
        const t = document.getElementById('toast');
        t.style.display = "block"; setTimeout(() => t.style.display = "none", 2000);
    }
};

function updateCart() {
    document.getElementById('cartCount').innerText = cart.length;
    const body = document.getElementById('cartBody');
    const footer = document.getElementById('cartFooter');
    if (cart.length === 0) {
        body.innerHTML = "<p style='text-align:center; color:#555;'>Votre panier est vide</p>";
        footer.style.display = "none";
    } else {
        body.innerHTML = cart.map((item, index) => `<div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #222; padding-bottom:10px;"><span>${item.title}</span><button onclick="removeFromCart(${index})" style="color:#ff4444; background:none; border:none; cursor:pointer;"><i class="fas fa-trash"></i></button></div>`).join('');
        footer.style.display = "block";
        
        let total = 0;
        for (let i = 1; i <= cart.length; i++) { if (i % 3 !== 0) total += 39.99; }
        
        document.getElementById('cartTotalDisplay').innerHTML = `<h3 style="color:#00ff88; font-family:Orbitron;">TOTAL : ${total.toFixed(2)}€</h3>${cart.length >= 3 ? '<p style="color:#00ff88; font-size:0.7rem;">PROMO 2+1 APPLIQUÉE ✅</p>' : ''}`;
    }
}

window.removeFromCart = (i) => { cart.splice(i, 1); updateCart(); };

// --- PLAYER AUDIO ---
window.playBeat = (id) => {
    const beat = database.find(b => b.id === id);
    document.getElementById('audioPlayer').style.display = "block";
    mainAudio.src = beat.audio;
    document.getElementById('playerTitle').innerText = beat.title;
    document.getElementById('playerImage').src = beat.cover;
    mainAudio.play();
    document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-pause"></i>';
};

mainAudio.ontimeupdate = () => {
    const prog = (mainAudio.currentTime / mainAudio.duration) * 100;
    document.getElementById('progressBar').value = prog || 0;
    const m = Math.floor(mainAudio.currentTime / 60);
    const s = Math.floor(mainAudio.currentTime % 60);
    document.getElementById('currentTime').innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
    if(mainAudio.duration) {
        const dm = Math.floor(mainAudio.duration / 60);
        const ds = Math.floor(mainAudio.duration % 60);
        document.getElementById('durationTime').innerText = `${dm}:${ds < 10 ? '0' : ''}${ds}`;
    }
};

document.getElementById('progressBar').oninput = (e) => {
    mainAudio.currentTime = (e.target.value / 100) * mainAudio.duration;
};

// --- EVENTS ---
document.addEventListener('DOMContentLoaded', () => {
    render();
    document.getElementById('searchInput').addEventListener('input', updateDisplay);
    document.getElementById('genreFilter').addEventListener('change', updateDisplay);
    
    document.getElementById('contactBtn').onclick = (e) => { e.preventDefault(); document.getElementById('contactModal').classList.add('active'); };
    document.getElementById('contactClose').onclick = () => document.getElementById('contactModal').classList.remove('active');
    document.getElementById('cartBtn').onclick = () => document.getElementById('cartModal').classList.add('active');
    document.getElementById('cartCloseBtn').onclick = () => document.getElementById('cartModal').classList.remove('active');
    document.getElementById('playerClose').onclick = () => { mainAudio.pause(); document.getElementById('audioPlayer').style.display = 'none'; };
    
    document.getElementById('playPauseBtn').onclick = () => {
        if (mainAudio.paused) { mainAudio.play(); document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-pause"></i>'; }
        else { mainAudio.pause(); document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-play"></i>'; }
    };
});

document.getElementById('checkoutWhatsapp').onclick = () => {
    const text = `Salut KAIJU 🦖! Je veux commander : ${cart.map(b => b.title).join(', ')}`;
    window.open(`https://wa.me/221777694864?text=${encodeURIComponent(text)}`);
};

// Fonction pour reculer/avancer de 10 secondes
window.skipTime = (amount) => {
    mainAudio.currentTime += amount;
};

// Mise à jour du minuteur et de la barre
mainAudio.ontimeupdate = () => {
    if (!isNaN(mainAudio.duration)) {
        // Barre de progression
        const progress = (mainAudio.currentTime / mainAudio.duration) * 100;
        document.getElementById('progressBar').value = progress;

        // Temps actuel (Minuteur de gauche)
        const curM = Math.floor(mainAudio.currentTime / 60);
        const curS = Math.floor(mainAudio.currentTime % 60);
        document.getElementById('currentTime').innerText = `${curM}:${curS < 10 ? '0' : ''}${curS}`;

        // Durée totale (Minuteur de droite)
        const durM = Math.floor(mainAudio.duration / 60);
        const durS = Math.floor(mainAudio.duration % 60);
        document.getElementById('durationTime').innerText = `${durM}:${durS < 10 ? '0' : ''}${durS}`;
    }
};

// Cliquer sur la barre pour naviguer dans le son
document.getElementById('progressBar').oninput = (e) => {
    const time = (e.target.value / 100) * mainAudio.duration;
    mainAudio.currentTime = time;
};