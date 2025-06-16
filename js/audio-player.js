document.addEventListener('DOMContentLoaded', () => {
  const audio = document.querySelector('.audio');
  const playPauseBtn = document.querySelector('.play-pause');
  const playIcon = document.querySelector('.play-icon');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');
  const volumeControl = document.querySelector('.volume-control');
  const volumeButton = volumeControl.querySelector('.volume-button');
  const volumeSlider = volumeControl.querySelector('.volume-slider');
  const volumePopup = volumeControl.querySelector('.volume-slider-popup');
  const playlistItems = Array.from(document.querySelectorAll('.playlist li'));
  const progressContainer = document.querySelector('.progress-container');
  const progressFill = document.querySelector('.progress-fill');
  const timeDisplay = document.querySelector('.time-display');

  let currentTrackIndex = 0;
  const fadeDuration = 500;
  let isFading = false;

  function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function updateTimeDisplay() {
    const current = formatTime(audio.currentTime);
    const total = formatTime(audio.duration);
    timeDisplay.textContent = `${current} / ${total}`;
  }

  function updateProgressBar() {
    if (!isNaN(audio.duration)) {
      const percent = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = `${percent}%`;
    }
  }

  function setPlayIcon() {
    playIcon.className = 'fa-solid fa-play';
  }

  function setPauseIcon() {
    playIcon.className = 'fa-solid fa-pause fa-fw';
  }

  function fadeIn(audioEl, targetVolume, duration = fadeDuration) {
    let startTime = null;
    isFading = true;
    audioEl.volume = 0;

    function step(now) {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      audioEl.volume = targetVolume * progress;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        audioEl.volume = targetVolume;
        isFading = false;
      }
    }

    requestAnimationFrame(step);
  }

  function fadeOut(audioEl, duration = fadeDuration, onComplete = () => {}) {
    const startVolume = audioEl.volume;
    let startTime = null;
    isFading = true;

    function step(now) {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      audioEl.volume = startVolume * (1 - progress);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        audioEl.volume = 0;
        audioEl.pause();
        isFading = false;
        onComplete();
      }
    }

    requestAnimationFrame(step);
  }

  function highlightTrack(index) {
    playlistItems.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
    currentTrackIndex = index;
  }

  function loadTrack(index) {
    const track = playlistItems[index];
    if (!track) return;
    audio.src = track.getAttribute('data-src');
    highlightTrack(index);
  }

  function playTrack() {
    audio.play().then(setPauseIcon).catch(console.error);
  }

  function pauseTrack() {
    fadeOut(audio, fadeDuration, setPlayIcon);
  }

  function togglePlayPause() {
    if (isFading) return;
    if (audio.paused) {
      fadeIn(audio, parseFloat(volumeSlider.value));
      playTrack();
    } else {
      pauseTrack();
    }
  }

  function switchTrack(index) {
    if (index === currentTrackIndex) return;
    if (!audio.paused) {
      fadeOut(audio, fadeDuration, () => {
        loadTrack(index);
        playTrack();
        fadeIn(audio, parseFloat(volumeSlider.value));
      });
    } else {
      loadTrack(index);
    }
  }

  function playNext() {
    const nextIndex = (currentTrackIndex + 1) % playlistItems.length;
    switchTrack(nextIndex);
  }

  function playPrev() {
    const prevIndex = (currentTrackIndex - 1 + playlistItems.length) % playlistItems.length;
    switchTrack(prevIndex);
  }

  // Event bindings
  playPauseBtn.addEventListener('click', togglePlayPause);
  nextBtn.addEventListener('click', playNext);
  prevBtn.addEventListener('click', playPrev);
  volumeButton.addEventListener('click', () => {
    volumeControl.classList.toggle('active');
  });
  volumeSlider.addEventListener('input', () => {
    audio.volume = parseFloat(volumeSlider.value);
  });
  audio.addEventListener('ended', playNext);
  audio.addEventListener('timeupdate', () => {
    updateProgressBar();
    updateTimeDisplay();
  });
  audio.addEventListener('loadedmetadata', updateTimeDisplay);
  progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
  });
  playlistItems.forEach((item, index) => {
    item.addEventListener('click', () => switchTrack(index));
  });

  // Initial load
  loadTrack(currentTrackIndex);
});