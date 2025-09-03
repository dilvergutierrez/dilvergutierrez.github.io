// CONFIGURACIÓN DEL CONTADOR
const countdownDate = new Date("September 20, 2025 21:00:00").getTime();

const countdownFunction = setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    // Cálculos de tiempo
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Mostrar el resultado en los elementos
    document.getElementById("days").innerText = Math.max(0, days).toString().padStart(2, '0');
    document.getElementById("hours").innerText = Math.max(0, hours).toString().padStart(2, '0');
    document.getElementById("minutes").innerText = Math.max(0, minutes).toString().padStart(2, '0');
    document.getElementById("seconds").innerText = Math.max(0, seconds).toString().padStart(2, '0');

    // Si la cuenta regresiva termina
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerHTML = "<div class='text-xl md:text-2xl font-bold text-white'>¡El gran día ha llegado!</div>";
    }
}, 1000);

// LÓGICA DE LA VENTANA MODAL
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');

function openModal(imageUrl) {
    modalImage.src = imageUrl;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
}

function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restaurar scroll del body
}

// Cierra el modal si se hace clic fuera de la imagen
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Cierra el modal con la tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// DESTELLOS LUMINOSOS INTEGRADOS
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Tamaños más grandes y aleatorios
    const size = Math.random() * 20 + 8;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Añadir clases para diferentes tipos de destello
    const twinkleTypes = ['', 'large', 'medium'];
    const randomType = twinkleTypes[Math.floor(Math.random() * twinkleTypes.length)];
    if (randomType) particle.classList.add(randomType);
    
    // Posiciones aleatorias
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Duración de animación aleatoria (4-6 veces por segundo)
    const frequency = Math.random() * 0.08 + 0.16;
    particle.style.animationDuration = frequency + 's';
    particle.style.animationDelay = Math.random() * 1 + 's';
    
    document.body.appendChild(particle);
}

// Crear múltiples partículas
for (let i = 0; i < 50; i++) {
    createParticle();
}

// Efecto de brillo al mover el mouse
document.addEventListener('mousemove', (e) => {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    sparkle.style.width = '12px';
    sparkle.style.height = '12px';
    sparkle.style.background = 'radial-gradient(circle, rgba(255,255,255,1) 0%, transparent 70%)';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '100';
    sparkle.style.boxShadow = '0 0 20px rgba(255,255,255,0.8)';
    sparkle.style.animation = 'fadeOut 1.5s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (document.body.contains(sparkle)) {
            document.body.removeChild(sparkle);
        }
    }, 1500);
});

// JavaScript para el reproductor de música
class MusicPlayer {
  constructor() {
    this.audio = document.getElementById('audioPlayer');
    this.playPauseBtn = document.getElementById('playPauseBtn');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.progressBar = document.querySelector('.progress-bar');
    this.progressFill = document.getElementById('progressFill');
    this.progressHandle = document.getElementById('progressHandle');
    this.currentTimeEl = document.getElementById('currentTime');
    this.durationEl = document.getElementById('duration');
    this.volumeBar = document.querySelector('.volume-bar');
    this.volumeFill = document.getElementById('volumeFill');
    this.volumeHandle = document.getElementById('volumeHandle');
    this.volumeBtn = document.getElementById('volumeBtn');
    this.visualizerBars = document.querySelectorAll('.bar');
    
    this.isPlaying = false;
    this.isDragging = false;
    this.isVolumeDragging = false;
    
    this.init();
  }
  
  init() {
    // Event listeners para controles
    this.playPauseBtn.addEventListener('click', () => this.togglePlay());
    this.prevBtn.addEventListener('click', () => this.previousTrack());
    this.nextBtn.addEventListener('click', () => this.nextTrack());
    
    // Event listeners para barra de progreso
    this.progressBar.addEventListener('click', (e) => this.seek(e));
    this.progressBar.addEventListener('mousedown', (e) => this.startDragging(e));
    
    // Event listeners para volumen
    this.volumeBar.addEventListener('click', (e) => this.setVolume(e));
    this.volumeBar.addEventListener('mousedown', (e) => this.startVolumeDragging(e));
    this.volumeBtn.addEventListener('click', () => this.toggleMute());
    
    // Event listeners para audio
    this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('ended', () => this.nextTrack());
    
    // Event listeners globales para drag
    document.addEventListener('mousemove', (e) => this.handleDrag(e));
    document.addEventListener('mouseup', () => this.stopDragging());
    
    // Inicializar visualizador
    this.startVisualizer();
    
    // Configurar volumen inicial
    this.audio.volume = 0.7;
    this.updateVolumeDisplay();
  }
  
  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
  
  play() {
    this.audio.play();
    this.isPlaying = true;
    document.querySelector('.play-icon').style.display = 'none';
    document.querySelector('.pause-icon').style.display = 'block';
    this.animateVisualizer();
  }
  
  pause() {
    this.audio.pause();
    this.isPlaying = false;
    document.querySelector('.play-icon').style.display = 'block';
    document.querySelector('.pause-icon').style.display = 'none';
    this.stopVisualizerAnimation();
  }
  
  previousTrack() {
    // Implementar lógica para canción anterior
    this.audio.currentTime = 0;
  }
  
  nextTrack() {
    // Implementar lógica para siguiente canción
    this.audio.currentTime = 0;
    if (this.isPlaying) {
      this.audio.play();
    }
  }
  
  seek(e) {
    const rect = this.progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    this.audio.currentTime = percent * this.audio.duration;
  }
  
  startDragging(e) {
    this.isDragging = true;
    this.seek(e);
  }
  
  handleDrag(e) {
    if (this.isDragging) {
      this.seek(e);
    }
    if (this.isVolumeDragging) {
      this.setVolume(e);
    }
  }
  
  stopDragging() {
    this.isDragging = false;
    this.isVolumeDragging = false;
  }
  
  setVolume(e) {
    const rect = this.volumeBar.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    this.audio.volume = percent;
    this.updateVolumeDisplay();
  }
  
  startVolumeDragging(e) {
    this.isVolumeDragging = true;
    this.setVolume(e);
  }
  
  toggleMute() {
    if (this.audio.volume > 0) {
      this.previousVolume = this.audio.volume;
      this.audio.volume = 0;
    } else {
      this.audio.volume = this.previousVolume || 0.7;
    }
    this.updateVolumeDisplay();
  }
  
  updateProgress() {
    if (!this.isDragging) {
      const percent = (this.audio.currentTime / this.audio.duration) * 100;
      this.progressFill.style.width = `${percent}%`;
      this.progressHandle.style.left = `${percent}%`;
    }
    
    this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
  }
  
  updateDuration() {
    this.durationEl.textContent = this.formatTime(this.audio.duration);
  }
  
  updateVolumeDisplay() {
    const percent = this.audio.volume * 100;
    this.volumeFill.style.width = `${percent}%`;
    this.volumeHandle.style.left = `${percent}%`;
  }
  
  formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  
  startVisualizer() {
    this.visualizerInterval = setInterval(() => {
      if (this.isPlaying) {
        this.updateVisualizerBars();
      }
    }, 100);
  }
  
  updateVisualizerBars() {
    this.visualizerBars.forEach(bar => {
      const height = Math.random() * 60 + 10;
      bar.style.height = `${height}px`;
    });
  }
  
  animateVisualizer() {
    this.visualizerBars.forEach(bar => {
      bar.style.animationPlayState = 'running';
    });
  }
  
  stopVisualizerAnimation() {
    this.visualizerBars.forEach(bar => {
      bar.style.animationPlayState = 'paused';
      bar.style.height = '10px';
    });
  }
}

// Inicializar el reproductor cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
  new MusicPlayer();
});