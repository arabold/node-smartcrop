# jimp-smartcrop

`jimp-smartcrop` is a fork of [SmartCrop.js](https://github.com/jwagner/smartcrop.js) to run on 
Node.js using [Jimp](https://github.com/oliver-moran/jimp) and without any native dependencies. 
It implements an algorithm to find good crops for images.

This library also contains a face detection algorithm based on [ccv-purejs](https://github.com/orls/ccv-purejs).
However, at this point the smart cropping and face detection is _not_ connected to each other but separate
functionality.

THIS LIBARARY IS PROVIDED *AS IS* WITHOUT ANY INTENT TO FURTHER MAINTAIN FOR NOW. I've written
this as I planned to use it, but things turned out differently. However, I leave this here in case you find it useful.
In my eyes the best would be to rewrite the smart crop and face detection to become plugins for JIMP itself.


![Example](http://29a.ch/sandbox/2014/smartcrop/example.jpg)
Image: [https://www.flickr.com/photos/endogamia/5682480447/](https://www.flickr.com/photos/endogamia/5682480447) by N. Feans

## Demos
* [Test Suite](http://29a.ch/sandbox/2014/smartcrop/examples/testsuite.html), contains over 100 images, **heavy**
* [Test Bed](http://29a.ch/sandbox/2014/smartcrop/examples/testbed.html), allows you to upload your own images
* [Photo transitions](http://29a.ch/sandbox/2014/smartcrop/examples/slideshow.html), automatically creates Ken Burns transitions for a slide show.

## Algorithm Overview
Smartcrop.js works using fairly dumb image processing. In short:

1. Find edges using laplace
1. Find regions with a color like skin
1. Find regions high in saturation
1. Generate a set of candidate crops using a sliding window
1. Rank them using an importance function to focus the detail in the center
  and avoid it in the edges. 
1. Output the candidate crop with the highest rank


## Simple Example
```javascript
SmartCrop.crop(image, {width: 100, height: 100}, function(result){console.log(result);});
// {topCrop: {x: 300, y: 200, height: 200, width: 200}}
```

## Download/ Installation
```npm install node-smartcrop```

## API

The API is not yet finalized. Look at the code for details and expect changes.

### SmartCrop.crop(image, options, callback)
Crop image using options and call callback(result) when done.

**image:** A Jimp image.

**options:** see cropOptions

**callback:** function(cropResult)

### cropOptions

**debug:** if true, cropResults will contain a debugCanvas

**minScale:** minimal scale of the crop rect, set to 1.0 to prevent smaller than necessary crops (lowers the risk of chopping things off).

**width:** width of the crop you want to use. 

**height:** height of the crop you want to use.

There are many more (for now undocumented) options available. Check the [source](smartcrop.js#L32) and know that they might change in the future.

### cropResult
```javascript
{
  topCrop: crop,
  crops: [crop]
}
```
### crop
```javascript
{
  x: 1,
  y: 1,
  width: 1,
  height: 1
}
```

## Tests

You can run the tests running `npm test`. 
The test coverage for smartcrop.js is very limited at the moment. I expect to improve this as the code matures and the concepts solidify.

## Benchmark
TODO

## Contributors

* [Christian Muehlhaeuser](https://github.com/muesli)

## Ports, Alternatives

* [smartcrop.js](https://github.com/jwagner/smartcrop.js) the original implementation
* [connect-thumbs](https://github.com/inadarei/connect-thumbs) Middleware for connect.js that supports smartcrop.js by [Irakli Nadareishvili](https://github.com/inadarei/connect-thumbs)
* [smartcrop.go](https://github.com/muesli/smartcrop) by [Christian Muehlhaeuser](https://github.com/muesli)
* [smartcrop.py](https://github.com/hhatto/smartcrop.py) by [Hideo Hattori](http://www.hexacosa.net/about/)
* [smartcrop-rails](https://github.com/sadiqmmm/smartcrop-rails) smartcrop wrapped in a ruby gem by [Mohammed Sadiq](https://github.com/sadiqmmm/)

## License
Original source code is copyright (c) 2014 Jonas Wanger, licensed under the MIT License (enclosed)
