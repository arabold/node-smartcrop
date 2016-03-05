
var mocha = require('mocha')
, chai = require('chai')
, expect = chai.expect
, SmartCrop = require("../smartcrop.js")
, Jimp = require("jimp");

var KITTY = "examples/images/flickr/kitty.jpg";
//var KITTY = "examples/images/flickr/guitarist.jpg";
//var KITTY = "examples/images/65131509.jpg";

describe("SmartCrop", function() {
	var img;
	beforeEach(function(done){
		Jimp.read(KITTY, function(err, image) {
			expect(err).to.equal(null);
			expect(img).to.not.equal(null);

			img = image;
			done();
		});
	});
	function validResult(result){
		expect(result.topCrop.x).to.be.within(0, img.bitmap.width-result.topCrop.width);
		expect(result.topCrop.y).to.be.within(0, img.bitmap.height-result.topCrop.height);
		expect(result.topCrop.width).to.be.within(1, img.bitmap.width);
		expect(result.topCrop.height).to.be.within(1, img.bitmap.height);
	}
	describe("crop", function() {
//		it("should do something sane", function(done){
//			SmartCrop.crop(img, {debug: false}, function(result){
//				//document.body.appendChild(c);
//				//document.body.appendChild(result.debugCanvas);
//				result.debugCanvas.write("debug.jpg");
//				expect(result.topCrop.x).to.be.lessThan(96);
//				expect(result.topCrop.y).to.be.lessThan(32);
//				expect(result.topCrop.x+result.topCrop.width).to.be.greaterThan(112);
//				expect(result.topCrop.y+result.topCrop.height).to.be.greaterThan(48);
//				done();
//			});
//		});
		it("should adhere to minScale", function(done) {
			SmartCrop.crop(img, { minScale: 1 }, function(result){
				validResult(result);
				expect(result.topCrop.y).to.equal(0);
				expect(result.topCrop.height).to.equal(img.bitmap.height);
				done();
			});
		});
		it("should crop the kitty", function(done) {
			SmartCrop.crop(img, { }, function(result){
				var c = result.topCrop;
//				result.debugCanvas.write("debug.jpg");
//				img.clone().crop(c.x, c.y, c.width, c.height).write("output.jpg");
				validResult(result);
				done();
			});
		});
	});
});
