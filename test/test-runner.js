
var mocha = require('mocha')
, chai = require('chai')
, expect = chai.expect
, SmartCrop = require("../lib/smartcrop")
, Ccv = require("../lib/ccv")
, Jimp = require("jimp");

//var KITTY = "examples/images/flickr/kitty.jpg";
//var KITTY = "examples/images/041c72750fad84d3a44d9744c8feed32585b368b.png";
//var KITTY = "examples/images/berliner.jpg";
//var KITTY = "examples/images/flickr/guitarist.jpg";
//var KITTY = "examples/images/65131509.jpg";
//var KITTY = "examples/images/63246701.jpg";
var KITTY = "examples/images/tiesto.jpg";
//var KITTY = "examples/images/65309527.jpg";


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
//		it("should adhere to minScale", function(done) {
//			SmartCrop.crop(img, { minScale: 1 }, function(result){
//				validResult(result);
//				expect(result.topCrop.y).to.equal(0);
//				expect(result.topCrop.height).to.equal(img.bitmap.height);
//				done();
//			});
//		});
		it("should crop the kitty", function(done) {
			var params = {
				width: 192,
				height: 128, 
				debug: true,
//				detailWeight: 0.0,
				edgeRadius: 0.2,
				edgeWeight: -20.0,
//				outsideImportance: -0.5,
//				ruleOfThirds: false
			};
			SmartCrop.crop(img, params, function(result){
				var c = result.topCrop;
				validResult(result);

				result.debugCanvas.write("debug.jpg");
				img.clone().crop(c.x, c.y, c.width, c.height).write("output.jpg");
				done();
			});
		});
	});
});

describe("ccv", function() {
	var img;

	beforeEach(function(done){
		Jimp.read(KITTY, function(err, image) {
			expect(err).to.equal(null);
			expect(img).to.not.equal(null);

			img = image;
			done();
		});
	});

	describe("detect_objects", function() {
		this.timeout(5000);

		it("should do something sane", function(done) {
			var result = Ccv.detect_objects(img, 5, 1);
			expect(result).to.not.equal(null);
			expect(result.length).to.be.above(0);

			console.log(result);
			var c = result[0];
			img.clone().crop(c.x, c.y, c.width, c.height).write("face.jpg");

			done();
		});
	});
});
