var EduJS_Memoria = {
	_arBoards: [],
	addBoardFunctions: function(board){
		board.setCustom('boton-de-memoria', function(jsonInfo){
			this.setType('text').setText(jsonInfo.texto).setPosition(jsonInfo.posInX,310).setDimensions(70,60).setBackgroundColor(jsonInfo.backgroundColor).setFontSize(11).setFontFamily('Open Sans, Arial').setColor('#FFF').setBorderRadius(5).setPadding(10).setCursor('pointer');
		});
		
		board.t('Boton-1').getCustom('boton-de-memoria', {
			texto: '<strong>No</strong> recuerdo<br><span style="font-size: 0.7em">Ni la mas minima idea</span>',
			posInX: 10+100*0,
			backgroundColor: '#733',
		});
		board.t('Boton-2').getCustom('boton-de-memoria', {
			texto: '<strong>No</strong> recuerdo<br><span style="font-size: 0.7em">Pero me parece conocido</span>',
			posInX: 10+100*1,
			backgroundColor: '#533',
		});
		board.t('Boton-3').getCustom('boton-de-memoria', {
			texto: 'Lo recuerdo<br><span style="font-size: 0.7em">pero casi se me olvida</span>',
			posInX: 10+100*2,
			backgroundColor: '#333',
		});
		board.t('Boton-4').getCustom('boton-de-memoria', {
			texto: 'Lo recuerdo<br><span style="font-size: 0.7em">bien</span>',
			posInX: 10+100*3,
			backgroundColor: '#555',
		});
		board.t('Boton-5').getCustom('boton-de-memoria', {
			texto: 'Lo recuerdo<br><span style="font-size: 0.7em">Muy muy bien</span>',
			posInX: 10+100*4,
			backgroundColor: '#777',
		});

		board.t('¿Lo recuerdas?').setType('text').setText('¿Que tanto lo recuerdas?').setFontSize(15).setFontFamily('Open Sans, Arial').setWidth(490).setPosition(10,280).setTextAlign('center');

		var altoCuadroRecuerdo=100;
		var espacioEntreElementos=20;
		board.t('Respuesta-1').setDimensions(490,altoCuadroRecuerdo).setPosition(10,10).setBorder('1px solid #EEE').setBackgroundColor('transparent');
		board.t('Boton mostrar respuesta').setType('text').setText('-- Mostrar Respuesta --').setFontSize(15).setFontFamily('Open Sans, Arial').setWidth(200).setPosition(152,altoCuadroRecuerdo+espacioEntreElementos).setTextAlign('center').setDimensions(200,20).setCursor('pointer').setBorder('1px solid #333').setBorderRadius(5);
		board.t('Respuesta-2').setDimensions(490,altoCuadroRecuerdo).setPosition(10,altoCuadroRecuerdo+espacioEntreElementos*3).setBorder('1px solid #EEE').setBackgroundColor('transparent');

		return board;
	},
	crear: function(idLugar,nombres){
		var board = EduInt.createBoardIn(document.getElementById(idLugar),nombres,510,400);
		EduJS_Memoria._arBoards[EduJS_Memoria._arBoards.length] = board;
		board = EduJS_Memoria.addBoardFunctions(board);
		return board;
	},
};

var tableroBiblia = EduJS_Memoria.crear('id_memoria','Memoria Biblia');