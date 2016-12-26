export const PLUGIN_KEY = 'ezcrop';

export const CLASS_NAMES = {
  PREVIEW: 'ezcrop-preview',
  PREVIEW_IMAGE_CONTAINER: 'ezcrop-preview-image-container',
  PREVIEW_IMAGE: 'ezcrop-preview-image',
  PREVIEW_BACKGROUND_CONTAINER: 'ezcrop-preview-background-container',
  PREVIEW_BACKGROUND: 'ezcrop-preview-background',
  FILE_INPUT: 'ezcrop-image-input',
  ZOOM_SLIDER: 'ezcrop-image-zoom-input',

  DRAG_HOVERED: 'ezcrop-drag-hovered',
  IMAGE_LOADING: 'ezcrop-image-loading',
  IMAGE_LOADED: 'ezcrop-image-loaded',
  DISABLED: 'ezcrop-disabled',
};

export const ERRORS = {
  IMAGE_FAILED_TO_LOAD: { code: 0, message: 'Image failed to load.' },
  SMALL_IMAGE: { code: 1, message: 'Image is too small.' },
};

export const EVENTS = {
  PREVIEW: [
    'mousedown', 'mouseup', 'mouseleave',
    'touchstart', 'touchend', 'touchcancel', 'touchleave',
  ],
  PREVIEW_MOVE: ['mousemove', 'touchmove'],
  ZOOM_INPUT: ['mousemove', 'touchmove', 'change'],
};
