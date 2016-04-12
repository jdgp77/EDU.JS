var Presentation = function(presentation){
	//	Guarda los valores de las diapositivas
	this.idPresentation = presentation.idPresentation;
	this.name = presentation.name;
	this.arSlides = presentation.arSlides;
	this.width = presentation.width;
	this.height = presentation.height;

	//	Crea la primera diapositiva
	this.create = function(){
		//	Crea el tablero de las diapositivas
		this.cretePresentation();
		//	Cargamos el primer slide
		this.loadSlide(this.arSlides[0].name);
	};
	this.createBoard = function(){
		//	Crea uno con las siguientes especifcaciónes
		this.board = $('#'+this.idBoard).createBoard(this.name,this.width,this.height);
	}
	this.cretePresentation = function(){
		//	Solo si no existe la crea
		if(this.oPresentation === undefined)
		{
			//	
			this.oPresentation = document.getElementById(this.idPresentation);
			//	Crea los objetos
			this.oDivImage = document.createElement('div');
			this.oDivImageImg = document.createElement('img');
			this.oDivContent = document.createElement('div');
			this.oDivContentTitle = document.createElement('div');
			this.oDivContentText = document.createElement('div');
			this.oDivContentBottons = document.createElement('div');
			//	Agrega las clases correspondientes
			this.oDivImage.className = 'images';
			this.oDivContent.className = 'content';
			this.oDivContentTitle.className = 'title';
			this.oDivContentText.className = 'text';
			this.oDivContentBottons.className = 'bottons';
			//	Agrega los objetos al objeto base
			this.oPresentation.appendChild(this.oDivImage);
				this.oDivImage.appendChild(this.oDivImageImg);
			this.oPresentation.appendChild(this.oDivContent);
				this.oDivContent.appendChild(this.oDivContentTitle);
				this.oDivContent.appendChild(this.oDivContentText);
				this.oDivContent.appendChild(this.oDivContentBottons);
		}
	}
	//	Carga otra diapositiva
	this.loadSlide = function(nameSlide)
	{
		//	Pasamos por cada una de las diapositivas
		for(countSlide=0;countSlide<this.arSlides.length;countSlide++)
		{
			var this_slide = this.arSlides[countSlide];

			if(nameSlide == this_slide.name)
			{
				//	Ingresa el titulo, si existe
				if(this_slide.title) { this.oDivContentTitle.innerHTML = this_slide.title; }
				//	Agrega el texto, si existe
				if(this_slide.text) { this.oDivContentText.innerHTML = this_slide.text; }
				//	Agrega la imagen, si existe
				if(this_slide.image) { this.oDivImageImg.src=this_slide.image.url; }
				//	Crea un tablero, si existe
				if(this_slide.board)
				{
					//	Crea el tablero
					this_slide.board.board = $(this.oDivImage).createBoard(this_slide.board.name,this_slide.board.width,this_slide.board.height);
					//	Crea los objetos
					this_slide.board.board.start(this_slide.board.start);
					//	Crea la animación
					this_slide.board.board.createAnimation(this_slide.board.animation).startAnimation();
				}
				//	Carga los botones , si existe
				if(this_slide.bottons)
				{
					var bottons = this_slide.bottons;
					//	Html con los botones a crear
					var htmlBottons = '';
					//	Pasa por cada uno de los botones
					for(var countBottons=0;countBottons<bottons.length;countBottons++)
					{
						var botton = bottons[countBottons];

						htmlBottons = htmlBottons + '<a href="#" class="'+(botton.predefined?'predefined':'')+'" onclick="presentation_ei.loadSlide(\''+botton.go_to+'\')" >'+botton.text+'</a>';
					}
					//	Ingresa los botones
					this.oDivContentBottons.innerHTML = htmlBottons;
				}
			}
		}
	};
};