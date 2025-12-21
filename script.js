// ========================================
// iOS Portfolio - Advanced Interactions
// ========================================

// State Management
let currentScreen = 'homeScreen';
let touchStartX = 0;
let touchStartY = 0;
let isDragging = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupDarkMode();
    setupNavigation();
    setupGestures();
    setupAnimations();
    updateStatusBar();
    animateProgressBars();
});

// ========================================
// App Initialization
// ========================================

function initializeApp() {
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Add entrance animations
    setTimeout(() => {
        document.querySelectorAll('.profile-card, .action-btn, .info-card').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate-in');
            }, index * 50);
        });
    }, 300);

    // Animate stat numbers
    animateStats();

    // Add sparkle effect on profile card
    addSparkleEffect();
}

// Animate stat counters
function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text);

        if (!isNaN(number)) {
            stat.textContent = '0';
            let current = 0;
            const increment = number / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    stat.textContent = text;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + (text.includes('+') ? '+' : '');
                }
            }, 30);
        }
    });
}

// Add sparkle particles to profile card
function addSparkleEffect() {
    const profileCard = document.querySelector('.profile-card');
    if (!profileCard) return;

    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.background = 'rgba(0, 122, 255, 0.6)';
        sparkle.style.borderRadius = '50%';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'sparkle 1.5s ease-out forwards';

        profileCard.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1500);
    }, 2000);
}

// Sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(0) translateY(0);
            opacity: 1;
        }
        100% {
            transform: scale(1) translateY(-20px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// ========================================
// Dark Mode
// ========================================

function setupDarkMode() {
    const toggleBtn = document.getElementById('themeToggle');

    if (!toggleBtn) {
        console.warn('Theme toggle button not found');
        return;
    }

    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Add haptic effect
        toggleBtn.classList.add('haptic');
        setTimeout(() => toggleBtn.classList.remove('haptic'), 100);

        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Animate theme change
        document.body.style.transition = 'all 0.3s ease';
    });
}

// ========================================
// Navigation System
// ========================================

function setupNavigation() {
    // Tab Bar Navigation
    const tabItems = document.querySelectorAll('.tab-item');
    tabItems.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetScreen = tab.getAttribute('data-screen');
            navigateToScreen(targetScreen);

            // Update active tab
            tabItems.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Haptic feedback
            tab.classList.add('haptic');
            setTimeout(() => tab.classList.remove('haptic'), 100);
        });
    });

    // Action Buttons Navigation
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetScreen = btn.getAttribute('data-screen');
            navigateToScreen(targetScreen);
            updateTabBar(targetScreen);
        });
    });

    // Back Button Navigation
    const backBtns = document.querySelectorAll('.nav-back');
    backBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navigateToScreen('homeScreen');
            updateTabBar('homeScreen');
        });
    });
}

function navigateToScreen(targetScreen) {
    if (targetScreen === currentScreen) return;

    const currentScreenEl = document.getElementById(currentScreen);
    const targetScreenEl = document.getElementById(targetScreen);

    // Exit animation for current screen
    if (currentScreenEl) {
        currentScreenEl.classList.remove('active');
        currentScreenEl.classList.add('exit-left');

        setTimeout(() => {
            currentScreenEl.classList.remove('exit-left');
        }, 350);
    }

    // Enter animation for target screen
    if (targetScreenEl) {
        targetScreenEl.classList.add('active');

        // Scroll to top
        setTimeout(() => {
            targetScreenEl.scrollTop = 0;
        }, 50);
    }

    currentScreen = targetScreen;
}

function updateTabBar(screenId) {
    const tabItems = document.querySelectorAll('.tab-item');
    tabItems.forEach(tab => {
        if (tab.getAttribute('data-screen') === screenId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

// ========================================
// Touch Gestures
// ========================================

function setupGestures() {
    const screens = document.querySelectorAll('.screen');

    screens.forEach(screen => {
        let startX = 0;
        let currentX = 0;

        screen.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        screen.addEventListener('touchmove', (e) => {
            if (!startX) return;

            currentX = e.touches[0].clientX;
            const diffX = currentX - startX;
            const diffY = Math.abs(e.touches[0].clientY - touchStartY);

            // Only handle horizontal swipes
            if (Math.abs(diffX) > diffY && Math.abs(diffX) > 10) {
                isDragging = true;
            }
        }, { passive: true });

        screen.addEventListener('touchend', (e) => {
            if (!isDragging) {
                startX = 0;
                return;
            }

            const diffX = currentX - startX;

            // Swipe right to go back (only on non-home screens)
            if (diffX > 80 && screen.id !== 'homeScreen') {
                navigateToScreen('homeScreen');
                updateTabBar('homeScreen');
            }

            startX = 0;
            currentX = 0;
            isDragging = false;
        }, { passive: true });
    });
}

// ========================================
// Animations
// ========================================

function setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.app-card, .list-item');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`;
        observer.observe(el);
    });

    // Interactive card press effects
    const interactiveCards = document.querySelectorAll('.action-btn, .app-card, .list-item.interactive');
    interactiveCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.97)';
        }, { passive: true });

        card.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });
    });
}

function animateProgressBars() {
    // Animate skill progress bars when skills screen is visible
    const skillsScreen = document.getElementById('skillsScreen');
    if (!skillsScreen) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = skillsScreen.querySelectorAll('.progress-bar');
                progressBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.width = bar.style.width || '0%';
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(skillsScreen);
}

// ========================================
// Status Bar
// ========================================

function updateStatusBar() {
    const timeEl = document.getElementById('statusTime');

    if (!timeEl) {
        console.warn('Status time element not found');
        return;
    }

    function updateTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeEl.textContent = `${hours}:${minutes}`;
    }

    updateTime();
    setInterval(updateTime, 60000); // Update every minute
}

// ========================================
// Link Interactions
// ========================================

// Smooth email and social link handling
document.querySelectorAll('.list-item.interactive').forEach(item => {
    item.addEventListener('click', function(e) {
        // Add visual feedback
        this.style.backgroundColor = 'var(--fill-primary)';
        setTimeout(() => {
            this.style.backgroundColor = '';
        }, 200);
    });
});

// ========================================
// Keyboard Shortcuts (for desktop)
// ========================================

document.addEventListener('keydown', (e) => {
    // ESC to go back to home
    if (e.key === 'Escape' && currentScreen !== 'homeScreen') {
        navigateToScreen('homeScreen');
        updateTabBar('homeScreen');
    }

    // Number keys for quick navigation
    const keyMap = {
        '1': 'homeScreen',
        '2': 'aboutScreen',
        '3': 'projectsScreen',
        '4': 'contactScreen'
    };

    if (keyMap[e.key]) {
        navigateToScreen(keyMap[e.key]);
        updateTabBar(keyMap[e.key]);
    }

    // D for dark mode toggle
    if (e.key === 'd' || e.key === 'D') {
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) toggleBtn.click();
    }
});

// ========================================
// Performance Optimizations
// ========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// Easter Eggs & Fun Interactions
// ========================================

// Triple tap on profile avatar to trigger animation
let tapCount = 0;
let tapTimer;

const avatar = document.querySelector('.avatar-circle');
if (avatar) {
    avatar.addEventListener('click', () => {
        tapCount++;

        if (tapCount === 1) {
            tapTimer = setTimeout(() => {
                tapCount = 0;
            }, 500);
        }

        if (tapCount === 3) {
            clearTimeout(tapTimer);
            tapCount = 0;

            // Fun animation
            avatar.style.animation = 'spin 0.5s ease';
            setTimeout(() => {
                avatar.style.animation = '';
            }, 500);
        }
    });
}

// Spin animation keyframe
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ========================================
// Console Art
// ========================================

console.log('%c👋 Welcome to my iOS Portfolio!', 'color: #007AFF; font-size: 20px; font-weight: bold;');
console.log('%c📱 Built with pure HTML, CSS, and JavaScript', 'color: #8E8E93; font-size: 14px;');
console.log('%c✨ Designed with Apple\'s Human Interface Guidelines', 'color: #007AFF; font-size: 14px;');
console.log('%c🎨 Supports Light & Dark Mode', 'color: #34C759; font-size: 14px;');
console.log('%c\nKeyboard Shortcuts:', 'color: #FF9500; font-size: 16px; font-weight: bold;');
console.log('%c1-4: Navigate between screens', 'color: #8E8E93; font-size: 12px;');
console.log('%cD: Toggle dark mode', 'color: #8E8E93; font-size: 12px;');
console.log('%cESC: Back to home', 'color: #8E8E93; font-size: 12px;');
console.log('%c\n💼 Looking for an iOS Developer?', 'color: #007AFF; font-size: 16px; font-weight: bold;');
console.log('%cLet\'s connect!', 'color: #007AFF; font-size: 14px;');

// ========================================
// Service Worker (for PWA capabilities)
// ========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Optional: Uncomment to enable PWA
        // navigator.serviceWorker.register('/sw.js');
    });
}

// ========================================
// Screen Wake Lock (prevent screen from sleeping)
// ========================================

let wakeLock = null;

async function requestWakeLock() {
    try {
        if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
        }
    } catch (err) {
        console.log('Wake Lock error:', err);
    }
}

// Request wake lock when app is visible
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        requestWakeLock();
    }
});

// ========================================
// Accessibility Enhancements
// ========================================

// Announce screen changes to screen readers
function announceScreenChange(screenName) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Navigated to ${screenName} screen`;
    document.body.appendChild(announcement);

    setTimeout(() => {
        announcement.remove();
    }, 1000);
}

// Add sr-only class for screen readers
const srOnlyStyle = document.createElement('style');
srOnlyStyle.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border-width: 0;
    }
`;
document.head.appendChild(srOnlyStyle);

// ========================================
// Initialize on load
// ========================================

console.log('%c✅ App initialized successfully', 'color: #34C759; font-size: 14px; font-weight: bold;');
