var estampalo = EstampaloJS.init({
	selector: '#lugar_default_est',
	bnTipoPreview: true,
	imagenDeFondo: 'create-complement/estampalo/images/STM640-VM_Verde_Militar_417C_A1.jpg',
	tipoDeProductos: {
		tiposDeProductos: [
			{
				name: 'Camiseta Hombre',
				logo: 'create-complement/estampalo/images/IconosTipoProducto.png',
				logoPosition: '0 0',
				imagen: 'create-complement/estampalo/images/STM640-VM_Verde_Militar_417C_A1.jpg',
				bnIsDefault: true,
				subTiposDeProducto: {
					name: 'Camiseta Verde Militar',
					imagenes: [
						{
							nombre: 'Frontal',
							url: 'create-complement/estampalo/images/STM640-VM_Verde_Militar_417C_A1.jpg',
							estampado: {
								url: 'create-complement/estampalo/images/NoviaCelosa.svg',
							}
						},
						{
							nombre: 'Trasera',
							url: 'create-complement/estampalo/images/STM640-VM_Verde_Militar_417C_B1.jpg',
						},
					],
				}
			},
			{
				name: 'Camiseta Mujer',
				logo: 'create-complement/estampalo/images/IconosTipoProducto.png',
				logoPosition: '0 -45px',
				imagen: 'create-complement/estampalo/images/STM640-VM_Verde_Militar_417C_A1.jpg',
				bnIsDefault: true,
				subTiposDeProducto: {
					name: 'Camiseta Verde Militar',
					imagenes: [
						{
							nombre: 'Frontal',
							url: 'create-complement/estampalo/images/STM640-VM_Verde_Militar_417C_A1.jpg',
							estampado: {
								url: 'create-complement/estampalo/images/NoviaCelosa.svg',
							}
						},
						{
							nombre: 'Trasera',
							url: 'create-complement/estampalo/images/STM640-VM_Verde_Militar_417C_B1.jpg',
						},

					],
				}
			},
		]
	},
	estampado: 'create-complement/estampalo/images/NoviaCelosa.svg',
	ancho: 263,
	alto: 263,
	posDesdeLaIzq: 32,
	posDesdeLaDer: 32,
	posDesdeLaArr: 32,
	posDesdeLaAba: 10,
});

var estampalo = EstampaloJS.init({
	selector: '#lugar_camiseta',
	bnTipoPreview: false,
	estampado: 'create-complement/estampalo/images/NoviaCelosa.svg',
	imagenDeFondo: 'create-complement/estampalo/images/STM640-VM_Verde_Militar_417C_A1.jpg',
	tipoDeProductos: {
		selector: '#muestra-de-productos',
		tiposDeProductos: [
			{
				id: '1',
				name: 'Camiseta Hombre',
				logo: 'create-complement/estampalo/images/IconosTipoProducto.png',
				logoPosition: '0 0',
				imagen: 'create-complement/estampalo/images/STM640-VM_Verde_Militar_417C_A1.jpg',
				bnIsDefault: true,
				subTiposDeProducto: {
					selectorMuestra: '#muestra-productos-camiseta-hombre',
					anchoMuestras: 45,
					muestras: [
						{
							name: 'Camiseta Verde Militar',
							urlMuestra: 'create-complement/estampalo/images/MuestraRosa.png',
							urlImagen: 'create-complement/estampalo/images/STM640-VM_Rosa_417C_A1.jpg',
							bnPorDefecto: true,
						},
						{
							name: 'Camiseta Verde Militar',
							urlMuestra: 'create-complement/estampalo/images/MuestraVerde.png',
							urlImagen: 'create-complement/estampalo/images/STM640-VM_Verde_Militar_417C_A1.jpg',
						},
					]
				},
				tamanos: {
					selectorMuestra: '#muestra-productos-camiseta-medidas',
					tamanos: [
						{
							nombre: 'S',
							tamanoAncho: '20cm',
							tamanoAlto: '21cm',
							tamanoCintura: '22cm',
							bnIsDefault: true,
						},
						{
							nombre: 'M',
							tamanoAncho: '30cm',
							tamanoAlto: '31cm',
							tamanoCintura: '32cm',
						},
						{
							nombre: 'L',
							tamanoAncho: '40cm',
							tamanoAlto: '41cm',
							tamanoCintura: '42cm',
						},
						{
							nombre: 'XL',
							tamanoAncho: '50cm',
							tamanoAlto: '51cm',
							tamanoCintura: '52cm',
						},
					],
				}
			},
			{
				id: '2',
				name: 'Camiseta Mujer',
				logo: 'create-complement/estampalo/images/IconosTipoProducto.png',
				logoPosition: '0 0',
				imagen: 'create-complement/estampalo/images/STM640-VM_Verde_Militar_417C_A1.jpg',
				bnIsDefault: true,
				subTiposDeProducto: {
					selectorMuestra: '#muestra-productos-camiseta-hombre',
					anchoMuestras: 45,
					muestras: [
						{
							name: 'Camiseta Verde Militar',
							urlMuestra: 'create-complement/estampalo/images/MuestraRosa.png',
							urlImagen: 'create-complement/estampalo/images/STM640L-AZ_Azalea_224C_A1.jpg',
							bnPorDefecto: true,
						},
						{
							name: 'Camiseta Verde Militar',
							urlMuestra: 'create-complement/estampalo/images/MuestraVerde.png',
							urlImagen: 'create-complement/estampalo/images/STM640L-NG_Negro_426C_A1.jpg',
						},
						{
							name: 'Camiseta Verde Militar',
							urlMuestra: 'create-complement/estampalo/images/MuestraRosa.png',
							urlImagen: 'create-complement/estampalo/images/STM640L-AZ_Azalea_224C_A1.jpg',
							bnPorDefecto: true,
						},
						{
							name: 'Camiseta Verde Militar',
							urlMuestra: 'create-complement/estampalo/images/MuestraVerde.png',
							urlImagen: 'create-complement/estampalo/images/STM640L-NG_Negro_426C_A1.jpg',
						},
						{
							name: 'Camiseta Verde Militar',
							urlMuestra: 'create-complement/estampalo/images/MuestraRosa.png',
							urlImagen: 'create-complement/estampalo/images/STM640L-AZ_Azalea_224C_A1.jpg',
							bnPorDefecto: true,
						},
						{
							name: 'Camiseta Verde Militar',
							urlMuestra: 'create-complement/estampalo/images/MuestraVerde.png',
							urlImagen: 'create-complement/estampalo/images/STM640L-NG_Negro_426C_A1.jpg',
						},
						{
							name: 'Camiseta Verde Militar',
							urlMuestra: 'create-complement/estampalo/images/MuestraRosa.png',
							urlImagen: 'create-complement/estampalo/images/STM640L-AZ_Azalea_224C_A1.jpg',
							bnPorDefecto: true,
						},
						{
							name: 'Camiseta Verde Militar',
							urlMuestra: 'create-complement/estampalo/images/MuestraVerde.png',
							urlImagen: 'create-complement/estampalo/images/STM640L-NG_Negro_426C_A1.jpg',
						},
						{
							name: 'Camiseta Verde Militar',
							urlMuestra: 'create-complement/estampalo/images/MuestraRosa.png',
							urlImagen: 'create-complement/estampalo/images/STM640L-AZ_Azalea_224C_A1.jpg',
							bnPorDefecto: true,
						},
						{
							name: 'Camiseta Verde Militar',
							urlMuestra: 'create-complement/estampalo/images/MuestraVerde.png',
							urlImagen: 'create-complement/estampalo/images/STM640L-NG_Negro_426C_A1.jpg',
						},
						{
							name: 'Camiseta Verde Militar',
							urlMuestra: 'create-complement/estampalo/images/MuestraRosa.png',
							urlImagen: 'create-complement/estampalo/images/STM640L-AZ_Azalea_224C_A1.jpg',
							bnPorDefecto: true,
						},
						{
							name: 'Camiseta Verde Militar',
							urlMuestra: 'create-complement/estampalo/images/MuestraVerde.png',
							urlImagen: 'create-complement/estampalo/images/STM640L-NG_Negro_426C_A1.jpg',
						},
						{
							name: 'Camiseta Verde Militar',
							urlMuestra: 'create-complement/estampalo/images/MuestraRosa.png',
							urlImagen: 'create-complement/estampalo/images/STM640L-AZ_Azalea_224C_A1.jpg',
							bnPorDefecto: true,
						},
						{
							name: 'Camiseta Verde Militar',
							urlMuestra: 'create-complement/estampalo/images/MuestraVerde.png',
							urlImagen: 'create-complement/estampalo/images/STM640L-NG_Negro_426C_A1.jpg',
						},
					]
				},
				tamanos: {
					selectorMuestra: '#muestra-productos-camiseta-medidas',
					tamanos: [
						{
							nombre: 'S',
							tamanoAncho: '20cm',
							tamanoAlto: '21cm',
							tamanoCintura: '22cm',
							bnIsDefault: true,
						},
						{
							nombre: 'M',
							tamanoAncho: '30cm',
							tamanoAlto: '31cm',
							tamanoCintura: '32cm',
						},
						{
							nombre: 'L',
							tamanoAncho: '40cm',
							tamanoAlto: '41cm',
							tamanoCintura: '42cm',
						},
						{
							nombre: 'XL',
							tamanoAncho: '50cm',
							tamanoAlto: '51cm',
							tamanoCintura: '52cm',
						},
					],
				},
			},
		]
	},
	ancho: 555,
	alto: 'auto',
	posDesdeLaIzq: 32,
	posDesdeLaDer: 32,
	posDesdeLaArr: 32,
	posDesdeLaAba: 10,
	en: {
	  rotate: true,
	  size: true,
	  move: true,
	},
});
