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
			classEstampado: '',
			classTipoDeProducto: '',
			camisetasDeFondo: {
				frontal: 'algo.png',
				trasera: 'algo2.png'
			},
			estampado: 'estampado3.svg',
			ancho: 300,
			alto: 300,
			enShirtOnMouseOver: true,
			en: {
			  rotate: false,
			  size: false,
			  move: false,
			},
			tipoDeProductos: { tiposDeProductos: [] },
			iconos: 'create-complement/estampalo/images/Iconos.png'
		});

		if(myOptions.element) {
			var lugarJQuery = myOptions.element;
		}
		else {
			var lugarJQuery = myOptions.selector;
		}

		if (myOptions.alto == 'auto') {
			myOptions.alto = myOptions.ancho*693/555;
		}

		var Board = jQuery(lugarJQuery).createBoard('Estampado01', myOptions.ancho, myOptions.alto);
		BoardCamiseta = Board;
		this.arBoardsEstamados[this.arBoardsEstamados.length]=Board;
		this.Board = Board;
		this.Board.start(function(){
			this.bnTipoPreview = myOptions.bnTipoPreview;

			if(myOptions.enShirtOnMouseOver) {
				this.setOnMouseover(function(evn){
					this.g('EstampadoBase').setDisplay('none');
					this.g('TipoProductos').setDisplay('block');
				});
				this.setOnMouseout(function(evn){
					this.g('EstampadoBase').setDisplay('block');
					this.g('TipoProductos').setDisplay('none');
				});
			}

			//	Colocamos los objetos iniciales
			//	===============================
			this.estampado = {
				posInX: myOptions.ancho*parseFloat(myOptions.posDesdeLaIzq)/100,
				posInY: myOptions.alto*parseFloat(myOptions.posDesdeLaArr)/100,
				ancho: myOptions.ancho*parseFloat(100-myOptions.posDesdeLaDer-myOptions.posDesdeLaIzq)/100,
				alto: myOptions.alto * (1 - parseFloat(myOptions.posDesdeLaAba)/100) - myOptions.ancho*parseFloat(myOptions.posDesdeLaIzq)/100,
			};

			if(myOptions.bnTipoPreview) {

				//	Logo ocupando todo el espacio
				//	=============================
				this.g('EstampadoBase').setDisplay('block');
				this.g('EstampadoBase').addClass(myOptions.classEstampado);
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
						if(svg.querySelector('[fill]')) {
							svg.querySelector('[fill]').setAttribute('fill','#000');
						}

					});

				//	Logo de tipos de producto
				//	=========================
				this.g('IconosTipoEstampados').setPosInXY(myOptions.ancho-60, 0);

				//	Muestra los tipos de productos
				//	==============================
				this.g('TipoProductos').setPosInXY(0, 0);
				this.g('TipoProductos').addClass(myOptions.classTipoDeProducto);

				for (var i = 0; i < myOptions.tipoDeProductos.tiposDeProductos.length; i++) {
					var tipoDeProducto = myOptions.tipoDeProductos.tiposDeProductos[i];

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
					if(myOptions.enShirtOnMouseOver) {
						this.g('TipoProductos').setDisplay('none');
					}
				}
			}
			else {

				this.arTiposDeProductoPorNombre = [];

				this.accCambiarCamiseta = function(rutaCamiseta, name) {
					this.g(name).t('CamisetaDeFondo').setBackgroundImage(rutaCamiseta);
				}
				if(myOptions.en.rotate) {
					this.accRotateD = function(degValue, name) {
		        		this.g(name).t('Estampado').accRotate(degValue+'deg');
					}
				}
				if(myOptions.en.size) {
					this.accScale = function(value, name) {
		        		this.g(name).t('Estampado').accScale(value);
					}
				}
				if(myOptions.en.move) {
					this.accMove = function(posInX, posInY, name) {
		        		this.g(name).t('Estampado').setPosInXY(posInX, posInY);
					}
				}
				this.setTalla = function(options, name) {
					this.g(name).g('Talla').t('Talla').setText(options.talla);
				}
				this.setTextAncho = function(valor, name) {
					this.g(name).t('tamanoAncho').setType('text').setText(valor);
				}
				this.setTextAlto = function(valor, name) {
					this.g(name).t('tamanoAlto').setType('text').setText(valor);	
				}
				this.setTextCintura = function(valor, name) {
					this.g(name).t('tamanoCintura').setType('text').setText(valor);
				}
				this.accMostrarMedidas = function(name) {
					this.g(name).t('tamanoAncho').setDisplay('block');
					this.g(name).t('tamanoAlto').setDisplay('block');
					this.g(name).t('tamanoCintura').setDisplay('block');
				}
				this.accOcultarMedidas = function(name) {
					this.g(name).t('tamanoAncho').setDisplay('none');
					this.g(name).t('tamanoAlto').setDisplay('none');
					this.g(name).t('tamanoCintura').setDisplay('none');

				}
				this.myOptions = myOptions;
				this.accOcultarTiposDeProductosSalvo = function(name) {
					for (var i = 0; i < this.myOptions.tipoDeProductos.tiposDeProductos.length; i++) {
						var tipoProducto = this.myOptions.tipoDeProductos.tiposDeProductos[i];

						this.g(tipoProducto.name).setDisplay('none');
					}
					this.g(name).setDisplay('block');
				}

				this.getInfoTallas = function(name,tallaName) {
					return this.arObjTallasPorName[name][tallaName];
				}
				this.getInfoTallasActuales = function(name) {
					return this.arObjTallasPorName[name][this.nameTallaSeleccionada[name]];
				}
				this.talla_setAsSelected = function(name, tallaName) {
					this.g(name).g('Talla').t('Talla').setType('text').setText(tallaName);
					this.nameTallaSeleccionada[name] = tallaName;
				}

				this.talla_onclick = function(name, tallaName) {
					var options = this.getInfoTallas(name, tallaName);
					this.setTextAncho(options.tamano.ancho, name);
					this.setTextAlto(options.tamano.alto, name);
					this.setTextCintura(options.tamano.cintura, name);

					this.accMostrarMedidas(name);

					//	getInfoTallas
					this.talla_setAsSelected(name, tallaName);
				}
				this.talla_onmouseover = function(name, tallaName) {
					var options = this.getInfoTallas(name, tallaName);
					this.setTextAncho(options.tamano.ancho, name);
					this.setTextAlto(options.tamano.alto, name);
					this.setTextCintura(options.tamano.cintura, name);

					this.accMostrarMedidas(name);
				}
				this.talla_onmouseout = function(name) {
					var options = this.getInfoTallasActuales(name);
					this.setTextAncho(options.tamano.ancho, name);
					this.setTextAlto(options.tamano.alto, name);
					this.setTextCintura(options.tamano.cintura, name);

					this.accOcultarMedidas(name);
				}

				this.nameTallaSeleccionada = [];

				//	Retorna la proporcion basada en 555
				this.anchoTablero = myOptions.ancho;
				this.gProp = function(valor) {
					return this.anchoTablero*valor/555;
				};

				this.activarTipoDeProducto = function(name) {

					this.accOcultarTiposDeProductosSalvo(name);

					this.g(name).t('tamanoAncho').setType('text').setText('20cm').setPosInXY(this.gProp(85),this.gProp(122)).setWidth(this.gProp(387)).setBackgroundColor('rgba(255,255,255,0.5)').setBorderWidth('1px').setBorderStyle('solid').setBorderColor('#000 #000 transparent').setTextAlign('center');
					this.g(name).t('tamanoAlto').setType('text').setText('20cm').setPosInXY(this.gProp(34),this.gProp(84)).setDimensions(this.gProp(60),this.gProp(568)).setBackgroundColor('rgba(255,255,255,0.5)').setBorderWidth('1px').setBorderStyle('solid').setBorderColor('#000 transparent #000 #000');
					this.g(name).t('tamanoCintura').setType('text').setText('20cm').setPosInXY(this.gProp(132),this.gProp(422)).setWidth(this.gProp(290)).setBackgroundColor('rgba(255,255,255,0.5)').setBorderWidth('1px').setBorderStyle('solid').setBorderColor('transparent #000 #000').setTextAlign('center');

					this._tipoProducto = this.arTiposDeProductoPorNombre[name];
					this.nameTallaSeleccionada[name] = [];

					//	Talla
					this.g(name).g('Talla').setBackgroundColor('#F57').setDimensions(this.gProp(65),this.gProp(65)).setPosInXY(15,15).setBoxShadow('4px 4px 6px rgba(0,0,0,.2)').setCursor('pointer');
					this.g(name).g('Talla').t('Texto Talla').setType('text').setPosInX(this.gProp(4)).setPosInY(this.gProp(5)).setText('Talla').setWidth('100%').setTextAlign('center').setFontFamily('Arial').setFontSize('12px').setColor('#fff');
					this.g(name).g('Talla').t('Talla').setType('text').setText('S').setPosInX(this.gProp(4)).setPosInY(this.gProp(22)).setWidth('100%').setTextAlign('center').setFontFamily('Arial').setFontSize('32px').setColor('#fff');

					if(this._tipoProducto.subTiposDeProducto.selectorMuestra) {
						document.querySelector(this._tipoProducto.subTiposDeProducto.selectorMuestra).innerHTML='';

						for (var i2 = 0; i2 < this._tipoProducto.subTiposDeProducto.muestras.length; i2++) {
							var muestra = this._tipoProducto.subTiposDeProducto.muestras[i2];
							var elemImgMuestra = document.createElement('img');
							elemImgMuestra.style.cursor='pointer';
							elemImgMuestra.src=muestra.urlMuestra;
							elemImgMuestra.alt=muestra.name;
							elemImgMuestra._tipoProducto=this._tipoProducto;
							elemImgMuestra.width=this._tipoProducto.subTiposDeProducto.anchoMuestras;
							document.querySelector(this._tipoProducto.subTiposDeProducto.selectorMuestra).appendChild(elemImgMuestra);
							elemImgMuestra._Board=this;
							elemImgMuestra._urlImagen=muestra.urlImagen;
							if(muestra.bnPorDefecto) {
								this.accCambiarCamiseta(elemImgMuestra._urlImagen, this._tipoProducto.name);
							}
							elemImgMuestra.onclick = function(evn) {
								this._Board.accCambiarCamiseta(this._urlImagen, this._tipoProducto.name);
							}
						}
					}

					if (this.arObjTallasPorName===undefined) {
						this.arObjTallasPorName = [];
					}
					if (this.arObjTallasPorName[name] === undefined)  {
						this.arObjTallasPorName[name] = [];
					}

					if(this._tipoProducto.tamanos.selectorMuestra) {
						document.querySelector(this._tipoProducto.tamanos.selectorMuestra).innerHTML='';


						this.accOcultarMedidas(this._tipoProducto.name);

						for (var i2 = 0; i2 < this._tipoProducto.tamanos.tamanos.length; i2++) {
							var tamano = this._tipoProducto.tamanos.tamanos[i2];
							var tamanoDiv = document.createElement('div');
							tamanoDiv.className = 'tamano';
							tamanoDiv.style.cursor='pointer';
							tamanoDiv.innerHTML = tamano.nombre;

							//	getInfoTallas
							this.arObjTallasPorName[name][tamano.nombre] = {
								tamano: {
									ancho: tamano.tamanoAncho,
									alto: tamano.tamanoAlto,
									cintura: tamano.tamanoCintura,
								}
							};

							tamanoDiv._tamanoAncho = tamano.tamanoAncho;
							tamanoDiv._tamanoAlto = tamano.tamanoAlto;
							tamanoDiv._tamanoCintura = tamano.tamanoCintura;
							tamanoDiv._nameTalla = tamano.nombre;
							tamanoDiv._Board = this;
							tamanoDiv._name = this._tipoProducto.name;
							document.querySelector(this._tipoProducto.tamanos.selectorMuestra).appendChild(tamanoDiv);

							this._tamanoAnchoDefault = tamano.tamanoAncho;
							this._tamanoAltoDefault = tamano.tamanoAlto;
							this._tamanoCinturaDefault = tamano.tamanoCintura;

							if(tamano.bnIsDefault) {
								this.talla_setAsSelected(name, tamano.nombre);
							}

							this.g(name).g('Talla').name=name;
							this.g(name).g('Talla').nameTalla=tamano.nombre;
							//this.g(name).g('Talla').setOnClick(function() {
							//	this._Board.talla_onclick(this.name, this.nameTalla);
							//});
							this.g(name).g('Talla').setOnMouseover(function() {
								this._Board.talla_onmouseover(this.name, this._Board.nameTallaSeleccionada[this.name]);
							});
							this.g(name).g('Talla').setOnMouseout(function() {
								console.log(this.name)
								this._Board.talla_onmouseout(this.name);
							});

							tamanoDiv.onclick = function(evn) {
								this._Board.talla_onclick(this._name, this._nameTalla);
							}
							tamanoDiv.onmouseover = function(evn) {
								this._Board.talla_onmouseover(this._name, this._nameTalla);
							}
							tamanoDiv.onmouseout = function(evn) {
								this._Board.talla_onmouseout(this._name);
							}
						}
					}
				}

				this.getInfoEstampado = function(tipoDeProductoName) {
					var ancho = this.g(tipoDeProductoName).t('Estampado').getWidth();
					var alto = this.g(tipoDeProductoName).t('Estampado').getHeight();
					var minPosInX = this.estampado.posInX;
					var minPosInY = this.estampado.posInY;
					var maxPosiblePosInX = (minPosInX + this.estampado.ancho) - ancho;
					var maxPosiblePosInY = (minPosInY + this.estampado.alto) - alto;
					var maxPosInX = minPosInX + this.estampado.ancho;
					var maxPosInY = minPosInY + this.estampado.alto;
					var anguloPorDefecto = ancho/alto;

					return {
						ancho: ancho,
						alto: alto,
						minPosInX: minPosInX,
						minPosInY: minPosInY,
						maxPosiblePosInX: maxPosiblePosInX,
						maxPosiblePosInY: maxPosiblePosInY,
						maxPosInX: maxPosInX,
						maxPosInY: maxPosInY,
						anguloPorDefecto: anguloPorDefecto,
					};
				}

				this.bnEsPrimerTipoProducto = true;
				for (var i = 0; i < myOptions.tipoDeProductos.tiposDeProductos.length; i++) {
					var tipoProducto = myOptions.tipoDeProductos.tiposDeProductos[i];
					this.arTiposDeProductoPorNombre[tipoProducto.name]=tipoProducto;

					if(!this.bnEsPrimerTipoProducto) {
						this.g(tipoProducto.name).setDisplay('none');
					}

					this.g(tipoProducto.name).t('CamisetaDeFondo').setBackgroundImage(myOptions.imagenDeFondo).setDimensions(myOptions.ancho, myOptions.alto).setBackgroundSize('contain').setBackgroundRepeat('no-repeat');
					this.g(tipoProducto.name).t('Estampado').name=tipoProducto.name;
					this.g(tipoProducto.name).t('Estampado').tipoProducto=tipoProducto;
					this.g(tipoProducto.name).t('Estampado')._bnEsPrimerTipoProducto=this.bnEsPrimerTipoProducto;
					this.g(tipoProducto.name).t('Estampado').setType('svg').setDimensions(this.estampado.ancho,this.estampado.alto).setPosInXY(this.estampado.posInX, this.estampado.posInY).loadForURL(myOptions.estampado, function(svg) {

						Estamapdo = this;

						this._Board.estampado.alto = this._element.offsetHeight;
						var estampado = this._Board.estampado;

						if(myOptions.en.move) {
							var propiedades = {
								ancho: 45,
								alto: 45,
								posInX: estampado.posInX+estampado.ancho-(45-1)/2,
								posInY: estampado.posInY+estampado.alto-(45-1)/2,
							};
							this._Board.g(this.name).t('BotonMover').setDimensions(propiedades.ancho,propiedades.alto).setPosInXY(propiedades.posInX, propiedades.posInY).setBackgroundImageInAlpha(myOptions.iconos).setBackgroundPosition('-90px -45px');
							this._Board.g(this.name).t('BotonMover--Sombra').name = this.name;
							this._Board.g(this.name).t('BotonMover--Sombra').setDimensions(propiedades.ancho,propiedades.alto).setPosInXY(propiedades.posInX, propiedades.posInY).setBackgroundColor('rgba(255,0,0,0.9)');
							this._Board.g(this.name).t('BotonMover--Sombra').enDragAndDrop({
								filterFunction: function(options) {
									//options.newPosInY = 10;

									return options;
								}, 
								completeFunction: function(options) {
									//options.newPosInY
									//options.newPosInY
									options.Thing.setPosInX();
									this._Board.accMove(20, 20, this.name);
								},
							});
							this._Board.g(this.name).t('BotonMover')._element.style.cursor='pointer';
						}
						if(myOptions.en.rotate) {
							var propiedades = {
								ancho: 45,
								alto: 45,
								posInX: estampado.posInX+estampado.ancho-(45-1)/2,
								posInY: estampado.posInY-(45-1)/2,
							};
							this._Board.g(this.name).t('BotonRotar').setDimensions(propiedades.ancho,propiedades.alto).setPosInXY(propiedades.posInX, propiedades.posInY).setBackgroundImageInAlpha(myOptions.iconos).setBackgroundPosition('-45px -45px');
							this._Board.g(this.name).t('BotonRotar--Sombra').name = this.name;
							this._Board.g(this.name).t('BotonRotar--Sombra').setDimensions(propiedades.ancho,propiedades.alto).setPosInXY(propiedades.posInX, propiedades.posInY).setBackgroundColor('rgba(255,0,0,0.9)');
							this._Board.g(this.name).t('BotonRotar--Sombra').enDragAndDrop({
								filterFunction: function(options) {
									//options.newPosInY = 10;

									return options;
								}, 
								completeFunction: function(options) {
									//options.newPosInY
									//options.newPosInY
									options.Thing.setPosInX();
									this._Board.accRotateD(1, this.name);
								},
							});
							this._Board.g(this.name).t('BotonRotar')._element.style.cursor='pointer';
						}
						if(myOptions.en.size) {
							var propiedades = {
								ancho: 45,
								alto: 45,
								posInX: estampado.posInX-(45-1)/2,
								posInY: estampado.posInY-(45-1)/2,
							};
							this._Board.g(this.name).t('BotonTamaño').setDimensions(propiedades.ancho,propiedades.alto).setPosInXY(propiedades.posInX, propiedades.posInY).setBackgroundImageInAlpha(myOptions.iconos).setBackgroundPosition('0 -45px');
							this._Board.g(this.name).t('BotonTamaño--Sombra').name = this.name;
							this._Board.g(this.name).t('BotonTamaño--Sombra').setDimensions(propiedades.ancho,propiedades.alto).setPosInXY(propiedades.posInX, propiedades.posInY).setBackgroundColor('rgba(255,0,0,0.9)');
							this._Board.g(this.name).t('BotonTamaño--Sombra').enDragAndDrop({
								filterFunction: function(options) {
									//options.newPosInY = 10;

									return options;
								}, 
								completeFunction: function(options) {
									//options.newPosInY
									//options.newPosInY
									this._Board.g(this.name).t('BotonTamaño').setPosInXY(options.newPosInX, options.newPosInY);
									this._Board.accScale(0.5, this.name);
								},
							});
							this._Board.g(this.name).t('BotonTamaño')._element.style.cursor='pointer';
						}

						if(myOptions.tipoDeProductos.selector) {
							var divTipoDeProducto = document.createElement('div');
							divTipoDeProducto.innerHTML=this.name;
							divTipoDeProducto._Board = this._Board;
							divTipoDeProducto._name = this.name;
							divTipoDeProducto._tipoProducto = this.tipoProducto;
							divTipoDeProducto.style.cursor='pointer';
							//	Cuando hace click en el tipo de producto el activa
							divTipoDeProducto.onclick = function() { this._Board.activarTipoDeProducto(this._name); }
							document.querySelector(myOptions.tipoDeProductos.selector).appendChild(divTipoDeProducto);
						}

						if(this._bnEsPrimerTipoProducto) {
							this._Board.activarTipoDeProducto(this.name);
						}
						
					});

					this.bnEsPrimerTipoProducto = false;
				}
			}
		}).createAnimation(function(){
				//	Colocamos la animación
			//	======================


		}).startAnimation();
	}
};