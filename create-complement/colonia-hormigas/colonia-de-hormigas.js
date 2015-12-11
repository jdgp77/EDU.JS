var boardColoniaHormigas = EduInt.createBoardIn(document.getElementById('id_board_coloniahormigas'),'Colonia De Hormigas',500,500);
boardColoniaHormigas.start(function(){
    this.my.board = this;

    this.my.coloniaPosX=6;
    this.my.coloniaPosY=6;

    this.my.posIniInX=25;
    this.my.posIniInY=25;
    this.my.distLugarEnX=40;
    this.my.distLugarEnY=40;
    this.my.colorLugar='#AFA';
    this.my.posInXForNumber = function(numX)
    { return numX*this.distLugarEnX+this.posIniInX; }
    this.my.posInYForNumber = function(numY)
    { return numY*this.distLugarEnY+this.posIniInY; }
    this.my.nombreHormiga = function(num)
    { return 'hormiga_'+num; }
    this.my.nombreMarca = function(num)
    { return 'marca_'+num; }
    this.my.direccionAIrSegunPosibilidades=function(nombreHormiga,infoLugares)
    {
        var arPosibilidades = infoLugares[this.board.t(nombreHormiga).my.posInX][this.board.t(nombreHormiga).my.posInY].arPosiblesLugaresAIr;
        //  Pasa por todas las direcciónes de las posibilidades, y crea un arreglo, si existen 5 marcas a la derecha
        //  quedaria similar a [1,2,2,2,2,2,3,4], ahumentando sus posibilidades
        var nuevoArPosibilidades=[];
        for(var countPosibilidades=0;countPosibilidades<arPosibilidades.length;countPosibilidades++)
        {
            var direccionPosibilidad = arPosibilidades[countPosibilidades].mov;
            var nuevoNumDePosibilidades = this.board.my.marca.getValue(this.board.t(nombreHormiga).my.posInX,this.board.t(nombreHormiga).my.posInY,direccionPosibilidad);
            for(var countNuevasPosibilidades=0;countNuevasPosibilidades<nuevoNumDePosibilidades;countNuevasPosibilidades++)
            {
                nuevoArPosibilidades[nuevoArPosibilidades.length]=direccionPosibilidad;
            }
        }
        var arPosibilidades = nuevoArPosibilidades;
        var nuevoArPosibilidades=[];
        //  Multiplica todas las probabilidades por 10, salvo las que es la dirección de minima probabilidad
        for(var countPosibilidades=0;countPosibilidades<arPosibilidades.length;countPosibilidades++)
        {
            var posibilidad = arPosibilidades[countPosibilidades];

            if(this.board.t(nombreHormiga).my.direccionDeMenorProbabilidad!=posibilidad)
            {
                for(var countProbiabilidadEnDireccion=0;countProbiabilidadEnDireccion<this.board.my.addNumeroAPosibEnNuevasDir;countProbiabilidadEnDireccion++)
                {
                    nuevoArPosibilidades[nuevoArPosibilidades.length]=posibilidad;
                }
            }
            else
            {
                nuevoArPosibilidades[nuevoArPosibilidades.length]=posibilidad;
            }
        }

        return nuevoArPosibilidades[parseInt(Math.random()*nuevoArPosibilidades.length)];
    }
    this.my.direccionOpuesta=function(num)
    {
        switch(num)
        {
            case 1:
                return 3;
                break;
            case 2:
                return 4;
                break;
            case 3:
                return 1;
                break;
            case 4:
                return 2;
                break;
        }
    }
    this.my.optimizarLugaresVisitados=function(nombreHormiga)
    {
        var arLugaresVisitados = this.board.t(nombreHormiga).my.arMisLugares;
        var arHistorialDeDireccion = this.board.t(nombreHormiga).my.arHistorialDeDireccion;
        //  Contiene la llave mas pequeña de los arreglos a buscar
        var arNumLugarPorPosicion=[];
        //  Pasa por todos los lugares que tiene en registro
        //  for(var countArLugaresVisitados=arLugaresVisitados.length-1;0<=countArLugaresVisitados;countArLugaresVisitados--)
        for(var countArLugaresVisitados=0;countArLugaresVisitados<arLugaresVisitados.length;countArLugaresVisitados++)
        {
            var lugar = arLugaresVisitados[countArLugaresVisitados];

            var nombreLugar = lugar.posInX+','+lugar.posInY;
            arNumLugarPorPosicion[nombreLugar]=countArLugaresVisitados;
        }
        //  Guardara los lugares visitados cortando los repetidos
        var numNuevosLugaresVisitados=0;
        var arNuevoLugaresVisitados=[];
        var arNuevoHistorialDeDireccion=[];
        var mo=[];
        for(var countArLugaresVisitados=0;countArLugaresVisitados<arLugaresVisitados.length;countArLugaresVisitados++)
        {
            var lugar = arLugaresVisitados[countArLugaresVisitados];

            var nombreLugar = lugar.posInX+','+lugar.posInY;
            if(arNumLugarPorPosicion[nombreLugar]!=countArLugaresVisitados)
            {
                countArLugaresVisitados=arNumLugarPorPosicion[nombreLugar];
            }
            var nuevoLugar = arLugaresVisitados[countArLugaresVisitados];
            var nuevoHistorialDeDireccion = arHistorialDeDireccion[countArLugaresVisitados];
            arNuevoLugaresVisitados[numNuevosLugaresVisitados] = nuevoLugar;
            arNuevoHistorialDeDireccion[numNuevosLugaresVisitados] = nuevoHistorialDeDireccion;

            numNuevosLugaresVisitados++;
        }

        this.board.t(nombreHormiga).my.arMisLugares=arNuevoLugaresVisitados;
        this.board.t(nombreHormiga).my.arHistorialDeDireccion=arNuevoHistorialDeDireccion;
    }

    this.t('colonia').setPosition(this.my.posInXForNumber(this.my.coloniaPosX-1)-10,this.my.posInYForNumber(this.my.coloniaPosY-1)-10).setDimensions(30,30).setBackgroundColor('#F50');

    this.my.lugaresEnX=12;
    this.my.lugaresEnY=12;
    this.my.infoLugares=[];

    var lugaresEnX=this.my.lugaresEnX;
    var lugaresEnY=this.my.lugaresEnY;
    var posIniInX = this.my.posIniInX;
    var posIniInY = this.my.posIniInY;
    var distLugarEnX = this.my.distLugarEnX;
    var distLugarEnY = this.my.distLugarEnY;
    var colorLugar = this.my.colorLugar;
    for(var countLugaresEnX=0;countLugaresEnX<lugaresEnX;countLugaresEnX++)
    {
        this.my.infoLugares[countLugaresEnX]=[];
        for(var countLugaresEnY=0;countLugaresEnY<lugaresEnY;countLugaresEnY++)
        {
            //  Dependiendo del lugar puede o no moverse a ciertos lugares
            //  ----------------------------------------------------------
            //  Si esta en cualquier lugar dentro
            arPosiblesLugaresAIr=[{ mov: 1 },{ mov: 2 },{ mov: 3 },{ mov: 4 }];

            //  Si esta en un borde
            if(countLugaresEnX==0) { arPosiblesLugaresAIr=[{ mov: 1 },{ mov: 2 },{ mov: 3 }]; }
            if(countLugaresEnX==this.my.lugaresEnX-1) { arPosiblesLugaresAIr=[{ mov: 1 },{ mov: 3 },{ mov: 4 }]; }
            if(countLugaresEnY==0) { arPosiblesLugaresAIr=[{ mov: 2 },{ mov: 3 },{ mov: 4 }]; }
            if(countLugaresEnY==this.my.lugaresEnY-1) { arPosiblesLugaresAIr=[{ mov: 1 },{ mov: 2 },{ mov: 4 }]; }

            //  Si esta en una esquina
            if(countLugaresEnX==0 && countLugaresEnY==0) { arPosiblesLugaresAIr=[{ mov: 2 },{ mov: 3 }]; }
            else if(countLugaresEnX==0 && countLugaresEnY==this.my.lugaresEnY-1) { arPosiblesLugaresAIr=[{ mov: 1 },{ mov: 2 }]; }
            else if(countLugaresEnX==this.my.lugaresEnX-1 && countLugaresEnY==0) { arPosiblesLugaresAIr=[{ mov: 3 },{ mov: 4 }]; }
            else if(countLugaresEnX==this.my.lugaresEnX-1 && countLugaresEnY==this.my.lugaresEnY-1) { arPosiblesLugaresAIr=[{ mov: 1 },{ mov: 4 }]; }

            this.my.infoLugares[countLugaresEnX][countLugaresEnY]={
                arPosiblesLugaresAIr: arPosiblesLugaresAIr,
            };
            var nombreLugar='lugar_'+(countLugaresEnX+1)+'_'+(countLugaresEnY+1);
            var posicionLugarEnX=posIniInX+distLugarEnX*countLugaresEnX;
            var posicionLugarEnY=posIniInY+distLugarEnY*countLugaresEnY;
            this.t(nombreLugar).setPosition(posicionLugarEnX,posicionLugarEnY);
            this.t(nombreLugar).setBackgroundColor(colorLugar);

            //    myconsole('posicionLugar: '+posicionLugarEnX+','+posicionLugarEnY);
        }
    }


    this.my.comida = {
        board: this,
        num: 2,
        numPedasos: 40,
        color: '#FF0',
        getNombre: function(num)
        {
            return 'comida_'+num;
        },
        create: function()
        {
            for(var countComida=0;countComida<this.num;countComida++)
            {
                var nombreComida=this.getNombre(countComida);
                var posComidaEnX=parseInt(Math.random(lugaresEnX)*(12)+1);
                posComidaEnX=this.board.my.posInXForNumber(posComidaEnX-1);
                var posComidaEnY=parseInt(Math.random(lugaresEnY)*(12)+1);
                posComidaEnY=this.board.my.posInYForNumber(posComidaEnY-1);
                this.board.t(nombreComida).setPosition(posComidaEnX,posComidaEnY);

                this.board.t(nombreComida).my.pedasos=this.numPedasos;
                this.board.t(nombreComida).my.board=this.board;
                this.board.t(nombreComida).my.nombre=nombreComida;
                this.board.t(nombreComida).my.eat=function()
                {
                    if(0<this.board.t(this.nombre).my.pedasos)
                    {
                        this.board.t(this.nombre).my.pedasos--;
                    }
                    else
                    {
                        this.board.t(this.nombre).delete();
                    }
                };

                this.board.t(nombreComida).setBackgroundColor(this.color);
            }
        },
        qstnWichFootItsOver: function(nombreHormiga)
        {
            for(var countComida=0;countComida<this.num;countComida++)
            {
                var nombreComida=this.getNombre(countComida);
                //  Pregunta si encontro comida
                if(this.board.t(nombreHormiga).qstnIsThisThingOver(this.board.t(nombreComida)))
                {
                    return this.board.t(nombreComida);
                }
            }
            return false;
        },
        eatFoot: function(num)
        {
            for(var countComida=0;countComida<this.num;countComida++)
            {
                var nombreComida=this.my.nombreComida(countComida);
                //  Pregunta si encontro comida
                if(this.t(nombreHormiga).qstnIsThisThingOver(this.t(nombreComida)))
                {

                }
            }
        },
    };
    this.my.comida.create();



    this.my.addNumeroAPosibEnNuevasDir=5;
    this.my.maxNumHormigas=50;
    this.my.numHormigas=0;
    this.my.addNumHormigasIn_seconds=1;
    this.my.segLlegarAOtroPunto=1;

    //  Infocmación de la marca: this.my.infoMarcas=[{ marca: 20, posMinX: 2, posMinY: 2, posMaxX: 3, posMaxY: 2}]
    this.my.marca = {
        board: this,
        valorPorCordenadaYDirecion: [],
        cordenadeEnXPorNumLugar: [],
        cordenadeEnYPorNumLugar: [],
        direccionPorNumLugar: [],
        numValorAnteriorPorId: [],
        numValorActualPorId: [],
        nombreMarcaPorCordenadas: [],
        numPorCordenadas: [],
        numMarcas: 0,
        valorPorNumMarca: [],
        numLugar: 0,
        alfaColor: 0.5,
        valor: 15,
        minValor: 1,
        maxValor: 40,
        decreaseValor: 2,
        getColor: function(valor)
        {
            var alfaColor = valor*this.alfaColor/this.maxValor;
            if(alfaColor<this.alfaColor)
            { return 'rgba(0,0,0,'+alfaColor+')'; }
            else
            { return 'rgba(0,0,0,'+this.alfaColor+')'; }
        },
        add: function(posAnteriorInX,posAnteriorInY,posInX,posInY)
        {
            var posInXInPx = this.board.my.posInXForNumber(posInX);
            var posAnteriorInXInPx = this.board.my.posInXForNumber(posAnteriorInX);

            var posInYInPx = this.board.my.posInYForNumber(posInY);
            var posAnteriorInYInPx = this.board.my.posInYForNumber(posAnteriorInY);

            var posMinX=(posAnteriorInX<posInX?posAnteriorInX:posInX);
            var posMinY=(posAnteriorInY<posInY?posAnteriorInY:posInY);
            var posMaxX=(posAnteriorInX<posInX?posInX:posAnteriorInX);
            var posMaxY=(posAnteriorInY<posInY?posInY:posAnteriorInY);

            var posMinXInPx=(posAnteriorInXInPx<posInXInPx?posAnteriorInXInPx:posInXInPx);
            var posMinYInPx=(posAnteriorInYInPx<posInYInPx?posAnteriorInYInPx:posInYInPx);
            var posMaxXInPx=(posAnteriorInXInPx<posInXInPx?posInXInPx:posAnteriorInXInPx);
            var posMaxYInPx=(posAnteriorInYInPx<posInYInPx?posInYInPx:posAnteriorInYInPx);

            var bnPosMinXEsAnterior=true;
            if(posMinX==posInX) { bnPosMinXEsAnterior=false; }
            var bnPosMinYEsAnterior=true;
            if(posMinY==posInY) { bnPosMinYEsAnterior=false; }

            //  Marca de regreso
            //  ================
            //  ================

            //  Distingue la dirección
            //  ======================

            //  Si el movimiento es en X
            if(posAnteriorInY == posInY)
            {
                if(bnPosMinXEsAnterior) { var dirAnterior=2; var dirActual=4; } else { var dirAnterior=4; var dirActual=2; }
                var direncionEn='X';
            }
            //  Si el movimiento es en Y
            else if(posAnteriorInX == posInX)
            {
                if(bnPosMinYEsAnterior) { dirAnterior=3; var dirActual=1; } else { dirAnterior=1; var dirActual=3; }
                var direncionEn='Y';
            }

            //  Coloca la estadistica
            //  =====================

            //  Colocar lugar anterior
            //  ----------------------
            if(this.board.my.marca.valorPorCordenadaYDirecion[posAnteriorInX]===undefined) { this.board.my.marca.valorPorCordenadaYDirecion[posAnteriorInX]=[]; }
            if(this.board.my.marca.valorPorCordenadaYDirecion[posAnteriorInX][posAnteriorInY]===undefined) { this.board.my.marca.valorPorCordenadaYDirecion[posAnteriorInX][posAnteriorInY]=[]; }
            //  Si no existe le asigna el valor por defecto
            if(this.board.my.marca.valorPorCordenadaYDirecion[posAnteriorInX][posAnteriorInY][dirAnterior]===undefined)
            {
                this.board.my.marca.valorPorCordenadaYDirecion[posAnteriorInX][posAnteriorInY][dirAnterior]=this.valor;
                //  Guarda las llaves de la marca segun un numero de lugar
                this.cordenadeEnXPorNumLugar[this.numLugar]=posAnteriorInX;
                this.cordenadeEnYPorNumLugar[this.numLugar]=posAnteriorInY;
                this.direccionPorNumLugar[this.numLugar]=dirAnterior;
                this.numLugar++;
            }
            //  Si ya existe le asigna suma el valor por defecto
            else
            {
                if(this.board.my.marca.valorPorCordenadaYDirecion[posAnteriorInX][posAnteriorInY][dirAnterior]<this.maxValor-this.valor)
                {  this.board.my.marca.valorPorCordenadaYDirecion[posAnteriorInX][posAnteriorInY][dirAnterior]+=this.valor; }
                else
                {  this.board.my.marca.valorPorCordenadaYDirecion[posAnteriorInX][posAnteriorInY][dirAnterior]=this.maxValor; }
            }


            //  Colocar lugar actual
            //  --------------------
            if(this.board.my.marca.valorPorCordenadaYDirecion[posInX]===undefined) { this.board.my.marca.valorPorCordenadaYDirecion[posInX]=[]; }
            if(this.board.my.marca.valorPorCordenadaYDirecion[posInX][posInY]===undefined) { this.board.my.marca.valorPorCordenadaYDirecion[posInX][posInY]=[]; }
            //  Si no existe le asigna el valor por defecto
            if(this.board.my.marca.valorPorCordenadaYDirecion[posInX][posInY][dirActual]===undefined)
            {
                this.board.my.marca.valorPorCordenadaYDirecion[posInX][posInY][dirActual]=this.valor;
                //  Guarda las llaves de la marca segun un numero de lugar
                this.cordenadeEnXPorNumLugar[this.numLugar]=posInX;
                this.cordenadeEnYPorNumLugar[this.numLugar]=posInY;
                this.direccionPorNumLugar[this.numLugar]=dirActual;
                this.numLugar++;
            }
            //  Si ya existe le asigna suma el valor por defecto
            else
            {
                if(this.board.my.marca.valorPorCordenadaYDirecion[posInX][posInY][dirActual]<this.maxValor-this.valor)
                {  this.board.my.marca.valorPorCordenadaYDirecion[posInX][posInY][dirActual]+=this.valor; }
                else
                {  this.board.my.marca.valorPorCordenadaYDirecion[posInX][posInY][dirActual]=this.maxValor; }
            }

            //  Cuanto valor le asignamos a esta marca
            var valorAsignado = this.board.my.marca.valorPorCordenadaYDirecion[posInX][posInY][dirActual];

            //  Informa si la marca ya existe
            var bnMarcaYaExiste=true;
            if(this.nombreMarcaPorCordenadas[posMinX]==undefined)
            {  this.nombreMarcaPorCordenadas[posMinX]=[]; bnMarcaYaExiste=false; }
            if(this.nombreMarcaPorCordenadas[posMinX][posMinY]==undefined)
            {  this.nombreMarcaPorCordenadas[posMinX][posMinY]=[]; bnMarcaYaExiste=false; }
            if(this.nombreMarcaPorCordenadas[posMinX][posMinY][posMaxX]==undefined)
            {  this.nombreMarcaPorCordenadas[posMinX][posMinY][posMaxX]=[]; bnMarcaYaExiste=false; }
            if(this.nombreMarcaPorCordenadas[posMinX][posMinY][posMaxX][posMaxY]==undefined)
            {  bnMarcaYaExiste=false; }

            //  SI son diferentes envia un error
            if(this.board.my.marca.valorPorCordenadaYDirecion[posAnteriorInX][posAnteriorInY][dirAnterior]!=this.board.my.marca.valorPorCordenadaYDirecion[posInX][posInY][dirActual])
            { console.error('El mismo valor de la marca es diferente en dos direcciónes: '+'this.board.my.marca.valorPorCordenadaYDirecion['+posAnteriorInX+']['+posAnteriorInY+']['+dirAnterior+']('+this.board.my.marca.valorPorCordenadaYDirecion[posAnteriorInX][posAnteriorInY][dirAnterior]+')!=this.board.my.marca.valorPorCordenadaYDirecion['+posInX+']['+posInY+']['+dirActual+']('+this.board.my.marca.valorPorCordenadaYDirecion[posInX][posInY][dirActual]+')'); }

            if(!bnMarcaYaExiste)
            {
                //  La dibuja
                //  =========

                //  Si el movimiento es en X
                var nombreMarca = this.board.my.nombreMarca(this.numMarcas);
                this.nombreMarcaPorCordenadas[posMinX][posMinY][posMaxX][posMaxY]=nombreMarca;

                //  Guarda el numero de marca segun las cordenadas
                if(this.numPorCordenadas[posMinX]==undefined)
                {  this.numPorCordenadas[posMinX]=[]; }
                if(this.numPorCordenadas[posMinX][posMinY]==undefined)
                {  this.numPorCordenadas[posMinX][posMinY]=[]; }
                if(this.numPorCordenadas[posMinX][posMinY][posMaxX]==undefined)
                {  this.numPorCordenadas[posMinX][posMinY][posMaxX]=[]; }
                if(this.numPorCordenadas[posMinX][posMinY][posMaxX][posMaxY]==undefined)
                {  this.numPorCordenadas[posMinX][posMinY][posMaxX][posMaxY]=this.numMarcas; }

                if(direncionEn==='X')
                {
                    this.board.t(nombreMarca).setDimensions(this.board.my.distLugarEnX-10,10).setPosition(posMinXInPx+10,posAnteriorInYInPx).setBackgroundColor(this.getColor(valorAsignado));
                }
                //  Si el movimiento es en Y
                else if(direncionEn==='Y')
                {
                    this.board.t(nombreMarca).setDimensions(10,this.board.my.distLugarEnY-10).setPosition(posAnteriorInXInPx,posMinYInPx+10).setBackgroundColor(this.getColor(valorAsignado));
                }

                this.valorPorNumMarca[this.numMarcas]=valorAsignado;
                this.numMarcas++;
            }
            else
            {
                //  Colorea
                //  =======

                var nombreMarca = this.nombreMarcaPorCordenadas[posMinX][posMinY][posMaxX][posMaxY];

                if(direncionEn==='X')
                {
                    this.board.t(nombreMarca).setBackgroundColor(this.getColor(valorAsignado));
                }
                //  Si el movimiento es en Y
                else if(direncionEn==='Y')
                {
                    this.board.t(nombreMarca).setBackgroundColor(this.getColor(valorAsignado));
                }
                this.valorPorNumMarca[this.numPorCordenadas[posMinX][posMinY][posMaxX][posMaxY]]=valorAsignado;
            }
        },
        //  Retorna 1 por defecto, o el nuevo valor si existe
        getValue: function(posInX,posInY,direccion)
        {
            if(this.valorPorCordenadaYDirecion[posInX]===undefined)
            { return 1; }
            if(this.valorPorCordenadaYDirecion[posInX][posInY]===undefined)
            { return 1; }
            if(this.valorPorCordenadaYDirecion[posInX][posInY][direccion]===undefined)
            { return 1; }
            else
            {
                return this.valorPorCordenadaYDirecion[posInX][posInY][direccion];
            }
        },
        //  Baja 1 a todas las marcas
        decrease: function()
        {
            //  Pasa por todos los lugares, y le disminute un poco de la marca
            for(var countLugares=0;countLugares<this.numLugar;countLugares++)
            {
                var posInX=this.cordenadeEnXPorNumLugar[countLugares];
                var posInY=this.cordenadeEnYPorNumLugar[countLugares];
                var dirActual=this.direccionPorNumLugar[countLugares];

                if(this.minValor<this.valorPorCordenadaYDirecion[posInX][posInY][dirActual]-this.decreaseValor)
                {  this.valorPorCordenadaYDirecion[posInX][posInY][dirActual]-=this.decreaseValor; }
                else
                {  this.valorPorCordenadaYDirecion[posInX][posInY][dirActual]=this.minValor; }
            }

            for(var countMarcas=0;countMarcas<this.numMarcas;countMarcas++)
            {
                var nombreMarca = this.board.my.nombreMarca(countMarcas);

                if(this.minValor<this.valorPorNumMarca[countMarcas]-this.decreaseValor)
                {  this.valorPorNumMarca[countMarcas]-=this.decreaseValor; }
                else
                {  this.valorPorNumMarca[countMarcas]=this.minValor; }

                this.board.t(nombreMarca).setBackgroundColor(this.getColor(this.valorPorNumMarca[countMarcas]));
            }
        },
    };


});

boardColoniaHormigas.createAnimation(function(info){
    //  Cuando salen nuevas hormigas
    if(this.my.numHormigas<this.my.maxNumHormigas)
    {
        if(info.timeInSeconds%this.my.addNumHormigasIn_seconds==0 || info.numFrame==1)
        {
            var nombreHormiga=this.my.nombreHormiga(this.my.numHormigas+1);
            this.t(nombreHormiga).setPosition(this.my.posInXForNumber(this.my.coloniaPosX-1),this.my.posInYForNumber(this.my.coloniaPosY-1));
            this.t(nombreHormiga).my.posInX=this.my.coloniaPosX-1;
            this.t(nombreHormiga).my.posInY=this.my.coloniaPosY-1;
            this.t(nombreHormiga).my.arHistorialDeDireccion=[];
            this.t(nombreHormiga).my.modoHormiga='busca comida';
            this.t(nombreHormiga).my.numMovHormigaAntDeComida=0;
            this.t(nombreHormiga).my.moviendoEnDireccion=0;
            this.t(nombreHormiga).my.arMisLugares=[];
            this.t(nombreHormiga).setImageUrl('http://developers.myrtools.com/einteractiva/create-complement/colonia-hormigas/images/hormiga.png').setBackgroundColor('transparent');
            this.my.numHormigas++;
        }
    }

    //  Asigna nuevos movimientos a todas las hormigas
    if(info.timeInSeconds%this.my.segLlegarAOtroPunto==0 || info.numFrame==1)
    {
        for(var countHormigas=0;countHormigas<this.my.numHormigas;countHormigas++)
        {
            var nombreHormiga = this.my.nombreHormiga(countHormigas+1);

            //  Averigual cual fue el ultimo movimiento y deacuerdo a ese coloca su posicion en X y Y
            if(this.t(nombreHormiga).my.moviendoEnDireccion!=0)
            {
                //  Donde estaba antes
                this.t(nombreHormiga).my.posAnteriorInX=this.t(nombreHormiga).my.posInX;
                this.t(nombreHormiga).my.posAnteriorInY=this.t(nombreHormiga).my.posInY;

                //  Donde esta ahora
                if(this.t(nombreHormiga).my.moviendoEnDireccion==1) {
                    this.t(nombreHormiga).my.posInY-=1;
                }
                else if(this.t(nombreHormiga).my.moviendoEnDireccion==2) {
                    this.t(nombreHormiga).my.posInX+=1;
                }
                else if(this.t(nombreHormiga).my.moviendoEnDireccion==3) {
                    this.t(nombreHormiga).my.posInY+=1;
                }
                else if(this.t(nombreHormiga).my.moviendoEnDireccion==4) {
                    this.t(nombreHormiga).my.posInX-=1;
                }

                //  Coloca una marca en el lugar anterior
                if(this.t(nombreHormiga).my.modoHormiga=='regresa a casa')
                {
                    var posAnteriorInX = this.t(nombreHormiga).my.posAnteriorInX;
                    var posAnteriorInY = this.t(nombreHormiga).my.posAnteriorInY;

                    var posInX = this.t(nombreHormiga).my.posInX;
                    var posInY = this.t(nombreHormiga).my.posInY;

                    this.my.marca.add(posAnteriorInX,posAnteriorInY,posInX,posInY);
                }

                //  Llega de nuevo al origen
                if(this.t(nombreHormiga).my.numMovHormigaAntDeComida==0)
                {
                    this.t(nombreHormiga).my.modoHormiga='busca comida';
                    this.t(nombreHormiga).my.arMisLugares=[];
                }
            }

            //  Averigua si encontro comida
            var comida = this.my.comida.qstnWichFootItsOver(nombreHormiga);
            if(comida!=false)
            {
                this.t(nombreHormiga).my.modoHormiga='regresa a casa';
                comida.my.eat();
            }

            //  Si la hormiga esta buscando comida
            if(this.t(nombreHormiga).my.modoHormiga=='busca comida')
            {

                var numDireccionMovimiento = this.my.direccionAIrSegunPosibilidades(nombreHormiga, this.my.infoLugares);
                this.t(nombreHormiga).my.direccionDeMenorProbabilidad=this.my.direccionOpuesta(numDireccionMovimiento);
                this.t(nombreHormiga).my.moviendoEnDireccion=numDireccionMovimiento;
                this.t(nombreHormiga).my.arHistorialDeDireccion[this.t(nombreHormiga).my.numMovHormigaAntDeComida]=numDireccionMovimiento;

                //  Registra este nuevo lugar para guardar
                this.t(nombreHormiga).my.arMisLugares[this.t(nombreHormiga).my.arMisLugares.length]={ posInX: this.t(nombreHormiga).my.posInX, posInY: this.t(nombreHormiga).my.posInY }
                //  Optimiza el resultado
                this.my.optimizarLugaresVisitados(nombreHormiga);
//  WARNING
//  Cuando arreglemos esto, tiene que quedar cambiado segun el numero de lugares
                this.t(nombreHormiga).my.numMovHormigaAntDeComida=this.t(nombreHormiga).my.arMisLugares.length;//=this.t(nombreHormiga).my.arMisLugares.length;
            }
            else if(this.t(nombreHormiga).my.modoHormiga=='regresa a casa')
            {
                this.t(nombreHormiga).my.numMovHormigaAntDeComida--;
                var numDireccionMovimiento = this.t(nombreHormiga).my.arHistorialDeDireccion[this.t(nombreHormiga).my.numMovHormigaAntDeComida];
                //  Coloca la dirección contraria
                if(numDireccionMovimiento==1) { numDireccionMovimiento=3; }
                else if(numDireccionMovimiento==2) { numDireccionMovimiento=4; }
                else if(numDireccionMovimiento==3) { numDireccionMovimiento=1; }
                else if(numDireccionMovimiento==4) { numDireccionMovimiento=2; }
                this.t(nombreHormiga).my.moviendoEnDireccion=numDireccionMovimiento;
            }

            //  Cambia la imagen de la hormiga de dirección
            switch(numDireccionMovimiento)
            {
                case 1:
                    this.t(nombreHormiga).setBackgroundPosition('0px 0px');
                    break;
                case 2:
                    this.t(nombreHormiga).setBackgroundPosition('10px 0px');
                    break;
                case 3:
                    this.t(nombreHormiga).setBackgroundPosition('10px 10px');
                    break;
                case 4:
                    this.t(nombreHormiga).setBackgroundPosition('0px 10px');
                    break;
            }

        }
        this.my.marca.decrease();
    }

    //  Pasa por cada una de las hormigas y las mueve
    for(var countHormigas=0;countHormigas<this.my.numHormigas;countHormigas++)
    {
        var nombreHormiga=this.my.nombreHormiga(countHormigas+1);
        var hormiga=this.t(nombreHormiga);
        if(this.t(nombreHormiga).my.moviendoEnDireccion==1)
        { hormiga.accMoveTop(this.my.distLugarEnX).inSeconds(this.my.segLlegarAOtroPunto); }
        else if(this.t(nombreHormiga).my.moviendoEnDireccion==2)
        { hormiga.accMoveRight(this.my.distLugarEnX).inSeconds(this.my.segLlegarAOtroPunto); }
        else if(this.t(nombreHormiga).my.moviendoEnDireccion==3)
        { hormiga.accMoveButton(this.my.distLugarEnX).inSeconds(this.my.segLlegarAOtroPunto); }
        else if(this.t(nombreHormiga).my.moviendoEnDireccion==4)
        { hormiga.accMoveLeft(this.my.distLugarEnX).inSeconds(this.my.segLlegarAOtroPunto); }
    }
}).startAnimation();
