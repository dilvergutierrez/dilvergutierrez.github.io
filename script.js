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

