var c = document.querySelector('#sheet');
		var ctx = c.getContext('2d');
		ctx.fillStyle = "white";
		ctx.strokeStyle = "black";
		ctx.font = "bold 30pt Roboto";
		ctx.textAlign = "center";
		ctx.lineWidth = "3pt";
		
		function saveImg(){
			window.open(c.toDataURL(window.img));
		}
		
		function textListner(evt){
			var id = evt.target.id;
			var val = evt.target.value;
			if (id === "memeText"){
				window.text = val;
			}
			else if(id === "bottomTxt"){
				window.color = val;
			}
			redraw(window.src, window.text, window.color);
		}

		function fileSelect(evt){
			console.log('getting called');
			var cH = 500;
			var cW = 500;
			var file = evt.target.files[0];

			var reader = new FileReader();
			reader.onload = function(obj){
				var data = obj.target.result;

				var img = new Image();

				img.onload = function(){
					window.src = this;
					window.img = img;

					redraw(window.src, null, null);
				}
				img.src = obj.target.result;
			};
			reader.readAsDataURL(file);
		}

		function redraw(img, topTxt, bottomTxt){
			ctx.clearRect(0, 0, c.width, c.height);
			if (img !== null){
				var width = 500;
				var r = window.img.width/window.img.height;
				var h = width/r;
				if (h > 500){
					h = 500;
				}
				ctx.drawImage(img, 0,0,width, h);
			}
			
			if(topTxt !== null){
				ctx.fillText(topTxt,width/2,40);
				ctx.strokeText(topTxt, width/2, 40);
			}
			if(bottomTxt !== null && bottomTxt !== undefined){
				ctx.fillText(bottomTxt,width/2,h-20);
				ctx.strokeText(bottomTxt, width/2, h -20);
			}
		}

		var memeText = document.getElementById('memeText');
		var bottomTxt = document.getElementById('bottomTxt');
		memeText.oninput = textListner;
		bottomTxt.oninput = textListner;
		document.querySelector('button').addEventListener('click',saveImg, false);
		document.querySelector('#upload').addEventListener('change',fileSelect,false);