/* ═══════════════════════════════════════════════════════
   HAPPY BIRTHDAY VANSHIKA - JAVASCRIPT
   Animations, Countdown, Confetti & Interactivity
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initScrollAnimations();
    initCountdown();
    initFloatingPetals();
    initHeroParticles();
    initLetterReveal();
    initNavDots();
    calculateAge();
});

/* ═══════════════════════════════════════════════════════
   CALCULATE AGE DYNAMICALLY
   ═══════════════════════════════════════════════════════ */
function calculateAge() {
    const dob = new Date('2003-06-27');
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    const ageEl = document.getElementById('age-number');
    if (ageEl) {
        ageEl.textContent = age;
    }
}

/* ═══════════════════════════════════════════════════════
   PRELOADER
   ═══════════════════════════════════════════════════════ */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) preloader.classList.add('hidden');
            // Trigger initial confetti burst
            setTimeout(() => {
                launchConfetti();
            }, 500);
        }, 2500);
    });

    // Fallback: Hide preloader after 5 seconds max
    setTimeout(() => {
        if (preloader) preloader.classList.add('hidden');
    }, 5000);
}

/* ═══════════════════════════════════════════════════════
   SCROLL ANIMATIONS (Intersection Observer)
   ═══════════════════════════════════════════════════════ */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(getComputedStyle(entry.target).getPropertyValue('--delay')) || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay * 1000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/* ═══════════════════════════════════════════════════════
   NAVIGATION DOTS
   ═══════════════════════════════════════════════════════ */
function initNavDots() {
    const dots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                dots.forEach(dot => {
                    dot.classList.toggle('active', dot.dataset.section === id);
                });
            }
        });
    }, {
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0.1
    });

    sections.forEach(section => observer.observe(section));
}

/* ═══════════════════════════════════════════════════════
   COUNTDOWN TIMER
   ═══════════════════════════════════════════════════════ */
function initCountdown() {
    // Birthday: June 27, 2026 at midnight IST
    const birthday = new Date('2026-06-27T00:00:00+05:30');
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const messageEl = document.getElementById('countdown-message');
    
    function updateCountdown() {
        const now = new Date();
        const diff = birthday - now;
        
        if (diff <= 0) {
            // Birthday has arrived!
            if (daysEl) daysEl.textContent = '🎉';
            if (hoursEl) hoursEl.textContent = '🎂';
            if (minutesEl) minutesEl.textContent = '🥳';
            if (secondsEl) secondsEl.textContent = '💕';
            if (messageEl) {
                messageEl.innerHTML = `
                    <strong style="font-size: 1.3rem; color: var(--primary-dark);">
                        🎉 Today is Vanshika's Birthday! Let's celebrate! 🎂
                    </strong>
                `;
            }
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        if (daysEl) animateNumber(daysEl, days);
        if (hoursEl) animateNumber(hoursEl, hours);
        if (minutesEl) animateNumber(minutesEl, minutes);
        if (secondsEl) animateNumber(secondsEl, seconds);
    }
    
    function animateNumber(element, value) {
        const formatted = value.toString().padStart(2, '0');
        if (element.textContent !== formatted) {
            element.style.transform = 'translateY(-5px)';
            element.style.opacity = '0.5';
            setTimeout(() => {
                element.textContent = formatted;
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            }, 150);
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ═══════════════════════════════════════════════════════
   FLOATING PETALS
   ═══════════════════════════════════════════════════════ */
function initFloatingPetals() {
    const container = document.getElementById('petals-container');
    if (!container) return;
    const petalEmojis = ['🌸', '💜', '🦋', '✨', '💕', '🌷', '💫', '🌺'];
    
    function createPetal() {
        const petal = document.createElement('span');
        petal.className = 'petal';
        petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
        
        const size = 0.8 + Math.random() * 1.5;
        const left = Math.random() * 100;
        const duration = 6 + Math.random() * 8;
        const delay = Math.random() * 2;
        
        petal.style.cssText = `
            left: ${left}%;
            --petal-size: ${size}rem;
            font-size: ${size}rem;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            opacity: ${0.4 + Math.random() * 0.4};
        `;
        
        container.appendChild(petal);
        
        // Remove after animation
        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
            }
        }, (duration + delay) * 1000);
    }
    
    // Create initial batch
    for (let i = 0; i < 8; i++) {
        setTimeout(createPetal, i * 400);
    }
    
    // Continuously create petals
    setInterval(createPetal, 2000);
}

/* ═══════════════════════════════════════════════════════
   HERO PARTICLES (Sparkle effect)
   ═══════════════════════════════════════════════════════ */
function initHeroParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;
    
    function createParticle() {
        const particle = document.createElement('div');
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = 2 + Math.random() * 4;
        const duration = 2 + Math.random() * 3;
        
        const colors = [
            'rgba(199,107,159,0.8)',
            'rgba(155,110,183,0.8)',
            'rgba(233,145,178,0.8)',
            'rgba(206,147,216,0.8)',
            'rgba(244,143,177,0.8)'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, ${color} 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            animation: particleGlow ${duration}s ease-in-out infinite;
            animation-delay: ${Math.random() * duration}s;
        `;
        
        container.appendChild(particle);
    }
    
    // Add particle glow keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleGlow {
            0%, 100% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 1; transform: scale(1.2); }
        }
    `;
    document.head.appendChild(style);
    
    for (let i = 0; i < 30; i++) {
        createParticle();
    }
}

/* ═══════════════════════════════════════════════════════
   LETTER REVEAL ANIMATION
   ═══════════════════════════════════════════════════════ */
function initLetterReveal() {
    const letterLines = document.querySelectorAll('.letter-line');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get index for staggered delay
                const lines = Array.from(letterLines);
                const index = lines.indexOf(entry.target);
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    });
    
    letterLines.forEach(line => observer.observe(line));
}

/* ═══════════════════════════════════════════════════════
   BLOW CANDLES INTERACTION
   ═══════════════════════════════════════════════════════ */
let isBlowingInProgress = false;

// Synthesize a breath/puff sound using the Web Audio API (completely client-side)
function playPuffSound(volume = 0.25, duration = 0.3) {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        
        // Generate white noise
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        
        // Lowpass filter sweeping downwards to simulate air blowing
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + duration);
        
        // Volume envelope (gain)
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        noise.start();
        noise.stop(ctx.currentTime + duration);
    } catch (e) {
        console.log('Audio Context error: ', e);
    }
}

// Generate physical smoke particles when a candle is extinguished
function triggerSmoke(candleElement) {
    for (let i = 0; i < 3; i++) {
        const smoke = document.createElement('div');
        smoke.className = 'smoke-particle';
        
        const size = 6 + Math.random() * 7;
        const drift = (Math.random() - 0.5) * 22; // left/right drift
        
        smoke.style.setProperty('--size', `${size}px`);
        smoke.style.setProperty('--drift', `${drift}px`);
        smoke.style.setProperty('--delay', `${i * 120}ms`);
        
        candleElement.appendChild(smoke);
        
        // Remove particles after animation completes
        setTimeout(() => {
            smoke.remove();
        }, 1500 + i * 120);
    }
}

// Blow an individual candle when clicked
function blowIndividualCandle(candleElement) {
    if (isBlowingInProgress) return;
    
    const flame = candleElement.querySelector('.flame');
    if (flame && !flame.classList.contains('blown')) {
        flame.classList.add('blown');
        
        // Play puff sound and show smoke
        playPuffSound(0.2, 0.25);
        triggerSmoke(candleElement);
        
        // Check if all candles are blown
        checkAllCandlesBlown();
    }
}

// Check if all flames are extinguished
function checkAllCandlesBlown() {
    const flames = document.querySelectorAll('.flame');
    const allBlown = Array.from(flames).every(f => f.classList.contains('blown'));
    
    if (allBlown) {
        showCelebration();
    }
}

// Reveal wishes and trigger massive confetti
function showCelebration() {
    isBlowingInProgress = true; // disable further candle clicks
    
    const btn = document.getElementById('blow-btn');
    const wishMsg = document.getElementById('wish-message');
    const cake = document.querySelector('.cake');
    
    // Add magical ambient glow to the cake
    if (cake) cake.classList.add('magical-glow');
    
    // Hide button and reveal wishes
    if (btn) btn.classList.add('hidden');
    
    setTimeout(() => {
        if (wishMsg) {
            wishMsg.classList.add('visible');
            
            // Multiple bursts of colorful confetti
            launchConfetti();
            setTimeout(launchConfetti, 600);
            setTimeout(launchConfetti, 1300);
            setTimeout(launchConfetti, 2200);
        }
    }, 400);
}

// Automatic blow all candles in a wave with a wind-sweep visual effect
function blowCandles() {
    if (isBlowingInProgress) return;
    isBlowingInProgress = true;
    
    const flames = document.querySelectorAll('.flame');
    const cakeWrapper = document.getElementById('cake-wrapper');
    
    // Create and animate the wind sweep line
    const wind = document.createElement('div');
    wind.className = 'wind-sweep';
    if (cakeWrapper) cakeWrapper.appendChild(wind);
    
    // Trigger CSS animation reflow
    setTimeout(() => {
        wind.classList.add('active');
        playPuffSound(0.5, 0.85); // louder breath sound for sweep
    }, 50);
    
    // Extinguish candles in a left-to-right sweep sequence
    flames.forEach((flame, index) => {
        setTimeout(() => {
            if (!flame.classList.contains('blown')) {
                flame.classList.add('blown');
                triggerSmoke(flame.parentElement);
            }
        }, index * 200 + 150);
    });
    
    // Clean up wind sweep element and launch celebration
    setTimeout(() => {
        wind.remove();
        showCelebration();
    }, flames.length * 200 + 400);
}

/* ═══════════════════════════════════════════════════════
   CONFETTI SYSTEM
   ═══════════════════════════════════════════════════════ */
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const colors = [
        '#c76b9f', '#9b6eb7', '#e991b2', '#ce93d8', 
        '#f48fb1', '#ba68c8', '#f06292', '#ab47bc',
        '#f8bbd0', '#e1bee7', '#ff69b4', '#dcd0f0'
    ];
    
    // Create confetti pieces
    for (let i = 0; i < 150; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: -20 - Math.random() * 100,
            width: 8 + Math.random() * 6,
            height: 4 + Math.random() * 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: 2 + Math.random() * 4,
            speedX: (Math.random() - 0.5) * 4,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            opacity: 0.8 + Math.random() * 0.2,
            shape: Math.random() > 0.5 ? 'rect' : 'circle'
        });
    }
    
    let animationId;
    let frameCount = 0;
    const maxFrames = 300; // ~5 seconds at 60fps
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let activeCount = 0;
        
        confettiPieces.forEach(piece => {
            if (piece.y < canvas.height + 20) {
                activeCount++;
                
                piece.x += piece.speedX;
                piece.y += piece.speedY;
                piece.rotation += piece.rotationSpeed;
                piece.speedY += 0.05; // gravity
                piece.speedX *= 0.99; // air resistance
                
                // Fade out near bottom
                if (piece.y > canvas.height - 100) {
                    piece.opacity *= 0.97;
                }
                
                ctx.save();
                ctx.translate(piece.x, piece.y);
                ctx.rotate((piece.rotation * Math.PI) / 180);
                ctx.globalAlpha = piece.opacity;
                ctx.fillStyle = piece.color;
                
                if (piece.shape === 'rect') {
                    ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
                } else {
                    ctx.beginPath();
                    ctx.arc(0, 0, piece.width / 2, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                ctx.restore();
            }
        });
        
        frameCount++;
        
        if (activeCount > 0 && frameCount < maxFrames) {
            animationId = requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cancelAnimationFrame(animationId);
        }
    }
    
    animate();
}

/* ═══════════════════════════════════════════════════════
   SMOOTH SCROLL FOR NAVIGATION
   ═══════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ═══════════════════════════════════════════════════════
   WINDOW RESIZE HANDLER
   ═══════════════════════════════════════════════════════ */
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const canvas = document.getElementById('confetti-canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }, 250);
});

/* ═══════════════════════════════════════════════════════
   MUSIC TOGGLE
   ═══════════════════════════════════════════════════════ */
const musicBtn = document.getElementById('music-toggle');
let isMusicPlaying = false;

const bgMusic = new Audio();
bgMusic.loop = true;
bgMusic.volume = 0.3;

if (musicBtn) {
    musicBtn.addEventListener('click', () => {
        if (bgMusic.src && bgMusic.src !== window.location.href) {
            if (isMusicPlaying) {
                bgMusic.pause();
                musicBtn.classList.remove('playing');
            } else {
                bgMusic.play().catch(() => {});
                musicBtn.classList.add('playing');
            }
            isMusicPlaying = !isMusicPlaying;
        }
    });
}

/* ═══════════════════════════════════════════════════════
   PARALLAX EFFECT ON SCROLL
   ═══════════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrollY < window.innerHeight) {
        hero.style.transform = `translateY(${scrollY * 0.3}px)`;
        hero.style.opacity = 1 - (scrollY / window.innerHeight) * 0.8;
    }
}, { passive: true });

/* ═══════════════════════════════════════════════════════
   EASTER EGG: Triple-click heart burst & click hearts
   ═══════════════════════════════════════════════════════ */
let clickCount = 0;
let clickTimer;

document.addEventListener('click', (e) => {
    // Avoid spawning hearts on buttons or interactive elements to prevent overlap
    if (e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('.candle')) {
        return;
    }

    clickCount++;
    
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
        clickCount = 0;
    }, 600);
    
    if (clickCount >= 3) {
        launchConfetti();
        clickCount = 0;
    }
    
    // Create a small heart at click position
    createClickHeart(e.clientX, e.clientY);
});

function createClickHeart(x, y) {
    const heart = document.createElement('span');
    const emojis = ['💜', '💕', '🌸', '✨', '💫'];
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 1.2rem;
        pointer-events: none;
        z-index: 9999;
        animation: clickHeartFloat 1.5s ease-out forwards;
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) heart.parentNode.removeChild(heart);
    }, 1500);
}

// Add click heart animation
const clickHeartStyle = document.createElement('style');
clickHeartStyle.textContent = `
    @keyframes clickHeartFloat {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.5);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, calc(-50% - 60px)) scale(1.3);
        }
    }
`;
document.head.appendChild(clickHeartStyle);

console.log('%c💜 Happy Birthday Vanshika! Made with love 💜', 
    'background: linear-gradient(135deg, #c76b9f, #9b6eb7); color: white; padding: 10px 20px; font-size: 16px; border-radius: 8px;');
