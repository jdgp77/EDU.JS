var qqsmInfo = {
	id: 'id_qqsed',
	name: 'Experto Drupal',
	titulo: '¿Quien quiere ser Expero en Drupal?',
	subtitulo: '---Conceptos basicos de programación ---',
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
		this.board = EduInt.createBoardIn(document.getElementById(qqsmInfo.id),qqsmInfo.name,600,303);
		this.board.setBackgroundImage('create-complement/nuevosjuegos/quienquieresermillonario/images/fondo.png').setBackgroundSize('cover');
		
		var espacioEntrePuntajes = 15;
		this.board.setCustom('puntaje',function(jsonInfo){
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
		this.board.g('posición').getCustom('puntaje',{
			espacioEntrePuntajes: 12,
			prefijo: 'pesos',
			puntajes: [
				'$ 100',
				'$ 200',
			],
		}).setLeft(10).setTop(10);
		this.board.accNextPosition = function()
		{
			this.g('posición').nextPosition();
		}
		this.board.accSelRight = function(numRespuesta)
		{
			this.g('respuesta'+numRespuesta).accSelAsRight();
		}

		this.board.accVeryfyPosition = function(numRespuesta)
		{
			this.accSelRight(this.correcta);
			this.accDisableSelect();
			if(this.correcta == numRespuesta)
			{
				this.accNextPosition();
			}
			else
			{

			}
		}

		this.board.accDisableSelect = function(){
			this.g('respuesta1').accDisableSelect();
			this.g('respuesta2').accDisableSelect();
			this.g('respuesta3').accDisableSelect();
			this.g('respuesta4').accDisableSelect();
		}

		this.board.g('group-pregunta').setPosition(96,115);
		this.board.g('group-pregunta').t('pregunta-fondo').setBackgroundImageInAlpha('create-complement/nuevosjuegos/quienquieresermillonario/images/pregunta.png').setDimentions(410,45);
		this.board.g('group-pregunta').t('pregunta').setType('text').setColor('#FFF').setText('Pregunta').setPosition(32,10).setWidth(350);

		this.board.setCustom('respuesta',function(infoJSON){
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
		this.board.setCustom('linea',function(infoJSON){
			this.setHeight(7).setBackgroundColor('#c7c7c7');
		});

		this.board.t('linea-pregunta-izq').getCustom('linea').setPosition(0,134).setWidth(96);
		this.board.t('linea-pregunta-der').getCustom('linea').setPosition(96+410,134).setWidth(94);

		this.board.t('linea-respuesta1-izq').getCustom('linea').setPosition(0,191).setWidth(97);
		this.board.t('linea-respuesta1-der').getCustom('linea').setPosition(97+197,191).setWidth(8);

		this.board.t('linea-respuesta2-izq').getCustom('linea').setPosition(97+197+8,191).setWidth(7);
		this.board.t('linea-respuesta2-der').getCustom('linea').setPosition(97+197+8+7+197,191).setWidth(94);

		this.board.t('linea-respuesta3-izq').getCustom('linea').setPosition(0,248).setWidth(97);
		this.board.t('linea-respuesta3-der').getCustom('linea').setPosition(97+197,248).setWidth(8);

		this.board.t('linea-respuesta4-izq').getCustom('linea').setPosition(97+197+8,248).setWidth(7);
		this.board.t('linea-respuesta4-der').getCustom('linea').setPosition(97+197+8+7+197,248).setWidth(94);


		this.board.g('respuesta1').setPosition( 97,172).getCustom('respuesta', { texto_opcion: 'A:', numRespuesta: 1 });
		this.board.g('respuesta2').setPosition(309,172).getCustom('respuesta', { texto_opcion: 'B:', numRespuesta: 2 });
		this.board.g('respuesta3').setPosition( 97,234-5).getCustom('respuesta', { texto_opcion: 'C:', numRespuesta: 3 });
		this.board.g('respuesta4').setPosition(309,234-5).getCustom('respuesta', { texto_opcion: 'D:', numRespuesta: 4 });


		this.board.setQuestion = function(text){ this.g('group-pregunta').t('pregunta').setText(text); };
		this.board.setAnswer1  = function(text){ this.g('respuesta1').setAnswer(text); };
		this.board.setAnswer2  = function(text){ this.g('respuesta2').setAnswer(text); };
		this.board.setAnswer3  = function(text){ this.g('respuesta3').setAnswer(text); };
		this.board.setAnswer4  = function(text){ this.g('respuesta4').setAnswer(text); };

		this.board.loadNewQuestion = function(){
			_EduIntBasic.Comunication.Ajax.send({
		        method: 'GET',
		        path: 'create-complement/nuevosjuegos/quienquieresermillonario/quienquieresermillonario_parada01.json',
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
		};

		this.board.loadNewQuestion();
	};
};

$(document).ready(function() {
    var appQuienQuiereSerExpertoDrupal = new AppQuienQuiereSerExpertoDrupal();
    appQuienQuiereSerExpertoDrupal.create(qqsmInfo);
});