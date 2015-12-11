var filtAndMask = {
    qstnIsNumber: function(numero)
    {
        return !isNaN(numero);
    },
    remplaceAll: function(aCambiar_MyR,aColocar,valor_MyR)
    {
        while(0<=valor_MyR.indexOf(aCambiar_MyR))
        { valor_MyR=valor_MyR.replace(aCambiar_MyR,'¬'); }
        while(0<=valor_MyR.indexOf('¬'))
        { valor_MyR=valor_MyR.replace('¬',aColocar); }
        return valor_MyR;
    },
    //  Divizor de palabras, la idea es colocar uno antes y despues de cada cosa que divide una palabra,
    //  como un espacio o un parentesis
    divisorDePalabras: '�',
    //  Verifica cual de los valores del arreglo[arDeElementos_ESt] esta mas cercano al origen
    //  0 <- qstnCualEsElElementoMasCercano('abc',['a','b','c']);
    //  2 <- qstnCualEsElElementoMasCercano('abc',['b','c','a']);
    //  1 <- qstnCualEsElElementoMasCercano('abc',['c','a','b']);
    qstnCualEsElElementoMasCercano: function(valor_ESt,arDeElementos_ESt)
    {
        //  true, si encuentra alguno de los caracteres
        var bnEncntroAlgnLgrDndNSeTndrEnCuent_ESt=false;
        //  Retorna el lugar en el arreglo deonde esta el elemento mas cercano, pero si no encuentra devuelve -1
        var noDeLugaresDondeNoSeTendreEnCuenta_ESt=-1;
        //  Contenera la posicion mas sercana de los caracteres dentro de los cuales no se actua
        var posicionMasCercana=valor_ESt.length;
        //  Busca cual de los caracteres a no mostrar esta mas cercano
        for(var contDeLugaresDondeNoSeTendreEnCuenta=0;contDeLugaresDondeNoSeTendreEnCuenta<arDeElementos_ESt.length;contDeLugaresDondeNoSeTendreEnCuenta++)
        {
            //  Posicion mas cercana
            var posicionMasCercana_=valor_ESt.indexOf(arDeElementos_ESt[contDeLugaresDondeNoSeTendreEnCuenta]);
            //  Posicion mas cercana
            if(posicionMasCercana_<posicionMasCercana && posicionMasCercana_!=-1)
            {
                posicionMasCercana=posicionMasCercana_;
                //  Encontro algun lugar donde no se tendra en cuenta el contenido
                var bnEncntroAlgnLgrDndNSeTndrEnCuent_ESt=true;
                //  No del lugar donde se trendra en cuenta
                var noDeLugaresDondeNoSeTendreEnCuenta_ESt=contDeLugaresDondeNoSeTendreEnCuenta;
            }
        }
        return noDeLugaresDondeNoSeTendreEnCuenta_ESt;
    },
    //  Los valores intermedios se conservaran dentro de este arreglo
    arValoresIntermedios: [],
    //  Valores de inicio y fin de los valores intermedios
    arIniContenidoANoTenerEnCuenta: [],
    arFinContenidoANoTenerEnCuenta: [],
    //  Informa si los valores intermedios finalizaron
    arBnLasComillasFinalizaron: [],
    //  Valor unico para remplazar por los valores intermedios
    textoParaRemplazarContenidoDeComillas_ESt: 'EduSoftEntreComillasTemp',
    //  cambiarValoresIntermediosPorReservado('El le dijo "Casi que no" antes de volver a casa','comentarios',[{ ini: '"', end: '"' }])
    //      @tipoDeValores: Un nombre unico del tipo, como: 'comentarios', 'comillas'
    //  Retorna:
    //      'El le dijo EduSoftPalabraReservada1 antes de volver a casa'
    cambiarValoresIntermediosPorReservado: function(valor,tipoDeValores,arSeparadoresDeValoresIntermedios)
    {
        var valor_ESt_ = valor;
        //  Inicia el valor por el tipo de valores
        this.arValoresIntermedios[tipoDeValores]=[];
        //  Dividira el contenido en tres partes, antes de las primeras comillas
        //  dentro de las comillas, y por ultimo despues de las primeras comillas
        //  Esto con el fin de poder cambiar lo que esta dentro de ellas y colocarlo despues
        var stAntesComillas_ESt='';
        var stEntreComillas_ESt='';
        var stDespsComillas_ESt='';
        //  Arreglos que contendran los valores iniciales y finales respectivamente
        var arIniDeLugaresDondeNoSeTendreEnCuenta=[];
        var arFinDeLugaresDondeNoSeTendreEnCuenta=[];
        //  Crea un arreglo con los valores iniciale y finales
        for(var countValoresIntermedios=0;countValoresIntermedios<arSeparadoresDeValoresIntermedios.length;countValoresIntermedios++)
        {
            var valorInicial = arSeparadoresDeValoresIntermedios[countValoresIntermedios].ini;
            var valorFinal = arSeparadoresDeValoresIntermedios[countValoresIntermedios].end;
            arIniDeLugaresDondeNoSeTendreEnCuenta[countValoresIntermedios] = valorInicial;
            arFinDeLugaresDondeNoSeTendreEnCuenta[countValoresIntermedios] = valorFinal;
        }

        //  Busca cual es el elemento mas cercano al origen para continuar
        var noPosicionDelElementoMasCercano=this.qstnCualEsElElementoMasCercano(valor_ESt_,arIniDeLugaresDondeNoSeTendreEnCuenta);
        //  Valor inical del valor intermedio mas secano
        var valIniDelValorIntermedioMasCercano = arIniDeLugaresDondeNoSeTendreEnCuenta[noPosicionDelElementoMasCercano];
        var valFinDelValorIntermedioMasCercano = arFinDeLugaresDondeNoSeTendreEnCuenta[noPosicionDelElementoMasCercano];
        var posIniComilla_ESt = valor_ESt_.indexOf(valIniDelValorIntermedioMasCercano);
        //  Solo entra si encuentra algun tipo de dato intermedio
        for(var contValoresDentroDeComillas=0;posIniComilla_ESt!=-1;contValoresDentroDeComillas++)
        {
            //  Coloca todo el contenido antes del valor intermedio
            var stAntesComillas_ESt=valor_ESt_.substr(0,posIniComilla_ESt);
            //  Coloca todo el conteido despues de la primera comilla(Tambien la segunda y demas)
            var stDesPrimComil_ESt=valor_ESt_.substr(posIniComilla_ESt,valor_ESt_.length);

            //  Cambia lo que esta dentro de las comillas por un caracter unico
            var nuevoStEntreComillas_ESt=this.divisorDePalabras+this.textoParaRemplazarContenidoDeComillas_ESt+'__'+tipoDeValores+'__'+contValoresDentroDeComillas+this.divisorDePalabras;

            //  Busca el final del valor Intermedio
            var posFinComilla_ESt=stDesPrimComil_ESt.indexOf(valFinDelValorIntermedioMasCercano,valIniDelValorIntermedioMasCercano.length);
            //  Si existe esta comilla que cierra la primera entra
            if(posFinComilla_ESt!=-1)
            {
                //  Coge el valor intermedio
                stEntreComillas_ESt=stDesPrimComil_ESt.substr(0,posFinComilla_ESt+valFinDelValorIntermedioMasCercano.length);
                //  Guarda el contenido dentro de las comillas
                this.arValoresIntermedios[tipoDeValores][this.arValoresIntermedios[tipoDeValores].length]=stEntreComillas_ESt;
                //  Coloca todo lo que existe despues de las comillas que cierran
                stDespsComillas_ESt=stDesPrimComil_ESt.substr(posFinComilla_ESt+valIniDelValorIntermedioMasCercano.length,stDesPrimComil_ESt.length);
                //  Guarda los caracteres iniciales y finales a no tener en cuenta
                this.arIniContenidoANoTenerEnCuenta[contValoresDentroDeComillas]=valIniDelValorIntermedioMasCercano;
                this.arFinContenidoANoTenerEnCuenta[contValoresDentroDeComillas]=valFinDelValorIntermedioMasCercano;
                //  Cambia los resultados cambiando el contenodo de las comillas
                valor_ESt_=stAntesComillas_ESt+nuevoStEntreComillas_ESt+stDespsComillas_ESt;
                //
                this.arBnLasComillasFinalizaron[contValoresDentroDeComillas]=true;
            }
            else
            {
                //  SE DEBE INFORMAR DE QUE UNA COMILLA NO CIERRA

                //  Guarda el contenido dentro de las comillas
                this.arValoresIntermedios[tipoDeValores][this.arValoresIntermedios[tipoDeValores].length]=stDesPrimComil_ESt;
                //  Guarda los caracteres iniciales y finales a no tener en cuenta
                this.arIniContenidoANoTenerEnCuenta[contValoresDentroDeComillas]=valIniDelValorIntermedioMasCercano;
                //  Coloca el resultado sin el cierre de comillas
                valor_ESt_=stAntesComillas_ESt+nuevoStEntreComillas_ESt;
                //  Si las comillas no finalizaron
                this.arBnLasComillasFinalizaron[contValoresDentroDeComillas]=false;
                //  Sale de manera preventiva
                break;
            }
            //  Busca cual es el elemento mas cercano al origen para continuar
            noPosicionDelElementoMasCercano=this.qstnCualEsElElementoMasCercano(valor_ESt_,arIniDeLugaresDondeNoSeTendreEnCuenta);
            //  Valor inical del valor intermedio mas secano
            valIniDelValorIntermedioMasCercano = arIniDeLugaresDondeNoSeTendreEnCuenta[noPosicionDelElementoMasCercano];
            valFinDelValorIntermedioMasCercano = arFinDeLugaresDondeNoSeTendreEnCuenta[noPosicionDelElementoMasCercano];
            posIniComilla_ESt = valor_ESt_.indexOf(valIniDelValorIntermedioMasCercano);
        }
        return valor_ESt_;
    },
    //  retornarValoresReservadoPorIntermedios('El le dijo EduSoftPalabraReservada1 antes de volver a casa')
    //      @tipoDeValores: Un nombre unico del tipo, como: 'comentarios', 'comillas'
    //  Retorna:
    //      'El le dijo "Casi que no" antes de volver a casa'
    retornarValoresReservadoPorIntermedios: function(valorOriginal,tipoDeValores)
    {
        var valor=valorOriginal;
        for(var countValoresReservados=0;countValoresReservados<this.arValoresIntermedios[tipoDeValores].length;countValoresReservados++)
        {
            valor=valor.replace(this.textoParaRemplazarContenidoDeComillas_ESt+'__'+tipoDeValores+'__'+countValoresReservados,this.arValoresIntermedios[tipoDeValores][countValoresReservados]);
        }
        return valor;
    },
    code: function(valor_ESt,infoCode)
    {
        /** pasarDeCodigoAColor_ESt("o('pedro').setPosicionEnX(12);"); **/

        //  Coloca un divizor al comienzo y al final
        var valor_ESt_=valor_ESt;
        //  Cambia los espacios por un caracter que entiende html, y se aplica para todo el valor
        valor_ESt_=this.remplaceAll(' ','&nbsp',valor_ESt_);
        valor_ESt_=this.remplaceAll('<','&#60',valor_ESt_);
        valor_ESt_=this.remplaceAll('>','&#62',valor_ESt_);

        //  Deja aparte los comentarios
        valor_ESt_ = filtAndMask.cambiarValoresIntermediosPorReservado(valor_ESt_,'comentarios',infoCode.notIncluded);
        //  Deja aparte los comentarios
        valor_ESt_ = filtAndMask.cambiarValoresIntermediosPorReservado(valor_ESt_,'comillas',infoCode.quotes);

        //  Colocamos un divizor al comienzo y final de las palabras
        var valor_ESt_=this.divisorDePalabras+valor_ESt_+this.divisorDePalabras;
        /** "%o(LasComillasSeRemplazanPorTextosUnicos).setPosicionEnX(12);%" **/

        //  Estas son las palabras que tipicamente dividen una palabra de otra
        var arPalabrasQueSimbolisanElFinDeUnaPlabra=infoCode.dividersWords;
        //  Coloco un simbolo al comienzo y al final
        valor_ESt_=this.divisorDePalabras+valor_ESt_+this.divisorDePalabras;
        //  Pasa por cada una de estas y le coloca antes y despues de las mismas un '[%]' de tal manera que divida estas palabras
        for(contPalabrasQSEFDUP=0;contPalabrasQSEFDUP<arPalabrasQueSimbolisanElFinDeUnaPlabra.length;contPalabrasQSEFDUP++)
        {
            var valor_ESt_=this.remplaceAll(arPalabrasQueSimbolisanElFinDeUnaPlabra[contPalabrasQSEFDUP],this.divisorDePalabras+arPalabrasQueSimbolisanElFinDeUnaPlabra[contPalabrasQSEFDUP]+this.divisorDePalabras,valor_ESt_);
        }

        //  Las funciones tipicas
        var arPalabrasQueSimbolisanFunciones=infoCode.reserved;
        //  Pasa por cada una de las funciones y le coloca en un span dandole color
        for(contPalabrasQueSimbolisanFunciones=0;contPalabrasQueSimbolisanFunciones<arPalabrasQueSimbolisanFunciones.length;contPalabrasQueSimbolisanFunciones++)
        {
            var valor_ESt_=this.remplaceAll(this.divisorDePalabras+arPalabrasQueSimbolisanFunciones[contPalabrasQueSimbolisanFunciones].word+this.divisorDePalabras,this.divisorDePalabras+'<span fnc="ESt" >'+arPalabrasQueSimbolisanFunciones[contPalabrasQueSimbolisanFunciones].word+'</span>'+this.divisorDePalabras,valor_ESt_);
        }
        /** "%<span .. >o</span>%(%LasComillasSeRemplazanPorTextosUnicos%)%%.%<span .. >posicionEnX</span>%(%12%)%;" **/

        //  palabras clave tipicas
        var arPalabrasClaves_ESt=infoCode.reservedFunctions;
        //  Pasa por cada una de las funciones y le coloca en un span dandole color
        for(contPalabrasQueSimbolisanFunciones=0;contPalabrasQueSimbolisanFunciones<arPalabrasClaves_ESt.length;contPalabrasQueSimbolisanFunciones++)
        {
            var valor_ESt_=this.remplaceAll(this.divisorDePalabras+arPalabrasClaves_ESt[contPalabrasQueSimbolisanFunciones]+this.divisorDePalabras,this.divisorDePalabras+'<span palclv="ESt" >'+arPalabrasClaves_ESt[contPalabrasQueSimbolisanFunciones]+'</span>'+this.divisorDePalabras,valor_ESt_);
        }
        /** "%<span .. >o</span>%(%LasComillasSeRemplazanPorTextosUnicos%)%%.%<span .. >posicionEnX</span>%(%12%)%;" **/

        //  Colocarle color a los puntos claves
        var valor_ESt_=this.remplaceAll(this.divisorDePalabras+'('+this.divisorDePalabras,this.divisorDePalabras+'<span prntesis="ESt">(</span>'+this.divisorDePalabras,valor_ESt_);
        var valor_ESt_=this.remplaceAll(this.divisorDePalabras+')'+this.divisorDePalabras,this.divisorDePalabras+'<span prntesis="ESt">)</span>'+this.divisorDePalabras,valor_ESt_);
        var valor_ESt_=this.remplaceAll(this.divisorDePalabras+';'+this.divisorDePalabras,this.divisorDePalabras+'<span pntoycom="ESt">;</span>'+this.divisorDePalabras,valor_ESt_);
        /** "%<span .. >o</span>%<span .. >(</span>%LasComillasSeRemplazanPorTextosUnicos%<span .. >)</span>%%.%<span .. >posicionEnX</span>%<span .. >(</span>%12%<span .. >)</span>%;" **/

        //  Cambia los cambios de linea del tecto en cambios de linea HTML
        var valor_ESt_=this.remplaceAll("\r"+this.divisorDePalabras+"\n",'<br/>',valor_ESt_);
        var valor_ESt_=this.remplaceAll("\n",'<br/>',valor_ESt_);
        var valor_ESt_=this.remplaceAll("\r",'<br/>',valor_ESt_);

        //  Vuelve a convertir lo que esta entre comentarios a lo que era antes
        valor_ESt_=filtAndMask.retornarValoresReservadoPorIntermedios(valor_ESt_,'comentarios');
        //  Vuelve a convertir lo que esta entre comillas a lo que era antes
        valor_ESt_=filtAndMask.retornarValoresReservadoPorIntermedios(valor_ESt_,'comillas');

        //  Coloca un epacio al final para que sea visible el <br> al final
        valor_ESt_=valor_ESt_+'&nbsp'+this.divisorDePalabras;

        //  Divide el codigo por palabras para sacar los numeros y colocarle color
        arPorPalabrasValor_ESt=valor_ESt_.split(this.divisorDePalabras);
        //  Pasa por cada palabra
        for(var contPorPalabrasValor_ESt=0;contPorPalabrasValor_ESt<arPorPalabrasValor_ESt.length;contPorPalabrasValor_ESt++)
        {
            if(this.qstnIsNumber(arPorPalabrasValor_ESt[contPorPalabrasValor_ESt]))
            {
                arPorPalabrasValor_ESt[contPorPalabrasValor_ESt]='<span num="ESt" >'+arPorPalabrasValor_ESt[contPorPalabrasValor_ESt]+'</span>';
            }
        }

        //  Al final quita los divizores de la pabras
        valor_ESt_=arPorPalabrasValor_ESt.join('');

        return valor_ESt_;
    },
};

var eiInputs = {
    defaultInfoInput: { type: 'text', name: '', placeholder: '', className: '', id: '', value: '', value_base68: '', },
    defaultInfoInputCode: { name: '', placeholder: '', value: '', value_base68: '', },
    Input: function(infoInput)
    {
        infoInput = BasicEI.setDefaultOptions(infoInput,eiInputs.defaultInfoInput);

        this.element = document.createElement('div');

            this.label = document.createElement('label');
            this.element.appendChild(this.label);

            this.input = document.createElement('input');
            if(infoInput.type!='') { this.input.type = infoInput.type; }
            if(infoInput.name!='') { this.input.name = infoInput.name; }
            if(infoInput.placeholder!='') { this.input.placeholder = infoInput.placeholder; }
            if(infoInput.className!='') { this.input.className = infoInput.className; }
            if(infoInput.id!='') { this.input.id = infoInput.id; }
            if(infoInput.value!='') { this.input.value = infoInput.value; }
            else if(infoInput.value_base68!='') { this.input.value = window.atob(infoInput.value_base68); }
            this.element.appendChild(this.input);

    },
    InputCode: function(infoInput,infoCode)
    {
        infoInput = BasicEI.setDefaultOptions(infoInput,eiInputs.defaultInfoInputCode);

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

            this.input.onkeyup = function(){
                this.colorText.innerHTML=filtAndMask.code(this.value,this.infoCode);
            }

            this.getValue=function()
            { return this.input.value; }
            this.setValue=function(value)
            { this.input.value=value; return this; }

            this.colorText.innerHTML=filtAndMask.code(this.input.value,infoCode);
            this.element.appendChild(this.input);
    }
};

var IDE_Game = {
    words: {
        notIncluded: [
            { ini: '/*', end: '*/' },
        ],
        quotes: [
            { ini: '"', end: '"' },
            { ini: "'", end: "'" },
        ],
        dividersWords: [' ','(',')','[',']','+','-','/',';','.','\r','\n',',','=','<','>'],
        reserved: [
            {
                word: 'this',
                title: '',
                description: '',
            },{
                word: 't',
                title: '',
                description: '',
            },{
                word: 'setPosInX',
                title: 'Posición en X',
                description: '',
            },{
                word: 'setPosInY',
                title: 'Posición en Y',
                description: '',
            },{
                word: 'setPosition',
                title: 'Posición en X ý Y',
                description: '',
            },{
                word: 'accMoveInX',
                title: 'Accion de mover en X',
                description: '',
            },{
                word: 'accMoveInY',
                title: 'Accion de mover en Y',
                description: '',
            },{
                word: 'setBackgroundColor',
                title: 'Cambia el color de <fondo></fondo>',
                description: '',
            }
        ],
        reservedFunctions: [
            'if',
            'else',
            'for',
            'where',
            'switch',
            'var',
            'new'
        ],
    },
    DevelopmentEnvironment: function(info){
        this.info = info;
        this.create = function(){
            //  Titulo
            //  ======
            this.elemTitle = document.getElementById(this.info.title.id);
                this.titleInput = new eiInputs.Input({ name: 'title', className: 'c_eicreategame_title', value: this.info.title.value });
                this.elemTitle.appendChild(this.titleInput.element);

            //  Descrición
            //  ==========
            this.elemDescription = document.getElementById(this.info.description.id);
                this.descriptionInput = new eiInputs.Input({ name: 'description', className: 'c_eicreategame_description', value: this.info.description.value });
                this.elemDescription.appendChild(this.descriptionInput.element);

            //  Caracteristicas
            //  ===============
            this.elemCaracteristics = document.getElementById(this.info.characteristics.id);
                this.elemCaracteristicsWidth = document.getElementById(this.info.characteristics.width.id);
                this.caracteristicsWidthInput = new eiInputs.Input({ name: 'width', className: 'c_eicreategame_width', value: this.info.characteristics.width.value });
                this.elemCaracteristicsWidth.appendChild(this.caracteristicsWidthInput.element);
                this.elemCaracteristicsHeight = document.getElementById(this.info.characteristics.height.id);
                this.caracteristicsHeightInput = new eiInputs.Input({ name: 'height', className: 'c_eicreategame_height', value: this.info.characteristics.height.value });
                this.elemCaracteristicsHeight.appendChild(this.caracteristicsHeightInput.element);

            //  Start
            //  =====
            this.elemStart = document.getElementById(this.info.start.id);
            this.elemStart.style.position = 'relative';
                var inputOptions = { name: 'start', placeholder: 'codigo', className: 'c_eicreategame_start' }
                if(this.info.start.value!==undefined)
                { inputOptions.value=this.info.start.value; }
                if(this.info.start.value_base68!==undefined)
                { inputOptions.value_base68=this.info.start.value_base68; }
                this.startInput = new eiInputs.InputCode(inputOptions,IDE_Game.words);
                this.elemStart.appendChild(this.startInput.element);

            this.elemStartButton = document.getElementById(this.info.start.button.id);
                this.elemStartButton.value=this.info.start.button.value;
                this.elemStartButton.innerHTML=this.info.start.button.value;
                this.elemStartButton.parent = this;
                this.elemStartButton.onclick=function()
                    {
                        var board = this.parent.getBoard();
                        //  this.boardArrastrarPalabras.start();
                        board.my.startCode = this.parent.startInput.getValue();
                        board.restart(function() { eval('try { '+this.my.startCode+' } catch(err) { myconsole(err); } '); });
                        //  Borra la animación si ya inicio
                        board.deleteAnimation()
                    }

            //  Animate
            //  =======
            this.elemAnimate = document.getElementById(this.info.animate.id);
            this.elemAnimate.style.position = 'relative';
                var inputOptions = { name: 'animate', placeholder: 'codigo', className: 'c_eicreategame_animate' };
                if(this.info.animate.value!==undefined)
                { inputOptions.value=this.info.animate.value; }
                if(this.info.animate.value_base68!==undefined)
                { inputOptions.value_base68=this.info.animate.value_base68; }
                this.animationInput = new eiInputs.InputCode(inputOptions,IDE_Game.words);
                this.elemAnimate.appendChild(this.animationInput.element);

            this.elemAnimateButton = document.getElementById(this.info.animate.button.id);
                this.elemAnimateButton.value=this.info.animate.button.value;
                this.elemAnimateButton.innerHTML=this.info.animate.button.value;
                this.elemAnimateButton.parent = this;
                this.elemAnimateButton.onclick=function()
                    {
                        var board = this.parent.getBoard();
                        //  this.boardArrastrarPalabras.start();
                        board.my.startCode = this.parent.startInput.getValue();
                        board.restart(function() { eval(this.my.startCode); });

                        board.my.animationCode = this.parent.animationInput.getValue();
                        board.deleteAnimation().createAnimation(function(info) { eval('try { '+this.my.animationCode+' } catch(err) { myconsole(err); } '); }).startAnimation();
                    }

            //  Regorna el tablero, en caso de no existir lo crea
            this.getBoard = function()
            {
                if(this.board===undefined)
                {
                    this.board = $('#'+this.info.result.id).createBoard(this.info.title,this.caracteristicsWidthInput.input.value,this.caracteristicsHeightInput.input.value);
                    this.board.my.info=this.info;
                    idConsole=this.info.console.id;
                    myconsole = function(valueOriginal)
                    {
                        value=valueOriginal;
                        if(valueOriginal.stack!==undefined)
                        {
                            value=valueOriginal.stack.toString()
                        }
                        var newComment =document.createElement('div');
                        if(valueOriginal.name=='TypeError')
                        { newComment.style.color='#FAA'; }
                        newComment.innerHTML=value;
                        document.getElementById(idConsole).appendChild(newComment);
                        document.getElementById(idConsole).scrollTop=7000000;
                    }
                    this.board.my.console = function(value)
                    {
                        var newComment =document.createElement('div');
                        newComment.innerHTML=value;
                        document.getElementById(this.info.result.idConsole).appendChild(newComment);
                        document.getElementById(idConsole).scrollTop=50000;
                    }
                    console.error=myconsole;
                    console.warn=myconsole;
                    console.info=myconsole;
                }
                return this.board;
            }
        };
    },
};
