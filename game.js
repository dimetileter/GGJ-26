/**
 * MASQUERADE GAME - Game Logic
 * Handles drag-and-drop and click interactions for mask wearing
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const maskDock = document.getElementById('mask-dock');
    const maskSlot = document.getElementById('mask-slot');
    const characterArea = document.getElementById('character-area');
    const removeBtn = document.getElementById('remove-btn');
    const maskItems = document.querySelectorAll('.mask-item');

    // Current state
    let currentMask = null;
    let selectedMaskItem = null;

    // ==========================================
    // AUDIO SYSTEM - Synthesized Sound Effects
    // ==========================================

    let audioContext = null;

    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioContext;
    }

    // Sound effect definitions for each mask
    const maskSounds = {
        // Kelebek - Hafif, uçuşan, parlak sesler
        butterfly: () => {
            const ctx = initAudio();
            const now = ctx.currentTime;

            // Sparkle sweep sound
            for (let i = 0; i < 5; i++) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.type = 'sine';
                osc.frequency.setValueAtTime(800 + i * 200, now + i * 0.05);
                osc.frequency.exponentialRampToValueAtTime(1200 + i * 300, now + i * 0.05 + 0.1);

                gain.gain.setValueAtTime(0.15, now + i * 0.05);
                gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.15);

                osc.start(now + i * 0.05);
                osc.stop(now + i * 0.05 + 0.2);
            }
        },

        // Venedik - Zarif, klasik, derin tonlar
        venetian: () => {
            const ctx = initAudio();
            const now = ctx.currentTime;

            // Elegant chord
            const frequencies = [261.63, 329.63, 392.00]; // C major chord
            frequencies.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now);

                gain.gain.setValueAtTime(0.12, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

                osc.start(now + i * 0.02);
                osc.stop(now + 0.7);
            });
        },

        // Tüylü - Doğal, yumuşak, hışırtı sesi
        feathered: () => {
            const ctx = initAudio();
            const now = ctx.currentTime;

            // Soft whoosh with noise
            const bufferSize = ctx.sampleRate * 0.3;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / bufferSize);
            }

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(2000, now);
            filter.Q.setValueAtTime(1, now);

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            noise.start(now);
            noise.stop(now + 0.3);
        },

        // Altın - Metalik çınlama sesi
        golden: () => {
            const ctx = initAudio();
            const now = ctx.currentTime;

            // Metallic chime
            const frequencies = [1046.50, 1318.51, 1567.98, 2093.00]; // High C major
            frequencies.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);

                // Add slight vibrato for metallic effect
                const vibrato = ctx.createOscillator();
                const vibratoGain = ctx.createGain();
                vibrato.frequency.setValueAtTime(8, now);
                vibratoGain.gain.setValueAtTime(3, now);
                vibrato.connect(vibratoGain);
                vibratoGain.connect(osc.frequency);
                vibrato.start(now);
                vibrato.stop(now + 0.8);

                gain.gain.setValueAtTime(0.1, now + i * 0.03);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

                osc.start(now + i * 0.03);
                osc.stop(now + 0.9);
            });
        },

        // Gümüş - Kristal, berrak sesler
        silver: () => {
            const ctx = initAudio();
            const now = ctx.currentTime;

            // Crystal bell sound
            for (let i = 0; i < 3; i++) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.type = 'sine';
                const baseFreq = 1500 + i * 500;
                osc.frequency.setValueAtTime(baseFreq, now + i * 0.1);
                osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.98, now + i * 0.1 + 0.5);

                gain.gain.setValueAtTime(0.08, now + i * 0.1);
                gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.6);

                osc.start(now + i * 0.1);
                osc.stop(now + i * 0.1 + 0.7);
            }
        },

        // Mistik - Büyülü, gizemli, eteryal sesler
        mystic: () => {
            const ctx = initAudio();
            const now = ctx.currentTime;

            // Magical shimmer with detuned oscillators
            const baseFreq = 440;
            for (let i = 0; i < 4; i++) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.type = 'sine';
                // Slightly detuned for ethereal effect
                osc.frequency.setValueAtTime(baseFreq * (1 + i * 0.01), now);
                osc.frequency.exponentialRampToValueAtTime(baseFreq * 2 * (1 + i * 0.01), now + 0.5);

                gain.gain.setValueAtTime(0.08, now);
                gain.gain.linearRampToValueAtTime(0.12, now + 0.2);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

                osc.start(now);
                osc.stop(now + 0.9);
            }

            // Add mystical reverb-like effect with delayed echoes
            for (let i = 1; i <= 3; i++) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.type = 'sine';
                osc.frequency.setValueAtTime(880, now + i * 0.15);

                gain.gain.setValueAtTime(0.04 / i, now + i * 0.15);
                gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.4);

                osc.start(now + i * 0.15);
                osc.stop(now + i * 0.15 + 0.5);
            }
        }
    };

    // Play mask-specific sound
    function playMaskSound(maskType) {
        try {
            if (maskSounds[maskType]) {
                maskSounds[maskType]();
            }
        } catch (e) {
            console.log('Audio not available:', e);
        }
    }

    // Remove sound effect
    function playRemoveSound() {
        try {
            const ctx = initAudio();
            const now = ctx.currentTime;

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);

            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

            osc.start(now);
            osc.stop(now + 0.3);
        } catch (e) {
            console.log('Audio not available:', e);
        }
    }

    // ==========================================
    // DRAG AND DROP FUNCTIONALITY
    // ==========================================

    // Handle drag start
    maskItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.dataset.mask);
            item.classList.add('dragging');

            // Create a custom drag image
            const dragImage = item.querySelector('.mask').cloneNode(true);
            dragImage.style.position = 'absolute';
            dragImage.style.top = '-1000px';
            document.body.appendChild(dragImage);
            e.dataTransfer.setDragImage(dragImage, 40, 25);

            setTimeout(() => {
                document.body.removeChild(dragImage);
            }, 0);
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
    });

    // Handle drop zone (character area)
    characterArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        maskSlot.classList.add('drag-over');
    });

    characterArea.addEventListener('dragleave', (e) => {
        if (!characterArea.contains(e.relatedTarget)) {
            maskSlot.classList.remove('drag-over');
        }
    });

    characterArea.addEventListener('drop', (e) => {
        e.preventDefault();
        maskSlot.classList.remove('drag-over');

        const maskType = e.dataTransfer.getData('text/plain');
        if (maskType) {
            wearMask(maskType);
        }
    });

    // ==========================================
    // CLICK FUNCTIONALITY
    // ==========================================

    maskItems.forEach(item => {
        item.addEventListener('click', () => {
            const maskType = item.dataset.mask;

            // Update selection visual
            maskItems.forEach(m => m.classList.remove('selected'));
            item.classList.add('selected');
            selectedMaskItem = item;

            // Wear the mask
            wearMask(maskType);
        });
    });

    // ==========================================
    // MASK WEARING LOGIC
    // ==========================================

    function wearMask(maskType) {
        // Remove current mask if exists
        maskSlot.innerHTML = '';

        // Create new mask element
        const maskElement = createMaskElement(maskType);
        if (maskElement) {
            maskSlot.appendChild(maskElement);
            currentMask = maskType;

            // Play mask-specific sound effect
            playMaskSound(maskType);
            playWearEffect();
        }
    }

    function createMaskElement(maskType) {
        // Find the original mask in the dock
        const originalItem = document.querySelector(`[data-mask="${maskType}"]`);
        if (!originalItem) return null;

        // Clone the mask element
        const originalMask = originalItem.querySelector('.mask');
        const clonedMask = originalMask.cloneNode(true);

        return clonedMask;
    }

    function playWearEffect() {
        // Add a sparkle effect
        const sparkles = document.createElement('div');
        sparkles.innerHTML = '✨';
        sparkles.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 30px;
      pointer-events: none;
      animation: sparkleEffect 0.5s ease-out forwards;
    `;

        // Add animation keyframes if not exists
        if (!document.getElementById('sparkle-animation')) {
            const style = document.createElement('style');
            style.id = 'sparkle-animation';
            style.textContent = `
        @keyframes sparkleEffect {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(0.5); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
        }
      `;
            document.head.appendChild(style);
        }

        maskSlot.appendChild(sparkles);
        setTimeout(() => sparkles.remove(), 500);
    }

    // ==========================================
    // REMOVE MASK
    // ==========================================

    removeBtn.addEventListener('click', () => {
        if (currentMask) {
            // Play remove sound and effect
            playRemoveSound();
            playRemoveEffect();

            // Clear mask
            setTimeout(() => {
                maskSlot.innerHTML = '';
                currentMask = null;

                // Clear selection
                maskItems.forEach(m => m.classList.remove('selected'));
                selectedMaskItem = null;
            }, 200);
        }
    });

    function playRemoveEffect() {
        const currentMaskElement = maskSlot.querySelector('.mask');
        if (currentMaskElement) {
            currentMaskElement.style.animation = 'maskRemove 0.3s ease-in forwards';

            // Add animation keyframes if not exists
            if (!document.getElementById('remove-animation')) {
                const style = document.createElement('style');
                style.id = 'remove-animation';
                style.textContent = `
          @keyframes maskRemove {
            0% { opacity: 1; transform: scale(1.4); }
            100% { opacity: 0; transform: scale(0.5) translateY(-20px); }
          }
        `;
                document.head.appendChild(style);
            }
        }
    }

    // ==========================================
    // KEYBOARD SHORTCUTS
    // ==========================================

    document.addEventListener('keydown', (e) => {
        // Number keys 1-6 to select masks
        const num = parseInt(e.key);
        if (num >= 1 && num <= 6) {
            const items = Array.from(maskItems);
            if (items[num - 1]) {
                items[num - 1].click();
            }
        }

        // Escape or Delete to remove mask
        if (e.key === 'Escape' || e.key === 'Delete' || e.key === 'Backspace') {
            removeBtn.click();
        }
    });

    // ==========================================
    // TOUCH SUPPORT (Mobile)
    // ==========================================

    let touchStartItem = null;

    maskItems.forEach(item => {
        item.addEventListener('touchstart', (e) => {
            touchStartItem = item;
            item.classList.add('selected');
        });

        item.addEventListener('touchend', (e) => {
            if (touchStartItem === item) {
                const maskType = item.dataset.mask;
                wearMask(maskType);
            }
            touchStartItem = null;
        });
    });

    // ==========================================
    // EYE FOLLOW CURSOR (Fun feature)
    // ==========================================

    const pupils = document.querySelectorAll('.pupil');

    document.addEventListener('mousemove', (e) => {
        pupils.forEach(pupil => {
            const eye = pupil.parentElement;
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;

            const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
            const distance = Math.min(3, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 50);

            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            pupil.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        });
    });

    // ==========================================
    // INITIALIZATION
    // ==========================================

    console.log('🎭 Masquerade Game Loaded!');
    console.log('Instructions:');
    console.log('- Click on a mask or drag it to the character');
    console.log('- Press 1-6 to quickly select masks');
    console.log('- Press Escape to remove mask');
});
