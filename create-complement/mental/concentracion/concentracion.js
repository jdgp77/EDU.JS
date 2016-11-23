var eBoardMemConc = document.getElementById('id_mente_concentracion');
var BoardMemConc = EduInt.createBoardIn(eBoardMemConc,'concentracion',400,400);
BoardMemConc.setBackgroundImage('create-complement/mental/concentracion/images/Fondo.png').setBackgroundSize('cover');

BoardMemConc.start(function(info){
    //  Balores por defecto
    //  ===================
    this.setDefaultPaths({ images: 'https://storage.googleapis.com/datos-educacion-interactiva/imagenes/concentracion/juego1/' });

    //  Añade el teclado al tabler
    //  ==========================
    this.accAddKeyboard.arrows();

    //  Atributos custom de los things
    //  ==============================
    this.setCustom('flecha',function()
    {
        //  Variables
        this.numFlechas=0;
        this.FlechaArriba = { alto: 54, ancho: 69 };
        this.cercaniaFlecha=18;

        //  Funçiones
        this.main=function()
        {
            this.setDirection(this.direction);
        };
        this.setDirection=function(direction)
        {
            //  Set default Actions
            this.setBackgroundImageInAlpha('flechas.png');
            //  Guardamos la dirección
            this.direction=direction;
            //  Coloca la flecha como no seleccionada
            this.unSelect();
            //  De acurdo a la dirección ordenamos lo demas 
            switch(this.direction)
            {
                case '1':
                case 'arriba':
                    this.setDimensions(this.FlechaArriba.ancho,this.FlechaArriba.alto);
                    break;
                case '2':
                case 'derecha':
                    this.setDimensions(this.FlechaArriba.alto,this.FlechaArriba.ancho);
                    break;
                case '3':
                case 'abajo':
                    this.setDimensions(this.FlechaArriba.ancho,this.FlechaArriba.alto);
                    break;
                case '4':
                case 'izquierda':
                    this.setDimensions(this.FlechaArriba.alto,this.FlechaArriba.ancho);
                    break;
            }
            return this;
        };
        this.setGameControlPosition=function(originInX,originInY)
        {
            //  this.setPosition();
            switch(this.direction)
            {
                case '1':
                case 'arriba':
                    this.setPosition(originInX+this.FlechaArriba.alto-this.cercaniaFlecha,originInY);
                    break;
                case '2':
                case 'derecha':
                    this.setPosition(originInX+this.FlechaArriba.alto+this.FlechaArriba.ancho-this.cercaniaFlecha*2,originInY+this.FlechaArriba.alto-this.cercaniaFlecha);
                    break;
                case '3':
                case 'abajo':
                    this.setPosition(originInX+this.FlechaArriba.alto-this.cercaniaFlecha,originInY+this.FlechaArriba.alto+this.FlechaArriba.ancho-this.cercaniaFlecha*2);
                    break;
                case '4':
                case 'izquierda':
                    this.setPosition(originInX,originInY+this.FlechaArriba.alto-this.cercaniaFlecha);
                    break;
            }
            return this;
        };
        this.select=function()
        {
            switch(this.direction)
            {
                case '1':
                case 'arriba':
                    this.setBackgroundPosition('-'+(this.FlechaArriba.ancho)+'px 0px');
                    break;
                case '2':
                case 'derecha':
                    this.setBackgroundPosition('-'+(this.FlechaArriba.ancho*2)+'px -'+(this.FlechaArriba.ancho)+'px');
                    break;
                case '3':
                case 'abajo':
                    this.setBackgroundPosition('-'+(this.FlechaArriba.alto)+'px -'+(this.FlechaArriba.ancho*2)+'px');
                    break;
                case '4':
                case 'izquierda':
                    this.setBackgroundPosition('0px -'+(this.FlechaArriba.alto)+'px');
                    break;
            }
            return this;
        };
        this.unSelect=function()
        {
            switch(this.direction)
            {
                case '1':
                case 'arriba':
                    this.setBackgroundPosition('0px 0px');
                    break;
                case '2':
                case 'derecha':
                    this.setBackgroundPosition('-'+(this.FlechaArriba.ancho*2)+'px 0px');
                    break;
                case '3':
                case 'abajo':
                    this.setBackgroundPosition('-'+(this.FlechaArriba.ancho+this.FlechaArriba.alto)+'px -'+(this.FlechaArriba.ancho*2)+'px');
                    break;
                case '4':
                case 'izquierda':
                    this.setBackgroundPosition('0px -'+(this.FlechaArriba.ancho+this.FlechaArriba.alto)+'px');
                    break;
            }
            return this;
        };
        //  Ejecutar el main
        this.main();
    });

    this.setCustom('_MessageGood',function(){
        this.setPosition(250,200);
    });
    this.setCustom('_MessageWrong',function(){
        this.setPosition(80,200);
    });

    //  Things por defecto
    //  ==================
    this.t('flecha-arriba').getCustom('flecha').setDirection('arriba').setGameControlPosition(125,40);
    this.t('flecha-derecha').getCustom('flecha').setDirection('derecha').setGameControlPosition(125,40);
    this.t('flecha-abajo').getCustom('flecha').setDirection('abajo').setGameControlPosition(125,40);
    this.t('flecha-izquierda').getCustom('flecha').setDirection('izquierda').setGameControlPosition(125,40);

    this.t('puntos-correctos').setType('text').setValue(0).setPosition(0,0);
    this.t('puntos-total').setType('text').setValue(0).setPosition(0,20);

    //  Funciones
    //  =========
    this.unPuntoMas = function()
    {
        this.t('puntos-total').setValue(parseInt(this.t('puntos-total').getValue())+1);
    }
    this.valorCorrecto = function()
    {
        this.t('puntos-correctos').setValue(parseInt(this.t('puntos-correctos').getValue())+1);
        this.accSendMessage.good();
        this.unPuntoMas();
    }
    this.valorIncorrecto = function()
    {
        this.unPuntoMas();
        this.accSendMessage.wrong();
    }

    //  Añade eventos
    //  =============
    this.accAddEventFunction('keydown',function(event) {
        switch(event.keyCode)
        {
            //  Arriba
            case 38:
                if(this.direccionCorrecta=='arriba')
                { this.valorCorrecto(); }
                else
                { this.valorIncorrecto(); }
                break;
            //  Derecha
            case 39:
                if(this.direccionCorrecta=='derecha')
                { this.valorCorrecto(); }
                else
                { this.valorIncorrecto(); }
                break;
            //  Abajo
            case 40:
                if(this.direccionCorrecta=='abajo')
                { this.valorCorrecto(); }
                else
                { this.valorIncorrecto(); }
                break;
            //  Izquierda
            case 37:
                if(this.direccionCorrecta=='izquierda')
                { this.valorCorrecto(); }
                else
                { this.valorIncorrecto(); }
                break;
        }
        this.selectNewDirection=true;
    });

    this.selectNewDirection=true;

    this.g('__KeyBoard').setPosition(110,250)
});

BoardMemConc.createAnimation(function(info){

    if(this.selectNewDirection)
    {
        this.t('flecha-arriba').unSelect();
        this.t('flecha-derecha').unSelect();
        this.t('flecha-abajo').unSelect();
        this.t('flecha-izquierda').unSelect();
        switch(EduInt.Basic.randomInt(1,4))
        {
            case 1:
                this.t('flecha-arriba').select();
                this.direccionCorrecta='arriba';
                break;
            case 2:
                this.t('flecha-derecha').select();
                this.direccionCorrecta='derecha';
                break;
            case 3:
                this.t('flecha-abajo').select();
                this.direccionCorrecta='abajo';
                break;
            case 4:
                this.t('flecha-izquierda').select();
                this.direccionCorrecta='izquierda';
                break;
        }
        this.selectNewDirection=false;
    }
}).startAnimation();

