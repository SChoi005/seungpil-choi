document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  const photoTrigger = document.querySelector('.hero__photo-button');
  const photoModal = document.getElementById('photo-modal');
  const mediaModal = document.getElementById('media-modal');
  const mediaTriggerButtons = document.querySelectorAll('.project-card__media-button');
  const mediaModalImage = mediaModal?.querySelector('.media-modal__image');
  const mediaModalLabel = mediaModal?.querySelector('.media-modal__label');

  let lastFocusedElement = null;

  const toggleBodyScroll = () => {
    const isAnyModalOpen = Boolean(
      (photoModal && !photoModal.hidden) || (mediaModal && !mediaModal.hidden)
    );

    document.body.classList.toggle('modal-open', isAnyModalOpen);
  };

  if (photoTrigger && photoModal) {
    const closeButton = photoModal.querySelector('.photo-modal__close');
    const closeTargets = photoModal.querySelectorAll('[data-photo-close]');

    const openPhotoModal = () => {
      lastFocusedElement = document.activeElement;
      photoModal.hidden = false;
      toggleBodyScroll();
      closeButton?.focus();
    };

    const closePhotoModal = () => {
      photoModal.hidden = true;
      toggleBodyScroll();
      if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
      }
    };

    photoTrigger.addEventListener('click', openPhotoModal);

    closeTargets.forEach((target) => {
      target.addEventListener('click', closePhotoModal);
    });
  }

  if (mediaModal && mediaModalImage && mediaModalLabel && mediaTriggerButtons.length > 0) {
    const closeButton = mediaModal.querySelector('.media-modal__close');
    const closeTargets = mediaModal.querySelectorAll('[data-media-close]');

    const openMediaModal = (image) => {
      lastFocusedElement = document.activeElement;
      mediaModalImage.src = image.currentSrc || image.src;
      mediaModalImage.alt = image.alt;
      mediaModalLabel.textContent = image.alt;
      mediaModal.hidden = false;
      toggleBodyScroll();
      closeButton?.focus();
    };

    const closeMediaModal = () => {
      mediaModal.hidden = true;
      mediaModalImage.src = '';
      mediaModalImage.alt = '';
      mediaModalLabel.textContent = 'Publication Preview';
      toggleBodyScroll();
      if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
      }
    };

    mediaTriggerButtons.forEach((button) => {
      const image = button.querySelector('.project-card__media');
      if (!image) {
        return;
      }

      button.addEventListener('click', () => openMediaModal(image));
    });

    closeTargets.forEach((target) => {
      target.addEventListener('click', closeMediaModal);
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (mediaModal && !mediaModal.hidden) {
        mediaModal.hidden = true;
        mediaModalImage?.setAttribute('src', '');
        mediaModalImage?.setAttribute('alt', '');
        if (mediaModalLabel) {
          mediaModalLabel.textContent = 'Publication Preview';
        }
        toggleBodyScroll();
        if (lastFocusedElement instanceof HTMLElement) {
          lastFocusedElement.focus();
        }
        return;
      }

      if (photoModal && !photoModal.hidden) {
        photoModal.hidden = true;
        toggleBodyScroll();
        if (lastFocusedElement instanceof HTMLElement) {
          lastFocusedElement.focus();
        }
      }
    }
  });
});
