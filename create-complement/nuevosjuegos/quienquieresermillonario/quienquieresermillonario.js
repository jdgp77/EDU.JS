var AppQuienQuiereSerExpertoDrupal = function(){
	this.create = function(qqsmInfo){
		this.board = EduInt.createBoardIn(document.getElementById(qqsmInfo.id),qqsmInfo.name,600,400);
		this.board.setBackgroundImage('create-complement/nuevosjuegos/quienquieresermillonario/images/fondo.png').setBackgroundSize('cover');
		this.board.accEnResponsiveMinWidth(410);
		this.board.qqsmInfo=qqsmInfo;

		Board = this.board;
		
		this.board.start(function(){
			var espacioEntrePuntajes = 15;

			this.numPregunta = 1;
			this.numFamesDeEsperaAntesDeSeguir = 1;
			this.bnNuevaPregunta = false;
			this.bnPrimeraVezEnSelectRight=true;
			this.bnPrimeraVezEnNuevaPregunta=true;
			this.bnPrimeraVezEnFelicitacion=true;
			this.bnPrimeraVezEnPreguntaIncorrecta=true;


			//	Funciones a crear
			//	=================

			//	Basicas
			//	-------
			//	Hacer que el presentador hable. Ej: accPresentadorDice(texto,numFramesVisible)
			this.accPresentadorDice;
			//	Ir a la siguiente posición
			this.accNextPositionPuntaje;
			//	Seleccióna como correcta. Ej: this.accSelRight = function(numRespuesta)
			this.accSelRight;
			//	Verifica si la posición seleccionada es correcta, va con palabras del presentador y más
			this.accVeryfyPosition
			//	Desabilita que las respuestas se puedan seleccionar, normalmente se utiliza despues de seleccionar la respuesta
			this.accDisableSelect;
			//	Habilita la capasidad de seleccionar una respuesta
			this.accEnableSelect;
			//	Quita todas la sselecciones a las respuestas
			this.accUnSelect;
			//	Agrega una pregunta setQuestion(text)
			this.setQuestion;
			//	Agrega la respuesta numero 1 setAnswer1(text)
			this.setAnswer1;
			//	Agrega la respuesta numero 2 setAnswer1(text)
			this.setAnswer2;
			//	Agrega la respuesta numero 3 setAnswer1(text)
			this.setAnswer3;
			//	Agrega la respuesta numero 4 setAnswer1(text)
			this.setAnswer4;

			//	Media - Para añadir funcionalidades
			//	-----.-----------------------------
			//	Añade una funcion que se ejecutara cuando muestre la respuesta correcta
			//	this.addFuntionOnShowAnswer(function(bnRespuestaCorrecta,textoRespuestaCorrecta,textoRespuestaSeleccionada){  ...your code... })
			this.addFuntionOnShowAnswer;


			//	Pantallas de bloqueo
			//	====================
			//	Son pantallas blancas que ocupan toda la pantalla y muestran un mensaje, normalmente de inicio o final
			this.setCustom('bloqueenpantalla-default',function(infoJson){
				var tableroAncho = this.Board.getWidth();
				var tableroAlto = this.Board.getHeight();

				this.setDimentions(tableroAncho,tableroAlto);
				this.setBackgroundColor('rgba(255,255,255,0.9)');
				this.setPosInXY(0,0);
				this.setZIndex(999);
				this.bnMoverIzquierda=false;
				this.accMoverIzquierda=function(){
					this.bnMoverIzquierda=true;
				};
				this.qstnEnMoverIzquierda=function(){
					return this.bnMoverIzquierda;
				};
				this.accCreateAnimateFunctionInShadow(function(info,optionJson){
					if(this.qstnEnMoverIzquierda())
					{
						if(this.Board.accQstnWaitInSeconds(0.3,'_bloqueenpantalla--mover-a-la-derecha'))
						{
							this.accMoveInX(-600).inSeconds(0.3);
							console.info('esta aca');
						}
					}
				});
			});
			if(this.qqsmInfo.objetosAlIniciar) { this.setCustom('bloqueinicio-custom', this.qqsmInfo.objetosAlIniciar); }
			this.g('mensaje-inicio').getCustom('bloqueenpantalla-default', { });
			if(this.qqsmInfo.objetosAlIniciar) { this.g('mensaje-inicio').getCustom('bloqueinicio-custom', { }); }
			this.accMoverIzquierdaInicio=function(){
				this.g('mensaje-inicio').accMoverIzquierda();
			};

			//	Presentador
			//	===========
			this.setCustom('presentador', function(){
				this.t('imagen-persentador').setBackgroundImageInAlpha('create-complement/nuevosjuegos/quienquieresermillonario/images/presentador.png').setDimentions(350,179);
				this.t('voz').setType('text').setDimentions(193,100).setTextAlign('center').setFontFamily('Open Sans, Aria').setFontSize(13).setLineHeight(15).setPosInXY(0,5);
				this.t('boca').setBackgroundImageInAlpha('create-complement/nuevosjuegos/quienquieresermillonario/images/presentador-boca.png').setDimentions(14,6).setPosInXY(238,58);
				this.bnTextoVisible=false;
				this.setText=function(texto,numFramesVisible){
					this.t('voz').setText(texto);
					if(numFramesVisible!==undefined)
					{
						this.bnTextoVisible=true;
						this.numFramesTextoVisible=numFramesVisible;
						this.Board.accRestarWaitNumFrames('presentador--tiempotextovisible');
					}
					else
					{
						this.bnTextoVisible=false;
					}
				};
				this.numFramesMoverBoca=5;
				this.countFramesMoverBoca=0;
				this.accAbrirYCerrarBoca=function(){
					this.bnMoverBoca=true;
				};
				this.accCreateAnimateFunctionInShadow(function(info,optionJson){
			
					if(this.bnTextoVisible)
					{
						if(this.Board.accQstnWaitNumFrames(this.numFramesTextoVisible,'presentador--tiempotextovisible'))
						{
							this.accAbrirYCerrarBoca();
						}
						else
						{
							this.t('voz').setText('');
							this.bnTextoVisible=false;
							this.Board.accRestarWaitNumFrames('presentador--tiempotextovisible');
						}
					}
					if(this.bnMoverBoca)
					{
						this.countFramesMoverBoca++;
						if(this.countFramesMoverBoca<this.numFramesMoverBoca)
						{
							this.t('boca').setBackgroundPosition('-14px 0');
						}
						else if(this.countFramesMoverBoca<this.numFramesMoverBoca*2)
						{
							this.t('boca').setBackgroundPosition('0 0');
						}
						else
						{
							this.bnMoverBoca=false;
							this.countFramesMoverBoca=0;
						}
					}
				});
			});
			this.g('presentador').getCustom('presentador',{ }).setPosInXY(200,10);
			this.accPresentadorDice=function(texto,numFramesVisible)
			{
				this.g('presentador').setText(texto,numFramesVisible);
			}
			this.accPresentadorDice('<br>¡¡Hola!! y bienvenido<br><br>a<br>'+qqsmInfo.titulo,25*5);
			this.accPresentadorDice('<br>La primera pregunta por '+qqsmInfo.titulo);

			//	Posición en respuesta o puntaje
			//	===============================
			this.setCustom('puntaje',function(jsonInfo){
				for(var count=0;count<jsonInfo.puntajes.length;count++)
				{
					var puntaje = jsonInfo.puntajes[count];
					this.t('pos'+count).setType('text').setText(puntaje+' '+jsonInfo.prefijo).setTop(jsonInfo.espacioEntrePuntajes*count).setWidth(70).setFontSize(10).setTextAlign('right');
				};
				this.t('posicion-actual').setDimentions(75,5).setPosInXY(0,jsonInfo.espacioEntrePuntajes*0+3)._setBackgroundColor('rgba(255,255,0,0.5)');
				this.t('posicion-actual').posicion=0;
				this.accNextPosition = function()
				{
					this.t('posicion-actual').posicion++;
					this.t('posicion-actual').setPosInXY(0,jsonInfo.espacioEntrePuntajes*this.t('posicion-actual').posicion+3);

					return this;
				};
			});
			this.g('posición').getCustom('puntaje',{
				espacioEntrePuntajes: 12,
				prefijo: qqsmInfo.puntaje.prefijo,
				puntajes: qqsmInfo.puntaje.puntajes,
			}).setLeft(10).setTop(10);
			this.accNextPositionPuntaje = function()
			{
				this.g('posición').accNextPosition();
			}
			this.getPosicionActual =function(){
				return this.g('posición').t('posicion-actual').posicion
			};
			this.accSelRight = function(numRespuesta)
			{
				this.g('respuesta'+numRespuesta).accSelAsRight();
			}
			this.accOnWin = function()
			{
				this.g('contenedor final').getCustom('bloqueenpantalla-default');
				this.g('contenedor final').setCustom(function(){
					this.t('ganado').setType('text').setTextAlign('center').setText('Haz Ganado').setWidth(this.Board.getWidth()).setTop(120).setFontFamily('Open Sans, Arial').setFontSize(44);
					this.t('sub-ganado').setType('text').setTextAlign('center').setText(qqsmInfo.mensajeGanador).setWidth(this.Board.getWidth()).setTop(180).setFontFamily('Open Sans, Arial').setFontSize(17.4);

					this.t('globo').setDimentions(90,197).setBackgroundImageInAlpha('create-complement/nuevosjuegos/quienquieresermillonario/images/Globo.png').setPosInXY(370,500);

					this.t('globo').accCreateAnimateFunctionInShadow(function(info,optionJson){
						if(0<this.getPosInY())
						{
							this.accMoveInY(-1);
						}
					});
				});
			};

			this.bnSelectRight = false;
			this.numFramesEsperandoSiEsCorrecto=25*1.2;
			this.numFramesEsperandoNuevaPregunta=25*2;
			this.accVeryfyPosition = function(numRespuesta)
			{
				this.accDisableSelect();
				this.numRespuestaActual=numRespuesta;
				this.bnSelectRight=true;
			}

			this.g('group-pregunta').setPosInXY(96,220);
			this.g('group-pregunta').t('pregunta-fondo').setBackgroundImageInAlpha('create-complement/nuevosjuegos/quienquieresermillonario/images/pregunta.png').setDimentions(410,45);
			this.g('group-pregunta').t('pregunta').setType('text').setColor('#FFF').setText('Pregunta').setPosInXY(32,10).setWidth(350).setFontFamily('Open Sans').setFontSize(12).setTextAlign('center');

			this.setCustom('respuesta',function(infoJSON){
				this.t(this.getName()+'-fondo').setBackgroundImageInAlpha('create-complement/nuevosjuegos/quienquieresermillonario/images/opcion.png').setDimentions(197,45);
				this.t(this.getName()+'-texto').setType('text').setColor('#FFF').setPosInXY(43,12).setWidth(140).setFontFamily('Open Sans, Aria').setFontSize(10);
				this.t(this.getName()+'-numero').setType('text').setColor('#ffef40').setText(infoJSON.texto_opcion).setPosInXY(21,12);
				this.t(this.getName()+'-boton').setBackgroundColor('rgba(255,255,255,0.1)').setDimentions(197,45);
				this.t(this.getName()+'-boton').setBackgroundColor('rgba(255,255,255,0.1)').setDimentions(197,45);

				this.setAnswer=function(txt){
					this.t(this.getName()+'-texto').setText(txt);
					return this;
				}
				this.getAnswer=function(){
					return this.t(this.getName()+'-texto').getText();
				}
				this.bnSelected=false;
				this.qstnIsSelected=function()
				{
					return this.bnSelected;
				}
				this.numRespuesta = infoJSON.numRespuesta;
				this.enabled=true;
				this.accDisableSelect=function(){
					this.enabled=false;
				};
				this.accEnableSelect=function(){
					this.enabled=true;
				};
				this.accSelect=function(){
					if(this.enabled)
					{
						this.t(this.getName()+'-fondo').setBackgroundPosition('0 -45px');
						this.t(this.getName()+'-texto').setColor('#333');
						this.t(this.getName()+'-numero').setColor('#fff');

						this.Board.accVeryfyPosition(this.numRespuesta);

						this.bnSelected=true;
					}
				}
				this.accUnSelect=function(){
					this.t(this.getName()+'-fondo').setBackgroundPosition('0 0');
					this.t(this.getName()+'-texto').setColor('#FFF');
					this.t(this.getName()+'-numero').setColor('#ffef40');

					this.bnSelected=false;
				}
				this.accSelAsRight=function(){
					this.t(this.getName()+'-fondo').setBackgroundPosition('0 -90px');
					this.t(this.getName()+'-texto').setColor('#FFF');
					this.t(this.getName()+'-numero').setColor('#ffef40');

					this.bnSelected=false;
				}
				this.t(this.getName()+'-boton').parent=this;
				this.t(this.getName()+'-boton').setEvOnClick(function(){
					if(!this.parent.qstnIsSelected())
					{
						this.parent.accSelect();
					}
					else
					{
						this.parent.accUnSelect();
					}
				});

				if(infoJSON.texto!==undefined) { this.setAnswer(infoJSON.texto); }
			});
			this.setCustom('linea',function(infoJSON){
				this.setHeight(7).setBackgroundColor('#c7c7c7');
			});

			this.g('respuesta1').setPosInXY( 97,171+100).getCustom('respuesta', { texto_opcion: 'A:', numRespuesta: 1 });
			this.g('respuesta2').setPosInXY(309,172+100).getCustom('respuesta', { texto_opcion: 'B:', numRespuesta: 2 });
			this.g('respuesta3').setPosInXY( 97,234-5+100).getCustom('respuesta', { texto_opcion: 'C:', numRespuesta: 3 });
			this.g('respuesta4').setPosInXY(309,234-5+100).getCustom('respuesta', { texto_opcion: 'D:', numRespuesta: 4 });

			this.accDisableSelect = function(){
				this.g('respuesta1').accDisableSelect();
				this.g('respuesta2').accDisableSelect();
				this.g('respuesta3').accDisableSelect();
				this.g('respuesta4').accDisableSelect();
			}
			this.accEnableSelect = function(){
				this.g('respuesta1').accEnableSelect();
				this.g('respuesta2').accEnableSelect();
				this.g('respuesta3').accEnableSelect();
				this.g('respuesta4').accEnableSelect();
			}
			this.accUnSelect = function(){
			    this.g('respuesta1').accUnSelect();
				this.g('respuesta2').accUnSelect();
				this.g('respuesta3').accUnSelect();
				this.g('respuesta4').accUnSelect();
			}

			this.t('linea-pregunta-izq').getCustom('linea').setPosInXY(0,220+19).setWidth(96);
			this.t('linea-pregunta-der').getCustom('linea').setPosInXY(96+410,220+19).setWidth(94);

			this.t('linea-respuesta1-izq').getCustom('linea').setPosInXY(0,191+100).setWidth(97);
			this.t('linea-respuesta1-der').getCustom('linea').setPosInXY(97+197,191+100).setWidth(8);

			this.t('linea-respuesta2-izq').getCustom('linea').setPosInXY(97+197+8,191+100).setWidth(7);
			this.t('linea-respuesta2-der').getCustom('linea').setPosInXY(97+197+8+7+197,191+100).setWidth(94);

			this.t('linea-respuesta3-izq').getCustom('linea').setPosInXY(0,248+100).setWidth(97);
			this.t('linea-respuesta3-der').getCustom('linea').setPosInXY(97+197,248+100).setWidth(8);

			this.t('linea-respuesta4-izq').getCustom('linea').setPosInXY(97+197+8,248+100).setWidth(7);
			this.t('linea-respuesta4-der').getCustom('linea').setPosInXY(97+197+8+7+197,248+100).setWidth(94);

			this.setQuestion = function(text){ this.g('group-pregunta').t('pregunta').setText(text); };
			this.setAnswer1  = function(text){ this.g('respuesta1').setAnswer(text); };
			this.setAnswer2  = function(text){ this.g('respuesta2').setAnswer(text); };
			this.setAnswer3  = function(text){ this.g('respuesta3').setAnswer(text); };
			this.setAnswer4  = function(text){ this.g('respuesta4').setAnswer(text); };

			this.arFuntionOnShowAnswer=[];
			this.addFuntionOnShowAnswer = function(myFunction)
			{
				this.arFuntionOnShowAnswer[this.arFuntionOnShowAnswer.length]=myFunction;
			};
			this.accExecuteFuntionOnShowAnswer = function()
			{
				for(var countFOSA=0;countFOSA<this.arFuntionOnShowAnswer.length;countFOSA++)
				{
					this._myFunction=this.arFuntionOnShowAnswer[countFOSA];
					this._myFunction(this.correcta == this.numRespuestaActual,this.g('respuesta'+this.correcta).getAnswer(),this.g('respuesta'+this.numRespuestaActual).getAnswer());
				}
			};

			this.loadNewQuestion = function(){
				_EduIntBasic.Comunication.Ajax.send({
			        method: 'GET',
			        path: 'create-complement/nuevosjuegos/quienquieresermillonario/quienquieresermillonario_parada'+BasicEI.colocarCeros(2,this.numPregunta)+'.json',
			        sendInfo: '',
			        myFunction: function(responseText, jsonInfo) {
			        	var infoJsonQQSM = JSON.parse(responseText);
			        	this.jsonInfo=infoJsonQQSM;
			        	this.setQuestion(infoJsonQQSM.pregunta);
			        	this.setAnswer1(infoJsonQQSM.respuesta1);
			        	this.setAnswer2(infoJsonQQSM.respuesta2);
			        	this.setAnswer3(infoJsonQQSM.respuesta3);
			        	this.setAnswer4(infoJsonQQSM.respuesta4);
			        	this.correcta=infoJsonQQSM.correcta;
			        },
			    },this);
			    this.accUnSelect();
			};

			this.loadNewQuestion();	

			this.addFuntionOnShowAnswer(function(bnRespuestaCorrecta,textoRespuestaCorrecta,textoRespuestaSeleccionada){
				this.accSelRight(this.correcta);
				if(bnRespuestaCorrecta)
				{
					this.numPregunta++;
					this.accNextPositionPuntaje();
					if(this.getPosicionActual() < this.qqsmInfo.puntaje.puntajes.length)
					{
						this.bnNuevaPregunta=true;
					}
					else
					{
						this.accOnWin();
					}
				}
				else
				{
					this.accPresentadorDice('<br>INCORRECTO,<br> Lo sentimos,<br><br>Vuelve a intentarlo', 25*10);
				}
			});
		});

		this.board.createAnimation(function(infoAnimation){

			if(this.bnSelectRight)
			{
				if(this.bnPrimeraVezEnSelectRight) { this.accPresentadorDice('<br>...Ultima Palabra...',this.numFramesEsperandoSiEsCorrecto); this.bnPrimeraVezEnSelectRight=false; }
				if(!this.accQstnWaitNumFrames(this.numFramesEsperandoSiEsCorrecto,'Esperar que seleccionen la correcta'))
				{
					this.accExecuteFuntionOnShowAnswer();

					this.accRestarWaitNumFrames('Esperar que seleccionen la correcta');
					this.bnSelectRight=false;
					this.bnPrimeraVezEnSelectRight=true;
				}
			}
			if(this.bnNuevaPregunta)
			{
				if(this.bnPrimeraVezEnFelicitacion) { this.accPresentadorDice('<br>Genial, Bien pensado',this.numFramesEsperandoNuevaPregunta); this.bnPrimeraVezEnFelicitacion=false; }
				if(!this.accQstnWaitNumFrames(this.numFramesEsperandoNuevaPregunta,'Esperando la siguiente pregunta'))
				{
					this.loadNewQuestion();
					this.accEnableSelect();

					this.accRestarWaitNumFrames('Esperando la siguiente pregunta');
					if(this.bnPrimeraVezEnNuevaPregunta) { this.accPresentadorDice('<br>La siguiente pregunta es:'); this.bnPrimeraVezEnNuevaPregunta=false; }
					this.bnPrimeraVezEnNuevaPregunta=true;
					this.bnPrimeraVezEnFelicitacion=true;
					this.bnNuevaPregunta=false;
				}
			}
		}).startAnimation();
	};
};

$(document).ready(function() {
    var appQuienQuiereSerExpertoDrupal = new AppQuienQuiereSerExpertoDrupal();
    appQuienQuiereSerExpertoDrupal.create(qqsmInfo);
});