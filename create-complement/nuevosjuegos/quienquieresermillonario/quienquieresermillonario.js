var qqsmInfo = {
	id: 'id_qqsed',
	name: 'Experto Drupal',
	titulo: '¿Quien quiere ser Drupalero?',
	subtitulo: '---Conceptos basicos de programación ---',
	puntaje: {
		prefijo: 'pesos',
		puntajes: [
			'  $ 100',
			'  $ 200',
			'  $ 300',
			'  $ 500',
			'$ 1.000',
		],
	},
	preguntas: {
		paradas: [
			{ Premio: 'Por   1 puntos.', ajaxurl: 'quienquieresermillonario_parada01.json', },
			{ Premio: 'Por   2 puntos.', ajaxurl: 'quienquieresermillonario_parada02.json', },
			{ Premio: 'Por   3 puntos.', ajaxurl: 'quienquieresermillonario_parada03.json', },
			{ Premio: 'Por   5 puntos.', ajaxurl: 'quienquieresermillonario_parada04.json', },
			{ Premio: 'Por  10 puntos,', ajaxurl: 'quienquieresermillonario_parada05.json', parada: true, },
			{ Premio: 'Por  20 puntos.', ajaxurl: 'quienquieresermillonario_parada06.json', },
			{ Premio: 'Por  30 puntos.', ajaxurl: 'quienquieresermillonario_parada07.json', },
			{ Premio: 'Por  50 puntos.', ajaxurl: 'quienquieresermillonario_parada08.json', },
			{ Premio: 'Por 100 puntos,', ajaxurl: 'quienquieresermillonario_parada09.json', parada: true, },
		],
	},
};

var AppQuienQuiereSerExpertoDrupal = function(){
	this.create = function(qqsmInfo){
		this.board = EduInt.createBoardIn(document.getElementById(qqsmInfo.id),qqsmInfo.name,600,400);
		this.board.setBackgroundImage('create-complement/nuevosjuegos/quienquieresermillonario/images/fondo.png').setBackgroundSize('cover');
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

			this.setCustom('presentador', function(){
				this.t('imagen-persentador').setBackgroundImageInAlpha('create-complement/nuevosjuegos/quienquieresermillonario/images/presentador.png').setDimentions(350,200);
				this.t('voz').setType('text').setDimentions(200,100).setBackgroundColor('rgba(0,0,0,0.1)').setTextAlign('center');
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
				this.accCreateAnimateFunctionInShadow(function(info,optionJson){
					if(this.bnTextoVisible)
					{
						if(!this.Board.accQstnWaitNumFrames(this.numFramesTextoVisible,'presentador--tiempotextovisible'))
						{
							this.t('voz').setText('');
							this.bnTextoVisible=false;
							this.Board.accRestarWaitNumFrames('presentador--tiempotextovisible');
						}
					}
				});
			});
			this.g('presentador').getCustom('presentador',{ }).setPosition(200,10);
			this.accPresentadorDice=function(texto,numFramesVisible)
			{
				this.g('presentador').setText(texto,numFramesVisible);
			}
			this.accPresentadorDice('<br>¡¡Hola!! y bienvenido<br><br>a<br>'+qqsmInfo.titulo,25*5);
			this.accPresentadorDice('<br>La primera pregunta por '+qqsmInfo.titulo);

			this.setCustom('puntaje',function(jsonInfo){
				for(var count=0;count<jsonInfo.puntajes.length;count++)
				{
					var puntaje = jsonInfo.puntajes[count];
					this.t('pos'+count).setType('text').setText(puntaje+' '+jsonInfo.prefijo).setTop(jsonInfo.espacioEntrePuntajes*count).setWidth(70).setFontSize(10).setTextAlign('right');
				}
				this.t('posicion-actual').setDimentions(75,5).setPosition(0,jsonInfo.espacioEntrePuntajes*0+3)._setBackgroundColor('rgba(255,255,0,0.5)');
				this.t('posicion-actual').posicion=0;
				this.nextPosition = function()
				{
					this.t('posicion-actual').posicion++;
					this.t('posicion-actual').setPosition(0,jsonInfo.espacioEntrePuntajes*this.t('posicion-actual').posicion+3);

					return this;
				}
			});
			this.g('posición').getCustom('puntaje',{
				espacioEntrePuntajes: 12,
				prefijo: qqsmInfo.puntaje.prefijo,
				puntajes: qqsmInfo.puntaje.puntajes,
			}).setLeft(10).setTop(10);
			this.accNextPositionPuntaje = function()
			{
				this.g('posición').nextPosition();
			}
			this.accSelRight = function(numRespuesta)
			{
				this.g('respuesta'+numRespuesta).accSelAsRight();
			}

			this.bnSelectRight = false;
			this.numFramesEsperandoSiEsCorrecto=25*1.2;
			this.numFramesEsperandoNuevaPregunta=25*2;
			this.accVeryfyPosition = function(numRespuesta)
			{
				this.accDisableSelect();
				this.numRespuestaActual=numRespuesta;
				this.bnSelectRight=true;
			}

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

			this.g('group-pregunta').setPosition(96,220);
			this.g('group-pregunta').t('pregunta-fondo').setBackgroundImageInAlpha('create-complement/nuevosjuegos/quienquieresermillonario/images/pregunta.png').setDimentions(410,45);
			this.g('group-pregunta').t('pregunta').setType('text').setColor('#FFF').setText('Pregunta').setPosition(32,10).setWidth(350);

			this.setCustom('respuesta',function(infoJSON){
				this.t(this.getName()+'-fondo').setBackgroundImageInAlpha('create-complement/nuevosjuegos/quienquieresermillonario/images/opcion.png').setDimentions(197,45);
				this.t(this.getName()+'-texto').setType('text').setColor('#FFF').setPosition(43,12).setWidth(130);
				this.t(this.getName()+'-numero').setType('text').setColor('#ffef40').setText(infoJSON.texto_opcion).setPosition(21,12);
				this.t(this.getName()+'-boton').setBackgroundColor('rgba(255,255,255,0.1)').setDimentions(197,45);

				this.setAnswer=function(txt){
					this.t(this.getName()+'-texto').setText(txt);
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

			this.t('linea-pregunta-izq').getCustom('linea').setPosition(0,220+19).setWidth(96);
			this.t('linea-pregunta-der').getCustom('linea').setPosition(96+410,220+19).setWidth(94);

			this.t('linea-respuesta1-izq').getCustom('linea').setPosition(0,191+100).setWidth(97);
			this.t('linea-respuesta1-der').getCustom('linea').setPosition(97+197,191+100).setWidth(8);

			this.t('linea-respuesta2-izq').getCustom('linea').setPosition(97+197+8,191+100).setWidth(7);
			this.t('linea-respuesta2-der').getCustom('linea').setPosition(97+197+8+7+197,191+100).setWidth(94);

			this.t('linea-respuesta3-izq').getCustom('linea').setPosition(0,248+100).setWidth(97);
			this.t('linea-respuesta3-der').getCustom('linea').setPosition(97+197,248+100).setWidth(8);

			this.t('linea-respuesta4-izq').getCustom('linea').setPosition(97+197+8,248+100).setWidth(7);
			this.t('linea-respuesta4-der').getCustom('linea').setPosition(97+197+8+7+197,248+100).setWidth(94);


			this.g('respuesta1').setPosition( 97,171+100).getCustom('respuesta', { texto_opcion: 'A:', numRespuesta: 1 });
			this.g('respuesta2').setPosition(309,172+100).getCustom('respuesta', { texto_opcion: 'B:', numRespuesta: 2 });
			this.g('respuesta3').setPosition( 97,234-5+100).getCustom('respuesta', { texto_opcion: 'C:', numRespuesta: 3 });
			this.g('respuesta4').setPosition(309,234-5+100).getCustom('respuesta', { texto_opcion: 'D:', numRespuesta: 4 });

			this.setQuestion = function(text){ this.g('group-pregunta').t('pregunta').setText(text); };
			this.setAnswer1  = function(text){ this.g('respuesta1').setAnswer(text); };
			this.setAnswer2  = function(text){ this.g('respuesta2').setAnswer(text); };
			this.setAnswer3  = function(text){ this.g('respuesta3').setAnswer(text); };
			this.setAnswer4  = function(text){ this.g('respuesta4').setAnswer(text); };

			this.loadNewQuestion = function(){
				_EduIntBasic.Comunication.Ajax.send({
			        method: 'GET',
			        path: 'create-complement/nuevosjuegos/quienquieresermillonario/quienquieresermillonario_parada'+BasicEI.colocarCeros(2,this.numPregunta)+'.json',
			        sendInfo: '',
			        myFunction: function(responseText, jsonInfo) {
			        	var infoJsonQQSM = JSON.parse(responseText);
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
		});

		this.board.createAnimation(function(infoAnimation){

			if(this.bnSelectRight)
			{
				if(this.bnPrimeraVezEnSelectRight) { this.accPresentadorDice('<br>...Ultima Palabra...',this.numFramesEsperandoSiEsCorrecto); this.bnPrimeraVezEnSelectRight=false; }
				if(!this.accQstnWaitNumFrames(this.numFramesEsperandoSiEsCorrecto,'Esperar que seleccionen la correcta'))
				{
					this.accSelRight(this.correcta);
					if(this.correcta == this.numRespuestaActual)
					{
						this.numPregunta++;
						this.accNextPositionPuntaje();
						this.bnNuevaPregunta=true;
					}
					else
					{
						this.accPresentadorDice('<br>INCORRECTO,<br> Lo sentimos,<br><br>Vuelve a intentarlo', 25*100);
					}
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