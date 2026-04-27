const database = [
    { id: 1, title: "BERGHAIN", cover: "assets/IMAGE/Rosalia.jpg", audio: "assets/MP3/Berghain.mp3" },
    { id: 2, title: "MIRAGE", cover: "assets/IMAGE/MIRAGE.jpg", audio: "assets/MP3/MIRAGE.mp3" },
    { id: 3, title: "Distancia", cover: "assets/IMAGE/Distancia.png", audio: "assets/MP3/Distancia.mp3" },
    { id: 4, title: "Sunset", cover: "assets/IMAGE/Sun-Set.png", audio: "assets/MP3/Sun-Set.mp3" }
];

let cart = [];
const mainAudio = document.getElementById('mainAudio');

// OUVERTURE POPUPS
document.getElementById('contactBtn').onclick = (e) => { e.preventDefault(); document.getElementById('contactModal').classList.add('active'); };
document.getElementById('contactClose').onclick = () => document.getElementById('contactModal').classList.remove('active');
document.getElementById('cartBtn').onclick = () => document.getElementById('cartModal').classList.add('active');
document.getElementById('cartCloseBtn').onclick = () => document.getElementById('cartModal').classList.remove('active');

// RECHERCHE
document.getElementById('searchInput').oninput = (e) => {
    const val = e.target.value.toLowerCase();
    const filtered = database.filter(b => b.title.toLowerCase().includes(val));
    render(filtered);
};

// PANIER
window.addToCart = (id) => {
    const beat = database.find(b => b.id === id);
    if (!cart.find(i => i.id === id)) {
        cart.push(beat);
        updateCart();
    }
};

function updateCart() {
    document.getElementById('cartCount').innerText = cart.length;
    const body = document.getElementById('cartBody');
    const footer = document.getElementById('cartFooter');
    if (cart.length === 0) {
        body.innerHTML = "<p style='color:#555; text-align:center;'>Vide</p>";
        footer.style.display = "none";
    } else {
        body.innerHTML = cart.map((item, index) => `
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span>${item.title}</span>
                <button onclick="removeFromCart(${index})" style="color:red; background:none; border:none; cursor:pointer;"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
        footer.style.display = "block";
        let total = cart.length * 39.99;
        if (cart.length >= 3) total -= 39.99;
        document.getElementById('cartTotalDisplay').innerHTML = `<h3 style="color:#00ff88">TOTAL : ${total.toFixed(2)}€</h3>`;
    }
}

window.removeFromCart = (i) => { cart.splice(i, 1); updateCart(); };

// LECTEUR
window.playBeat = (id) => {
    const beat = database.find(b => b.id === id);
    document.getElementById('audioPlayer').style.display = "block";
    mainAudio.src = beat.audio;
    document.getElementById('playerTitle').innerText = beat.title;
    document.getElementById('playerImage').src = beat.cover;
    mainAudio.play();
};

document.getElementById('playPauseBtn').onclick = () => {
    if (mainAudio.paused) mainAudio.play(); else mainAudio.pause();
};

function render(data = database) {
    const grid = document.getElementById('beatsGrid');
    grid.innerHTML = data.map(b => `
        <div class="beat-card">
            <div class="img-box">
                <img src="${b.cover}">
                <button onclick="playBeat(${b.id})" style="position:absolute; inset:0; background:rgba(0,0,0,0.5); border:none; color:white; font-size:2rem; cursor:pointer; opacity:0;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0"><i class="fas fa-play"></i></button>
            </div>
            <div style="padding:15px; text-align:center;">
                <h3 style="font-family:Orbitron; font-size:0.8rem;">${b.title}</h3>
                <button onclick="addToCart(${b.id})" style="margin-top:10px; background:none; border:1px solid #00ff88; color:#00ff88; padding:8px; width:100%; cursor:pointer; font-family:Orbitron; font-size:0.7rem;">AJOUTER</button>
            </div>
        </div>
    `).join('');
    document.getElementById('beatsCount').innerText = data.length;
}

document.addEventListener('DOMContentLoaded', () => render());

document.getElementById('checkoutWhatsapp').onclick = () => {
    const t = `Salut KAIJU 🦖! Je veux : ${cart.map(b => b.title).join(', ')}`;
    window.open(`https://wa.me/221777694864?text=${encodeURIComponent(t)}`);
};