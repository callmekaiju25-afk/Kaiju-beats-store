import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

let beatsData = [];
let cart = [];

// Charger les beats depuis Firebase
async function loadBeats() {
    try {
        const q = query(collection(window.db, "beats"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        beatsData = [];
        snap.forEach(doc => beatsData.push({ id: doc.id, ...doc.data() }));
        renderBeats(beatsData);
    } catch (e) {
        console.error("Erreur de chargement:", e);
    }
}

function renderBeats(data) {
    const grid = document.getElementById('beatsGrid');
    const count = document.getElementById('beatsCount');
    const noRes = document.getElementById('noResults');
    
    count.innerText = data.length;
    if(data.length === 0) {
        noRes.style.display = "block";
        grid.innerHTML = "";
        return;
    }

    noRes.style.display = "none";
    grid.innerHTML = data.map(beat => `
        <div class="beat-card">
            <div class="beat-img-container">
                <img src="${beat.image}" class="beat-img">
                <button class="play-overlay" onclick="window.playBeat('${beat.id}')">
                    <i class="fas fa-play"></i>
                </button>
            </div>
            <div class="beat-content">
                <span class="beat-genre">${beat.genre}</span>
                <h3 class="beat-title">${beat.title}</h3>
                <p class="beat-bpm">${beat.bpm} BPM</p>
                <div class="beat-footer">
                    <span class="beat-price">39.99€</span>
                    <button class="btn-primary" onclick="window.addToCart('${beat.id}')">AJOUTER</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Lecteur Audio
window.playBeat = (id) => {
    const beat = beatsData.find(b => b.id === id);
    const player = document.getElementById('audioPlayer');
    document.getElementById('playerImage').src = beat.image;
    document.getElementById('playerTitle').innerText = beat.title;
    document.getElementById('playerGenre').innerText = beat.genre;
    const audio = document.getElementById('audioElement');
    audio.src = beat.audioUrl;
    player.style.display = "flex";
    audio.play();
};

document.getElementById('playerClose').onclick = () => {
    document.getElementById('audioPlayer').style.display = "none";
    document.getElementById('audioElement').pause();
};

// Panier Logic (2+1 offert)
window.addToCart = (id) => {
    const beat = beatsData.find(b => b.id === id);
    cart.push(beat);
    updateCartUI();
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
        body.innerHTML = cart.map((b, i) => `
            <div class="cart-item">
                <p>${b.title}</p>
                <button onclick="window.removeItem(${i})"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
        
        let subtotal = cart.length * 39.99;
        let promo = Math.floor(cart.length / 3) * 39.99;
        let total = subtotal - promo;
        
        document.getElementById('cartTotalDisplay').innerHTML = `
            <small>Sous-total: ${subtotal.toFixed(2)}€</small><br>
            <strong>Total: ${total.toFixed(2)}€</strong>
        `;
        footer.style.display = "block";
    }
}

window.removeItem = (i) => {// TA BASE DE DONNÉES (Ajoute tes beats ici frérot)
const database = [
    {
        id: 1,
        title: "KAIJU DRILL",
        genre: "drill",
        cover: "https://via.placeholder.com/300/00ff88/000000?text=DRILL", // Remplace par ton lien image
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Remplace par ton lien MP3
    },
    {
        id: 2,
        title: "DESERT TRAP",
        genre: "oriental",
        cover: "https://via.placeholder.com/300/00ff88/000000?text=TRAP",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    }
];

const beatsGrid = document.getElementById('beatsGrid');
const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');
const beatsCount = document.getElementById('beatsCount');

// Fonction pour afficher les beats
function renderBeats(items) {
    beatsGrid.innerHTML = '';
    beatsCount.innerText = items.length;

    items.forEach(beat => {
        const card = `
            <div class="beat-card">
                <div class="beat-img-container">
                    <img src="${beat.cover}" class="beat-img">
                    <button class="play-overlay" onclick="playBeat(${beat.id})">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
                <div class="beat-content">
                    <h3 class="beat-title">${beat.title}</h3>
                    <p style="color: #888; margin-bottom: 15px;">${beat.genre.toUpperCase()} | 39.99€</p>
                    <button class="btn-primary" onclick="window.location.href='https://wa.me/221777694864?text=Salut Kaiju, je veux acheter le beat : ${beat.title}'">
                        <i class="fab fa-whatsapp"></i> ACHETER
                    </button>
                </div>
            </div>
        `;
        beatsGrid.innerHTML += card;
    });
}

// Système de recherche et filtrage
function filterBeats() {
    const query = searchInput.value.toLowerCase();
    const selectedGenre = genreFilter.value;

    const filtered = database.filter(beat => {
        const matchesSearch = beat.title.toLowerCase().includes(query);
        const matchesGenre = selectedGenre === 'all' || beat.genre === selectedGenre;
        return matchesSearch && matchesGenre;
    });

    renderBeats(filtered);
}

// Lecteur Audio
const audioPlayer = document.getElementById('audioPlayer');
const mainAudio = document.getElementById('mainAudio');
const playerTitle = document.getElementById('playerTitle');
const playerImage = document.getElementById('playerImage');
const playPauseBtn = document.getElementById('playPauseBtn');

function playBeat(id) {
    const beat = database.find(b => b.id === id);
    if (!beat) return;

    audioPlayer.style.display = 'block';
    mainAudio.src = beat.audio;
    playerTitle.innerText = beat.title;
    playerImage.src = beat.cover;
    
    mainAudio.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

playPauseBtn.addEventListener('click', () => {
    if (mainAudio.paused) {
        mainAudio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        mainAudio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// Initialisation
searchInput.addEventListener('input', filterBeats);
genreFilter.addEventListener('change', filterBeats);
renderBeats(database);
    cart.splice(i, 1);
    updateCartUI();
};

document.getElementById('cartBtn').onclick = () => document.getElementById('cartModal').classList.add('active');
document.getElementById('cartClose').onclick = () => document.getElementById('cartModal').classList.remove('active');
document.getElementById('cartModalOverlay').onclick = () => document.getElementById('cartModal').classList.remove('active');

document.getElementById('checkoutWhatsapp').onclick = () => {
    const msg = `Salut Kaiju ! Je veux ces beats : ${cart.map(b => b.title).join(', ')}`;
    window.open(`https://wa.me/221788605549?text=${encodeURIComponent(msg)}`);
};

document.addEventListener('DOMContentLoaded', loadBeats);