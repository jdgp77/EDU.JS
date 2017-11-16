var EstampaloJS = {
	arBoardsEstamados: [],
	init: function(options) {
		var myOptions = EduIntBasic.defaultJson(options, {
			selector: '#lugarCaliseta',
			//	Si esta en true muestra el estampado y al pasar el mouse lo muestra con la camiseta
			bnTipoPreview: true,
			preview: [
				{
					name: 'Camiseta Hombre',
					logo: 'algo.png',
					bnIsDefault: true,
				}
			],
			camisetasDeFondo: {
				frontal: 'algo.png',
				trasera: 'algo2.png'
			},
			estampado: 'estampado3.svg',
			ancho: 300,
			alto: 300,
			en: {
			  rotate: false,
			  size: false,
			  move: false,
			},
			iconos: 'create-complement/estampalo/images/Iconos.png'
		});

		var Board = $(options.selector).createBoard('Estampado01', options.ancho, options.alto)
		this.arBoardsEstamados[this.arBoardsEstamados.length]=Board;
		this.Board = Board;
		this.Board.start(function(){

				this.bnTipoPreview = myOptions.bnTipoPreview;

				this.setOnMouseover(function(evn){
					this.g('EstampadoBase').setDisplay('none');
					this.g('TipoProductos').setDisplay('block');
				});
				this.setOnMouseout(function(evn){
					this.g('EstampadoBase').setDisplay('block');
					this.g('TipoProductos').setDisplay('none');
				});
				//	Colocamos los objetos iniciales
				//	===============================
				this.estampado = {
					posInX: myOptions.ancho*95/300,
					posInY: myOptions.alto*93/300,
					ancho: myOptions.ancho*111/300,
					alto: 'auto',
				};

				if(myOptions.bnTipoPreview) {

					//	Logo ocupando todo el espacio
					//	=============================
					this.g('EstampadoBase').setDisplay('block');
					this.g('EstampadoBase').t('Estampado01')
						.setType('svg')
						.setDimensions(myOptions.ancho, 'auto')
						.setPosInXY(0, 0)
						.loadForURL(myOptions.estampado, function(svg) {
							var ancho = this.getWidth();
							var alto = this.getHeight();
							if(alto < ancho) {
								this.setPosInY(EduIntBasic.roundOut((myOptions.alto - alto)/2,0));
							}
							else {
								this.setDimensions('auto', myOptions.alto);
								var alto = myOptions.alto;
								var ancho = this.getWidth();
								this.setPosInX(EduIntBasic.roundOut((myOptions.ancho - ancho)/2,0));
							}
							svg.querySelector('[fill]').setAttribute('fill','#000');

						});

					//	Logo de tipos de producto
					//	=========================
					this.g('IconosTipoEstampados').setPosInXY(myOptions.ancho-60, 0);

					//	Muestra los tipos de productos
					//	==============================
					this.g('TipoProductos').setPosInXY(0, 0);

					for (var i = 0; i < myOptions.tipoDeProductos.length; i++) {
						var tipoDeProducto = myOptions.tipoDeProductos[i];

						/*
						//	Logo de tipos de producto
						//	=========================
						this.g('IconosTipoEstampados').t('Icono:'+tipoDeProducto.name)
							.setDimensions(45, 45)
							.setPosInXY(0,52*i+15)
							.setBackgroundImageInAlpha(tipoDeProducto.logo)
							.setBackgroundPosition(tipoDeProducto.logoPosition);

						*/

						//	Muestra los tipos de productos
						//	==============================
						this.g('TipoProductos').t('Producto:'+tipoDeProducto.name)
							.setBackgroundImage(tipoDeProducto.imagen)
							.setDimensions(myOptions.ancho, myOptions.ancho)
							.setBackgroundSize('cover');
						this.g('TipoProductos').t('Estampado:'+tipoDeProducto.name)
							.setType('svg')
							.setVerticalAlign('top')
							.setDimensions(this.estampado.ancho, 'auto')
							.setPosInXY(this.estampado.posInX, this.estampado.posInY)
							.loadForURL(myOptions.estampado, function(svg) {
								// svg.querySelector('[fill]').setAttribute('fill','#000');
							});
						this.g('TipoProductos').setDisplay('none');
					}


				}
				else {
					this.t('CamisetaDeFondo').setBackgroundImage(myOptions.camisetasDeFondo.frontal).setDimensions(myOptions.ancho, myOptions.ancho).setBackgroundSize('cover');
					this.t('Estampado').setType('svg').setDimensions(this.estampado.ancho,this.estampado.alto).setPosInXY(this.estampado.posInX, this.estampado.posInY).loadForURL(myOptions.estampado, function(svg) {

						this._Board.estampado.alto = this._element.offsetHeight;
						var estampado = this._Board.estampado;

						if(myOptions.en.rotate) {
							this._Board.t('BotonRotar').setDimensions(45,45).setPosInXY(estampado.posInX-(45-1)/2, estampado.posInY-(45-1)/2).setBackgroundImageInAlpha(myOptions.iconos).setBackgroundPosition('-45px -45px');
							this._Board.t('BotonRotar').enDragAndDrop();
							this._Board.t('BotonRotar')._element.style.cursor='pointer';
							this._Board.accRotateD = function(degValue) {
				                this.t('Estampado').accRotate(degValue+'deg');
							}
						}
						if(myOptions.en.size) {
							this._Board.t('BotonTamaño').setDimensions(45,45).setPosInXY(estampado.posInX+estampado.ancho-(45-1)/2, estampado.posInY-(45-1)/2).setBackgroundImageInAlpha(myOptions.iconos).setBackgroundPosition('0 -45px');
							this._Board.t('BotonTamaño')._element.style.cursor='pointer';
							this._Board.accScale = function(value) {
				                this.t('Estampado').accScale(value);
							}
						}
						if(myOptions.en.move) {
							this._Board.t('BotonMover').setDimensions(45,45).setPosInXY(estampado.posInX+estampado.ancho-(45-1)/2, estampado.posInY+estampado.alto-(45-1)/2).setBackgroundImageInAlpha(myOptions.iconos).setBackgroundPosition('-90px -45px');
							this._Board.t('BotonMover')._element.style.cursor='pointer';
						}


					});
				}

			});//.createAnimation(function(){
				//	Colocamos la animación
				//	======================


			//}).startAnimation();
	}
};