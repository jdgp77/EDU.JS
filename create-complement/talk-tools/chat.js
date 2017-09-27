EduInt.Thing.setCustom('tipo-contenido',function(informacion){
	this.g('bloques').setCustom(function(){
		this.setPostionRightBottom(0,20+45*(this.Board.numBloques));	

		this.g('open').setDimentions(45,45).setPostionRightBottom(40*3,0).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBoxShadow('#676F67 2.5px 2.5px 5px');
		this.g('open').setCustom(function(){

			this.t('letrero').setDimentions(41,41).setPostionRightBottom(2,2).setBackgroundImageInAlpha('create-complement/talk-tools/images/LogoOpenClose.png');
		});
		this.t('base-info').setDimentions(45,1).setPostionRightBottom(40*3 + 45,50).setId(informacion.text+'-'+'base-info').setOverflow('hidden').setVisibility('hidden').setBackgroundColor('transparent').setHeight('1px');

		for(var countCuadradosExtra=0;countCuadradosExtra<informacion.cuadrados.length;countCuadradosExtra++)
		{
			var cuadrado = informacion.cuadrados[countCuadradosExtra];

			this.t(cuadrado.nombre).setDimentions(40,40).setPostionRightBottom(40*(2-countCuadradosExtra),2).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBoxShadow('#676F67 2px 2px 5px');
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
			if(this.Board.bnLogin) //	Quitar el true para poder pedir el login
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
				if(AyudanteGD.auth.currentUser===null)
				{
					// Sign in Firebase using popup auth and Google as the identity provider.
					var provider = new firebase.auth.GoogleAuthProvider();
					AyudanteGD.auth.signInWithPopup(provider);
				}
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
						this.t('base-info').setVisibility('inherit');
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
		//	this.t('privadas').setDimentions(40,40).setPostionRightBottom(40*2,2).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBackgroundPosition('0 -45px').setBoxShadow('#676F67 2px 2px 5px');
		//	this.t('publicas').setDimentions(40,40).setPostionRightBottom(40*1,2).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBackgroundPosition('0 -85px').setBoxShadow('#676F67 2px 2px 5px');

		//	this.t('borrame' ).setDimentions(40,40).setPostionRightBottom(40*0,2).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBackgroundPosition('0 -125px').setBoxShadow('#676F67 2px 2px 5px');
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

	/*
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
			//this.g('lista-chats').setPosInXY(5,90).setDimentions(34,50000).setBoxSizing('border-box');
			this.arChats=[];
			this.accAccAnadirImagenChat = function(name){
				this.g('lista-chats').t(name).setBackgroundColor('#FFF').setBackgroundImageInAlpha('casa.png');

				var chat = _EduIntBasic.crearElementos({
					element: 'div',
					id: 'lista-chats-'+AyudanteGD.Chats.chatIdByName(name),
					style: {
						float: 'left',
						bottom: 0,
						width: '283px',
						marginRight: '15px',
					},
				});
			};
			this.accAnadirChat = function(name){
				this.name = name;

				var chat = _EduIntBasic.crearElementos({
					element: 'div',
					id: AyudanteGD.Chats.chatIdByName(name),
					style: {
						float: 'left',
						bottom: 0,
						width: '283px',
						marginRight: '15px',
					},
					children: [
						{
							element: 'div',
							className: 'chat-top-button',
							style: {
								border: '0',
								width: '100%',
								height: '35px',
							},
							children: [
								{
									element: 'div',
									className: 'chat-top-button-camera',
									style: {
										border: '0',
										backgroundImage: 'url(http://edujs.educacioninteractiva.com.co/create-complement/talk-tools/images/Camara.png)',
										width: '49px',
										height: '35px',
										float: 'right',
										marginRight: '10px'
									},
									EduIntGDInfo: {
										Board: this.Board,
										name: name,
										selectorTextArea: 'chat-main-messagesend-text-input',
										selectorChat: AyudanteGD.Chats.chatIdByName(name),
									},
									onclick: function(event)
									{
										EduIntGDInfo = this.EduIntGDInfo;
								        AyudanteGD.accBeTransparent();
								        html2canvas(document.body).then(function(canvas) {
											AyudanteGD.accBeVisible();
								            //**dataURL to blob**
											function dataURLtoBlob(dataurl) {
											    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
											        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
											    while(n--){
											        u8arr[n] = bstr.charCodeAt(n);
											    }
											    return new Blob([u8arr], {type:mime});
											}

								            //var file =  new File([canvas.toDataURL('png').split(',')[1]], 'pntalls-'+(new Date()).getTime()+".png", {type: "image/png", lastModified: (new Date()).getTime() });
								            var file = dataURLtoBlob(canvas.toDataURL('png'));

								            var nameChat = EduIntGDInfo.name;

											var storageRef = AyudanteGD.storage.ref();
											var uploadTask = storageRef.child('images/' + 'pntalls-'+(new Date()).getTime()+'.png').put(file);
											uploadTask.on('state_changed', function(snapshot){
												console.info('snapshot');
												console.info(snapshot);
											},
											function(error) {
												console.info('error');
												console.info(error);
											},
											function() {
											  	var downloadURL = uploadTask.snapshot.downloadURL;
												console.info('downloadURL');
												console.info(downloadURL);

												AyudanteGD.Chats.c(nameChat).accAddMessageToAllUsers('<a href="'+downloadURL+'" target="_blank" ><img style="width: 100%; height: 100%;" src="'+downloadURL+'" alt="Imagen enviada" /></a>');
												AyudanteGD.Chats.c(nameChat).accScrollDown();
											});

								        },{
								        	background: '#fff'
								        });
									}
								}
							],
						},
						{
							element: 'div',
							className: 'chat-main',
							style: {
								backgroundColor: '#eae4e4',
								paddingBottom: '2px',
								marginBottom: '4px',
								boxShadow: '#777 1.5px 1.5px 5px',
							},
							children: [
								{
									element: 'div',
									className: 'chat-main-message',
									style: {
    									height: '240px',
    									marginBottom: '4px',
    									overflow: 'auto',
    									scrollTop: '999999',
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
    									margin: '0 0 0 2px',
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
													    width: '170px',
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
													EduIntGDInfo: {
														Board: this.Board,
														name: name,
														selectorTextArea: 'chat-main-messagesend-text-input',
														selectorChat: AyudanteGD.Chats.chatIdByName(name),
														getTextArea: function(element)
														{
															return document.querySelector('#'+element.EduIntGDInfo.selectorChat+' .'+element.EduIntGDInfo.selectorTextArea);
														},
													},
													style: {
														border: '0',
														backgroundImage: 'url(http://edujs.educacioninteractiva.com.co/create-complement/talk-tools/images/ButtonSend.png)',
														width: '36px',
														height: '35px',
														float: 'right',
														marginTop: '11px',
														marginRight: '10px'
													},
													onclick: function(event)
													{
														var textArea = this.EduIntGDInfo.getTextArea(this);

														var nuevoValorTextArea = textArea.value;
														//textArea.EduIntGDInfo.Board.accAddMessage(AyudanteGD.myUser,textArea.value);
														AyudanteGD.Chats.c(this.EduIntGDInfo.name).accAddMessageToAllUsers(AyudanteGD.Filtros.mensaje(textArea.value));
														AyudanteGD.Chats.c(this.EduIntGDInfo.name).accScrollDown();
														
														textArea.value='';

													},
												},{
													element: 'button',
													className: 'chat-main-messagesend-btnloadimage-button',
													EduIntGDInfo: {
														Board: this.Board,
														name: name,
														selectorTextArea: 'chat-main-messagesend-text-input',
														selectorChat: AyudanteGD.Chats.chatIdByName(name),
														getTextArea: function(element)
														{
															
														},
													},
													style: {
														border: '0',
														backgroundImage: 'url(http://edujs.educacioninteractiva.com.co/create-complement/talk-tools/images/ButtonLoadImage.png)',
														width: '36px',
														height: '35px',
														float: 'right',
														marginTop: '11px',
														marginRight: '10px',
														overflow: 'hidden'
													},
													onclick: function(event)
													{
														
													},
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
								backgroundImage: 'url(http://edujs.educacioninteractiva.com.co/create-complement/talk-tools/images/Fondos-Sprite.png)',
								height: '40px',
								boxShadow: '#777 1.5px 1.5px 5px',
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
									html: '<img style="margin: 1px 0 0 1px; vertical-align: top;" width="32" height="32" src="" alt="" />'
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
									html: name
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
												cursor: 'pointer'
											},
											html: '_',
											EduIntGDInfo: {
												Board: this.Board,
												name: name,
												selectorTextArea: 'chat-main-messagesend-text-input',
												selectorChat: AyudanteGD.Chats.chatIdByName(name),
												bnVisible: true
											},
											onclick: function(){
												if(this.EduIntGDInfo.bnVisible)
												{
													document.querySelector('#'+this.EduIntGDInfo.selectorChat+' .chat-top-button').style.display='none';
													document.querySelector('#'+this.EduIntGDInfo.selectorChat+' .chat-main').style.display='none';

													this.EduIntGDInfo.bnVisible=false;
												}
												else
												{
													document.querySelector('#'+this.EduIntGDInfo.selectorChat+' .chat-top-button').style.display='block';
													document.querySelector('#'+this.EduIntGDInfo.selectorChat+' .chat-main').style.display='block';

													this.EduIntGDInfo.bnVisible=true;
												}
											},
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
				myDropzone = new Dropzone('#'+AyudanteGD.Chats.chatIdByName(name)+' .chat-main-messagesend-btnloadimage-button', { url: "/file/post" });
				myDropzone.nameChat=this.name;
				myDropzone.on('complete',function(file){
//	Aca carga las imagenes
					var storageRef = AyudanteGD.storage.ref();
					var uploadTask = storageRef.child('images/' + file.name).put(file);
					uploadTask.on('state_changed', function(snapshot){
						console.info('snapshot');
						console.info(snapshot);
					},
					function(error) {
						console.info('error');
						console.info(error);
					},
					function() {
					  	var downloadURL = uploadTask.snapshot.downloadURL;
						console.info('downloadURL');
						console.info(downloadURL);

						AyudanteGD.Chats.c(myDropzone.nameChat).accAddMessageToAllUsers('<a href="'+downloadURL+'" target="_blank" ><img style="width: 100%; height: 100%;" src="'+downloadURL+'" alt="Imagen enviada" /></a>');
						AyudanteGD.Chats.c(myDropzone.nameChat).accScrollDown();
						myDropzone.removeFile(file);
					});
				});

				return {
					chat: chat,
					myDropzone: myDropzone
				};
			};
			this.accAddMessage = function(user,message,nameChat)
			{
				var message = _EduIntBasic.crearElementos({
					element: 'div',
					className: 'message-'+user.id,
					style: {
						display: 'table',
					    width: '100%',
					    boxSizing: 'border-box',
					    marginTop: '10px',
					    fontFamily: 'Arial',
					    verticalAlign: 'top',
					    fontSize: '13px',
					    color: '#333',
					    paddingTop: '4px'
					},
					children: [
						{
							element: 'div',
							className: 'message-arrow-left',
							style: {
								display: 'table-cell',
								width: '20px',
					    		verticalAlign: 'top',
							},
							children: [
								{
									element: 'div',
									className: 'message-arrow-arrow',
									style: {
										borderColor: 'transparent #FFF transparent transparent',
										borderWidth: '7px 8px 7px 0',
										borderStyle: 'solid',
										marginTop: '10px',
										visibility: (user.email==AyudanteGD.myUser.email?'hidden':'inherit')
									},
								},
							],
						},{
							element: 'div',
							className: 'message-text',
							style: {
								display: 'table-cell',
								backgroundColor: '#fff',
					    		verticalAlign: 'top',
					    		padding: '9px 0 9px 11px',
							},
							children: [
								{
									element: 'div',
									className: 'message-text-photo',
									style: {
										float: 'left',
										height: '100%',
									},
									children: [
										{
											element: 'img',
											className: 'message-text-photo-img',
											src: user.photoURL,
											style: {
												height: '26px',
												width: '26px'
											}
										},
									],
								},
								{
									element: 'div',
									className: 'message-text-text',
									children: [
										{
											element: 'div',
											className: 'message-text-text-name',
											style: {
												fontSize: '9px',
												color: '#AAA',
												marginLeft: '33px',
											},
											html: user.name,
										},
										{
											element: 'div',
											className: 'message-text-text-message',
											style: {
												marginTop: '2px',
												marginLeft: '33px',
											},
											html: message,
										},
									],
								},
							],
						},{
							element: 'div',
							className: 'message-arrow-right',
							style: {
								display: 'table-cell',
								width: '20px',
					    		verticalAlign: 'top',
							},
							children: [
								{
									element: 'div',
									className: 'message-arrow-arrow',
									style: {
										borderColor: 'transparent transparent transparent #FFF',
										borderWidth: '7px 0 7px 8px',
										borderStyle: 'solid',
										marginTop: '10px',
										visibility: (user.email==AyudanteGD.myUser.email?'inherit':'hidden')
									},
								},
							],
						}
					],
				});

				document.querySelector('#'+AyudanteGD.Chats.chatIdByName(nameChat)+' .chat-main-message').appendChild(message);
			};
		});

	this.Board.Chats = {
		Board: this.Board,
		arChats: [],
		c: function(name)
		{
			if(this.arChats[name]===undefined)
			{
				var chat = new this.Chat(name);
				this.arChats[name] = chat;
				return chat;
			}
			else
			{
				return this.arChats[name];
			}
		},
		Chat: function(name){
			this.Board = AyudanteGD.Board;
			//	Guardamos el nombre del chat creado
			this.name = name;
			var info = this.Board.g('dashBoard-init').setPosition('fixed').g('chat').accAnadirChat(this.name);
			this._element = info.chat;
			this.myDropzone = info.myDropzone;

			//	(Chat)
			this.accAddMessage = function(user,message)
			{
				this.Board.g('dashBoard-init').g('chat').accAddMessage(user,message,this.name);
			};

			return this;
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
		this.g('chat').accAddMessage(user,message,chatCode);
	};
	this.getChatId = function(name)
	{
		return this.g('chat').getChatId(name);
	};
/*
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

	this.accAddMessage({
		id: 'SreSUtq235awsrrEw',
		name: 'Julian David Guerrero Pinilla',
		image: 'pana.png',
	},'Hola hermano','SreSUtq235awsrrEw');

	this.accAddMessage({
		id: 'SreSUtq235awsrrEw',
		name: 'Julian David Guerrero Pinilla',
		image: 'pana.png',
	},'Hola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman o','SreSUtq235awsrrEw');

	this.accAddMessage({
		id: 'SreSUtq235awsrrEw',
		name: 'Julian David Guerrero Pinilla',
		image: 'pana.png',
	},'Hola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman o','SreSUtq235awsrrEw');

	this.accAddMessage({
		id: 'SreSUtq235awsrrEw',
		name: 'Julian David Guerrero Pinilla',
		image: 'pana.png',
	},'Hola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman o','SreSUtq235awsrrEw');

	this.accAddMessage({
		id: 'SreSUtq235awsrrEw',
		name: 'Julian David Guerrero Pinilla',
		image: 'pana.png',
	},'Hola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman oHola herman o','SreSUtq235awsrrEw');
*/

	

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
		this.t('open').setDimentions(45,45).setPostionRightBottom(40*3,0).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBoxShadow('#676F67 2.5px 2.5px 5px');
			this.t('todos').setDimentions(40,40).setPostionRightBottom(40*2,2).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBackgroundPosition('0 -45px').setBoxShadow('#676F67 2px 2px 5px');
			//	this.t('publicas').setDimentions(40,40).setPostionRightBottom(40*1,2).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBackgroundPosition('0 -85px').setBoxShadow('#676F67 2px 2px 5px');
			//	this.t('borrame' ).setDimentions(40,40).setPostionRightBottom(40*0,2).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBackgroundPosition('0 -125px').setBoxShadow('#676F67 2px 2px 5px');
	});

	this.g('retos').setCustom(function(){
		this.setPostionRightBottom(20,20+45*0);

		this.t('text').setType('text').setText('RETOS').setPostionRightBottom(40*3+45+5,10).setFontSize(20).setColor('#CCC').setFontFamily('Arial').setLetterSpacing(3.5);;
		this.t('open').setDimentions(45,45).setPostionRightBottom(40*3,0).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBoxShadow('#676F67 2.5px 2.5px 5px');
			this.t('normales').setDimentions(40,40).setPostionRightBottom(40*2,2).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBackgroundPosition('0 -45px').setBoxShadow('#676F67 2px 2px 5px');
			this.t('importantes').setDimentions(40,40).setPostionRightBottom(40*1,2).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBackgroundPosition('0 -85px').setBoxShadow('#676F67 2px 2px 5px');
			this.t('urgentes' ).setDimentions(40,40).setPostionRightBottom(40*0,2).setBackgroundImage('create-complement/talk-tools/images/Fondos-Sprite.png').setBackgroundPosition('0 -125px').setBoxShadow('#676F67 2px 2px 5px');
	});
	*/

	console.info('casa');
});

var AyudanteGD = {
	defaultData: {
		bnChat: true,
		bnRetos: true,
		bnNotas: true,
	},
	create: function(name)
	{
		this.name = name;
		//	Realiza el inicio una sola vez
		AyudanteGD.initOneTime();
		//	Crea el tablero que maneja toda la interfaz
		this.Board = EduInt.createBoardInBody('ayudante-'+this.name);
		//	Iniciamos variables
		this.Board.numBloques=0;
		this.Board.bnLogin=false;
		this.Board.name=this.name;
		this.Board.Chat=this;
		this.Board.setDefaultPaths({ images: 'http://edujs.educacioninteractiva.com.co/'});
		//	Primero crea el contenedor global de todos las ventanas
		this.Board.g('dashBoard-init').getCustom('ayudante');
		//	Genera la animación
		this.Board.createAnimation(function(infoAnimation){

		}).startAnimation();
		
	},
	accBeTransparent: function(){
		this.Board.g('dashBoard-init')._element.style.visibility = 'hidden';
	},
	accBeVisible: function(){
		this.Board.g('dashBoard-init')._element.style.visibility = 'visible';
	},
	myUser: {},	
	//	Esta funcione es llamada tomando como padre el Chat del cual es llamado
	onAuthStateChanged: function(user){
		if(user)
		{
			AyudanteGD.accSaveUserInfo(user);
		}
		else
		{
			// No user is signed in.

		}
	},
	accSaveUserInfo: function(user)
	{
		// User is signed in.
		AyudanteGD.myUser.name = user.displayName;
		AyudanteGD.myUser.email = user.email;
		AyudanteGD.myUser.photoURL = user.photoURL;

		AyudanteGD.accInformarQueEstaLogeuado();
		/*
		AyudanteGD.socket = io.connect('http://localhost:3000');
		AyudanteGD.socket.on('connect', function (socket) {
			AyudanteGD.socket.emit('user',user);
		});
		*/

		AyudanteGD.socket.on('getMyFriends',function(arUsersData){
			for(var email in arUsersData)
			{
				var user = arUsersData[email];
				console.info(user);
			}
		});
		AyudanteGD.socket.emit('conect_user',AyudanteGD.myUser);

		//	Cuando recibe un mensaje de alguien
		this.message = AyudanteGD.database.ref('/chats/'+AyudanteGD.name+'/messages/');
		this.message.on('child_added',function(dataBase){
			AyudanteGD.Chats.c(AyudanteGD.name).accAddMessage(dataBase.val().user,dataBase.val().message);
			AyudanteGD.Chats.c(AyudanteGD.name).accScrollDown();
			console.info('child_added');
		});
		this.message.on('child_changed',function(dataBase){
			AyudanteGD.Chats.c(AyudanteGD.name).accAddMessage(dataBase.val().user,dataBase.val().message);
			console.info('child_added');
		});
		this.message.on('child_removed',function(dataBase){
			AyudanteGD.Chats.c(AyudanteGD.name).accAddMessage(dataBase.val().user,dataBase.val().message);
			console.info('child_added');
		});
	},
	bnInitOneTime: true,
	initOneTime: function()
	{
		if(AyudanteGD.bnInitOneTime)
		{
			//	Inicia las funcions de responsive
			EduInt._Responsive.init();
			
			//	Iniciamos los datos de firebase
			AyudanteGD.auth = firebase.auth();
			// Initiates Firebase auth and listen to auth state changes.
			AyudanteGD.auth.onAuthStateChanged(AyudanteGD.onAuthStateChanged.bind(AyudanteGD.Chats));
			//	this.database = firebase.database();
			AyudanteGD.storage = firebase.storage();
			//	Hace que nunca vuelva a ser ejecutada esta funcion
			AyudanteGD.bnInitOneTime=false;
			//	Base de datos
			AyudanteGD.database = firebase.database();

			//	Socket.io
			AyudanteGD.socket = io.connect('http://localhost:3000');
			AyudanteGD.socket.on('connect', function() {
				console.info(AyudanteGD.socket.id);
				AyudanteGD.myUser.socketid = AyudanteGD.socket.id;
				AyudanteGD.socket.emit('conect_user',AyudanteGD.myUser);
			});
			AyudanteGD.socket.on('console', function (data) {
				console.log(data);
			});
		}
	},
	//	(Chat)
	accInformarQueEstaLogeuado: function(user)
	{
		AyudanteGD.Board.bnLogin=true;
	},
	Chats: {
		arChats: [],
		c: function(name)
		{
			if(this.arChats[name]===undefined)
			{
				var chat = new this.Chat(name);
				this.arChats[name] = chat;
				return chat;
			}
			else
			{
				return this.arChats[name];
			}
		},
		Chat: function(name){
			//	Guardamos el nombre del chat creado
			this.name = name;
			//	(Chat)
			this.init = function(){

			};
			//	(Chat)
			//	Crear un nuevo chat
			AyudanteGD.Board.Chats.c(this.name);
			//	(Chat)
			AyudanteGD.socket.emit('newChat', { name: name });
			//	(Chat)
			AyudanteGD.socket.on('getmessage-'+name, function(data){
				AyudanteGD.Board.accAddMessage({
					id: 'SreSUtq235awsrrEw',
					name: 'Julian David Guerrero Pinilla',
					image: 'pana.png',
				}, data.message, this.name);
			});
			//	(Chat)
			//	Añade mensaje a este chat
			this.accAddMessage = function(user,message)
			{
				AyudanteGD.Board.Chats.c(this.name).accAddMessage(user,AyudanteGD.Mascaras.mensaje(message));
			}
			//	Añade mensaje a otro chat
			//	(Chat)
			this.accAddMessageToAllUsers = function(message)
			{
				var keyNetMessage = AyudanteGD.database.ref('chats/'+AyudanteGD.name).child('messages').push().key;
				var updates = {};

				updates['/chats/'+AyudanteGD.name+'/messages/'+keyNetMessage+'/message/'] = message;
				updates['/chats/'+AyudanteGD.name+'/messages/'+keyNetMessage+'/user/'] = AyudanteGD.myUser;

				AyudanteGD.database.ref().update(updates);
			}
			//	(Chat)
			this.accScrollDown = function()
			{
				var messageArea = document.querySelector('#'+AyudanteGD.Chats.chatIdByName(this.name)+' .chat-main-message');
				messageArea.scrollTop = messageArea.scrollHeight*4;
			};
			//	
			this.init();
		},	
		chatIdByName: function(){
			return 'chat-'+ _EduIntBasic.machineName(name);
		},
	},
	Retos: {
		
	},
	Notas: {

	},
	Mascaras: {
		mensaje: function(valor)
		{
			var divisorDePalabras = '~';
			var arDividersWords = [' ',':','(',')','[',']','+','-','/',';','.','\r','\n',',','=','<','>'];

            //  Colocamos un divizor al comienzo y final de las palabras
            valor = divisorDePalabras+valor+divisorDePalabras;

            //  Pasa por cada una de estas y le coloca antes y despues de las mismas un '¬%¬' de tal manera que divida estas palabras
            for(contPalabrasQSEFDUP=0;contPalabrasQSEFDUP<arDividersWords.length;contPalabrasQSEFDUP++)
            {
            	var valorUnico = 'ADJushenLMSKNDUe23423';
                valor=_EduIntBasic._remplaceAll(arDividersWords[contPalabrasQSEFDUP],valorUnico,valor);
                valor=_EduIntBasic._remplaceAll(valorUnico,divisorDePalabras+arDividersWords[contPalabrasQSEFDUP]+divisorDePalabras,valor);
            }


            //  Limpia los divisores de lapabras dobles
            var dP = divisorDePalabras;
            while(valor.indexOf(dP+dP+'')!=-1){ valor=valor.replace(dP+dP,dP); };

            //	Quita los espacios que no son necesrios, como los que van despues de http
            var arPalabras = valor.split(divisorDePalabras);
            var bnUnirSiguientesPalabrasPorHTTP = false;
            var numPalabraHTTP = -1;
            var countPalabras=0;
            var bnGuardarPalabra=true;
            var arPalabrasNew = [];
            for(var count=0;count<arPalabras.length;count++)
            {
            	var palabra = arPalabras[count];
            	var palabraOrg = palabra;


            	if(bnUnirSiguientesPalabrasPorHTTP)
            	{
            		if(palabra!==' ')
            		{
            			arPalabrasNew[numPalabraHTTP] = arPalabrasNew[numPalabraHTTP] + palabra + '';
            			bnGuardarPalabra=false;
            		}
            		else
            		{

            			bnUnirSiguientesPalabrasPorHTTP=false;
            		}
            	}
            	else
            	{
	            	//	Habilita filtro para las siguientes palabras
	            	if(palabra=='http' || palabra=='https')
	            	{
	            		numPalabraHTTP=count;
	            		bnUnirSiguientesPalabrasPorHTTP=true;
	            	}
	            }

	            if(bnGuardarPalabra)
	            {
	            	arPalabrasNew[countPalabras] = palabra;
	            	countPalabras=countPalabras+1;
	            }

	            if(bnUnirSiguientesPalabrasPorHTTP)
	            {
					bnGuardarPalabra=true;
            		if(palabra===' ')
            		{
            			bnGuardarPalabra=true;
            		}
	            }
            }
            arPalabras = arPalabrasNew;

            //	Pasa por cada palabra y las filtra
            for(var count=0;count<arPalabras.length;count++)
            {
            	var palabra = arPalabras[count];
            	var palabraOrg = palabra;

            	valor=_EduIntBasic._remplaceAll('  ',' ',valor);


            	if(palabra.indexOf('https://www.youtube.com')===0)
            	{
            		var arValoresGet = palabra.split('?')[1].split('&');
            		for(var countValoresGet=0;countValoresGet<arValoresGet.length;countValoresGet++)
            		{
            			var arValorGet = arValoresGet[countValoresGet].split('=');
            			var nombreGet= arValorGet[0];
            			var valorGet = arValorGet[1];

            			if(nombreGet=='v')
            			{
            				palabra='<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/'+valorGet+'?ecver=2" width="640" height="360" frameborder="0" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>';
            			}
            		}
            	}

            	arPalabras[count] = palabra;
            }

            valor = arPalabras.join('');
            while(valor.indexOf('  ')!=-1) { valor=valor.replace('  ',' ') }


            return valor;
		}
	},
	Filtros: {
		mensaje: function(valor)
		{
			//  Cambia los espacios por un caracter que entiende html, y se aplica para todo el valor
			valor =_EduIntBasic._remplaceAll('<','&#60',valor);
            valor =_EduIntBasic._remplaceAll('>','&#62',valor);

            return valor;
		}
	}
};
