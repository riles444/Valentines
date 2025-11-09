// Initialize app in a robust way so listeners attach whether the script runs
// before or after DOMContentLoaded. Also guard against missing elements so
// runtime errors don't prevent buttons from working.
function init() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const response = document.getElementById('response');
    let noBtnClickCount = 0;

    // Create floating hearts background if container exists
    if (document.querySelector('.floating-hearts')) createFloatingHearts();

    if (noBtn) {
        // Make the "No" button run away from the cursor
        noBtn.addEventListener('mouseover', (e) => {
            const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
            const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
            noBtn.style.position = 'fixed';
            noBtn.style.top = `${y}px`;
            noBtn.style.left = `${x}px`;
        });

        // Handle "No" button clicks
        noBtn.addEventListener('click', () => {
            noBtnClickCount++;
            const messages = [
                "Are you sure? 🥺",
                "Pretty please? 💝",
                "Think again! 🌹",
                "You're breaking my heart! 💔",
                "One more chance? 🎀"
            ];
            if (response) response.textContent = messages[noBtnClickCount % messages.length];
            shakeCard();
        });
    }

    if (yesBtn) {
        // Handle "Yes" button click
        yesBtn.addEventListener('click', () => {
            const container = document.querySelector('.container');
            if (!container) return;

            // Replace content with celebration card
            container.innerHTML = `
                <div class="card celebration-card">
                    <div class="heart-container">
                        <div class="heart-front"></div>
                        <div class="heart-back"></div>
                    </div>
                    <h1>Yay! ❤️</h1>
                    <p class="message">You've made me the happiest person alive!</p>
                    <p class="message">I promise to make every day special with you.</p>
                    <div class="celebration-photos">
                        <img src="US/IMG-20250607-WA0018.jpg" class="photo" alt="Celebration 1">
                        <img src="US/1000096200.jpg" class="photo" alt="Celebration 2">
                        <img src="US/WhatsApp Image 2025-11-09 at 20.26.44.jpeg" class="photo" alt="Celebration 3">
                    </div>
                </div>
            `;

            // Create celebration effects
            createHeartConfetti();
            activateCelebration();
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM already ready
    init();
}

// Create floating hearts in the background
function createFloatingHearts() {
    const floatingHeartsContainer = document.querySelector('.floating-hearts');
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 15}s`;
        heart.style.opacity = `${Math.random() * 0.5 + 0.1}`;
        heart.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
        floatingHeartsContainer.appendChild(heart);
    }
}

// Shake card animation for "No" clicks
function shakeCard() {
    const card = document.querySelector('.card');
    card.style.animation = 'none';
    card.offsetHeight; // Trigger reflow
    card.style.animation = 'shake 0.5s ease-in-out';
}

// Create heart confetti celebration
function createHeartConfetti() {
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '-20px';
        heart.style.opacity = '0';
        heart.style.transform = 'translateY(0)';
        heart.style.transition = 'all ' + (Math.random() * 2 + 1) + 's ease';
        heart.style.zIndex = '1000';
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.style.opacity = '1';
            heart.style.transform = `translateY(${window.innerHeight + 20}px) rotate(${Math.random() * 360}deg)`;
        }, 100);

        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
}

// Activate celebration effects
function activateCelebration() {
    const celebration = document.querySelector('.celebration');
    celebration.classList.add('active');
    
    // Add fireworks effect
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFirework();
        }, i * 300);
    }
}

// Create firework effect
function createFirework() {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = Math.random() * 100 + 'vw';
    firework.style.top = Math.random() * 100 + 'vh';
    document.querySelector('.celebration').appendChild(firework);

    setTimeout(() => {
        firework.remove();
    }, 1000);
}