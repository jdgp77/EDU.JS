//	Todas las funciones basicas de Educación Interactiva estan aca
var BasicEI = {
	//	Genera un numero aleatorio
	//	1,1.2,1.423
	random: function(value1,value2) {
		if(value2==undefined) { value2=0; }
		parseInt(Math.random(lugaresEnX)*(value2)+value1);
	},
	//	1,2,3,4,5 <= BasicEI.randomInt(1,5)
	//	1,2,3,4 <= BasicEI.randomInt(4)
	randomInt: function(value1,value2) {
		parseInt(Math.random()*(value2)+value1);
	},
	//	Une dos diferentes json para añadir las opciones por defecto
	//	{ nombre: 'juan', instituto: 'ssa' } = setDefaultOptions({ nombre: 'juan' },{ nombre: '', instituto: 'ssa' })
	setDefaultOptions: function(newJson,defaultJson)
	{
		//	Si no existen nuevos datos retorna el defaultJson
		if(newJson===undefined) { return defaultJson; }

		for(keyDefaultJson in defaultJson)
		{
			if(newJson[keyDefaultJson]===undefined)
			{
				newJson[keyDefaultJson] = defaultJson[keyDefaultJson];
			}
		}

		return newJson;
	},
	getPosInXCursorForEvent: function(event)
	{
		//	En caso de ser touch
		if(event.targetTouches)
		{
			//	Habilitado para touch
			var t=event.targetTouches;
			//	Posicion en x y y del mouse, con respecto al 0,0 del canvas
			return t[0].pageX;//-findPosX_ESt(_arOCanvas_ESt[noLienso].id);
		}
		//	En caso de ser mouse
		else
		{
			//	Posicion en x y y del mouse, con respecto al 0,0 del canvas
			return event.pageX;
		}
	},
	getPosInYCursorForEvent: function(event)
	{
		//	En caso de ser touch
		if(event.targetTouches)
		{
			//	Habilitado para touch
			var t=event.targetTouches;
			//	Posicion en x y y del mouse, con respecto al 0,0 del canvas
			return t[0].pageY;//-findPosY_ESt(_arOCanvas_ESt[noLienso].id);
		}
		//	En caso de ser mouse
		else
		{
			//	Posicion en x y y del mouse, con respecto al 0,0 del canvas
			return event.pageY;
		}
	},
	posEnX: function(object)
	{
		var curleft = 0;
		if(object.offsetParent)
		{
			while(1)
			{
				curleft += object.offsetLeft;
				if(!object.offsetParent) { break; }
				object = object.offsetParent;
			}
		}
		else
		{
			if(object.x)
			{ curleft += object.x; }
		}
		return curleft;
	},
	posEnY: function(object)
	{
		var curtop = 0;
		if(object.offsetParent)
		{
			while(1)
			{
				curtop += object.offsetTop;
				if(!object.offsetParent)
					break;
				object = object.offsetParent;
			}
		}
		else if(object.y)
		{ curtop += object.y; }
		return curtop;
	},
	thingHTMLFunctions: {
		onclick: function(){

		}
	},
	measure: function(measure)
	{
		//	Si es un numero
		if(!isNaN(measure)) { return measure+'px'; }
		//	Si es otra cosa
		else { return measure; }
	},
//	ALERT - Falta comentar
	addThingInputFunctions: function(thing)
	{
		thing.setText = function(text) { return thing.setValue(text); };
		thing.setValue = function(text)
		{
			this.element.value = text;
			return this;
		};
		thing.setTextAlign = function(value)
		{
			this.element.style.textAlign = value;
			return this;
		}
		thing.getValue = function()
		{
			return this.element.value;
		}
	},
//	ALERT - Falta comentar
	addThingTextFunctions: function(thing)
	{
		thing.setText = function(text)
		{
			this.element.innerHTML = text;
			return this;
		};
		thing.getText = function()
		{
			return this.element.innerHTML;
		};
		thing.getValue = function()
		{
			return this.getText();
		};
		thing.setTextAlign = function(value)
		{
			this.element.style.textAlign = value;
			return this;
		}
		thing.setColor = function(value)
		{
			this.element.style.color = value;
			return this;
		}
		thing.setFontSize = function(value)
		{
			if(!isNaN(value)) { value = BasicEI.measure(value); }
			this.element.style.fontSize = value;
			return this;
		}
		thing.setLineHeight = function(value)
		{
			if(!isNaN(value)) { value = BasicEI.measure(value); }
			this.element.style.lineHeight = value;
			return this;
		}
		thing.setTextAlign = function(value)
		{
			this.element.style.textAlign = value;
			return this;
		}
	},
//	ALERT - Falta comentar
	addThingStyleBlockFunctions: function(thing)
	{
		thing.element.onclick = function()
		{
			this.thing.event.onclick=true;
			//	Si existe una función a ejecutar al hacer click
			if(this.thing.funcOnClick) { this.thing.funcOnClick(); }

			console.info('click');
			//	Carga la posición relativa del mouse con el thing
			this.thing.loadPosDelta();
		}
		thing.element.onmouseover = function()
		{
			this.thing.event.onmouseover=true;
		}
		thing.element.onmouseout = function()
		{
			this.thing.event.onmouseover=false;
		}
		thing.element.ontouchstart = function(event)
		{ this.thing.oncursordown(event); }
		thing.element.onmousedown = function(event)
		{ this.thing.oncursordown(event); }
		thing.oncursordown = function(event)
		{
			this.event.bnCursorDown=true;
			//	Carga la posición relativa del mouse con el thing
			this.loadPosDelta(event);

			console.info('oncursordown');
		}
		thing.qstnIsCursorDown = function()
		{ return this.event.bnCursorDown; }
		//	Cuando el cursor deja de estar oprimido
		//	---------------------------------------
		thing.element.ontouchend = function()
		{ this.thing.oncursorup(); }
		thing.element.onmouseup = function()
		{ this.thing.oncursorup(); }
		thing.oncursorup = function()
		{
			this.event.bnCursorDown=false;
			console.info('oncursorup');
		}
		thing.loadPosDelta = function(event)
		{
			if(event===undefined)
			{
				var posMouseInX = this.Board.getMousePosInX();
				var posMouseInY = this.Board.getMousePosInY();
			}
			else
			{
				var boardPosInX = this.Board.getPosInX();
				var boardPosInY = this.Board.getPosInY();
				var posMouseInX = BasicEI.getPosInXCursorForEvent(event)-boardPosInX;
				var posMouseInY = BasicEI.getPosInYCursorForEvent(event)-boardPosInY;
			}
			var posInX = this.getPosInX();
			var posInY = this.getPosInY();
			this.posDeltaInX = posInX-posMouseInX;
			this.posDeltaInY = posInY-posMouseInY;
		}
		thing.bnDragAndDrop = false;
		thing.enDragAndDrop = function()
		{
			this.bnDragAndDrop = true;
			this.addClass('c_DragAndDrop');
			this.Board.addFunctionAnimatedInShadowSimple(function(mioptions){
				if(this.qstnIsCursorDown())
				{
					if(this.Board.qstnIsMouseHover())
					{
						var posMouseInX = this.Board.getMousePosInX();
						var posMouseInY = this.Board.getMousePosInY();

						this.setPosInX(posMouseInX+this.posDeltaInX);
						this.setPosInY(posMouseInY+this.posDeltaInY);
					}
				}
				//	mioptions.thing.accMoveInY();
			},{  }, this );

			return this;
		}
//	Cambiarle el nombre por setBackgroundImage
		thing.setImageUrl = function(urlImage)
		{ EduInt.log.deprecated('setImageUrl','setBackgroundImage'); this.element.style.backgroundImage = "url('"+urlImage+"')"; return this; }
		thing.setBackgroundImage = function(urlImage)
		{ this.element.style.backgroundImage = "url('"+this.Board.defaultPaths.images+urlImage+"')"; return this; }
		thing.setBackgroundImageInAlpha = function(urlImage)
		{ this.setBackgroundImage(urlImage); this.setBackgroundAplpha(); return this; }
		thing.setBackgroundColor = function(backgroundColor)
		{ this.element.style.backgroundColor = backgroundColor; return this; }
		thing.setBackgroundAplpha = function()
		{ this.setBackgroundColor('transparent'); }
		thing.setBackgroundPosition = function(backgroundPosition)
		{ this.element.style.backgroundPosition = backgroundPosition; return this; }

		//	ID
		thing.setId = function(id)
		{ this.element.id = id; return this; }
		thing.addId = function(id)
		{ this.element.id = this.element.id+' '+id; return this; }
		//	Clase
		thing.arClases = [];
		thing.numClases = 0;
		thing.setClass = function(className)
		{ this.element.className = className; this.arClases[0]=this.element.className; this.numClases=1; return this; }
		thing.addClass = function(className)
		{ this.element.className = (this.element.className+' '+className).trim(); this.arClases[this.numClases]=className; this.numClases++; return this; }
		thing.rmClass = function(className)
		{
			var newClases = '';
			var numClases = this.numClases;
			var arClases = this.arClases;
			this.arClases = [];
			this.numClases = 0;
			var bnPrimeraClase = true;
			for(var countClases=0;countClases<numClases;countClases++)
			{
				var clase = arClases[countClases];
				if(clase != className)
				{
					if(bnPrimeraClase)
					{ newClases = clase; }
					else
					{ newClases = newClases+' '+clase; }
					this.arClases[this.numClases++] = clase;
					bnPrimeraClase=false;
				}
			}
			this.element.className = newClases;
			return this;
		}
		//	Ancho
		thing.getWidth = function()
		{ return this.element.offsetWidth; }
		//	Ancho
		thing.getHeight = function()
		{ return this.element.offsetHeight; }
		//	Pregunta si un objeto esta sobre de este
		thing.qstnIsThisThingOver = function(other_thing)
		{
			return BasicEI.qstns.isThisThingOver(this,other_thing);
		}
	},
	addThingCommon: function(thing)
	{
		thing.enAboveAll = function()
		{ this.Container.enAboveAll(); }
		thing.enAboveNormal = function()
		{ this.Container.enAboveNormal(); }
	},
	qstns: {
		isThisThingOver: function(this_thing,other_thing)
		{
			//	Identifica la forma de athcivos
			//	-------------------------------

			var kindOfObjects = '';
			if(this_thing.getType()=='element' && other_thing.getType()=='element')
			{
				if(this_thing.getSubType()=='div' && other_thing.getSubType()=='div')
				{
					kindOfObjects = 'div_to_div';
				};
			};
			if(this_thing.getType()=='element' && other_thing.getType()=='text')
			{
				if(this_thing.getSubType()=='div')
				{
					kindOfObjects = 'div_to_div';
				};
			};
			if(this_thing.getType()=='text' && other_thing.getType()=='element')
			{
				if(other_thing.getSubType()=='div')
				{
					kindOfObjects = 'div_to_div';
				};
			};

			//	Identifica si el objeto esta ensima del otro
			//	-------------------------------
			switch(kindOfObjects)
			{
				case 'div_to_div':
					// Posiciones de nuestro objeto
					var myPosIzq=this_thing.getPosInX();
					var myPosDer=this_thing.getPosInX()+this_thing.getWidth();
					var myPosSup=this_thing.getPosInY();
					var myPosInf=this_thing.getPosInY()+this_thing.getHeight();

					var myPosXIzqSup = myPosIzq;
					var myPosYIzqSup = myPosSup;

					var myPosXDerSup = myPosDer;
					var myPosYDerSup = myPosSup;

					var myPosXIzqInf = myPosIzq;
					var myPosYIzqInf = myPosInf;

					var myPosXDerInf = myPosDer;
					var myPosYDerInf = myPosInf;

					//	Posicion del otro objeto
					var objPosIzq=other_thing.getPosInX();
					var objPosDer=other_thing.getPosInX()+other_thing.getWidth();
					var objPosSup=other_thing.getPosInY();
					var objPosInf=other_thing.getPosInY()+other_thing.getHeight();

					return (
						(	//	Esquina superior izquierda del objeto dentro de este?
							objPosIzq<=myPosXIzqSup && myPosXIzqSup<=objPosDer
							&&
							objPosSup<=myPosYIzqSup && myPosYIzqSup<=objPosInf
						)
						||
						(	//	Esquina superior derecha del objeto dentro de este?
							objPosIzq<=myPosXDerSup && myPosXDerSup<=objPosDer
							&&
							objPosSup<=myPosYDerSup && myPosYDerSup<=objPosInf
						)
						||
						(	//	Esquina inferior izquierda del objeto dentro de este?
							objPosIzq<=myPosXIzqInf && myPosXIzqInf<=objPosDer
							&&
							objPosSup<=myPosYIzqInf && myPosYIzqInf<=objPosInf
						)
						||
						(	//	Esquina inferior derecha del objeto dentro de este?
							objPosIzq<=myPosXDerInf && myPosXDerInf<=objPosDer
							&&
							objPosSup<=myPosYDerInf && myPosYDerInf<=objPosInf
						)
						||
						(	//	Esta arriba y abajo, y en medio de el ancho y el alto
							(myPosSup<objPosSup && objPosInf<myPosInf)
							&&
							(
								(objPosIzq<myPosIzq && myPosIzq<objPosDer)
								||
								(objPosIzq<myPosDer && myPosDer<objPosDer)
							)
						)
						||
						(	//	Esta arriba y abajo, y en medio de el ancho y el alto
							(myPosIzq<objPosIzq && objPosDer<myPosDer)
							&&
							(
								(objPosSup<myPosSup && myPosSup<objPosInf)
								||
								(objPosSup<myPosInf && myPosInf<objPosInf)
							)
						)
					);
					break;
			}
		}
	},
	isArray: function(myArray) {
		return myArray.constructor.toString().indexOf("Array") > -1;
	}
};
//  Esta clase contiene todos las funciones y variables de Educación Interactiva V4, como la cantidad de tableros(Boards) su número, sus nombres, la versión de este objeto.
var EduInt = {
//ALERT - Comentar
	//	Carga el tablero de una base de datos de algun servidor, esto para pegarlo en cualquier pagina web
	//	Ejemplo:
	//		loadBoardIn(object,'http://mipagina.com/juego3','casa=2&paso=3','casa=2&paso=3&hola=mundo')
	loadBoardIn: function(object,path,paramGet,paramPost,onFinish)
	{
		if(paramGet===undefined) { paramGet=''; }
		if(paramPost===undefined) { paramPost=''; }

		var xhttp = new XMLHttpRequest();
		xhttp.object=object;
		xhttp.onFinish=onFinish;
		xhttp.onreadystatechange = function()
		{
			if(xhttp.readyState == 4 && xhttp.status == 200)
			{
				var info=JSON.parse(xhttp.responseText);
				board = EduInt.createBoardIn(xhttp.object, info.title, info.width, info.height, info.start, info.animate);
				board.my.functionToStart=window.atob(info.start);
				board.my.functionToAnimate=window.atob(info.animate);
				board.start(function(info){
                	eval(this.my.functionToStart);
            	});
            	board.createAnimation(function(info){
                	eval(this.my.functionToAnimate);
            	}).startAnimation();

            	xhttp.onFinish(board,info);
			}
		};

		if(paramPost!='')
		{
			xhttp.open("POST", path+(paramGet!==''?'?'+paramGet:''), true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send(paramPost);
		}
		else
		{
			xhttp.open("GET", path+(paramGet!==''?'?'+paramGet:''), true);
			xhttp.send();
		}
	},
//ALERT - Comentar
	//	Arreglo de las animaciónes
	arAnimations: [],
//ALERT - Comentar
	//	Tiene como llave el numero de pasospor segundo de cada animación
	//	Y retorna el numero del arrelgo que tiene esta animacion en
	//	numAnimation <- arAnimation[stepsPerSecond];
	arStepPerSecondInAnimations: [],

//ALERT - Comentar
	//	Crea una animación, en caso de tener los mismos pasos
	//	por segundo que una ya creada, este usa esta.
	createAnimation: function(stepsPerSecond){
		//	Si no tiene pasos por segundo asume que son 25
		if(stepsPerSecond===undefined) { stepsPerSecond=25; }
		//	Si ya existe una animación con ese numero de pasos
		if(this.arStepPerSecondInAnimations[stepsPerSecond]!==undefined)
		{
			//	Guarda la animación ya creada
			var animation = this.arAnimations[this.arStepPerSecondInAnimations[stepsPerSecond]];
		}
		//	Si NO existe una animación con ese numero de pasos
		else
		{
			//	Numero de la nueva animación
			var numAnimations = this.arAnimations.length;
			//	Guarda en un arreglo cada animació
			var animation = new EduInt.newAnimation(stepsPerSecond);
			this.arAnimations[numAnimations] = animation;
			//	Guarda el numero de la animación teniendo como llave
			//	el numero de pasos
			this.arStepPerSecondInAnimations[stepsPerSecond]=numAnimations;
		}
		//	Retorna la animación creada
		return animation;
	},
//ALERT - Comentar
	//	Objeto para animaciónes
	newAnimation: function(stepsPerSecond){
		//	(Animation)
		//	numero de la animacoión
		this.numAnimacion=EduInt.arAnimations.length;
		//	(Animation)
		//	Si y esta corriendo la animación
		this.bnRunAnimation=false;
		//	(Animation)
//	ALERT - Comentar
		//	Arreglo con los ultimos movimientos
 		this.arUltimosMovimientos=[];
 		//	(Animation)
//	ALERT - Comentar
//	Alerta paree ser este el mismo stepsPerSecond
		this.numRegistroUltimosMovimientos = 25;
		//	(Animation)
//	ALERT - Comentar
		//	Numero de pasos
		this.stepsPerSecond=stepsPerSecond;
		//	(Animation)
		//	Retorna el numero de pasos por Segundo
		this.getStepsPerSecond=function()
		{
			return this.stepsPerSecond;
		}
		//	(Animation)
		//	Inicia la animación
		this.start=function()
		{
			//	Si y esta corriendo la animación
			this.bnRunAnimation=true;
			//	Inicia el numero de pasos
			if(this.numPasos==undefined) { this.numPasos=0; }
			//	Cuando incio este
			this.milisegundosInicio=this.milisegundosAhora();
			//	Inicia la animación
			this.animate();
		}
		//	(Animation)
		//	Pausa la animación
		this.pause=function()
		{ this.bnRunAnimation=false; }
		//	(Animation)
		//	Finaliza la animación
		this.stop=function()
		{
			this.pause();
			//	Pasos caminados
			this.numPasos=0;
		}
		//	(Animation)
		this.deleteFunction=function(numFunction)
		{
			this.arFunctionsAnimated[numFunction]=undefined;
			this.arFunctionsAnimated_json[numFunction]=undefined;
			this.arFunctionsAnimated_father[numFunction]=undefined;
		}
		//	(Animation)
		this.deleteFunctions=function(numFunction)
		{
			for(var countFunctionsAnimated=0;countFunctionsAnimated<this.arFunctionsAnimated.length;countFunctionsAnimated++)
			{
				this.deleteFunction(countFunctionsAnimated);
			}
			//	TOdas las funciones para animar
			this.arFunctionsAnimated = [];
			//	Los datos que ingresan a esa funcion a animar
			this.arFunctionsAnimated_json = [];
			//	El padre de esa funcion a animar
			this.arFunctionsAnimated_father = [];
		}
		//	(Animation)
//	ALERT - Comentar
		//	Finaliza la animación
		this.restart=function()
		{ this.stop(); this.start(); }
		//	TOdas las funciones para animar
		this.arFunctionsAnimated = [];
		//	(Animation)
//	ALERT - Comentar
		//	Los datos que ingresan a esa funcion a animar
		this.arFunctionsAnimated_json = [];
		//	(Animation)
		//	El padre de esa funcion a animar
		this.arFunctionsAnimated_father = [];
//	ALERT - Comentar
		//	Valor de la función predefinida
		this.arBnEnFunctionsAnimated = [];
//	ALERT - Comentar
		//	Numero de pasos por esa función
		this.arNumPasosFunctionsAnimated = [];
		//	(Animation)
//	ALERT - Comentar
		//	TOdas las funciones para animar
		this.arBnPredefineFunctionsAnimated = [];
		//	(Animation)
//	ALERT - Comentar
		//	Arreglo, retorna el numero de la llave del nombre y el valor con el numero de la llave de la funcion
		this.arNumNameAndValue = [];
		//	(Animation)
//	ALERT - Comentar
		//	Valor de la función predefinida
		this.arPredefineNameFunctionsAnimated = [];
		//	(Animation)
//	ALERT - Comentar
		//	Valor de la función predefinida
		this.arValueOfFunctionsAnimated = [];
		//	(Animation)
		//	Añade una funcion al animar
		this.addFunction=function(functionOnAnimation,jsonOnFunctionAnimated,father,bnEnAnimation)
		{
			if(bnEnAnimation===undefined) { bnEnAnimation=true; }
			//	numero de la funcion
			var numFunctionAnimated = this.arFunctionsAnimated.length;
			//	Cargamos la función
			this.arFunctionsAnimated[numFunctionAnimated]=functionOnAnimation;
			//	Habilita la animación de esta función
			this.arBnEnFunctionsAnimated[numFunctionAnimated]=bnEnAnimation;
			//	Los datos que ingresan a esa funcion a animar
			if(jsonOnFunctionAnimated !== undefined) { this.arFunctionsAnimated_json[numFunctionAnimated]=jsonOnFunctionAnimated; }
			//	El padre de esa funcion a animar
			if(father !== undefined) { this.arFunctionsAnimated_father[numFunctionAnimated]=father; }
			//	Retorna el numero de la animación
			return numFunctionAnimated;
		};
		//	(Animation)
		//	Habilita o desabilita las funciónes a animar, normalmente ya vienen habilitadas
		this.enFunction=function(numFunctionAnimated)
		{ this.arBnEnFunctionsAnimated[numFunctionAnimated]=true; };
		this.unFunction=function(numFunctionAnimated)
		{ this.arBnEnFunctionsAnimated[numFunctionAnimated]=false; };
		//	(Animation)
		this.addPredefineFunction=function(namePredefineFunctionInAnimation,jsonOnFunctionAnimated,father,bnEnAnimation)
		{
			var numFunctionInAnimation = this.addFunction(namePredefineFunctionInAnimation,jsonOnFunctionAnimated,father,bnEnAnimation);
			//	Informa que esta es una función predefinida
			this.arBnPredefineFunctionsAnimated[numFunctionInAnimation]=true;

			return numFunctionInAnimation;
		};
		//	(Animation)
		//	Cada cuanto realizar el paso
		this.pasosPorUnSegundo = 1000/this.stepsPerSecond;
		//	(Animation)
		//	Ejecuta la animacipón
		this.animate=function()
		{
			//	Si puede continuar con la animación
			if(this.bnRunAnimation)
			{
			//	try
			//	{
					//	Un paso mas caminado
					this.numPasos++;
					//	Funcion a ejecutar
					for(contarFunctionsAnimated=0;contarFunctionsAnimated<this.arFunctionsAnimated.length;contarFunctionsAnimated++)
					{
						var functionAnimated = this.arFunctionsAnimated[contarFunctionsAnimated];
						//	Si estan habilitadas
						if(this.arBnEnFunctionsAnimated[contarFunctionsAnimated])
						{
							var father_;
							if(this.arFunctionsAnimated_father[contarFunctionsAnimated] !== undefined)
							{ father_ = this.arFunctionsAnimated_father[contarFunctionsAnimated]; }
							//	Si son funciones sencillas
							if(!this.arBnPredefineFunctionsAnimated[contarFunctionsAnimated])
							{
									//	Añade el numero de pasos
									if(this.arNumPasosFunctionsAnimated[contarFunctionsAnimated]!==undefined)
									{ this.arNumPasosFunctionsAnimated[contarFunctionsAnimated]++; }
									else
									{ this.arNumPasosFunctionsAnimated[contarFunctionsAnimated]=1; }
									//	Añade el numero de pasos que veria el usuario
									var numPasosFuntion = this.arNumPasosFunctionsAnimated[contarFunctionsAnimated];
									//	Los datos a enviar con ellos
									var datosAEnviar_;
									if(this.arFunctionsAnimated_json[contarFunctionsAnimated] !== undefined)
									{ datosAEnviar_ = this.arFunctionsAnimated_json[contarFunctionsAnimated]; }

									//	El padre de esa funcion a animar
									this.arFunctionsAnimated_father
									var info_ = {
										numFramePerSecond: this.stepsPerSecond,
										numFrame: numPasosFuntion,
										timeInSeconds: (numPasosFuntion/this.stepsPerSecond),
										data: datosAEnviar_,
									};
									if(father_!==undefined)
									{ father_.functionAnimated = functionAnimated; father_.functionAnimated(info_); }
									else
									{ functionAnimated(info_); }
							}
							//	Si son funciones predefinidas
							else
							{
								father_[functionAnimated]();
							}
						}
					}
					//	Mira en cuanto tiempo ejecutar esta misma funcion
					var tiempoEjecucion = this.controlSegundos(this.milisegundosInicio,this.numPasos,this.pasosPorUnSegundo);
					//	if(this.numPasos<50) { console.info(tiempoEjecucion+' = this.controlSegundos('+this.milisegundosInicio+','+this.numPasos+','+this.pasosPorUnSegundo+')'); }
					//	Registra los ultimos this.numRegistroUltimosMovimientos(25 PorDef) en los tiempos
					for(var contRegistroUltimosMovimientos=0;contRegistroUltimosMovimientos<this.numRegistroUltimosMovimientos-1;contRegistroUltimosMovimientos++)
					{ this.arUltimosMovimientos[contRegistroUltimosMovimientos] = this.arUltimosMovimientos[contRegistroUltimosMovimientos+1]; }
					this.arUltimosMovimientos[this.numRegistroUltimosMovimientos-1] = tiempoEjecucion;

					//	Si registra 25 ceros reinicia la animación
					var bnTodosLosTiemposEnCero = false;
					var contLosTiemposEnCero = 0;
					for(var contRegistroUltimosMovimientos=0;contRegistroUltimosMovimientos<this.numRegistroUltimosMovimientos;contRegistroUltimosMovimientos++)
					{ if(this.arUltimosMovimientos[contRegistroUltimosMovimientos]!=0) { break; } else { contLosTiemposEnCero++; } }
					if(contLosTiemposEnCero == this.numRegistroUltimosMovimientos) { this.restart(); }

					//	Planea la siguiente ejecución
					setTimeout("EduInt.arAnimations["+this.numAnimacion+"].animate();",tiempoEjecucion);
			//	}
			//	catch(err)
			//	{ this.bnRunAnimation=false; console.err('Error en la funcion de la animación: '+err);}
			}
		}
		//	(Animation)
		//	Retorna en cuanto tiempo tiene que ejecutar el siguiente
		this.controlSegundos=function(milisegundosInicio,numPasosCaminados,pasoMilisegMinimo)
		{
			var milisegundosTotales=this.milisegundosAhora()-milisegundosInicio;
			//	console.info("Inicio: "+milisegundosInicio);
			//	console.info("Ahora:  "+this.milisegundosAhora());
			var milisegundosSigPaso=(numPasosCaminados+1)*pasoMilisegMinimo;
			if(milisegundosTotales<=milisegundosSigPaso)
			{ valReturn = milisegundosSigPaso-milisegundosTotales; }
			else
			{ valReturn = 0; }
			//	console.info("Diferencia:  "+valReturn_EI);
			return valReturn;
		}
		//	(Animation)
		//	Retorna los milisegundos del momento
		//	  cuando se ejecuto
		this.milisegundosAhora=function()
		{
			var tiempoAhora_EI = new Date();
			return tiempoAhora_EI.getTime();
		}
	},
	//	Los logs del programa
	log: {
		message: function(message){
			console.log(message);
		},
		log: function(message){
			console.log(message);
		},
		warning: function(message){
			console.log(message);
		},
		error: function(message){
			console.err(message);
		},
		deprecated: function(value1,value2){
			var message = '';
			if(value2!=undefined)
			{
				var lastValue=value1;
				var newValue=value2;
				message='"'+lastValue+'" was Deprecated, please change for "'+value2+'"';
			}
			else
			{ message=value1; }
			this.warning(message);
		}
	},
//ALERT - Comentar
	//	tipos personalizados
	arPerzonilezedTypeFunctions: [],
	createPersonalizedType: function(type,subtype,perzonalizedFunction) {
		//	Si no existe un arreglo de este tipo el lo crea
		if(this.arPerzonilezedTypeFunctions[type]===undefined)
		{ this.arPerzonilezedTypeFunctions[type]= []; }
		//	Sle coloca un subtipo con la uncion
		this.arPerzonilezedTypeFunctions[type][subtype] = perzonalizedFunction;
	},
//ALERT - Comentar
	bnCreatedMouseMovement: false,
	createMouseMovementDetect: function(){
		if(!this.bnCreatedMouseMovement)
		{
			document.addEventListener('mousemove',this.oncursormove,false);
			document.addEventListener('touchmove',this.oncursormove,false);
		}
	},
	posCursorInX: 0,
	posCursorInY: 0,
	oncursormove: function(evento){
		//	En caso de ser touch
		this.posCursorInX=BasicEI.getPosInXCursorForEvent(event);
		this.posCursorInY=BasicEI.getPosInYCursorForEvent(event);
		//	console.info('this.posCursorInX: '+this.posCursorInX);
		//	console.info('this.posCursorInY: '+this.posCursorInY);
		//	Pasa por cada uno de los tableros
		for(var contBoards=0;contBoards<EduInt.arBoards.length;contBoards++){

			var board = EduInt .arBoards[contBoards];

			//	Posicion del tablero, esquina superior-izquierda
			var boardPosInX = board.getPosInX();
			var boardPosInY = board.getPosInY();
			//	Posicion del cursor, con relación a la esquina superior-izquierda
			var boardMousePosInX = this.posCursorInX-boardPosInX;
			var boardMousePosInY = this.posCursorInY-boardPosInY;
			//	console.info('boardMousePosInX: '+boardMousePosInX);
			//	console.info('boardMousePosInY: '+boardMousePosInY);
			//	Registra la posicion del cursor, con relación a la esquina superior-izquierda
			board.setMousePosInX(boardMousePosInX);
			board.setMousePosInY(boardMousePosInY);

			//	Informa si el cursor esta o no encima del tablero
			if(boardMousePosInX<0 || boardMousePosInY<0)
			{ board.setIsMouseHover(false); }
			else if(board.getWidth()<=boardMousePosInX || board.getHeight()<=boardMousePosInY)
			{ board.setIsMouseHover(false); }
			else
			{
				board.setIsMouseHover(true);
				evento.preventDefault();
			}
		}
	},
	//	Esta clase contiene todos las funciones y variables de Educación Interactiva V4, como la cantidad de tableros(Boards) su número, sus nombres, la versión de este objeto.
	arBoards: [],
	//	Arreglo con números de los tableros, la llave es el nombre.
	arBoardsNames: [],
	//	Retorna el número de tableros que existen
	getNumBoards: function(){
		return this.arBoards.length;
	},
	//
	getBnBoard_only: function(numBoard){
		//	Si existe retorna true
		if(this.arBoards[numBoard]!=undefined)
		{ return true; }
		//	Retorna false
		return false;
	},
	//
	getBnBoard: function(numBoard){

		return this.getBnBoard_only(numBoard);
	},
	getBnBoardForName_only: function(nameBoard){
		//	Si existe retorna true
		if(this.arBoardsNames[nameBoard]!=undefined)
		{ return true; }
		//	Retorna false
		return false;
	},
	getBnBoardForName: function(name){
		return this.getBnBoardForName_only(name);
	},
	getBoard_only: function(numBoard){
		return this.arBoards[numBoard];
	},
	getBoard: function(numBoard){
		return this.getBoard_only(numBoard);
	},
	getBoardForName_only: function(nameBoard){
		return this.getBoard_only(this.arBoardsNames[nameBoard]);
	},
	getBoardForName: function(nameBoard){
		return this.getBoardForName_only(nameBoard);
	},
	getNumBoardForName_only: function(nameBoard){
		return this.arBoardsNames[nameBoard];
	},
	getNumBoardForName: function(nameBoard){
		return this.getNumBoardForName_only(nameBoard);
	},
	//	Información por defecto
	infoDef: {
		Board:{
			name: 'Board',
			width: 300,
			height: 200,
			canvas: {
				class: 'cCanvas_LugarDelCanvas_ei',
			}
		},
		Thing:{
			name: 'Thing',
			posInX: 0,
			posInY: 0,
			width: 10,
			height: 10,
			radio: 5,
			type: 'element',
			subType: 'div',
			color: '#000',
			subSubType: '',
			container:{
				posInX: 0,
				posInY: 0,
			},
			types:
			{
				text:
				{
					width: 'inherit',
					height: 'inherit',
				}
			}
		},
	},
//	getDefault: function(kind,propery)
	getDefault: function(kind,type,property)
	{
		if(property===undefined) { property=type; }
		switch(kind)
		{
			case 'Board':
			case 'board':
			{
				switch(property)
				{
					case 'width': return this.infoDef.Board.width;
					case 'height': return this.infoDef.Board.height;
					case 'canvas_class': return this.infoDef.Board.canvas.class;
				}
			}
			case 'Thing':
			case 'thing':
			{
				switch(property)
				{
					case 'posInX':     if(this.infoDef.Thing.types[type]!==undefined) { return this.infoDef.Thing.types[type].posInX;     } else { return this.infoDef.Thing.posInX;     }
					case 'posInY':     if(this.infoDef.Thing.types[type]!==undefined) { return this.infoDef.Thing.types[type].posInY;     } else { return this.infoDef.Thing.posInY;     }
					case 'width':      if(this.infoDef.Thing.types[type]!==undefined) { return this.infoDef.Thing.types[type].width;      } else { return this.infoDef.Thing.width;      }
					case 'height':     if(this.infoDef.Thing.types[type]!==undefined) { return this.infoDef.Thing.types[type].height;     } else { return this.infoDef.Thing.height;     }
					case 'radio':      if(this.infoDef.Thing.types[type]!==undefined) { return this.infoDef.Thing.types[type].radio;      } else { return this.infoDef.Thing.radio;      }
					case 'type':       if(this.infoDef.Thing.types[type]!==undefined) { return this.infoDef.Thing.types[type].type;       } else { return this.infoDef.Thing.type;       }
					case 'subType':    if(this.infoDef.Thing.types[type]!==undefined) { return this.infoDef.Thing.types[type].subType;    } else { return this.infoDef.Thing.subType;    }
					case 'color':      if(this.infoDef.Thing.types[type]!==undefined) { return this.infoDef.Thing.types[type].color;      } else { return this.infoDef.Thing.color;      }
					case 'subSubType': if(this.infoDef.Thing.types[type]!==undefined) { return this.infoDef.Thing.types[type].subSubType; } else { return this.infoDef.Thing.subSubType; }
				}
			}
		}
	},
	isMyBoardThings: function(nameBoard){

	},
	newBoard: function(nameBoard,width,height){

		//	Si no se colocan estos valores,
		//	se asignan unos por defecto
		if(nameBoard!==undefined)
			{ this.nameBoard=nameBoard; }
			else
			{ this.nameBoard=EduInt.infoDef.Board.name+(EduInt.getNumBoards()+1); }
		if(width!==undefined)
			{ this.width=width; }
			else
			{ this.width=EduInt.infoDef.Board.width; }
		if(height!==undefined)
			{ this.height=height; }
			else
			{ this.height=EduInt.infoDef.Board.height; }

//	ALERT - Falta comentar
		//	Lugar para colocar todas las variables y funciones
		this.my = { };

		// (Board)
		//	Agregamos el canvas al elemento
		this.setBoardJQueryIn=function(object)
		{ object.append(this.oDiv); }
		// (Board)
		this.setBoardJQueryInID=function(id)
		{ document.getElementById(id).append(this.oDiv); }
		// (Board)
		//	Agregamos el canvas al elemento
		this.setBoardIn=function(object)
		{ object.appendChild(this.oDiv); return this; }
		// (Board)
		this.setBoardInID=function(id)
		{ document.getElementById(id).appendChild(this.oDiv); return this; }
		// (Board)
		//	Posicion del mouse realativo a este tablero
//	ALERT
//	FALTA DOCUMENTAR
		//	Saca la posició en X de un elemento(No de un thing) en el tablero
		this.getPosInXOfAnElment=function(object)
		{
			var curleft = 0;
			if(object.offsetParent)
			{
				while(1)
				{
					curleft += object.offsetLeft;
					if(this.oDiv==object.offsetParent || !object.offsetParent) { break; }
					object = object.offsetParent;
				}
			}
			return curleft;
		}
		//	Saca la posició en Y de un elemento(No de un thing) en el tablero
		this.getPosInYOfAnElment=function(object)
		{
			var curTop = 0;
			if(object.offsetParent)
			{
				while(1)
				{
					curTop += object.offsetTop;
					if(this.oDiv==object.offsetParent || !object.offsetParent) { break; }
					object = object.offsetParent;
				}
			}
			return curTop;
		}
//	ALERT
//	FALTA DOCUMENTAR
		this.stIsMouseOver = function(){
			return this.bnIsMouseOver;
		}
		// (Board)
//	ALERT
//	FALTA DOCUMENTAR
		//	Informa si ya fue creado
		this.bnCreated = false;
		// (Board)
//	ALERT
//	FALTA DOCUMENTAR
		this.createBoardInBody = function()
		{
			//	Div
			//	---

			//	Crea el div que ira dentro
			this.oDiv=document.body;
			this.oDiv.Board=this;
			//	Añadimos la clase al tablero
			this.oDiv.className=this.oDiv.className + ' ' + 'ei_board';

//	ALERT
			this.oDiv.onmouseover = function(){
				this.Board.bnIsMouseOver = true;
			},
			this.oDiv.onmouseout = function(){
				this.Board.bnIsMouseOver = false;
			}

			//	DivThings
			//	---------

			this.oDivThings=document.createElement('div');
			//	Agregamos el canvas al elemento
			this.oDiv.appendChild(this.oDivThings);
			//	Colocamos la posicion absolute
			this.oDivThings.style.position='absolute';
			this.oDivThings.style.top='0px';
			this.oDivThings.style.left='0px';
			//	Colocamos el ancho y el alto
			this.oDivThings.style.width='10px';
			this.oDivThings.style.height='10px';

			//	Informa que ya fue creado
			this.bnCreated = true;

			return this;
		},
		// (Board)
		this.create = function()
		{
			//	Div
			//	---

			//	Crea el div que ira dentro
			this.oDiv=document.createElement('div');
			this.oDiv.Board=this;
			//	Añadimos la clase al tablero
			this.oDiv.className='ei_board';

//	ALERT
			this.oDiv.onmouseover = function(){
				this.Board.bnIsMouseOver = true;
			},
			this.oDiv.onmouseout = function(){
				this.Board.bnIsMouseOver = false;
			}

			//	Colocamos la posicion relativa
			this.oDiv.style.position='relative';
			//	Colocamos el ancho y el alto
			this.oDiv.style.width=BasicEI.measure(this.width);
			this.oDiv.style.height=BasicEI.measure(this.height);
			//	Colocamos un overflow hidden
			this.oDiv.style.overflow='hidden';

			//	DivThings
			//	---------

			this.oDivThings=document.createElement('div');
			//	Agregamos el canvas al elemento
			this.oDiv.appendChild(this.oDivThings);
			//	Colocamos la posicion absolute
			this.oDivThings.style.position='absolute';
			//	Colocamos el ancho y el alto
			this.oDivThings.style.width=BasicEI.measure(this.width);
			this.oDivThings.style.height=BasicEI.measure(this.height);
			//	Colocamos un overflow hidden
			this.oDivThings.style.overflow='hidden';

			//	Canvas
			//	------

			//	Crea el canvas que ira dentro del div del lienzo
			this.oCanvas=document.createElement('canvas');
			//	Agregamos el canvas al elemento
			this.oDiv.appendChild(this.oCanvas);
			//	Colocamos el ancho y el alto
			this.oCanvas.width=this.width;
			this.oCanvas.height=this.height;
			//	Colocamos la clase, de acuerdo al codigoUnico
			this.oCanvas.className=EduInt.infoDef.Board.canvas.class;
			//	Creamos el contexto necesario para poder manejarlo
			this.contexto=this.oCanvas.getContext('2d');

			//	Informa que ya fue creado
			this.bnCreated = true;

			return this;
		}
		// (Board)
//	ALERT - Comentar
		//	Posición estatica, si es falso siempre consulta su posicion,
		//	si no coloca por defecto: this.posInX y this.posInY
		this.bnStaticPosition = false;
		this.enStaticPosition = function(posInX,posInY){
			this.bnStaticPosition=true;
			if(posInX!==undefined) { this.posInX = posInX; }
			if(posInY!==undefined) { this.posInY = posInY; }
		}
		// (Board)
//	ALERT - Comentar
//	Muy pesado buscar todo el tiempo, deberian ser estaticos por defecto
		this.getPosInX = function(){
			if((this.bnStaticPosition && this.posInX===undefined) || (!this.bnStaticPosition))
			{
				this.posInX = BasicEI.posEnX(this.oDiv);
				return this.posInX;
			}
			else
			{ return this.posInX; }
		}
		// (Board)
//	ALERT - Comentar
//	Muy pesado buscar todo el tiempo, deberian ser estaticos por defecto
		this.getPosInY = function(){
			if((this.bnStaticPosition && this.posInY===undefined) || (!this.bnStaticPosition))
			{
				this.posInY = BasicEI.posEnY(this.oDiv);
				return this.posInY;
			}
			else
			{ return this.posInY; }
		}
		// (Board)
		//	Funciones del tablero
		this.setWidth_only = function(width) {
			if(this.bnCreated)
			{
				//	Div
				//	---
				//	Colocamos el ancho
				this.oDiv.style.width=BasicEI.measure(width);

				//	DivThings
				//	---------
				//	Colocamos el ancho
				this.oDivThings.style.width=BasicEI.measure(width);

				//	Canvas
				//	------
				//	Colocamos el ancho y el alto
				this.oCanvas.width=width;
			}
			else
			{
				this.width = width;
			}
		}
		// (Board)
		this.setWidth = function(width) {
			this.setWidth_only(width);
			return this;
		}
		this.defaultPaths={ images: '' };
		this.setDefaultPaths = function(json){
			this.defaultPaths = BasicEI.setDefaultOptions(json,this.defaultPaths);
		}
		// (Board)
		this.getWidth = function() { return this.width; }
		// (Board)
		this.setHeight_only = function(height) {
			if(this.bnCreated)
			{
				//	Div
				//	---
				//	Colocamos el ancho y el alto
				this.oDiv.style.height=BasicEI.measure(height);

				//	DivThings
				//	---------
				//	Colocamos el ancho y el alto
				this.oDivThings.style.height=BasicEI.measure(height);

				//	Canvas
				//	------
				//	Colocamos el ancho y el alto
				this.oCanvas.height=height;
			}
			else
			{
				this.height = height;
			}
		}
		// (Board)
		this.setHeight = function(height) {
			this.setHeight_only(height);
			return this;
		}
		// (Board)
//	ALERT - Documentar
		this.setDimensions = function(width,height)
		{ this.setWidth(width); this.setHeight(height); return this; }

		// (Board)
		this.getHeight = function() { return this.height; }

		// (Board)
//	ALERT - Documentar
		this.bnIsMouseHover = false;
		this.setIsMouseHover = function(answer) { this.bnIsMouseHover = answer; }
		this.qstnIsMouseHover = function() { return this.bnIsMouseHover; }
		this.positionMouseInX = 0;
		this.positionMouseInY = 0;
		this.setMousePosInX = function(posInX){ this.positionMouseInX = posInX; }
		this.getMousePosInX = function(){ return this.positionMouseInX; }
		this.setMousePosInY = function(posInY){ this.positionMouseInY = posInY; }
		this.getMousePosInY = function(){ return this.positionMouseInY; }


//	ALERT - Documentar

		// (Board)
//	ALERT - Documentar
		//	Arreglo de things
		this.arThings=[];
		//	Arreglo del numero de things por nombre
		this.arThingsForName=[];
		// (Board)
//	ALERT - Documentar
		//	Retorna el objeto por su numero
		this.getThing = function(numThing){
			return this.arThings[numThing];
		}
		// (Board)
//	ALERT - Documentar
		//	Retorna true si existe el objeto
		this.prThingForName = function(nameThing){
			//	Si existe retorna el tre
			if(this.arThingsForName[nameThing]!==undefined)
				{ return true; }
			//	Si este no existe
			return false;
		}
		// (Board)
//	ALERT - Documentar
		//	Retorna el objeto por su nombre
		this.getThingForName = function(nameThing){
			return this.getThing(this.arThingsForName[nameThing]);
		}
		// (Board)
		//	Función sensilla para crear o retornar objetos
		this.Thing = function(nameThing,posInX,posInY,width,height) { this.t(nameThing,posInX,posInY,width,height); }
		this.t = function(nameThing,posInX,posInY,width,height) {
			//	Si existe el objeto lo retorna
			if(this.prThingForName(nameThing)) {
				var thing = this.getThingForName(nameThing,posInX,posInY,width,height);
				//	Cuando uno llama a un this.t('nombre').accAlgo(9).inSeconds(5), el almacena un arreglo con las acciones a realizar,
				//	Estas acciones se tienen que borrar cuando se vuelve a llamar al nombre,permitiendo que lo siguoente funcione
				//	Ejemplo:
				//		this.t('nombre').accMoveInX(9).inSeconds(5)
				//		Cuando vuelva a ser llamado el borrara las acciones anteriores, permitiendo colocar a las nuevas un tiempo
				//		Si el no limpoara las acciones anteriores el colocaria en 2 segundos el Mover en X (accMoveInX(9))
				//		this.t('nombre').accMoveInY(9).inSeconds(2)
				thing.clearActionsInTime();
				return thing;
			}
			//	Si NO existe lo retorna
			else {
				return this.createThing(nameThing,posInX,posInY,width,height);
			}
		}
		//	Retorna el objeto por su nombre

		// (Board)
		//	Crea un thing
		this.createThing_only = function(Board,nameThing,posInX,posInY,width,height) {
			//	Creamos el objeto "thing"
			var thing = new EduInt.newThing(Board,nameThing,posInX,posInY,width,height);
			//	Guarda en el arreglo del tablero
			var numThings = this.arThings.length;
			//	Regusistra en un arreglo cada thing
			this.arThings[numThings]=thing;
			//	Regusistra el numero del thin del board segun el nombre
			this.arThingsForName[nameThing]=numThings;
			//	Lo agregamos al tablero
			thing.setThingIn(this.oDivThings);
			//	Retornamos el objeto "thing"
			return thing;
		};
		// (Board)
		//	Crea un thing
		this.createThing = function(nameThing,posInX,posInY,width,height) {
			return this.createThing_only(this,nameThing,posInX,posInY,width,height);
		};
		// (Board)
//	ALERT - Comentar
		//	Es como inicia una animación, este se puede omitir, pero si se usa se puede reinicar la animación
		this.start = function(functionToStart)
		{
			//	Evita que algo sea dibujado
			//	Informa que esta en modo start
			this.bnIsInStart=true;
			//	Ingregra la funcion al tablero
			this.functionToStart = functionToStart;
			//	La ejecuta
			this.functionToStart();
			//	Dibuja todos los cambios

			//	Informa que salio de modo start
			this.bnIsInStart=false;
		};
		//	(Board)
//	ALERT - Comentar
		this.stop = function()
		{
			//	Pasa por todos los things y los elimina
			for(var countThings=0;countThings<this.arThings.length;countThings++)
			{
				this.arThings[countThings].delete();
			}
			this.arThings=[];
			this.arThingsForName=[];
		};
		// (Board)
//ALERT - Comentar
		this.restart = function(functionToStart)
		{
			this.stop();
			this.start(functionToStart);
		};
		// (Board)
//ALERT - Comentar
		//	Informa si se esta en el start
		this.bnIsInStart = false;
		// (Board)
//ALERT - Comentar
		//	Pregunta si esta en Start
		this.qstnIsInStart = function()
		{
			return this.bnIsInStart;
		};
		// (Board)
//	ALERT - Comentar
		//	Carga las funciónes que tienen que estar al cargar la animación
		this.arNumOfFunctnToStatInAnimation=[]
		// (Board)
//	ALERT - Comentar
		//	Crea la animación
		this.createAnimation = function(functionAnimated,stepsPerSecond) {
			//	Si no tiene pasos por segundo asume que son 25
			if(stepsPerSecond===undefined) { stepsPerSecond=25; }
			//	Creaba la animación
			this.animation=EduInt.createAnimation(stepsPerSecond);
			//	La agrega al tablero
			this.functionAnimated = functionAnimated;
			//	Añadimos la funcion para ser animada
			this.arNumOfFunctnToStatInAnimation[this.arNumOfFunctnToStatInAnimation.length]=this.animation.addFunction(this.functionAnimated,{},this,false);
			//	Añadimos la funcion que manejara las animaciónes en segundo plano
			this.arNumOfFunctnToStatInAnimation[this.arNumOfFunctnToStatInAnimation.length]=this.animation.addFunction(this.functionAnimatedShadow,{},this,false);
			//	Añadmimos la funcion para dibujar cambios
			this.arNumOfFunctnToStatInAnimation[this.arNumOfFunctnToStatInAnimation.length]=this.animation.addPredefineFunction('drawChanges',{},this,false);
			//	Retorna el tablero
			return this;
		}
		// (Board)
//	ALERT - Comentar
		//	Elmina la animación
		this.deleteAnimation = function() {
			if(this.animation)
			{
				//	Detiene la animación y la deja en posicion de inicio
				this.animation.stop();
				//	Borra todas las funciones de animación si existen
				this.animation.deleteFunctions();
				//	Borra la animación
				this.animation=undefined;
			}
			//	Retorna el tablero
			return this;
		}
		//
		this.delete = function()
		{
			//	Borra la animación
			this.deleteAnimation();
			//	Quita los objetos
			this.stop();
			//	Borra el contenido del tablero, mientras no sea un tablero en el body
			if(document.body!=this.oDiv) { this.oDiv.remove(); }
		}
		// (Board)
//	ALERT - COMMENT
		//	Arreglo de las funciónes en Shadow
		this.arFunctionsAnimatedShadow = [];
//	ALERT - COMMENT
		this.functionAnimatedShadow = function(info)
		{
			for(var countFnAnimatedShadow=0;countFnAnimatedShadow<this.arFunctionsAnimatedShadow.length;countFnAnimatedShadow++)
			{
				//	Solo la ejecuta si esta definida
				if(this.arFunctionsAnimatedShadow[countFnAnimatedShadow]!==undefined)
				{
					//	pasa las variables a unas mas sencillas
					//	---------------------------------------
					var functionAnimatedInShadow_ = this.arFunctionsAnimatedShadow[countFnAnimatedShadow].functionAnimatedInShadow;
					var myoptions_ = this.arFunctionsAnimatedShadow[countFnAnimatedShadow].myoptions
					var father_ = this.arFunctionsAnimatedShadow[countFnAnimatedShadow].father;

					//	Ejecuta la funcion
					//	------------------
					//	Si existe un padre lo coloca
					if(father_!==undefined)
					{
						father_.functionAnimatedInShadow = functionAnimatedInShadow_;
						father_.functionAnimatedInShadow(myoptions_);
					}
					else
					{ functionAnimatedInShadow(myoptions_); }

					//	Si tiene un tiempo para desaparecer verifica este y lo borra de ser el caso
					//	---------------------------------------------------------------------------
					//	Si el numero de frames para desaparecer esta definido le resta uno, y cuando llegue a cero desaparece la función
					if(this.arFunctionsAnimatedShadow[countFnAnimatedShadow].frameToDesapear!==undefined)
					{
						this.arFunctionsAnimatedShadow[countFnAnimatedShadow].frameToDesapear--;
						if(this.arFunctionsAnimatedShadow[countFnAnimatedShadow].frameToDesapear==0)
						{
//	WARNING
//	A futuro tiene que existir una función que limpie todas las undefined, pero despues de algun tiempo, para que no sea muy lento
							this.deleteFunctionAnimatedInShadowFast(countFnAnimatedShadow);
						}
					}
				}
			}
		}
		// (Board)
//	ALERT - COMMENT
		//	jsonOptionsFunctionAnimatedInShadow = { options: {}, father: undefined, timeToDesapear: 25 }
//	WARNING
//	A futuro tiene que existir una función que limpie todas las undefined, pero sin borrar esta, que es la rapida
		this.deleteFunctionAnimatedInShadowFast = function(id)
		{ this.arFunctionsAnimatedShadow[id]=undefined; }
		// (Board)
//	ALERT - COMMENT
		//	jsonOptionsFunctionAnimatedInShadow = { options: {}, father: undefined, timeToDesapear: 25 }
		this.addFunctionAnimatedInShadow = function(functionAnimatedInShadow,jsonOptionsFunctionAnimatedInShadow)
		{
			var idTheFunctionInShadow = this.arFunctionsAnimatedShadow.length;

			var options_;
			if(jsonOptionsFunctionAnimatedInShadow.options!==undefined) { var options_ = jsonOptionsFunctionAnimatedInShadow.options; }
			var father_;
			if(jsonOptionsFunctionAnimatedInShadow.father!==undefined) { var father_ = jsonOptionsFunctionAnimatedInShadow.father; }
			var frameToDesapear_;
			if(jsonOptionsFunctionAnimatedInShadow.frameToDesapear!==undefined) { var frameToDesapear_ = jsonOptionsFunctionAnimatedInShadow.frameToDesapear; }

			this.arFunctionsAnimatedShadow[this.arFunctionsAnimatedShadow.length] = {
				functionAnimatedInShadow: functionAnimatedInShadow,
				myoptions: options_,
				father: father_,
				frameToDesapear: frameToDesapear_,
			};

			return idTheFunctionInShadow;
		}
		// (Board)
//	ALERT - COMMENT
		this.addFunctionAnimatedInShadowSimple = function(functionAnimatedInShadow,jsonOnFunctionAnimatedInShadow,father)
		{ return this.addFunctionAnimatedInShadow(functionAnimatedInShadow, { options: jsonOnFunctionAnimatedInShadow, father: father }); }
//	ALERT - Comentar
		//	Dibuja solo los cambios en los objetos
		this.drawChanges = function() {
			//	Pasa por todos los objetos
			for(var contThings=0;contThings<this.arThings.length;contThings++)
			{
				if(this.arThings[contThings].prChangesWithoutDrawing())
				{
					this.arThings[contThings].draw()
				}
			}
		}
		// (Board)
//	ALERT - Comentar
		//	Inicia la animación
		this.startAnimation = function(){
			//	Habilita las funciones a animar
			for(var countFunctAnimated=0;countFunctAnimated<this.arNumOfFunctnToStatInAnimation.length;countFunctAnimated++)
			{
				var numFunctionAnimated=this.arNumOfFunctnToStatInAnimation[countFunctAnimated];
				this.animation.enFunction(numFunctionAnimated);
			}
			//	Inicia la animacion,
			this.animation.start();
		}
	},
	newThing: function(Board,nameThing,posInX,posInY,width,height){
		//	Guardamos en que tablero estamos
		this.Board=Board;
		//	Si no se colocan estos valores,
		//	se asignan unos por defecto
		if(nameThing!==undefined)
			{ this.nameThing=nameThing; }
			else
			{ this.nameThing=EduInt.infoDef.Thing.name+(EduInt.getNumBoards()+1); }
		if(posInX!==undefined)
			{ this.posInX=posInX; }
			else
			{ this.posInX=EduInt.infoDef.Thing.posInX; }
		if(posInY!==undefined)
			{ this.posInY=posInY; }
			else
			{ this.posInY=EduInt.infoDef.Thing.posInY; }
		if(width!==undefined)
			{ this.width=width; }
			else
			{ this.width=EduInt.infoDef.Thing.width; }
		if(height!==undefined)
			{ this.height=height; }
			else
			{ this.height=EduInt.infoDef.Thing.height; }
		this.radio=EduInt.infoDef.Thing.height;
		this.rotation=0;

		//	Permite colocar variables dentro del thing
		this.my = { };
		//	Eventos en el Thing
		this.event = { };
		this.event.onclick=false;
		this.event.onmouseover=false;
		this.event.bnCursorDown=false;

		//	Variables de movimiento
		this.moveInX=0;
		this.moveInY=0;
		this.rotate=0;
		//	Función por dedecto de todas las aciones, el parametro es el nombre de la variable cambiada
		this.accDefaultFunction = function(nameVariable)
		{
			//	Informa que existe un cambio para dibujar
			this.bnActionToDraw[this.bnActionToDraw.length]=nameVariable;
			//	true, si existen cambios sin dibujar
			this.bnCambiosSinDraw=true;
			//	Agrega la acción al arreglo  por si quieren colocarle un tiempo
			this.addActionsInTime(nameVariable);
		};
		//	(thing)
		this.accChangeWidth = function(width){
			//	Cambia el ancho
			this.width=width;
			//	Función por dedecto de todas las aciones
			this.accDefaultFunction('width');
			//	Retorna el mismo objeto
			return this;
		}
		//	(thing)
		this.accChangeHeight = function(height){
			//	Cambia el alto
			this.height=height;
			//	Función por dedecto de todas las aciones
			this.accDefaultFunction('height');
			//	Retorna el mismo objeto
			return this;
		}
		//	(thing)
		//	Funciones de movimiento
		this.accMoveInX = function(moveInX){
			//	Guara cuanto debe moverce en X
			this.moveInX=this.moveInX+moveInX;
			//	Función por dedecto de todas las aciones
			this.accDefaultFunction('moveInX');
			//	Retorna el mismo objeto
			return this;
		};
		//	(thing)
		this.accMoveInY = function(moveInY){
			//	Guara cuanto debe moverce en X
			this.moveInY=this.moveInY+moveInY;
			//	Función por dedecto de todas las aciones
			this.accDefaultFunction('moveInY');
			//	Retorna el mismo objeto
			return this;
		};
		//	(thing)
		this.accMoveRight = function(moveRight) { return this.accMoveInX(moveRight); };
		//	(thing)
		this.accMoveLeft = function(moveLeft) { return this.accMoveInX(moveLeft*(-1)); };
		//	(thing)
		this.accMoveTop = function(moveTop) { return this.accMoveInY(moveTop*(-1)); };
		//	(thing)
		this.accMoveButton = function(moveButton) { return this.accMoveInY(moveButton); };
		//	(thing)
		this.accRotate = function(rotate){
			//	Guara cuanto debe moverce en X
			this.rotate=this.rotate+rotate;

//	Info: Borrar:
			//	Mueve el objeto a la nueva posición
			//	this.rotation=this.rotation+rotate;

			//	Función por dedecto de todas las aciones
			this.accDefaultFunction('rotate');
			//	Retorna el mismo objeto
			return this;
		};
		//	Cuando uno llama a un this.t('nombre').accAlgo(9).inSeconds(5), el almacena un arreglo con las acciones a realizar,
		//	Estas acciones se tienen que borrar cuando se vuelve a llamar al nombre,permitiendo que lo siguoente funcione
		//	Ejemplo:
		//		this.t('nombre').accMoveInX(9).inSeconds(5)
		//		Cuando vuelva a ser llamado el borrara las acciones anteriores, permitiendo colocar a las nuevas un tiempo
		//		Si el no limpoara las acciones anteriores el colocaria en 2 segundos el Mover en X (accMoveInX(9))
		//		this.t('nombre').accMoveInY(9).inSeconds(2)
		this.arActionsInTime=[];
		this.addActionsInTime = function(nameFunction)
		{ this.arActionsInTime[this.arActionsInTime.length]=nameFunction; return this; };
		this.clearActionsInTime = function()
		{ this.arActionsInTime=[]; return this; };
		//	(thing)
		this.inSeconds = function(seconds)
		{
			var constanteADividir=(this.Board.animation.getStepsPerSecond()*seconds);
			//	Pasa por todas las acciones hasta ahora colocadas y les coloca el tiempo en que se ejecutaran
			for(var countActionsInTime=0;countActionsInTime<this.arActionsInTime.length;countActionsInTime++)
			{
//	WARNING
//	QUeda faltarlo al cambio de ancho y alto
				switch(this.arActionsInTime[countActionsInTime])
				{
					case 'rotate':
						this.rotate=this.rotate/constanteADividir;
						break;
					case 'moveInX':
						this.moveInX=this.moveInX/constanteADividir;
						break;
					case 'moveInY':
						this.moveInY=this.moveInY/constanteADividir;
						break;
				}
			}
			//	Borra todas las acciones para cambiern segun el tiempo
			this.clearActionsInTime();

			return this;
		};
		//	(thing)
		//	Crea el contenedor
		this.createContainer = function(posInX,posInY){
			//	Crea un nuevo contenedor
			this.Container=new EduInt.newContainer(posInX,posInY);
			//	Informa que a sido creado
			this.bnContainer=true;
		};
		//	(thing)
		this.setEvOnClick = function(myFunction){
			this.funcOnClick = myFunction;
		};
		//	(thing)
		this.delete = function()
		{
			//	BOrra el tipo de objeto
			this.deleteThingType();
			//	Informa que no esta creado
			this.bnWasCreated = false;
		}
		//	(thing)
//	ALERT - Comentar
		//	Borra los objetos si ya fueron creados
		this.deleteThingType = function(){
			//	Pregunta si fue creado este thing
			if(this.qstnWasCreated())
			{
				//	Mira que tipo es para crear el thing type
				switch(this.type)
				{
					case 'text':
					case 'element':
					case 'html':
					case 'input':
						this.Container.divContainer.removeChild(this.element);
						break;
					case 'form':
						this.Container.divContainer.removeChild(this.svgThingType);
						break;
				}
			}
		}
//	ALERT - Comentar
		//	(thing)
		//	Informa si fue creado o no
		this.bnWasCreated = false;
		//	(thing)
		//	Pregunta si fue creado o no
		this.qstnWasCreated = function(){
			return this.bnWasCreated;
		}
		//	(thing)
//	ALERT - Comentar
		this.putThisElementInDivOfBoard = function(element){
			//	Crea el elemento en el contenedor correspondiente
			this.Container.divContainer.appendChild(element);
			//	Informa que fue creado
			this.bnWasCreated = true;
		}
		//	(thing)
//	ALERT - Comentar
		//	Crea el tipo de thing
		this.createThingType = function(){
			//	Informara si el objeto fue o no creado
			var bnThingCreated = false;
			//	Mira que tipo es para crear el thing type
			switch(this.type)
			{
				//	Si se trata de una forma
				case 'text':
					this.element = document.createElement('div');
					//	Para poder acceder a las opciones del thing, desde el objeto
					this.element.thing = this;

					this.putThisElementInDivOfBoard(this.element);

					//	Añade todas las funciones de texto necesarias
					BasicEI.addThingTextFunctions(this);
					//	Añade todas las funciones de HTML necesarias
					BasicEI.addThingStyleBlockFunctions(this);

					this.element.innerHTML = this.adition1;

					//	Informa que el objeto fue creado
					bnThingCreated = true;
					break;
				case 'input':
					this.element = document.createElement('input');
					//	Para poder acceder a las opciones del thing, desde el objeto
					this.element.thing = this;
					this.element.type = 'text';
					this.element.style.boxSizing = "border-box";

					this.putThisElementInDivOfBoard(this.element);

					//	Añade todas las funciones de input necesarias
					BasicEI.addThingInputFunctions(this);
					//	Añade todas las funciones de HTML necesarias
					BasicEI.addThingStyleBlockFunctions(this);

					//	Inicia el movimiento del mouse
					EduInt.createMouseMovementDetect();

					//	Informa que el objeto fue creado
					bnThingCreated = true;
					break;
				case 'html':
					this.element = document.createElement('div');
					//	Para poder acceder a las opciones del thing, desde el objeto
					this.setHTML = function(myHTML){
						this.element.innerHTML = myHTML;
					}

					this.element.thing = this;
					this.putThisElementInDivOfBoard(this.element);

					//	Informa que el objeto fue creado
					bnThingCreated = true;
					break;
				case 'element':
					switch(this.subType)
					{
						case 'div':
							this.element = document.createElement('div');
							//	Para poder acceder a las opciones del thing, desde el objeto
							this.element.thing = this;

							this.element.style.width = this.width + 'px';
							this.element.style.height = this.height + 'px';
							this.element.style.backgroundColor = '#000';
							this.element.style.position = 'absolute';

							//	Añade todas las funciones de HTML necesarias
							BasicEI.addThingStyleBlockFunctions(this);

							//	Ingresamos el nuevo objeto
							this.putThisElementInDivOfBoard(this.element);
							//	Inicia el movimiento del mouse
							EduInt.createMouseMovementDetect();

							//	Informa que el objeto fue creado
							bnThingCreated = true;

							break;
					}
					break;
				case 'svg':

					break;
				case 'form':
					//	Que tipo de forma es
					switch(this.subType)
					{
						//	Si es un rectangulo (Por defecto)
						case 'rectangle':
							//
							var numSubObject=0;
							this.svgThingType = document.createElementNS("http://www.w3.org/2000/svg", "svg");
							this.svgThingType.thing = this;
							this.svgThingType.setAttribute("width", BasicEI.measure(this.width));
							this.svgThingType.setAttribute("height", BasicEI.measure(this.height));
							this.svgThingType.style.position='absolute';

							this.svgThingType.onclick = function(){
								this.thing.event.onclick=true;
								//	Si existe una función a ejecutar al hacer click
//	ALERT - Documentar
								if(this.thing.funcOnClick) { this.thing.funcOnClick(); }
							}
							this.svgThingType.onmouseover = function(){
								this.thing.event.onmouseover=true;
							}
							this.svgThingType.onmouseout = function(){
								this.thing.event.onmouseover=false;
							}

							//	Inicia el movimiento del mouse
							EduInt.createMouseMovementDetect();

							//object.object.setAttribute("draggable", "false");
							//	Borramos antes de crear el nuevo objeto
							this.Container.divContainer.innerHTML='';
							//	Ingresamos el nuevo objeto
							this.putThisElementInDivOfBoard(this.svgThingType);

							this.thingType = document.createElementNS(this.svgThingType.namespaceURI, "rect");
							//object.subobject.setAttribute("x", "0%");
							//object.subobject.setAttribute("y", "0%");
							this.thingType.setAttribute("width", BasicEI.measure(this.width));
							this.thingType.setAttribute("height", BasicEI.measure(this.height));
							//object.subobject.setAttribute("fill", "white");
							this.svgThingType.appendChild(this.thingType);

							//	Informa que el objeto fue creado
							bnThingCreated = true;
							break;
						case 'circle':
							//
							this.svgThingType = document.createElementNS("http://www.w3.org/2000/svg", "svg");
							this.svgThingType.setAttribute("width", BasicEI.measure(this.width));
							this.svgThingType.setAttribute("height", BasicEI.measure(this.height));
							this.svgThingType.style.position='absolute';
							//object.object.setAttribute("draggable", "false");

							//	Ingresamos el nuevo objeto
							this.putThisElementInDivOfBoard(this.svgThingType);

							this.thingType = document.createElementNS(this.svgThingType.namespaceURI, "circle");
							this.thingType.setAttribute("cx",BasicEI.measure(this.radio));
							this.thingType.setAttribute("cy",BasicEI.measure(this.radio));
							this.thingType.setAttribute("r",BasicEI.measure(this.radio));
							this.svgThingType.appendChild(this.thingType);

							//	Informa que el objeto fue creado
							bnThingCreated = true;
							break;
						default:
							if(EduInt.arPerzonilezedTypeFunctions[this.type]!==undefined)
							{
								if(BasicEI.isArray(EduInt.arPerzonilezedTypeFunctions[this.type]))
								{
									if(EduInt.arPerzonilezedTypeFunctions[this.type][this.subType]!==undefined)
									{
										this.functionPerzonilized = EduInt.arPerzonilezedTypeFunctions[this.type][this.subType];
										this.functionPerzonilized();
										this.functionPerzonilized = undefined;
									}
								}
							}
					}
					break;
			}
			//	Si se creo algun thing
			if(bnThingCreated)
			{
				//	Añade todas las funciones comunes
				BasicEI.addThingCommon(this);
			}

			//	Informa que ya se realizaron los cambios de tipo al crearlo
			this.bnChangeType=false;
		};
		//	(thing)
//	ALERT - Comentar
		//	Crea por primera vez el objeto
		this.create = function(){
			//	Crea el contenedor del thing
			this.createContainer(this.posInX,this.posInY);
			//	Crea la tipo del Thing
			this.createThingType();
		}
		//	(thing)
//	ALERT - Comentar
		//	true, si existen cambios sin dibujar
		this.bnCambiosSinDraw=false;
		//	(thing)
//	ALERT - Comentar
		//	Informa si existen cambios sin dibujar
		this.prChangesWithoutDrawing= function() {
			//	true, si existen cambios sin dibujar
			return this.bnCambiosSinDraw;
		}
		//	(thing)
//	ALERT - Comentar
		//	Cambia las espesificaciónes anteriores
		this.draw = function(){
            //  Si tiene acciones las coloca para pintarlas
            if(this.moveInX!=0) { this.posInX=this.posInX+this.moveInX; }
            if(this.moveInY!=0) { this.posInY=this.posInY+this.moveInY; }
            //  Camba la poscición del contenedor deacuerdo a las variables
            this.Container.setPostion(this.posInX,this.posInY);
            //  Limpia las variables de movimiento, por posición
            this.moveInX=0;
            this.moveInY=0;

			this.Container.setPostion(this.posInX,this.posInY);
			//	En caso de que el tipo no cambiara el permite dibujarlo
			if(!this.prTypeChange())
			{
				//	Crea la tipo del Thing
				switch(this.type)
				{
					case 'text':
						//	Realiza solo los cambios asignados
						for(var countChanges=0;countChanges<this.bnActionToDraw.length;countChanges++)
						{
							if(this.bnActionToDraw[countChanges]=='width')
							{ this.element.style.width = this.width + 'px'; }
							if(this.bnActionToDraw[countChanges]=='height')
							{ this.element.style.height = this.height + 'px'; }
						}
						//	Reinicia los cambios asignados
						this.bnActionToDraw=[];
						break;
					case 'input':
//	ALERT - Problema al crearlo queda de 20 por 20
						//	Realiza solo los cambios asignados
						for(var countChanges=0;countChanges<this.bnActionToDraw.length;countChanges++)
						{
							if(this.bnActionToDraw[countChanges]=='width')
							{ this.element.style.width = this.width + 'px'; }
							if(this.bnActionToDraw[countChanges]=='height')
							{ this.element.style.height = this.height + 'px'; }
						}
						//	Reinicia los cambios asignados
						this.bnActionToDraw=[];
						break;
					//	Si se trata de una forma
					case 'element':
						switch(this.subType)
						{
							case 'div':
								//	Realiza solo los cambios asignados
								for(var countChanges=0;countChanges<this.bnActionToDraw.length;countChanges++)
								{
									if(this.bnActionToDraw[countChanges]=='width')
									{ this.element.style.width = this.width + 'px'; }
									if(this.bnActionToDraw[countChanges]=='height')
									{ this.element.style.height = this.height + 'px'; }
								}
								//	Reinicia los cambios asignados
								this.bnActionToDraw=[];
								break;
						}
						break;
					//	Si se trata de una forma
					case 'form':
						//	Que tipo de forma es
						switch(this.subType)
						{
							//	Si es un rectangulo (Por defecto)
							case 'rectangle':
								//	Realiza solo los cambios asignados
								for(var countChanges=0;countChanges<this.bnActionToDraw.length;countChanges++)
								{
									if(this.bnActionToDraw[countChanges]=='width')
									{
										this.svgThingType.setAttribute("width", BasicEI.measure(this.width));
										this.thingType.setAttribute("width", BasicEI.measure(this.width));
									}
									if(this.bnActionToDraw[countChanges]=='height')
									{
										this.svgThingType.setAttribute("height", BasicEI.measure(this.height));
										this.thingType.setAttribute("height", BasicEI.measure(this.height));
									}
								}
								//	Reinicia los cambios asignados
								this.bnActionToDraw=[];
								break;
							case 'circle':
								//	Realiza solo los cambios asignados
								for(var countChanges=0;countChanges<this.bnActionToDraw.length;countChanges++)
								{
									if(this.bnActionToDraw[countChanges]=='width')
									{ this.svgThingType.setAttribute("width", BasicEI.measure(this.width)); }
									if(this.bnActionToDraw[countChanges]=='height')
									{ this.svgThingType.setAttribute("height", BasicEI.measure(this.height)); }
									if(this.bnActionToDraw[countChanges]=='radio')
									{
										this.thingType.setAttribute("cx",BasicEI.measure(this.radio));
										this.thingType.setAttribute("cy",BasicEI.measure(this.radio));
										this.thingType.setAttribute("r",BasicEI.measure(this.radio));
									}
								}
								//	Reinicia los cambios asignados
								this.bnActionToDraw=[];
								break;
						}
						break;
				}
				//	Cuando ocurre un cambio este tiene que dibujarce
				this.bnCambiosSinDraw=false;
			}
			//	Si se realizo algun cambio de tipo, no solo es dibujarlo, es volver a crearlo
			else
			{
				//	Borra el thing anterior si existe
				this.deleteThingType();
				//	Crea el thing
				this.createThingType();
			}
			//	Borra todos los eventos
			this.cleanEventes();
		}
		//	(thing)
		//	Borra todos los eventos cada vez que los dibuja o muestra los cambios
		this.cleanEventes = function() {
			this.event.onclick=false;
		}
		//	(thing)
		//	Coloca el contenedor en algun lugar
		this.setThingIn = function(object){
			this.Container.setContainerIn(object);
		}
		//	(thing)
		this.setPosition = function(posInX,posInY){
			this.setPosInX(posInX,false);
			this.setPosInY(posInY,false);
			this.draw();
			return this;
		}
		//	(thing)
		this.setPosInX = function(posInX,bnDraw){
			this.posInX=posInX;
			this.bnActionToDraw[this.bnActionToDraw.length]='posInX';
			//	Dibuja el cambio
			if(bnDraw===undefined) { bnDraw=true; } if(bnDraw) { this.draw(); }
			return this;
		}
		//	(thing)
		this.getPosInX = function(){
			return this.posInX;
		}
		//	(thing)
		this.setPosInY = function(posInY,bnDraw){
			this.posInY=posInY;
			this.bnActionToDraw[this.bnActionToDraw.length]='posInY';
			//	Dibuja el cambio
			if(bnDraw===undefined) { bnDraw=true; } if(bnDraw) { this.draw(); }
			return this;
		}
		//	(thing)
		this.getPosInY = function(){
			return this.posInY;
		}
//	ALERT
//	Sin documentar
		//	Informa que cambios se han realizado y no se han dibujado
		this.bnActionToDraw = [];
		//	(thing)
		this.setDimensions = function(width,height){
			this.setWidth(width,false);
			this.setHeight(height,false);
			this.draw();
			return this;
		}
		//	(thing)
		this.setWidth = function(width,bnDraw){
			this.width=width;
			this.bnActionToDraw[this.bnActionToDraw.length]='width';
			//	Dibuja el cambio
			if(bnDraw===undefined) { bnDraw=true; } if(bnDraw) { this.draw(); }
			return this;
		}
		//	(thing)
		this.setHeight = function(height,bnDraw){
			this.height=height;
			this.bnActionToDraw[this.bnActionToDraw.length]='height';
			//	Dibuja el cambio
			if(bnDraw===undefined) { bnDraw=true; } if(bnDraw) { this.draw(); }
			return this;
		}
		//	(thing)
		this.setRadio = function(radio,bnDraw){
			this.radio=radio;
			this.bnActionToDraw[this.bnActionToDraw.length]='radio';
			//	Dibuja el cambio
			if(bnDraw===undefined) { bnDraw=true; } if(bnDraw) { this.draw(); }
			return this;
		}
		//	(thing)
		//	Tipo de objeto es
		this.type=EduInt.infoDef.Thing.type;
		this.subType=EduInt.infoDef.Thing.subType;
		this.subSubType=EduInt.infoDef.Thing.subSubType;
		//	(thing)
//ALERT
//Falta comentarlo en documentación
		//	true, si cambio el tipo de un objeto
		this.bnChangeType=false;
		//	(thing)
//ALERT
//Falta comentarlo en documentación
		//	retorna true si cambio el tipo de un objeto
		this.prTypeChange = function(){
			return this.bnChangeType;
		}
		//	(thing)
		this.setType = function(type,subType){
			//	Si tiene que dibujarlo antes de retornarlo
			var bnDraw = false;
			//	Si cambio de tipo tiene que dibujarlo de una vez,
			if(this.type!=type) { bnDraw = true; this.delete(); }
			//	Cambia el tipo
			this.type=type;
			//	Informa que el tipo cambio
			this.bnChangeType = true;
			//	Si tiene un sub tipo lo coloca
			if(subType!==undefined) { this.subType = subType; }

			if(bnDraw) { this.draw(); }

			//	Informa que el tipo cambio
			this.bnChangeType = false;

			return this;
		}
		//	(thing)
		this.getType = function(){
			return this.type;
		}
		//	(thing)
		this.setSubType = function(subType){
			//	Si cambio de tipo tiene que dibujarlo de una vez,
			var bnDraw = false;
			if(this.subType!=subType) { bnDraw = true; }
			this.subType=subType;
			//	Informa que el tipo cambio
			this.bnChangeType = true;
			if(bnDraw) { this.draw(); }
			this.bnChangeType = false;

			return this;
		}
		//	(thing)
		this.getSubType = function(){
			return this.subType;
		}
		//	(thing)
		this.setSubSubType = function(subSubType){
			var bnDraw = false;
			if(this.subSubType!=subSubType) { bnDraw = true; }
			this.subSubType=subSubType;
			//	Informa que el tipo cambio
			this.bnChangeType = true;
			if(bnDraw) { this.draw(); }
			this.bnChangeType = false;
		},
		//	(thing)
		this.qstnClick = function(){
			return this.event.onclick;
		},
		//	(thing)
		this.qstnMouseOver = function(){
			return this.event.onmouseover;
		},
		//	(thing)
		//	Crea el objeto
		this.create();
		//	FUnncion para ejecutar desde este thing
		this._myFunction=function(){ };
		//	(thing)
		//	Ejecuta un grupo de funciones custom para este thing
		this.getCustom = function(name){
			this._myFunction_ = EduInt.Thing._arCustoms[name];
			this._myFunction_();
		};
	},
	Thing: {
		_arCustoms: [],
		setCustom: function(name,myFunction){
			this._arCustoms[name]=myFunction;
		},

	},
	newContainer: function(posInX,posInY) {
		this.divContainer=document.createElement('div');
		//	Coloca el contenedor en un objeto
		this.setContainerIn = function(object){
			try
			{
				object.appendChild(this.divContainer);
			}
			catch(err)
			{

			}
		}
		//	Coloca el contenedor en un objeto con su id
		this.setContainerInID = function(id){
			document.getElementById(id).appendChild(this.divContainer);
		}
		//	Coloca las propiedades basicas
		this.divContainer.style.position='absolute';
		//	Si no se colocan las posiciónes coje las por defecto
		if(posInX==undefined)
			{ posInX=EduInt.infoDef.Thing.container.posInX; }
		if(posInY==undefined)
			{ posInY=EduInt.infoDef.Thing.container.posInY; }
		//	Coloca la posición del container
		this.divContainer.style.top=BasicEI.measure(posInY);
		this.divContainer.style.left=BasicEI.measure(posInX);
		//	Coloca la posicion
		this.setPostion = function(posInX,posInY) {
			this.setPosInX(posInX);
			this.setPosInY(posInY);
		}
		//	Coloca una nueva posición en X
		this.setPosInX = function(posInX) {
			this.divContainer.style.left=BasicEI.measure(posInX);
		}
		//	Coloca una nueva posición en Y
		this.setPosInY = function(posInY) {
			this.divContainer.style.top=BasicEI.measure(posInY);
		}
		this.enAboveAll = function()
		{
			this.divContainer.style.zIndex=999;
		}
		this.enAboveNormal = function()
		{
			this.divContainer.style.zIndex=0;
		}
	},
//	ALERT - Falta comentar
	createBoardThingsInBody: function(nameBoard){
		//	Si el nombre del tablero no esta definido, lo pide
		if(nameBoard===undefined)
		{ EduInt.log.error('The nameBoard is mandatory'); }
		else
		{
			var myNewBoard = new EduInt.newBoard(nameBoard).createBoardInBody();
			myNewBoard.enStaticPosition(0,0);
			EduInt.arBoardsNames[nameBoard]=EduInt.arBoards.length;
			EduInt.arBoards[EduInt.arBoards.length]=myNewBoard;
			return myNewBoard;
		}
		//	Si no retorno el tablero existe un error
		return false;
	},
	createBoard_only: function(nameBoard,width,height){
		//	Si el nombre del tablero no esta definido, lo pide
		if(nameBoard===undefined)
		{ EduInt.log.error('The nameBoard is mandatory'); }
		else
		{
			var myNewBoard = new EduInt.newBoard(nameBoard).setDimensions(width,height).create();
			EduInt.arBoardsNames[nameBoard]=EduInt.arBoards.length;
			EduInt.arBoards[EduInt.arBoards.length]=myNewBoard;
			return myNewBoard;
		}
		//	Si no retorno el tablero existe un error
		return false;
	},
	createBoard: function(nameBoard,width,height){
		return this.createBoard_only(nameBoard,width,height);
	},
	createBoardIn: function(object,nameBoard,width,height)
	{
		var board = this.createBoard(nameBoard,width,height);
		object.appendChild(board.oDiv);
		return board;
	}
};

try
{
	(function($)
	{
		//	Create de canvas
		$.fn.createBoard=function(nameBoard,width,height)
		{
			//	Create a new board
			eiBoard=EduInt.createBoard(nameBoard,width,height);
			//	Coloca el tablero en el objeto
			eiBoard.setBoardJQueryIn(this);
			//	Retorna el tablero
			return eiBoard;
		};
		$.fn.createInThisABoardThings=function(nameBoard)
		{

			//	Create a new board
			eiBoard=EduInt.createInThisABoardThings(nameBoard,this);
			//	Retorna el tablero
			return eiBoard;
		}
	}( jQuery ));
}
catch(err)
{
	console.err(err.message);
}

