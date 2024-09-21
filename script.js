const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volumeControl = document.getElementById('volume');
const seekBar = document.getElementById('seek');
const audioFileInput = document.getElementById('audioFile');

let isPlaying = false;
let currentTrackIndex = 0;
let audioFiles = [];

audioFileInput.addEventListener('change', (event) => {
    audioFiles = [...event.target.files];
    if (audioFiles.length > 0) {
        loadTrack(currentTrackIndex);
    }
});

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        playPauseBtn.textContent = '▶️';
    } else {
        audio.play();
        isPlaying = true;
        playPauseBtn.textContent = '⏸️';
    }
});

prevBtn.addEventListener('click', () => {
    currentTrackIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : audioFiles.length - 1;
    loadTrack(currentTrackIndex);
    audio.play();
});

nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % audioFiles.length;
    loadTrack(currentTrackIndex);
    audio.play();
});

volumeControl.addEventListener('input', (event) => {
    audio.volume = event.target.value;
});

seekBar.addEventListener('input', (event) => {
    audio.currentTime = (audio.duration * event.target.value) / 100;
});

audio.addEventListener('timeupdate', () => {
    seekBar.value = (audio.currentTime / audio.duration) * 100;
});

function loadTrack(index) {
    const file = audioFiles[index];
    const fileURL = URL.createObjectURL(file);
    audio.src = fileURL;
    isPlaying = false;
    playPauseBtn.textContent = '▶️';
}
