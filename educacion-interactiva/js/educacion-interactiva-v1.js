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

    removeAccents: function(valor) { var acentos = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç"; var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc"; for (var i=0; i<acentos.length; i++) { valor = valor.replace(acentos.charAt(i), original.charAt(i)); }; return valor; },
    //  Retorna un nombre de maquina, sin tildes ni espacios ni caracteres raros
    machineName: function(valor) {
        return this.removeAccents(valor.toLowerCase().replace(/\s/g,"_"));
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

    qstnIsNumber: function(numero) { return this._qstnIsNumber(numero); },
    _qstnIsNumber: function(numero)
    {
        return !isNaN(numero) && numero!=='';
    },
    // this function was linked by @Paul Rosania.
    qstnIsFunction: function(functionToCheck) { return this._qstnIsFunction(functionToCheck); },
    _qstnIsFunction: function(functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';   
    },
    replaceAll: function(aCambiar_MyR,aColocar,valor_MyR) { return this._replaceAll(aCambiar_MyR,aColocar,valor_MyR); },
    _replaceAll: function(aCambiar_MyR,aColocar,valor_MyR)
    {
        while(0<=valor_MyR.indexOf(aCambiar_MyR))
        { valor_MyR=valor_MyR.replace(aCambiar_MyR,'¬'); }
        while(0<=valor_MyR.indexOf('¬'))
        { valor_MyR=valor_MyR.replace('¬',aColocar); }
        return valor_MyR;
    },

    _trim(valor_MyR)
    {
        while(0<=valor_MyR.indexOf("  "))
        {
            valor_MyR=valor_MyR.replace("  "," ");
        }
        var valorLength_MyR=valor_MyR.length;
        if(valor_MyR.substr(valorLength_MyR-1,valorLength_MyR)==" ")
        {
            valor_MyR=valor_MyR.substr(0,valorLength_MyR-1);
        }
        if(valor_MyR.substr(0,1)==" ")
        {
            valor_MyR=valor_MyR.substr(1,valorLength_MyR);
        }
        return valor_MyR;
    },
    _accNameFormat(nombre_MyR)
    {
        nombre_MyR=_EduIntBasic._trim(nombre_MyR);
        var arNombre_MyR=nombre_MyR.split(" ");
        var noArNombre_MyR=arNombre_MyR.length;
        for(var contArNombre=0;contArNombre<noArNombre_MyR;contArNombre++)
        {
            if(0<arNombre_MyR[contArNombre].length)
            {
                arNombre_MyR[contArNombre]=arNombre_MyR[contArNombre].substr(0,1).toUpperCase()+arNombre_MyR[contArNombre].substr(1,arNombre_MyR[contArNombre].length).toLowerCase();
            }
            else
            {
                arNombre_MyR[contArNombre]=arNombre_MyR[contArNombre].toUpperCase();
            }
        }
        return arNombre_MyR.join(" ");
    },
    _accNumberFormat: function(numero_MyR,decimales_MyR,decPunto,sepMiles)
    {
        if(decimales_MyR==undefined) { decimales_MyR = 2; }
        if(decPunto==undefined)      { decPunto = ","; }
        if(sepMiles==undefined)      { sepMiles = "."; }
        //  Redondear
        numero_MyR = _EduIntBasic._redondear(numero_MyR,decimales_MyR);
        //  pasa a string
        var stNumero_MyR=numero_MyR.toString();
        //  Divide la parte entera de la decimal
        var valor_MyR=stNumero_MyR.split(".");
        //  Si no tiene parte entera la coloca
        if(valor_MyR[0]==undefined) valor_MyR[0]=0;
        //  Si no tiene parte decimal la coloca
        if(valor_MyR[1]==undefined) { var valDecimal_MyR = ""; } else { var valDecimal_MyR=valor_MyR[1]; }
        //  Se encarga que tenga el numero de decimales que quiere
        while(valDecimal_MyR.length<decimales_MyR)
        {
            //  Concatena los ceros que hacen falta
            valDecimal_MyR=valDecimal_MyR+"0";
        }
        //  Arreglo que dividira la parte entera por cada tres numeros
        var numeroEntero_MyR="";
        //  Si es mas largo de tres numeros enteros, este contendra temporalmente
        //  los ultimos tres, luego se quitaran y contendra los que serian los 
        //  ultomos tres.
        var noUltimosTres_MyR;
        //  Valor entero
        var valorEnteroTemp_MyR = valor_MyR[0];
        //  Longitud de la parte entera
        var valorEnteroTempLeng_MyR = valorEnteroTemp_MyR.length;
        //  va a quitarle de tres numeros por cada entrada
        while(valorEnteroTempLeng_MyR>3)
        {
            //  Quita la parte entera
            noUltimosTres_MyR=valorEnteroTemp_MyR.substr(valorEnteroTempLeng_MyR-3,valorEnteroTempLeng_MyR);
            //  Concatena de tres em tres
            if(numeroEntero_MyR=="") numeroEntero_MyR=sepMiles+noUltimosTres_MyR;
            else                 numeroEntero_MyR=sepMiles+noUltimosTres_MyR+numeroEntero_MyR;
            //  
            valorEnteroTemp_MyR=valorEnteroTemp_MyR.substr(0,valorEnteroTempLeng_MyR-3);
            //  Longitud de la parte entera
            valorEnteroTempLeng_MyR=valorEnteroTemp_MyR.length;
        }
        //  
        return valorEnteroTemp_MyR+numeroEntero_MyR+(decimales_MyR!==0?decPunto+valDecimal_MyR:'');
    },
    _redondear: function(valor_MyR,decimales_MyR)
    {
        myDecimales_MyR = Math.pow(10,decimales_MyR);
        return Math.round(valor_MyR*myDecimales_MyR)/myDecimales_MyR;
    },
    colocarCeros: function(noCeros_MyR,valor_MyR) { return this._colocarCeros(noCeros_MyR,valor_MyR); },
    _colocarCeros: function(noCeros_MyR,valor_MyR)
    {
        var stValor_MyR = valor_MyR.toString();
        while(stValor_MyR.length<noCeros_MyR)
        {
            stValor_MyR="0"+stValor_MyR.toString()+"";
        }
        return stValor_MyR;
    },

    /*
    crearElementos({
        element: 'div',
        className: 'casa',
        children: [{
            element: 'div',
            className: 'casa2'
        }],
    });
    <div class="casa">
        <div class="casa2"></div>
    </div>
    */
    crearElementos: function(jsonBloqueInfo,parent)
    {
        var elementBase=document.createElement(jsonBloqueInfo.element);
        for(keyJsonBloqueInfo in jsonBloqueInfo)
        {
            var valueJsonBloqueInfoField = jsonBloqueInfo[keyJsonBloqueInfo];
            switch(keyJsonBloqueInfo)
            {
                case 'element':

                    break;
                case 'style':
                    for(stylesValueKey in valueJsonBloqueInfoField)
                    {
                        elementBase.style[stylesValueKey] = valueJsonBloqueInfoField[stylesValueKey];
                    }
                    break;
                case 'name':
                    parent[valueJsonBloqueInfoField]=elementBase;
                    break;
                case 'class':
                    elementBase.className=valueJsonBloqueInfoField;
                    break;
                case 'html':
                    elementBase.innerHTML=valueJsonBloqueInfoField;
                    break;
                default:
                    elementBase[keyJsonBloqueInfo]=valueJsonBloqueInfoField;
                    break;
            }
        }
        if(jsonBloqueInfo.children!==undefined)
        {
            for(var countChildren=0;countChildren<jsonBloqueInfo.children.length;countChildren++)
            {
                elementBase.appendChild(this.crearElementos(jsonBloqueInfo.children[countChildren]));
            }
        }
        return elementBase;
    },

    //  Objeto que tiene todo lo necesario de elemento
    Code: function(valor,infoCode)
    {
        this._infoCode=infoCode;
        this.valorConDivisorDePalabras = '';
        this._divisorDePalabras = '~';
        this._bnExisteAutocompletar = false;
        this.accProcesarCodigo = function(valor,parent)
        {
            var infoCode=this._infoCode;
            var _divisorDePalabras = this._divisorDePalabras;

            /** pasarDeCodigoAColor_ESt("o('pedro').setPosicionEnX(12);"); **/

            //  Coloca un divizor al comienzo y al final
            var valor_ESt_=valor;
            //  Cambia los espacios por un caracter que entiende html, y se aplica para todo el valor
            valor_ESt_=_EduIntBasic._remplaceAll(' ','&nbsp',valor_ESt_);
            valor_ESt_=_EduIntBasic._remplaceAll('<','&#60',valor_ESt_);
            valor_ESt_=_EduIntBasic._remplaceAll('>','&#62',valor_ESt_);

            //  Deja aparte los comentarios
            valor_ESt_ = ei.FiltAndMask.cambiarValoresIntermediosPorReservado(valor_ESt_,'comentarios',infoCode.notIncluded);
            //  Deja aparte los comentarios
            valor_ESt_ = ei.FiltAndMask.cambiarValoresIntermediosPorReservado(valor_ESt_,'comillas',infoCode.quotes);

            //  Colocamos un divizor al comienzo y final de las palabras
            var valor_ESt_=_divisorDePalabras+valor_ESt_+_divisorDePalabras;
            /** "%o(LasComillasSeRemplazanPorTextosUnicos).setPosicionEnX(12);%" **/

            //  Estas son las palabras que tipicamente dividen una palabra de otra
            var arPalabrasQueSimbolisanElFinDeUnaPlabra=infoCode.dividersWords;
            //  Coloco un simbolo al comienzo y al final
            valor_ESt_=_divisorDePalabras+valor_ESt_+_divisorDePalabras;
            //  Pasa por cada una de estas y le coloca antes y despues de las mismas un '[%]' de tal manera que divida estas palabras
            for(contPalabrasQSEFDUP=0;contPalabrasQSEFDUP<arPalabrasQueSimbolisanElFinDeUnaPlabra.length;contPalabrasQSEFDUP++)
            {
                var valor_ESt_=_EduIntBasic._remplaceAll(arPalabrasQueSimbolisanElFinDeUnaPlabra[contPalabrasQSEFDUP],_divisorDePalabras+arPalabrasQueSimbolisanElFinDeUnaPlabra[contPalabrasQSEFDUP]+_divisorDePalabras,valor_ESt_);
            }
            //  Limpia los divisores de lapabras dobles
            var dP =_divisorDePalabras;
            while(valor_ESt_.indexOf(dP+dP+'')!=-1){ valor_ESt_=valor_ESt_.replace(dP+dP,dP); };

            var valorConDivisorDePalabras = valor_ESt_;

            //  Por defecto no existen palabaras para autocompletar
            this._bnExisteAutocompletar=false;
            //  Verifica si no es el primer valor asignado, si no lo es verifica si puede colocar un select
            if(this.valorConDivisorDePalabras)
            {
                this.valorConDivisorDePalabrasLast=this.valorConDivisorDePalabras;
                this.valorConDivisorDePalabras=valorConDivisorDePalabras;            
                if(this.valorConDivisorDePalabrasLast)
                {
                    //  Verifica si el nuevo y el viejo solo tiene una palabra nueva
                    if(this.valorConDivisorDePalabrasLast.length+1==this.valorConDivisorDePalabras.length)
                    {
                        var arPalabrasAnteriores = this.valorConDivisorDePalabrasLast.split(_divisorDePalabras);
                        var arPalabrasActuales = this.valorConDivisorDePalabras.split(_divisorDePalabras);
                        if(arPalabrasAnteriores.length==arPalabrasActuales.length)
                        {
                            //  Pasar por cada una de las palabras y encontrar la palabra con la diferencia
                            for(var countWords=0;countWords<arPalabrasAnteriores.length;countWords++)
                            {
                                var palabraAnterior = arPalabrasAnteriores[countWords];
                                var palabraActual = arPalabrasActuales[countWords];

                                if(palabraAnterior!==palabraActual)
                                {
                                    arPalabrasActuales[countWords]='<span id="eigdi-code-autocompletar" style="position: relative" ></span>'+palabraActual;
                                    
                                    this.palabraCambiada = palabraActual;
                                    this._bnExisteAutocompletar=true;
                                    break;
                                }
                            }

                            var valor_ESt_ = arPalabrasActuales.join(_divisorDePalabras);

                            //  Pasar este dato antes de convertir el html, de manera que deje un span con una posicion rastreable

                            //  Guardar la palabra que cambio para buscarla en el autocompletar
                            //  Mostrar ayudas y hacer todo muy cool
                        }
                    }
                }
            }
            this.valorConDivisorDePalabras=valorConDivisorDePalabras;

            //  Las funciones tipicas
            var arPalabrasQueSimbolisanFunciones=infoCode.reserved;
            //  Pasa por cada una de las funciones y le coloca en un span dandole color
            for(contPalabrasQueSimbolisanFunciones=0;contPalabrasQueSimbolisanFunciones<arPalabrasQueSimbolisanFunciones.length;contPalabrasQueSimbolisanFunciones++)
            {
                var valor_ESt_=_EduIntBasic._remplaceAll(_divisorDePalabras+arPalabrasQueSimbolisanFunciones[contPalabrasQueSimbolisanFunciones].word+_divisorDePalabras,_divisorDePalabras+'<span fnc="ESt" >'+arPalabrasQueSimbolisanFunciones[contPalabrasQueSimbolisanFunciones].word+'</span>'+_divisorDePalabras,valor_ESt_);
            }
            /** "%<span .. >o</span>%(%LasComillasSeRemplazanPorTextosUnicos%)%%.%<span .. >posicionEnX</span>%(%12%)%;" **/

            //  palabras clave tipicas
            var arPalabrasClaves_ESt=infoCode.reservedFunctions;
            //  Pasa por cada una de las funciones y le coloca en un span dandole color
            for(contPalabrasQueSimbolisanFunciones=0;contPalabrasQueSimbolisanFunciones<arPalabrasClaves_ESt.length;contPalabrasQueSimbolisanFunciones++)
            {
                var valor_ESt_=_EduIntBasic._remplaceAll(_divisorDePalabras+arPalabrasClaves_ESt[contPalabrasQueSimbolisanFunciones]+_divisorDePalabras,_divisorDePalabras+'<span palclv="ESt" >'+arPalabrasClaves_ESt[contPalabrasQueSimbolisanFunciones]+'</span>'+_divisorDePalabras,valor_ESt_);
            }
            /** "%<span .. >o</span>%(%LasComillasSeRemplazanPorTextosUnicos%)%%.%<span .. >posicionEnX</span>%(%12%)%;" **/

            //  Colocarle color a los puntos claves
            var valor_ESt_=_EduIntBasic._remplaceAll(_divisorDePalabras+'('+_divisorDePalabras,_divisorDePalabras+'<span prntesis="ESt">(</span>'+_divisorDePalabras,valor_ESt_);
            var valor_ESt_=_EduIntBasic._remplaceAll(_divisorDePalabras+')'+_divisorDePalabras,_divisorDePalabras+'<span prntesis="ESt">)</span>'+_divisorDePalabras,valor_ESt_);
            var valor_ESt_=_EduIntBasic._remplaceAll(_divisorDePalabras+';'+_divisorDePalabras,_divisorDePalabras+'<span pntoycom="ESt">;</span>'+_divisorDePalabras,valor_ESt_);
            /** "%<span .. >o</span>%<span .. >(</span>%LasComillasSeRemplazanPorTextosUnicos%<span .. >)</span>%%.%<span .. >posicionEnX</span>%<span .. >(</span>%12%<span .. >)</span>%;" **/

            //  Vuelve a convertir lo que esta entre comentarios a lo que era antes
            valor_ESt_=ei.FiltAndMask.retornarValoresReservadoPorIntermedios(valor_ESt_,'comentarios');
            //  Vuelve a convertir lo que esta entre comillas a lo que era antes
            valor_ESt_=ei.FiltAndMask.retornarValoresReservadoPorIntermedios(valor_ESt_,'comillas');

            //  Cambia los cambios de linea del tecto en cambios de linea HTML
            var valor_ESt_=_EduIntBasic._remplaceAll("\r"+_divisorDePalabras+"\n",'<br/>',valor_ESt_);
            var valor_ESt_=_EduIntBasic._remplaceAll("\n",'<br/>',valor_ESt_);
            var valor_ESt_=_EduIntBasic._remplaceAll("\r",'<br/>',valor_ESt_);

            //  Coloca un epacio al final para que sea visible el <br> al final
            valor_ESt_=valor_ESt_+'&nbsp'+_divisorDePalabras;

            //  Divide el codigo por palabras para sacar los numeros y colocarle color
            arPorPalabrasValor_ESt=valor_ESt_.split(_divisorDePalabras);
            //  Pasa por cada palabra
            for(var contPorPalabrasValor_ESt=0;contPorPalabrasValor_ESt<arPorPalabrasValor_ESt.length;contPorPalabrasValor_ESt++)
            {
                if(_EduIntBasic._qstnIsNumber(arPorPalabrasValor_ESt[contPorPalabrasValor_ESt]))
                {
                    arPorPalabrasValor_ESt[contPorPalabrasValor_ESt]='<span num="ESt" >'+arPorPalabrasValor_ESt[contPorPalabrasValor_ESt]+'</span>';
                }
            }

            //  Al final quita los divizores de la pabras
            valor_ESt_=arPorPalabrasValor_ESt.join('');

            //  Parametros
            //  =========
            this.valorHtml=valor_ESt_;
        }

        this.accProcesarCodigo(valor);
        //  Metodos
        //  =======
        this.getValorHTML=function(){
            return this.valorHtml;
        };
        this.accMostrarAutocompletar=function(){
            if(this._bnExisteAutocompletar)
            {
                if(document.getElementById('eigdi-code-autocompletar'))
                {
                    this.palabraCambiada;
                    var select = _EduInt._Input.Plugins.Select.create({ options: ['setPosInXY','setPosInX','setPosInY']});
                    select.element.style.position='absolute';
                    select.element.style.top='10px';
                    select.element.style.left='0px';
                    document.getElementById('eigdi-code-autocompletar').appendChild(select.element);
                }
            }
        };

        return this;
    },

    _Comunication: {
        _Ajax: {
            _defaultJson: {
                method: 'GET',
                path: '/',
                sendInfo: '',
                myFunction: function(responseText, jsonInfo) {  },
                myFunctionJsonInfo: {  },
            },
            send: function(jsonInfo,parent) { this._send(jsonInfo,parent); },
            _send: function(jsonInfo,parent)
            {
                jsonInfo=_EduIntBasic._defaultJson(jsonInfo,this.defaultJson);
                var xhttp = new XMLHttpRequest();
                xhttp.myFunction=jsonInfo.myFunction;
                xhttp.myFunctionJsonInfo=jsonInfo.myFunctionJsonInfo;
                xhttp.parent=parent;
                if(typeof jsonInfo.path === 'function') { var path = jsonInfo.path(); }
                else { var path = jsonInfo.path; }
                xhttp.onreadystatechange = function()
                {
                    if(xhttp.readyState == 4 && xhttp.status == 200)
                    {
                        this.myFunctionJsonInfo.readyState=xhttp.readyState;
                        this.myFunctionJsonInfo.status=xhttp.status;
                        if(xhttp.parent===undefined)
                        {
                            this.myFunction(xhttp.responseText, this.myFunctionJsonInfo);
                        }
                        else
                        {
                            xhttp.parent._miFunction_=this.myFunction;
                            xhttp.parent._miFunction_(xhttp.responseText, this.myFunctionJsonInfo);
                        }
                    }
                };
                xhttp.open(jsonInfo.method, path+((jsonInfo.sendInfo!='' && jsonInfo.method!='GET')?('?'+jsonInfo.sendInfo):''), true);

                if(jsonInfo.sendInfo!='' && jsonInfo.method=='POST')
                {
                    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhttp.send(jsonInfo.sendInfo);
                }
                else
                {
                    xhttp.send();
                }
            },
        }
    },

    _Filters: {
        code: function(valor_ESt,infoCode) { return this._code(valor_ESt,infoCode); },
        _code: function(valor_ESt,infoCode)
        {
            return _EduIntBasic.Code(valor_ESt,infoCode).getValorHTML();
        },
        _accFilter(field, filter)
        {
            switch(filter.type)
            {
                case 'name':
                    field.value = _EduIntBasic._accNameFormat(field.value);
                    break;
                case 'toUpperCase':
                case 'uppercase':
                    field.value = field.value.toUpperCase();
                    break;
                case 'toLowerCase':
                case 'lowercase':
                    field.value = field.value.toLowerCase();
                    break;
            }
        },
    },
    _Masks: {
        _accMask(field, filter)
        {
            field._eiValorOriginal = field.value;
            switch(filter.type)
            {
                case 'documento':
                    field.value = _EduIntBasic._accNumberFormat(field.value,0,",",".");
                    break;
                case 'colombianPeso':
                    field.value = '$'+_EduIntBasic._accNumberFormat(field.value,0,",",".");
                    break;
            }
        },
        _accUnMask(field)
        {
            if(field._eiValorOriginal!==undefined)
            {
                field.value = field._eiValorOriginal;
            }
        },
    },
    _Validations:
    {
        _qstnIsNumber: function(num)
        {
            return _EduIntBasic._qstnIsNumber(num);
        },
        _qstnHaveContent: function(val)
        {
            if(val==='' || val===' ')
            {
                return false;
            }
            return true;
        },
        //  Retorna toda la información correspondiente a la validación, mensaje para usuario
        _withInformation: function(value, validation)
        {
            var bnValidate = true;
            if(validation.condition!==undefined)
            {
                bnValidate = validation.condition();
            }

            if(bnValidate)
            {
                switch(validation.type)
                {
                    case 'isNumber':
                        if(this._qstnIsNumber(value))
                        {
                            if(validation.num_max!==undefined)
                            {
                                if(value.toString().length<=validation.num_max)
                                {
                                    return { result: 'correct' };
                                }
                                else
                                {
                                    return {
                                        result: 'wrong',
                                        codeValidationError: 'validation-1.1',
                                        message: (validation.error_mesage!==undefined?validation.error_mesage:'El numero tiene que ser menor a <span style="font-weight: bold;" >'+validation.num_max+'</span> cacacteres'),
                                    }
                                }
                            }
                            else if(validation.num_limit!==undefined)
                            {
                                if(value.toString().length===validation.num_limit)
                                {
                                    return { result: 'correct' };
                                }
                                else
                                {
                                    return {
                                        result: 'wrong',
                                        codeValidationError: 'validation-1.2',
                                        message: (validation.error_mesage!==undefined?validation.error_mesage:'El numero tiene que tener <span style="font-weight: bold;" >'+validation.num_limit+'</span> cacacteres'),
                                    }
                                }
                            }
                            else if(validation.num_min!==undefined)
                            {
                                if(validation.num_min<=value.toString().length)
                                {
                                    return { result: 'correct' };
                                }
                                else
                                {
                                    return {
                                        result: 'wrong',
                                        codeValidationError: 'validation-1.3',
                                        message: (validation.error_mesage!==undefined?validation.error_mesage:'El numero tiene que ser mator a <span style="font-weight: bold;" >'+validation.num_min+'</span> cacacteres'),
                                    }
                                }
                            }
                            return { result: 'correct' };
                        }
                        else
                        {
                            return {
                                result: 'wrong',
                                codeValidationError: 'validation-1',
                                message: (validation.error_mesage!==undefined?validation.error_mesage:'El valor tiene que ser un <span style="font-weight: bold;" >Numero</span>'),
                            }
                        }
                        break;
                    case 'haveContent':
                        if(this._qstnHaveContent(value))
                        {
                            return { result: 'correct' };
                        }
                        else
                        {
                            return {
                                result: 'wrong',
                                codeValidationError: 'validation-2',
                                message: (validation.error_mesage!==undefined?validation.error_mesage:'El valor tiene que ser un <span style="font-weight: bold;" >Numero</span>'),
                            }
                        }
                        break;
                }
            }
            else
            {
                return { result: 'dont-validated' };
            }
        },
    },
    //  Se asignan en _addCharacteristicsInField
    _accValidateAsField: function(field)
    {
        if(field===undefined) { field=this; }
        
        var bnPrimeraVezColocandoComentarioError=true;
        var bnSinErrores=true;
        if(field._fieldCharacteristics!==undefined)
        {
            if(field._fieldCharacteristics.validaciones!==undefined)
            {
                for(var countValidaciones=0;countValidaciones<field._fieldCharacteristics.validaciones.length;countValidaciones++)
                {
                    var validacion = field._fieldCharacteristics.validaciones[countValidaciones];
                    var answValidacion = _EduIntBasic._Validations._withInformation(field.value, validacion);
                    if(answValidacion.result==='correct')
                    {
                        if(field._fieldCharacteristics.errorElement!==undefined) { field._fieldCharacteristics.errorElement.innerHTML=''; }
                    }
                    else if(answValidacion.result==='dont-validated')
                    {
                        
                    }
                    else
                    {
                        bnSinErrores=false;
                        if(bnPrimeraVezColocandoComentarioError)
                        {
                            var bnBorrarLista = true;
                        }
                        else
                        {
                            var bnBorrarLista = false;
                        }
                        
                        if(field._fieldCharacteristics.errorElement!==undefined)
                        {
                            _EduIntBasic._accAddLiElement(field._fieldCharacteristics.errorElement, answValidacion.message, { bnClear: bnBorrarLista });
                            bnPrimeraVezColocandoComentarioError=false;
                        }
                    }
                }
            }
        }
        return bnSinErrores;
    },
    _accFilterAsField: function(field)
    {
        if(field===undefined) { field=this; }
        
        if(field._fieldCharacteristics!==undefined)
        {
            if(field._fieldCharacteristics.filters!==undefined)
            {
                for(var countFilters=0;countFilters<field._fieldCharacteristics.filters.length;countFilters++)
                {
                    var filter = field._fieldCharacteristics.filters[countFilters];
                    _EduIntBasic._Filters._accFilter(field, filter);
                }
            }
        }
    },
    _accMaskAsField: function(field)
    {
        if(field===undefined) { field=this; }
        
        if(field._fieldCharacteristics!==undefined)
        {
            if(field._fieldCharacteristics.masks!==undefined)
            {
                for(var countFilters=0;countFilters<field._fieldCharacteristics.masks.length;countFilters++)
                {
                    var mask = field._fieldCharacteristics.masks[countFilters];
                    _EduIntBasic._Masks._accMask(field, mask);
                }
            }
        }
    },
    _accUnMaskAsField: function(field)
    {
        if(field===undefined) { field=this; }
        
        _EduIntBasic._Masks._accUnMask(field);
    },
    //  Añade validaciones, mascaras y filtros a un input, select o textarea(Yo lo resume en campo/Field)
    _addCharacteristicsInField: function(field, _fieldCharacteristics)
    {
        field._fieldCharacteristics=_fieldCharacteristics;
        
        field.addEventListener('focus', function() { _EduIntBasic._accUnMaskAsField(this); } );

        field.addEventListener('change', function() { _EduIntBasic._accValidateAsField(this); });
        field.addEventListener('keyup',  function() { _EduIntBasic._accValidateAsField(this); });
        
        field.addEventListener('blur', function() { _EduIntBasic._accValidateAsField(this); _EduIntBasic._accFilterAsField(this); _EduIntBasic._accMaskAsField(this); } );
    },
    _addCharacteristicsInFields: function(fieldsCharacteristics)
    {
        for(var countCampos=0;countCampos<fieldsCharacteristics.length;countCampos++)
        {
            var infoCampo = fieldsCharacteristics[countCampos];
            _EduIntBasic._addCharacteristicsInField(infoCampo.inputElement, infoCampo);
        }
    },
    _accSubmitFieldsWithValidations: function(form)
    {
        var bnPuedeHacerSubmit=true;
        var arPosiblesTiposDeCampos=['input','select','textarea'];
        for(var countTiposDeCampos=0;countTiposDeCampos<arPosiblesTiposDeCampos.length;countTiposDeCampos++)
        {
            fields = form.getElementsByTagName(arPosiblesTiposDeCampos[countTiposDeCampos]);
            for(var countField=0;countField<fields.length;countField++)
            {
                field = fields[countField];
                if(_EduIntBasic._accValidateAsField(field)===false)
                {
                    bnPuedeHacerSubmit=false;
                }
            }
            if(required)
            {

            }
        }

        if(bnPuedeHacerSubmit)
        {
            form.submit();
        }
    },

    
    _accAddLiElement: function(errorElement, valor, jsonInfo)
    {
        jsonInfo.container=errorElement;
        if(!jsonInfo.ulclass) { jsonInfo.ulclass='error-list-ul'; };
        if(!jsonInfo.liclass) { jsonInfo.liclass='error-list-li'; };
        jsonInfo.value=valor;

        if(jsonInfo.bnClear===undefined) { jsonInfo.bnClear=false; }

        //  Existe el ul
        if(0<jQuery(jsonInfo.container).find('> ul').length)
        {
            jQuery(jsonInfo.container).find('> ul').addClass(jsonInfo.ulclass);
            //  Existe el li
            if(0<jQuery(jsonInfo.container).find('> ul > li').length)
            {
                //  Lo borra
                if(jsonInfo.bnClear)
                {
                    jQuery(jsonInfo.container).find('> ul').html('');
                }
            }
        }
        else
        {
            var ul = document.createElement('ul');
            jQuery(ul).addClass(jsonInfo.ulclass);
            jsonInfo.container.appendChild(ul);
        }

        var li = document.createElement('li');

        jQuery(li).addClass(jsonInfo.liclass);
        li.innerHTML=jsonInfo.value;

        jQuery(jsonInfo.container).find('> ul').append(li);
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
    remplaceAll: function(aCambiar_MyR,aColocar,valor_MyR) { return this._replaceAll(aCambiar_MyR,aColocar,valor_MyR); },
    _remplaceAll: function(aCambiar_MyR,aColocar,valor_MyR) { return this._replaceAll(aCambiar_MyR,aColocar,valor_MyR); },
    // addThingStyleBlockFunctions: function(Thing) { _EduInt._Thing._Type._(Thing); }
};

_EduIntBasic.Comunication = _EduIntBasic._Comunication;
_EduIntBasic.Comunication.Ajax = _EduIntBasic._Comunication._Ajax;
_EduIntBasic.Comunication.Ajax.defaultJson = _EduIntBasic._Comunication._Ajax._defaultJson;

_EduIntBasic.Filters = _EduIntBasic._Filters;
_EduIntBasic.Masks = _EduIntBasic._Masks;
_EduIntBasic.Validations = _EduIntBasic._Validations;



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

    //  Valore spor defecto
    //  ===================
    //  En caso de ser true, muestra alugnos logs extra para poder probar
    //  EduInt.accEnDebugMode(); // Para activar el modo debug
    _bnDebug: false,

    accEnDebugMode: function() { this._accEnDebugMode(); },
    _accEnDebugMode: function() { this._bnDebug=true; },
    
    accDisDebugMode: function() { this._accDisDebugMode(); },
    _accDisDebugMode: function() { this._bnDebug=true; },

    qstnIsInDebugMode: function() { return this._qstnIsInDebugMode(); },
    _qstnIsInDebugMode: function() { return this._bnDebug; },



    
    //  Inputs
    //  ======
    //  Crea todos los inputs con estilos y caracteristicas especiales
    _Input: {
        defaultInfoInput: { type: 'text', name: '', placeholder: '', className: '', id: '', value: '', value_base68: '', },
        defaultInfoInputCode: { name: '', placeholder: '', value: '', value_base68: '', },
        Plugins: {
            //  Select
            //  ======
            //  +------------+
            //  | Opción 001 |
            //  +------------+
            //  | Opción 002 |
            //  +------------+
            //  | Opción 003 |
            //  +------------+
            Select: 
            {
                defaultInfoSelect: {
                    //  Estos son los valores: ['Valor Real', 'Valor a mostrar']
                    options: [['option1', 'Opción 1'], ['option2', 'Opción 2'], ['option3', 'Opción 3']],
                    //  Esta funcion se ejecutaria cada vez que se selecciona una opcion siguiendo
                    //  el ejemplo anterior, si seleccionaran 'Opción 1' el valor enviado a la 
                    //  funcion seria valor = 'option1' ý valorAMostrar = 'Opción 1'
                    /*
                    //  Ejemplo de funcion
                    functionOnSelect: function(valor,valorAMostrar) {
                        alert('valor: '+valor+', valorAMostrar: '+valorAMostrar);
                    }
                    */
                    //  Desaparecer al ejecutar la funcion
                    deappearRunFunction: true,
                },
                ar: [],
                create: function(jsonOptions){
                    return new _EduInt._Input.Plugins.Select.Select(jsonOptions);
                },
                Select: function(jsonOptions) {
                    jsonOptions = _EduIntBasic._defaultJson(jsonOptions,_EduInt._Input.Plugins.Select.defaultInfoSelect);
                    //  Funciones
                    this.destroy = function(numTime) {
                        if(numTime===undefined) { numTime=0; }
                        setTimeout('try {  _EduInt._Input.Plugins.Select.ar['+this.numEISelect+'].element.parentNode.removeChild(_EduInt._Input.Plugins.Select.ar['+this.numEISelect+'].element); } catch(err) {  }', numTime);
                    }

                    this.element = document.createElement('div');
                    this.element.className = 'c_ei_selection';
                    
                    this.numEISelect = _EduInt._Input.Plugins.Select.ar.length;
                    _EduInt._Input.Plugins.Select.ar[this.numEISelect]=this;
                    
                    this.element._numEISelect = this.numEISelect;

                    this.contenedorUl = document.createElement('ul');
                    this.contenedorUl.className = 'c_ei_selection_ul';
                    this.element.appendChild(this.contenedorUl);


                    for(var countSection=0;countSection<jsonOptions.options.length;countSection++)
                    {
                        var option = jsonOptions.options[countSection];
                        var bnHelp = false;
                        if(Array.isArray(option))
                        {
                            var valor = option[0];
                            var valorAMostrar = option[1];
                            if(option[2])
                            {
                                var help = option[2];
                                bnHelp=true;
                            }
                        }
                        else
                        {
                            var valor = option;
                            var valorAMostrar = valor;
                        }

                        this.contenedorElementoUlLi = document.createElement('li');
                        this.contenedorElementoUlLi.className = 'c_ei_selection_ul_li';
                        this.contenedorUl.appendChild(this.contenedorElementoUlLi);

                        this.contenedorElementoUlLiA = document.createElement('span');
                        this.contenedorElementoUlLiA.className = 'c_ei_selection_ul_li_span';
                        this.contenedorElementoUlLiA.innerHTML=valorAMostrar;

                        if(bnHelp)
                        {
                            this.contenedorElementoUlLi.appendChild(help);
                        }

                        if(jsonOptions.functionOnSelect)
                        {
                            this.contenedorElementoUlLiA._functionOnSelect = jsonOptions.functionOnSelect;
                            this.contenedorElementoUlLiA._valor = valor;
                            this.contenedorElementoUlLiA._valorAMostrar = valorAMostrar;
                            this.contenedorElementoUlLiA._deappearRunFunction = jsonOptions.deappearRunFunction;
                            this.contenedorElementoUlLiA._numEISelect = this.numEISelect;
                            this.contenedorElementoUlLiA.onclick=function() {
                                _EduInt._Input.Plugins.Select.ar[this._numEISelect]._functionOnSelect=this._functionOnSelect;
                                _EduInt._Input.Plugins.Select.ar[this._numEISelect]._functionOnSelect(this._valor, this._valorAMostrar);
                                if(this._deappearRunFunction) { _EduInt._Input.Plugins.Select.ar[this._numEISelect].destroy(); }
                            }
                        }

                        this.contenedorElementoUlLi.appendChild(this.contenedorElementoUlLiA);
                    }
                },
            },
        },
        Events: {
            WriteIdea: {
                arWriteIdea: [],
                create: function(element, miFunction, jsonInfo, timeVerify)
                {
                    return new this.WriteIdea(element, miFunction, jsonInfo, timeVerify);
                },
                WriteIdea: function(element, miFunction, jsonInfo, timeVerify)
                {
                    //  Tiempo en que verifica
                    if(jsonInfo===undefined) { jsonInfo={ }; }
                    if(timeVerify===undefined) { timeVerify=300; }
                    //  Variables para convertir el elemento en WriteIdea
                    this.element=element;
                    this.lastWriteIdea='';
                    this.lastWriteIdeaExecuted='';
                    this.numLastWriteIdea=[];
                    this.arLastWriteIdea=[];
                    this.miFunction=miFunction;
                    this.jsonInfo=jsonInfo;
                    this.timeVerify=timeVerify;
                    //  timeVerify: Tiempo en el cuerifica si esta o no la idea creada
                    this.planingExecute = function()
                    {
                        setTimeout('_EduInt._Input.Events.WriteIdea.arWriteIdea['+this.num+'].execute("'+(this.element.value)+'")', this.timeVerify);
                    };
                    this.execute = function(thisWriteIdea)
                    {
                        //  Impide que se ejecute dos veces con la misma ultima idea
                        var lastWriteIdea = this.element.value;
                        if(this.lastWriteIdeaExecuted != lastWriteIdea)
                        {
                            //  Si contiene el ultimo texto ejecutado
                            if(thisWriteIdea==lastWriteIdea && thisWriteIdea!='')
                            {
                                this.element._miFunctionWriteIdea_=this.miFunction;
                                this.element._miFunctionWriteIdea_(this.jsonInfo);
                                this.lastWriteIdeaExecuted=lastWriteIdea;
                            }
                        }
                    };
                    //  Añade los eventos
                    element.addEventListener('keyup',  function() { this.WriteIdea.planingExecute(this.WriteIdea); });
                    element.addEventListener('change', function() { this.WriteIdea.planingExecute(this.WriteIdea); });
                    element.addEventListener('focus',  function() { this.WriteIdea.planingExecute(this.WriteIdea); });
                    element.addEventListener('blur',   function() { this.WriteIdea.planingExecute(this.WriteIdea); });

                    this.num=_EduInt._Input.Events.WriteIdea.arWriteIdea.length;
                    _EduInt._Input.Events.WriteIdea.arWriteIdea[this.num]=this;
                    element.WriteIdea=this;
                }
            },
            /*
            functionWritenIdea: function(element)
            {
                element.value;
                if(element.value!==element._lastWriteText)
                {
                    //  Solo ingesa si el texto es nuevo
                    element._miFunctionWritenIdea(this._jsonInfoWritenIdea);
                }
                element._lastWriteText=element.value;
            },
            functionEventWritenIdea: function(element)
            {
                _EduInt._Input.Events.functionWritenIdea(this);
            },
            onWriteIdea: function(element,miFunction,jsonInfo) {
                element._lastWriteText='';
                element._miFunctionWritenIdea=miFunction;
                element._jsonInfoWritenIdea=jsonInfo;
                element.addEventListener('keyup', _EduInt._Input.Events.functionEventWritenIdea);
                element.addEventListener('change', _EduInt._Input.Events.functionEventWritenIdea);
                element.addEventListener('focus', _EduInt._Input.Events.functionEventWritenIdea);
                element.addEventListener('blur', _EduInt._Input.Events.functionEventWritenIdea);
            },
            */
            //  Necesita WriteIdea
            WriteIdeaAjax: {
                create: function(element,miFunction,jsonInfo) {
                    return new this.WriteIdeaAjax(element,miFunction,jsonInfo);
                },
                WriteIdeaAjax: function(element,miFunction,jsonInfo) {
                    this._method=jsonInfo.method;
                    this._path=jsonInfo.path;
                    this._sendInfo=jsonInfo.sendInfo;
                    this._numEjecucionActual_WriteIdea=0;
                    this._miFunction=miFunction;
                    this._jsonInfo=jsonInfo;
                    this._element=element;
                    element._eiMiFunction_WriteIdea=function(numEjecucion)
                    {
                        //  Numero unico por ejecución
                        this.numEjecucion=numEjecucion;
                        //  SI es una función la retorna como ta
                        if((typeof this.WriteIdeaAjax._path) == 'function')
                        {
                            this._path = this.WriteIdeaAjax._path;
                            var path = this._path();
                        }
                        else
                        { var path = this.WriteIdeaAjax._path; }
                        //  Ejecuta la funcion enviada por el usuario
                        _EduIntBasic._Comunication._Ajax._send({
                            method: this.WriteIdeaAjax._method,
                            path: path,
                            sendInfo: this.WriteIdeaAjax._sendInfo,
                            myFunction: function(responseText, jsonInfo)
                            {
                                var numEjecucion = jsonInfo.numEjecucion;

                                if(this.WriteIdeaAjax._numEjecucionActual_WriteIdea===jsonInfo.numEjecucion)
                                {
                                    this._miFunction=this.WriteIdeaAjax._miFunction;
                                    this._miFunction(responseText, this.WriteIdeaAjax._jsonInfo);
                                }
                            },
                            myFunctionJsonInfo: {
                                numEjecucion: numEjecucion,
                            },
                        }, this);
                    };
                    _EduInt._Input.Events.WriteIdea.create(element, function(numEjecucion){
                        this.WriteIdeaAjax._numEjecucionActual_WriteIdea++;
                        this._eiMiFunction_WriteIdea(this.WriteIdeaAjax._numEjecucionActual_WriteIdea);
                    });

                    element.WriteIdeaAjax=this;
                },
            },
            //  onWriteIdeaAjax: function(element,miFunction,jsonInfo) {
                //  element._numEjecuciones_WriteIdea=0;
                //  element._arFuncionesConNumeroAEjecutar_WriteIdea=0;
                //  element.addEventListener('keyup',  function() { this._numEjecucionActual_WriteIdea++; this._eiMiFunction_WriteIdea(this._numEjecucionActual_WriteIdea); });
                //  element.addEventListener('change', function() { this._numEjecucionActual_WriteIdea++; this._eiMiFunction_WriteIdea(this._numEjecucionActual_WriteIdea); });
                //  element.addEventListener('focus',  function() { this._numEjecucionActual_WriteIdea++; this._eiMiFunction_WriteIdea(this._numEjecucionActual_WriteIdea); });
                //  element.addEventListener('blur',   function() { this._numEjecucionActual_WriteIdea++; this._eiMiFunction_WriteIdea(this._numEjecucionActual_WriteIdea); });
            //  },
        },
        _Special: {
            arLastChanged: [],
            getLastChanged: function(pk, code)
            {


                this.arLastChanged[pk]=code;
            },
        },
        create: function(infoInput){
            return new _EduInt._Input.Input(infoInput);
        },
        Input: function(infoInput)
        {
            this.infoInput = _EduIntBasic._defaultJson(infoInput,_EduInt._Input.defaultInfoInput);
            var infoInput;

            this.element = document.createElement('div');
            this.element._Input=this;
            this.element._infoInput=infoInput;

                this.label = document.createElement('label');
                this.element.appendChild(this.label);

                this.input = document.createElement('input');
                this.input._Input=this;
                this.input._infoInput=infoInput;
                if(infoInput.type!='') { this.input.type = infoInput.type; }
                if(infoInput.name!='') { this.input.name = infoInput.name; }
                if(infoInput.placeholder!='') { this.input.placeholder = infoInput.placeholder; }
                if(infoInput.className!='') { this.input.className = infoInput.className; }
                if(infoInput.id!='') { this.input.id = infoInput.id; }
                if(infoInput.value!='') { this.input.value = infoInput.value; }
                else if(infoInput.value_base68!='') { this.input.value = window.atob(infoInput.value_base68); }
                this.element.appendChild(this.input);

                this.getValue=function() { return this._getValue(); }
                this._getValue=function()
                {
                    return this.input.value;
                }

                if(infoInput.autocompleteAjax || infoInput.autocomplete)
                {
                    this.input.autocomplete='off';
                    this.input.addEventListener("focusout", function(){
                        this._autocomplete.destroy(300);
                    });
                    this.input.onkeydown=function(key){
                        if(key.keyCode==13){ key.preventDefault(); }
                    }
                }
                if(infoInput.autocomplete)
                {
                    _EduInt._Input.Events.WriteIdea.create(this.input, function() {
                        if(this._autocomplete !== undefined) { this._autocomplete.destroy(); }
                        //  Valores por defecto
                        if(infoInput.autocomplete.filterDiferentResults===undefined) { infoInput.autocomplete.filterDiferentResults=true; }
                        if(infoInput.autocomplete.filterDiferentResults)
                        {
                            var opcionesFiltradas=[];
                            if(Array.isArray(this._infoInput.autocomplete))
                            { var opcionesAutocompletar = this._infoInput.autocomplete; }
                            else
                            { var opcionesAutocompletar = this._infoInput.autocomplete.options; }
                            for(var countOpcionesAutocompletar=0; countOpcionesAutocompletar<opcionesAutocompletar.length; countOpcionesAutocompletar++)
                            {
                                var opcion = opcionesAutocompletar[countOpcionesAutocompletar];
                                if(Array.isArray(opcion))
                                {
                                    if(_EduIntBasic.machineName(opcion[0]).indexOf(_EduIntBasic.machineName(this._Input._getValue()))!==-1)
                                    {
                                        opcionesFiltradas[opcionesFiltradas.length]=opcion[0];
                                    }
                                }
                                else
                                {
                                    if(_EduIntBasic.machineName(opcion).indexOf(_EduIntBasic.machineName(this._Input._getValue()))!==-1)
                                    {
                                        opcionesFiltradas[opcionesFiltradas.length]=opcion;
                                    }
                                }
                            }
                            var opcionesMostar=opcionesFiltradas;
                        }
                        else
                        {
                            var opcionesMostar=opcionesAutocompletar;
                        }
                        this._autocomplete = new _EduInt._Input.Plugins.Select.Select({
                            options: opcionesMostar,
                            functionOnSelect: function(valor,valorAMostrar) {
                                this.inputParent.value=valor;
                            },
                        });
                        this._autocomplete.inputParent=this;
                        this._Input._autocomplete.appendChild(this._autocomplete.element);
                    });//, jsonInfo);

                    this._autocomplete = document.createElement('div');
                    this.element.appendChild(this._autocomplete);
                }

                if(infoInput.autocompleteAjax)
                {
                    _EduInt._Input.Events.WriteIdeaAjax.create(this.input, function(responseText, jsonInfo) {
                        if(this._autocomplete !== undefined) { this._autocomplete.destroy(); }
                        var jsonResponse = JSON.parse(responseText);
                        //  var opcionesFiltradas= functionToSelectValues(jsonResponse);
                        if(this._infoInput.autocompleteAjax.functionToSelectValues)
                        {
                            this._functionToSelectValues = this._infoInput.autocompleteAjax.functionToSelectValues;
                            var opcionesFiltradas = this._functionToSelectValues(responseText, jsonInfo);
                        }
                        else
                        {
                            var opcionesFiltradas=[];
                            for(var countOpcionesAutocompletar=0; countOpcionesAutocompletar<jsonResponse.length; countOpcionesAutocompletar++)
                            {
                                opcionesFiltradas[opcionesFiltradas.length] = jsonResponse[countOpcionesAutocompletar];
                            }
                        }

                        if(this._infoInput.autocompleteAjax.functionOnSelect)
                        {
                            var functionOnSelect = this._infoInput.autocompleteAjax.functionOnSelect;
                        }
                        else
                        {
                            var functionOnSelect = function(valor,valorAMostrar) {
                                this.inputParent.value=valor;
                            };
                        }
                        this._autocomplete = new _EduInt._Input.Plugins.Select.Select({
                            options: opcionesFiltradas,
                            functionOnSelect: functionOnSelect,
                        });
                        this._autocomplete.inputParent=this;
                        this._Input._autocomplete.appendChild(this._autocomplete.element);
                    }, {
                        method: infoInput.autocompleteAjax.method,
                        path: infoInput.autocompleteAjax.path,
                        sendInfo: {  }
                    });

                    this._autocomplete = document.createElement('div');
                    this.element.appendChild(this._autocomplete);
                }


            return this;
        },
        InputCode: function(infoInput,infoCode)
        {
            infoInput = _EduIntBasic._defaultJson(infoInput,_EduInt._Input.defaultInfoInputCode);

            this.element = document.createElement('div');

                //  variables
                //  ---------
                var myPadding = '12px';
                var myFontFamily = 'source-code-pro';
                var myFontSize = '12px';
                var myLineHeight = '20px';

                this.colorText = document.createElement('div');
                this.colorText.style.border = 0;
                this.colorText.style.position = 'absolute';
                this.colorText.style.top = 0;
                this.colorText.style.left = 0;
                this.colorText.style.width = '100%';
                this.colorText.style.height = '100%';
                this.colorText.style.fontFamily = myFontFamily;
                this.colorText.style.padding = myPadding;
                this.colorText.style.fontSize = myFontSize;
                this.colorText.style.wordWrap = 'break-word';
                this.colorText.style.boxSizing = "border-box";
                this.colorText.style.MozBoxSizing = "border-box";
                this.colorText.style.lineHeight = myLineHeight;

                this.element.appendChild(this.colorText);


                this.input = document.createElement('textarea');
                this.input.style.border = 0;
                this.input.style.position = 'absolute';
                this.input.style.top = 0;
                this.input.style.left = 0;
                this.input.style.width = '100%';
                this.input.style.height = '100%';
                this.input.style.fontFamily = myFontFamily;
                this.input.style.backgroundColor = 'transparent';
                this.input.style.color = 'rgba(0,0,0,0.2)';
                this.input.style.padding = myPadding;
                this.input.style.fontSize = myFontSize;
                this.input.style.boxSizing = "border-box";
                this.input.style.MozBoxSizing = "border-box";
                this.input.style.lineHeight = myLineHeight;

                if(infoInput.name!=='')
                { this.input.name=infoInput.name; }
                if(infoInput.placeholder!=='')
                { this.input.placeholder=infoInput.placeholder; }
                if(infoInput.className!=='')
                { this.input.className=infoInput.className; }

                if(infoInput.value!='') { this.input.value = infoInput.value; }
                else if(infoInput.value_base68!='') { this.input.value = window.atob(infoInput.value_base68); }

                this.input.colorText=this.colorText;
                this.input.infoCode=infoCode;
                this.input.InputCode=this;



                this.input.onkeyup = function(){
                    this.InputCode.Code.accProcesarCodigo(this.value,this.infoCode);
                    this.colorText.innerHTML=this.InputCode.Code.getValorHTML();
                    this.InputCode.Code.accMostrarAutocompletar();
                }

                this.getValue=function()
                { return this.input.value; }
                this.setValue=function(value)
                { this.input.value=value; return this; }

                this.Code =_EduIntBasic.Code(this.input.value,infoCode);
                this.colorText.innerHTML=this.Code.getValorHTML();
                
                this.element.appendChild(this.input);

            return this;
        }
    },

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
            console.log(message);
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
        _arBoardsFunctionResize: [],
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
        createSimpleInBody: function(nameBoard) { return _EduInt._Board._createSimpleInBody(nameBoard); },
        _createSimpleInBody: function(nameBoard) {
            //  Si el nombre del tablero no esta definido, lo pide
            if(nameBoard===undefined)
            { _EduInt._Log.error('The nameBoard is mandatory'); }
            else
            {
                var myNewBoard = new _EduInt._Board._Board(nameBoard).createBoardInBody();
                _EduInt._Board._arForNames[nameBoard]=_EduInt._Board._ar.length;
                _EduInt._Board._ar[_EduInt._Board._ar.length]=myNewBoard;
                return myNewBoard;
            }
            //  Si no retorno el tablero existe un error
            return false;
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
            // (Board)
            //  Funciones publicas
            //  ------------------
            this._bnResponsiveEvent=false;
            this._accEnResponsiveIn = function(position) {
                //  Solo entra una vez
                if(!_EduInt._Board._bnExistResposniveEvents)
                {
                    window.addEventListener('resize',function(){
                        for(var countBoardFunctionResize=0;countBoardFunctionResize<_EduInt._Board._arBoardsFunctionResize.length;countBoardFunctionResize++)
                        {
                            var board = _EduInt._Board._arBoardsFunctionResize[countBoardFunctionResize];
                            board._myFunctionResponsive();
                        }
                    });

                    _EduInt._Board._bnExistResposniveEvents=true;
                }
                //  Solo entra una vez por tablero
                if(!this._bnResponsiveEvent)
                {
                    _EduInt._Board._arBoardsFunctionResize[_EduInt._Board._arBoardsFunctionResize.length]=this;
                    this._myFunctionResponsive=function(){
                        if(this._align=='center')
                        {
                            var contenedorAncho = this._oDiv.offsetWidth;
                            var tableroAncho = this._oDivThings.offsetWidth;

                            var nuevaMargen = -1*parseInt(tableroAncho - contenedorAncho)/2;
                            this._oDivThings.style.marginLeft=_EduInt._Basic.measure(nuevaMargen);
                        }
                    }

                    this._bnResponsiveEvent=true;
                }
            };
            // (Board)
            this.accEnResponsiveMinWidth = function(minwidth,align) { return this._accEnResponsiveMinWidth(minwidth,align); };
            this._accEnResponsiveMinWidth = function(minwidth,align)
            {
                if(align===undefined)
                { this._align='center'; }
                else
                { this._align=align; }
                this._minWidth=_EduInt._Basic.measure(minwidth);
                this._oDiv.style.minWidth=this._minWidth;
                if(this._oDiv.style.width)
                {
                    this._oDiv.style.maxWidth = this._oDiv.style.width;
                    this._oDiv.style.width = 'inherit';
                }
                this._accEnResponsiveIn();
                this._myFunctionResponsive();
                return this;
            };
            // (Board)
            this.accEnResponsiveMaxWidth = function(maxwidth) { return this._accEnResponsiveMaxWidth(maxwidth); };
            this._accEnResponsiveMaxWidth = function(maxwidth)
            {
                this._oDiv.style.maxWidth=_EduInt._Basic.measure(maxwidth);
                return this;
            };
            // (Board)
            this._arWaitOneTime = [];
            this.accGetTrueOneTime = function(name) { return this._accGetTrueOneTime(name); };
            this._accGetTrueOneTime = function(name)
            {
                if(this._arWaitOneTime[name]===undefined)
                { this._arWaitOneTime[name]=true; }

                var valToReturn = this._arWaitOneTime[name];
                this._arWaitOneTime[name]=false;

                return valToReturn;
            };
            // (Board)
            this.accRestartGetTrueOneTime = function(name){
                this._arWaitOneTime[name]=true;
            };
            // (Board)
            this._arWaitFrames = [];
            this.accQstnWaitNumFrames = function(numFrames,name) { return this._accQstnWaitNumFrames(numFrames,name); };
            this._accQstnWaitNumFrames = function(numFrames,name)
            {
                if(0<=this._arWaitFrames[name] || this._arWaitFrames[name]===undefined)
                {
                    if(this._arWaitFrames[name]===undefined)
                    { this._arWaitFrames[name]=numFrames; }
                    else
                    { this._arWaitFrames[name]--; }

                    if(this._arWaitFrames[name]<=0) { return false; }
                    return true;
                }
                return false;
            };
            // (Board)
            this.accRestarWaitNumFrames = function(name) { return this._accRestarWaitNumFrames(name); };
            this._accRestarWaitNumFrames = function(name){
                this._arWaitFrames[name]=undefined;

                return this;
            };
            // (Board)
            this.accQstnWaitInSeconds = function(seconds,name) { return this._accQstnWaitInSeconds(seconds,name); };
            this._accQstnWaitInSeconds = function(seconds,name)
            {
                return this._accQstnWaitNumFrames(this._animation.getStepsPerSecond()*seconds);
            };
            // (Board)
            this.accRestarWaitInSeconds = function(name) { return this._accRestarWaitInSeconds(name); };
            this._accRestarWaitInSeconds = function(name){
                return this._accRestarWaitNumFrames(name);
            };
            // (Board)
            this.setBackgroundImage=function(imageUrl) { return this._setBackgroundImage(imageUrl); };
            this._setBackgroundImage=function(imageUrl)
            {
                this._oDiv.style.backgroundImage='url('+imageUrl+')';
                return this;
            };
            // (Board)
            this.setBackgroundSize=function(backgroundSize) { return this._setBackgroundSize(backgroundSize); };
            this._setBackgroundSize=function(backgroundSize)
            {
                this._oDiv.style.backgroundSize=backgroundSize;
                return this;
            };
            // (Board)
            this._arCustoms=[];
            this.setCustom=function(name,myFunction) { return this._setCustom(name,myFunction); };
            this._setCustom=function(name,myFunction)
            {
                this._arCustoms[name]=myFunction;
                return this;
            };
            // (Board)
            this.qstnIssetCustom=function(name) { return this._qstnIssetCustom(name); };
            this._qstnIssetCustom=function(name)
            {
                if(this._arCustoms[name]===undefined) { return false; }
                else { return true; }
            };
//  Analizar esta funcion
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
                //  this._oDiv.tabIndex=-1;

    //  ALERT
                this._oDiv.onmouseover = function() {
                    this._Board._bnIsMouseOver = true;
                },
                this._oDiv.onmouseout = function() {
                    this._Board._bnIsMouseOver = false;
                }

                //  DivThings
                //  ---------

                this._oDivThings=document.body;

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
            };
            // (Board)
            //  Función sensilla para crear o retornar objetos
            this.Thing = function(nameThing,posInX,posInY,width,height) { return this._Thing(nameThing,posInX,posInY,width,height); };
            this._Thing = function(nameThing,posInX,posInY,width,height)
            { EduInt._Log._deprecated('Board._Thing','Board.t'); this._t(nameThing,posInX,posInY,width,height); };
            this.t = function(nameThing,posInX,posInY,width,height,parentThing) { return this._t(nameThing,posInX,posInY,width,height,parentThing); };
            this._t = function(nameThing,posInX,posInY,width,height,parentThing)
            {
                //  Si existe el objeto lo retorna
                if(this._prThingForName(nameThing)) {
                    var Thing = this._getThingForName(nameThing);
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
                    return this._createThing(nameThing,posInX,posInY,width,height,parentThing);
                }
            };
            this.g  = function(nameThing,posInX,posInY,width,height,parentThing) { return this._g(nameThing,posInX,posInY,width,height,parentThing); };
            this._g = function(nameThing,posInX,posInY,width,height,parentThing)
            {
                return this._t(nameThing,posInX,posInY,width,height,parentThing).setType('group');
            }
            // (Board)
            //  Crea un Thing
            this.createThing = function(nameThing,posInX,posInY,width,height,parentThing) { return this._createThing(nameThing,posInX,posInY,width,height,parentThing); };
            this._createThing = function(nameThing,posInX,posInY,width,height,parentThing)
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
                //  Si viene de un grupo u otro objeto
                if(parentThing===undefined)
                {
                    //  Lo agregamos al tablero
                    Thing._setThingIn(this._oDivThings);
                }
                else
                {
                    Thing._parentThing=parentThing;
                    Thing.parentThing=Thing._parentThing;
                    //  Lo agregamos al objeto padre
                    Thing._setThingIn(parentThing._element);
                }
                //  Retornamos el objeto "Thing"
                return Thing;
            };
            // (Board)
            //  Obtiene el numero de things
            this.getNumThings = function() { return this._getNumThings; }
            this._getNumThings = function() {
                return this._arThings.length;
            }
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
            this.accCreateAnimateFunctionInShadow = function(functionAnimatedInShadow,jsonInfoEnviada) { this._accCreateAnimateFunctionInShadow(functionAnimatedInShadow,jsonInfoEnviada); }
            this._accCreateAnimateFunctionInShadow = function(functionAnimatedInShadow,jsonInfoEnviada)
            {
                var idTheFunctionInShadow = this._addFunctionAnimatedInShadow(functionAnimatedInShadow,{
                    options: jsonInfoEnviada,
                    father: this,
                    //  frameToDesapear: ,
                });

                return idTheFunctionInShadow;
            }
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
            this._accAddKeyboard = {
                _Board: this,
                arrows: function(){
                    this._Board._g('__KeyBoard')._t('__KeyboardArrow-up')._setType('element','div')._setBackgroundImageInAlpha('https://storage.googleapis.com/datos-educacion-interactiva/imagenes/basic/keyboard-arrows.png',false)._setDimentions(60,60)._setPosInXY(60,0);
                    this._Board._g('__KeyBoard')._t('__KeyboardArrow-right')._setType('element','div')._setBackgroundImageInAlpha('https://storage.googleapis.com/datos-educacion-interactiva/imagenes/basic/keyboard-arrows.png',false)._setDimentions(60,60)._setPosInXY(120,60)._setBackgroundPosition('-60px 0');
                    this._Board._g('__KeyBoard')._t('__KeyboardArrow-bottom')._setType('element','div')._setBackgroundImageInAlpha('https://storage.googleapis.com/datos-educacion-interactiva/imagenes/basic/keyboard-arrows.png',false)._setDimentions(60,60)._setPosInXY(60,60)._setBackgroundPosition('-120px 0');
                    this._Board._g('__KeyBoard')._t('__KeyboardArrow-left')._setType('element','div')._setBackgroundImageInAlpha('https://storage.googleapis.com/datos-educacion-interactiva/imagenes/basic/keyboard-arrows.png',false)._setDimentions(60,60)._setPosInXY(0,60)._setBackgroundPosition('-180px 0');


                },
            };
            this.accAddKeyboard = this._accAddKeyboard;
            // (Board)
            //  Envia un mensajes al usuario
            this._accSendMessage = {
                _Board: this,
                good: function(){
                    if(!this._Board._qstnIssetCustom('__MessageGood'))
                    {
                        this._Board._setCustom('__MessageGood',function()
                        {
                            this._setType('element','div')._setBackgroundImageInAlpha('https://storage.googleapis.com/datos-educacion-interactiva/imagenes/basic/good-and-wrong.png',false)._setDimentions(80,70)._setPosInXY(20,100);
                        });
                    }
                    this._goodOrWrong('good');
                },
                wrong: function(){
                    if(!this._Board._qstnIssetCustom('__MessageWrong'))
                    {
                        this._Board._setCustom('__MessageWrong',function()
                        {
                            this._setType('element','div')._setBackgroundImageInAlpha('https://storage.googleapis.com/datos-educacion-interactiva/imagenes/basic/good-and-wrong.png',false)._setBackgroundPosition('right 0')._setDimentions(70,70)._setPosInXY(20,100);
                        });
                    }
                    this._goodOrWrong('wrong');
                },
                _goodOrWrong: function(goodOrWrong){
                    this._Board._addFunctionAnimatedInShadow(function(info,optionJson) {
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
                                if(this._qstnIssetCustom('_MessageWrong')) { this.t('_MessageWrong')._getCustom('_MessageWrong'); }
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
            this.accSendMessage = this._accSendMessage;
        },
    },

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

        //  Añade funciones custom para los objetos, con la caracteristica que es global, para todos los tableros
        _arCustoms: [],
        setCustom: function(name,myFunction) { return this._setCustom(name,myFunction); },
        _setCustom: function(name,myFunction)
        {
            this._arCustoms[name]=myFunction;
            return this;
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
                { this._nameThing=_EduInt._Thing._default.name+(_EduInt._Board._getNumThings()+1); }
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
            this._radio=_EduInt._Thing._default.radio;
            this._rotation=0;

            //  Permite colocar variables dentro del Thing
            this.my = { };
            //  Eventos en el Thing
            this._Events = {
                onclick: false,
                onmouseover: false,
                onmouseover: false,
                Thing: this,
                setEvent: function(myEvent,myFunction)
                {
                    switch(myEvent)
                    {
                        case 'click':
                            this.onclick=true;
                            this.arFunctionsOnClick[this.arFunctionsOnClick.length]=myFunction;
                            this.Thing._element.addEventListener(myEvent,this.eventOnClick);
                            break;
                        default:
                            this.Thing._element.addEventListener(myEvent,myFunction);
                            break;
                    }
                },
                arEvents: [],
                arEventsByName: [],
                _Event: function(eventName)
                {
                    this.arFunctions = [];
                    this.accAddFunction = function(myFunction)
                    {
                        this.arFunctions[this.arFunctions.length]=myFunction;
                    };
                    this.accExecuteFunctions = function(evento)
                    {
                        var Evento =this._Thing.event(evento.type);
                        for(var countFunction=0;countFunction<Evento.arFunctions.length;countFunction++)
                        {
                            this._Thing._myFunction_ = Evento.arFunctions[countFunction];
                            this._Thing._myFunction_(event);
                        }
                    };
                },
            };
            //  (Thing)
            this.event = function(nombreEvento) { return this._event(nombreEvento); };
            this._event = function(nombreEvento)
            {
                if(this._Events.arEventsByName[nombreEvento]===undefined)
                {
                    var evento = new this._Events._Event(nombreEvento);
                    this._element.addEventListener(nombreEvento,evento.accExecuteFunctions);
                    this._Events.arEvents[this._Events.arEvents.length]=evento;
                    this._Events.arEventsByName[nombreEvento]=evento;
                    return evento;
                }
                else
                {
                    return this._Events.arEventsByName[nombreEvento];
                }
            };
            //  (Thing)
            this.setOnClick = function(myFunction) { return this._setOnClick(myFunction); };
            this._setOnClick = function(myFunction)
            {
                this._event('click').accAddFunction(myFunction);
                return this;
            };
            this.getName = function() { return this._getName(); };
            this._getName = function()
            {
                return this._nameThing;
            }
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
            //  Permite añadir funciones y agruparlas
            this.setCustom=function(myFunction) { return this._setCustom(myFunction); };
            this._setCustom=function(myFunction)
            {
                this._myFunction=myFunction;
                this._myFunction();
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
                        //  case 'group':
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
                //  Si esta en modo debug, el le coloca la clase con el nombre
                if(_EduInt.qstnIsInDebugMode()){ this._Container._divContainer.className='name-||-'+element._Thing._nameThing; }
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

                        //  Añade todas las funciones de HTML necesarias
                        _EduInt._Thing._Type._DisplayBlockFunctions(this);
                        //  Añade todas las funciones de texto necesarias
                        _EduInt._Thing._Type._TextFunctions(this);
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

                        //  Añade todas las funciones de HTML necesarias
                        _EduInt._Thing._Type._DisplayBlockFunctions(this);
                        //  Añade todas las funciones de input necesarias
                        _EduInt._Thing._Type._InputFunctions(this);
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
                        this.setHTML = function(myHTML) { this._setHTML(myHTML); }
                        this._setHTML = function(myHTML){
                            this._element.innerHTML = myHTML;
                        }

                        this._element._Thing = this;
                        this._putThisElementInDivOfBoard(this._element);

                        //  Añade todas las funciones de HTML necesarias
                        _EduInt._Thing._Type._DisplayBlockFunctions(this);
                        //  Añade las funciones del elemento
                        _EduInt._Thing._Type._ElementsFunctions(this);

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
                                //  this._element.style.position = 'absolute';

                                //  Añade todas las funciones de HTML necesarias
                                _EduInt._Thing._Type._DisplayBlockFunctions(this);
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
                    case 'group':
                        this._element = document.createElement('div');
                        this.addClass('eduintgd-group');
                        //  Para poder acceder a las opciones del Thing, desde el objeto
                        this._element._Thing = this;

                        this._element.style.backgroundColor = '#F00';
                        //  this._element.style.position = 'absolute';

                        //  Añade todas las funciones de HTML necesarias
                        _EduInt._Thing._Type._DisplayBlockFunctions(this);
                        //  Añade las funciones del elemento
                        _EduInt._Thing._Type._ElementsFunctions(this);
                        //  Añade las funciones de grupo
                        _EduInt._Thing._Type._GroupsFunctions(this);

                        //  Ingresamos el nuevo objeto
                        this._putThisElementInDivOfBoard(this._element);
                        //  Inicia el movimiento del mouse
                        _EduInt._Cursor._enMovementDetect();

                        //  Informa que el objeto fue creado
                        bnThingCreated = true;
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
                                this._svgThingType._Thing = this;
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
                    _EduInt._Thing._Type._DefaultFunctions(this);
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
                if(this._bnSetRightButtom)
                {
                    this._Container._setPostionRightBottom(this._posInXInRight,this._posInYInBottom);
                }
                else
                {
                    //  Si tiene acciones las coloca para pintarlas
                    if(this._moveInX!=0) { this._posInX=this._posInX+this._moveInX; }
                    if(this._moveInY!=0) { this._posInY=this._posInY+this._moveInY; }

                    //  Camba la poscición del contenedor deacuerdo a las variables
                    this._Container._setPostion(this._posInX,this._posInY);

                    //  Camba la poscición del contenedor deacuerdo a las variables
                    //  Limpia las variables de movimiento, por posición
                    this._moveInX=0;
                    this._moveInY=0;
                }
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
                        case 'html':
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
                        case 'group':
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
            this.setPosInXY = function(posInX,posInY) { return this._setPosInXY(posInX,posInY); };
            this._setPosInXY = function(posInX,posInY)
            {
                if(posInY!==undefined)
                {
                    this._bnSetRightButtom=false;
                    this._setPosInX(posInX,false);
                    this._setPosInY(posInY,false);
                    this._draw();
                }
                else
                {

                }
                return this;
            }
            //  (Thing)
            this._bnSetRightButtom=false;
            this.setPostionRightBottom = function(posInX,posInY) { return this._setPostionRightBottom(posInX,posInY); };
            this._setPostionRightBottom = function(posInX,posInY)
            {
                this._bnSetRightButtom=true;
                this._setPosInXInRight(posInX,false);
                this._setPosInYInBottom(posInY,false);
                this._draw();
                return this;
            }
            //  (Thing)
            this.setTop = function(posInY) { return this._setTop(posInY); };
            this._setTop = function(posInY)
            {
                this._setPosInY(posInY,false);
                this._draw();
                return this;
            }
            //  (Thing)
            this.setLeft = function(posInX) { return this._setLeft(posInX); };
            this._setLeft = function(posInX)
            {
                this._setPosInX(posInX,false);
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
            //  (Thing)
            this.setPosInXInRight = function(posInX,bnDraw) { return this._setPosInXInRight(posInX,bnDraw); };
            this._setPosInXInRight = function(posInX,bnDraw)
            {
                this._posInXInRight=posInX;
                this._bnActionToDraw[this._bnActionToDraw.length]='posInXInRight';
                //  Dibuja el cambio
                if(bnDraw===undefined) { bnDraw=true; } if(bnDraw) { this._draw(); }
                return this;
            }
            //  (Thing)
            this.getPosInXInRight = function() { return this._getPosInXInRight(); };
            this._getPosInXInRight = function()
            {
                return this._setPosInXInRight;
            }
            //  (Thing)
            this.setPosInYInBottom = function(posInY,bnDraw) { return this._setPosInYInBottom(posInY,bnDraw); };
            this._setPosInYInBottom = function(posInY,bnDraw)
            {
                this._posInYInBottom=posInY;
                this._bnActionToDraw[this._bnActionToDraw.length]='posInYInBottom';
                //  Dibuja el cambio
                if(bnDraw===undefined) { bnDraw=true; } if(bnDraw) { this._draw(); }
                return this;
            }
            //  (Thing)
            this.getPosInYInBottom = function() { return this._getPosInY(); };
            this._getPosInYInBottom = function()
            {
                return this._posInYInBottom;
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
            this.setZIndex = function(value) { this._setZIndex(value); };
            this._setZIndex = function(value)
            {
                this._Container._setZIndex(value);
            };
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
                if(this._Board._arCustoms[name]!==undefined)
                { this._myFunction_ = this._Board._arCustoms[name]; }
                else
                { this._myFunction_ = _EduInt._Thing._arCustoms[name]; }
                this._myFunction_(infoJSon);

                return this;
            };


            //  Funciones Publicas
            //  ==================
            this.Board = this._Board;

            //  Deprecated
            //  ==========
            this.setDimensions = function(width,height) { return this._setDimentions(width,height); };
            this._setEvOnClick = function(myFunction)  { return this._setOnClick(myFunction); };
            this.setEvOnClick = function(myFunction) { return this._setOnClick(myFunction); };
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
            //  Coloca la posicion desde la derecha abajo
            this.setPostionRightBottom = function(posInX,posInY) { this._setPostionRightBottom(posInX,posInY); };
            this._setPostionRightBottom = function(posInX,posInY)
            {
                this._setPosInXInRight(posInX);
                this._setPosInYInBottom(posInY);
            };
            //  Coloca una nueva posición en X
            this.setPosInX = function(posInX) { this._setPosInX(posInX); };
            this._setPosInX = function(posInX)
            {
                this._divContainer.style.left=_EduInt._Basic.measure(posInX);
                this._divContainer.style.right='auto';
            };
            //  Coloca una nueva posición en Y
            this.setPosInY = function(posInY) { this._setPosInY(posInY); };
            this._setPosInY = function(posInY)
            {
                this._divContainer.style.top=_EduInt._Basic.measure(posInY);
                this._divContainer.style.bottom='auto';
            };
            //  Coloca una nueva posición en X
            this.setPosInXInRight = function(posInX) { this._setPosInXInRight(posInX); };
            this._setPosInXInRight = function(posInX)
            {
                this._divContainer.style.right=_EduInt._Basic.measure(posInX);
                this._divContainer.style.left='auto';
            };
            //  Coloca una nueva posición en Y
            this.setPosInYInBottom = function(posInY) { this._setPosInYInBottom(posInY); };
            this._setPosInYInBottom = function(posInY)
            {
                this._divContainer.style.bottom=_EduInt._Basic.measure(posInY);
                this._divContainer.style.top='auto';
            };
            this.setZIndex = function(value) { this._setZIndex(value); };
            this._setZIndex = function(value)
            {
                this._divContainer.style.zIndex=value;
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

                Thing.setPlaceholder = function(value) { return this._setPlaceholder(value); }
                Thing._setPlaceholder = function(value)
                { this._element.placeholder=value; return this; };
                Thing.getPlaceholder = function(value) { return this._getPlaceholder(value); }
                Thing._getPlaceholder = function(value)
                { return this._element.style.placeholder; };

                //  Deprecate
                Thing.setText = function(text) { return this._setText(text); }
                Thing._setText = function(text)
                { return Thing._setValue(text); };

                Thing.arFilters=[];
                Thing.setFilter = function(value) { return this._setFilter(value); }
                Thing._setFilter = function(value)
                { 
                    _EduIntBasic._addCharacteristicsInFields([{
                        //  errorElement: document.getElementById('error-input-name'),
                        inputElement: this._element,
                        filters: [{
                            type: value
                        }],
                    }]);

                    return this;
                };
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
                Thing.setFontFamily = function(value) { return this._setFontFamily(value); }
                Thing._setFontFamily = function(value)
                {
                    this._element.style.fontFamily = value;
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
                Thing.setLetterSpacing = function(value) { return this._setLetterSpacing(value); }
                Thing._setLetterSpacing = function(value)
                {
                    this._element.style.letterSpacing = _EduInt._Basic.measure(value);
                    return this;
                }
            },

            _DisplayBlockFunctions: function(Thing) {
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

                    //  console.info('oncursordown');
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
                    //  console.info('oncursorup');
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

                Thing.setAlignContent=function(value){ return this._setAlignContent(value); }; Thing._setAlignContent=function(value){ this._element.style.alignContent=value; return this; };
                Thing.setAlignItems=function(value){ return this._setAlignItems(value); }; Thing._setAlignItems=function(value){ this._element.style.alignItems=value; return this; };
                Thing.setAlignSelf=function(value){ return this._setAlignSelf(value); }; Thing._setAlignSelf=function(value){ this._element.style.alignSelf=value; return this; };
                Thing.setAnimation=function(value){ return this._setAnimation(value); }; Thing._setAnimation=function(value){ this._element.style.animation=value; return this; };
                Thing.setAnimationDelay=function(value){ return this._setAnimationDelay(value); }; Thing._setAnimationDelay=function(value){ this._element.style.animationDelay=value; return this; };
                Thing.setAnimationDirection=function(value){ return this._setAnimationDirection(value); }; Thing._setAnimationDirection=function(value){ this._element.style.animationDirection=value; return this; };
                Thing.setAnimationDuration=function(value){ return this._setAnimationDuration(value); }; Thing._setAnimationDuration=function(value){ this._element.style.animationDuration=value; return this; };
                Thing.setAnimationFillMode=function(value){ return this._setAnimationFillMode(value); }; Thing._setAnimationFillMode=function(value){ this._element.style.animationFillMode=value; return this; };
                Thing.setAnimationIterationCount=function(value){ return this._setAnimationIterationCount(value); }; Thing._setAnimationIterationCount=function(value){ this._element.style.animationIterationCount=value; return this; };
                Thing.setAnimationName=function(value){ return this._setAnimationName(value); }; Thing._setAnimationName=function(value){ this._element.style.animationName=value; return this; };
                Thing.setAnimationTimingFunction=function(value){ return this._setAnimationTimingFunction(value); }; Thing._setAnimationTimingFunction=function(value){ this._element.style.animationTimingFunction=value; return this; };
                Thing.setAnimationPlayState=function(value){ return this._setAnimationPlayState(value); }; Thing._setAnimationPlayState=function(value){ this._element.style.animationPlayState=value; return this; };
                Thing.setBackground=function(value){ return this._setBackground(value); }; Thing._setBackground=function(value){ this._element.style.background=value; return this; };
                Thing.setBackgroundAttachment=function(value){ return this._setBackgroundAttachment(value); }; Thing._setBackgroundAttachment=function(value){ this._element.style.backgroundAttachment=value; return this; };
                Thing.setBackgroundColor=function(value){ return this._setBackgroundColor(value); }; Thing._setBackgroundColor=function(value){ this._element.style.backgroundColor=value; return this; };
                //Thing.setBackgroundImage=function(value){ return this._setBackgroundImage(value); }; Thing._setBackgroundImage=function(value){ this._element.style.backgroundImage=value; return this; };
                Thing.setBackgroundPosition=function(value){ return this._setBackgroundPosition(value); }; Thing._setBackgroundPosition=function(value){ this._element.style.backgroundPosition=value; return this; };
                Thing.setBackgroundRepeat=function(value){ return this._setBackgroundRepeat(value); }; Thing._setBackgroundRepeat=function(value){ this._element.style.backgroundRepeat=value; return this; };
                Thing.setBackgroundClip=function(value){ return this._setBackgroundClip(value); }; Thing._setBackgroundClip=function(value){ this._element.style.backgroundClip=value; return this; };
                Thing.setBackgroundOrigin=function(value){ return this._setBackgroundOrigin(value); }; Thing._setBackgroundOrigin=function(value){ this._element.style.backgroundOrigin=value; return this; };
                Thing.setBackgroundSize=function(value){ return this._setBackgroundSize(value); }; Thing._setBackgroundSize=function(value){ this._element.style.backgroundSize=value; return this; };
                Thing.setBackfaceVisibility=function(value){ return this._setBackfaceVisibility(value); }; Thing._setBackfaceVisibility=function(value){ this._element.style.backfaceVisibility=value; return this; };
                Thing.setBorder=function(value){ return this._setBorder(value); }; Thing._setBorder=function(value){ this._element.style.border=value; return this; };
                Thing.setBorderBottom=function(value){ return this._setBorderBottom(value); }; Thing._setBorderBottom=function(value){ this._element.style.borderBottom=_EduInt._Basic.measure(value); return this; };
                Thing.setBorderBottomColor=function(value){ return this._setBorderBottomColor(value); }; Thing._setBorderBottomColor=function(value){ this._element.style.borderBottomColor=value; return this; };
                Thing.setBorderBottomLeftRadius=function(value){ return this._setBorderBottomLeftRadius(value); }; Thing._setBorderBottomLeftRadius=function(value){ this._element.style.borderBottomLeftRadius=value; return this; };
                Thing.setBorderBottomRightRadius=function(value){ return this._setBorderBottomRightRadius(value); }; Thing._setBorderBottomRightRadius=function(value){ this._element.style.borderBottomRightRadius=value; return this; };
                Thing.setBorderBottomStyle=function(value){ return this._setBorderBottomStyle(value); }; Thing._setBorderBottomStyle=function(value){ this._element.style.borderBottomStyle=value; return this; };
                Thing.setBorderBottomWidth=function(value){ return this._setBorderBottomWidth(value); }; Thing._setBorderBottomWidth=function(value){ this._element.style.borderBottomWidth=value; return this; };
                Thing.setBorderCollapse=function(value){ return this._setBorderCollapse(value); }; Thing._setBorderCollapse=function(value){ this._element.style.borderCollapse=value; return this; };
                Thing.setBorderColor=function(value){ return this._setBorderColor(value); }; Thing._setBorderColor=function(value){ this._element.style.borderColor=value; return this; };
                //Thing.setBorderImage=function(value){ return this._setBorderImage(value); }; Thing._setBorderImage=function(value){ this._element.style.borderImage=value; return this; };
                Thing.setBorderImageOutset=function(value){ return this._setBorderImageOutset(value); }; Thing._setBorderImageOutset=function(value){ this._element.style.borderImageOutset=value; return this; };
                Thing.setBorderImageRepeat=function(value){ return this._setBorderImageRepeat(value); }; Thing._setBorderImageRepeat=function(value){ this._element.style.borderImageRepeat=value; return this; };
                Thing.setBorderImageSlice=function(value){ return this._setBorderImageSlice(value); }; Thing._setBorderImageSlice=function(value){ this._element.style.borderImageSlice=value; return this; };
                Thing.setBorderImageSource=function(value){ return this._setBorderImageSource(value); }; Thing._setBorderImageSource=function(value){ this._element.style.borderImageSource=value; return this; };
                Thing.setBorderImageWidth=function(value){ return this._setBorderImageWidth(value); }; Thing._setBorderImageWidth=function(value){ this._element.style.borderImageWidth=value; return this; };
                Thing.setBorderLeft=function(value){ return this._setBorderLeft(value); }; Thing._setBorderLeft=function(value){ this._element.style.borderLeft=_EduInt._Basic.measure(value); return this; };
                Thing.setBorderLeftColor=function(value){ return this._setBorderLeftColor(value); }; Thing._setBorderLeftColor=function(value){ this._element.style.borderLeftColor=value; return this; };
                Thing.setBorderLeftStyle=function(value){ return this._setBorderLeftStyle(value); }; Thing._setBorderLeftStyle=function(value){ this._element.style.borderLeftStyle=value; return this; };
                Thing.setBorderLeftWidth=function(value){ return this._setBorderLeftWidth(value); }; Thing._setBorderLeftWidth=function(value){ this._element.style.borderLeftWidth=value; return this; };
                Thing.setBorderRadius=function(value){ return this._setBorderRadius(value); }; Thing._setBorderRadius=function(value){ this._element.style.borderRadius=value; return this; };
                Thing.setBorderRight=function(value){ return this._setBorderRight(value); }; Thing._setBorderRight=function(value){ this._element.style.borderRight=_EduInt._Basic.measure(value); return this; };
                Thing.setBorderRightColor=function(value){ return this._setBorderRightColor(value); }; Thing._setBorderRightColor=function(value){ this._element.style.borderRightColor=value; return this; };
                Thing.setBorderRightStyle=function(value){ return this._setBorderRightStyle(value); }; Thing._setBorderRightStyle=function(value){ this._element.style.borderRightStyle=value; return this; };
                Thing.setBorderRightWidth=function(value){ return this._setBorderRightWidth(value); }; Thing._setBorderRightWidth=function(value){ this._element.style.borderRightWidth=value; return this; };
                Thing.setBorderSpacing=function(value){ return this._setBorderSpacing(value); }; Thing._setBorderSpacing=function(value){ this._element.style.borderSpacing=value; return this; };
                Thing.setBorderStyle=function(value){ return this._setBorderStyle(value); }; Thing._setBorderStyle=function(value){ this._element.style.borderStyle=value; return this; };
                Thing.setBorderTop=function(value){ return this._setBorderTop(value); }; Thing._setBorderTop=function(value){ this._element.style.borderTop=_EduInt._Basic.measure(value); return this; };
                Thing.setBorderTopColor=function(value){ return this._setBorderTopColor(value); }; Thing._setBorderTopColor=function(value){ this._element.style.borderTopColor=value; return this; };
                Thing.setBorderTopLeftRadius=function(value){ return this._setBorderTopLeftRadius(value); }; Thing._setBorderTopLeftRadius=function(value){ this._element.style.borderTopLeftRadius=value; return this; };
                Thing.setBorderTopRightRadius=function(value){ return this._setBorderTopRightRadius(value); }; Thing._setBorderTopRightRadius=function(value){ this._element.style.borderTopRightRadius=value; return this; };
                Thing.setBorderTopStyle=function(value){ return this._setBorderTopStyle(value); }; Thing._setBorderTopStyle=function(value){ this._element.style.borderTopStyle=value; return this; };
                Thing.setBorderTopWidth=function(value){ return this._setBorderTopWidth(value); }; Thing._setBorderTopWidth=function(value){ this._element.style.borderTopWidth=value; return this; };
                Thing.setBorderWidth=function(value){ return this._setBorderWidth(value); }; Thing._setBorderWidth=function(value){ this._element.style.borderWidth=value; return this; };
                //Thing.setBottom=function(value){ return this._setBottom(value); }; Thing._setBottom=function(value){ this._element.style.bottom=value; return this; };
                Thing.setBoxDecorationBreak=function(value){ return this._setBoxDecorationBreak(value); }; Thing._setBoxDecorationBreak=function(value){ this._element.style.boxDecorationBreak=value; return this; };
                Thing.setBoxShadow=function(value){ return this._setBoxShadow(value); }; Thing._setBoxShadow=function(value){ this._element.style.boxShadow=value; return this; };
                Thing.setBoxSizing=function(value){ return this._setBoxSizing(value); }; Thing._setBoxSizing=function(value){ this._element.style.boxSizing=value; return this; };
                Thing.setCaptionSide=function(value){ return this._setCaptionSide(value); }; Thing._setCaptionSide=function(value){ this._element.style.captionSide=value; return this; };
                Thing.setClear=function(value){ return this._setClear(value); }; Thing._setClear=function(value){ this._element.style.clear=value; return this; };
                Thing.setClip=function(value){ return this._setClip(value); }; Thing._setClip=function(value){ this._element.style.clip=value; return this; };
                Thing.setColor=function(value){ return this._setColor(value); }; Thing._setColor=function(value){ this._element.style.color=value; return this; };
                Thing.setColumnCount=function(value){ return this._setColumnCount(value); }; Thing._setColumnCount=function(value){ this._element.style.columnCount=value; return this; };
                Thing.setColumnFill=function(value){ return this._setColumnFill(value); }; Thing._setColumnFill=function(value){ this._element.style.columnFill=value; return this; };
                Thing.setColumnGap=function(value){ return this._setColumnGap(value); }; Thing._setColumnGap=function(value){ this._element.style.columnGap=value; return this; };
                Thing.setColumnRule=function(value){ return this._setColumnRule(value); }; Thing._setColumnRule=function(value){ this._element.style.columnRule=value; return this; };
                Thing.setColumnRuleColor=function(value){ return this._setColumnRuleColor(value); }; Thing._setColumnRuleColor=function(value){ this._element.style.columnRuleColor=value; return this; };
                Thing.setColumnRuleStyle=function(value){ return this._setColumnRuleStyle(value); }; Thing._setColumnRuleStyle=function(value){ this._element.style.columnRuleStyle=value; return this; };
                Thing.setColumnRuleWidth=function(value){ return this._setColumnRuleWidth(value); }; Thing._setColumnRuleWidth=function(value){ this._element.style.columnRuleWidth=value; return this; };
                Thing.setColumns=function(value){ return this._setColumns(value); }; Thing._setColumns=function(value){ this._element.style.columns=value; return this; };
                Thing.setColumnSpan=function(value){ return this._setColumnSpan(value); }; Thing._setColumnSpan=function(value){ this._element.style.columnSpan=value; return this; };
                Thing.setColumnWidth=function(value){ return this._setColumnWidth(value); }; Thing._setColumnWidth=function(value){ this._element.style.columnWidth=value; return this; };
                Thing.setContent=function(value){ return this._setContent(value); }; Thing._setContent=function(value){ this._element.style.content=value; return this; };
                Thing.setCounterIncrement=function(value){ return this._setCounterIncrement(value); }; Thing._setCounterIncrement=function(value){ this._element.style.counterIncrement=value; return this; };
                Thing.setCounterReset=function(value){ return this._setCounterReset(value); }; Thing._setCounterReset=function(value){ this._element.style.counterReset=value; return this; };
                Thing.setCursor=function(value){ return this._setCursor(value); }; Thing._setCursor=function(value){ this._element.style.cursor=value; return this; };
                Thing.setDirection=function(value){ return this._setDirection(value); }; Thing._setDirection=function(value){ this._element.style.direction=value; return this; };
                Thing.setDisplay=function(value){ return this._setDisplay(value); }; Thing._setDisplay=function(value){ this._element.style.display=value; return this; };
                Thing.setEmptyCells=function(value){ return this._setEmptyCells(value); }; Thing._setEmptyCells=function(value){ this._element.style.emptyCells=value; return this; };
                Thing.setFilter=function(value){ return this._setFilter(value); }; Thing._setFilter=function(value){ this._element.style.filter=value; return this; };
                Thing.setFlex=function(value){ return this._setFlex(value); }; Thing._setFlex=function(value){ this._element.style.flex=value; return this; };
                Thing.setFlexBasis=function(value){ return this._setFlexBasis(value); }; Thing._setFlexBasis=function(value){ this._element.style.flexBasis=value; return this; };
                Thing.setFlexDirection=function(value){ return this._setFlexDirection(value); }; Thing._setFlexDirection=function(value){ this._element.style.flexDirection=value; return this; };
                Thing.setFlexFlow=function(value){ return this._setFlexFlow(value); }; Thing._setFlexFlow=function(value){ this._element.style.flexFlow=value; return this; };
                Thing.setFlexGrow=function(value){ return this._setFlexGrow(value); }; Thing._setFlexGrow=function(value){ this._element.style.flexGrow=value; return this; };
                Thing.setFlexShrink=function(value){ return this._setFlexShrink(value); }; Thing._setFlexShrink=function(value){ this._element.style.flexShrink=value; return this; };
                Thing.setFlexWrap=function(value){ return this._setFlexWrap(value); }; Thing._setFlexWrap=function(value){ this._element.style.flexWrap=value; return this; };
                Thing.setCssFloat=function(value){ return this._setCssFloat(value); }; Thing._setCssFloat=function(value){ this._element.style.cssFloat=value; return this; };
                Thing.setFont=function(value){ return this._setFont(value); }; Thing._setFont=function(value){ this._element.style.font=value; return this; };
                Thing.setFontFamily=function(value){ return this._setFontFamily(value); }; Thing._setFontFamily=function(value){ this._element.style.fontFamily=value; return this; };
                Thing.setFontSize=function(value){ return this._setFontSize(value); }; Thing._setFontSize=function(value){ this._element.style.fontSize=_EduInt._Basic.measure(value); return this; };
                Thing.setFontStyle=function(value){ return this._setFontStyle(value); }; Thing._setFontStyle=function(value){ this._element.style.fontStyle=value; return this; };
                Thing.setFontVariant=function(value){ return this._setFontVariant(value); }; Thing._setFontVariant=function(value){ this._element.style.fontVariant=value; return this; };
                Thing.setFontWeight=function(value){ return this._setFontWeight(value); }; Thing._setFontWeight=function(value){ this._element.style.fontWeight=value; return this; };
                Thing.setFontSizeAdjust=function(value){ return this._setFontSizeAdjust(value); }; Thing._setFontSizeAdjust=function(value){ this._element.style.fontSizeAdjust=value; return this; };
                Thing.setFontStretch=function(value){ return this._setFontStretch(value); }; Thing._setFontStretch=function(value){ this._element.style.fontStretch=value; return this; };
                Thing.setHangingPunctuation=function(value){ return this._setHangingPunctuation(value); }; Thing._setHangingPunctuation=function(value){ this._element.style.hangingPunctuation=value; return this; };
                //Thing.setHeight=function(value){ return this._setHeight(value); }; Thing._setHeight=function(value){ this._element.style.height=value; return this; };
                Thing.setHyphens=function(value){ return this._setHyphens(value); }; Thing._setHyphens=function(value){ this._element.style.hyphens=value; return this; };
                Thing.setIcon=function(value){ return this._setIcon(value); }; Thing._setIcon=function(value){ this._element.style.icon=value; return this; };
                Thing.setImageOrientation=function(value){ return this._setImageOrientation(value); }; Thing._setImageOrientation=function(value){ this._element.style.imageOrientation=value; return this; };
                Thing.setJustifyContent=function(value){ return this._setJustifyContent(value); }; Thing._setJustifyContent=function(value){ this._element.style.justifyContent=value; return this; };
                //Thing.setLeft=function(value){ return this._setLeft(value); }; Thing._setLeft=function(value){ this._element.style.left=value; return this; };
                Thing.setLetterSpacing=function(value){ return this._setLetterSpacing(value); }; Thing._setLetterSpacing=function(value){ this._element.style.letterSpacing=value; return this; };
                Thing.setLineHeight=function(value){ return this._setLineHeight(value); }; Thing._setLineHeight=function(value){ this._element.style.lineHeight=_EduInt._Basic.measure(value); return this; };
                Thing.setListStyle=function(value){ return this._setListStyle(value); }; Thing._setListStyle=function(value){ this._element.style.listStyle=value; return this; };
                Thing.setListStyleImage=function(value){ return this._setListStyleImage(value); }; Thing._setListStyleImage=function(value){ this._element.style.listStyleImage=value; return this; };
                Thing.setListStylePosition=function(value){ return this._setListStylePosition(value); }; Thing._setListStylePosition=function(value){ this._element.style.listStylePosition=value; return this; };
                Thing.setListStyleType=function(value){ return this._setListStyleType(value); }; Thing._setListStyleType=function(value){ this._element.style.listStyleType=value; return this; };
                Thing.setMargin=function(value){ return this._setMargin(value); }; Thing._setMargin=function(value){ this._element.style.margin=_EduInt._Basic.measure(value); return this; };
                Thing.setMarginBottom=function(value){ return this._setMarginBottom(value); }; Thing._setMarginBottom=function(value){ this._element.style.marginBottom=_EduInt._Basic.measure(value); return this; };
                Thing.setMarginLeft=function(value){ return this._setMarginLeft(value); }; Thing._setMarginLeft=function(value){ this._element.style.marginLeft=_EduInt._Basic.measure(value); return this; };
                Thing.setMarginRight=function(value){ return this._setMarginRight(value); }; Thing._setMarginRight=function(value){ this._element.style.marginRight=_EduInt._Basic.measure(value); return this; };
                Thing.setMarginTop=function(value){ return this._setMarginTop(value); }; Thing._setMarginTop=function(value){ this._element.style.marginTop=_EduInt._Basic.measure(value); return this; };
                //  Estan sin habilitar, debido a que no se como utilizarlos aun
                //Thing.setMaxHeight=function(value){ return this._setMaxHeight(value); }; Thing._setMaxHeight=function(value){ this._element.style.maxHeight=value; return this; };
                //Thing.setMaxWidth=function(value){ return this._setMaxWidth(value); }; Thing._setMaxWidth=function(value){ this._element.style.maxWidth=value; return this; };
                //Thing.setMinHeight=function(value){ return this._setMinHeight(value); }; Thing._setMinHeight=function(value){ this._element.style.minHeight=value; return this; };
                //Thing.setMinWidth=function(value){ return this._setMinWidth(value); }; Thing._setMinWidth=function(value){ this._element.style.minWidth=value; return this; };
                Thing.setNavDown=function(value){ return this._setNavDown(value); }; Thing._setNavDown=function(value){ this._element.style.navDown=value; return this; };
                Thing.setNavIndex=function(value){ return this._setNavIndex(value); }; Thing._setNavIndex=function(value){ this._element.style.navIndex=value; return this; };
                Thing.setNavLeft=function(value){ return this._setNavLeft(value); }; Thing._setNavLeft=function(value){ this._element.style.navLeft=value; return this; };
                Thing.setNavRight=function(value){ return this._setNavRight(value); }; Thing._setNavRight=function(value){ this._element.style.navRight=value; return this; };
                Thing.setNavUp=function(value){ return this._setNavUp(value); }; Thing._setNavUp=function(value){ this._element.style.navUp=value; return this; };
                Thing.setOpacity=function(value){ return this._setOpacity(value); }; Thing._setOpacity=function(value){ this._element.style.opacity=value; return this; };
                Thing.setOrder=function(value){ return this._setOrder(value); }; Thing._setOrder=function(value){ this._element.style.order=value; return this; };
                Thing.setOrphans=function(value){ return this._setOrphans(value); }; Thing._setOrphans=function(value){ this._element.style.orphans=value; return this; };
                Thing.setOutline=function(value){ return this._setOutline(value); }; Thing._setOutline=function(value){ this._element.style.outline=value; return this; };
                Thing.setOutlineColor=function(value){ return this._setOutlineColor(value); }; Thing._setOutlineColor=function(value){ this._element.style.outlineColor=value; return this; };
                Thing.setOutlineOffset=function(value){ return this._setOutlineOffset(value); }; Thing._setOutlineOffset=function(value){ this._element.style.outlineOffset=value; return this; };
                Thing.setOutlineStyle=function(value){ return this._setOutlineStyle(value); }; Thing._setOutlineStyle=function(value){ this._element.style.outlineStyle=value; return this; };
                Thing.setOutlineWidth=function(value){ return this._setOutlineWidth(value); }; Thing._setOutlineWidth=function(value){ this._element.style.outlineWidth=value; return this; };
                Thing.setOverflow=function(value){ return this._setOverflow(value); }; Thing._setOverflow=function(value){ this._element.style.overflow=value; return this; };
                Thing.setOverflowX=function(value){ return this._setOverflowX(value); }; Thing._setOverflowX=function(value){ this._element.style.overflowX=value; return this; };
                Thing.setOverflowY=function(value){ return this._setOverflowY(value); }; Thing._setOverflowY=function(value){ this._element.style.overflowY=value; return this; };
                Thing.setPadding=function(value){ return this._setPadding(value); }; Thing._setPadding=function(value){ this._element.style.padding=value; return this; };
                Thing.setPaddingBottom=function(value){ return this._setPaddingBottom(value); }; Thing._setPaddingBottom=function(value){ this._element.style.paddingBottom=value; return this; };
                Thing.setPaddingLeft=function(value){ return this._setPaddingLeft(value); }; Thing._setPaddingLeft=function(value){ this._element.style.paddingLeft=value; return this; };
                Thing.setPaddingRight=function(value){ return this._setPaddingRight(value); }; Thing._setPaddingRight=function(value){ this._element.style.paddingRight=value; return this; };
                Thing.setPaddingTop=function(value){ return this._setPaddingTop(value); }; Thing._setPaddingTop=function(value){ this._element.style.paddingTop=value; return this; };
                Thing.setPageBreakAfter=function(value){ return this._setPageBreakAfter(value); }; Thing._setPageBreakAfter=function(value){ this._element.style.pageBreakAfter=value; return this; };
                Thing.setPageBreakBefore=function(value){ return this._setPageBreakBefore(value); }; Thing._setPageBreakBefore=function(value){ this._element.style.pageBreakBefore=value; return this; };
                Thing.setPageBreakInside=function(value){ return this._setPageBreakInside(value); }; Thing._setPageBreakInside=function(value){ this._element.style.pageBreakInside=value; return this; };
                Thing.setPerspective=function(value){ return this._setPerspective(value); }; Thing._setPerspective=function(value){ this._element.style.perspective=value; return this; };
                Thing.setPerspectiveOrigin=function(value){ return this._setPerspectiveOrigin(value); }; Thing._setPerspectiveOrigin=function(value){ this._element.style.perspectiveOrigin=value; return this; };
//  ALERTA utilice el position, y es propiamente una propiedad
                Thing.setPosition=function(value){ return this._setPosition(value); }; Thing._setPosition=function(value){ this._element.style.position=value; return this; };
                Thing.setQuotes=function(value){ return this._setQuotes(value); }; Thing._setQuotes=function(value){ this._element.style.quotes=value; return this; };
                Thing.setResize=function(value){ return this._setResize(value); }; Thing._setResize=function(value){ this._element.style.resize=value; return this; };
                //Thing.setRigh=function(value){ return this._setRigh(value); }; Thing._setRigh=function(value){ this._element.style.righ=value; return this; };
                Thing.setTableLayout=function(value){ return this._setTableLayout(value); }; Thing._setTableLayout=function(value){ this._element.style.tableLayout=value; return this; };
                Thing.setTabSize=function(value){ return this._setTabSize(value); }; Thing._setTabSize=function(value){ this._element.style.tabSize=value; return this; };
                Thing.setTextAlign=function(value){ return this._setTextAlign(value); }; Thing._setTextAlign=function(value){ this._element.style.textAlign=value; return this; };
                Thing.setTextAlignLast=function(value){ return this._setTextAlignLast(value); }; Thing._setTextAlignLast=function(value){ this._element.style.textAlignLast=value; return this; };
                Thing.setTextDecoration=function(value){ return this._setTextDecoration(value); }; Thing._setTextDecoration=function(value){ this._element.style.textDecoration=value; return this; };
                Thing.setTextDecorationColor=function(value){ return this._setTextDecorationColor(value); }; Thing._setTextDecorationColor=function(value){ this._element.style.textDecorationColor=value; return this; };
                Thing.setTextDecorationLine=function(value){ return this._setTextDecorationLine(value); }; Thing._setTextDecorationLine=function(value){ this._element.style.textDecorationLine=value; return this; };
                Thing.setTextDecorationStyle=function(value){ return this._setTextDecorationStyle(value); }; Thing._setTextDecorationStyle=function(value){ this._element.style.textDecorationStyle=value; return this; };
                Thing.setTextIndent=function(value){ return this._setTextIndent(value); }; Thing._setTextIndent=function(value){ this._element.style.textIndent=value; return this; };
                Thing.setTextJustify=function(value){ return this._setTextJustify(value); }; Thing._setTextJustify=function(value){ this._element.style.textJustify=value; return this; };
                Thing.setTextOverflow=function(value){ return this._setTextOverflow(value); }; Thing._setTextOverflow=function(value){ this._element.style.textOverflow=value; return this; };
                Thing.setTextShadow=function(value){ return this._setTextShadow(value); }; Thing._setTextShadow=function(value){ this._element.style.textShadow=value; return this; };
                Thing.setTextTransform=function(value){ return this._setTextTransform(value); }; Thing._setTextTransform=function(value){ this._element.style.textTransform=value; return this; };
                //Thing.setTop=function(value){ return this._setTop(value); }; Thing._setTop=function(value){ this._element.style.top=value; return this; };
                Thing.setTransform=function(value){ return this._setTransform(value); }; Thing._setTransform=function(value){ this._element.style.transform=value; return this; };
                Thing.setTransformOrigin=function(value){ return this._setTransformOrigin(value); }; Thing._setTransformOrigin=function(value){ this._element.style.transformOrigin=value; return this; };
                Thing.setTransformStyle=function(value){ return this._setTransformStyle(value); }; Thing._setTransformStyle=function(value){ this._element.style.transformStyle=value; return this; };
                Thing.setTransition=function(value){ return this._setTransition(value); }; Thing._setTransition=function(value){ this._element.style.transition=value; return this; };
                Thing.setTransitionProperty=function(value){ return this._setTransitionProperty(value); }; Thing._setTransitionProperty=function(value){ this._element.style.transitionProperty=value; return this; };
                Thing.setTransitionDuration=function(value){ return this._setTransitionDuration(value); }; Thing._setTransitionDuration=function(value){ this._element.style.transitionDuration=value; return this; };
                Thing.setTransitionTimingFunction=function(value){ return this._setTransitionTimingFunction(value); }; Thing._setTransitionTimingFunction=function(value){ this._element.style.transitionTimingFunction=value; return this; };
                Thing.setTransitionDelay=function(value){ return this._setTransitionDelay(value); }; Thing._setTransitionDelay=function(value){ this._element.style.transitionDelay=value; return this; };
                Thing.setUnicodeBidi=function(value){ return this._setUnicodeBidi(value); }; Thing._setUnicodeBidi=function(value){ this._element.style.unicodeBidi=value; return this; };
                Thing.setUserSelect=function(value){ return this._setUserSelect(value); }; Thing._setUserSelect=function(value){ this._element.style.userSelect=value; return this; };
                Thing.setVerticalAlign=function(value){ return this._setVerticalAlign(value); }; Thing._setVerticalAlign=function(value){ this._element.style.verticalAlign=value; return this; };
                Thing.setVisibility=function(value){ return this._setVisibility(value); }; Thing._setVisibility=function(value){ this._element.style.visibility=value; return this; };
                Thing.setWhiteSpace=function(value){ return this._setWhiteSpace(value); }; Thing._setWhiteSpace=function(value){ this._element.style.whiteSpace=value; return this; };
                //Thing.setWidth=function(value){ return this._setWidth(value); }; Thing._setWidth=function(value){ this._element.style.width=value; return this; };
                Thing.setWordBreak=function(value){ return this._setWordBreak(value); }; Thing._setWordBreak=function(value){ this._element.style.wordBreak=value; return this; };
                Thing.setWordSpacing=function(value){ return this._setWordSpacing(value); }; Thing._setWordSpacing=function(value){ this._element.style.wordSpacing=value; return this; };
                Thing.setWordWrap=function(value){ return this._setWordWrap(value); }; Thing._setWordWrap=function(value){ this._element.style.wordWrap=value; return this; };
                Thing.setWidows=function(value){ return this._setWidows(value); }; Thing._setWidows=function(value){ this._element.style.widows=value; return this; };
                //Thing.setZIndex=function(value){ return this._setZIndex(value); }; Thing._setZIndex=function(value){ this._element.style.zIndex=value; return this; };


                Thing.setBackgroundImage = function(urlImage,bnDefaultPath) { return this._setBackgroundImage(urlImage,bnDefaultPath); };
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

            _GroupsFunctions: function(Thing)
            {
                Thing.t = function(nameThing,posInX,posInY,width,height) { return this._t(nameThing,posInX,posInY,width,height,this); };
                Thing._t = function(nameThing,posInX,posInY,width,height)
                {
                    var thing = this._Board._t(this._nameThing+'--'+nameThing,posInX,posInY,width,height,this);
                    thing._thingParent = this;
                    return thing;
                };
                Thing.g = function(nameThing,posInX,posInY,width,height) { return this._g(nameThing,posInX,posInY,width,height,this); };
                Thing._g = function(nameThing,posInX,posInY,width,height)
                {
                    var group = this._Board._g(this._nameThing+'--'+nameThing,posInX,posInY,width,height,this);
                    group._thingParent = this;
                    return group;
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
                Thing.accCreateAnimateFunctionInShadow = function(functionAnimatedInShadow,jsonInfoEnviada) { this._accCreateAnimateFunctionInShadow(functionAnimatedInShadow,jsonInfoEnviada); }
                Thing._accCreateAnimateFunctionInShadow = function(functionAnimatedInShadow,jsonInfoEnviada)
                {
                    var idTheFunctionInShadow = this._Board._addFunctionAnimatedInShadow(functionAnimatedInShadow,{
                        options: jsonInfoEnviada,
                        father: this,
                        //  frameToDesapear: ,
                    });

                    return idTheFunctionInShadow;
                }
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

    //  Objeto para manejo de cambios en pantalla
    _Responsive: {
        $desktop_width_limit: 1200,
        $desktop_width: 1180,
        $laptop_width: 1024,
        $tablet_width: 768,
        $mobile_width: 425,
        $mobile_l_width: 425,
        $mobile_m_width: 375,
        $mobile_s_width: 320,

        anchoPantalla: 0, tipoResolucion: '', subTipoResolucion: '', lastTipoResolucion: '', lastSubTipoResolucion: '', bnCambioTipoDeResolucion: false, bnCambioSubTipoDeResolucion: false,

        //  Inicia el proceso de responsive
        init: function(){
            _EduInt._Responsive.setInformation();
            window.addEventListener("resize", function() { _EduInt._Responsive.setInformation(); });
        },
        //  Retorna la resolución de la pantalla : Responsive.getResolution()
        getResolution: function() { return this.anchoPantalla; },

        //  Retorna el tipo de resolución de la pantalla : Responsive.getTypeResolution()
        //  ============================================
        //  'Desktop', 'Tablet', 'Mobile'
        getTypeResolution: function() { return this.tipoResolucion; },
        //  Retorna el sub tipo de resolución de la pantalla : Responsive.getSubTypeResolution()
        //  ================================================
        //  Dentro de Desktop Tenemos
        //  -------------------------
        //  - Desktop: Pantalla mayor al ancho maximo de la pagina (>1200px)
        //  - PageMaxWith: Pantalla menor al ancho maximo de la pagina (<1200px)
        //  - Laptop: Pantalla menor a 1024px (Igual que lo que dice chrome)
        //
        //  Dentro de Tablet Tenemos
        //  ------------------------
        //  - Tablet: No existen mas subtipos
        //
        //  Dentro de Mobile Tenemos
        //  ------------------------
        //  - Mobil_L: Pantalla menor a 425px (Igual que lo que dice chrome)
        //  - Mobil_M: Pantalla menor a 375px (Igual que lo que dice chrome)
        //  - Mobil_S: Pantalla menor a 320px (Igual que lo que dice chrome)
        getSubTypeResolution: function() { return this.subTipoResolucion; },
        //  Retorna true, si cambio de tipo de resolución Ej. Tablet -> Mobile
        qstnChangeTypeResolution: function() { return this.bnCambioTipoDeResolucion; },
        //  Retorna true, si cambio de Sub tipo de resolución Ej. Mobil_L -> Mobil_M
        qstnChangeSubTypeResolution: function() { return this.bnCambioSubTipoDeResolucion; },
        //  Añade una funciona a responsive
        arFunctionsToExecuteOnResize: [],
        addFunctionToExecuteOnResize: function(myFunction,bnEjecutar){ this.arFunctionsToExecuteOnResize[this.arFunctionsToExecuteOnResize.length]=myFunction; if(bnEjecutar) { this.accExecuteFunction(myFunction); }; },
        //  Cada vez que cambia de resolución ingresa aca para dar información
        setInformation: function()
        {
            this.lastTipoResolucion=this.tipoResolucion;
            this.lastSubTipoResolucion=this.subTipoResolucion;
            this.anchoPantalla = jQuery(window).innerWidth();
            if(this.$desktop_width<this.anchoPantalla)
            { this.tipoResolucion='Desktop'; this.subTipoResolucion='Desktop'; }
            if(this.$laptop_width<this.anchoPantalla   && this.anchoPantalla<=this.$desktop_width)
            { this.tipoResolucion='Desktop'; this.subTipoResolucion='PageMaxWith'; }
            if(this.$tablet_width<this.anchoPantalla   && this.anchoPantalla<=this.$laptop_width)
            { this.tipoResolucion='Desktop'; this.subTipoResolucion='Laptop'; }
            if(this.$mobile_l_width<this.anchoPantalla && this.anchoPantalla<=this.$tablet_width)
            { this.tipoResolucion='Tablet'; this.subTipoResolucion='Tablet'; }
            if(this.$mobile_m_width<this.anchoPantalla && this.anchoPantalla<=this.$mobile_l_width)
            { this.tipoResolucion='Mobile'; this.subTipoResolucion='Mobil_L'; }
            if(this.$mobile_s_width<this.anchoPantalla && this.anchoPantalla<=this.$mobile_m_width)
            { this.tipoResolucion='Mobile'; this.subTipoResolucion='Mobil_M'; }
            if(0<this.anchoPantalla && this.anchoPantalla<=this.$mobile_s_width)
            { this.tipoResolucion='Mobile'; this.subTipoResolucion='Mobil_S'; }

            if(this.lastTipoResolucion!=this.tipoResolucion)
            { this.bnCambioTipoDeResolucion=true; } else { this.bnCambioTipoDeResolucion=false; }
            if(this.lastSubTipoResolucion!=this.subTipoResolucion)
            { this.bnCambioSubTipoDeResolucion=true; } else { this.bnCambioSubTipoDeResolucion=false; }

            //console.info('ejecuto el on rezise');
            //  Pasa por cada funcion y la ejecuta
            for(var countFunctions=0;countFunctions<this.arFunctionsToExecuteOnResize.length;countFunctions++)
            {
                var myFunction = this.arFunctionsToExecuteOnResize[countFunctions];
                //  Ejecuta la función
                this.accExecuteFunction(myFunction);
            }
        },
        //  Ejecuta la función y envia los parametros
        accExecuteFunction: function(myFunction)
        {
            myFunction({
                anchoPantalla: this.anchoPantalla,
                tipoResolucion: this.tipoResolucion,
                lastTipoResolucion: this.lastTipoResolucion,
                subTipoResolucion: this.subTipoResolucion,
                bnCambioTipoDeResolucion: this.bnCambioTipoDeResolucion,
                bnCambioSubTipoDeResolucion: this.bnCambioSubTipoDeResolucion
            });
        },
        //  arFunctionsOnResize: [],
        //  Las funciones que se añaden aca se ejecutan cuando cambia la resolución
        //  addFunctionToOnResize: function(myFunction)
        //  {
        //      this.arFunctionsOnResize[this.arFunctionsOnResize.length]=myFunction;
        //  }
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
_EduInt.Input = _EduInt._Input;

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
    console.error(err.message);
}

//  Establece la funcion de consutla
//  ================================
//  ================================
_EduInt7=_EduInt;
EduInt=_EduInt7;
b = _EduInt._Board._Board;
_EduInt.createBoardIn=_EduInt._Board._createSimpleIn;
_EduInt.createBoardInBody=_EduInt._Board._createSimpleInBody;

//  Deprecate
//  =========
//  =========
BasicEI = _EduInt._Basic;
