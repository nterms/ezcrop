# ezcrop

Javascript image crop tool with zooming and rotating.

Ezcrop is a Vanilla JavaScript version of jQuery [Cropit](https://github.com/scottcheng/cropit) plugin by Scott Cheng.


## Features

* Selecting images from filesystem
* Zooming
* Moving
* Rotating
* Cropping
* Export to data URI


## Installation

```bash
# Install ezcrop with bower
$ bower install ezcrop

# or with npm
$ npm install ezcrop
```


## Usage

Add `ezcrop.js` to the page.

```html
<script src="dist/ezcrop.js"></script>
```

And the required bit of HTML:

```html
<div id="image-cropper">
    <div class="ezcrop-preview"></div>
    <input type="file" class="ezcrop-image-input">
    <div class="image-size-label">
      Resize image
    </div>
    <input type="range" class="ezcrop-image-zoom-input">
    <button id="rotate-ccw" class="rotate-ccw">Rotate counterclockwise</button>
    <button id="rotate-cw" class="rotate-cw">Rotate clockwise</button>

    <button id="export" class="export">Export</button>
</div>
```
Initialize

```javascript
<script>
  (function() {
    var cropper = new ezcrop(document.getElementById('image-cropper'), {
      imageState: {
        src: 'images/hands.jpg', // start with a default image
      },
    });

    document.getElementById('rotate-ccw').addEventListener('click', function() {
      cropper.rotateCCW();
    });

    document.getElementById('rotate-cw').addEventListener('click', function() {
      cropper.rotateCW();
    });

    document.getElementById('export').addEventListener('click', function() {
      var imageData = cropper.getCroppedImageData();
      window.open(imageData);
    });
  })();
</script>
```


## Options

Following options are supported:

| Option | Type | Description | Default |
|----------------------------|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|
| preview | object | The HTML element that displays image preview. |  |
| fileInput | object | File input element. |  |
| zoomSlider | object | Range input element that controls image zoom. |  |
| width | number | Width of image preview in pixels. If set, it will override the CSS property. | null |
| height | number | Height of image preview in pixels. If set, it will override the CSS property. | null |
| imageBackground | boolean | Whether or not to display the background image beyond the preview area. | false |
| imageBackgroundBorderWidth | array or number | Width of background image border in pixels.,The four array elements specify the width of background image width on the top, right, bottom, left side respectively.,The background image beyond the width will be hidden.,If specified as a number, border with uniform width on all sides will be applied. | [0, 0, 0, 0] |
| exportZoom | number | The ratio between the desired image size to export and the preview size.,For example, if the preview size is `300px * 200px`, and `exportZoom = 2`, then,the exported image size will be `600px * 400px`.,This also affects the maximum zoom level, since the exported image cannot be zoomed to larger than its original size. | 1 |
| allowDragNDrop | boolean | When set to true, you can load an image by dragging it from local file browser onto the preview area. | true |
| minZoom | string | This options decides the minimal zoom level of the image.,If set to `'fill'`, the image has to fill the preview area, i.e. both width and height must not go smaller than the preview area.,If set to `'fit'`, the image can shrink further to fit the preview area, i.e. at least one of its edges must not go smaller than the preview area. | fill |
| maxZoom | number | Determines how big the image can be zoomed. E.g. if set to 1.5, the image can be zoomed to 150% of its original size. | 1 |
| initialZoom | string | `Determines the zoom when an image is loaded.,When set to `'min'`, image is zoomed to the smallest when loaded.,When set to `'image'`, image is zoomed to 100% when loaded. | min |
| freeMove | boolean | When set to true, you can freely move the image instead of being bound to the container borders. | false |
| smallImage | string | When set to `'reject'`, `onImageError` would be called when ezcrop loads an image that is smaller than the container.,When set to `'allow'`, images smaller than the container can be zoomed down to its original size, overiding `minZoom` option.,When set to `'stretch'`, the minimum zoom of small images would follow `minZoom` option. | reject |


## Callbacks

Following callbacks can be used to interact with `ezcrop`.

| Callback | Description |
|------------------------|----------------------------------------------------------------------------|
| onFileChange(event) | Called when user selects a file in the select file input. |
| onFileReaderError | Called when `FileReader` encounters an error while loading the image file. |
| onImageLoading | Called when image starts to be loaded. |
| onImageLoaded | Called when image is loaded. |
| onImageError(error) | Called when image cannot be loaded. |
| onZoomEnabled | Called when image the zoom slider is enabled. |
| onZoomDisabled | Called when image the zoom slider is disabled. |
| onZoomChange(zoom) | Called when zoom changes. |
| onOffsetChange(offset) | Called when image offset changes. |


## Development

* Build: `webpack`
  * Watch for changes and rebuild: `webpack -w`
* Test: `npm test`
  * Test specific file: `jest <filename>`
* Lint: `npm run jshint -s`


## License

MIT
