if(typeof ei === 'undefined') { ei={}; };

ei.FiltAndMask = {
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
    divisorDePalabras: '~',
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
        var arConDeLugaresDondeNoSeTendreEnCuenta=[];
        var arFinDeLugaresDondeNoSeTendreEnCuenta=[];
        //  Crea un arreglo con los valores iniciale y finales
        for(var countValoresIntermedios=0;countValoresIntermedios<arSeparadoresDeValoresIntermedios.length;countValoresIntermedios++)
        {
            var valorInicial = arSeparadoresDeValoresIntermedios[countValoresIntermedios].ini;
            var valorFinal = arSeparadoresDeValoresIntermedios[countValoresIntermedios].end;
            var valorContinuar = arSeparadoresDeValoresIntermedios[countValoresIntermedios].con;
            arIniDeLugaresDondeNoSeTendreEnCuenta[countValoresIntermedios] = valorInicial;
            arFinDeLugaresDondeNoSeTendreEnCuenta[countValoresIntermedios] = valorFinal;
            arConDeLugaresDondeNoSeTendreEnCuenta[countValoresIntermedios] = valorContinuar;
        }

        //  Busca cual es el elemento mas cercano al origen para continuar
        var noPosicionDelElementoMasCercano=this.qstnCualEsElElementoMasCercano(valor_ESt_,arIniDeLugaresDondeNoSeTendreEnCuenta);
        //  Valor inical del valor intermedio mas secano
        var valIniDelValorIntermedioMasCercano = arIniDeLugaresDondeNoSeTendreEnCuenta[noPosicionDelElementoMasCercano];
        var valFinDelValorIntermedioMasCercano = arFinDeLugaresDondeNoSeTendreEnCuenta[noPosicionDelElementoMasCercano];
        var valConDelValorIntermedioMasCercano = arConDeLugaresDondeNoSeTendreEnCuenta[noPosicionDelElementoMasCercano];
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

            var bnEncontroFinArchivo=false;
            var bnExisteCon=false;
            if(valConDelValorIntermedioMasCercano!==undefined)
            {
                bnExisteCon=true;
            }

            var valorParaIniciarBusquedaFin = valIniDelValorIntermedioMasCercano.length;
            //  Mira si existe un continuar
            var bnConEsMasDeUno=false;
            if(bnExisteCon)
            {
                //  Posición del fin del comilla y el continuar
                var posFinComilla_ESt=stDesPrimComil_ESt.indexOf(valFinDelValorIntermedioMasCercano,valorParaIniciarBusquedaFin);
                var posConComilla_ESt=stDesPrimComil_ESt.indexOf(valConDelValorIntermedioMasCercano,valIniDelValorIntermedioMasCercano.length);
                
                //  Si alguno no existe o tiene un error el informa que debe cerrar hasta el fin del archivo
                if(posFinComilla_ESt==-1 || posConComilla_ESt==-1)
                {
                    bnEncontroFinArchivo=true;
                }
                else if(posFinComilla_ESt < posConComilla_ESt)
                {
                    //  Error
                    bnEncontroFinArchivo=true;
                }
                //  Si esta en otden contunua
                else
                {
                    //  Averigua cuantos con existen de aca hasta el final
                    var numCon = stDesPrimComil_ESt.split(valConDelValorIntermedioMasCercano).length - 1;
                    //   SI es uno solo busca el mas cierre mas cercano o el fin del archivo
                    if(numCon==1)
                    {
                        var posFinComilla_ESt=stDesPrimComil_ESt.indexOf(valFinDelValorIntermedioMasCercano,valorParaIniciarBusquedaFin);
                        if(posFinComilla_ESt!=-1)
                        {
                            bnExisteComillaFin=true;
                        }
                        break;
                    }
                    //  En caso de tener mas de un con busca cuandos tiene antes de cerrar
                    else
                    {
                        var bnExisteComillaFin=false;
                        var numCon=0;
                        var numFin=1;
                        var valCon = valConDelValorIntermedioMasCercano;
                        var valFin = valFinDelValorIntermedioMasCercano;
                        var buscarFinDesde=0;                       
                        while(!bnExisteComillaFin)
                        {
                            if(1<numFin) { buscarFinDesde=buscarFinDesde+valFin.length; }
                            var lengthStFinComilla_ESt = stDesPrimComil_ESt.indexOf(valFin,buscarFinDesde);
                            // Encontro una comilla final
                            if(lengthStFinComilla_ESt!=-1)
                            {
                                //  var lengthStConComilla_ESt = stDesPrimComil_ESt.indexOf(valFinDelValorIntermedioMasCercano);
                                numCon = numCon + stDesPrimComil_ESt.substring(buscarFinDesde,lengthStFinComilla_ESt).split(valCon).length - 1;

                                if(numCon==numFin)
                                {
                                    bnExisteComillaFin=true;
                                    bnConEsMasDeUno = true;
                                    posFinComilla_ESt=lengthStFinComilla_ESt;
                                    break;
                                }
                                else
                                {
                                    numFin++;
                                    buscarFinDesde = lengthStFinComilla_ESt;
                                }
                            }
                            else
                            {
                                break;
                            }
                        }
                    }
                }
            }
            //  Si no existe toma el valor al cierre de comilla o informe que no existe
            else
            {
                var posFinComilla_ESt=stDesPrimComil_ESt.indexOf(valFinDelValorIntermedioMasCercano,valorParaIniciarBusquedaFin);
                if(posFinComilla_ESt!=-1)
                {
                    bnExisteComillaFin=true;
                }
            }
            //  Si existe esta comilla que cierra la primera entra
            if(bnExisteComillaFin)
            {
                //  Coge el valor intermedio
                stEntreComillas_ESt=stDesPrimComil_ESt.substr(0,posFinComilla_ESt+valFinDelValorIntermedioMasCercano.length);
                //  Guarda el contenido dentro de las comillas
                this.arValoresIntermedios[tipoDeValores][this.arValoresIntermedios[tipoDeValores].length]=stEntreComillas_ESt;
                //  Coloca todo lo que existe despues de las comillas que cierran
                if(!bnConEsMasDeUno)
                { stDespsComillas_ESt=stDesPrimComil_ESt.substring(stEntreComillas_ESt.length, stDesPrimComil_ESt.length); }
                else
                { stDespsComillas_ESt=stDesPrimComil_ESt.substring(stEntreComillas_ESt.length, posFinComilla_ESt+valIniDelValorIntermedioMasCercano.length); }
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
};

ei.Comunication = {
    Ajax: {
        defaultJson: {
            method: 'GET',
            path: '/',
            sendInfo: '',
            myFunction: function(jsonInfo) {  },
            myFunctionJsonInfo: {  },
        },
        send: function(jsonInfo,parent)
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
}

ei.Inputs = _EduInt._Inputs;