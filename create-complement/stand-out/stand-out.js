EduInt.createPersonalizedType('form','stand-out',function(){
	
	this.my.radius = 12;

	this.svgThingType = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	this.svgThingType.setAttribute("width", (this.my.radius*2) +'px');
	this.svgThingType.setAttribute("height", (this.my.radius*2) + 'px');
	this.svgThingType.style.position='absolute';
	//object.object.setAttribute("draggable", "false");

	//	Ingresamos el nuevo objeto
	this.putThisElementInDivOfBoard(this.svgThingType);
	
	this.my.widthCircle = 1;

	this.my.circles = [];

	this.my.setProperties = function(jsonPosition,jsonCharacteristics)
	{
		this.jsonPosition = jsonPosition;
		this.jsonCharacteristics = jsonCharacteristics;
	}

	for(var countNumberOfCircles = 0; countNumberOfCircles < this.my.radius/this.my.widthCircle; countNumberOfCircles++)
	{
		var radiusUp = this.my.radius - (countNumberOfCircles * this.my.widthCircle);
		var radiusDown = this.my.radius - (countNumberOfCircles + 1) * this.my.widthCircle;

		this.my.circles[countNumberOfCircles] = document.createElementNS(this.svgThingType.namespaceURI, "path");
		var path = 'M' + this.my.radius + ' ' + (countNumberOfCircles*this.my.widthCircle);

		path = path + ' ' + 'A' + (radiusUp) + ' ' + (radiusUp) + ', 0, 0, 1, ' + (2*this.my.radius - countNumberOfCircles*this.my.widthCircle) + ' ' + (this.my.radius);
		path = path + ' ' + 'A' + (radiusUp) + ' ' + (radiusUp) + ', 0, 0, 1, ' + (this.my.radius) + ' ' + (2*this.my.radius - countNumberOfCircles*this.my.widthCircle);
		path = path + ' ' + 'A' + (radiusUp) + ' ' + (radiusUp) + ', 0, 0, 1, ' + (countNumberOfCircles*this.my.widthCircle) + ' ' + (this.my.radius);
		path = path + ' ' + 'A' + (radiusUp) + ' ' + (radiusUp) + ', 0, 0, 1, ' + (this.my.radius) + ' ' + (countNumberOfCircles*this.my.widthCircle);
		
		path = path + ' ' + 'L' + (this.my.radius) + ' ' + ((countNumberOfCircles + 1) * this.my.widthCircle);
		
		//path = path + ' ' + 'L' + (2*radius - widthCircle) + ' ' + (radius);
		//path = path + ' ' + 'L' + radius + ' ' + (2*radius - widthCircle);
		//path = path + ' ' + 'L' + widthCircle + ' ' + (radius);
		//path = path + ' ' + 'L' + radius + ' ' + widthCircle;
		
		if(this.my.radius < (2*this.my.radius - (countNumberOfCircles + 1)*this.my.widthCircle))
		{
			path = path + ' ' + 'A' + (radiusDown) + ' ' + (radiusDown) + ', 0, 0, 0, ' + ((countNumberOfCircles + 1)*this.my.widthCircle) + ' ' + (this.my.radius);
			path = path + ' ' + 'A' + (radiusDown) + ' ' + (radiusDown) + ', 0, 0, 0, ' + (this.my.radius) + ' ' + (2*this.my.radius - (countNumberOfCircles + 1)*this.my.widthCircle);
			path = path + ' ' + 'A' + (radiusDown) + ' ' + (radiusDown) + ', 0, 0, 0, ' + (2*this.my.radius - (countNumberOfCircles + 1)*this.my.widthCircle) + ' ' + (this.my.radius);
			path = path + ' ' + 'A' + (radiusDown) + ' ' + (radiusDown) + ', 0, 0, 0, ' + (this.my.radius) + ' ' + ((countNumberOfCircles + 1)*this.my.widthCircle);
		}
		path = path + ' ' + 'Z';

		this.my.circles[countNumberOfCircles].setAttribute("d",path);

		this.my.circles[countNumberOfCircles].setAttribute("fill",'#0AF');

		//	this.my.circles[countNumberOfCircles].setAttribute("opacity", ((Math.sin((countNumberOfCircles*this.my.widthCircle)  * Math.PI / this.my.radius)) + 1)/2 * 0.5);


		this.svgThingType.appendChild(this.my.circles[countNumberOfCircles]);
	}

	this.my.velInColor = 3/4;
	this.my.numFrameToCHange = 0;
	this.my.accChange = function()
	{
		for(var countNumberOfCircles = 0; countNumberOfCircles < this.radius/this.widthCircle; countNumberOfCircles++)
		{
			this.circles[countNumberOfCircles].setAttribute("opacity", ((Math.sin((countNumberOfCircles*this.widthCircle + (this.numFrameToCHange*this.velInColor)) * 2 * Math.PI / this.radius)) + 1)/2 * 0.3);
		}
		this.numFrameToCHange++;
	}
});
casa = 0;

var ei_standOut = {
	our_default: {
		jsonPosition: {  },
		jsonCharacteristics: {  },
	},
	createBoardBody: function(name){
		this.board = EduInt.createBoardThingsInBody(name);
	},
	create: function(jsonCharacteristics){
		if(jsonPosition!==undefined)
		{
			this.jsonPosition = jsonPosition;
			if(this.jsonPosition.posInX)
			{

			}
			if(this.jsonPosition.posInY)
			{

			}
		}
		else
		{ this.jsonPosition = this.our_default.jsonPosition; }

		if(jsonCharacteristics!==undefined)
		{ this.jsonCharacteristics = jsonCharacteristics; }
		else
		{ this.jsonCharacteristics = this.our_default.jsonCharacteristics; }

		this.createBoardBody('casa');

		this.board.start(function(){
			this.t('casaaa');
		});

		this.board.createAnimation(function(){
			this.t('casaaa').setType('form','stand-out').setPosition(198,0);

		}).startAnimation();
	},
};