/*
<div class="eduintgd-chat">
	<div className="header">
		<div className="title"></div>
		<div className="options"></div>
	</div>
	<div className="messages">
		<div className="chats"></div>
		<div className="write"></div>
	</div>
</div>
*/

EduInt.Thing.setCustom('tipo-contenido',function(informacion){
	this.g('bloques').setCustom(function(){
		this.setPostionRightBottom(0,20+45*(this.Board.numBloques));	

		this.g('open').setDimentions(45,45).setPostionRightBottom(40*3,0).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBoxshadow('#676F67 2.5px 2.5px 5px');
		this.g('open').setCustom(function(){

			this.t('letrero').setDimentions(41,41).setPostionRightBottom(2,2).setBackgroundImageInAlpha('create-complement/talk-tools/images/LogoOpenClose.png');
		});
		this.t('base-info').setDimentions(45,1).setPostionRightBottom(40*3 + 45,50).setId(informacion.text+'-'+'base-info').setOverflow('hidden').setVisibility('hidden').setBackgroundColor('transparent');

		for(var countCuadradosExtra=0;countCuadradosExtra<informacion.cuadrados.length;countCuadradosExtra++)
		{
			var cuadrado = informacion.cuadrados[countCuadradosExtra];

			this.t(cuadrado.nombre).setDimentions(40,40).setPostionRightBottom(40*(2-countCuadradosExtra),2).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBoxshadow('#676F67 2px 2px 5px');
			switch(cuadrado.color)
			{
				case 'verde':
					this.t(cuadrado.nombre).setBackgroundPosition('0 -45px');
					break;
				case 'amarillo':
					this.t(cuadrado.nombre).setBackgroundPosition('0 -85px');
					break;
				case 'rojo':
					this.t(cuadrado.nombre).setBackgroundPosition('0 -125px');
					break;
			}
		}

		this.t('open').setOnClick(function(){
			if(this.Board.bnLogin || true) //	Quitar el true para poder pedir el login
			{
				this.parentThing.bnAgrandar=!this.parentThing.bnAgrandar;
				this.parentThing.bnEnAgrandarOpen=true;
				if(this.parentThing.bnAgrandar)
				{
					this.t('letrero').setBackgroundPosition('0px -41px');
				}
				else
				{
					this.t('letrero').setBackgroundPosition('0px 0px');
				}
			}
			else
			{
				// Sign in Firebase using popup auth and Google as the identity provider.
				var provider = new firebase.auth.GoogleAuthProvider();
				GDPlataform.auth.signInWithPopup(provider);

				// Initiates Firebase auth and listen to auth state changes.
				GDPlataform.auth.onAuthStateChanged(GDPlataform.onAuthStateChanged.bind(this.Board.MyChat));
			}
		});
		
		this.anchoMinimo=45;
		this.ancho=this.anchoMinimo;
		this.anchoMaximo=900;
		this.bnBotonContraido=false;
		this.numDeMovimientosParaAgrandar=5;
		this.numDeMovimientos=0;
		this.accCreateAnimateFunctionInShadow(function(info){
			if(this.bnEnAgrandarOpen)
			{
				if(this.bnAgrandar)
				{
					this.numDeMovimientos++;
					if(this.numDeMovimientos==this.numDeMovimientosParaAgrandar)
					{
						this.bnEnAgrandarOpen=false;
						this.bnBotonContraido=false;
						this.t('base-info').setOverflow('visible');
						this.t('base-info').setVisibility('visible');
						this.t('text').setColor('#FFF');
					}
				}
				else
				{
					this.numDeMovimientos--;

					if(this.numDeMovimientos==0)
					{
						this.bnEnAgrandarOpen=false;
						this.bnBotonContraido=true;
						this.t('base-info').setOverflow('hidden');
						this.t('base-info').setVisibility('hidden');
						this.t('text').setColor('#CCC');
					}
				}
				
				//	Porcentaje de movimiento va de 0 a 1, dependiendo de que tan grade debe estar
				this.porcentajeDeMovimiento = (this.numDeMovimientos / this.numDeMovimientosParaAgrandar);

				this.anchoMaximoOpen = EduInt._Responsive.getResolution() - (40 * 3 + 45 + 5 + 20);
				this.anchoOpen = (this.anchoMaximoOpen * this.porcentajeDeMovimiento) + 45;

				this.anchoMaximoBaseInfo = EduInt._Responsive.getResolution() - (40 * 3 + 5 + 20);
				this.anchoBaseInfo = (this.anchoMaximoBaseInfo * this.porcentajeDeMovimiento);

				this.posInXMaximoText = EduInt._Responsive.getResolution() - this.t('text').getWidth() - (40 * 3 + 45 + 5 + 20 + 40);
				this.posInXText = (this.posInXMaximoText * this.porcentajeDeMovimiento) + (40 * 3 + 45 + 5 + 20);


				this.t('open').setDimentions(this.anchoOpen,45);
				this.t('base-info').setDimentions(this.anchoBaseInfo-50,1);
				this.t('text').setPostionRightBottom(this.posInXText,10);
			}
		});

		this.t('text').setType('text').setText(informacion.text).setPostionRightBottom(40*3+45+5,10).setFontSize(20).setColor('#CCC').setFontFamily('Arial').setLetterSpacing(3.5);
		this.Board.numBloques++;
		//	this.t('privadas').setDimentions(40,40).setPostionRightBottom(40*2,2).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBackgroundPosition('0 -45px').setBoxshadow('#676F67 2px 2px 5px');
		//	this.t('publicas').setDimentions(40,40).setPostionRightBottom(40*1,2).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBackgroundPosition('0 -85px').setBoxshadow('#676F67 2px 2px 5px');

		//	this.t('borrame' ).setDimentions(40,40).setPostionRightBottom(40*0,2).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBackgroundPosition('0 -125px').setBoxshadow('#676F67 2px 2px 5px');
	});
});
EduInt.Thing.setCustom('ayudante',function(){
	this.setPostionRightBottom(0,0);
	
	/*
	this.g('notas').getCustom('tipo-contenido',{
			text: 'NOTAS',
			cuadrados: [{
				nombre: 'privadas',
				color: 'verde'
			},{
				nombre: 'publicas',
				color: 'amarillo'
			}]
		});
	*/

	this.g('chat').getCustom('tipo-contenido',{
			text: 'CHAT',
			cuadrados: [{
				nombre: 'privado',
				color: 'verde'
			},{
				nombre: 'publico',
				color: 'amarillo'
			}]
		}).setCustom(function(){
			this.getChatId = function(code)
			{
				return 'chat-'+code;
			}
			this.accAnadirChat = function(user){
				var chat = _EduIntBasic.crearElementos({
					element: 'div',
					id: this.getChatId(user.id),
					style: {
						position: 'absolute',
						bottom: 0,
						width: '283px',
					},
					children: [
						{
							element: 'div',
							className: 'chat-main',
							style: {
								backgroundColor: '#eae4e4',
								paddingBottom: '2px',
								marginBottom: '4px',
							},
							children: [
								{
									element: 'div',
									className: 'chat-main-message',
									style: {
    									height: '244px'
									},
								},
								{
									element: 'div',
									className: 'chat-main-messagesend',
									style: {
										backgroundColor: '#fafafa',
    									height: '56px',
    									boxSizing: 'border-box',
    									width: '279px',
    									margin: '0 0 0 2px'
									},
									children: [
										{
											element: 'div',
											className: 'chat-main-messagesend-text',
											children: [
												{
													element: 'textarea',
													className: 'chat-main-messagesend-text-input',
													style: {
														backgroundColor: 'transparent',
														float: 'left',
													    height: '50px',
													    width: '218px',
													    border: '0',
													}
												}
											]
										},
										{
											element: 'div',
											className: 'chat-main-messagesend-btnsend',
											children: [
												{
													element: 'button',
													className: 'chat-main-messagesend-btnsend-button',
													style: {
														border: '0',
														backgroundImage: 'url(create-complement/talk-tools/images/ButtonSend.png)',
														width: '36px',
														height: '35px',
														float: 'right',
														marginTop: '11px',
														marginRight: '10px',

													}
												}
											]
										},
									],
								},
							],
						},{
							element: 'div',
							className: 'chat-footer',
							style: {
								backgroundImage: 'url(create-complement/talk-tools/images/Fondos-Sprite.png)',
								height: '40px',
							},
							children: [
								{
									element: 'div',
									className: 'chat-footer-photo',
									style: {
										backgroundColor: '#FFF',
										float: 'left',
										margin: '2px',
										padding: '2px',
									},
									html: '<img style="margin: 1px 0 0 1px; vertical-align: top;" width="32" height="32" src="'+user.image+'" alt="" />'
								},
								{
									element: 'div',
									className: 'chat-footer-name',
									style: {
										color: '#fff',
										width: '142px',
										float: 'left',
										fontFamily: 'Arial',
										fontSize: '13px',
										margin: '4px',
									},
									html: user.name
								},
								{
									element: 'div',
									className: 'chat-footer-options',
									style: {
										width: '78px',
										float: 'right',
										padding: '2px 0 0 5px',
										color: '#00ad98',
									    fontWeight: 'bold',
									    fontFamily: 'Arial',
									    fontSize: '27px'
									},
									children: [
										{
											element: 'div',
											className: 'chat-footer-options-min',
											style: {
												backgroundColor: 'rgba(255,255,255,0.32)',
												textAlign: 'center',
												width: '36px',
												height: '36px',
												float: 'left',
												marginRight: '2px',
												display: 'none',
											},
											html: '_'
										},
										{
											element: 'div',
											className: 'chat-footer-options-close',
											style: {
												backgroundColor: 'rgba(255,255,255,0.32)',
												textAlign: 'center',
												width: '36px',
												height: '36px',
												float: 'left',
												display: 'none',
											},
											html: 'x'
										},
									],
								},
							],
						},
					],
				});
				this.g('bloques').t('base-info')._element.appendChild(chat);
			};
			this.accAddMessage = function(user,message,codeChat)
			{
				var message = _EduIntBasic.crearElementos({
					element: 'div',
					className: 'message-'+user.id,
					children: [
						{
							element: 'div',
							className: 'message-arrow',
							children: [
								{
									element: 'div',
									className: 'message-arrow-arrow',
									style: {
										borderColor: 'transparent #FFF transparent transparent',
										borderWidth: '7px 18px 7px 0',
										borderStyle: 'solid',
									},
								},
							],
						},
						{
							element: 'div',
							className: 'message-text',
							children: [
								{
									element: 'div',
									className: 'message-text-name',
									html: user.name,
								},
								{
									element: 'div',
									className: 'message-text-message',
									html: message,
								},
							],
						},
					],
				});

				document.querySelector('#'+this.getChatId(codeChat)+' .chat-main-message').appendChild(message);
			};
		});

		this.Chat = {
			Board: this,
			addUsers: function(arUsers)
			{
				//	Chat User/Group
				var chatUG = this.Board.g('chat').accAnadirChat(arUsers);
				return chatUG;
			},
			UG: function(code)
			{
				this.code = code;
				this.addMessage = function(message,user)
				{

				};
			},
		};

		this.arChats = [];
		this.arChatsByCode = [];
		this.accAnadirChat = function(jsonInfo)
		{
			var chat = this.g('chat').accAnadirChat(jsonInfo);
			this.arChats[this.arChats.length]=chat;
			this.arChatsByCode[jsonInfo.id]=chat;
			return chat;
		};
		this.accAddMessage = function(user,message,chatCode)
		{
			var chat = this.g('chat').accAddMessage(user,message,chatCode);
		};

		var chatJDGP = this.accAnadirChat({
			id: 'SreSUtq235awsrrEw',
			name: 'Julian David Guerrero Pinilla',
			image: 'pana.png',
		});

		this.accAddMessage({
			id: 'SreSUtq235awsrrEw',
			name: 'Julian David Guerrero Pinilla',
			image: 'pana.png',
		},'Hola hermano','SreSUtq235awsrrEw');

		

	
	this.g('retos').getCustom('tipo-contenido',{
			text: 'RETOS',
			cuadrados: [{
				nombre: 'normales',
				color: 'verde'
			},{
				nombre: 'importantes',
				color: 'amarillo'
			},{
				nombre: 'urgentes',
				color: 'rojo'
			}]
		});

	/*

	this.g('chat').setCustom(function(){
		this.setPostionRightBottom(20,20+45*1);
		this.setOnClick(function(){
			this.bnAgrandar=!this.bnAgrandar;
			this.bnEnAgrandarOpen=true;
		});
		this.anchoMinimo=45;
		this.ancho=this.anchoMinimo;
		this.anchoMaximo=900;
		this.velocidadAncho=this.anchoMaximo/4;
		this.bnBotonContraido=false;
		this.accCreateAnimateFunctionInShadow(function(info){
			if(this.bnEnAgrandarOpen)
			{
				if(this.bnAgrandar)
				{
					this.ancho+=this.velocidadAncho;
					if(this.anchoMaximo<this.ancho)
					{
						this.ancho=this.anchoMaximo;
						this.bnEnAgrandarOpen=false;
						this.bnBotonContraido=false;
					}
				}
				else
				{
					this.ancho-=this.velocidadAncho;
					if(this.ancho<this.anchoMinimo)
					{
						this.ancho=this.anchoMinimo;
						this.bnEnAgrandarOpen=false;
						this.bnBotonContraido=true;
					}
				}
				this.t('open').setDimentions(this.ancho,45);
			}
		});

		this.t('text').setType('text').setText('CHAT').setPostionRightBottom(40*3+45+5,10).setFontSize(20).setColor('#CCC').setFontFamily('Arial').setLetterSpacing(3.5);;
		this.t('open').setDimentions(45,45).setPostionRightBottom(40*3,0).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBoxshadow('#676F67 2.5px 2.5px 5px');
			this.t('todos').setDimentions(40,40).setPostionRightBottom(40*2,2).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBackgroundPosition('0 -45px').setBoxshadow('#676F67 2px 2px 5px');
			//	this.t('publicas').setDimentions(40,40).setPostionRightBottom(40*1,2).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBackgroundPosition('0 -85px').setBoxshadow('#676F67 2px 2px 5px');
			//	this.t('borrame' ).setDimentions(40,40).setPostionRightBottom(40*0,2).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBackgroundPosition('0 -125px').setBoxshadow('#676F67 2px 2px 5px');
	});

	this.g('retos').setCustom(function(){
		this.setPostionRightBottom(20,20+45*0);

		this.t('text').setType('text').setText('RETOS').setPostionRightBottom(40*3+45+5,10).setFontSize(20).setColor('#CCC').setFontFamily('Arial').setLetterSpacing(3.5);;
		this.t('open').setDimentions(45,45).setPostionRightBottom(40*3,0).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBoxshadow('#676F67 2.5px 2.5px 5px');
			this.t('normales').setDimentions(40,40).setPostionRightBottom(40*2,2).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBackgroundPosition('0 -45px').setBoxshadow('#676F67 2px 2px 5px');
			this.t('importantes').setDimentions(40,40).setPostionRightBottom(40*1,2).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBackgroundPosition('0 -85px').setBoxshadow('#676F67 2px 2px 5px');
			this.t('urgentes' ).setDimentions(40,40).setPostionRightBottom(40*0,2).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBackgroundPosition('0 -125px').setBoxshadow('#676F67 2px 2px 5px');
	});
	*/

	console.info('casa');
});

var GDPlataform = {
	create: function(code)
	{
		var myChat_ = new GDPlataform.MyChat(code);
		GDPlataform.arMyChats[GDPlataform.arMyChats.length] = myChat_;
		GDPlataform.arMyChatsByName[name] = myChat_;
		return myChat_;
	},
	myUser: {},	
	//	Esta funcione es llamada tomando como padre el MyChat del cual es llamado
	onAuthStateChanged: function(user){
		if(user)
		{
			// User is signed in.
			GDPlataform.myUser.name = user.displayName;
			GDPlataform.myUser.email = user.email;
			GDPlataform.myUser.photoUrl = user.photoURL;

			this.accInformarQueEstaLogeuado();
			/*
			GDPlataform.socket = io.connect('http://localhost:3000');
			GDPlataform.socket.on('connect', function (socket) {
				GDPlataform.socket.emit('user',user);
			});
			*/
		}
		else
		{
			// No user is signed in.

		}
	},
	bnInitOneTime: true,
	initOneTime: function()
	{
		if(GDPlataform.bnInitOneTime)
		{
			//	Inicia las funcions de responsive
			EduInt._Responsive.init();
			
			//	Iniciamos los datos de firebase
			GDPlataform.auth = firebase.auth();
			//	this.database = firebase.database();
			//	this.storage = firebase.storage();
			//	Hace que nunca vuelva a ser ejecutada esta funcion
			GDPlataform.bnInitOneTime=false;
		}
	},
	arMyChats: [],
	arMyChatsByName: [],
	MyChat: function(code){
		//	Guardamos el nombre del chat creado
		this.code = code;
		//	(MyChat)
		this.init = function(){
			//	Realiza el inicio una sola vez
			GDPlataform.initOneTime();
			//	Crea el tablero que maneja toda la interfaz
			this.board = EduInt.createBoardInBody('ayudante-'+this.code);
			//	Iniciamos variables
			this.board.numBloques=0;
			this.board.bnLogin=false;
			this.board.code=this.code;
			this.board.MyChat=this;
			//	Primero crea el contenedor global de todos las ventanas
			this.board.g('dashboard-init').getCustom('ayudante');
			//	Genera la animación
			this.board.createAnimation(function(infoAnimation){

			}).startAnimation();
		};
		//	(MyChat)
		this.accInformarQueEstaLogeuado=function(user)
		{
			this.board.bnLogin=true;
		}
		//	(MyChat)
		this.init();
	},
}




var WorkToqueder_GD = {
	init: function(){
		//	Crea el tablero que maneja toda la interfaz
		this.board = EduInt.createBoardInBody('ayudante');
		//	Iniciamos variables
		this.board.numBloques=0;
		this.board.bnLogin=false;
		//	Primero crea el contenedor global de todos las ventanas
		WorkToqueder_GD.GlobalContainer.create();
		//	Luego crea el unico elemento visible inicialmente
		//	La ventana de inicio
	//	WorkToqueder_GD.InitWindow.create();
		// Shortcuts to Firebase SDK features.
	//	this.auth = firebase.auth();
		//	Inicia la animación
		this.board.createAnimation(function(infoAnimation){

		}).startAnimation();
	},
	myUser: {

	},
	//	Contenedor Global y sus metodos()
	GlobalContainer: {
		create: function(){
			WorkToqueder_GD.board.g('dashboard-init').getCustom('ayudante');
			/*
			this.body = document.getElementsByTagName("BODY")[0];
			this.containerGlobal =_EduIntBasic.crearElementos({
				element: 'section',
				className: 'footer_tooles-chat',
				style: {
					position: 'fixed',
					left: '0px',
					bottom: '0px',
					width: '100%',
					height: '1px',
					textAlign: 'right'
				}
			});
			this.body.appendChild(this.containerGlobal);
			*/
		},
		addElement: function(element){
			this.containerGlobal.appendChild(element);
		},
	},
	//	Ventana de inicio, login chat
	InitWindow: {
		_defaultJson: {

		},
		create: function(){
			this.createContainer();
		},
		createContainer: function(){
			
			this.container = _EduIntBasic.crearElementos({
				element: 'div',
				className: 'EduIntGD-Block Init-WorkToguether header',
				style: {
					position: 'absolute',
					bottom: 0
				},
				children: [
					{
						element: 'div',
						className: 'login',
						html: 'Login',
						onclick: function(){
							// Sign in Firebase using popup auth and Google as the identity provider.
							var provider = new firebase.auth.GoogleAuthProvider();
							WorkToqueder_GD.auth.signInWithPopup(provider);

							WorkToqueder_GD.auth.onAuthStateChanged(function(user) {
								if (user)
								{
									// User is signed in.
									WorkToqueder_GD.myUser.name = user.displayName;
									WorkToqueder_GD.myUser.email = user.email;
									WorkToqueder_GD.myUser.photoUrl = user.photoURL;
									WorkToqueder_GD.socket = io.connect('http://localhost:3000');
									WorkToqueder_GD.socket.on('connect', function (socket) {
										console.log('conectado');
										WorkToqueder_GD.socket.emit('user',user);
									});
								}
								else
								{
									// No user is signed in.

								}
							});
						},
					},
					{
						element: 'div',
						className: 'title-chat',
						html: 'CHAT',
					},
					{
						element: 'div',
						className: 'eduintgd-logo',
						html: '<img src="" alt="Logo Educación Interactiva" />',
					},

				],
			});
			WorkToqueder_GD.GlobalContainer.addElement(this.container);
		}
	},
	//	Ventana de lista de contactos
	ContactWindow: {
		_defaultJson: {

		},
		create: function(jsonInfo){
			this.jsonInfo = _EduIntBasic._defaultJson(jsonInfo,this._defaultJson);
			this.elementBase = document.getElementById(this.jsonInfo.id);
			this.elementBase.appendChild(this.createContainer());
		},
		createContainer: function(){
			this.container = _EduIntBasic.crearElementos({
				element: 'div',
				className: 'EduIntGD-Block Contact-WorkToguether header',
				children: [
					{
						element: 'div',
						className: 'header',
						children: [
							{
								element: 'div',
								className: 'GD-Logo',
							},
							{
								element: 'div',
								className: 'title',
								html: 'Lista de Contactos',
							},
						],
					},
					{
						element: 'div',
						className: 'main contacts',
						children: [
							{
								element: 'div',
								className: 'zona-busqueda',
								children: [
									{
										element: 'div',
										className: 'area-input-busqueda',
										children: [
											{
												element: 'input',
												className: 'search search-contact',
												placeholder: 'Buscar contacto'
											}
										]
									},
								],
							},
							{
								element: 'div',
								className: 'zona-contactos',
								name: 'area-contactos',
							},
						],
					}
				],
			}, this);
		}
	},
	//	Ventana de chat
	ChatWindow: {
		//	jsonInfo = {
		//		members: [
		//			'jdgp77@gmail.com',
		//			'gerencia@gmail.com'
		//		],
		//		
		//		
		//		
		//		
		//	}
		_defaultJson: {

		},
		create: function(jsonInfo){
			this.jsonInfo = _EduIntBasic._defaultJson(jsonInfo,this._defaultJson);
			this.elementBase = document.getElementById(this.jsonInfo.id);
			this.elementBase.appendChild(this.createContainer());
		},
		createContainer: function(){
			this.container = _EduIntBasic.crearElementos({
				element: 'div',
				className: 'EduIntGD-Block Init-WorkToguether header',
				children: [
					{
						element: 'div',
						className: 'login',
						html: 'Login',
					},
					{
						element: 'div',
						className: 'title-chat',
						html: 'CHAT',
					},
					{
						element: 'div',
						className: 'eduintgd-logo',
						html: '<img src="" alt="Logo Educación Interactiva" />',
					},

				],
			});
		}
	},
	//	Toda la información de los contactos
	Contactos: {
		//	Retorna o crea el usuario, con el nombre señalado
		u: function(name){
			if(this.arUsers[name]!==undefined)
			{
				return this.arUsers[name];
			}
			else
			{
				this.arUsers[name] = new this.Usuario(name)
				return this.arUsers[name];
			}
		},
		//	Lista de usuarios creados
		arUsers: [],
		//	Clase usuarios, para tener información
		Usuario: function(name){
			//	Guarda el nombre
			this.name;
			//	Retorna el estado:
			//	- Activo
			//	- Ocupado
			//	- Inactivo
			this.getEstado = function(){

			};
		}
	}
}

function WorkToquetherEIGD()
{
	
}

WorkToquetherEIGD.prototype.initFirebase = function() {
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  // Initiates Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

WorkToquetherEIGD.prototype.signIn = function() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
};

WorkToquetherEIGD.prototype.signOut = function() {
  // Sign out of Firebase.
  this.auth.signOut();
};

WorkToquetherEIGD.prototype.onAuthStateChanged = function(user)
{
  if(user) // User is signed in!
  {
    // Get profile pic and user's name from the Firebase user object
    var profilePicUrl = user.photoURL; // Only change these two lines!
    var userName = user.displayName;   // Only change these two lines!

	/*
    // Set the user's profile pic and name.
    this.userPic.style.backgroundImage = 'url(' + profilePicUrl + ')';
    this.userName.textContent = userName;

    // Show user's profile and sign-out button.
    this.userName.removeAttribute('hidden');
    this.userPic.removeAttribute('hidden');
    this.signOutButton.removeAttribute('hidden');

    // Hide sign-in button.
    this.signInButton.setAttribute('hidden', 'true');
    */

    // We load currently existing chant messages.
    this.loadMessages();
  }
  else // User is signed out!
  {
  	/*
    // Hide user's profile and sign-out button.
    this.userName.setAttribute('hidden', 'true');
    this.userPic.setAttribute('hidden', 'true');
    this.signOutButton.setAttribute('hidden', 'true');

    // Show sign-in button.
    this.signInButton.removeAttribute('hidden');
    */
  }
};

// Returns true if user is signed-in. Otherwise false and displays a message.
WorkToquetherEIGD.prototype.checkSignedInWithMessage = function() {
  // Return true if the user is signed in Firebase
  if (this.auth.currentUser) {
    return true;
  }
  /*
  // Display a message to the user using a Toast.
  var data = {
    message: 'You must sign-in first',
    timeout: 2000
  };
  this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
  */
  return false;
};

window.workToquetherEIGD = new WorkToquetherEIGD();

var EduIntGD_WorkTogether = {
	_arBlockListOfUsers: [],
	initWorkToguether: function(){
		this.auth = firebase.auth();
		this.database = firebase.database();
		this.storage = firebase.storage();
	},
	signIn: function() {
	  // Sign in Firebase using popup auth and Google as the identity provider.
	  var provider = new firebase.auth.GoogleAuthProvider();
	  this.auth.signInWithPopup(provider);
	},
	signOut: function() {
	  // Sign out of Firebase.
	  this.auth.signOut();
	},
	createListOfUsers: function(infoJsonListOfUsers)
	{
		this.createFooterTooles();
		var newListOfUsers = new this.ListOfUsers(infoJsonListOfUsers);
		return this._arBlockListOfUsers[this._arBlockListOfUsers.length] = newListOfUsers;
	},
	_arChats: [],
	create: function(machineName, infoJSON)
	{
		if(this._arChats[machineName]===undefined)
		{
			this.createFooterTooles();
			var newChat = new this.Chat(machineName, infoJSON);
			return this._arChats[machineName] = newChat;
		}
		else
		{
			return this._arChats[machineName];
		}
	},
	createFooterTooles: function()
	{
		if(this.footer_tooles===undefined)
		{
			this.body = document.getElementsByTagName("BODY")[0];
				this.footer_tooles = document.createElement('section');
				this.footer_tooles.className = 'footer_tooles-chat';
				this.footer_tooles.style.position = 'fixed';
				this.footer_tooles.style.left = '0px';
				this.footer_tooles.style.bottom = '0px';
				this.footer_tooles.style.width = '100%';
				this.footer_tooles.style.height = '1px';
				this.footer_tooles.style.textAlign = 'right';
				this.body.appendChild(this.footer_tooles);
		}
	},
	ListOfUsers: function(infoJsonListOfUsers)
	{
		this.infoJsonListOfUsers=infoJsonListOfUsers;

		this.container = document.createElement('div');
		this.container.style.display = 'inline-block';
		this.container.style.height = '300px';
		this.container.style.marginTop = '-300px';
		this.container.className='eduintgd-listofusers';
			this.header = document.createElement('header');
			this.header.className='header';
			this.container.appendChild(this.header);
				this.title = document.createElement('div');
				this.title.className='title';
				this.title.innerHTML=infoJsonListOfUsers.title;
				this.header.appendChild(this.title);
				this.options = document.createElement('div');
				this.options.className='options';
				this.header.appendChild(this.options);
					this.close = document.createElement('div');
					this.close.className='close';
					this.close.innerHTML='X';
					this.options.appendChild(this.close);
					this.minimize = document.createElement('div');
					this.minimize.className='minimize';
					this.minimize.innerHTML='_';
					this.options.appendChild(this.minimize);
					this.moreoptions = document.createElement('div');
					this.moreoptions.className='moreoptions';
					this.moreoptions.innerHTML='+';
					this.options.appendChild(this.moreoptions);

			this.content = document.createElement('div');
			this.content.className='content';
			this.container.appendChild(this.content);
				this.messages = document.createElement('div');
				this.messages.className='messages';
				this.messages.style.overflow='auto';
				this.content.appendChild(this.messages);

		EduIntGD_WorkTogether.footer_tooles.appendChild(this.container);

		this.arUsers=[];
		this.accAddUsers = function(user)
		{
			var message = document.createElement('div');
			message.className = 'message';
			message.user = user;
			message.onclick=function(){
				EduIntGD_WorkTogether.create(this.user.uid,this.user);
			};
			this.arUsers[this.arUsers-length] = message;
			message.innerHTML = '<div class="photo"><img width="50" height="50" src="'+user.profilePhotoUrl+'" alt="Photo of '+user.name+' '+user.lastname+'" /></div><div class="message_text"><div class="name">'+user.name+':</div></div>';
			this.messages.appendChild(message);
		}
	},
	Chat: function(machineName, infoJSON)
	{
		this.machineName=machineName;
		this.infoJSON=infoJSON;

		this.container = document.createElement('div');
		this.container.style.display = 'inline-block';
		this.container.style.height = '300px';
		this.container.style.marginTop = '-300px';
		this.container.className='eduintgd-chat';
			this.header = document.createElement('header');
			this.header.className='header';
			this.container.appendChild(this.header);
				this.title = document.createElement('div');
				this.title.className='title';
				this.title.innerHTML='<div class="profilephoto"><img width="50" height="50" src="'+infoJSON.profilePhotoUrl+'" alt="Photo of '+infoJSON.name+' '+infoJSON.lastname+'" /></div><div class="profilepname">'+infoJSON.name+' '+infoJSON.lastname+'</div>';
				this.header.appendChild(this.title);
				this.options = document.createElement('div');
				this.options.className='options';
				this.header.appendChild(this.options);
					this.close = document.createElement('div');
					this.close.className='close';
					this.close.innerHTML='X';
					this.close.container=this.container;
					this.close.machineName=this.machineName;
					this.close.onclick = function()
					{
						this.container.style.display='none';
						this.container.parentNode.removeChild(this.container);
						EduIntGD_WorkTogether._arChats.splice(EduIntGD_WorkTogether._arChats[this.machineName],1);
					}
					this.options.appendChild(this.close);
					this.minimize = document.createElement('div');
					this.minimize.className='minimize';
					this.minimize.innerHTML='_';
					this.options.appendChild(this.minimize);
					this.moreoptions = document.createElement('div');
					this.moreoptions.className='moreoptions';
					this.moreoptions.innerHTML='+';
					this.options.appendChild(this.moreoptions);

			this.content = document.createElement('div');
			this.content.className='content';
			this.container.appendChild(this.content);
				this.messages = document.createElement('div');
				this.messages.className='messages';
				this.messages.style.overflow='auto';
				this.content.appendChild(this.messages);
				this.write = document.createElement('div');
				this.write.className='write';
				this.content.appendChild(this.write);
					this.input = document.createElement('textarea');
					this.input.className='input';
					this.write.appendChild(this.input);
					this.send = document.createElement('div');
					this.send.className='send';
					this.send.style.display='table';
					this.write.appendChild(this.send);
						this.sub_send = document.createElement('div');
						this.sub_send.className='sub-send';
						this.sub_send.innerHTML='>';
						this.sub_send.input = this.input;
						this.sub_send.style.display='table-cell';
						this.sub_send.style.verticalAlign='middle';
						this.sub_send.style.textAlign='center';
						this.sub_send.onclick=function(){
							if(this.input.value!=='')
							{
							//	firebase.database().ref('chat/'+user.username+'/jdgp77').push({ username: user.username, valor: this.input.value });
								this.input.value='';
							}
						};
						this.send.appendChild(this.sub_send);

		EduIntGD_WorkTogether.footer_tooles.appendChild(this.container);

		
		this.arMessages=[];
		this.accAddMessage = function(value,infoJson)
		{
			var message = document.createElement('div');
			message.className = 'message '+(infoJson.bnOther?'other':'mine');
			this.arMessages[this.arMessages-length] = message;
			if(infoJson.bnOther)
			{ message.innerHTML = '<div class="photo"><img src="" alt="" /></div><div class="message_text"><div class="name">'+infoJson.name+':</div><div class="message-sent">'+value+'</div></div>'; }
			else
			{ message.innerHTML = '<div class="message_text"><div class="name">'+infoJson.name+':</div><div class="message-sent">'+value+'</div></div>'; }
			this.messages.appendChild(message);
			this.messages.scrollTop=9999;
		}
		
	}
};

user = {
	uid: 1,
	username: 'Julian Guerrero',
};
/*
var starCountRef = firebase.database().ref('chat/'+user.username+'/jdgp77');
starCountRef.on('child_added', function(snapshot) {
  Chat = EduIntGD_WorkTogether._arChats["Chat con Julian Guerrero"]
  //Chat.accAddMessage(snapshot.val().valor,{ bnOther: (snapshot.username===user.username?true:false), name: snapshot.val().username });
});
*/

//	Comentario borrame