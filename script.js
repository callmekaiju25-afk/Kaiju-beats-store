// TA BASE DE DONNÉES
const database = [
    {
        id: 1,
        title: "BERGHAIN",
        genre: "hood-trap",
        cover: "assets/IMAGE/Rosalia.jpg", 
        audio: "assets/MP3/Berghain.mp3"
    },
      {
        id: 2,
        title: "MIRAGE",
        genre: "trap",
        cover: "assets/IMAGE/MIRAGE.jpg", 
        audio: "assets/MP3/MIRAGE.mp3"
    }
];

// Éléments du DOM
const beatsGrid = document.getElementById('beatsGrid');
const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');
const beatsCount = document.getElementById('beatsCount');
const audioPlayer = document.getElementById('audioPlayer');
const mainAudio = document.getElementById('mainAudio');
const playerTitle = document.getElementById('playerTitle');
const playerImage = document.getElementById('playerImage');
const playPauseBtn = document.getElementById('playPauseBtn');

// Fonction pour afficher les beats
function renderBeats(items) {
    if (!beatsGrid) return;
    beatsGrid.innerHTML = '';
    beatsCount.innerText = items.length;

    items.forEach(beat => {
        const card = `
            <div class="beat-card">
                <div class="beat-img-container">
                    <img src="${beat.cover}" class="beat-img" alt="${beat.title}">
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
window.playBeat = function(id) {
    const beat = database.find(b => b.id === id);
    if (!beat) return;

    audioPlayer.style.display = 'block';
    mainAudio.src = beat.audio;
    playerTitle.innerText = beat.title;
    playerImage.src = beat.cover;
    
    mainAudio.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
};

// Contrôles du lecteur
if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
        if (mainAudio.paused) {
            mainAudio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            mainAudio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
    if (searchInput) searchInput.addEventListener('input', filterBeats);
    if (genreFilter) genreFilter.addEventListener('change', filterBeats);
    renderBeats(database);
});