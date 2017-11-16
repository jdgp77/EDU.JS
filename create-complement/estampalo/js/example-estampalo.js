var estampalo = EstampaloJS.init({
	selector: '#lugar_camiseta',
	bnTipoPreview: false,
	camisetasDeFondo: {
		frontal: 'create-complement/estampalo/images/STM640-VM_Verde_Militar_417C_A1.jpg',
		trasera: 'create-complement/estampalo/images/STM640-VM_Verde_Militar_417C_B1.jpg',
	},
	estampado: 'create-complement/estampalo/images/NoviaCelosa.svg',
	ancho: 555,
	alto: 555,
	en: {
	  rotate: true,
	  size: true,
	  move: true,
	},
});


var estampalo = EstampaloJS.init({
	selector: '#lugar_default_est',
	bnTipoPreview: true,
	tipoDeProductos: [
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
	],
	estampado: 'create-complement/estampalo/images/NoviaCelosa.svg',
	ancho: 263,
	alto: 263
});

