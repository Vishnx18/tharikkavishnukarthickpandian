// ------------------------------
// CONFIGURATION
// ------------------------------
const CONFIG = {
  birthdayISO: "2025-03-18T00:00:00", // Change if needed
  name: "Tharikka",
  musicFile: "birthday her.mp3", // Make sure it's in the same folder
  singleImage: "pic1.jpg.jpg" // Use one main photo (matches workspace file)
};

// ------------------------------
// CONFETTI EFFECT
// ------------------------------
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');
let confettiPieces = [];

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createConfetti() {
  const colors = ['#00bfa6', '#14ffec', '#ffffff', '#6fffe9'];
  for (let i = 0; i < 100; i++) {
    confettiPieces.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 50 + 50,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngleIncremental: Math.random() * 0.07 + 0.05,
      tiltAngle: 0
    });
  }
}
createConfetti();

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach(p => {
    ctx.beginPath();
    ctx.lineWidth = p.r / 2;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
    ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
    ctx.stroke();
  });
  updateConfetti();
  requestAnimationFrame(drawConfetti);
}

function updateConfetti() {
  confettiPieces.forEach(p => {
    p.tiltAngle += p.tiltAngleIncremental;
    p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
    p.tilt = Math.sin(p.tiltAngle - p.r / 2) * 15;
    if (p.y > confettiCanvas.height) {
      p.x = Math.random() * confettiCanvas.width;
      p.y = -10;
    }
  });
}
drawConfetti();

// ------------------------------
// COUNTDOWN
// ------------------------------
const countdownEl = document.getElementById('countdown');
function updateCountdown() {
  const now = new Date();
  const eventDate = new Date(CONFIG.birthdayISO);
  const diff = eventDate - now;
  if (diff <= 0) {
    countdownEl.innerHTML = "🎉 It's her special day!";
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// ------------------------------
// REVEAL SURPRISE MESSAGE
// ------------------------------
document.getElementById('revealBtn').addEventListener('click', () => {
  const note = document.getElementById('hiddenNote');
  if (note.style.display === 'none') {
    note.style.display = 'block';
  } else {
    note.style.display = 'none';
  }
});

// ------------------------------
// PLAY MUSIC (use existing <audio id="bgMusic"> element)
// ------------------------------
const musicEl = document.getElementById('bgMusic');
const playBtn = document.getElementById('playMusic');
if (musicEl && playBtn) {
  // ensure the audio element points to the actual file present in the project
  // (index.html already sets src to the file found in the workspace)
  musicEl.loop = true;
  playBtn.addEventListener('click', async () => {
    try {
      await musicEl.play();
      playBtn.textContent = 'Playing 🎵';
    } catch (err) {
      // Inform the user if playback failed (browser may block autoplay in some contexts)
      console.warn('Playback failed:', err);
      alert('Playback failed — please check your browser or click the play button again.');
    }
  });
} else {
  // fallback: if element missing, still try to use CONFIG as before
  const music = new Audio(CONFIG.musicFile);
  document.getElementById('playMusic')?.addEventListener('click', () => {
    music.play();
    music.loop = true;
  });
}

// ------------------------------
// IMAGE SETUP
// ------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const slideshow = document.querySelector('.slideshow');
  if (slideshow) {
    const img = document.createElement('div');
    img.classList.add('slide');
    img.style.backgroundImage = `url('${CONFIG.singleImage}')`;
    slideshow.appendChild(img);
  }
});
