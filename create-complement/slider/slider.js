var slider = function(infoSliderImagesAndLinks)
{
	this.infoSliderImagesAndLinks = infoSliderImagesAndLinks;
	this.create = function()
	{
		/*
		this.board = EduInt.createBoard(this.infoSliderImagesAndLinks.name,this.infoSliderImagesAndLinks.max_width,this.infoSliderImagesAndLinks.max_height).setBoardInID(this.infoSliderImagesAndLinks.id);
		this.board.my.infoSliderImagesAndLinks = this.infoSliderImagesAndLinks;
		this.board.start(function(){
			this.my.arSliders = [];
			for(var countImageSlider = 0;countImageSlider<this.my.infoSliderImagesAndLinks.imagesLinksAndColor.length;countImageSlider++)
			{
				var imageAndLink = this.my.infoSliderImagesAndLinks.imagesLinksAndColor[countImageSlider];
				var nameImage = 'imageSlider' + countImageSlider;
				this.t(nameImage).setType('html').setHTML('<img style="width: 100%"  src="'+this.my.infoSliderImagesAndLinks.folderImages+'/'+imageAndLink[0]+'" alt="" />');
				this.t(nameImage).element.style.width = '100%';
			}
		});
		this.board.createAnimation(function(){
			for(var countImageSlider = 0;countImageSlider<this.my.infoSliderImagesAndLinks.imagesLinksAndColor.length;countImageSlider++)
			{
				
			}
		});//.startAnimation();
		*/
		
		this.slider = document.getElementById(this.infoSliderImagesAndLinks.id);
		var initialColor = this.infoSliderImagesAndLinks.imagesLinksAndColor[0][2];
		this.slider.style.backgroundColor = initialColor;

		this.slidercontainer = document.createElement('div');
		this.slidercontainer.className = 'c_slidercontainer';
		this.slider.appendChild(this.slidercontainer);

		this.anchoslider = this.slider.offsetWidth;
		this.anchoslidercontainer = this.slidercontainer.offsetWidth;
		this.altoslidercontainer = this.anchoslidercontainer*500/900;
		this.slidercontainer.style.height = BasicEI.measure(this.altoslidercontainer);
		this.slidercontainer.style.width = '100%';
		this.slidercontainer.style.position = 'relative';




		this.slidercontent = document.createElement('div');
		this.slidercontent.className = 'c_slidercontent';
		this.slidercontent.style.width = BasicEI.measure(this.anchoslidercontainer);
		this.slidercontent.style.height = BasicEI.measure(this.altoslidercontainer);
		this.slidercontent.style.position = 'relative';
		this.slidercontent.style.margin = '0 auto';

		this.slidercontainer.appendChild(this.slidercontent);

		this.slidercontentleft = document.createElement('div');
		this.slidercontentleft.className = 'c_slidercontentleft';
		this.slidercontentleft.style.height = BasicEI.measure(this.altoslidercontainer);
		this.slidercontentleft.style.position = 'absolute';
		this.slidercontentleft.style.top = '0px'
		this.slidercontentleft.style.left = '0px'
		this.slidercontentleft.style.zIndex = '1';
		this.slidercontentleft.style.backgroundColor = initialColor;
		this.slidercontainer.appendChild(this.slidercontentleft);

		this.slidercontentright = document.createElement('div');
		this.slidercontentright.className = 'c_slidercontentright';
		this.slidercontentright.style.height = BasicEI.measure(this.altoslidercontainer);
		this.slidercontentright.style.backgroundColor = initialColor;
		this.slidercontentright.style.position = 'absolute';
		this.slidercontentright.style.top = '0px'
		this.slidercontentright.style.right = '0px'
		this.slidercontentright.style.zIndex = '1';
		this.slidercontainer.appendChild(this.slidercontentright);

		if(900<this.anchoslider)
		{
			var valoranchorlado = (this.anchoslider - 900)/2;
			this.slidercontentright.style.width=BasicEI.measure(valoranchorlado);
			this.slidercontentleft.style.width=BasicEI.measure(valoranchorlado);
		}
		else
		{
			this.slidercontentright.style.display = 'none';
			this.slidercontentleft.style.display = 'none';
		}

		this.slidercontenta = [];
		this.slidercontentimage = [];
		this.sliderinfo = [];
		this.info = {};
		this.info.incontent = 0;
		this.info.intraslate = false;
		this.info.moveto = 'left';
		this.info.numcontents = this.infoSliderImagesAndLinks.imagesLinksAndColor.length;
		this.info.timetochange = 0;
		this.info.play = true;
		this.info.contentfirst = 0;
		this.info.contentlast = this.info.numcontents-1;
		this.info.original_timetochange = this.infoSliderImagesAndLinks.timetochange;

		var bnEsElPrimero = true;
		for(var countImageSlider = 0;countImageSlider<this.info.numcontents;countImageSlider++)
		{
			var imageAndLink = this.infoSliderImagesAndLinks.imagesLinksAndColor[countImageSlider];
			
				this.sliderinfo[countImageSlider] = {};

				this.slidercontenta[countImageSlider] = document.createElement('a');
				this.slidercontenta[countImageSlider].href = imageAndLink[1];
				this.slidercontenta[countImageSlider].style.display = 'block';
				this.slidercontenta[countImageSlider].style.width = BasicEI.measure(this.anchoslidercontainer);
				this.slidercontenta[countImageSlider].style.height = BasicEI.measure(this.altoslidercontainer);
				this.slidercontenta[countImageSlider].SliderImagesAndLinks = this;
				this.slidercontenta[countImageSlider].onmouseover = function(){
					this.SliderImagesAndLinks.stopToMove();
				}
				this.slidercontenta[countImageSlider].onmouseout = function(){
					//	this.SliderImagesAndLinks.resetTimeToMove();
					this.SliderImagesAndLinks.startToMove();
				}

				this.slidercontenta[countImageSlider].style.position = 'absolute';
				this.slidercontenta[countImageSlider].style.top = '0';
				this.sliderinfo[countImageSlider].left = countImageSlider*100;
				this.slidercontenta[countImageSlider].style.left = this.sliderinfo[countImageSlider].left+'%';

			this.slidercontent.appendChild(this.slidercontenta[countImageSlider]);

				this.slidercontentimage[countImageSlider] = document.createElement('img');
				this.slidercontentimage[countImageSlider].src = this.infoSliderImagesAndLinks.folderImages + '/' + imageAndLink[0];
				this.slidercontentimage[countImageSlider].style.width = BasicEI.measure(this.anchoslidercontainer);
				this.slidercontentimage[countImageSlider].style.height = BasicEI.measure(this.altoslidercontainer);

			this.slidercontenta[countImageSlider].appendChild(this.slidercontentimage[countImageSlider]);

			bnEsElPrimero=false;
		}

			this.slidercontentbotonleft = document.createElement('div');
			this.slidercontentbotonleft.style.position = 'absolute';
			this.slidercontentbotonleft.style.top = '50%';
			this.slidercontentbotonleft.style.marginTop = '-40px';
			this.slidercontentbotonleft.style.left = '40px';
			this.slidercontentbotonleft.style.width = '80px';
			this.slidercontentbotonleft.style.height = '80px';
			this.slidercontentbotonleft.style.cursor = 'pointer';
			this.slidercontentbotonleft.style.backgroundImage = 'url('+infoSliderImagesAndLinks.folderDefaultImages+'/signals-slider.png)';
			this.slidercontentbotonleft.zIndex = 2;
			this.slidercontentbotonleft.slider = this;
			this.slidercontentbotonleft.onclick = function()
			{ this.slider.moveRight(); }
			this.slidercontentbotonleft.onmouseover = function()
			{ this.style.backgroundPosition = '0px -80px'; }
			this.slidercontentbotonleft.onmouseout = function()
			{ this.style.backgroundPosition = '0px 0'; }
			this.slidercontent.appendChild(this.slidercontentbotonleft);

			this.slidercontentbotonright = document.createElement('div');
			this.slidercontentbotonright.style.position = 'absolute';
			this.slidercontentbotonright.style.top = '50%';
			this.slidercontentbotonright.style.marginTop = '-40px';
			this.slidercontentbotonright.style.right = '40px';
			this.slidercontentbotonright.style.width = '80px';
			this.slidercontentbotonright.style.height = '80px';
			this.slidercontentbotonright.style.cursor = 'pointer';
			this.slidercontentbotonright.style.backgroundImage = 'url('+infoSliderImagesAndLinks.folderDefaultImages+'/signals-slider.png)';
			this.slidercontentbotonright.style.backgroundPosition = '80px 0';
			this.slidercontentbotonright.zIndex = 2;
			this.slidercontentbotonright.slider = this;
			this.slidercontentbotonright.onclick = function()
			{ this.slider.moveLeft(); }
			this.slidercontentbotonright.onmouseover = function()
			{ this.style.backgroundPosition = '80px -80px'; }
			this.slidercontentbotonright.onmouseout = function()
			{ this.style.backgroundPosition = '80px 0'; }
			this.slidercontent.appendChild(this.slidercontentbotonright);

		this.slidercontentbotonsposition = [];
		var bnEsElPrimero = true;
		for(var countImageSlider = 0;countImageSlider<this.info.numcontents;countImageSlider++)
		{
			this.slidercontentbotonsposition[countImageSlider] = document.createElement('div');
			this.slidercontentbotonsposition[countImageSlider].style.width='40px';
			this.slidercontentbotonsposition[countImageSlider].style.height='40px';
			this.slidercontentbotonsposition[countImageSlider].style.position='absolute';
			this.slidercontentbotonsposition[countImageSlider].style.left=(40*(1+countImageSlider))+'px';
			this.slidercontentbotonsposition[countImageSlider].style.bottom='40px';
			this.slidercontentbotonsposition[countImageSlider].style.backgroundImage = 'url('+infoSliderImagesAndLinks.folderDefaultImages+'/signals-slider.png)';
			this.slidercontentbotonsposition[countImageSlider].num=countImageSlider;
			this.slidercontentbotonsposition[countImageSlider].slider = this;
			if(bnEsElPrimero)
			{
				this.slidercontentbotonsposition[countImageSlider].style.backgroundPosition = '0px -160px';
			}
			else
			{ this.slidercontentbotonsposition[countImageSlider].style.backgroundPosition = '-40px -160px'; }
			this.slidercontentbotonsposition[countImageSlider].onclick = function()
			{
				this.slider.moveTo(this.num);
			}
			this.slidercontentbotonsposition[countImageSlider].onmouseover = function()
			{
				this.changeToOn();
			}
			this.slidercontentbotonsposition[countImageSlider].onmouseout = function()
			{
				if(this.slider.info.incontent!=this.num)
				{
					this.changeToOff();
				}
			}
			this.slidercontentbotonsposition[countImageSlider].changeToOn = function()
			{
				this.style.backgroundPosition = '0px -160px';
			}
			this.slidercontentbotonsposition[countImageSlider].changeToOff = function()
			{
				this.style.backgroundPosition = '-40px -160px';
			}

			this.slidercontent.appendChild(this.slidercontentbotonsposition[countImageSlider]);

			bnEsElPrimero=false;
		}
		this.animation = EduInt.createAnimation()
		this.animation.addFunction(function(info){
			//	Solo inicia si esta la oren para moverlo
			if(this.info.intraslate)
			{
				//	Mueve la primera o la ultima imagen para la derecha o la izquierda
				if(this.qstnFirstMovement())
				{
					if(this.info.moveto == 'left')
					{
						if(this.info.contentfirst!=this.info.incontent)
						{
							this.sliderinfo[this.info.contentfirst].left = (this.info.numcontents-1)*100;
							this.slidercontenta[this.info.contentfirst].style.left = this.sliderinfo[this.info.contentfirst].left + '%';

							this.info.contentlast = this.info.contentfirst;
							this.info.contentfirst = this.getRealNumberOfSlider(this.info.contentfirst+1);
						}

						this.slidercontentright.style.backgroundColor = this.infoSliderImagesAndLinks.imagesLinksAndColor[this.getNext()][2];
					}
					else
					{
						if(this.info.incontent!=this.info.contentlast)
						{
							this.sliderinfo[this.info.contentlast].left = -100;
							this.slidercontenta[this.info.contentlast].style.left = this.sliderinfo[this.info.contentlast].left + '%';

							this.info.contentfirst = this.info.contentlast;
							this.info.contentlast = this.getRealNumberOfSlider(this.info.contentlast-1);
						}
						
						this.slidercontentleft.style.backgroundColor = this.infoSliderImagesAndLinks.imagesLinksAndColor[this.getPrevious()][2];
					}
				}

				//	Mueve todos los cuadros
				for(var countImageSlider = 0;countImageSlider<this.info.numcontents;countImageSlider++)
				{
					if(this.info.moveto == 'left')
					{
						this.sliderinfo[countImageSlider].left = this.sliderinfo[countImageSlider].left + 6.25 * -1;
					}
					else
					{
						this.sliderinfo[countImageSlider].left = this.sliderinfo[countImageSlider].left + 6.25 * 1; // 3.125
					}
					
					this.slidercontenta[countImageSlider].style.left = this.sliderinfo[countImageSlider].left + '%';	
				}

				if(this.info.moveto == 'left')
				{
					if(this.sliderinfo[this.info.incontent].left <= -100)
					{
						this.info.numPositionsToMove--;
						if(this.info.numPositionsToMove==0)
						{ this.info.intraslate = false; }
						this.slidercontentleft.style.backgroundColor = this.infoSliderImagesAndLinks.imagesLinksAndColor[this.getNext()][2];
						this.slidercontainer.style.backgroundColor = this.infoSliderImagesAndLinks.imagesLinksAndColor[this.getNext()][2];
						this.info.incontent = this.getRealNumberOfSlider(this.info.incontent + 1);
					}
				}
				else
				{
					if(100 <= this.sliderinfo[this.info.incontent].left)
					{
						this.info.numPositionsToMove--;
						if(this.info.numPositionsToMove==0)
						{ this.info.intraslate = false; }
						this.slidercontentright.style.backgroundColor = this.infoSliderImagesAndLinks.imagesLinksAndColor[this.getPrevious()][2];
						this.slidercontainer.style.backgroundColor = this.infoSliderImagesAndLinks.imagesLinksAndColor[this.getPrevious()][2];
						this.info.incontent = this.getRealNumberOfSlider(this.info.incontent - 1);
					}
				}

				if(!this.info.intraslate)
				{
					this.resetTimeToMove();
					for(var countImageSlider = 0;countImageSlider<this.info.numcontents;countImageSlider++)
					{
						if(this.info.incontent != countImageSlider)
						{
							this.slidercontentbotonsposition[countImageSlider].changeToOff();
						}
						else
						{
							this.slidercontentbotonsposition[countImageSlider].changeToOn();
						}
					}
				}
				this.info.bnFirstMovement = false;
			}
			else
			{
				if(this.qstnIsPlaying())
				{
					if(this.info.original_timetochange < this.info.timetochange)
					{
						this.moveLeft();
					}
					this.info.timetochange += parseInt(1000/info.numFramePerSecond);
				}
			}
			
		},{},this).start();
	};
	this.moveLeft = function()
	{
		if(!this.info.intraslate)
		{
			this.info.intraslate = true;
			this.info.moveto = 'left';
			this.info.bnFirstMovement = true;
			this.info.numPositionsToMove = 1;
		}
	};
	this.moveRight = function()
	{
		if(!this.info.intraslate)
		{
			this.info.intraslate = true;
			this.info.moveto = 'right';
			this.info.bnFirstMovement = true;
			this.info.numPositionsToMove = 1;
		}
	};
	this.moveTo = function(num)
	{
		if(!this.info.intraslate)
		{
			if(this.info.incontent != num)
			{
				this.info.intraslate = true;
				this.info.moveto = 'left';
				this.info.bnFirstMovement = true;
				if(this.info.incontent < num)
				{
					this.info.numPositionsToMove = (num - this.info.incontent);
				}
				else
				{
					num = num + this.info.numcontents - 1;
					this.info.numPositionsToMove = (num);	
				}
			}
		}
	};
	this.qstnFirstMovement = function()
	{
		return this.info.bnFirstMovement;
	};
	this.resetTimeToMove = function()
	{
		this.info.timetochange = 0;
	};
	this.startToMove = function()
	{
		this.info.play = true;
	};
	this.getRealNumberOfSlider = function(numSlider)
	{
		while(numSlider<0)
			{ numSlider = numSlider+this.info.numcontents; }
		while(this.info.numcontents<=numSlider)
			{ numSlider = numSlider-this.info.numcontents; }
		return numSlider;
	}
	this.getPrevious = function()
	{ return this.getRealNumberOfSlider(this.info.incontent-1); };
	this.getNext = function()
	{ return this.getRealNumberOfSlider(this.info.incontent+1); };
	this.stopToMove = function()
	{
		this.info.play = false;
	};
	this.qstnIsPlaying = function()
	{
		return this.info.play;
	};
}