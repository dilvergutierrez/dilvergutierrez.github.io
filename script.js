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

// JavaScript para controlar el audio
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('backgroundMusic');
    const toggleButton = document.getElementById('audioToggle');
    const audioIcon = document.getElementById('audioIcon');
    let isPlaying = false;
    let isMuted = false;
	

    // Iconos SVG
    const soundOnIcon = `<path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.804L4.828 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.828l3.555-3.804A1 1 0 019.383 3.076zM12 6.414c0-.894.894-1.561 1.75-.957a5 5 0 010 9.086c-.856.604-1.75-.063-1.75-.957V6.414zm0 4.828c0-.547.547-.961 1.067-.683a2 2 0 010 3.682c-.52.278-1.067-.136-1.067-.683v-2.316z" clip-rule="evenodd" />`;
    
    const soundOffIcon = `<path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.804L4.828 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.828l3.555-3.804A1 1 0 019.383 3.076z" clip-rule="evenodd" /><path d="M15.707 6.293a1 1 0 010 1.414L13.414 10l2.293 2.293a1 1 0 01-1.414 1.414L12 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L10.586 10 8.293 7.707a1 1 0 011.414-1.414L12 8.586l2.293-2.293a1 1 0 011.414 0z" />`;

	audioIcon.innerHTML = soundOffIcon;
	toggleButton.classList.add('muted');
    // Función para alternar entre reproducir y silenciar
    function toggleAudio() {
        if (!isPlaying && !isMuted) {
            // Primera vez: comenzar a reproducir
            audio.play().then(() => {
                isPlaying = true;
                updateButton();
            }).catch(error => {
                console.log('Error al reproducir audio:', error);
            });
        } else if (isPlaying && !isMuted) {
            // Silenciar
            audio.muted = true;
            isMuted = true;
            toggleButton.classList.add('muted');
            updateButton();
        } else if (isMuted) {
            // Reactivar sonido
            audio.muted = false;
            isMuted = false;
            toggleButton.classList.remove('muted');
            updateButton();
        }
    }

    // Actualizar el icono del botón
    function updateButton() {
        if (isMuted) {
            audioIcon.innerHTML = soundOffIcon;
        } else {
            audioIcon.innerHTML = soundOnIcon;
        }
    }

    // Event listener para el botón
    toggleButton.addEventListener('click', toggleAudio);

    // Configurar volumen inicial (opcional)
    audio.volume = 0.3; // 30% del volumen máximo

    // Auto-reproducir después de una interacción del usuario (recomendado)
    // Descomenta las siguientes líneas si quieres auto-reproducir:
    /*
    document.addEventListener('click', function startAudio() {
        if (!isPlaying) {
            toggleAudio();
        }
        document.removeEventListener('click', startAudio);
    }, { once: true });
    */
});