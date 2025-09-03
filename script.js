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

// JavaScript para el control avanzado de audio
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const audio = document.getElementById('backgroundMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseIcon = document.getElementById('playPauseIcon');
    const muteBtn = document.getElementById('muteBtn');
    const muteIcon = document.getElementById('muteIcon');
    const loopBtn = document.getElementById('loopBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    const songStatus = document.getElementById('songStatus');
    const canvas = document.getElementById('audioVisualizer');
    const ctx = canvas.getContext('2d');
    
    // Variables de estado
    let isPlaying = false;
    let isMuted = false;
    let isLooping = false;
    let audioContext, analyser, dataArray, source;
    let animationId;
    
    // Iconos SVG
    const playIcon = `<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />`;
    const pauseIcon = `<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v6a1 1 0 11-2 0V7zM12 7a1 1 0 012 0v6a1 1 0 11-2 0V7z" clip-rule="evenodd" />`;
    const soundIcon = `<path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.804L4.828 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.828l3.555-3.804A1 1 0 019.383 3.076zM12 6.414c0-.894.894-1.561 1.75-.957a5 5 0 010 9.086c-.856.604-1.75-.063-1.75-.957V6.414z" clip-rule="evenodd" />`;
    const mutedIcon = `<path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.804L4.828 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.828l3.555-3.804A1 1 0 019.383 3.076z" clip-rule="evenodd" /><path d="M15.707 6.293a1 1 0 010 1.414L13.414 10l2.293 2.293a1 1 0 01-1.414 1.414L12 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L10.586 10 8.293 7.707a1 1 0 011.414-1.414L12 8.586l2.293-2.293a1 1 0 011.414 0z" />`;
    
    // Configuración inicial
    audio.volume = 0.4;
    volumeSlider.value = 40;
    
    // Inicializar Web Audio API para visualización
    function initAudioContext() {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            source = audioContext.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            
            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
            
            return true;
        } catch (error) {
            console.log('Web Audio API no disponible:', error);
            return false;
        }
    }
    
    // Visualizador de frecuencia
    function drawVisualizer() {
        if (!analyser) return;
        
        analyser.getByteFrequencyData(dataArray);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const barWidth = canvas.width / dataArray.length * 2;
        let barHeight;
        let x = 0;
        
        // Gradiente para las barras
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#3b82f6');
        gradient.addColorStop(0.5, '#8b5cf6');
        gradient.addColorStop(1, '#ec4899');
        
        for (let i = 0; i < dataArray.length; i++) {
            barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            
            x += barWidth + 1;
        }
        
        if (isPlaying) {
            animationId = requestAnimationFrame(drawVisualizer);
        }
    }
    
    // Animación de visualizador inactivo
    function drawIdleVisualizer() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const barWidth = 4;
        const barCount = Math.floor(canvas.width / (barWidth + 2));
        
        for (let i = 0; i < barCount; i++) {
            const x = i * (barWidth + 2);
            const height = 8 + Math.sin(Date.now() * 0.003 + i * 0.5) * 4;
            
            ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
            ctx.fillRect(x, canvas.height - height, barWidth, height);
        }
        
        if (!isPlaying) {
            requestAnimationFrame(drawIdleVisualizer);
        }
    }
    
    // Función para reproducir/pausar
    async function togglePlayPause() {
        try {
            if (!audioContext) {
                if (!initAudioContext()) {
                    songStatus.textContent = 'Error: Audio no disponible';
                    return;
                }
            }
            
            if (audioContext.state === 'suspended') {
                await audioContext.resume();
            }
            
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
                playPauseIcon.innerHTML = playIcon;
                playPauseBtn.classList.remove('active');
                songStatus.textContent = 'Pausado';
                cancelAnimationFrame(animationId);
                drawIdleVisualizer();
            } else {
                await audio.play();
                isPlaying = true;
                playPauseIcon.innerHTML = pauseIcon;
                playPauseBtn.classList.add('active');
                songStatus.textContent = 'Reproduciendo...';
                drawVisualizer();
            }
        } catch (error) {
            console.error('Error de reproducción:', error);
            songStatus.textContent = 'Error: ' + error.message;
        }
    }
    
    // Función para silenciar/activar
    function toggleMute() {
        if (isMuted) {
            audio.muted = false;
            isMuted = false;
            muteIcon.innerHTML = soundIcon;
            muteBtn.classList.remove('muted');
            volumeSlider.disabled = false;
        } else {
            audio.muted = true;
            isMuted = true;
            muteIcon.innerHTML = mutedIcon;
            muteBtn.classList.add('muted');
        }
    }
    
    // Función para alternar repetición
    function toggleLoop() {
        if (isLooping) {
            audio.loop = false;
            isLooping = false;
            loopBtn.classList.remove('loop-active');
        } else {
            audio.loop = true;
            isLooping = true;
            loopBtn.classList.add('loop-active');
        }
    }
    
    // Control de volumen
    function updateVolume() {
        const volume = volumeSlider.value / 100;
        audio.volume = volume;
        volumeValue.textContent = volumeSlider.value + '%';
    }
    
    // Event Listeners
    playPauseBtn.addEventListener('click', togglePlayPause);
    muteBtn.addEventListener('click', toggleMute);
    loopBtn.addEventListener('click', toggleLoop);
    volumeSlider.addEventListener('input', updateVolume);
    
    // Event listeners del audio
    audio.addEventListener('loadeddata', () => {
        songStatus.textContent = 'Listo para reproducir';
    });
    
    audio.addEventListener('error', (e) => {
        songStatus.textContent = 'Error: Archivo no válido';
        console.error('Error de audio:', e);
    });
    
    audio.addEventListener('ended', () => {
        if (!isLooping) {
            isPlaying = false;
            playPauseIcon.innerHTML = playIcon;
            playPauseBtn.classList.remove('active');
            songStatus.textContent = 'Finalizado';
            cancelAnimationFrame(animationId);
            drawIdleVisualizer();
        }
    });
    
    // Inicializar visualizador inactivo
    drawIdleVisualizer();
    
    // Estado inicial
    songStatus.textContent = 'Cargando...';
});

