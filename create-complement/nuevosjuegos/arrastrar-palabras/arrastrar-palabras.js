var EI_BasicArrastarPalabras = {
    //  Numero de tableros de arrastrar palabras
    numAP: 0,
}
var EI_ArrastarPalabras = function()
{
    this.create=function()
    {
        this.boardArrastrarPalabras = $('#'+this.ei_arrastrar_palabras.id).createBoard('arrastrarpalabras'+(EI_BasicArrastarPalabras.numAP++),400,300);

        this.boardArrastrarPalabras.my.ei_arrastrar_palabras = this.ei_arrastrar_palabras;
        this.boardArrastrarPalabras.start(
            function()
            {
                //  Variables
                //  ---------

                //  Estara por cada black, el objeto que actualmente esta sobre el
                this.my.arInBlack = [];
                this.my.arBnEnInBlack = [];

                var anchoPalabra = 70;
                var altoPalabra = 40;

               //  Crea cada una de las palabras a arrastrar
                //  -----------------------------------------

                var xPosTexto=0;
                var yPosTexto=0;
                for(var contPalabras = 0;contPalabras < this.my.ei_arrastrar_palabras.palabras.length;contPalabras++)
                {
                    var palabra = this.my.ei_arrastrar_palabras.palabras[contPalabras].txt;
                    var ancho_palabra = this.my.ei_arrastrar_palabras.palabras[contPalabras].width;
                    if(ancho_palabra===undefined) { var _ancho_palabra=anchoPalabra; } else { var _ancho_palabra=ancho_palabra; }
                    //  Averigua si se pasa del tablero
                    var anchoTablero = this.getWidth();
                    if((xPosTexto+_ancho_palabra)<anchoTablero)
                    {
                        xPosTexto = xPosTexto + _ancho_palabra;
                    }
                    else
                    {
                        xPosTexto = 0;
                        yPosTexto = yPosTexto + altoPalabra;
                    }
                }

                //  Crea el texto con espacios en blanco
                //  ------------------------------------

                //  Remplazamos los espaciops por objetos que pueda conocer su posición
                var countTextBlacks=0;
                var textoPalabras = ei_arrastrar_palabras.texto;
                while(textoPalabras.indexOf('[!ESPACIO]')!=-1)
                { textoPalabras = textoPalabras.replace('[!ESPACIO]','<div id="id_text_pos_'+(++countTextBlacks)+'" class="c_blacktext" style="width: '+BasicEI.measure(anchoPalabra)+'; height: '+BasicEI.measure(altoPalabra)+'; " ></div>'); }
                this.my.numEspaciosEnBlanco = countTextBlacks;

                //  Coloca el texto con los espacios en blanco
                this.t('ap_texto');
                this.t('ap_texto').setType('text');
                this.t('ap_texto').setText(textoPalabras);
                this.t('ap_texto').setLineHeight(50);
                this.t('ap_texto').setPosInY(yPosTexto+80);
                this.t('ap_texto').setPosition(0,yPosTexto+80);

                // Colocamos objetos en cada una e las posicicones en blanco
                for(var countBlacks = 1;countBlacks <= this.my.numEspaciosEnBlanco; countBlacks++)
                {
                    var blackElement = document.getElementById('id_text_pos_'+countBlacks);
                    this.t('ap_black_texto_'+countBlacks).setType('element','div').addClass('c_blackword').setPosition(this.getPosInXOfAnElment(blackElement),this.getPosInYOfAnElment(blackElement)).setDimensions(anchoPalabra,altoPalabra).setBackgroundColor('transparent');
                }

                //  Crea cada una de las palabras a arrastrar
                //  -----------------------------------------

                var xPosTexto=0;
                var yPosTexto=0;
                var espacioEntrePalabras=10;
                for(var contPalabras = 0;contPalabras < this.my.ei_arrastrar_palabras.palabras.length;contPalabras++)
                {
                    var palabra = this.my.ei_arrastrar_palabras.palabras[contPalabras].txt;
                    var ancho_palabra = this.my.ei_arrastrar_palabras.palabras[contPalabras].width;
                    if(ancho_palabra===undefined) { var _ancho_palabra=anchoPalabra; } else { var _ancho_palabra=ancho_palabra; }
                    this.t('ap_palabras_'+contPalabras).setType('text').setText(palabra).setWidth(_ancho_palabra).setLineHeight(altoPalabra).setHeight(altoPalabra).setTextAlign('center').enDragAndDrop();
                    this.t('ap_palabras_'+contPalabras).addClass('c_palabra_arrastrable');

                    //  Averigua si se pasa del tablero
                    var anchoTablero = this.getWidth();
                    if((xPosTexto+_ancho_palabra)<anchoTablero)
                    {
                        this.t('ap_palabras_'+contPalabras).setPosition(xPosTexto,yPosTexto);
                        this.t('ap_palabras_'+contPalabras).my.posOrgInX = xPosTexto;
                        this.t('ap_palabras_'+contPalabras).my.posOrgInY = yPosTexto;
                        xPosTexto = xPosTexto + _ancho_palabra +espacioEntrePalabras;
                    }
                    else
                    {
                        xPosTexto = 0;
                        yPosTexto = yPosTexto + 40;
                        this.t('ap_palabras_'+contPalabras).setPosInX(xPosTexto);
                        this.t('ap_palabras_'+contPalabras).my.posOrgInX = xPosTexto;
                        this.t('ap_palabras_'+contPalabras).my.posOrgInY = 0;
                    }
                }

            }
        );
        this.boardArrastrarPalabras.createAnimation(function(){
            for(var contPalabras = 0;contPalabras < this.my.ei_arrastrar_palabras.palabras.length;contPalabras++)
            {

                if(this.t('ap_palabras_'+contPalabras).qstnIsCursorDown())
                {
                    this.t('ap_palabras_'+contPalabras).enAboveAll();
                    var bnEnColocarSobreElBlack = false;
                }
                else
                {
                    this.t('ap_palabras_'+contPalabras).enAboveNormal()
                    var bnEnColocarSobreElBlack = true;
                }

                for(var countBlacks = 1;countBlacks <= this.my.numEspaciosEnBlanco; countBlacks++)
                {
                    //  Si se levanta un objeto que antes estaba quieto
                    if(this.t('ap_palabras_'+contPalabras).qstnIsCursorDown())
                    {
                        if(this.my.arInBlack['ap_black_texto_'+countBlacks]=='ap_palabras_'+contPalabras)
                        {
                            this.my.arBnEnInBlack['ap_black_texto_'+countBlacks] = false;
                        }
                    }
                    if(bnEnColocarSobreElBlack)
                    {
                        //  Si esta una palabra sobre un espacio en blanco
                        if(this.t('ap_palabras_'+contPalabras).qstnIsThisThingOver(this.t('ap_black_texto_'+countBlacks)))
                        {
                            //  Si el que esta sobre este espacio en blanco es otro
                            if(this.my.arBnEnInBlack['ap_black_texto_'+countBlacks])
                            {
                                if(this.my.arInBlack['ap_black_texto_'+countBlacks]!='ap_palabras_'+contPalabras)
                                {
                                    var palabraActualEnBlack = this.t(this.my.arInBlack['ap_black_texto_'+countBlacks]);
                                    palabraActualEnBlack.setPosition(palabraActualEnBlack.my.posOrgInX,palabraActualEnBlack.my.posOrgInY);
                                }
                            }

                            this.t('ap_palabras_'+contPalabras).setPosition(this.t('ap_black_texto_'+countBlacks).getPosInX(),this.t('ap_black_texto_'+countBlacks).getPosInY());
                            //  Guarda el thing(palabra) que esta sobre este black
                            this.my.arInBlack['ap_black_texto_'+countBlacks] = 'ap_palabras_'+contPalabras;
                            this.my.arBnEnInBlack['ap_black_texto_'+countBlacks] = true;
                        }
                    }
                }
            }
        }).startAnimation();
    };
    this.init=function(ei_arrastrar_palabras)
    {
        this.ei_arrastrar_palabras = ei_arrastrar_palabras;
        this.create();
    };
}

var ei_arrastrar_palabras = {
    id: 'id_board_arrastrar_texto',
    palabras: [
        {
            txt: 'rojo',
            //width: 70
        },
        {
            txt: 'carro',
            //width: 70,
        },
        {
            txt: 'bonita',
            //width: 70,
        },
    ],
    texto: 'La moto esta al lado de un [!ESPACIO] de color [!ESPACIO], es muy [!ESPACIO].',
};

$(document).ready(function() {
    var miArrastarPalabras = new EI_ArrastarPalabras();
    miArrastarPalabras.init(ei_arrastrar_palabras);
});
