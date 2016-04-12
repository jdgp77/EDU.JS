//  _EduInt Funciones Basicas
//  ========================
//  ========================
_EduIntBasic = {

    //  Genera un numero aleatorio
    //  1,1.2,1.423
    random: function(value1,value2){ return this._random(value1,value2); },
    _random: function(value1,value2) {
        if(value2==undefined) { value2=1; }
        if(value1==undefined) { value1=0; }
        return Math.random()*(value2-value1)+value1;
    },
    //  1,2,3,4,5 <= _EduInt._Basic.randomInt(1,5)
    //  1,2,3,4 <= _EduInt._Basic.randomInt(4)
    randomInt: function(value1,value2){ return this._randomInt(value1,value2); },
    _randomInt: function(value1,value2) {
        if(value2==undefined) { value2=1; }
        if(value1==undefined) { value1=0; }
        return parseInt(Math.random()*(value2-value1+1)+value1);
    },

    //  Une dos diferentes json para añadir las opciones por defecto
    //  { nombre: 'juan', instituto: 'ssa' } <= defaultOptions({ nombre: 'juan' },{ nombre: '', instituto: 'ssa' })
    defaultJson: function(newJson,defaultJson) { return this._defaultJson(newJson,defaultJson); },
    _defaultJson: function(newJson,defaultJson)
    {
        //  Si no efxisten nuevos datos retorna el defaultJson
        if(newJson===undefined) { return defaultJson; }
        for(keyDefaultJson in defaultJson) { if(newJson[keyDefaultJson]===undefined) { newJson[keyDefaultJson] = defaultJson[keyDefaultJson]; } }
        return newJson;
    },

    //  Calcula la posicion en X de un elemento
    posInX: function(object) { return this._posInX(); },
    _posInX: function(object)
    {
        var curleft = 0;
        if(object.offsetParent)
        {
            while(1)
            {
                curleft += object.offsetLeft;
                if(!object.offsetParent) { break; }
                object = object.offsetParent;
            }
        }
        else
        {
            if(object.x)
            { curleft += object.x; }
        }
        return curleft;
    },
    //  Calcula la posicion en Y de un elemento
    posInX: function(object) { return this._posInY(); },
    _posInY: function(object)
    {
        var curtop = 0;
        if(object.offsetParent)
        {
            while(1)
            {
                curtop += object.offsetTop;
                if(!object.offsetParent)
                    break;
                object = object.offsetParent;
            }
        }
        else if(object.y)
        { curtop += object.y; }
        return curtop;
    },

    //  Es el filtro basico de mediads, en caso de no existir, coloca pixeles
    //  '12px' <= measure(12);
    //  '12%' <= measure('12%'');
    measure: function(measure) { return this._measure(measure); },
    _measure: function(measure)
    {
        //  Si es un numero
        if(!isNaN(measure)) { return measure+'px'; }
        //  Si es otra cosa
        else { return measure; }
    },

    qstnIsArray: function(myArray) { return this._qstnIsArray(myArray); },
    _qstnIsArray: function(myArray) {
        return myArray.constructor.toString().indexOf("Array") > -1;
    },



    //  Deprecate
    //  =========

    setDefaultOptions: function(newJson,defaultJson) { this._defaultJson(newJson,defaultJson); },
    getPosInXCursorForEvent: function(event) { return _EduInt._Cursor._getPosInX(event); },
    getPosInYCursorForEvent: function(event) { return _EduInt._Cursor._getPosInY(event); },
    addThingInputFunctions: function(Thing) { _EduInt._Thing._Type._InputFunctions(Thing); },
    addThingTextFunctions: function(Thing) { _EduInt._Thing._Type._TextFunctions(Thing); },
    addThingStyleBlockFunctions: function(Thing) { _EduInt._Thing._Type._DisplayBlockFunctions(Thing); },
    addThingCommon: function(Thing) { _EduInt._Thing._Type._DefaultFunctions(Thing); },
    qstns: { isThisThingOver: function(this_Thing,other_Thing) { return  _EduInt._Thing._Type._Qstns.isThisThingOver(this_Thing,other_Thing); } },
    createPersonalizedType: function(Thing) { _EduInt._Thing._Type._ccreatePersonalizedTypereatePersonalizedFunction(Thing); },
    //  createPersonalizedTypecreatePersonalizedType: function(numBoard) { _EduInt._Board._qstnIssetBoard(numBoard); },
    posEnX: function(object) { return this._posInX(object); },
    posEnY: function(object) { return this._posInY(object); },
    isArray: function(myArray) { return this._qstnIsArray(myArray);  },
    // addThingStyleBlockFunctions: function(Thing) { _EduInt._Thing._Type._(Thing); }
};

//  Framework _EduInt
//  ================
//  ================
//  Este se encarga de unir diferentes librerias, para generar un
//  framework que ayuda a crear juegos educativos.
_EduInt = {
    //  Basicas
    //  ======
    //  Todas las funciones basicas
    _Basic: _EduIntBasic,
    //  Cursor
    //  ======
    //  Maneja todas las variable y eventos del cursor, sea touch o sea mouse
    _Cursor: {
        posInX: 0,
        posInY: 0,
        getPosInX: function(event) { return this._getPosInX(event); },
        _getPosInX: function(event){
            //  En caso de ser touch
            if(event.targetTouches)
            {
                //  Habilitado para touch
                var t=event.targetTouches;
                //  Posicion en x y y del mouse, con respecto al 0,0 del canvas
                return t[0].pageX;//-findPosX_ESt(_arOCanvas_ESt[noLienso].id);
            }
            //  En caso de ser mouse
            else
            {
                //  Posicion en x y y del mouse, con respecto al 0,0 del canvas
                return event.pageX;
            }
        },
        getPosInY: function(event) { return this._getPosInY(event); },
        _getPosInY: function(event){
            //  En caso de ser touch
            if(event.targetTouches)
            {
                //  Habilitado para touch
                var t=event.targetTouches;
                //  Posicion en x y y del mouse, con respecto al 0,0 del canvas
                return t[0].pageY;//-findPosY_ESt(_arOCanvas_ESt[noLienso].id);
            }
            //  En caso de ser mouse
            else
            {
                //  Posicion en x y y del mouse, con respecto al 0,0 del canvas
                return event.pageY;
            }
        },

        //  Habilita el detectar la posicion del mouse o el touch
        bnCreatedMouseMovement: false,
        enMovementDetect: function() { this._enMovementDetect(); },
        _enMovementDetect: function()
        {
            if(!this.bnCreatedMouseMovement)
            {
                document.addEventListener('mousemove',this.oncursormove,false);
                document.addEventListener('touchmove',this.oncursormove,false);
            }
        },
        oncursormove: function(evento) { _EduInt._Cursor._oncursormove(evento); },
        _oncursormove: function(evento)
        {
            //  En caso de ser touch
            this.posInX=_EduInt._Basic.getPosInXCursorForEvent(event);
            this.posInY=_EduInt._Basic.getPosInYCursorForEvent(event);
            //  console.info('this.posInX: '+this.posInX);
            //  console.info('this.posInY: '+this.posInY);

            //  Pasa por cada uno de los tableros, calculando su posicion con
            //  respecto a cada uno de ellos
            for(var contBoards=0;contBoards<_EduInt._Board._ar.length;contBoards++){

                var Board = _EduInt._Board._ar[contBoards];

                //  Posicion del tablero, esquina superior-izquierda
                var boardPosInX = Board._getPosInX();
                var boardPosInY = Board._getPosInY();
                //  Posicion del cursor, con relación a la esquina superior-izquierda
                var boardMousePosInX = this.posInX-boardPosInX;
                var boardMousePosInY = this.posInY-boardPosInY;
                //  console.info('boardMousePosInX: '+boardMousePosInX);
                //  console.info('boardMousePosInY: '+boardMousePosInY);
                //  Registra la posicion del cursor, con relación a la esquina superior-izquierda
                Board._setMousePosInX(boardMousePosInX);
                Board._setMousePosInY(boardMousePosInY);

                //  Informa si el cursor esta o no encima del tablero
                if(boardMousePosInX<0 || boardMousePosInY<0)
                { Board._setIsMouseHover(false); }
                else if(Board._getWidth()<=boardMousePosInX || Board._getHeight()<=boardMousePosInY)
                { Board._setIsMouseHover(false); }
                else
                {
                    Board._setIsMouseHover(true);
                    evento.preventDefault();
                }
            }
        },
    },

    //  Animation
    //  =========
    _Animation: {
        //  Arreglo de las animaciónes
        _ar: [],
        //  Tiene como llave el numero de pasos por segundo de cada animación
        //  Y retorna el numero del arrelgo que tiene esta animacion en
        //  numAnimation <- arAnimation[stepsPerSecond];
        _arStepPerSecond: [],
        //  Crea una animación, en caso de tener los mismos pasos
        //  por segundo que una ya creada, este usa esta.
        _create: function(stepsPerSecond)
        {
            //  Si no tiene pasos por segundo asume que son 25
            if(stepsPerSecond===undefined) { stepsPerSecond=25; }
            //  Si ya existe una animación con ese numero de pasos
            if(this._arStepPerSecond[stepsPerSecond]!==undefined)
            {
                //  Guarda la animación ya creada
                var animation = this._ar[this._arStepPerSecond[stepsPerSecond]];
            }
            //  Si NO existe una animación con ese numero de pasos
            else
            {
                //  Numero de la nueva animación
                var numAnimations = this._ar.length;
                //  Guarda en un arreglo cada animació
                var animation = new _EduInt._Animation._Animation(stepsPerSecond);
                this._ar[numAnimations] = animation;
                //  Guarda el numero de la animación teniendo como llave
                //  el numero de pasos
                this._arStepPerSecond[stepsPerSecond]=numAnimations;
            }
            //  Retorna la animación creada
            return animation;
        },
        //  Objeto para animaciónes
        _Animation: function(stepsPerSecond) {
            //  (Animation)
            //  numero de la animacoión
            this.numAnimacion=_EduInt._Animation._ar.length;
            //  (Animation)
            //  Si y esta corriendo la animación
            this.bnRunAnimation=false;
            //  (Animation)
    //  ALERT - Comentar
            //  Arreglo con los ultimos movimientos
            this.arUltimosMovimientos=[];
            //  (Animation)
    //  ALERT - Comentar
    //  Alerta paree ser este el mismo stepsPerSecond
            this.numRegistroUltimosMovimientos = 25;
            //  (Animation)
    //  ALERT - Comentar
            //  Numero de pasos
            this.stepsPerSecond=stepsPerSecond;
            //  (Animation)
            //  Retorna el numero de pasos por Segundo
            this.getStepsPerSecond=function()
            {
                return this.stepsPerSecond;
            }
            //  (Animation)
            //  Inicia la animación
            this.start=function()
            {
                //  Si y esta corriendo la animación
                this.bnRunAnimation=true;
                //  Inicia el numero de pasos
                if(this.numPasos==undefined) { this.numPasos=0; }
                //  Cuando incio este
                this.milisegundosInicio=this.milisegundosAhora();
                //  Inicia la animación
                this.animate();
            }
            //  (Animation)
            //  Pausa la animación
            this.pause=function()
            { this.bnRunAnimation=false; }
            //  (Animation)
            //  Finaliza la animación
            this.stop=function()
            {
                this.pause();
                //  Pasos caminados
                this.numPasos=0;
            }
            //  (Animation)
            this.deleteFunction=function(numFunction)
            {
                this.arFunctionsAnimated[numFunction]=undefined;
                this.arFunctionsAnimated_json[numFunction]=undefined;
                this.arFunctionsAnimated_father[numFunction]=undefined;
            }
            //  (Animation)
            this.deleteFunctions=function(numFunction)
            {
                for(var countFunctionsAnimated=0;countFunctionsAnimated<this.arFunctionsAnimated.length;countFunctionsAnimated++)
                {
                    this.deleteFunction(countFunctionsAnimated);
                }
                //  TOdas las funciones para animar
                this.arFunctionsAnimated = [];
                //  Los datos que ingresan a esa funcion a animar
                this.arFunctionsAnimated_json = [];
                //  El padre de esa funcion a animar
                this.arFunctionsAnimated_father = [];
            }
            //  (Animation)
    //  ALERT - Comentar
            //  Finaliza la animación
            this.restart=function()
            { this.stop(); this.start(); }
            //  TOdas las funciones para animar
            this.arFunctionsAnimated = [];
            //  (Animation)
    //  ALERT - Comentar
            //  Los datos que ingresan a esa funcion a animar
            this.arFunctionsAnimated_json = [];
            //  (Animation)
            //  El padre de esa funcion a animar
            this.arFunctionsAnimated_father = [];
    //  ALERT - Comentar
            //  Valor de la función predefinida
            this.arBnEnFunctionsAnimated = [];
    //  ALERT - Comentar
            //  Numero de pasos por esa función
            this.arNumPasosFunctionsAnimated = [];
            //  (Animation)
    //  ALERT - Comentar
            //  TOdas las funciones para animar
            this.arBnPredefineFunctionsAnimated = [];
            //  (Animation)
    //  ALERT - Comentar
            //  Arreglo, retorna el numero de la llave del nombre y el valor con el numero de la llave de la funcion
            this.arNumNameAndValue = [];
            //  (Animation)
    //  ALERT - Comentar
            //  Valor de la función predefinida
            this.arPredefineNameFunctionsAnimated = [];
            //  (Animation)
    //  ALERT - Comentar
            //  Valor de la función predefinida
            this.arValueOfFunctionsAnimated = [];
            //  (Animation)
            //  Añade una funcion al animar
            this.addFunction=function(functionOnAnimation,jsonOnFunctionAnimated,father,bnEnAnimation)
            {
                if(bnEnAnimation===undefined) { bnEnAnimation=true; }
                //  numero de la funcion
                var numFunctionAnimated = this.arFunctionsAnimated.length;
                //  Cargamos la función
                this.arFunctionsAnimated[numFunctionAnimated]=functionOnAnimation;
                //  Habilita la animación de esta función
                this.arBnEnFunctionsAnimated[numFunctionAnimated]=bnEnAnimation;
                //  Los datos que ingresan a esa funcion a animar
                if(jsonOnFunctionAnimated !== undefined) { this.arFunctionsAnimated_json[numFunctionAnimated]=jsonOnFunctionAnimated; }
                //  El padre de esa funcion a animar
                if(father !== undefined) { this.arFunctionsAnimated_father[numFunctionAnimated]=father; }
                //  Retorna el numero de la animación
                return numFunctionAnimated;
            };
            //  (Animation)
            //  Habilita o desabilita las funciónes a animar, normalmente ya vienen habilitadas
            this.enFunction=function(numFunctionAnimated)
            { this.arBnEnFunctionsAnimated[numFunctionAnimated]=true; };
            this.unFunction=function(numFunctionAnimated)
            { this.arBnEnFunctionsAnimated[numFunctionAnimated]=false; };
            //  (Animation)
            this.addPredefineFunction=function(namePredefineFunctionInAnimation,jsonOnFunctionAnimated,father,bnEnAnimation)
            {
                var numFunctionInAnimation = this.addFunction(namePredefineFunctionInAnimation,jsonOnFunctionAnimated,father,bnEnAnimation);
                //  Informa que esta es una función predefinida
                this.arBnPredefineFunctionsAnimated[numFunctionInAnimation]=true;

                return numFunctionInAnimation;
            };
            //  (Animation)
            //  Cada cuanto realizar el paso
            this.pasosPorUnSegundo = 1000/this.stepsPerSecond;
            //  (Animation)
            //  Ejecuta la animacipón
            this.animate=function()
            {
                //  Si puede continuar con la animación
                if(this.bnRunAnimation)
                {
                //  try
                //  {
                        //  Un paso mas caminado
                        this.numPasos++;
                        //  Funcion a ejecutar
                        for(contarFunctionsAnimated=0;contarFunctionsAnimated<this.arFunctionsAnimated.length;contarFunctionsAnimated++)
                        {
                            var functionAnimated = this.arFunctionsAnimated[contarFunctionsAnimated];
                            //  Si estan habilitadas
                            if(this.arBnEnFunctionsAnimated[contarFunctionsAnimated])
                            {
                                var father_;
                                if(this.arFunctionsAnimated_father[contarFunctionsAnimated] !== undefined)
                                { father_ = this.arFunctionsAnimated_father[contarFunctionsAnimated]; }
                                //  Si son funciones sencillas
                                if(!this.arBnPredefineFunctionsAnimated[contarFunctionsAnimated])
                                {
                                        //  Añade el numero de pasos
                                        if(this.arNumPasosFunctionsAnimated[contarFunctionsAnimated]!==undefined)
                                        { this.arNumPasosFunctionsAnimated[contarFunctionsAnimated]++; }
                                        else
                                        { this.arNumPasosFunctionsAnimated[contarFunctionsAnimated]=1; }
                                        //  Añade el numero de pasos que veria el usuario
                                        var numPasosFuntion = this.arNumPasosFunctionsAnimated[contarFunctionsAnimated];
                                        //  Los datos a enviar con ellos
                                        var datosAEnviar_;
                                        if(this.arFunctionsAnimated_json[contarFunctionsAnimated] !== undefined)
                                        { datosAEnviar_ = this.arFunctionsAnimated_json[contarFunctionsAnimated]; }

                                        //  El padre de esa funcion a animar
                                        this.arFunctionsAnimated_father;
                                        var timeInSeconds = (numPasosFuntion/this.stepsPerSecond); 
                                        var info_ = {
                                            numFramePerSecond: this.stepsPerSecond,
                                            numFrame: numPasosFuntion,
                                            timeInSeconds: timeInSeconds,
                                            time: timeInSeconds*1000,
                                            data: datosAEnviar_,
                                        };
                                        if(father_!==undefined)
                                        { father_.functionAnimated = functionAnimated; father_.functionAnimated(info_); }
                                        else
                                        { functionAnimated(info_); }
                                }
                                //  Si son funciones predefinidas
                                else
                                {
                                    father_[functionAnimated]();
                                }
                            }
                        }
                        //  Mira en cuanto tiempo ejecutar esta misma funcion
                        var tiempoEjecucion = this.controlSegundos(this.milisegundosInicio,this.numPasos,this.pasosPorUnSegundo);
                        //  if(this.numPasos<50) { console.info(tiempoEjecucion+' = this.controlSegundos('+this.milisegundosInicio+','+this.numPasos+','+this.pasosPorUnSegundo+')'); }
                        //  Registra los ultimos this.numRegistroUltimosMovimientos(25 PorDef) en los tiempos
                        for(var contRegistroUltimosMovimientos=0;contRegistroUltimosMovimientos<this.numRegistroUltimosMovimientos-1;contRegistroUltimosMovimientos++)
                        { this.arUltimosMovimientos[contRegistroUltimosMovimientos] = this.arUltimosMovimientos[contRegistroUltimosMovimientos+1]; }
                        this.arUltimosMovimientos[this.numRegistroUltimosMovimientos-1] = tiempoEjecucion;

                        //  Si registra 25 ceros reinicia la animación
                        var bnTodosLosTiemposEnCero = false;
                        var contLosTiemposEnCero = 0;
                        for(var contRegistroUltimosMovimientos=0;contRegistroUltimosMovimientos<this.numRegistroUltimosMovimientos;contRegistroUltimosMovimientos++)
                        { if(this.arUltimosMovimientos[contRegistroUltimosMovimientos]!=0) { break; } else { contLosTiemposEnCero++; } }
                        if(contLosTiemposEnCero == this.numRegistroUltimosMovimientos) { this.restart(); }

                        //  Planea la siguiente ejecución
                        setTimeout("_EduInt._Animation._ar["+this.numAnimacion+"].animate();",tiempoEjecucion);
                //  }
                //  catch(err)
                //  { this.bnRunAnimation=false; console.err('Error en la funcion de la animación: '+err);}
                }
            }
            //  (Animation)
            //  Retorna en cuanto tiempo tiene que ejecutar el siguiente
            this.controlSegundos=function(milisegundosInicio,numPasosCaminados,pasoMilisegMinimo)
            {
                var milisegundosTotales=this.milisegundosAhora()-milisegundosInicio;
                //  console.info("Inicio: "+milisegundosInicio);
                //  console.info("Ahora:  "+this.milisegundosAhora());
                var milisegundosSigPaso=(numPasosCaminados+1)*pasoMilisegMinimo;
                if(milisegundosTotales<=milisegundosSigPaso)
                { valReturn = milisegundosSigPaso-milisegundosTotales; }
                else
                { valReturn = 0; }
                //  console.info("Diferencia:  "+valReturn_EI);
                return valReturn;
            }
            //  (Animation)
            //  Retorna los milisegundos del momento
            //    cuando se ejecuto
            this.milisegundosAhora=function()
            {
                var tiempoAhora_EI = new Date();
                return tiempoAhora_EI.getTime();
            }
        },
    },

    _Log: {
        message: function(message){ _EduInt._Log._message(message); },
        _message: function(message){
            console.log(message);
        },
        log: function(message){ _EduInt._Log._log(message); },
        _log: function(message){
            console.log(message);
        },
        warning: function(message){ _EduInt._Log._warning(message); },
        _warning: function(message){
            console.log(message);
        },
        error: function(message){ _EduInt._Log._error(message); },
        _error: function(message){
            console.err(message);
        },
        deprecated: function(value1,value2){ _EduInt._Log._deprecated(value1,value2); },
        _deprecated: function(value1,value2){
            var message = '';
            if(value2!=undefined)
            {
                var lastValue=value1;
                var newValue=value2;
                message='"'+lastValue+'" was Deprecated, please change for "'+value2+'"';
            }
            else
            { message=value1; }
            this.warning(message);
        }
    },
    Log: this._Log,

    //  Tablero
    //  =======
    //  Todo lo que tiene que ver con el tablero esta aca
    _Board: {
        //  Esta clase contiene todos las funciones y variables de Educación Interactiva V4, como la cantidad de tableros(Boards) su número, sus nombres, la versión de este objeto.
        _ar: [],
        //  Arreglo con números de los tableros, la llave es el nombre.
        _arForNames: [],
        //  Obtener tablero por su id, normalmente se usa por el nombre
        getBoard: function(numBoard){ return this._getBoard(numBoard); },
        _getBoard: function(numBoard){ return this.ar[numBoard]; },
        //  Obtener el tablero por nombre
        getBoardForName: function(nameBoard){ return this._getBoardForName(nameBoard); },
        _getBoardForName: function(nameBoard){ return this._getBoard(this._arForNames[nameBoard]); },
        //  Retorna el número de tableros que existen
        _getNumBoards: function(){ return this.ar.length; },
        //  Obrener el id del tablero por el nombre
        getIdBoardForName_only: function(nameBoard){ return this._arForNames[nameBoard]; },
        //  Existe un tablero por su id, normalmente se usa por el nombre, es
        //  mas entendible y no cambia si aparece otro antes de este
        qstnIssetBoard: function(numBoard) { return this._qstnIssetBoard(numBoard); },
        _qstnIssetBoard: function(numBoard) {
            //  Si existe retorna true
            if(this.ar[numBoard]!=undefined) { return true; }
            //  Retorna false
            else { return false; }
        },
        //  Retorna si existe un tablero con un nombre especifico
        qstnIssetBoardForName: function(nameBoard) { return this._qstnIssetBoardForName(nameBoard); },
        _qstnIssetBoardForName: function(nameBoard) {
            //  Si existe retorna true
            if(this.arBoardsNames[nameBoard]!=undefined)
            { return true; }
            //  Retorna false
            return false;
        },
        //  Carga el tablero de una base de datos de algun servidor, esto para pegarlo en cualquier pagina web
        //  Ejemplo:
        //      loadBoardIn(object,'http://mipagina.com/juego3','casa=2&paso=3','casa=2&paso=3&hola=mundo')
        _loadIn: function(object,path,paramGet,paramPost,onFinish)
        {
            if(paramGet===undefined) { paramGet=''; }
            if(paramPost===undefined) { paramPost=''; }

            var xhttp = new XMLHttpRequest();
            xhttp.object=object;
            xhttp.onFinish=onFinish;
            xhttp.onreadystatechange = function()
            {
                if(xhttp.readyState == 4 && xhttp.status == 200)
                {
                    var info=JSON.parse(xhttp.responseText);
                    var Board = _EduInt.createBoardIn(xhttp.object, info.title, info.width, info.height, info.start, info.animate);
                    Board.my.functionToStart=window.atob(info.start);
                    Board.my.functionToAnimate=window.atob(info.animate);
                    Board._start(function(info){
                        eval(this.my.functionToStart);
                    });
                    Board._createAnimation(function(info){
                        eval(this.my.functionToAnimate);
                    }).startAnimation();

                    xhttp.onFinish(Board,info);
                }
            };

            if(paramPost!='')
            {
                xhttp.open("POST", path+(paramGet!==''?'?'+paramGet:''), true);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.send(paramPost);
            }
            else
            {
                xhttp.open("GET", path+(paramGet!==''?'?'+paramGet:''), true);
                xhttp.send();
            }
        },
        //  Información por defecto
        _default: {
            name: 'Board',
            width: 300,
            height: 200,
            canvas: {
                class: 'cCanvas_LugarDelCanvas_ei',
            }
        },
        createSimple: function(nameBoard,width,height) { return _EduInt._Board._createSimple(nameBoard,width,height); },
        _createSimple: function(nameBoard,width,height) {
            //  Si el nombre del tablero no esta definido, lo pide
            if(nameBoard===undefined)
            { _EduInt._Log.error('The nameBoard is mandatory'); }
            else
            {
                var myNewBoard = new _EduInt._Board._Board(nameBoard).setDimensions(width,height).create();
                _EduInt._Board._arForNames[nameBoard]=_EduInt._Board._ar.length;
                _EduInt._Board._ar[_EduInt._Board._ar.length]=myNewBoard;
                return myNewBoard;
            }
            //  Si no retorno el tablero existe un error
            return false;
        },
        createSimpleIn: function(object,nameBoard,width,height) { return _EduInt._Board._createSimpleIn(object,nameBoard,width,height); },
        _createSimpleIn: function(object,nameBoard,width,height)
        {
            var Board = _EduInt._Board._createSimple(nameBoard,width,height);
            object.appendChild(Board._oDiv);
            return Board;
        },
        //  Board
        //  ======
        _Board: function(nameBoard,width,height) {
            //  Si no se colocan estos valores,
            //  se asignan unos por defecto
            if(nameBoard!==undefined)
            { this._nameBoard=nameBoard; }
            else
            { this._nameBoard=_EduInt._Board._default.name+(_EduInt._Board._getNumBoards()+1); }
            if(width!==undefined)
            { this._width=width; }
            else
            { this._width=_EduInt._Board._default.width; }
            if(height!==undefined)
            { this._height=height; }
            else
            { this._height=_EduInt._Board._default.height; }

            //  Lugar para colocar todas las variables y funciones
            this.my = { };
//  <================================================ Pasarlo a la clase EduInt._Event._Evemt
            //  Eventos
            //  =======
            this._Event = 
            {
                _Board: this,
                //  Arreglo con los eventos que existen
                _arEvents: [],
                //  Añadir de manera sencilla una funcion a un evento
                accAddEventFunction: function(typeEvent,myFunction) { return this._accAddEventFunction(typeEvent,myFunction); },
                _accAddEventFunction: function(typeEvent,myFunction)
                { this.getEvent(typeEvent).accAddEventFunction(myFunction); return this; },
                //  Obtener el evento por el tipo de evento, si no existe lo crea
                getEvent: function(typeEvent) { return this._getEvent(typeEvent); },
                _getEvent: function(typeEvent)
                {
                    if(this._arEvents[typeEvent])
                    { return this._arEvents[typeEvent]; }
                    else
                    { return this._arEvents[typeEvent] = new this._TypeEvent(typeEvent,this._Board); }
                },
                //  
                _TypeEvent: function(typeEvent,Board)
                {
                    this.typeEvent = typeEvent;
                    //  Añade el tablero
                    this._Board=Board;
                    //  Arreglo de las funciones en este evento
                    this._arFunctions = [];
                    //  Si esta tiene por lo menos una funcion
                    this._bnHaveFunction = false;
                    //  Accion que añade una funcion
                    this.accAddEventFunction = function(myFunction) { this._accAddEventFunction(myFunction); };
                    this._accAddEventFunction = function(myFunction)
                    {
                        this._arFunctions[this._arFunctions.length]=myFunction;
                    };
                    //  Crea la funcion que tiene que ejecutar para que funcione
                    this._Board._oDiv.addEventListener(typeEvent, function(event) {
                        event.preventDefault();
                        var typeEvent = event.type;
                        for(var countFunctions=0;countFunctions<this._Board._Event._arEvents[typeEvent]._arFunctions.length;countFunctions++)
                        {
                            this._Board._myFunction_=this._Board._Event._arEvents[typeEvent]._arFunctions[countFunctions];
                            this._Board._myFunction_(event);
                        }
                        //  Informa que han añadido un EventKeyUp
                        this._bnHaveFunction = true;
                    });
                },
            };
            //  Funciones publicas
            //  ------------------
            this._arCustoms=[];
            this.setCustom=function(name,myFunction) { return this._setCustom(name,myFunction); };
            this._setCustom=function(name,myFunction)
            {
                this._arCustoms[name]=myFunction;
                return this;
            };
            this.qstnIssetCustom=function(name) { return this._qstnIssetCustom(name); };
            this._qstnIssetCustom=function(name)
            {
                if(this._arCustoms[name]===undefined) { return false; }
                else { return true; }
            };
            this.accAddEventFunction=function(typeEvent,Board) { this._Event._accAddEventFunction(typeEvent,Board); return this; }
//  <================================================
            // (Board)
            //  Agregamos el canvas al elemento
            this.setBoardJQueryIn=function(object) { this._setBoardJQueryIn(object); };
            this._setBoardJQueryIn=function(object)
            { object.append(this._oDiv); }
            // (Board)
            this.setBoardJQueryInID=function(id) { this._setBoardJQueryInID(id); };
            this._setBoardJQueryInID=function(id)
            { document.getElementById(id).append(this._oDiv); }
            // (Board)
            //  Agregamos el canvas al elemento
            this.setBoardIn=function(object) { return this._setBoardIn(object); };
            this._setBoardIn=function(object)
            { object.appendChild(this._oDiv); return this; }
            // (Board)
            this.setBoardInID=function(id) { return this._setBoardInID(id); };
            this._setBoardInID=function(id)
            { document.getElementById(id).appendChild(this._oDiv); return this; }
            // (Board)
            //  Posicion del mouse realativo a este tablero

            //  Saca la posició en X de un elemento(No de un Thing) en el tablero
            this.getPosInXOfAnElment=function(object) { return this._getPosInXOfAnElment(object); };
            this._getPosInXOfAnElment=function(object)
            {
                var curleft = 0;
                if(object.offsetParent)
                {
                    while(1)
                    {
                        curleft += object.offsetLeft;
                        if(this._oDiv==object.offsetParent || !object.offsetParent) { break; }
                        object = object.offsetParent;
                    }
                }
                return curleft;
            }
            //  Saca la posició en Y de un elemento(No de un Thing) en el tablero
            this.getPosInYOfAnElment=function(object) { return this._getPosInYOfAnElment(object); };
            this._getPosInYOfAnElment=function(object)
            {
                var curTop = 0;
                if(object.offsetParent)
                {
                    while(1)
                    {
                        curTop += object.offsetTop;
                        if(this._oDiv==object.offsetParent || !object.offsetParent) { break; }
                        object = object.offsetParent;
                    }
                }
                return curTop;
            }
    //  ALERT
    //  FALTA DOCUMENTAR
            this.stIsMouseOver=function() { return this._stIsMouseOver(); };
            this._stIsMouseOver=function()
            {
                return this._bnIsMouseOver;
            }
            // (Board)
    //  ALERT
    //  FALTA DOCUMENTAR
            //  Informa si ya fue creado
            this._bnCreated = false;
            // (Board)
    //  ALERT
    //  FALTA DOCUMENTAR
            this.createBoardInBody=function() { return this._createBoardInBody(); }
            this._createBoardInBody=function()
            {
                //  Div
                //  ---

                //  Crea el div que ira dentro
                this._oDiv=document.body;
                this._oDiv._Board=this;
                //  Añadimos la clase al tablero
                this._oDiv.className=this._oDiv.className + ' ' + 'ei_board';
                //  Permite que pueda ser seleccionado o no
                this._oDiv.tabIndex=-1;

    //  ALERT
                this._oDiv.onmouseover = function()
                {
                    this._Board._bnIsMouseOver = true;
                },
                this._oDiv.onmouseout = function(){
                    this._Board._bnIsMouseOver = false;
                }

                //  DivThings
                //  ---------

                this._oDivThings=document.createElement('div');
                //  Agregamos el canvas al elemento
                this._oDiv.appendChild(this._oDivThings);
                //  Colocamos la posicion absolute
                this._oDivThings.style.position='absolute';
                this._oDivThings.style.top='0px';
                this._oDivThings.style.left='0px';
                //  Colocamos el ancho y el alto
                this._oDivThings.style.width='10px';
                this._oDivThings.style.height='10px';

                //  Informa que ya fue creado
                this._bnCreated = true;

                //  Publico
                //  -------
                this._oDiv._Board=this._oDiv._Board;

                return this;
            },
            // (Board)
            this.create = function() { return this._create(); }
            this._create = function()
            {
                //  Div
                //  ---

                //  Crea el div que ira dentro
                this._oDiv=document.createElement('div');
                this._oDiv._Board=this;
                //  Añadimos la clase al tablero
                this._oDiv.className='ei_board';
                //  Permite que pueda ser seleccionado o no
                this._oDiv.tabIndex=-1;

    //  ALERT
                this._oDiv.onmouseover = function(){
                    this._Board._bnIsMouseOver = true;
                },
                this._oDiv.onmouseout = function(){
                    this._Board._bnIsMouseOver = false;
                }

                //  Colocamos la posicion relativa
                this._oDiv.style.position='relative';
                //  Colocamos el ancho y el alto
                this._oDiv.style.width=_EduInt._Basic.measure(this._width);
                this._oDiv.style.height=_EduInt._Basic.measure(this._height);
                //  Colocamos un overflow hidden
                this._oDiv.style.overflow='hidden';

                //  DivThings
                //  ---------

                this._oDivThings=document.createElement('div');
                this._oDivThings._Board=this;
                //  Agregamos el canvas al elemento
                this._oDiv.appendChild(this._oDivThings);
                //  Colocamos la posicion absolute
                this._oDivThings.style.position='absolute';
                //  Colocamos el ancho y el alto
                this._oDivThings.style.width=_EduInt._Basic.measure(this._width);
                this._oDivThings.style.height=_EduInt._Basic.measure(this._height);
                //  Colocamos un overflow hidden
                this._oDivThings.style.overflow='hidden';

                //  Canvas
                //  ------

                //  Crea el canvas que ira dentro del div del lienzo
                this._oCanvas=document.createElement('canvas');
                this._oCanvas._Board=this;
                //  Agregamos el canvas al elemento
                this._oDiv.appendChild(this._oCanvas);
                //  Colocamos el ancho y el alto
                this._oCanvas.width=this._width;
                this._oCanvas.height=this._height;
                //  Colocamos la clase, de acuerdo al codigoUnico
                this._oCanvas.className=_EduInt._Board._default.canvas.class;
                //  Creamos el contexto necesario para poder manejarlo
                this._contexto=this._oCanvas.getContext('2d');

                //  Informa que ya fue creado
                this._bnCreated = true;

                //  Publico
                //  -------
                this._oDiv.Board=this;
                this._oDivThings.Board=this;
                this._oCanvas.Board=this;

                return this;
            }
            // (Board)
    //  ALERT - Comentar
            //  Posición estatica, si es falso siempre consulta su posicion,
            //  si no coloca por defecto: this._posInX y this._posInY
            this._bnStaticPosition = false;
            this.enStaticPosition = function(posInX,posInY) { this._enStaticPosition(posInX,posInY); };
            this._enStaticPosition = function(posInX,posInY)
            {
                this._bnStaticPosition=true;
                if(posInX!==undefined) { this._posInX = posInX; }
                if(posInY!==undefined) { this._posInY = posInY; }
            }
            // (Board)
    //  ALERT - Comentar
    //  Muy pesado buscar todo el tiempo, deberian ser estaticos por defecto
            this.getPosInX = function() { return this._getPosInX(); };
            this._getPosInX = function()
            {
                if((this._bnStaticPosition && this._posInX===undefined) || (!this._bnStaticPosition))
                {
                    this._posInX = _EduInt._Basic.posEnX(this._oDiv);
                    return this._posInX;
                }
                else
                { return this._posInX; }
            }
            // (Board)
    //  ALERT - Comentar
    //  Muy pesado buscar todo el tiempo, deberian ser estaticos por defecto
            this.getPosInY = function() { return this._getPosInY(); };
            this._getPosInY = function()
            {
                if((this._bnStaticPosition && this._posInY===undefined) || (!this._bnStaticPosition))
                {
                    this._posInY = _EduInt._Basic.posEnY(this._oDiv);
                    return this._posInY;
                }
                else
                { return this._posInY; }
            }
            // (Board)
            this.setWidth = function(width) { return this._setWidth(width); };
            this._setWidth = function(width)
            {
                if(this._bnCreated)
                {
                    //  Div
                    //  ---
                    //  Colocamos el ancho
                    this._oDiv.style.width=_EduInt._Basic.measure(width);

                    //  DivThings
                    //  ---------
                    //  Colocamos el ancho
                    this._oDivThings.style.width=_EduInt._Basic.measure(width);

                    //  Canvas
                    //  ------
                    //  Colocamos el ancho y el alto
                    this._oCanvas.width=width;
                }
                else
                {
                    this._width = width;
                }

                return this;
            }
            this._defaultPaths={ images: '' };
            this.setDefaultPaths = function(json) { this._setDefaultPaths(json); };
            this._setDefaultPaths = function(json)
            {
                this._defaultPaths = _EduIntBasic._defaultJson(json,this._defaultPaths);
            }
            // (Board)
            this.getWidth = function() { return this._getWidth(); };
            this._getWidth = function()
            { return this._width; }
            // (Board)
            this.setHeight = function(height) { this._setHeight(height); };
            this._setHeight = function(height)
            {
                if(this._bnCreated)
                {
                    //  Div
                    //  ---
                    //  Colocamos el ancho y el alto
                    this._oDiv.style.height=_EduInt._Basic.measure(height);

                    //  DivThings
                    //  ---------
                    //  Colocamos el ancho y el alto
                    this._oDivThings.style.height=_EduInt._Basic.measure(height);

                    //  Canvas
                    //  ------
                    //  Colocamos el ancho y el alto
                    this._oCanvas.height=height;
                }
                else
                {
                    this._height = height;
                }
                return this;
            }
            // (Board)
    //  ALERT - Documentar
            this.setDimensions = function(width,height) { return this._setDimensions(width,height); };
            this._setDimensions = function(width,height)
            { this._setWidth(width); this._setHeight(height); return this; }

            // (Board)
            this.getHeight = function() { return this._getHeight(); };
            this._getHeight = function()
            { return this._height; }

            // (Board)
    //  ALERT - Documentar
            this._bnIsMouseHover = false;
            this.setIsMouseHover = function(answer) { this._setIsMouseHover(answer); };
            this._setIsMouseHover = function(answer)
            { this._bnIsMouseHover = answer; }
            this.qstnIsMouseHover = function() { return this._qstnIsMouseHover(); };
            this._qstnIsMouseHover = function()
            { return this._bnIsMouseHover; }
            this._positionMouseInX = 0;
            this._positionMouseInY = 0;
            this.setMousePosInX = function(posInX) { this._setMousePosInX(posInX); };
            this._setMousePosInX = function(posInX)
            { this._positionMouseInX = posInX; }
            this.getMousePosInX = function() { return this._getMousePosInX(); };
            this._getMousePosInX = function()
            { return this._positionMouseInX; }
            this.setMousePosInY = function(posInY) { this._setMousePosInY(posInY); };
            this._setMousePosInY = function(posInY)
            { this._positionMouseInY = posInY; }
            this.getMousePosInY = function() { return this._getMousePosInY(); };
            this._getMousePosInY = function()
            { return this._positionMouseInY; }


    //  ALERT - Documentar
            //  Arreglo de Grupos Things
            this._arGroupThings=[];
            //  Arreglo del numero de Grupos Things por nombre
            this._arGroupThingsForName=[];
            //  Retorna el Grupo Thing por su numero
            this.getGroupThings = function(numGroupThings) { return this._getGroupThings(numGroupThings); };
            this._getGroupThings = function(numGroupThings)
            {
                return this._arGroupThings[numGroupThings];
            }
            //  Retorna true si existe el Grupo Thing
            this.qstnGroupThingsForName = function(nameGroupThings) { return this._qstnGroupThingsForName(nameGroupThings); };
            this._qstnGroupThingsForName = function(nameGroupThings)
            {
                //  Si existe retorna el true
                if(this._arGroupThingsForName[nameGroupThings]!==undefined) { return true; }
                //  Si este no existe
                return false;
            }
            //  Retorna el Grupo Thing por su nombre
            this.getGroupThingsForName = function(nameGroupThings) { return this._getGroupThingsForName(nameGroupThings); };
            this._getGroupThingsForName = function(nameGroupThings)
            {
                return this.getGroupThings(this._arGroupThingsForName[nameGroupThings]);
            }
            //  Función sensilla para crear o retornar Grupos Thing
            this.gt = function(nameGroupThings) { return this._gt(nameGroupThings); };
            this._gt = function(nameGroupThings)
            {
                //  Si existe el objeto lo retorna
                if(this._qstnGroupThingsForName(nameGroupThings))
                {
                    var GroupThings = this._getGroupThingsForName(nameGroupThings);
                    return Thing;
                }
                else
                { return this._createThing(nameGroupThings); }
            }
             //  Crea un Grupo de Things
            this.createGoupThings = function(nameGroupThings) { return this._createGoupThings(nameGroupThings); };
            this._createGoupThings = function(nameGroupThings)
            {
                var Board = this;
                //  Creamos el objeto "Thing"
                var GroupThings = new _EduInt._Thing._Group(Board,nameGroupThings);
                //  Guarda en el arreglo del tablero
                var numGroupsThings = this._arGroupThings.length;
                //  Regusistra en un arreglo cada Thing
                this._arGroupThings[numGroupsThings]=GroupThings;
                //  Regusistra el numero del thin del board segun el nombre
                this._arGroupThingsForName[nameGroupThings]=numGroupsThings;
                //  Retornamos el objeto "Thing"
                return GroupThings;
            };
            // (Board)
    //  ALERT - Documentar
            //  Arreglo de Things
            this._arThings=[];
            //  Arreglo del numero de Things por nombre
            this._arThingsForName=[];
            // (Board)
    //  ALERT - Documentar
            //  Retorna el Thing por su numero
            this.getThing = function(numThing) { return this._getThing(numThing); };
            this._getThing = function(numThing)
            {
                return this._arThings[numThing];
            }
            // (Board)
    //  ALERT - Documentar
            //  Retorna true si existe el objeto
            this.prThingForName = function(nameThing) { return this._prThingForName(nameThing); };
            this._prThingForName = function(nameThing)
            {
                //  Si existe retorna el true
                if(this._arThingsForName[nameThing]!==undefined) { return true; }
                //  Si este no existe
                return false;
            }
            // (Board)
    //  ALERT - Documentar
            //  Retorna el objeto por su nombre
            this.getThingForName = function(nameThing) { return this._getThingForName(nameThing); };
            this._getThingForName = function(nameThing)
            {
                return this._getThing(this._arThingsForName[nameThing]);
            }
            // (Board)
            //  Función sensilla para crear o retornar objetos
            this.Thing = function(nameThing,posInX,posInY,width,height) { return this._Thing(nameThing,posInX,posInY,width,height); };
            this._Thing = function(nameThing,posInX,posInY,width,height)
            { EduInt._Log._deprecated('Board._Thing','Board.t'); this._t(nameThing,posInX,posInY,width,height); };
            this.t = function(nameThing,posInX,posInY,width,height) { return this._t(nameThing,posInX,posInY,width,height); };
            this._t = function(nameThing,posInX,posInY,width,height)
            {
                //  Si existe el objeto lo retorna
                if(this._prThingForName(nameThing)) {
                    var Thing = this._getThingForName(nameThing,posInX,posInY,width,height);
                    //  Cuando uno llama a un this.t('nombre').accAlgo(9).inSeconds(5), el almacena un arreglo con las acciones a realizar,
                    //  Estas acciones se tienen que borrar cuando se vuelve a llamar al nombre,permitiendo que lo siguoente funcione
                    //  Ejemplo:
                    //      this.t('nombre').accMoveInX(9).inSeconds(5)
                    //      Cuando vuelva a ser llamado el borrara las acciones anteriores, permitiendo colocar a las nuevas un tiempo
                    //      Si el no limpoara las acciones anteriores el colocaria en 2 segundos el Mover en X (accMoveInX(9))
                    //      this.t('nombre').accMoveInY(9).inSeconds(2)
                    Thing._clearActionsInTime();
                    return Thing;
                }
                //  Si NO existe lo retorna
                else {
                    return this._createThing(nameThing,posInX,posInY,width,height);
                }
            }
            // (Board)
            //  Crea un Thing
            this.createThing = function(nameThing,posInX,posInY,width,height) { return this._createThing(nameThing,posInX,posInY,width,height); };
            this._createThing = function(nameThing,posInX,posInY,width,height)
            {
                var Board = this;
                //  Creamos el objeto "Thing"
                var Thing = new _EduInt._Thing._Thing(Board,nameThing,posInX,posInY,width,height);
                //  Guarda en el arreglo del tablero
                var numThings = this._arThings.length;
                //  Regusistra en un arreglo cada Thing
                this._arThings[numThings]=Thing;
                //  Regusistra el numero del thin del board segun el nombre
                this._arThingsForName[nameThing]=numThings;
                //  Lo agregamos al tablero
                Thing._setThingIn(this._oDivThings);
                //  Retornamos el objeto "Thing"
                return Thing;
            };
            // (Board)
    //  ALERT - Comentar
            //  Es como inicia una animación, este se puede omitir, pero si se usa se puede reinicar la animación
            this.start = function(functionToStart) { this._start(functionToStart); };
            this._start = function(functionToStart)
            {
                //  Evita que algo sea dibujado
                //  Informa que esta en modo start
                this._bnIsInStart=true;
                //  Ingregra la funcion al tablero
                this._functionToStart = functionToStart;
                //  La ejecuta
                this._functionToStart();
                //  Dibuja todos los cambios

                //  Informa que salio de modo start
                this._bnIsInStart=false;
            };
            //  (Board)
    //  ALERT - Comentar
            this.stop = function() { this._stop(); };
            this._stop = function()
            {
                //  Pasa por todos los Things y los elimina
                for(var countThings=0;countThings<this._arThings.length;countThings++)
                {
                    this._arThings[countThings].delete();
                }
                this._arThings=[];
                this._arThingsForName=[];
            };
            // (Board)
    //ALERT - Comentar
            this.restart = function(functionToStart) { this._restart(functionToStart); };
            this._restart = function(functionToStart)
            {
                this._stop();
                this._start(functionToStart);
            };
            // (Board)
    //ALERT - Comentar
            //  Informa si se esta en el start
            this._bnIsInStart = false;
            // (Board)
    //ALERT - Comentar
            //  Pregunta si esta en Start
            this.qstnIsInStart = function() { return this._qstnIsInStart(); };
            this._qstnIsInStart = function()
            {
                return this._bnIsInStart;
            };
            // (Board)
    //  ALERT - Comentar
            //  Carga las funciónes que tienen que estar al cargar la animación
            this._arNumOfFunctnToStatInAnimation=[]
            // (Board)
    //  ALERT - Comentar
            //  Crea la animación
            this.createAnimation = function(functionAnimated,stepsPerSecond) { return this._createAnimation(functionAnimated,stepsPerSecond); };
            this._createAnimation = function(functionAnimated,stepsPerSecond)
            {
                //  Si no tiene pasos por segundo asume que son 25
                if(stepsPerSecond===undefined) { stepsPerSecond=25; }
                //  Creaba la animación
                this._animation=_EduInt._Animation._create(stepsPerSecond);
                //  La agrega al tablero
                this._functionAnimated = functionAnimated;
                //  Añadimos la funcion para ser animada
                this._arNumOfFunctnToStatInAnimation[this._arNumOfFunctnToStatInAnimation.length]=this._animation.addFunction(this._functionAnimated,{},this,false);
                //  Añadimos la funcion que manejara las animaciónes en segundo plano
                this._arNumOfFunctnToStatInAnimation[this._arNumOfFunctnToStatInAnimation.length]=this._animation.addFunction(this._functionAnimatedShadow,{},this,false);
                //  Añadmimos la funcion para dibujar cambios
                this._arNumOfFunctnToStatInAnimation[this._arNumOfFunctnToStatInAnimation.length]=this._animation.addPredefineFunction('drawChanges',{},this,false);
                //  Retorna el tablero
                return this;
            }
            // (Board)
    //  ALERT - Comentar
            //  Elmina la animación
            this.deleteAnimation = function() { return this._deleteAnimation(); };
            this._deleteAnimation = function()
            {
                if(this._animation)
                {
                    //  Detiene la animación y la deja en posicion de inicio
                    this._animation.stop();
                    //  Borra todas las funciones de animación si existen
                    this._animation.deleteFunctions();
                    //  Borra la animación
                    this._animation=undefined;
                }
                //  Retorna el tablero
                return this;
            }
            //
            this.delete = function() { this._delete(); };
            this._delete = function()
            {
                //  Borra la animación
                this._deleteAnimation();
                //  Quita los objetos
                this._stop();
                //  Borra el contenido del tablero, mientras no sea un tablero en el body
                if(document.body!=this._oDiv) { this._oDiv.remove(); }
            }
            // (Board)
    //  ALERT - COMMENT
            //  Arreglo de las funciónes en Shadow
            this._arFunctionsAnimatedShadow = [];
    //  ALERT - COMMENT
            this.functionAnimatedShadow = function(info) { this._functionAnimatedShadow(info); };
            this._functionAnimatedShadow = function(info)
            {
                for(var countFnAnimatedShadow=0;countFnAnimatedShadow<this._arFunctionsAnimatedShadow.length;countFnAnimatedShadow++)
                {
                    //  Solo la ejecuta si esta definida
                    if(this._arFunctionsAnimatedShadow[countFnAnimatedShadow]!==undefined)
                    {
                        //  pasa las variables a unas mas sencillas
                        //  ---------------------------------------
                        var functionAnimatedInShadow_ = this._arFunctionsAnimatedShadow[countFnAnimatedShadow].functionAnimatedInShadow;
                        var myoptions_ = this._arFunctionsAnimatedShadow[countFnAnimatedShadow].myoptions;
                        var father_ = this._arFunctionsAnimatedShadow[countFnAnimatedShadow].father;

                        //  Ejecuta la funcion
                        //  ------------------
                        //  Si existe un padre lo coloca
                        var newOptions;
                        if(father_!==undefined)
                        {
                            father_._functionAnimatedInShadow_ = functionAnimatedInShadow_;
                            newOptions = father_._functionAnimatedInShadow_(info,myoptions_);
                        }
                        else
                        { newOptions = functionAnimatedInShadow(myoptions_); }


                        //  Si retorna un valor lo asigna a las nuevas opciones
                        if(newOptions!==undefined)
                        {
                            this._arFunctionsAnimatedShadow[countFnAnimatedShadow].myoptions = newOptions
                            //  Si retorna un newOptions.exit=true, el finaliza
                            if(newOptions.exit===true)
                            {
                                this._deleteFunctionAnimatedInShadowFast(countFnAnimatedShadow);
                            }
                        }
                        else
                        {
                            //  Si tiene un tiempo para desaparecer verifica este y lo borra de ser el caso
                            //  ---------------------------------------------------------------------------
                            //  Si el numero de frames para desaparecer esta definido le resta uno, y cuando llegue a cero desaparece la función
                            if(this._arFunctionsAnimatedShadow[countFnAnimatedShadow].frameToDesapear!==undefined)
                            {
                                this._arFunctionsAnimatedShadow[countFnAnimatedShadow].frameToDesapear--;
                                if(this._arFunctionsAnimatedShadow[countFnAnimatedShadow].frameToDesapear==0)
                                {
        //  WARNING
        //  A futuro tiene que existir una función que limpie todas las undefined, pero despues de algun tiempo, para que no sea muy lento
                                    this._deleteFunctionAnimatedInShadowFast(countFnAnimatedShadow);
                                }
                            }
                        }
                    }
                }
            }
            // (Board)
    //  ALERT - COMMENT
            //  jsonOptionsFunctionAnimatedInShadow = { options: {}, father: undefined, timeToDesapear: 25 }
    //  WARNING
    //  A futuro tiene que existir una función que limpie todas las undefined, pero sin borrar esta, que es la rapida
            this.deleteFunctionAnimatedInShadowFast = function(id) { this._deleteFunctionAnimatedInShadowFast(id); };
            this._deleteFunctionAnimatedInShadowFast = function(id)
            { this._arFunctionsAnimatedShadow[id]=undefined; };
            // (Board)
    //  ALERT - COMMENT
            //  jsonOptionsFunctionAnimatedInShadow = { options: {}, father: undefined, timeToDesapear: 25 }
            this.addFunctionAnimatedInShadow = function(functionAnimatedInShadow,jsonOptionsFunctionAnimatedInShadow) { return this._addFunctionAnimatedInShadow(functionAnimatedInShadow,jsonOptionsFunctionAnimatedInShadow); };
            this._addFunctionAnimatedInShadow = function(functionAnimatedInShadow,jsonOptionsFunctionAnimatedInShadow)
            {
                var idTheFunctionInShadow = this._arFunctionsAnimatedShadow.length;

                var options_;
                if(jsonOptionsFunctionAnimatedInShadow.options!==undefined) { var options_ = jsonOptionsFunctionAnimatedInShadow.options; }
                var father_;
                if(jsonOptionsFunctionAnimatedInShadow.father!==undefined) { var father_ = jsonOptionsFunctionAnimatedInShadow.father; }
                var frameToDesapear_;
                if(jsonOptionsFunctionAnimatedInShadow.frameToDesapear!==undefined) { var frameToDesapear_ = jsonOptionsFunctionAnimatedInShadow.frameToDesapear; }

                this._arFunctionsAnimatedShadow[this._arFunctionsAnimatedShadow.length] = {
                    functionAnimatedInShadow: functionAnimatedInShadow,
                    myoptions: options_,
                    father: father_,
                    frameToDesapear: frameToDesapear_,
                };

                return idTheFunctionInShadow;
            };
            // (Board)
    //  ALERT - COMMENT
            this.addFunctionAnimatedInShadowSimple = function(functionAnimatedInShadow,jsonOnFunctionAnimatedInShadow,father) { return this._addFunctionAnimatedInShadowSimple(functionAnimatedInShadow,jsonOnFunctionAnimatedInShadow,father); };
            this._addFunctionAnimatedInShadowSimple = function(functionAnimatedInShadow,jsonOnFunctionAnimatedInShadow,father)
            { return this._addFunctionAnimatedInShadow(functionAnimatedInShadow, { options: jsonOnFunctionAnimatedInShadow, father: father }); }
    //  ALERT - Comentar
            //  Dibuja solo los cambios en los objetos
            this.drawChanges = function() {
                //  Pasa por todos los objetos
                for(var contThings=0;contThings<this._arThings.length;contThings++)
                {
                    if(this._arThings[contThings].prChangesWithoutDrawing())
                    {
                        this._arThings[contThings].draw()
                    }
                }
            };
            // (Board)
    //  ALERT - Comentar
            //  Inicia la animación
            this.startAnimation = function() { this._startAnimation(); };
            this._startAnimation = function()
            {
                //  Habilita las funciones a animar
                for(var countFunctAnimated=0;countFunctAnimated<this._arNumOfFunctnToStatInAnimation.length;countFunctAnimated++)
                {
                    var numFunctionAnimated=this._arNumOfFunctnToStatInAnimation[countFunctAnimated];
                    this._animation.enFunction(numFunctionAnimated);
                }
                //  Inicia la animacion,
                this._animation.start();
            };
            // (Board)
            this.accAddKeyboard = {
                _Board: this,
                arrows: function(){
                    this._Board.t('__KeyboardArrow-up')._setType('element','div')._setBackgroundImageInAlpha('https://storage.googleapis.com/datos-educacion-interactiva/imagenes/basic/keyboard-arrows.png',false)._setDimentions(60,60)._setPosition(60,0);
                    this._Board.t('__KeyboardArrow-right')._setType('element','div')._setBackgroundImageInAlpha('https://storage.googleapis.com/datos-educacion-interactiva/imagenes/basic/keyboard-arrows.png',false)._setDimentions(60,60)._setPosition(120,60)._setBackgroundPosition('-60px 0');
                    this._Board.t('__KeyboardArrow-bottom')._setType('element','div')._setBackgroundImageInAlpha('https://storage.googleapis.com/datos-educacion-interactiva/imagenes/basic/keyboard-arrows.png',false)._setDimentions(60,60)._setPosition(60,60)._setBackgroundPosition('-120px 0');
                    this._Board.t('__KeyboardArrow-left')._setType('element','div')._setBackgroundImageInAlpha('https://storage.googleapis.com/datos-educacion-interactiva/imagenes/basic/keyboard-arrows.png',false)._setDimentions(60,60)._setPosition(0,60)._setBackgroundPosition('-180px 0');
                },
            };
            // (Board)
            //  Envia un mensajes al usuario
            this.accSendMessage = {
                _Board: this,
                good: function(){
                    if(!this._Board._qstnIssetCustom('__MessageGood'))
                    {
                        this._Board._setCustom('__MessageGood',function()
                        {
                            this._setType('element','div')._setBackgroundImageInAlpha('https://storage.googleapis.com/datos-educacion-interactiva/imagenes/basic/good-and-wrong.png',false)._setDimentions(80,70)._setPosition(20,100);
                        });
                    }
                    this._goodOrWrong('good');
                },
                wrong: function(){
                    if(!this._Board._qstnIssetCustom('__MessageWrong'))
                    {
                        this._Board._setCustom('__MessageWrong',function()
                        {
                            this._setType('element','div')._setBackgroundImageInAlpha('https://storage.googleapis.com/datos-educacion-interactiva/imagenes/basic/good-and-wrong.png',false)._setBackgroundPosition('right 0')._setDimentions(70,70)._setPosition(20,100);
                        });
                    }
                    this._goodOrWrong('wrong');
                },
                _goodOrWrong: function(goodOrWrong){
                    this._Board.addFunctionAnimatedInShadow(function(info,optionJson) {
                        //  console.info(info.time)
                        //  La primera vez
                        if(optionJson.numFrames==0)
                        {
                            if(optionJson.goodOrWrong=='good')
                            {
                                //  Crea el thing
                                this.t('_MessageGood').getCustom('__MessageGood');
                                //  Mira si existe un custom creado por el usuario
                                if(this._qstnIssetCustom('_MessageGood')) { this.t('_MessageGood')._getCustom('_MessageGood'); }
                                //  Guarda el elemento en una variable
                                optionJson.element = this.t('_MessageGood')._element;
                            }
                            else
                            {
                                //  Crea el thing
                                this.t('_MessageWrong').getCustom('__MessageWrong');
                                //  Mira si existe un custom creado por el usuario
                                if(this._qstnIssetCustom('_MessageWrong')) { this.t('_MessageGood')._getCustom('_MessageWrong'); }
                                //  Guarda el elemento en una variable
                                optionJson.element = this.t('_MessageWrong')._element;
                            }
                            //  Milisegundos cuando aparece
                            optionJson.timeToAppear=info.time;
                            //  Estado del elemento
                            optionJson.state='fadeIn';
                            //  Tiempos
                            optionJson.timeMaxInFadeIn=optionJson.milisegundosToFadeIn;
                            optionJson.timeMaxInDelay=optionJson.milisegundosToFadeIn+optionJson.milisegundosToDelay;
                            optionJson.timeMaxInFadeOut=optionJson.milisegundosToFadeIn+optionJson.milisegundosToDelay+optionJson.milisegundosToFadeOut;
                        }
                        else
                        {
                            var timeUntilInit = info.time-optionJson.timeToAppear;
                            console.info(timeUntilInit);

                            //  FadeIn
                            if(timeUntilInit<=optionJson.timeMaxInFadeIn)
                            {
                                console.info('FadeIn');
                                var opacity = timeUntilInit/optionJson.milisegundosToFadeIn;
                                if(1<opacity) { opacity=1; };
                            }
                            //  Delay
                            else if(timeUntilInit<=optionJson.timeMaxInDelay)
                            { console.info('Delay'); }
                            //  FadeOut
                            else
                            {
                                console.info('FadeOut');

                                var opacity = 1-(timeUntilInit-optionJson.milisegundosToFadeIn-optionJson.milisegundosToDelay)/optionJson.milisegundosToFadeIn;
                                if(opacity<0) { opacity=0; optionJson.exit=true; };
                            }

                            //console.info('opacity: '+opacity);
                            //  Añade la opacidad
                            optionJson.element.style.opacity=opacity;
                        }
                        //  Un frame mas
                        optionJson.numFrames++;
                        return optionJson;
                    },{
                        options: {
                            numFrames: 0,
                            milisegundosToFadeIn: 100,
                            milisegundosToDelay: 100,
                            milisegundosToFadeOut: 100,
                            goodOrWrong: goodOrWrong,
                        },
                        father: this._Board,
                        frameToDesapear: 100,
                    });
                }
            };
        },
    },

    //  Group
    //  =====

    //  Thing
    //  =====
    //  Todo lo que tiene que ver con el tablero esta aca
    _Thing: {
        //  Información por defecto
        _default: {
            name: 'Thing',
            posInX: 0,
            posInY: 0,
            width: 10,
            height: 10,
            radio: 5,
            type: 'element',
            subType: 'div',
            color: '#000',
            subSubType: '',
            container:{
                posInX: 0,
                posInY: 0,
            },
            types:
            {
                text:
                {
                    width: 'inherit',
                    height: 'inherit',
                }
            },
        },
        _Thing: function(Board,nameThing,posInX,posInY,width,height)
        {
            //  Guardamos en que tablero estamos
            this._Board=Board;
            //  Si no se colocan estos valores,
            //  se asignan unos por defecto
            if(nameThing!==undefined)
                { this._nameThing=nameThing; }
                else
                { this._nameThing=_EduInt._Thing._default.name+(_EduInt._Board._getNumBoards()+1); }
            if(posInX!==undefined)
                { this._posInX=posInX; }
                else
                { this._posInX=_EduInt._Thing._default.posInX; }
            if(posInY!==undefined)
                { this._posInY=posInY; }
                else
                { this._posInY=_EduInt._Thing._default.posInY; }
            if(width!==undefined)
                { this._width=width; }
                else
                { this._width=_EduInt._Thing._default.width; }
            if(height!==undefined)
                { this._height=height; }
                else
                { this._height=_EduInt._Thing._default.height; }
            this._radio=_EduInt._Thing._default.height;
            this._rotation=0;

            //  Permite colocar variables dentro del Thing
            this.my = { };
            //  Eventos en el Thing
            this._Events = {
                onclick: false,
                onmouseover: false,
                bnCursorDown: false,
            };

            //  Variables de movimiento
            this._moveInX=0;
            this._moveInY=0;
            this._rotate=0;
            //  Función por dedecto de todas las aciones, el parametro es el nombre de la variable cambiada
            this.accDefaultFunction = function(nameVariable) { this._accDefaultFunction(nameVariable); };
            this._accDefaultFunction = function(nameVariable)
            {
                //  Informa que existe un cambio para dibujar
                this._bnActionToDraw[this._bnActionToDraw.length]=nameVariable;
                //  true, si existen cambios sin dibujar
                this._bnCambiosSinDraw=true;
                //  Agrega la acción al arreglo  por si quieren colocarle un tiempo
                this._addActionsInTime(nameVariable);
            };
            //  (Thing)
            this.accChangeWidth = function(width) { return this._accChangeWidth(width); };
            this._accChangeWidth = function(width)
            {
                //  Cambia el ancho
                this._width=width;
                //  Función por dedecto de todas las aciones
                this._accDefaultFunction('width');
                //  Retorna el mismo objeto
                return this;
            }
            //  (Thing)
            this.accChangeHeight = function(height) { return this._accChangeHeight(height); };
            this._accChangeHeight = function(height)
            {
                //  Cambia el alto
                this._height=height;
                //  Función por dedecto de todas las aciones
                this._accDefaultFunction('height');
                //  Retorna el mismo objeto
                return this;
            }
            //  (Thing)
            //  Funciones de movimiento
            this.accMoveInX = function(moveInX) { return this._accMoveInX(moveInX); };
            this._accMoveInX = function(moveInX)
            {
                //  Guara cuanto debe moverce en X
                this._moveInX=this._moveInX+moveInX;
                //  Función por dedecto de todas las aciones
                this._accDefaultFunction('moveInX');
                //  Retorna el mismo objeto
                return this;
            };
            //  (Thing)
            this.accMoveInY = function(moveInY) { return this._accMoveInY(moveInY); };
            this._accMoveInY = function(moveInY)
            {
                //  Guara cuanto debe moverce en X
                this._moveInY=this._moveInY+moveInY;
                //  Función por dedecto de todas las aciones
                this._accDefaultFunction('moveInY');
                //  Retorna el mismo objeto
                return this;
            };
            //  (Thing)
            this.accMoveRight = function(moveRight) { return this._accMoveRight(moveRight); };
            this._accMoveRight = function(moveRight)
            { return this._accMoveInX(moveRight); };
            //  (Thing)
            this.accMoveLeft = function(moveLeft) { return this._accMoveLeft(moveLeft); };
            this._accMoveLeft = function(moveLeft)
            { return this._accMoveInX(moveLeft*(-1)); };
            //  (Thing)
            this.accMoveTop = function(moveTop) { return this._accMoveTop(moveTop); };
            this._accMoveTop = function(moveTop)
            { return this._accMoveInY(moveTop*(-1)); };
            //  (Thing)
            this.accMoveButton = function(moveButton) { return this._accMoveButton(moveButton); };
            this._accMoveButton = function(moveButton)
            { return this._accMoveInY(moveButton); };
            //  (Thing)
            this.accRotate = function(rotate) { return this._accRotate(rotate); };
            this._accRotate = function(rotate)
            {
                //  Guara cuanto debe moverce en X
                this._rotate=this._rotate+rotate;

    //  Info: Borrar:
                //  Mueve el objeto a la nueva posición
                //  this._rotation=this._rotation+rotate;

                //  Función por dedecto de todas las aciones
                this._accDefaultFunction('rotate');
                //  Retorna el mismo objeto
                return this;
            };
            //  Cuando uno llama a un this.t('nombre').accAlgo(9).inSeconds(5), el almacena un arreglo con las acciones a realizar,
            //  Estas acciones se tienen que borrar cuando se vuelve a llamar al nombre,permitiendo que lo siguoente funcione
            //  Ejemplo:
            //      this.t('nombre').accMoveInX(9).inSeconds(5)
            //      Cuando vuelva a ser llamado el borrara las acciones anteriores, permitiendo colocar a las nuevas un tiempo
            //      Si el no limpoara las acciones anteriores el colocaria en 2 segundos el Mover en X (accMoveInX(9))
            //      this.t('nombre').accMoveInY(9).inSeconds(2)
            this._arActionsInTime=[];
            this._addActionsInTime = function(nameFunction) { return this._addActionsInTime(nameFunction); };
            this._addActionsInTime = function(nameFunction)
            { this._arActionsInTime[this._arActionsInTime.length]=nameFunction; return this; };
            this.clearActionsInTime = function() { return this._clearActionsInTime(); };
            this._clearActionsInTime = function()
            { this._arActionsInTime=[]; return this; };
            //  (Thing)
            this.inSeconds = function(seconds) { return this._inSeconds(seconds); };
            this._inSeconds = function(seconds)
            {
                var constanteADividir=(this._Board._animation.getStepsPerSecond()*seconds);
                //  Pasa por todas las acciones hasta ahora colocadas y les coloca el tiempo en que se ejecutaran
                for(var countActionsInTime=0;countActionsInTime<this._arActionsInTime.length;countActionsInTime++)
                {
    //  WARNING
    //  QUeda faltarlo al cambio de ancho y alto
                    switch(this._arActionsInTime[countActionsInTime])
                    {
                        case 'rotate':
                            this._rotate=this._rotate/constanteADividir;
                            break;
                        case 'moveInX':
                            this._moveInX=this._moveInX/constanteADividir;
                            break;
                        case 'moveInY':
                            this._moveInY=this._moveInY/constanteADividir;
                            break;
                    }
                }
                //  Borra todas las acciones para cambiern segun el tiempo
                this._clearActionsInTime();

                return this;
            };
            //  (Thing)
            //  Crea el contenedor
            this.createContainer = function(posInX,posInY) { this._createContainer(posInX,posInY); };
            this._createContainer = function(posInX,posInY)
            {
                //  Crea un nuevo contenedor
                this._Container=new _EduInt._Thing._Container(posInX,posInY);
                //  Informa que a sido creado
                this._bnContainer=true;
            };
            //  (Thing)
            this.setEvOnClick = function(myFunction) { this._setEvOnClick(myFunction); };
            this._setEvOnClick = function(myFunction)
            {
                this._funcOnClick = myFunction;
            };
            //  (Thing)
            this.delete = function() { this._delete(); };
            this._delete = function()
            {
                //  BOrra el tipo de objeto
                this._deleteThingType();
                //  Informa que no esta creado
                this._bnWasCreated = false;
            }
            //  (Thing)
    //  ALERT - Comentar
            //  Borra los objetos si ya fueron creados
            this.deleteThingType = function() { this._deleteThingType(); };
            this._deleteThingType = function()
            {
                //  Pregunta si fue creado este Thing
                if(this._qstnWasCreated())
                {
                    //  Mira que tipo es para crear el Thing type
                    switch(this._Type)
                    {
                        case 'text':
                        case 'element':
                        case 'html':
                        case 'input':
                            this._Container._divContainer.removeChild(this._element);
                            break;
                        case 'form':
                            this._Container._divContainer.removeChild(this._svgThingType);
                            break;
                    }
                }
            }
    //  ALERT - Comentar
            //  (Thing)
            //  Informa si fue creado o no
            this._bnWasCreated = false;
            //  (Thing)
            //  Pregunta si fue creado o no
            this.qstnWasCreated = function() { return this._qstnWasCreated(); };
            this._qstnWasCreated = function()
            {
                return this._bnWasCreated;
            }
            //  (Thing)
    //  ALERT - Comentar
            this.putThisElementInDivOfBoard = function(element) { this._putThisElementInDivOfBoard(element); };
            this._putThisElementInDivOfBoard = function(element)
            {
                //  Crea el elemento en el contenedor correspondiente
                this._Container._divContainer.appendChild(element);
                //  Informa que fue creado
                this._bnWasCreated = true;
            }
            //  (Thing)
    //  ALERT - Comentar
            //  Crea el tipo de Thing
            this.createThingType = function() { this._createThingType(); };
            this._createThingType = function()
            {
                //  Informara si el objeto fue o no creado
                var bnThingCreated = false;
                //  Mira que tipo es para crear el Thing type
                switch(this._Type)
                {
                    //  Si se trata de una forma
                    case 'text':
                        this._element = document.createElement('div');
                        //  Para poder acceder a las opciones del Thing, desde el objeto
                        this._element._Thing = this;

                        this._putThisElementInDivOfBoard(this._element);

                        //  Añade todas las funciones de texto necesarias
                        _EduInt._Thing._Type._TextFunctions(this);
                        //  Añade todas las funciones de HTML necesarias
                        _EduInt._Basic.addThingStyleBlockFunctions(this);
                        //  Añade las funciones del elemento
                        _EduInt._Thing._Type._ElementsFunctions(this);
//  WARN
//  Que es adition 1?
                        this._element.innerHTML = this._adition1;

                        //  Informa que el objeto fue creado
                        bnThingCreated = true;
                        break;
                    case 'input':
                        this._element = document.createElement('input');
                        //  Para poder acceder a las opciones del Thing, desde el objeto
                        this._element._Thing = this;
                        this._element.type = 'text';
                        this._element.style.boxSizing = "border-box";

                        this._putThisElementInDivOfBoard(this._element);

                        //  Añade todas las funciones de input necesarias
                        _EduInt._Basic.addThingInputFunctions(this);
                        //  Añade todas las funciones de HTML necesarias
                        _EduInt._Basic.addThingStyleBlockFunctions(this);
                        //  Añade las funciones del elemento
                        _EduInt._Thing._Type._ElementsFunctions(this);

                        //  Inicia el movimiento del mouse
                        _EduInt._Cursor._enMovementDetect();

                        //  Informa que el objeto fue creado
                        bnThingCreated = true;
                        break;
                    case 'html':
                        this._element = document.createElement('div');
                        //  Para poder acceder a las opciones del Thing, desde el objeto
                        this._setHTML = function(myHTML){
                            this._element.innerHTML = myHTML;
                        }

                        this._element._Thing = this;
                        this._putThisElementInDivOfBoard(this._element);

                        //  Informa que el objeto fue creado
                        bnThingCreated = true;
                        break;
                    case 'element':
                        switch(this._subType)
                        {
                            case 'div':
                                this._element = document.createElement('div');
                                //  Para poder acceder a las opciones del Thing, desde el objeto
                                this._element._Thing = this;

                                this._element.style.width = this._width + 'px';
                                this._element.style.height = this._height + 'px';
                                this._element.style.backgroundColor = '#000';
                                this._element.style.position = 'absolute';

                                //  Añade todas las funciones de HTML necesarias
                                _EduInt._Basic.addThingStyleBlockFunctions(this);
                                //  Añade las funciones del elemento
                                _EduInt._Thing._Type._ElementsFunctions(this);

                                //  Ingresamos el nuevo objeto
                                this._putThisElementInDivOfBoard(this._element);
                                //  Inicia el movimiento del mouse
                                _EduInt._Cursor._enMovementDetect();

                                //  Informa que el objeto fue creado
                                bnThingCreated = true;

                                break;
                        }
                        break;
                    case 'svg':

                        break;
                    case 'form':
                        //  Que tipo de forma es
                        switch(this._subType)
                        {
                            //  Si es un rectangulo (Por defecto)
                            case 'rectangle':
                                //
                                var numSubObject=0;
                                this._svgThingType = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                                this._svgThingType._Thing = this;
                                this._svgThingType.setAttribute("width", _EduInt._Basic.measure(this._width));
                                this._svgThingType.setAttribute("height", _EduInt._Basic.measure(this._height));
                                this._svgThingType.style.position='absolute';

                                this._svgThingType.onclick = function(){
                                    this._Thing._Events.onclick=true;
                                    //  Si existe una función a ejecutar al hacer click
    //  ALERT - Documentar
                                    if(this._Thing._funcOnClick) { this._Thing._funcOnClick(); }
                                }
                                this._svgThingType.onmouseover = function(){
                                    this._Thing._Events.onmouseover=true;
                                }
                                this._svgThingType.onmouseout = function(){
                                    this._Thing._Events.onmouseover=false;
                                }

                                //  Inicia el movimiento del mouse
                                _EduInt._Cursor._enMovementDetect();

                                //object.object.setAttribute("draggable", "false");
                                //  Borramos antes de crear el nuevo objeto
                                this._Container._divContainer.innerHTML='';
                                //  Ingresamos el nuevo objeto
                                this._putThisElementInDivOfBoard(this._svgThingType);

                                this._ThingType = document.createElementNS(this._svgThingType.namespaceURI, "rect");
                                //object.subobject.setAttribute("x", "0%");
                                //object.subobject.setAttribute("y", "0%");
                                this._ThingType.setAttribute("width", _EduInt._Basic.measure(this._width));
                                this._ThingType.setAttribute("height", _EduInt._Basic.measure(this._height));
                                //object.subobject.setAttribute("fill", "white");
                                this._svgThingType.appendChild(this._ThingType);

                                //  Informa que el objeto fue creado
                                bnThingCreated = true;
                                break;
                            case 'circle':
                                //
                                this._svgThingType = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                                this._svgThingType.setAttribute("width", _EduInt._Basic.measure(this._width));
                                this._svgThingType.setAttribute("height", _EduInt._Basic.measure(this._height));
                                this._svgThingType.style.position='absolute';
                                //object.object.setAttribute("draggable", "false");

                                //  Ingresamos el nuevo objeto
                                this._putThisElementInDivOfBoard(this._svgThingType);

                                this._ThingType = document.createElementNS(this._svgThingType.namespaceURI, "circle");
                                this._ThingType.setAttribute("cx",_EduInt._Basic.measure(this._radio));
                                this._ThingType.setAttribute("cy",_EduInt._Basic.measure(this._radio));
                                this._ThingType.setAttribute("r",_EduInt._Basic.measure(this._radio));
                                this._svgThingType.appendChild(this._ThingType);

                                //  Informa que el objeto fue creado
                                bnThingCreated = true;
                                break;
                            default:
                                if(_EduInt.arPerzonilezedTypeFunctions[this._Type]!==undefined)
                                {
                                    if(_EduInt._Basic.isArray(_EduInt.arPerzonilezedTypeFunctions[this._Type]))
                                    {
                                        if(_EduInt.arPerzonilezedTypeFunctions[this._Type][this._subType]!==undefined)
                                        {
                                            this._functionPerzonilized = _EduInt.arPerzonilezedTypeFunctions[this._Type][this._subType];
                                            this._functionPerzonilized();
                                            this._functionPerzonilized = undefined;
                                        }
                                    }
                                }
                        }
                        break;
                }
                //  Si se creo algun Thing
                if(bnThingCreated)
                {
                    //  Añade todas las funciones comunes
                    _EduInt._Basic.addThingCommon(this);
                }

                //  Informa que ya se realizaron los cambios de tipo al crearlo
                this._bnChangeType=false;
            };
            //  (Thing)
    //  ALERT - Comentar
            //  Crea por primera vez el objeto
            this.create = function() { this._create(); };
            this._create = function()
            {
                //  Crea el contenedor del Thing
                this._createContainer(this._posInX,this._posInY);
                //  Crea la tipo del Thing
                this._createThingType();
            }
            //  (Thing)
    //  ALERT - Comentar
            //  true, si existen cambios sin dibujar
            this._bnCambiosSinDraw=false;
            //  (Thing)
    //  ALERT - Comentar
            //  Informa si existen cambios sin dibujar
            this.prChangesWithoutDrawing= function() { return this._prChangesWithoutDrawing(); };
            this._prChangesWithoutDrawing= function()
            {
                //  true, si existen cambios sin dibujar
                return this._bnCambiosSinDraw;
            }
            //  (Thing)
    //  ALERT - Comentar
            //  Cambia las espesificaciónes anteriores
            this.draw = function() { this._draw(); };
            this._draw = function()
            {
                //  Si tiene acciones las coloca para pintarlas
                if(this._moveInX!=0) { this._posInX=this._posInX+this._moveInX; }
                if(this._moveInY!=0) { this._posInY=this._posInY+this._moveInY; }
                //  Camba la poscición del contenedor deacuerdo a las variables
                this._Container._setPostion(this._posInX,this._posInY);
                //  Limpia las variables de movimiento, por posición
                this._moveInX=0;
                this._moveInY=0;

                this._Container._setPostion(this._posInX,this._posInY);
                //  En caso de que el tipo no cambiara el permite dibujarlo
                if(!this._prTypeChange())
                {
                    //  Crea la tipo del Thing
                    switch(this._Type)
                    {
                        case 'text':
                            //  Realiza solo los cambios asignados
                            for(var countChanges=0;countChanges<this._bnActionToDraw.length;countChanges++)
                            {
                                if(this._bnActionToDraw[countChanges]=='width')
                                { this._element.style.width = this._width + 'px'; }
                                if(this._bnActionToDraw[countChanges]=='height')
                                { this._element.style.height = this._height + 'px'; }
                            }
                            //  Reinicia los cambios asignados
                            this._bnActionToDraw=[];
                            break;
                        case 'input':
    //  ALERT - Problema al crearlo queda de 20 por 20
                            //  Realiza solo los cambios asignados
                            for(var countChanges=0;countChanges<this._bnActionToDraw.length;countChanges++)
                            {
                                if(this._bnActionToDraw[countChanges]=='width')
                                { this._element.style.width = this._width + 'px'; }
                                if(this._bnActionToDraw[countChanges]=='height')
                                { this._element.style.height = this._height + 'px'; }
                            }
                            //  Reinicia los cambios asignados
                            this._bnActionToDraw=[];
                            break;
                        //  Si se trata de una forma
                        case 'element':
                            switch(this._subType)
                            {
                                case 'div':
                                    //  Realiza solo los cambios asignados
                                    for(var countChanges=0;countChanges<this._bnActionToDraw.length;countChanges++)
                                    {
                                        if(this._bnActionToDraw[countChanges]=='width')
                                        { this._element.style.width = this._width + 'px'; }
                                        if(this._bnActionToDraw[countChanges]=='height')
                                        { this._element.style.height = this._height + 'px'; }
                                    }
                                    //  Reinicia los cambios asignados
                                    this._bnActionToDraw=[];
                                    break;
                            }
                            break;
                        //  Si se trata de una forma
                        case 'form':
                            //  Que tipo de forma es
                            switch(this._subType)
                            {
                                //  Si es un rectangulo (Por defecto)
                                case 'rectangle':
                                    //  Realiza solo los cambios asignados
                                    for(var countChanges=0;countChanges<this._bnActionToDraw.length;countChanges++)
                                    {
                                        if(this._bnActionToDraw[countChanges]=='width')
                                        {
                                            this._svgThingType.setAttribute("width", _EduInt._Basic.measure(this._width));
                                            this._ThingType.setAttribute("width", _EduInt._Basic.measure(this._width));
                                        }
                                        if(this._bnActionToDraw[countChanges]=='height')
                                        {
                                            this._svgThingType.setAttribute("height", _EduInt._Basic.measure(this._height));
                                            this._ThingType.setAttribute("height", _EduInt._Basic.measure(this._height));
                                        }
                                    }
                                    //  Reinicia los cambios asignados
                                    this._bnActionToDraw=[];
                                    break;
                                case 'circle':
                                    //  Realiza solo los cambios asignados
                                    for(var countChanges=0;countChanges<this._bnActionToDraw.length;countChanges++)
                                    {
                                        if(this._bnActionToDraw[countChanges]=='width')
                                        { this._svgThingType.setAttribute("width", _EduInt._Basic.measure(this._width)); }
                                        if(this._bnActionToDraw[countChanges]=='height')
                                        { this._svgThingType.setAttribute("height", _EduInt._Basic.measure(this._height)); }
                                        if(this._bnActionToDraw[countChanges]=='radio')
                                        {
                                            this._ThingType.setAttribute("cx",_EduInt._Basic.measure(this._radio));
                                            this._ThingType.setAttribute("cy",_EduInt._Basic.measure(this._radio));
                                            this._ThingType.setAttribute("r",_EduInt._Basic.measure(this._radio));
                                        }
                                    }
                                    //  Reinicia los cambios asignados
                                    this._bnActionToDraw=[];
                                    break;
                            }
                            break;
                    }
                    //  Cuando ocurre un cambio este tiene que dibujarce
                    this._bnCambiosSinDraw=false;
                }
                //  Si se realizo algun cambio de tipo, no solo es dibujarlo, es volver a crearlo
                else
                {
                    //  Borra el Thing anterior si existe
                    this._deleteThingType();
                    //  Crea el Thing
                    this._createThingType();
                }
                //  Borra todos los eventos
                this._cleanEventes();
            }
            //  (Thing)
            //  Borra todos los eventos cada vez que los dibuja o muestra los cambios
            this.cleanEventes = function() { this._cleanEventes(); };
            this._cleanEventes = function()
            {
                this._Events.onclick=false;
            }
            //  (Thing)
            //  Coloca el contenedor en algun lugar
            this.setThingIn = function(object) { this._setThingIn(object); };
            this._setThingIn = function(object)
            {
                this._Container._setContainerIn(object);
            }
            //  (Thing)
            this.setPosition = function(posInX,posInY) { return this._setPosition(posInX,posInY); };
            this._setPosition = function(posInX,posInY)
            {
                this._setPosInX(posInX,false);
                this._setPosInY(posInY,false);
                this._draw();
                return this;
            }
            //  (Thing)
            this.setPosInX = function(posInX,bnDraw) { return this._setPosInX(posInX,bnDraw); };
            this._setPosInX = function(posInX,bnDraw)
            {
                this._posInX=posInX;
                this._bnActionToDraw[this._bnActionToDraw.length]='posInX';
                //  Dibuja el cambio
                if(bnDraw===undefined) { bnDraw=true; } if(bnDraw) { this._draw(); }
                return this;
            }
            //  (Thing)
            this.getPosInX = function() { return this._getPosInX(); };
            this._getPosInX = function()
            {
                return this._posInX;
            }
            //  (Thing)
            this.setPosInY = function(posInY,bnDraw) { return this._setPosInY(posInY,bnDraw); };
            this._setPosInY = function(posInY,bnDraw)
            {
                this._posInY=posInY;
                this._bnActionToDraw[this._bnActionToDraw.length]='posInY';
                //  Dibuja el cambio
                if(bnDraw===undefined) { bnDraw=true; } if(bnDraw) { this._draw(); }
                return this;
            }
            //  (Thing)
            this.getPosInY = function() { return this._getPosInY(); };
            this._getPosInY = function()
            {
                return this._posInY;
            }
    //  ALERT
    //  Sin documentar
            //  Informa que cambios se han realizado y no se han dibujado
            this._bnActionToDraw = [];
            //  (Thing)
            this.setDimentions = function(width,height) { return this._setDimentions(width,height); };
            this._setDimentions = function(width,height)
            {
                this._setWidth(width,false);
                this._setHeight(height,false);
                this._draw();
                return this;
            }
            //  (Thing)
            this.setWidth = function(width,bnDraw) { return this._setWidth(width,bnDraw); };
            this._setWidth = function(width,bnDraw)
            {
                this._width=width;
                this._bnActionToDraw[this._bnActionToDraw.length]='width';
                //  Dibuja el cambio
                if(bnDraw===undefined) { bnDraw=true; } if(bnDraw) { this._draw(); }
                return this;
            }
            //  (Thing)
            this.setHeight = function(height,bnDraw) { return this._setHeight(height,bnDraw); };
            this._setHeight = function(height,bnDraw)
            {
                this._height=height;
                this._bnActionToDraw[this._bnActionToDraw.length]='height';
                //  Dibuja el cambio
                if(bnDraw===undefined) { bnDraw=true; } if(bnDraw) { this._draw(); }
                return this;
            }
            //  (Thing)
            this.setRadio = function(radio,bnDraw) { return this._setRadio(radio,bnDraw); };
            this._setRadio = function(radio,bnDraw)
            {
                this._radio=radio;
                this._bnActionToDraw[this._bnActionToDraw.length]='radio';
                //  Dibuja el cambio
                if(bnDraw===undefined) { bnDraw=true; } if(bnDraw) { this._draw(); }
                return this;
            }
            //  (Thing)
            //  Tipo de objeto es
            this._Type=_EduInt._Thing._default.type;
            this._subType=_EduInt._Thing._default.subType;
            this._subSubType=_EduInt._Thing._default.subSubType;
            //  (Thing)
    //ALERT
    //Falta comentarlo en documentación
            //  true, si cambio el tipo de un objeto
            this._bnChangeType=false;
            //  (Thing)
    //ALERT
    //Falta comentarlo en documentación
            //  retorna true si cambio el tipo de un objeto
            this.prTypeChange = function() { return this._prTypeChange(); };
            this._prTypeChange = function()
            {
                return this._bnChangeType;
            }
            //  (Thing)
            this.setType = function(type,subType) { return this._setType(type,subType); };
            this._setType = function(type,subType)
            {
                //  Si tiene que dibujarlo antes de retornarlo
                var bnDraw = false;
                //  Si cambio de tipo tiene que dibujarlo de una vez,
                if(this._Type!=type) { bnDraw = true; this._delete(); }
                //  Cambia el tipo
                this._Type=type;
                //  Informa que el tipo cambio
                this._bnChangeType = true;
                //  Si tiene un sub tipo lo coloca
                if(subType!==undefined) { this._subType = subType; }

                if(bnDraw) { this._draw(); }

                //  Informa que el tipo cambio
                this._bnChangeType = false;

                return this;
            }
            //  (Thing)
            this.getType = function() { return this._getType(); };
            this._getType = function()
            {
                return this._Type;
            }
            //  (Thing)
            this.setSubType = function(subType) { return this._setSubType(subType); };
            this._setSubType = function(subType)
            {
                //  Si cambio de tipo tiene que dibujarlo de una vez,
                var bnDraw = false;
                if(this._subType!=subType) { bnDraw = true; }
                this._subType=subType;
                //  Informa que el tipo cambio
                this._bnChangeType = true;
                if(bnDraw) { this._draw(); }
                this._bnChangeType = false;

                return this;
            }
            //  (Thing)
            this.getSubType = function() { return this._getSubType(); };
            this._getSubType = function()
            {
                return this._subType;
            }
            //  (Thing)
            this.setSubSubType = function(subSubType) { this._setSubSubType(subSubType); };
            this._setSubSubType = function(subSubType)
            {
                var bnDraw = false;
                if(this._subSubType!=subSubType) { bnDraw = true; }
                this._subSubType=subSubType;
                //  Informa que el tipo cambio
                this._bnChangeType = true;
                if(bnDraw) { this._draw(); }
                this._bnChangeType = false;
            },
            //  (Thing)
            this.qstnClick = function() { return this._qstnClick(); };
            this._qstnClick = function()
            {
                return this._Events.onclick;
            },
            //  (Thing)
            this.qstnMouseOver = function() { return this._qstnMouseOver(); };
            this._qstnMouseOver = function()
            {
                return this._Events.onmouseover;
            },
            //  (Thing)
            //  Crea el objeto
            this._create();
            //  FUnncion para ejecutar desde este Thing
            this._myFunction=function() { };
            //  (Thing)
            this.qstnIssetCustom=function(name) { return _EduInt._Thing._qstnIssetCustom(name); }
            //  Ejecuta un grupo de funciones custom para este Thing
            this.getCustom = function(name,infoJSon) { return this._getCustom(name,infoJSon); };
            this._getCustom = function(name,infoJSon)
            {
                if(infoJSon===undefined) { infoJSon={ }; }
                this._myFunction_ = this._Board._arCustoms[name];
                this._myFunction_(infoJSon);

                return this;
            };


            //  Funciones Publicas
            //  ==================
            this.Board = this._Board;

            //  Deprecated
            //  ==========
            this.setDimensions = function(width,height) { return this._setDimentions(width,height); };
        },
        _Container: function(posInX,posInY) {
            this._divContainer=document.createElement('div');
            //  Coloca el contenedor en un objeto
            this.setContainerIn = function(object) { this._setContainerIn(object); };
            this._setContainerIn = function(object)
            {
                try
                {
                    object.appendChild(this._divContainer);
                }
                catch(err)
                {

                }
            }
            //  Coloca el contenedor en un objeto con su id
            this.setContainerInID = function(id) { this._setContainerInID(id); };
            this._setContainerInID = function(id)
            {
                document.getElementById(id).appendChild(this._divContainer);
            }
            //  Coloca las propiedades basicas
            this._divContainer.style.position='absolute';
            //  Si no se colocan las posiciónes coje las por defecto
            if(posInX==undefined)
                { posInX=_EduInt._Thing._default.container.posInX; }
            if(posInY==undefined)
                { posInY=_EduInt._Thing._default.container.posInY; }
            //  Coloca la posición del container
            this._divContainer.style.top=_EduInt._Basic.measure(posInY);
            this._divContainer.style.left=_EduInt._Basic.measure(posInX);
            //  Coloca la posicion
            this.setPostion = function(posInX,posInY) { this._setPostion(posInX,posInY); };
            this._setPostion = function(posInX,posInY)
            {
                this._setPosInX(posInX);
                this._setPosInY(posInY);
            };
            //  Coloca una nueva posición en X
            this.setPosInX = function(posInX) { this._setPosInX(posInX); };
            this._setPosInX = function(posInX)
            {
                this._divContainer.style.left=_EduInt._Basic.measure(posInX);
            };
            //  Coloca una nueva posición en Y
            this.setPosInY = function(posInY) { this._setPosInY(posInY); };
            this._setPosInY = function(posInY)
            {
                this._divContainer.style.top=_EduInt._Basic.measure(posInY);
            };
            this.enAboveAll = function() { this._enAboveAll(); };
            this._enAboveAll = function()
            {
                this._divContainer.style.zIndex=999;
            };
            this.enAboveNormal = function() { this._enAboveNormal(); };
            this._enAboveNormal = function()
            {
                this._divContainer.style.zIndex=0;
            };
        },
        //  Tipo
        //  ====
        //  Todas lo que tiene que ver con el tipo
        _Type: {
            //  Funciones de Typo
            //  ================================

            _arPerzonilezedTypeFunctions: [],
            createPersonalize: function(type,subtype,perzonalizedFunction) { this._createPersonalize(type,subtype,perzonalizedFunction); },
            _createPersonalize: function(type,subtype,perzonalizedFunction) {
                //  Si no existe un arreglo de este tipo el lo crea
                if(this._arPerzonilezedTypeFunctions[type]===undefined)
                { this._arPerzonilezedTypeFunctions[type]= []; }
                //  Sle coloca un subtipo con la uncion
                this._arPerzonilezedTypeFunctions[type][subtype] = perzonalizedFunction;
            },

            //  Funciones para tipos especificos
            //  ================================

            //  Input
            //  -----
            _InputFunctions: function(Thing)
            {
                //  Valores
                Thing.setValue = function(text) { return this._setValue(text); }
                Thing._setValue = function(text)
                { this._element.value = text; return this; };
                Thing.getValue = function() { return this._getValue(); }
                Thing._getValue = function()
                { return this._element.value; }

                //  TextAlign
                Thing.setTextAlign = function(value) { return this._setTextAlign(value); }
                Thing._setTextAlign = function(value)
                { this._element.style.textAlign = value; return this; };
                Thing.getTextAlign = function(value) { return this._getTextAlign(value); }
                Thing._getTextAlign = function(value)
                { return this._element.style.textAlign; };

                //  Deprecate
                Thing.setText = function(text) { return this._setText(text); }
                Thing._setText = function(text)
                { return Thing._setValue(text); };
            },

            //  Texto
            //  -----
            _TextFunctions: function(Thing){
                Thing.setText = function(text) { return this._setText(text); }
                Thing._setText = function(text)
                {
                    this._element.innerHTML = text;
                    return this;
                };
                Thing.getText = function() { return this._getText(); }
                Thing._getText = function()
                {
                    return this._element.innerHTML;
                };
                Thing.setValue = function(text) { return this._setText(text); };
                Thing.getValue = function() { return this._getValue(); }
                Thing._getValue = function()
                {
                    return this._getText();
                };
                Thing.setTextAlign = function(value) { return this._setTextAlign(value); }
                Thing._setTextAlign = function(value)
                {
                    this._element.style.textAlign = value;
                    return this;
                }
                Thing.setColor = function(value) { return this._setColor(value); }
                Thing._setColor = function(value)
                {
                    this._element.style.color = value;
                    return this;
                }
                Thing.setFontSize = function(value) { return this._setFontSize(value); }
                Thing._setFontSize = function(value)
                {
                    if(!isNaN(value)) { value = _EduInt._Basic.measure(value); }
                    this._element.style.fontSize = value;
                    return this;
                }
                Thing.setLineHeight = function(value) { return this._setLineHeight(value); }
                Thing._setLineHeight = function(value)
                {
                    if(!isNaN(value)) { value = _EduInt._Basic.measure(value); }
                    this._element.style.lineHeight = value;
                    return this;
                }
                Thing.setTextAlign = function(value) { return this._setTextAlign(value); }
                Thing._setTextAlign = function(value)
                {
                    this._element.style.textAlign = value;
                    return this;
                }
            },

            _DisplayBlockFunctions: function(Thing) {
                Thing._element.onclick = function()
                {
                    this._Thing._Events.onclick=true;
                    //  Si existe una función a ejecutar al hacer click
                    if(this._Thing._funcOnClick) { this._Thing._funcOnClick(); }

                    console.info('click');
                    //  Carga la posición relativa del mouse con el Thing
                    this._Thing._loadPosDelta();
                }
                Thing._element.onmouseover = function()
                {
                    this._Thing._Events.onmouseover=true;
                }
                Thing._element.onmouseout = function()
                {
                    this._Thing._Events.onmouseover=false;
                }
                Thing._element.ontouchstart = function(event) { this._Thing._oncursordown(event); }
                Thing._element.onmousedown = function(event)
                { this._Thing._oncursordown(event); }
                Thing.oncursordown = function(event) { this._oncursordown(event); };
                Thing._oncursordown = function(event)
                {
                    this._Events.bnCursorDown=true;
                    //  Carga la posición relativa del mouse con el Thing
                    this._loadPosDelta(event);

                    console.info('oncursordown');
                }
                Thing.qstnIsCursorDown = function() { return this._qstnIsCursorDown(); };
                Thing._qstnIsCursorDown = function()
                { return this._Events.bnCursorDown; }
                //  Cuando el cursor deja de estar oprimido
                //  ---------------------------------------
                Thing._element.ontouchend = function()
                { this._Thing._oncursorup(); }
                Thing._element.onmouseup = function()
                { this._Thing._oncursorup(); }
                Thing.oncursorup = function() { this._oncursorup(); };
                Thing._oncursorup = function()
                {
                    this._Events.bnCursorDown=false;
                    console.info('oncursorup');
                }
                Thing.loadPosDelta = function(event) { this._loadPosDelta(event); };
                Thing._loadPosDelta = function(event)
                {
                    if(event===undefined)
                    {
                        var posMouseInX = this._Board._getMousePosInX();
                        var posMouseInY = this._Board._getMousePosInY();
                    }
                    else
                    {
                        var boardPosInX = this._Board._getPosInX();
                        var boardPosInY = this._Board._getPosInY();
                        var posMouseInX = _EduInt._Basic.getPosInXCursorForEvent(event)-boardPosInX;
                        var posMouseInY = _EduInt._Basic.getPosInYCursorForEvent(event)-boardPosInY;
                    }
                    var posInX = this._getPosInX();
                    var posInY = this._getPosInY();
                    this._posDeltaInX = posInX-posMouseInX;
                    this._posDeltaInY = posInY-posMouseInY;
                }
                Thing._bnDragAndDrop = false;
                Thing.enDragAndDrop = function() { return this._enDragAndDrop(); };
                Thing._enDragAndDrop = function()
                {
                    this._bnDragAndDrop = true;
                    this._addClass('c_DragAndDrop');
                    this._Board._addFunctionAnimatedInShadowSimple(function(mioptions){
                        if(this._qstnIsCursorDown())
                        {
                            if(this._Board._qstnIsMouseHover())
                            {
                                var posMouseInX = this._Board._getMousePosInX();
                                var posMouseInY = this._Board._getMousePosInY();

                                this._setPosInX(posMouseInX+this._posDeltaInX);
                                this._setPosInY(posMouseInY+this._posDeltaInY);
                            }
                        }
                        //  mioptions.Thing.accMoveInY();
                    },{  }, this );

                    return this;
                }
                Thing.setBackgroundImage = function(urlImage) { return this._setBackgroundImage(urlImage); };
                Thing._setBackgroundImage = function(urlImage,bnDefaultPath)
                {
                    if(bnDefaultPath===undefined) { bnDefaultPath=true; }
                    if(bnDefaultPath)
                    { this._element.style.backgroundImage = "url('"+this._Board._defaultPaths.images+urlImage+"')"; }
                    else
                    { this._element.style.backgroundImage = "url('"+urlImage+"')"; }
                    return this;
                }
                Thing.setBackgroundImageInAlpha = function(urlImage,bnDefaultPath) { return this._setBackgroundImageInAlpha(urlImage,bnDefaultPath); };
                Thing._setBackgroundImageInAlpha = function(urlImage,bnDefaultPath)
                { this._setBackgroundImage(urlImage,bnDefaultPath); this._setBackgroundAplpha(); return this; }
                Thing.setBackgroundColor = function(backgroundColor) { return this._setBackgroundColor(backgroundColor); };
                Thing._setBackgroundColor = function(backgroundColor)
                { this._element.style.backgroundColor = backgroundColor; return this; }
                Thing.setBackgroundAplpha = function() { return this._setBackgroundAplpha(); };
                Thing._setBackgroundAplpha = function()
                { this._setBackgroundColor('transparent'); return this; }
                Thing.setBackgroundPosition = function(backgroundPosition) { return this._setBackgroundPosition(backgroundPosition); };
                Thing._setBackgroundPosition = function(backgroundPosition)
                { this._element.style.backgroundPosition = backgroundPosition; return this; }
                //  Margen
                Thing.setMargin = function(margin) { return this._setMargin(margin); };
                Thing._setMargin = function(margin)
                { return this._element.style.margin = margin; }

                //  ID
                Thing.setId = function(id) { return this._setId(id); };
                Thing._setId = function(id)
                { this._element.id = id; return this; }
                Thing.addId = function(id) { return this._addId(id); };
                Thing._addId = function(id)
                { this._element.id = this._element.id+' '+id; return this; }
                //  Clase
                Thing._arClases = [];
                Thing._numClases = 0;
                Thing.setClass = function(className) { return this._setClass(className); };
                Thing._setClass = function(className)
                { this._element.className = className; this._arClases[0]=this._element.className; this._numClases=1; return this; }
                Thing.addClass = function(className) { return this._addClass(className); };
                Thing._addClass = function(className)
                { this._element.className = (this._element.className+' '+className).trim(); this._arClases[this._numClases]=className; this._numClases++; return this; }
                Thing.rmClass = function(className) { return this._rmClass(className); };
                Thing._rmClass = function(className)
                {
                    var newClases = '';
                    var numClases = this._numClases;
                    var arClases = this._arClases;
                    this._arClases = [];
                    this._numClases = 0;
                    var bnPrimeraClase = true;
                    for(var countClases=0;countClases<numClases;countClases++)
                    {
                        var clase = arClases[countClases];
                        if(clase != className)
                        {
                            if(bnPrimeraClase)
                            { newClases = clase; }
                            else
                            { newClases = newClases+' '+clase; }
                            this._arClases[this._numClases++] = clase;
                            bnPrimeraClase=false;
                        }
                    }
                    this._element.className = newClases;
                    return this;
                }
                //  Ancho
                Thing.getWidth = function() { return this._getWidth(); };
                Thing._getWidth = function()
                { return this._element.offsetWidth; }
                //  Ancho
                Thing.getHeight = function() { return this._getHeight(); };
                Thing._getHeight = function()
                { return this._element.offsetHeight; }
                //  Pregunta si un objeto esta sobre de este
                Thing.qstnIsThisThingOver = function(other_Thing) { return this._qstnIsThisThingOver(other_Thing); };
                Thing._qstnIsThisThingOver = function(other_Thing)
                {
                    return _EduInt._Basic.qstns.isThisThingOver(this,other_Thing);
                }


                //  Deprecated
                //  ==========

                //  Cambiarle el nombre por setBackgroundImage
                Thing.setImageUrl = function(urlImage) { return this._setImageUrl(urlImage); };
                Thing._setImageUrl = function(urlImage)
                { _EduInt._Log._deprecated('setImageUrl','setBackgroundImage'); this._element.style.backgroundImage = "url('"+urlImage+"')"; return this; }
            },

            _ElementsFunctions: function(Thing)
            {
                Thing.getElement = function() { return this._getElement(Thing); };
                Thing._getElement = function()
                {
                    return this._element;
                };
            },

            _DefaultFunctions: function(Thing)
            {
                Thing.enAboveAll = function() { this._enAboveAll(); };
                Thing._enAboveAll = function()
                { this._Container._enAboveAll(); };
                Thing.enAboveNormal = function() { this._enAboveNormal(); };
                Thing._enAboveNormal = function()
                { this._Container._enAboveNormal(); };
            },

            _Qstns: {
                isThisThingOver: function(this_Thing,other_Thing)
                {
                    //  Identifica la forma de athcivos
                    //  -------------------------------

                    var kindOfObjects = '';
                    if(this_Thing._getType()=='element' && other_Thing._getType()=='element')
                    {
                        if(this_Thing._getSubType()=='div' && other_Thing._getSubType()=='div')
                        {
                            kindOfObjects = 'div_to_div';
                        };
                    };
                    if(this_Thing._getType()=='element' && other_Thing._getType()=='text')
                    {
                        if(this_Thing._getSubType()=='div')
                        {
                            kindOfObjects = 'div_to_div';
                        };
                    };
                    if(this_Thing._getType()=='text' && other_Thing._getType()=='element')
                    {
                        if(other_Thing._getSubType()=='div')
                        {
                            kindOfObjects = 'div_to_div';
                        };
                    };

                    //  Identifica si el objeto esta ensima del otro
                    //  -------------------------------
                    switch(kindOfObjects)
                    {
                        case 'div_to_div':
                            // Posiciones de nuestro objeto
                            var myPosIzq=this_Thing._getPosInX();
                            var myPosDer=this_Thing._getPosInX()+this_Thing._getWidth();
                            var myPosSup=this_Thing._getPosInY();
                            var myPosInf=this_Thing._getPosInY()+this_Thing._getHeight();

                            var myPosXIzqSup = myPosIzq;
                            var myPosYIzqSup = myPosSup;

                            var myPosXDerSup = myPosDer;
                            var myPosYDerSup = myPosSup;

                            var myPosXIzqInf = myPosIzq;
                            var myPosYIzqInf = myPosInf;

                            var myPosXDerInf = myPosDer;
                            var myPosYDerInf = myPosInf;

                            //  Posicion del otro objeto
                            var objPosIzq=other_Thing._getPosInX();
                            var objPosDer=other_Thing._getPosInX()+other_Thing._getWidth();
                            var objPosSup=other_Thing._getPosInY();
                            var objPosInf=other_Thing._getPosInY()+other_Thing._getHeight();

                            return (
                                (   //  Esquina superior izquierda del objeto dentro de este?
                                    objPosIzq<=myPosXIzqSup && myPosXIzqSup<=objPosDer
                                    &&
                                    objPosSup<=myPosYIzqSup && myPosYIzqSup<=objPosInf
                                )
                                ||
                                (   //  Esquina superior derecha del objeto dentro de este?
                                    objPosIzq<=myPosXDerSup && myPosXDerSup<=objPosDer
                                    &&
                                    objPosSup<=myPosYDerSup && myPosYDerSup<=objPosInf
                                )
                                ||
                                (   //  Esquina inferior izquierda del objeto dentro de este?
                                    objPosIzq<=myPosXIzqInf && myPosXIzqInf<=objPosDer
                                    &&
                                    objPosSup<=myPosYIzqInf && myPosYIzqInf<=objPosInf
                                )
                                ||
                                (   //  Esquina inferior derecha del objeto dentro de este?
                                    objPosIzq<=myPosXDerInf && myPosXDerInf<=objPosDer
                                    &&
                                    objPosSup<=myPosYDerInf && myPosYDerInf<=objPosInf
                                )
                                ||
                                (   //  Esta arriba y abajo, y en medio de el ancho y el alto
                                    (myPosSup<objPosSup && objPosInf<myPosInf)
                                    &&
                                    (
                                        (objPosIzq<myPosIzq && myPosIzq<objPosDer)
                                        ||
                                        (objPosIzq<myPosDer && myPosDer<objPosDer)
                                    )
                                )
                                ||
                                (   //  Esta arriba y abajo, y en medio de el ancho y el alto
                                    (myPosIzq<objPosIzq && objPosDer<myPosDer)
                                    &&
                                    (
                                        (objPosSup<myPosSup && myPosSup<objPosInf)
                                        ||
                                        (objPosSup<myPosInf && myPosInf<objPosInf)
                                    )
                                )
                            );
                            break;
                    }
                }
            },

            //  Tipos personalizados
            _arPerzonilezedFunctions: [],
            createPersonalizedFunction: function(type,subtype,perzonalizedFunction) { this._createPersonalizedFunction(type,subtype,perzonalizedFunction); },
            _createPersonalizedFunction: function(type,subtype,perzonalizedFunction)
            {
                //  Si no existe un arreglo de este tipo el lo crea
                if(this._arPerzonilezedFunctions[type]===undefined)
                { this._arPerzonilezedFunctions[type]= []; }
                //  Sle coloca un subtipo con la uncion
                this._arPerzonilezedFunctions[type][subtype] = perzonalizedFunction;
            },


            //  Deprecate
            //  =========
            createMouseMovementDetect: function() { _EduInt._Cursor._enMovementDetect(); },
        },
    },

    _Group: {
        _Group: function(){
            
        },
    },

    //  Funciones Basicas
    //  =================

    //  Funciones basicas
    _Basic: _EduIntBasic,

    //  Deprecate
    //  =========
    loadBoardIn: function(object,path,paramGet,paramPost,onFinish) {  _EduInt._Board._loadIn(object,path,paramGet,paramPost,onFinish); },
    createPersonalizedType: function(type,subtype,perzonalizedFunction) { _EduInt._Thing._Type._createPersonalize(type,subtype,perzonalizedFunction); },
};

//  Funciones Publicas
//  ==================
_EduInt.Thing = _EduInt._Thing;
_EduInt.Basic = _EduInt._Basic;

//  Compatible con JQuery
//  =====================
//  =====================
try
{
    (function($)
    {
        //  Create de canvas
        $.fn.createBoard=function(nameBoard,width,height)
        {
            //  Create a new board
            eiBoard=_EduInt._Board._createSimple(nameBoard,width,height);
            //  Coloca el tablero en el objeto
            eiBoard._setBoardJQueryIn(this);
            //  Retorna el tablero
            return eiBoard;
        };
        $.fn.createInThisABoardThings=function(nameBoard)
        {

            //  Create a new board
            eiBoard=_EduInt.createInThisABoardThings(nameBoard,this);
            //  Retorna el tablero
            return eiBoard;
        }
    }( jQuery ));
}
catch(err)
{
    console.err(err.message);
}

//  Establece la funcion de consutla
//  ================================
//  ================================
_EduInt7=_EduInt;
EduInt=_EduInt7;

//  Deprecate
//  =========
//  =========
BasicEI = _EduInt._Basic;
_EduInt.createBoardIn=_EduInt._Board._createSimpleIn;
