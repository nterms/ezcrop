/*! ezcrop - v0.0.2 <https://github.com/nterms/ezcrop> */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["ezcrop"] = factory();
	else
		root["ezcrop"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _zoomer = __webpack_require__(1);

	var _zoomer2 = _interopRequireDefault(_zoomer);

	var _constants = __webpack_require__(2);

	var _options = __webpack_require__(3);

	var _utils = __webpack_require__(4);

	var Ezcrop = (function () {
	  function Ezcrop(element, options) {
	    _classCallCheck(this, Ezcrop);

	    this.el = element;

	    var defaults = (0, _options.loadDefaults)(this.el);
	    this.options = extend({}, defaults, options);

	    this.init();
	  }

	  _createClass(Ezcrop, [{
	    key: 'init',
	    value: function init() {
	      var _this = this;

	      this.img = new Image();
	      this.preImage = new Image();
	      this.img.onload = this.onImageLoaded.bind(this);
	      this.preImage.onload = this.onPreImageLoaded.bind(this);
	      this.img.onerror = this.preImage.onerror = function () {
	        _this.onImageError.call(_this, _constants.ERRORS.IMAGE_FAILED_TO_LOAD);
	      };

	      this.preview = this.options.preview;
	      this.fileInput = this.options.fileInput;
	      this.zoomSlider = this.options.zoomSlider;

	      this.preview.style.position = 'relative';
	      this.fileInput.setAttribute('accept', 'image/*');
	      this.zoomSlider.setAttribute('min', 0);
	      this.zoomSlider.setAttribute('max', 1);
	      this.zoomSlider.setAttribute('step', 0.01);

	      this.previewSize = {
	        width: this.options.width || this.preview.clientWidth,
	        height: this.options.height || this.preview.clientHeight
	      };

	      this.image = document.createElement('img');
	      addClass(this.image, _constants.CLASS_NAMES.PREVIEW_IMAGE);
	      this.image.setAttribute('alt', '');
	      this.image.style.transformOrigin = 'top left';
	      this.image.style.webkitTransformOrigin = 'top left';

	      this.imageContainer = document.createElement('div');
	      addClass(this.imageContainer, _constants.CLASS_NAMES.PREVIEW_IMAGE_CONTAINER);
	      this.imageContainer.setAttribute('style', 'position: absolute; overflow: hidden; left: 0; top: 0; width: 100%; height: 100%;');
	      this.imageContainer.appendChild(this.image);
	      this.preview.appendChild(this.imageContainer);

	      if (this.options.imageBackground) {
	        if (Array.isArray(this.options.imageBackgroundBorderWidth)) {
	          this.bgBorderWidthArray = this.options.imageBackgroundBorderWidth;
	        } else {
	          this.bgBorderWidthArray = [0, 1, 2, 3].map(function () {
	            return _this.options.imageBackgroundBorderWidth;
	          });
	        }

	        this.bg = document.createElement('img');
	        addClass(this.bg, _constants.CLASS_NAMES.PREVIEW_BACKGROUND);
	        this.bg.setAttribute('alt', '');
	        this.bg.setAttribute('style', 'position: relative; left: ' + this.bgBorderWidthArray[3] + '; top: ' + this.bgBorderWidthArray[0] + '; transform-origin: top left; -webkit-transform-origin: top left;');

	        this.bgContainer = document.createElement('div');
	        addClass(this.bgContainer, _constants.CLASS_NAMES.PREVIEW_BACKGROUND_CONTAINER);
	        this.bgContainer.setAttribute('style', 'position: absolute; z-index: 0; top: -' + this.bgBorderWidthArray[0] + '; right: -' + this.bgBorderWidthArray[1] + '; bottom: -' + this.bgBorderWidthArray[2] + '; left: -' + this.bgBorderWidthArray[3] + ';');
	        this.bgContainer.appendChild(this.bg);
	        if (this.bgBorderWidthArray[0] > 0) {
	          this.bgContainer.style.overflow = 'hidden';
	        }
	        this.preview.insertBefore(this.bgContainer, this.preview.firstChild);
	      }

	      this.initialZoom = this.options.initialZoom;

	      this.imageLoaded = false;

	      this.moveContinue = false;

	      this.zoomer = new _zoomer2['default']();

	      if (this.options.allowDragNDrop) {}

	      this.bindListeners();

	      if (this.options.imageState && this.options.imageState.src) {
	        this.loadImage(this.options.imageState.src);
	      }

	      this.el.ezcrop = this;
	    }
	  }, {
	    key: 'bindListeners',
	    value: function bindListeners() {
	      on(this.fileInput, ['change'], this.onFileChange.bind(this));
	      on(this.imageContainer, _constants.EVENTS.PREVIEW, this.onPreviewEvent.bind(this));
	      on(this.zoomSlider, _constants.EVENTS.ZOOM_INPUT, this.onZoomSliderChange.bind(this));

	      if (this.options.allowDragNDrop) {
	        on(this.imageContainer, ['dragover', 'dragleave'], this.onDragOver.bind(this));
	        on(this.imageContainer, ['drop'], this.onDrop.bind(this));
	      }
	    }
	  }, {
	    key: 'unbindListeners',
	    value: function unbindListeners() {
	      off(this.fileInput, ['change'], this.onFileChange);
	      off(this.imageContainer, _constants.EVENTS.PREVIEW, this.onPreviewEvent);
	      off(this.imageContainer, ['dragover', 'dragleave', 'drop'], this.onDragOver);
	      off(this.zoomSlider, _constants.EVENTS.ZOOM_INPUT, this.onZoomSliderChange);
	    }
	  }, {
	    key: 'onFileChange',
	    value: function onFileChange(e) {
	      this.options.onFileChange(e);

	      if (this.fileInput.files) {
	        this.loadFile(this.fileInput.files[0]);
	      }
	    }
	  }, {
	    key: 'loadFile',
	    value: function loadFile(file) {
	      var fileReader = new FileReader();
	      if (file && file.type.match('image')) {
	        fileReader.readAsDataURL(file);
	        fileReader.onload = this.onFileReaderLoaded.bind(this);
	        fileReader.onerror = this.onFileReaderError.bind(this);
	      } else if (file) {
	        this.onFileReaderError();
	      }
	    }
	  }, {
	    key: 'onFileReaderLoaded',
	    value: function onFileReaderLoaded(e) {
	      this.loadImage(e.target.result);
	    }
	  }, {
	    key: 'onFileReaderError',
	    value: function onFileReaderError() {
	      this.options.onFileReaderError();
	    }
	  }, {
	    key: 'onDragOver',
	    value: function onDragOver(e) {
	      e.preventDefault();
	      e.dataTransfer.dropEffect = 'copy';
	      if (e.type === 'dragover') {
	        addClass(this.preview, _constants.CLASS_NAMES.DRAG_HOVERED);
	      } else {
	        removeClass(this.preview, _constants.CLASS_NAMES.DRAG_HOVERED);
	      }
	    }
	  }, {
	    key: 'onDrop',
	    value: function onDrop(e) {
	      var _this2 = this;

	      e.preventDefault();
	      e.stopPropagation();

	      var files = Array.prototype.slice.call(e.dataTransfer.files, 0);
	      files.some(function (file) {
	        if (!file.type.match('image')) {
	          return false;
	        }

	        _this2.loadFile(file);
	        return true;
	      });

	      // this.preview.classList.remove(CLASS_NAMES.DRAG_HOVERED);
	      removeClass(this.preview, _constants.CLASS_NAMES.DRAG_HOVERED);
	    }
	  }, {
	    key: 'loadImage',
	    value: function loadImage(imageSrc) {
	      var _this3 = this;

	      if (!imageSrc) {
	        return;
	      }

	      this.options.onImageLoading();
	      this.setImageLoadingClass();

	      if (imageSrc.indexOf('data') === 0) {
	        this.preImage.src = imageSrc;
	      } else {
	        var xhr = new XMLHttpRequest();
	        xhr.onload = function (e) {
	          if (e.target.status >= 300) {
	            _this3.onImageError.call(_this3, _constants.ERRORS.IMAGE_FAILED_TO_LOAD);
	            return;
	          }

	          _this3.loadFile(e.target.response);
	        };
	        xhr.open('GET', imageSrc);
	        xhr.responseType = 'blob';
	        xhr.send();
	      }
	    }
	  }, {
	    key: 'onPreImageLoaded',
	    value: function onPreImageLoaded() {
	      if (this.shouldRejectImage({
	        imageWidth: this.preImage.width,
	        imageHeight: this.preImage.height,
	        previewSize: this.previewSize,
	        maxZoom: this.options.maxZoom,
	        exportZoom: this.options.exportZoom,
	        smallImage: this.options.smallImage
	      })) {
	        this.onImageError(_constants.ERRORS.SMALL_IMAGE);
	        if (this.img.src) {
	          this.setImageLoadedClass();
	        }
	        return;
	      }

	      this.img.src = this.preImage.src;
	    }
	  }, {
	    key: 'onImageLoaded',
	    value: function onImageLoaded() {
	      this.rotation = 0;
	      this.setupZoomer(this.options.imageState && this.options.imageState.zoom || this._initialZoom);
	      if (this.options.imageState && this.options.imageState.offset) {
	        this.offset = this.options.imageState.offset;
	      } else {
	        this.centerImage();
	      }

	      this.options.imageState = {};

	      this.image.setAttribute('src', this.img.src);
	      if (this.options.imageBackground) {
	        this.bg.setAttribute('src', this.img.src);
	      }

	      this.setImageLoadedClass();

	      this.imageLoaded = true;

	      this.options.onImageLoaded();
	    }
	  }, {
	    key: 'onImageError',
	    value: function onImageError() {
	      this.options.onImageError.apply(this, arguments);
	      this.removeImageLoadingClass();
	    }
	  }, {
	    key: 'setImageLoadingClass',
	    value: function setImageLoadingClass() {
	      removeClass(this.preview, _constants.CLASS_NAMES.IMAGE_LOADED);
	      addClass(this.preview, _constants.CLASS_NAMES.IMAGE_LOADING);
	    }
	  }, {
	    key: 'setImageLoadedClass',
	    value: function setImageLoadedClass() {
	      removeClass(this.preview, _constants.CLASS_NAMES.IMAGE_LOADING);
	      addClass(this.preview, _constants.CLASS_NAMES.IMAGE_LOADED);
	    }
	  }, {
	    key: 'removeImageLoadingClass',
	    value: function removeImageLoadingClass() {
	      removeClass(this.preview, _constants.CLASS_NAMES.IMAGE_LOADING);
	    }
	  }, {
	    key: 'getEventPosition',
	    value: function getEventPosition(e) {
	      if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0]) {
	        e = e.originalEvent.touches[0];
	      }
	      if (e.clientX && e.clientY) {
	        return { x: e.clientX, y: e.clientY };
	      }
	    }
	  }, {
	    key: 'onPreviewEvent',
	    value: function onPreviewEvent(e) {
	      if (!this.imageLoaded) {
	        return;
	      }

	      this.moveContinue = false;
	      off(this.imageContainer, _constants.EVENTS.PREVIEW_MOVE, this.onMove);

	      if (e.type === 'mousedown' || e.type === 'touchstart') {
	        e.preventDefault();
	        this.origin = this.getEventPosition(e);
	        this.moveContinue = true;
	        on(this.imageContainer, _constants.EVENTS.PREVIEW_MOVE, this.onMove.bind(this));
	      } else {
	        document.body.focus();
	      }

	      e.stopPropagation();
	      return false;
	    }
	  }, {
	    key: 'onMove',
	    value: function onMove(e) {
	      var eventPosition = this.getEventPosition(e);

	      if (this.moveContinue && eventPosition) {
	        this.offset = {
	          x: this.offset.x + eventPosition.x - this.origin.x,
	          y: this.offset.y + eventPosition.y - this.origin.y
	        };
	      }

	      this.origin = eventPosition;

	      e.stopPropagation();
	      return false;
	    }
	  }, {
	    key: 'fixOffset',
	    value: function fixOffset(offset) {
	      if (!this.imageLoaded) {
	        return offset;
	      }

	      var ret = { x: offset.x, y: offset.y };

	      if (!this.options.freeMove) {
	        if (this.imageWidth * this.zoom >= this.previewSize.width) {
	          ret.x = Math.min(0, Math.max(ret.x, this.previewSize.width - this.imageWidth * this.zoom));
	        } else {
	          ret.x = Math.max(0, Math.min(ret.x, this.previewSize.width - this.imageWidth * this.zoom));
	        }

	        if (this.imageHeight * this.zoom >= this.previewSize.height) {
	          ret.y = Math.min(0, Math.max(ret.y, this.previewSize.height - this.imageHeight * this.zoom));
	        } else {
	          ret.y = Math.max(0, Math.min(ret.y, this.previewSize.height - this.imageHeight * this.zoom));
	        }
	      }

	      ret.x = (0, _utils.round)(ret.x);
	      ret.y = (0, _utils.round)(ret.y);

	      return ret;
	    }
	  }, {
	    key: 'centerImage',
	    value: function centerImage() {
	      if (!this.img.width || !this.img.height || !this.zoom) {
	        return;
	      }

	      this.offset = {
	        x: (this.previewSize.width - this.imageWidth * this.zoom) / 2,
	        y: (this.previewSize.height - this.imageHeight * this.zoom) / 2
	      };
	    }
	  }, {
	    key: 'onZoomSliderChange',
	    value: function onZoomSliderChange() {
	      if (!this.imageLoaded) {
	        return;
	      }

	      this.zoomSliderPos = Number(this.zoomSlider.value);
	      var newZoom = this.zoomer.getZoom(this.zoomSliderPos);
	      if (newZoom === this.zoom) {
	        return;
	      }
	      this.zoom = newZoom;
	    }
	  }, {
	    key: 'enableZoomSlider',
	    value: function enableZoomSlider() {
	      this.zoomSlider.removeAttribute('disabled');
	      this.options.onZoomEnabled();
	    }
	  }, {
	    key: 'disableZoomSlider',
	    value: function disableZoomSlider() {
	      this.zoomSlider.setAttribute('disabled', true);
	      this.options.onZoomDisabled();
	    }
	  }, {
	    key: 'setupZoomer',
	    value: function setupZoomer(zoom) {
	      this.zoomer.setup({
	        imageSize: this.imageSize,
	        previewSize: this.previewSize,
	        exportZoom: this.options.exportZoom,
	        maxZoom: this.options.maxZoom,
	        minZoom: this.options.minZoom,
	        smallImage: this.options.smallImage
	      });
	      this.zoom = (0, _utils.exists)(zoom) ? zoom : this._zoom;

	      if (this.isZoomable()) {
	        this.enableZoomSlider();
	      } else {
	        this.disableZoomSlider();
	      }
	    }
	  }, {
	    key: 'fixZoom',
	    value: function fixZoom(zoom) {
	      return this.zoomer.fixZoom(zoom);
	    }
	  }, {
	    key: 'isZoomable',
	    value: function isZoomable() {
	      return this.zoomer.isZoomable();
	    }
	  }, {
	    key: 'renderImage',
	    value: function renderImage() {
	      var transformation = '\n      translate(' + this.rotatedOffset.x + 'px, ' + this.rotatedOffset.y + 'px)\n      scale(' + this.zoom + ')\n      rotate(' + this.rotation + 'deg)';

	      this.image.style.transform = transformation;
	      this.image.style.webkitTransform = transformation;

	      if (this.options.imageBackground) {
	        this.bg.style.transform = transformation;
	        this.bg.style.webkitTransform = transformation;
	      }
	    }
	  }, {
	    key: 'rotateCW',
	    value: function rotateCW() {
	      if (this.shouldRejectImage({
	        imageWidth: this.img.height,
	        imageHeight: this.img.width,
	        previewSize: this.previewSize,
	        maxZoom: this.options.maxZoom,
	        exportZoom: this.options.exportZoom,
	        smallImage: this.options.smallImage
	      })) {
	        this.rotation = (this.rotation + 180) % 360;
	      } else {
	        this.rotation = (this.rotation + 90) % 360;
	      }
	    }
	  }, {
	    key: 'rotateCCW',
	    value: function rotateCCW() {
	      if (this.shouldRejectImage({
	        imageWidth: this.img.height,
	        imageHeight: this.img.width,
	        previewSize: this.previewSize,
	        maxZoom: this.options.maxZoom,
	        exportZoom: this.options.exportZoom,
	        smallImage: this.options.smallImage
	      })) {
	        this.rotation = (this.rotation + 180) % 360;
	      } else {
	        this.rotation = (this.rotation + 270) % 360;
	      }
	    }
	  }, {
	    key: 'shouldRejectImage',
	    value: function shouldRejectImage(_ref) {
	      var imageWidth = _ref.imageWidth;
	      var imageHeight = _ref.imageHeight;
	      var previewSize = _ref.previewSize;
	      var maxZoom = _ref.maxZoom;
	      var exportZoom = _ref.exportZoom;
	      var smallImage = _ref.smallImage;

	      if (smallImage !== 'reject') {
	        return false;
	      }

	      return imageWidth * maxZoom < previewSize.width * exportZoom || imageHeight * maxZoom < previewSize.height * exportZoom;
	    }
	  }, {
	    key: 'getCroppedImageData',
	    value: function getCroppedImageData(exportOptions) {
	      if (!this.img.src) {
	        return;
	      }

	      var exportDefaults = {
	        type: 'image/png',
	        quality: 0.75,
	        originalSize: false,
	        fillBg: '#fff'
	      };
	      exportOptions = extend({}, exportDefaults, exportOptions);

	      var exportZoom = exportOptions.originalSize ? 1 / this.zoom : this.options.exportZoom;

	      var zoomedSize = {
	        width: this.zoom * exportZoom * this.img.width,
	        height: this.zoom * exportZoom * this.img.height
	      };

	      var canvas = document.createElement('canvas');
	      canvas.setAttribute('width', this.previewSize.width * exportZoom);
	      canvas.setAttribute('height', this.previewSize.height * exportZoom);

	      var canvasContext = canvas.getContext('2d');

	      if (exportOptions.type === 'image/jpeg') {
	        canvasContext.fillStyle = exportOptions.fillBg;
	        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
	      }

	      canvasContext.translate(this.rotatedOffset.x * exportZoom, this.rotatedOffset.y * exportZoom);
	      canvasContext.rotate(this.rotation * Math.PI / 180);
	      canvasContext.drawImage(this.img, 0, 0, zoomedSize.width, zoomedSize.height);

	      return canvas.toDataURL(exportOptions.type, exportOptions.quality);
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      this.unbindListeners();
	      this.disableZoomSlider();
	      this.el.addClass(_constants.CLASS_NAMES.DISABLED);
	    }
	  }, {
	    key: 'reenable',
	    value: function reenable() {
	      this.bindListeners();
	      this.enableZoomSlider();
	      this.el.removeClass(_constants.CLASS_NAMES.DISABLED);
	    }
	  }, {
	    key: '$',
	    value: function $(selector) {
	      if (!this.el) {
	        return null;
	      }
	      return this.el.querySelectorAll(selector);
	    }
	  }, {
	    key: 'offset',
	    set: function (position) {
	      if (!position || !(0, _utils.exists)(position.x) || !(0, _utils.exists)(position.y)) {
	        return;
	      }

	      this._offset = this.fixOffset(position);
	      this.renderImage();

	      this.options.onOffsetChange(position);
	    },
	    get: function () {
	      return this._offset;
	    }
	  }, {
	    key: 'zoom',
	    set: function (newZoom) {
	      newZoom = this.fixZoom(newZoom);

	      if (this.imageLoaded) {
	        var oldZoom = this.zoom;

	        var newX = this.previewSize.width / 2 - (this.previewSize.width / 2 - this.offset.x) * newZoom / oldZoom;
	        var newY = this.previewSize.height / 2 - (this.previewSize.height / 2 - this.offset.y) * newZoom / oldZoom;

	        this._zoom = newZoom;
	        this.offset = { x: newX, y: newY }; // Triggers renderImage()
	      } else {
	        this._zoom = newZoom;
	      }

	      this.zoomSliderPos = this.zoomer.getSliderPos(this.zoom);
	      this.zoomSlider.value = this.zoomSliderPos;

	      this.options.onZoomChange(newZoom);
	    },
	    get: function () {
	      return this._zoom;
	    }
	  }, {
	    key: 'rotatedOffset',
	    get: function () {
	      return {
	        x: this.offset.x + (this.rotation === 90 ? this.img.height * this.zoom : 0) + (this.rotation === 180 ? this.img.width * this.zoom : 0),
	        y: this.offset.y + (this.rotation === 180 ? this.img.height * this.zoom : 0) + (this.rotation === 270 ? this.img.width * this.zoom : 0)
	      };
	    }
	  }, {
	    key: 'rotation',
	    set: function (newRotation) {
	      this._rotation = newRotation;

	      if (this.imageLoaded) {
	        // Change in image size may lead to change in zoom range
	        this.setupZoomer();
	      }
	    },
	    get: function () {
	      return this._rotation;
	    }
	  }, {
	    key: 'imageState',
	    get: function () {
	      return {
	        src: this.img.src,
	        offset: this.offset,
	        zoom: this.zoom
	      };
	    }
	  }, {
	    key: 'imageSrc',
	    get: function () {
	      return this.img.src;
	    },
	    set: function (imageSrc) {
	      this.loadImage(imageSrc);
	    }
	  }, {
	    key: 'imageWidth',
	    get: function () {
	      return this.rotation % 180 === 0 ? this.img.width : this.img.height;
	    }
	  }, {
	    key: 'imageHeight',
	    get: function () {
	      return this.rotation % 180 === 0 ? this.img.height : this.img.width;
	    }
	  }, {
	    key: 'imageSize',
	    get: function () {
	      return {
	        width: this.imageWidth,
	        height: this.imageHeight
	      };
	    }
	  }, {
	    key: 'initialZoom',
	    get: function () {
	      return this.options.initialZoom;
	    },
	    set: function (initialZoomOption) {
	      this.options.initialZoom = initialZoomOption;
	      if (initialZoomOption === 'min') {
	        this._initialZoom = 0; // Will be fixed when image loads
	      } else if (initialZoomOption === 'image') {
	        this._initialZoom = 1;
	      } else {
	        this._initialZoom = 0;
	      }
	    }
	  }, {
	    key: 'exportZoom',
	    get: function () {
	      return this.options.exportZoom;
	    },
	    set: function (exportZoom) {
	      this.options.exportZoom = exportZoom;
	      this.setupZoomer();
	    }
	  }, {
	    key: 'minZoom',
	    get: function () {
	      return this.options.minZoom;
	    },
	    set: function (minZoom) {
	      this.options.minZoom = minZoom;
	      this.setupZoomer();
	    }
	  }, {
	    key: 'maxZoom',
	    get: function () {
	      return this.options.maxZoom;
	    },
	    set: function (maxZoom) {
	      this.options.maxZoom = maxZoom;
	      this.setupZoomer();
	    }
	  }, {
	    key: 'previewSize',
	    get: function () {
	      return this._previewSize;
	    },
	    set: function (size) {
	      if (!size || size.width <= 0 || size.height <= 0) {
	        return;
	      }

	      this._previewSize = {
	        width: size.width,
	        height: size.height
	      };
	      this.preview.style.width = this.previewSize.width + 'px';
	      this.preview.style.height = this.previewSize.height + 'px';

	      if (this.imageLoaded) {
	        this.setupZoomer();
	      }
	    }
	  }]);

	  return Ezcrop;
	})();

	// Utilities
	function extend() {
	  for (var i = 1; i < arguments.length; i++) for (var key in arguments[i]) if (arguments[i].hasOwnProperty(key)) arguments[0][key] = arguments[i][key];

	  return arguments[0];
	}

	function addClass(el, className) {
	  if (el.classList) el.classList.add(className);else el.className += ' ' + className;
	}

	function removeClass(el, className) {
	  if (el.classList) el.classList.remove(className);else el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	}

	function toggleClass(el, className) {
	  if (el.classList) {
	    el.classList.toggle(className);
	  } else {
	    var classes = el.className.split(' ');
	    var existingIndex = classes.indexOf(className);

	    if (existingIndex >= 0) classes.splice(existingIndex, 1);else classes.push(className);

	    el.className = classes.join(' ');
	  }
	}

	function on(el, events, handler) {
	  events.forEach(function (e) {
	    el.addEventListener(e, handler);
	  });
	}

	function off(el, events, handler) {
	  events.forEach(function (e) {
	    el.removeEventListener(e, handler);
	  });
	}

	exports['default'] = Ezcrop;
	module.exports = exports['default'];

	// $.event.props.push('dataTransfer');

/***/ },
/* 1 */
/***/ function(module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Zoomer = (function () {
	  function Zoomer() {
	    _classCallCheck(this, Zoomer);

	    this.minZoom = this.maxZoom = 1;
	  }

	  _createClass(Zoomer, [{
	    key: 'setup',
	    value: function setup(_ref) {
	      var imageSize = _ref.imageSize;
	      var previewSize = _ref.previewSize;
	      var exportZoom = _ref.exportZoom;
	      var maxZoom = _ref.maxZoom;
	      var minZoom = _ref.minZoom;
	      var smallImage = _ref.smallImage;

	      var widthRatio = previewSize.width / imageSize.width;
	      var heightRatio = previewSize.height / imageSize.height;

	      if (minZoom === 'fit') {
	        this.minZoom = Math.min(widthRatio, heightRatio);
	      } else {
	        this.minZoom = Math.max(widthRatio, heightRatio);
	      }

	      if (smallImage === 'allow') {
	        this.minZoom = Math.min(this.minZoom, 1);
	      }

	      this.maxZoom = Math.max(this.minZoom, maxZoom / exportZoom);
	    }
	  }, {
	    key: 'getZoom',
	    value: function getZoom(sliderPos) {
	      if (!this.minZoom || !this.maxZoom) {
	        return null;
	      }

	      return sliderPos * (this.maxZoom - this.minZoom) + this.minZoom;
	    }
	  }, {
	    key: 'getSliderPos',
	    value: function getSliderPos(zoom) {
	      if (!this.minZoom || !this.maxZoom) {
	        return null;
	      }

	      if (this.minZoom === this.maxZoom) {
	        return 0;
	      } else {
	        return (zoom - this.minZoom) / (this.maxZoom - this.minZoom);
	      }
	    }
	  }, {
	    key: 'isZoomable',
	    value: function isZoomable() {
	      if (!this.minZoom || !this.maxZoom) {
	        return null;
	      }

	      return this.minZoom !== this.maxZoom;
	    }
	  }, {
	    key: 'fixZoom',
	    value: function fixZoom(zoom) {
	      return Math.max(this.minZoom, Math.min(this.maxZoom, zoom));
	    }
	  }]);

	  return Zoomer;
	})();

	exports['default'] = Zoomer;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var PLUGIN_KEY = 'ezcrop';

	exports.PLUGIN_KEY = PLUGIN_KEY;
	var CLASS_NAMES = {
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
	  DISABLED: 'ezcrop-disabled'
	};

	exports.CLASS_NAMES = CLASS_NAMES;
	var ERRORS = {
	  IMAGE_FAILED_TO_LOAD: { code: 0, message: 'Image failed to load.' },
	  SMALL_IMAGE: { code: 1, message: 'Image is too small.' }
	};

	exports.ERRORS = ERRORS;
	var EVENTS = {
	  PREVIEW: ['mousedown', 'mouseup', 'mouseleave', 'touchstart', 'touchend', 'touchcancel', 'touchleave'],
	  PREVIEW_MOVE: ['mousemove', 'touchmove'],
	  ZOOM_INPUT: ['mousemove', 'touchmove', 'change']
	};
	exports.EVENTS = EVENTS;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _constants = __webpack_require__(2);

	var options = {
	  elements: [{
	    name: 'preview',
	    description: 'The HTML element that displays image preview.',
	    defaultSelector: '.' + _constants.CLASS_NAMES.PREVIEW
	  }, {
	    name: 'fileInput',
	    description: 'File input element.',
	    defaultSelector: 'input.' + _constants.CLASS_NAMES.FILE_INPUT
	  }, {
	    name: 'zoomSlider',
	    description: 'Range input element that controls image zoom.',
	    defaultSelector: 'input.' + _constants.CLASS_NAMES.ZOOM_SLIDER
	  }].map(function (o) {
	    o.type = 'element';
	    o['default'] = 'imageCropper.querySelectorAll(\'' + o.defaultSelector + '\')[0]';
	    return o;
	  }),

	  values: [{
	    name: 'width',
	    type: 'number',
	    description: 'Width of image preview in pixels. If set, it will override the CSS property.',
	    'default': null
	  }, {
	    name: 'height',
	    type: 'number',
	    description: 'Height of image preview in pixels. If set, it will override the CSS property.',
	    'default': null
	  }, {
	    name: 'imageBackground',
	    type: 'boolean',
	    description: 'Whether or not to display the background image beyond the preview area.',
	    'default': false
	  }, {
	    name: 'imageBackgroundBorderWidth',
	    type: 'array or number',
	    description: 'Width of background image border in pixels.\n        The four array elements specify the width of background image width on the top, right, bottom, left side respectively.\n        The background image beyond the width will be hidden.\n        If specified as a number, border with uniform width on all sides will be applied.',
	    'default': [0, 0, 0, 0]
	  }, {
	    name: 'exportZoom',
	    type: 'number',
	    description: 'The ratio between the desired image size to export and the preview size.\n        For example, if the preview size is `300px * 200px`, and `exportZoom = 2`, then\n        the exported image size will be `600px * 400px`.\n        This also affects the maximum zoom level, since the exported image cannot be zoomed to larger than its original size.',
	    'default': 1
	  }, {
	    name: 'allowDragNDrop',
	    type: 'boolean',
	    description: 'When set to true, you can load an image by dragging it from local file browser onto the preview area.',
	    'default': true
	  }, {
	    name: 'minZoom',
	    type: 'string',
	    description: 'This options decides the minimal zoom level of the image.\n        If set to `\'fill\'`, the image has to fill the preview area, i.e. both width and height must not go smaller than the preview area.\n        If set to `\'fit\'`, the image can shrink further to fit the preview area, i.e. at least one of its edges must not go smaller than the preview area.',
	    'default': 'fill'
	  }, {
	    name: 'maxZoom',
	    type: 'number',
	    description: 'Determines how big the image can be zoomed. E.g. if set to 1.5, the image can be zoomed to 150% of its original size.',
	    'default': 1
	  }, {
	    name: 'initialZoom',
	    type: 'string',
	    description: 'Determines the zoom when an image is loaded.\n        When set to `\'min\'`, image is zoomed to the smallest when loaded.\n        When set to `\'image\'`, image is zoomed to 100% when loaded.',
	    'default': 'min'
	  }, {
	    name: 'freeMove',
	    type: 'boolean',
	    description: 'When set to true, you can freely move the image instead of being bound to the container borders',
	    'default': false
	  }, {
	    name: 'smallImage',
	    type: 'string',
	    description: 'When set to `\'reject\'`, `onImageError` would be called when ezcrop loads an image that is smaller than the container.\n        When set to `\'allow\'`, images smaller than the container can be zoomed down to its original size, overiding `minZoom` option.\n        When set to `\'stretch\'`, the minimum zoom of small images would follow `minZoom` option.',
	    'default': 'reject'
	  }],

	  callbacks: [{
	    name: 'onFileChange',
	    description: 'Called when user selects a file in the select file input.',
	    params: [{
	      name: 'event',
	      type: 'object',
	      description: 'File change event object'
	    }]
	  }, {
	    name: 'onFileReaderError',
	    description: 'Called when `FileReader` encounters an error while loading the image file.'
	  }, {
	    name: 'onImageLoading',
	    description: 'Called when image starts to be loaded.'
	  }, {
	    name: 'onImageLoaded',
	    description: 'Called when image is loaded.'
	  }, {
	    name: 'onImageError',
	    description: 'Called when image cannot be loaded.',
	    params: [{
	      name: 'error',
	      type: 'object',
	      description: 'Error object.'
	    }, {
	      name: 'error.code',
	      type: 'number',
	      description: 'Error code. `0` means generic image loading failure. `1` means image is too small.'
	    }, {
	      name: 'error.message',
	      type: 'string',
	      description: 'A message explaining the error.'
	    }]
	  }, {
	    name: 'onZoomEnabled',
	    description: 'Called when image the zoom slider is enabled.'
	  }, {
	    name: 'onZoomDisabled',
	    description: 'Called when image the zoom slider is disabled.'
	  }, {
	    name: 'onZoomChange',
	    description: 'Called when zoom changes.',
	    params: [{
	      name: 'zoom',
	      type: 'number',
	      description: 'New zoom.'
	    }]
	  }, {
	    name: 'onOffsetChange',
	    description: 'Called when image offset changes.',
	    params: [{
	      name: 'offset',
	      type: 'object',
	      description: 'New offset, with `x` and `y` values.'
	    }]
	  }].map(function (o) {
	    o.type = 'function';return o;
	  })
	};

	var loadDefaults = function loadDefaults(el) {
	  var defaults = {};
	  if (el) {
	    options.elements.forEach(function (o) {
	      defaults[o.name] = el.querySelectorAll(o.defaultSelector)[0];
	    });
	  }
	  options.values.forEach(function (o) {
	    defaults[o.name] = o['default'];
	  });
	  options.callbacks.forEach(function (o) {
	    defaults[o.name] = function () {};
	  });

	  return defaults;
	};

	exports.loadDefaults = loadDefaults;
	exports['default'] = options;

/***/ },
/* 4 */
/***/ function(module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var exists = function exists(v) {
	  return typeof v !== 'undefined';
	};

	exports.exists = exists;
	var round = function round(x) {
	  return +(Math.round(x * 100) + 'e-2');
	};
	exports.round = round;

/***/ }
/******/ ])
});
;