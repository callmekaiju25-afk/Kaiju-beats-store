const database = [
    { id: 1, title: "BERGHAIN", genre: "hood-trap", cover: "assets/IMAGE/Rosalia.jpg", audio: "assets/MP3/Berghain.mp3" },
    { id: 2, title: "MIRAGE", genre: "trap", cover: "assets/IMAGE/MIRAGE.jpg", audio: "assets/MP3/MIRAGE.mp3" },
    { id: 3, title: "Distancia", genre: "afro", cover: "assets/IMAGE/Distancia.png", audio: "assets/MP3/Distancia.mp3" },
    { id: 4, title: "Sunset", genre: "afro", cover: "assets/IMAGE/Sun-Set.png", audio: "assets/MP3/Sun-Set.mp3" }
];

let cart = [];
const mainAudio = document.getElementById('mainAudio');

// POPUPS
const contactBtn = document.getElementById('contactBtn');
const contactModal = document.getElementById('contactModal');
const contactClose = document.getElementById('contactClose');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const cartCloseBtn = document.getElementById('cartCloseBtn');

contactBtn.onclick = (e) => { e.preventDefault(); contactModal.classList.add('active'); };
contactClose.onclick = () => contactModal.classList.remove('active');
cartBtn.onclick = () => cartModal.classList.add('active');
cartCloseBtn.onclick = () => cartModal.classList.remove('active');

window.onclick = (e) => {
    if (e.target == contactModal) contactModal.classList.remove('active');
    if (e.target == cartModal) cartModal.classList.remove('active');
};

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
        showToast("Ajouté !");
    }
};

function updateCart() {
    document.getElementById('cartCount').innerText = cart.length;
    const body = document.getElementById('cartBody');
    const footer = document.getElementById('cartFooter');
    if (cart.length === 0) {
        body.innerHTML = "<p style='text-align:center; color:#555;'>Vide</p>";
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
        document.getElementById('cartTotalDisplay').innerHTML = `<h3 style="color:var(--primary)">TOTAL : ${total.toFixed(2)}€</h3>`;
    }
}

window.removeFromCart = (i) => { cart.splice(i, 1); updateCart(); };

function showToast(m) {
    const t = document.getElementById('toast');
    t.innerText = m; t.style.display = "block";
    setTimeout(() => t.style.display = "none", 2000);
}

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
                <h3 style="font-family:Orbitron; font-size:0.9rem;">${b.title}</h3>
                <button onclick="addToCart(${b.id})" style="margin-top:10px; background:none; border:1px solid var(--primary); color:var(--primary); padding:8px; width:100%; cursor:pointer; font-family:Orbitron; font-size:0.7rem;">39.99€</button>
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