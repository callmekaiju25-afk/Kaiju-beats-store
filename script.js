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

function render(data = database) {
    const grid = document.getElementById('beatsGrid');
    grid.innerHTML = data.map(b => `
        <div class="beat-card">
            <div class="img-box">
                <img src="${b.cover}">
                <button onclick="playBeat(${b.id})" style="position:absolute; inset:0; background:rgba(0,0,0,0.5); border:none; color:white; font-size:2.5rem; opacity:0; cursor:pointer; transition:0.3s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0">
                    <i class="fas fa-play"></i>
                </button>
            </div>
            <div style="padding:20px; text-align:center;">
                <h3 style="font-family:Orbitron; font-size:0.85rem; margin-bottom:8px; letter-spacing:1px;">${b.title}</h3>
                <p style="font-size:0.6rem; color:#555; margin-bottom:18px; font-family:Orbitron;">${b.genre.toUpperCase()}</p>
                <button onclick="addToCart(${b.id})" style="width:100%; padding:12px; background:none; border:1px solid var(--primary); color:var(--primary); font-family:Orbitron; font-size:0.7rem; cursor:pointer; transition:0.3s;" onmouseover="this.style.background='var(--primary)'; this.style.color='black'">
                    39.99€ - AJOUTER
                </button>
            </div>
        </div>
    `).join('');
    document.getElementById('beatsCount').innerText = data.length;
}

// Logique Player
window.playBeat = (id) => {
    const beat = database.find(b => b.id === id);
    document.getElementById('audioPlayer').style.display = "block";
    mainAudio.src = beat.audio;
    document.getElementById('playerTitle').innerText = beat.title;
    document.getElementById('playerImage').src = beat.cover;
    mainAudio.play();
    document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-pause"></i>';
};

window.skipTime = (amount) => { mainAudio.currentTime += amount; };

mainAudio.ontimeupdate = () => {
    if (!isNaN(mainAudio.duration)) {
        const prog = (mainAudio.currentTime / mainAudio.duration) * 100;
        document.getElementById('progressBar').value = prog;
        
        const curM = Math.floor(mainAudio.currentTime / 60);
        const curS = Math.floor(mainAudio.currentTime % 60);
        document.getElementById('currentTime').innerText = `${curM}:${curS < 10 ? '0' : ''}${curS}`;
        
        const durM = Math.floor(mainAudio.duration / 60);
        const durS = Math.floor(mainAudio.duration % 60);
        document.getElementById('durationTime').innerText = `${durM}:${durS < 10 ? '0' : ''}${durS}`;
    }
};

document.getElementById('progressBar').oninput = (e) => {
    mainAudio.currentTime = (e.target.value / 100) * mainAudio.duration;
};

// Volume
document.getElementById('volumeSlider').oninput = (e) => { mainAudio.volume = e.target.value; };
document.getElementById('muteBtn').onclick = () => {
    mainAudio.muted = !mainAudio.muted;
    document.getElementById('muteBtn').innerHTML = mainAudio.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
};

// Recherche
document.addEventListener('DOMContentLoaded', () => {
    render();
    document.getElementById('searchInput').oninput = () => {
        const val = document.getElementById('searchInput').value.toLowerCase();
        const gen = document.getElementById('genreFilter').value;
        const filtered = database.filter(b => b.title.toLowerCase().includes(val) && (gen === 'all' || b.genre === gen));
        render(filtered);
    };
    document.getElementById('contactBtn').onclick = () => document.getElementById('contactModal').classList.add('active');
    document.getElementById('contactClose').onclick = () => document.getElementById('contactModal').classList.remove('active');
});