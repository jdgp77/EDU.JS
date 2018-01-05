//
//  Slider
//  +----------------------------------------+
//  |  +-----------------+--------+--------+ |
//  |  | Nombre: Bloque  |        |        | |
//  |  +-----------------+--------+--------+ |
//  +----------------------------------------+
//  
//  $('#id_slider').sliderEduIntGD({ numBloques: 1, next: '#id_next', prev: '#id_prev' });

jQuery.fn.sliderRecoverEduIntGD = function()
{
    var bnRecover = false;

    if(this.data('jsonInfo'))
    {
        var jsonInfo = this.data('jsonInfo');
        if(jsonInfo.bnEnable)
        {
            bnRecover=true;
        }
    }
    //  Slider
    //  ======

    if(bnRecover)
    {
        //this.css('overflow','');
        //this.css('position','');
        //this.css('box-sizing','');
        this.removeAttr('style');
        this.removeClass('slider-eduintgd');


        //  Prev y Next
        //  ===========
        
        
        jQuery(jsonInfo.prev).data('enablePrev',false);
        jQuery(jsonInfo.next).data('enableNext',false);


        //  Bloques
        //  =======

        jsonInfo.Bloques.elementsJQuery.removeClass('bloque-eduintgd');
        jsonInfo.Bloques.elementsJQuery.data('jsonInfo','');
        //jsonInfo.Bloques.elementsJQuery.css('box-sizing','');
        //jsonInfo.Bloques.elementsJQuery.css('position','');


        //  Funciones
        //  =========
        //  //jsonInfo.Slider.accAcomodarAlAncho();
        //jsonInfo.Bloques.elementsJQuery.css('width','');
        //jsonInfo.Bloques.elementsJQuery.css('left','');
        jsonInfo.Bloques.elementsJQuery.removeAttr('style');
        //  //jsonInfo.Slider.accAcomodarAlto();
        //jsonInfo.Slider.elementJQuery.css('height','');
        jsonInfo.Slider.elementJQuery.removeAttr('style');

        jsonInfo.bnEnable=false;

        jQuery(window).resize(jsonInfo,function(info){
            jsonInfo = info.data;
            if(jsonInfo.bnEnable)
            {
                jsonInfo.Slider.accAcomodarAlAncho();
            }
        });
    }
}
jQuery.fn.sliderEduIntGD = function(jsonInfo)
{
    var bnCrear=false;

    if(!this.data('jsonInfo'))
    {
        bnCrear=true;
    }
    else
    {
        if(!this.data('jsonInfo').bnEnable)
        {
            bnCrear=true;
        }
    }

    if(bnCrear)
    {
        //  Parametros Globales
        //  ===================
        var jsonInfo = jQuery.extend({
            numBloques: 1,
            responsive: true,
            posActual: 1,
            bnEnable: true,
            bnIsAnimate: false,
            bnHeightAuto: false,
            Slider: {
                element: this.get(0),
                elementJQuery: this,
                width: this.width(),
                numPagina: 1,
                //  Acomasoda el alto del contenedor
                accAcomodarAlto: function(alto){
                    if(alto==undefined)
                    {
                        this.elementJQuery.height(this.jsonInfo.Bloques.getAltoMaximo());
                    }
                    else
                    {
                        this.elementJQuery.height(alto);
                    }
                },
                accAcomodarAlAncho: function(){
                    this.jsonInfo.Bloques.ancho = (this.jsonInfo.Slider.elementJQuery.width())/this.jsonInfo.numBloques;
                    for(var countBloques=0;countBloques<this.jsonInfo.Bloques.num;countBloques++)
                    {
                        var bloqueJQuery = this.jsonInfo.Bloques.arJQuery[countBloques];
                        bloqueJQuery.css('width', this.jsonInfo.Bloques.ancho);
                        bloqueJQuery.css('left', this.jsonInfo.Bloques.ancho*countBloques);
                    }
                },
            },
            Bloques: {
                num: 0,
                ar: [],
                arJQuery: [],
                getNumBloques: function(){
                    return this.ar.length;
                },
                getAltoMaximo: function(){
                    var alturas = jsonInfo.Bloques.elementsJQuery.map(function(){
                        return jQuery(this).outerHeight();
                    }).get();

                    return Math.max.apply(null, alturas);
                },
            },
            setInfoPosActual: function(num){
                var posActual = num;
                var numBloques = this.Bloques.getNumBloques();
                while(posActual<=0)
                { posActual+=numBloques; }
                while(numBloques<posActual)
                { posActual-=numBloques; }

                this.posActual = posActual;
                if(this.bnPaginaNum)
                {
                    this.elementJqueyPaginaNum.html(this.posActual);
                }
                jQuery(this.next).removeClass('eduintgd-toreturn');
                jQuery(this.prev).removeClass('eduintgd-toreturn');
                if(this.posActual==1)
                {
                    jQuery(this.next).addClass('eduintgd-toreturn');
                    if(this.bnFunctionOnLoadFirstPage)
                    {
                        this.functionOnLoadFirstPage(posActual);
                    }
                }
                if(this.posActual==numBloques)
                {
                    jQuery(this.prev).addClass('eduintgd-toreturn');
                    if(this.bnFunctionOnLoadLastPage)
                    {
                        this.functionOnLoadLastPage(posActual);
                    }
                }

                if(this.bnFunctionOnLoadPage)
                {
                    this.functionOnLoadPage(posActual);
                }
                return posActual;
            },
            getPosicionActual: function(){
                return this.posActual;
            },
            //  Añade el ultimo bloque al comienzo
            accAddBlockPrev: function(){
                var bloqueUltimo = this.jsonInfo.Bloques.ar[this.jsonInfo.Bloques.num-1];
                var bloqueUltimoJQuery = this.jsonInfo.Bloques.arJQuery[this.jsonInfo.Bloques.num-1];
                bloqueUltimoJQuery.css('left',this.jsonInfo.Bloques.ancho*(-1));

                //  Pasa por todos los bloques y los reordena
                for(var countBloques=this.jsonInfo.Bloques.num-1;0<countBloques;countBloques--)
                {
                    this.jsonInfo.Bloques.ar[countBloques]=this.jsonInfo.Bloques.ar[countBloques-1];
                    this.jsonInfo.Bloques.arJQuery[countBloques]=this.jsonInfo.Bloques.arJQuery[countBloques-1];
                }

                this.jsonInfo.Bloques.ar[0]=bloqueUltimo;
                this.jsonInfo.Bloques.arJQuery[0]=bloqueUltimoJQuery;
            },
            accAddBlockNext: function(){
                var bloquePrimero = this.jsonInfo.Bloques.ar[0];
                var bloquePrimeroJQuery = this.jsonInfo.Bloques.arJQuery[0];
                bloquePrimeroJQuery.css('left',this.jsonInfo.Bloques.ancho*(this.jsonInfo.Bloques.num-1));

                //  Pasa por todos los bloques y los reordena
                for(var countBloques=0;countBloques<this.jsonInfo.Bloques.num-1;countBloques++)
                {
                    this.jsonInfo.Bloques.ar[countBloques]=this.jsonInfo.Bloques.ar[countBloques+1];
                    this.jsonInfo.Bloques.arJQuery[countBloques]=this.jsonInfo.Bloques.arJQuery[countBloques+1];
                }

                this.jsonInfo.Bloques.ar[this.jsonInfo.Bloques.num-1]=bloquePrimero;
                this.jsonInfo.Bloques.arJQuery[this.jsonInfo.Bloques.num-1]=bloquePrimeroJQuery;
            },
            accMoveLeft: function(functionOnEndAnimation){
                this.jsonInfo.Bloques.numMoveEnd=0;
                this.jsonInfo.functionOnEndAnimation=functionOnEndAnimation;
                //  Pasa por todos los bloques y los reordena
                for(var countBloques=0;countBloques<this.jsonInfo.Bloques.num;countBloques++)
                {
                    var bloque = this.jsonInfo.Bloques.arJQuery[countBloques];
                    bloque.animate({ left: jsonInfo.Bloques.ancho*(countBloques) },300,function(){
                        var jsonInfo = jQuery(this).data('jsonInfo');

                        jsonInfo.Bloques.numMoveEnd++;

                        //  Finalizo el slider
                        if(jsonInfo.Bloques.num==jsonInfo.Bloques.numMoveEnd)
                        {
                            jsonInfo.functionOnEndAnimation();
                        }
                    });
                }
            },
            accMoveRight: function(functionOnEndAnimation){
                this.jsonInfo.Bloques.numMoveEnd=0;
                this.jsonInfo.functionOnEndAnimation=functionOnEndAnimation;
                //  Pasa por todos los bloques y los reordena
                for(var countBloques=0;countBloques<this.jsonInfo.Bloques.num;countBloques++)
                {
                    var bloque = this.jsonInfo.Bloques.arJQuery[countBloques];
                    bloque.animate({ left: jsonInfo.Bloques.ancho*(countBloques-1) },300,function(){
                        var jsonInfo = jQuery(this).data('jsonInfo');
                        jsonInfo.Bloques.numMoveEnd++;

                        //  Finalizo el slider
                        if(jsonInfo.Bloques.num==jsonInfo.Bloques.numMoveEnd)
                        {
                            jsonInfo.functionOnEndAnimation();
                        }
                    });
                }
            },
            accGoPrev: function(){
                if(!this.bnIsAnimate)
                {
                    var bnAnimate=true;
                    if(this.bnQstnCanGoToTheNextLevel)
                    {
                        bnAnimate = this.qstnCanGoToTheNextLevel(this.getPosicionActual());
                    }
                    if(bnAnimate)
                    {
                        this.bnIsAnimate=true;

                        this.accMoveRight(function(){
                            this.accAddBlockNext();

                            var posActual = this.setInfoPosActual(this.getPosicionActual() + 1);

                            this.bnIsAnimate=false;
                        });
                    }
                }
            },
            accGoNext: function(){
                if(!this.bnIsAnimate)
                {
                    var bnAnimate=true;
                    if(this.bnQstnCanGoToTheNextLevel)
                    {
                        bnAnimate = this.qstnCanGoToTheNextLevel(this.getPosicionActual());
                    }

                    if(bnAnimate)
                    {
                        this.bnIsAnimate=true;

                        this.accAddBlockPrev();

                        this.accMoveLeft(function(){
                            var posActual = this.setInfoPosActual(this.getPosicionActual() - 1);

                            this.bnIsAnimate=false;
                        });
                    }
                }
            },
        }, jsonInfo);

        jsonInfo.Slider.jsonInfo=jsonInfo;
        jsonInfo.Bloques.jsonInfo=jsonInfo;
        jsonInfo.jsonInfo=jsonInfo;

        jsonInfo.bnFunctionOnLoadPage=false;
        if(jsonInfo.functionOnLoadPage!==undefined)
        { jsonInfo.bnFunctionOnLoadPage=true; }

        jsonInfo.bnFunctionOnLoadLastPage=false;
        if(jsonInfo.functionOnLoadLastPage!==undefined)
        { jsonInfo.bnFunctionOnLoadLastPage=true; }

        jsonInfo.bnFunctionOnLoadFirstPage=false;
        if(jsonInfo.functionOnLoadFirstPage!==undefined)
        { jsonInfo.bnFunctionOnLoadFirstPage=true; }

        jsonInfo.bnQstnCanGoToTheNextLevel=false;
        if(jsonInfo.qstnCanGoToTheNextLevel!==undefined)
        {
            jsonInfo.bnQstnCanGoToTheNextLevel=true;
        }

        //  Paramentros Slider
        //  =================
        //  Oculta los que no se ven
        this.data('jsonInfo',jsonInfo);
        this.css('overflow','hidden');
        this.css('position','relative');
        this.css('box-sizing','border-box');
        this.addClass('slider-eduintgd');

        jsonInfo.bnPaginaNum=false;
        if(jsonInfo.paginaNum!==undefined)
        {
            jsonInfo.elementJqueyPaginaNum=jQuery(jsonInfo.paginaNum);
            jsonInfo.bnPaginaNum=true;
            jsonInfo.elementJqueyPaginaNum.html(1);
        }
        jsonInfo.bnPaginasNum=false;
        if(jsonInfo.paginasNum!==undefined)
        {
            jsonInfo.elementJqueyPaginasNum=jQuery(jsonInfo.paginasNum);
            jsonInfo.bnPaginasNum=true;
        }

        //  Crea el Contenedor - sin append
        //  ==================   ----------
        //  Lo crea
        //  jsonInfo.Contenedor.elementJQuery = jQuery('<div></div>').addClass('conanedor-eduintgd');

        //  Bloques
        //  =================
        //  Los clona, los remueve, los añade al contenedor, y adjunta el contendor
        //  jsonInfo.childenJQuery = this.children();
        //  this.children().clone().appendTo(jsonInfo.Contenedor.elementJQuery);
        //  this.children().remove();
        //   this.append(jsonInfo.Contenedor.elementJQuery);

        jQuery(jsonInfo.prev).data('jsonInfo',jsonInfo);
        jQuery(jsonInfo.prev).data('enablePrev',true);
        if(!jQuery(jsonInfo.prev).data('bnPrevButton'))
        {
            jQuery(jsonInfo.prev).data('bnPrevButton',true);
            jQuery(jsonInfo.prev).click(function(){
                if(jQuery(this).data('enablePrev'))
                {
                    var jsonInfo = jQuery(this).data('jsonInfo');

                    jsonInfo.accGoPrev();
                }
            });
        }
        jQuery(jsonInfo.next).data('jsonInfo',jsonInfo);
        jQuery(jsonInfo.next).data('enableNext',true);
        if(!jQuery(jsonInfo.prev).data('bnNextButton'))
        {
            jQuery(jsonInfo.prev).data('bnNextButton',true);
            jQuery(jsonInfo.next).click(function(){
                if(jQuery(this).data('enableNext'))
                {
                    var jsonInfo = jQuery(this).data('jsonInfo');

                    jsonInfo.accGoNext();
                }
            });
        }

        //  Las clases
        jsonInfo.Bloques.elementsJQuery = this.children();  // jsonInfo.Contenedor.elementJQuery.children();
        jsonInfo.Bloques.elementsJQuery.addClass('eduintgd-row');
        jsonInfo.Bloques.elementsJQuery.data('jsonInfo',jsonInfo);
        jsonInfo.Bloques.elementsJQuery.css('box-sizing','border-box');
        //  Asigna el ancho al contenedor
        //  jsonInfo.Contenedor.elementJQuery.css('width', jsonInfo.Slider.elementJQuery.width()*(jsonInfo.Bloques.num+1));
            jsonInfo.Bloques.elementsJQuery.each(function(){
                var jsonInfo = jQuery(this).data('jsonInfo');
                jQuery(this).css('position','absolute');
                jQuery(this).addClass('eduintgd-row'+(jsonInfo.Bloques.num+1));

                jsonInfo.Bloques.ar[jsonInfo.Bloques.num]=this;
                jsonInfo.Bloques.arJQuery[jsonInfo.Bloques.num]=jQuery(this);
                jsonInfo.Bloques.num++;
            });

            if(jsonInfo.bnPaginasNum)
            {
                jsonInfo.elementJqueyPaginasNum.html(jsonInfo.Bloques.num);
            }
        //  Funciones
        //  =========
        jsonInfo.Slider.accAcomodarAlAncho();
        jsonInfo.Slider.accAcomodarAlto();

        jQuery(window).resize(jsonInfo,function(info){
            jsonInfo = info.data;
            if(jsonInfo.bnEnable)
            {
                jsonInfo.Slider.accAcomodarAlAncho();
            }
        });

        jsonInfo.setInfoPosActual(1);
    }
}

function crearSlider()
{
    jQuery('selector').sliderEduIntGD({
        responsive: true,
        prev: 'selector_prev',
        prev: 'selector_prev',
        next: 'selector_next',
    });
}





//  Slider
//  +---------------------------------------+
//  |  Contenedor                           |
//  |  +------+------+------+------+------+ |
//  |  | li 1 | li 2 | li 3 | li 4 | li 5 | |
//  |  +------+------+------+------+------+ |
//  +---------------------------------------+
jQuery.fn.sliderHorizontalRemoveEduIntGD = function(jsonInfo)
{
    var bnRecover = false;
    if(this.data('jsonInfo'))
    {
        var jsonInfo = this.data('jsonInfo');
        if(jsonInfo.bnEnable)
        {
            bnRecover=true;
        }
    }
    //  Slider
    //  ======

    if(bnRecover)
    {
        //  Slider
        //  ======
        this.removeAttr('style','');

        //  Contenedor
        //  ==========
        jsonInfo.Contenedor.elementoJQuery.removeAttr('style','');

        jQuery(jsonInfo.prev).data('enablePrev',false);
        jQuery(jsonInfo.next).data('enableNext',false);

        jsonInfo.bnEnable=false;
    }
}
jQuery.fn.sliderHorizontalEduIntGD = function(jsonInfo)
{
    var bnCrear=false;

    if(!this.data('jsonInfo'))
    { bnCrear=true; }
    else
    {
        if(!this.data('jsonInfo').bnEnable)
        { bnCrear=true; }
    }

    if(bnCrear)
    {
        //  Parametros Globales
        //  ===================
        var jsonInfo = jQuery.extend({
            bnEnable: true,
            anchoExtraPorBloque: 4,
            bnSiTieneElAncho: false,
            Slider: {
                elementJQuery: this,
                width: this.outerWidth(),
            },
            Contenedor: {
                elementoJQuery: jQuery(jsonInfo.contain),
                width: jQuery(jsonInfo.contain).outerWidth(),
                left: 0,
            },
            Bloques: {

            },
            Next: {
                elementoJQuery: jQuery(jsonInfo.next),
            },
            Prev: {
                elementoJQuery: jQuery(jsonInfo.prev),
            },
            accGoPrev: function(){
                this.Contenedor.left = this.Contenedor.left + this.pxHorToMove;
                if(0<this.Contenedor.left){ this.Contenedor.left=0; }
                this.Contenedor.elementoJQuery.css('left',this.Contenedor.left);
            },
            accGoNext: function(){
                this.Contenedor.left = this.Contenedor.left - this.pxHorToMove;
                if(this.Contenedor.width<this.Contenedor.left*(-1)+this.Slider.width){ this.Contenedor.left=(this.Contenedor.width-this.Slider.width)*(-1); }
                this.Contenedor.elementoJQuery.css('left',this.Contenedor.left);
            },
            accAcomodar: function(){
                this.Slider.width=jQuery(this.Slider.elementJQuery).outerWidth()
                this.Bloques.elementosJQuery = this.Contenedor.elementoJQuery.children();
                this.Bloques.ancho=0;
                for(var countBloques=0;countBloques<this.Bloques.elementosJQuery.length;countBloques++)
                {
                    var bloque = jQuery(this.Bloques.elementosJQuery[countBloques]);
                    this.Bloques.ancho=this.Bloques.ancho+bloque.outerWidth()+this.anchoExtraPorBloque;
                }
                this.Contenedor.width=this.Bloques.ancho;
                if(this.Slider.width<this.Contenedor.width)
                {
                    this.Contenedor.left=0;
                    this.Contenedor.elementoJQuery.outerWidth(this.Contenedor.width);
                    this.Contenedor.elementoJQuery.css('left',this.Contenedor.left);
                }
                else
                {
                    this.Slider.elementJQuery.sliderHorizontalRemoveEduIntGD();
                }
            },
        }, jsonInfo);

        //  Slider
        //  ======
        this.data('jsonInfo',jsonInfo);
        this.css('overflow','hidden');
        this.css('position','relative');

        //  Contenedor
        //  ==========
        jsonInfo.Contenedor.elementoJQuery.css('position','absolute');
        jsonInfo.Contenedor.elementoJQuery.css('top',0);


        jQuery(jsonInfo.prev).data('jsonInfo',jsonInfo);
        jQuery(jsonInfo.prev).data('enablePrev',true);
        if(!jQuery(jsonInfo.prev).data('bnPrevButton'))
        {
            jQuery(jsonInfo.prev).data('bnPrevButton',true);
            jQuery(jsonInfo.prev).click(function(){
                if(jQuery(this).data('enablePrev'))
                {
                    var jsonInfo = jQuery(this).data('jsonInfo');

                    jsonInfo.accGoPrev();
                }
            });
        }
        jQuery(jsonInfo.next).data('jsonInfo',jsonInfo);
        jQuery(jsonInfo.next).data('enableNext',true);
        if(!jQuery(jsonInfo.prev).data('bnNextButton'))
        {
            jQuery(jsonInfo.prev).data('bnNextButton',true);
            jQuery(jsonInfo.next).click(function(){
                if(jQuery(this).data('enableNext'))
                {
                    var jsonInfo = jQuery(this).data('jsonInfo');

                    jsonInfo.accGoNext();
                }
            });
        }

        jQuery(window).resize(jsonInfo,function(info){
            jsonInfo = info.data;
            if(jsonInfo.bnEnable)
            {
                jsonInfo.accAcomodar();
            }
        });

        jsonInfo.accAcomodar();
    }
}
