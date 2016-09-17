var c = document.querySelector('#sheet');
var ctx = c.getContext('2d');
var imgData, imgdata;
var windWidth = document.querySelector('.fields-container').offsetWidth;

var meme = {
	init: function() {
		this.setFieldValues();
		this.activateListners();
		this.adjustCanvasDimension(300, windWidth);
		meme.r = meme.g = meme.b = meme.a = 1;
	},
	setFieldValues: function() {
		this.topTxt = document.getElementById('topText');
		this.topTxt.value = "";
		this.bottomTxt = document.getElementById('bottomTxt');
		this.bottomTxt.value = "";
		this.topTxt.addEventListener('input',this.textListner, false);
		this.bottomTxt.addEventListener('input',this.textListner, false);
		this.fontHeight = document.getElementById('textHeight');
		this.fontHeight.value = 20;
		this.fontHeight.addEventListener('input',this.adjustFontHeight, false);
		this.radioBtns = document.getElementsByClassName('radio');
		for (radioBtn in this.radioBtns){
			this.radioBtns[radioBtn].onclick = function() {
				var filter = this.value;
				meme.updateCanvas(filter);
			}
		}
		this.rgbaValues = document.getElementsByClassName('rgba');
		for( i in this.rgbaValues){
			this.rgbaValues[i].onchange = function() {
				switch(this.id){
					case 'r':
						meme.r = this.value;
						break;
					case 'g':
						meme.g = this.value;
						break;
					case 'b':
						meme.b= this.value;
						break;
					case 'a':	
						meme.a = this.value;
						break;
					default:
						break;
				}
				meme.updateCanvas(this.value);
			}
		}
	},
	updateCanvas: function(filter) {
		meme.redraw();
		imgdata = meme.imgData();
		var data = imgdata.data;
		if (filter !== "reset") {
			for(i=0;i < (data.length); i+=4){
				r=data[i];
				g=data[i+1];
				b=data[i+2];
				a = data[i+3]
				var pixel = [r,g,b,a]
				var d = meme.applyFilter(filter, pixel);
				data[i] = d[0];
				data[i+1] = d[1];
				data[i+2] = d[2];
				data[i+3] = d[3]
				imgdata.data = data;	
			}
			meme.renderCanvas();
		}
		else {
			meme.redraw();
			imgdata = imgData;
			meme.renderCanvas();
		}	
		
	},
	renderCanvas: function() {	
		ctx.putImageData(imgdata, 0, 0);
		var width = windWidth;
		var r = this.img.width/this.img.height;
		var h = width/r;
		// if (h > windWidth){
		// 	h = windWidth;
		// }
		if(this.topTxt.value !== null){
			ctx.fillText(this.topTxt.value, width/2,40);
			ctx.strokeText(this.topTxt.value, width/2, 40);
		}
		if(this.bottomTxt.value !== null && this.bottomTxt.value !== undefined){
			ctx.fillText(this.bottomTxt.value,width/2,h-20);
			ctx.strokeText(this.bottomTxt.value, width/2, h -20);
		}
	},
	getFieldValues: function(){
		return [this.topTxt.value, this.bottomTxt.value];
	},
	adjustFontHeight: function() {
		meme.redraw();
	},
	applyFilter: function(filter, pixel) {
		switch(filter){
			case 'greyscale':
				var avg =  parseFloat((pixel[0]+pixel[1]+pixel[2])/3);
				pixel = [avg,avg,avg, pixel[3]];
				break;
			case 'red':
				var avg =  parseFloat((pixel[0]+pixel[1]+pixel[2])/3);
				pixel = [avg, 0, 0, pixel[3]];
				break;
			case 'green':
				var avg =  parseFloat((pixel[0]+pixel[1]+pixel[2])/3);
				pixel = [0, avg, 0, pixel[3]];
				break;	
			case 'blue':
				var avg =  parseFloat((pixel[0]+pixel[1]+pixel[2])/3);
				pixel = [0, 0, avg, pixel[3]];
				break;
			case 'onlyRed':
				if(true) {
					var avg =  parseFloat((pixel[0]+pixel[1]+pixel[2])/3);
					pixel = [avg, 0, 0, pixel[3]];
				}
				else {
					var avg =  parseFloat((pixel[0]+pixel[1]+pixel[2])/3);
					pixel = [avg,avg,avg, pixel[3]];
				}
				break;	
			default:
				pixel = [pixel[0]*meme.r, pixel[1]*meme.g, pixel[2]*meme.b, pixel[3]*meme.a];
				break;
		}
		return pixel;
	},
	imgData: function() {
		return imgData;
	},
	activateListners: function() {
		this.saveBtn = document.getElementsByClassName('save')[0];
		this.saveBtn.addEventListener('click', function() {
			meme.saveImg();
		});
		var filterOptions = document.querySelectorAll('input[name="filterType"]');
		for (filterType in filterOptions) {
			filterOptions[filterType].onclick = function (){
				if (this.value === "presets") {
					document.getElementsByClassName('presets')[0].style.display = "block";
					document.getElementsByClassName('diy')[0].style.display = "none";
				}
				else {
					document.getElementsByClassName('diy')[0].style.display = "block";
					document.getElementsByClassName('presets')[0].style.display = "none";
				}
			};
		}
		document.querySelector('#upload').addEventListener('change',this.fileSelect,false);
	},
	saveImg: function(){
		window.open(c.toDataURL(this.img));
	},
	textListner: function() {
		meme.redraw();
	},
	redraw: function() {
		var img = this.src, topTxt = this.topTxt.value, bottomTxt = this.bottomTxt.value;
		ctx.clearRect(0, 0, c.width, c.height);
		if (img !== null && img !== undefined){
			var width = windWidth;
			var r = this.img.width/this.img.height;
			var h = width/r;
			// if (h > windWidth){
			// 	h = windWidth;
			// }
			this.adjustCanvasDimension(h, width);
			ctx.drawImage(img, 0,0, width, h);
			imgData = ctx.getImageData(0,0,c.width, c.height);
			if(topTxt !== null){
				ctx.fillText(topTxt,width/2,40);
				ctx.strokeText(topTxt, width/2, 40);
			}
			if(bottomTxt !== null && bottomTxt !== undefined){
				ctx.fillText(bottomTxt,width/2,h-20);
				ctx.strokeText(bottomTxt, width/2, h -20);
			}
		}
		else{
			alert('Please upload an Image before generating Meme');
		}
		
		
	},
	adjustCanvasDimension: function(h,w){
		c.width = w;
		c.height = h;
		ctx.fillStyle = "#ffffff";
		ctx.strokeStyle = "#000000";
		ctx.font = "bold "+this.fontHeight.value+"pt Roboto";
		ctx.textAlign = "center";
		ctx.lineWidth = "3pt";
	},
	fileSelect: function(evt) {
		var cH = windWidth;
		var cW = windWidth;
		var file = evt.target.files[0];

		var reader = new FileReader();
		reader.onload = function(obj){
			var data = obj.target.result;

			var img = new Image();

			img.onload = function() {
				meme.src = this;
				meme.img = img;
				meme.redraw();
			};
			img.src = obj.target.result;
			if (img.src != "") {
				document.querySelector('.textSetup').style.display = "block";
				document.querySelector('.imageSetup').style.display = "block";
				document.querySelector('.saveImg').style.display = "block";
			}
		};
		reader.readAsDataURL(file);

	}

};

meme.init();