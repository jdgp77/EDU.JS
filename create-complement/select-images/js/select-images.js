function selectImages(selectViews)
{
	boardVistas = $('#id_board_vistas_ei').createBoard('miPrimerTablero',selectViews.achoTablero,90);	//.eiLoadBoard().setMeasures(500,200).
	boardVistas.t('imagen360').getElement().style.backgroundColor='transparent';
/*
	boardUno.createScene(function(){
		ei.objName('auto').setPos(0,50).itIs('basicflaticon__carro');
	}).createAnimation(function(){
		ei.objName('auto').accMoverEnX(.5);
	}).start();
*/

	//	Pasa por todas la simagenes
	var distranciaEntreImagenes = 100;
	anchoDeTodasLasImagenes = (selectViews.arImagesViews.length*selectViews.anchoImagenes) + ((selectViews.arImagesViews.length-1)*selectViews.distranciaEntreImagenes);
	posicionPrimeraImagen = parseInt((selectViews.achoTablero - anchoDeTodasLasImagenes));
	if(posicionPrimeraImagen<0)
	{ posicionPrimeraImagen = parseInt(selectViews.distranciaEntreImagenes); }

	for(var contImagesViews=0;contImagesViews<selectViews.arImagesViews.length;contImagesViews++)
	{
		var thingImage = boardVistas.t('Imagen'+contImagesViews,posicionPrimeraImagen+(contImagesViews*selectViews.anchoImagenes)+((contImagesViews)*selectViews.distranciaEntreImagenes),20,selectViews.anchoImagenes,selectViews.altoImagenes);
		thingImage.numImage_ = contImagesViews;
		thingImage.setEvOnClick(function() {
			selectViews.arImagesViews[this.numImage_].js();
		});
		thingImage.setImageUrl(selectViews.arImagesViews[thingImage.numImage_].url);
		thingImage.setClass('c_select_image');

	}

	//	Movimiento en X de las imagenes
	movimientoEnXDeLasImagenes = 0;
	//	Movimiento maximo en X
	movimientoMaximosEnXDeLasImagenes = -(anchoDeTodasLasImagenes-selectViews.achoTablero+parseInt(selectViews.distranciaEntreImagenes));

	//	Arreglo con lo agrandado de las imagenes
	arAgrandadoImagenes = new Array();

	boardVistas.createAnimation(function(){
		//	Movimiento de las imagenes en en esta animacion X
		movDeImagenesEnX = 0;
		//	Pasa por cada una de las imagenes
		for(var contImagesViews=0;contImagesViews<selectViews.arImagesViews.length;contImagesViews++)
		{
			var nombreImagen = 'Imagen'+contImagesViews;
			//	boardVistas.t(nombreImagenes).accMoveInX(0.5);
			if(arAgrandadoImagenes[nombreImagen] === undefined) { arAgrandadoImagenes[nombreImagen]=0; }

			if(boardVistas.qstnIsMouseHover() || 0 < selectImageNumberFramesToMoveLeft || 0 < selectImageNumberFramesToMoveRight)
			{
				var boardVistasMousePosInX = boardVistas.getMousePosInX();
				if(boardVistasMousePosInX < selectViews.espacioDeActivacionEnLados || 0 < selectImageNumberFramesToMoveLeft)
				{
					//	Si puede moverse mas a la izquierda
					if(movimientoEnXDeLasImagenes < 0)
					{
						var velocidadEnX = parseInt(selectViews.velocidadMaxima*boardVistasMousePosInX/100)-selectViews.velocidadMaxima;
						var movDeImagenesEnX = -(velocidadEnX);
						if(0 < (movimientoEnXDeLasImagenes + movDeImagenesEnX)) { movDeImagenesEnX = 0 - movimientoEnXDeLasImagenes; }
						boardVistas.t(nombreImagen).accMoveInX(movDeImagenesEnX);
					}
				}
				else if(selectViews.achoTablero - selectViews.espacioDeActivacionEnLados < boardVistasMousePosInX || 0 < selectImageNumberFramesToMoveRight)
				{
					//	Si puede moverse mas a la derecha
					if(movimientoMaximosEnXDeLasImagenes < movimientoEnXDeLasImagenes)
					{
						var velocidadEnX = parseInt(selectViews.velocidadMaxima*(boardVistasMousePosInX-400)/100);
						var movDeImagenesEnX = -(velocidadEnX);
						if((movimientoEnXDeLasImagenes + movDeImagenesEnX) < movimientoMaximosEnXDeLasImagenes) { movDeImagenesEnX = movimientoMaximosEnXDeLasImagenes - movimientoEnXDeLasImagenes; }
						boardVistas.t(nombreImagen).accMoveInX(movDeImagenesEnX);
					}
				}
			}

			//	Si el mouse esta encima de este
			if(boardVistas.t(nombreImagen).qstnMouseOver())
			{
				if(arAgrandadoImagenes[nombreImagen] <= selectViews.anchoYAltoExtraImagenesOnHover)
				{
					arAgrandadoImagenes[nombreImagen] = arAgrandadoImagenes[nombreImagen]+2;
					boardVistas.t(nombreImagen).accChangeWidth(selectViews.anchoImagenes + arAgrandadoImagenes[nombreImagen]);
					boardVistas.t(nombreImagen).accChangeHeight(selectViews.altoImagenes + arAgrandadoImagenes[nombreImagen]);
					boardVistas.t(nombreImagen).accMoveInX(-1);
					boardVistas.t(nombreImagen).accMoveInY(-1);
				}
			}
			else if(0 < arAgrandadoImagenes[nombreImagen])
			{
				arAgrandadoImagenes[nombreImagen] = arAgrandadoImagenes[nombreImagen]-2;
				boardVistas.t(nombreImagen).accChangeWidth(selectViews.anchoImagenes + arAgrandadoImagenes[nombreImagen]);
				boardVistas.t(nombreImagen).accChangeHeight(selectViews.altoImagenes + arAgrandadoImagenes[nombreImagen]);
				boardVistas.t(nombreImagen).accMoveInX(1);
				boardVistas.t(nombreImagen).accMoveInY(1);
			}

		}
		movimientoEnXDeLasImagenes = movimientoEnXDeLasImagenes+movDeImagenesEnX;
		if(0<selectImageNumberFramesToMoveLeft) { selectImageNumberFramesToMoveLeft--; }
		if(0<selectImageNumberFramesToMoveRight) { selectImageNumberFramesToMoveRight--; }
	}).startAnimation();
}

var selectImageNumberFramesToMoveLeft = 0;
function moveLeft()
{
	selectImageNumberFramesToMoveLeft = 25;
}var selectImageNumberFramesToMoveRight = 0;
function moveRight()
{
	selectImageNumberFramesToMoveRight = 25;
}
