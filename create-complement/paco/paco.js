EduInt.Thing.setCustom('paco--pierna',function(){
	this.setBackgroundImageInAlpha('create-complement/paco/images/Paco/Pierna.png').setDimensions(35,33);
	this.accPiernaAtrasEnMov = function()
	{ this.setBackgroundPosition('-35px 0'); }
	this.accPiernaAdelanteEnMov = function()
	{ this.setBackgroundPosition('-70px 0'); }
	this.accPiernaQuieta = function()
	{ this.setBackgroundPosition('0 0'); }
});
EduInt.Thing.setCustom('paco--ojovista',function(){
	this.setBackgroundImageInAlpha('create-complement/paco/images/Paco/OjoDerechoVista.png').setDimensions(15,16);
	this.accCerrarOjo = function()
	{ this.setBackgroundPosition('-15px 0'); }
	this.accAbrirOjo = function()
	{ this.setBackgroundPosition('0 0'); }
});
EduInt.Thing.setCustom('paco--ojooculto',function(){
	this.setBackgroundImageInAlpha('create-complement/paco/images/Paco/OjoIzquierdoOculto.png').setDimensions(5,14);
	this.accCerrarOjo = function()
	{ this.setBackgroundPosition('-5px 0'); }
	this.accAbrirOjo = function()
	{ this.setBackgroundPosition('0 0'); }
});
EduInt.Thing.setCustom('paco--boca',function(){
	this.setBackgroundImageInAlpha('create-complement/paco/images/Paco/Boca.png').setDimensions(21,16);
	this.accCerrar = function()
	{ this.setBackgroundPosition('0 0'); }
	this.accAbrir = function()
	{ this.setBackgroundPosition('-21px 0'); }
});
EduInt.Thing.setCustom('paco',function(){
	this.t('ala-oculta').setBackgroundImageInAlpha('create-complement/paco/images/Paco/AlaIzquierdaOculta.png').setDimensions(64,51).setPosInXY(0,24);
	this.t('pierna-oculto').getCustom('paco--pierna').setPosInXY(28,72);
	this.t('cuerpo').setBackgroundImageInAlpha('create-complement/paco/images/Paco/Cuerpo.png').setDimensions(75,84).setPosInXY(8,0);
	this.t('ojo-oculto').getCustom('paco--ojooculto').setPosInXY(78,10);
	this.t('pico').setBackgroundImageInAlpha('create-complement/paco/images/Paco/Pico.png').setDimensions(38,36).setPosInXY(64,12);
	this.t('boca').getCustom('paco--boca').setPosInXY(73,31).setBackgroundPosition('-21px 0');
	this.t('ala-vista').setBackgroundImageInAlpha('create-complement/paco/images/Paco/AlaDerechaVista.png').setDimensions(64,51).setPosInXY(0,26);
	this.t('ojo-vista').getCustom('paco--ojovista').setPosInXY(62,10);
	this.t('pierna-vista').getCustom('paco--pierna').setPosInXY(22,77);

	this.bnMoverBoca=false;
	this.bnBocaAbierta=false;
	this.numFramesBocaAbierta=3;
	this.accEnMoverBoca = function()
	{ this.bnMoverBoca=true; }
	this.accDisMoverBoca = function()
	{ this.bnMoverBoca=false; }

	this.bnMoverOjos=true;
	this.bnOjosAbiertos=true;
	this.bnOjosParpadeando=true;
	this.numFramesOjosAbiertos=200;
	this.numFramesOjosCerrados=3;
	this.accEnMoverOjos = function()
	{ this.bnMoverOjos=true; }
	this.accDisMoverOjos = function()
	{ this.bnMoverOjos=false; }
	this.accCerrarOjos = function() 
	{ this.bnMoverOjos=false; this.bnCerrarOjos=true; }

	this.bnMoverPies=false;
	this.bnPieAtrasAdelante=true;
	//	Estatico
	this.bnPiesEnMovimiento=false;
	this.accEnMoverPies = function()
	{ this.bnMoverPies=true; }
	this.accDisMoverPies = function()
	{ this.bnMoverPies=false; }

	this.accMoveInX = function(num)
	{
		this.accEnMoverPies();
		this._accMoveInX(num);
	}

	Paco = this;

	this.countFramesBocaAbierta=0;
	this.countFramesOjosAbiertos=0;
	this.countFramesOjosCerrados=0;
	this.accCreateAnimateFunctionInShadow(function(){
		if(this.bnMoverBoca)
		{
			if(this.countFramesBocaAbierta==this.numFramesBocaAbierta)
			{
				if(this.bnBocaAbierta)
				{
					this.t('boca').setBackgroundPosition('0 0');
					this.bnBocaAbierta=false;
				}
				else
				{
					this.t('boca').setBackgroundPosition('-21px 0');
					this.bnBocaAbierta=true;
				}
				this.countFramesBocaAbierta=0;
			}
			this.countFramesBocaAbierta++;
		}
		else
		{
			
		}
		if(this.bnMoverOjos)
		{
			if(this.bnOjosAbiertos)
			{
				if(this.bnCerrarOjos)
				{
					this.bnOjosAbiertos=true;
				}
				if(this.countFramesOjosAbiertos==0)
				{
					this.t('ojo-vista').accAbrirOjo();
					this.t('ojo-oculto').accAbrirOjo();
				}
				if(this.countFramesOjosAbiertos==this.numFramesOjosAbiertos)
				{
					this.bnOjosAbiertos=false;
					this.countFramesOjosCerrados=0;
				}
				this.countFramesOjosAbiertos++;
			}
			else
			{
				if(this.countFramesOjosCerrados==0)
				{
					this.t('ojo-vista').accCerrarOjo();
					this.t('ojo-oculto').accCerrarOjo();
				}
				if(this.countFramesOjosCerrados==this.numFramesOjosCerrados)
				{
					this.bnOjosAbiertos=true;
					this.countFramesOjosAbiertos=0;
				}
				this.countFramesOjosCerrados++;
			}
			this.bnOjosParpadeando=true;
		}
		else
		{
			if(this.bnCerrarOjos)
			{
				if(this.bnOjosParpadeando)
				{
					this.t('ojo-vista').accCerrarOjo();
					this.t('ojo-oculto').accCerrarOjo();

					this.bnOjosAbiertos=false;
					this.countFramesOjosCerrados=0;
					this.countFramesOjosAbiertos=0;
				}
				this.bnOjosParpadeando=false;
			}
		}
		if(this.bnMoverPies)
		{
			if(this.bnPieAtrasAdelante)
			{
				this.t('pierna-vista').accPiernaAtrasEnMov();
				this.t('pierna-oculto').accPiernaAdelanteEnMov();
				this.bnPieAtrasAdelante=false;
			}
			else
			{
				this.t('pierna-vista').accPiernaAdelanteEnMov();
				this.t('pierna-oculto').accPiernaAtrasEnMov();
				this.bnPieAtrasAdelante=true;
			}
			this.bnPiesEnMovimiento=true;
		}
		else
		{
			if(this.bnPiesEnMovimiento)
			{
				this.t('pierna-vista').accPiernaQuieta();
				this.t('pierna-oculto').accPiernaQuieta();

				this.bnPiesEnMovimiento=false;
			}
		}
	});
});


paco = {
	createBoard: function(qqsmInfo)
	{
		this.board = EduInt.createBoardIn(document.getElementById(qqsmInfo.id),qqsmInfo.name,1440,455);
		this.board.setBackgroundImage('create-complement/paco/images/Escenario/Cielo.png').setBackgroundSize('cover');
		this.board.accEnResponsiveMinWidth(410,'left');
		this.board.qqsmInfo=qqsmInfo;

		this.board.start(function(){
			this.setCustom('nube',function(info){
				this.setDimensions(132,75).setBackgroundImageInAlpha('/create-complement/paco/images/Escenario/Nube.png');
				this.setPosInXY(EduInt.Basic.randomInt(-100,1440+132),EduInt.Basic.randomInt(355-30));
				this.velocidad=EduInt.Basic.random(0,5)*(-1);
				this.getVelocidad=function()
				{ return this.velocidad; }
				this.setVelocidad=function(valor)
				{ this.velocidad=valor; }
			});
			this.setCustom('misil',function(){
				this.setDimensions(112,62).setBackgroundImageInAlpha('create-complement/paco/images/Juego/Misil.png');
				this.setPosInXY(1440,300);
				this.velocidad=12;
				this.accCreateAnimateFunctionInShadow(function(info,optionJson){
					this.accMoveInX(-this.velocidad);
					if(this.getPosInX()<this.getWidth()*-1)
					{
						this.setPosInX(1440);
					}
				});
			});
			this.numeroDeNubes=15;
			for(var countNubes=0;countNubes<this.numeroDeNubes;countNubes++)
			{
				this.t('nube-'+countNubes).getCustom('nube');
			}
			this.t('PisoPuerto').setDimensions(1440,90).setBackgroundImageInAlpha('create-complement/paco/images/Escenario/SueloTablasMuelle.png').setPosInXY(0,365);

			this.g('Paco').getCustom('paco').setPosInXY(100,276);
			this.g('Paco').setOnClick(function(){
				this.accSaltar()
			});
			this.t('Paco').accEnMoverPies();
			this.t('Paco').posSalto=0;
			this.t('Paco').alturaSalto=120;
			this.t('Paco').numFramesInSalto=25*1;
			this.t('Paco').accSaltar=function()
			{
				this.bnSaltando=true;
			}

			this.numMisiles=3;
			for(var countMisiles=1;countMisiles<=this.numMisiles;countMisiles++)
			{
				this.t('misil_'+countMisiles).getCustom('misil').setPosInX(countMisiles*1440/this.numMisiles);
			}
		});
		this.board.bnEntroADormirUnaVez=false;
		this.board.countMoverPacoDerecha=0;
		this.board.pisoPositionBackgroundPosition=0;
		this.board.createAnimation(function(infoAnimation){
			//for(var countNubes=0;countNubes<this.numeroDeNubes;countNubes++)
			//{
				//this.t('nube-'+countNubes).accMoveInX(this.t('nube-'+countNubes).getVelocidad());
			//}
			this.t('PisoPuerto').setBackgroundPosition((-1*this.pisoPositionBackgroundPosition)+'px 0px');
			this.pisoPositionBackgroundPosition+=10;
			
			this.countMoverPacoDerecha++;

			if(this.t('Paco').bnSaltando)
			{
				if(this.accGetTrueOneTime('Posición en Y de Paco')) { this.alturaPaco=this.t('Paco').getPosInY(); }
				if(this.t('Paco').posSalto<this.t('Paco').numFramesInSalto)
				{
					this.t('Paco').posSalto++;
					var valSen=(this.t('Paco').posSalto*Math.PI)/(this.t('Paco').numFramesInSalto);
					//console.log('valSen: '+valSen);
					var valAlturaSin = this.t('Paco').alturaSalto*Math.sin(valSen);
					//console.log('valAlturaSin: '+valAlturaSin);
					var valAltura = this.alturaPaco-valAlturaSin;
					//console.log('valAltura: '+valAltura);
					this.t('Paco').setPosInY(valAltura);
				}
				else
				{
					this.accRestartGetTrueOneTime('Posición en Y de Paco');
					this.t('Paco').bnSaltando=false;
					this.t('Paco').posSalto=0;
				}
			}



		}).startAnimation();
	},
	
};	