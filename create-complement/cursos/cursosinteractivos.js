$(document).ready(function() {
    selectCursos({
        achoTablero: 1100,
        velocidadMaxima: 6,
        espacioDeActivacionEnLados: 100,
        anchoImagenes: 300,
        altoImagenes: 410,
        anchoYAltoExtraImagenesOnHover: 10,
        distranciaEntreImagenes: 20,
        arImagesViews: [
            {
                url: 'create-complement/select-images/images/foto1-mini.jpg',
                js: function() { alert('casa1'); },
            },{
                url: 'create-complement/select-images/images/foto2-mini.jpg',
                js: function() { alert('casa1'); },
            },{
                url: 'create-complement/select-images/images/foto1-mini.jpg',
                js: function() { alert('casa1'); },
            },{
                url: 'create-complement/select-images/images/foto2-mini.jpg',
                js: function() { alert('casa1'); },
            },{
                url: 'create-complement/select-images/images/foto1-mini.jpg',
                js: function() { alert('casa1'); },
            },{
                url: 'create-complement/select-images/images/foto2-mini.jpg',
                js: function() { alert('casa1'); },
            },{
                url: 'create-complement/select-images/images/foto2-mini.jpg',
                js: function() { alert('casa1'); },
            },{
                url: 'create-complement/select-images/images/foto1-mini.jpg',
                js: function() { alert('casa1'); },
            },{
                url: 'create-complement/select-images/images/foto2-mini.jpg',
                js: function() { alert('casa1'); },
            },{
                url: 'create-complement/select-images/images/foto1-mini.jpg',
                js: function() { alert('casa1'); },
            },{
                url: 'create-complement/select-images/images/foto2-mini.jpg',
                js: function() { alert('casa1'); },
            }
        ],
    });

    object360({
        arSecuencia: ['left','stop','right','stop'],
        arTiempos: [20,225,15,225],
        numFramesParaRotar: 2,
        imageUrl: 'create-complement/360-object/images/img360.png',
    });

    var standOutCharacteristics = {
        color: {
            red: 116,
            blue: 205,
            green: 255,
        },
        radius_px: 40,
        alpha: {
            min: 0,
            max: 30,
        },
        onHover: 'disappear',
    }
    var standOutPosition = {
        top: 20,
        left: 20,
    }

    ei_standOut.create(standOutPosition,standOutCharacteristics);
});

function selectCursos(selectViews)
{
    var boardCursos = EduInt.createBoardIn(document.getElementById('id_cursosinteractivos'),'Cursos Interactivos',selectViews.achoTablero,430);
    boardCursos.t('imagen360').getElement().style.backgroundColor='transparent';
/*
    boardUno.createScene(function(){
        ei.objName('auto').setPos(0,50).itIs('basicflaticon__carro');
    }).createAnimation(function(){
        ei.objName('auto').accMoverEnX(.5);
    }).start();
*/

    //  Pasa por todas la simagenes
    var distranciaEntreImagenes = 100;
    anchoDeTodasLasImagenes = (selectViews.arImagesViews.length*selectViews.anchoImagenes) + ((selectViews.arImagesViews.length-1)*selectViews.distranciaEntreImagenes);
    posicionPrimeraImagen = parseInt((selectViews.achoTablero - anchoDeTodasLasImagenes));
    if(posicionPrimeraImagen<0)
    { posicionPrimeraImagen = parseInt(selectViews.distranciaEntreImagenes); }

    for(var contImagesViews=0;contImagesViews<selectViews.arImagesViews.length;contImagesViews++)
    {
        var thingImage = boardCursos.t('Imagen'+contImagesViews,posicionPrimeraImagen+(contImagesViews*selectViews.anchoImagenes)+((contImagesViews)*selectViews.distranciaEntreImagenes),20,selectViews.anchoImagenes,selectViews.altoImagenes);
        thingImage.numImage_ = contImagesViews;
        thingImage.setEvOnClick(function() {
            selectViews.arImagesViews[this.numImage_].js();
        });
        thingImage.setImageUrl(selectViews.arImagesViews[thingImage.numImage_].url);
        thingImage.setClass('c_select_image');

    }

    //  Movimiento en X de las imagenes
    movimientoEnXDeLasImagenes = 0;
    //  Movimiento maximo en X
    movimientoMaximosEnXDeLasImagenes = -(anchoDeTodasLasImagenes-selectViews.achoTablero+parseInt(selectViews.distranciaEntreImagenes));

    //  Arreglo con lo agrandado de las imagenes
    arAgrandadoImagenes = new Array();

    boardCursos.createAnimation(function(){
        //  Movimiento de las imagenes en en esta animacion X
        movDeImagenesEnX = 0;
        //  Pasa por cada una de las imagenes
        for(var contImagesViews=0;contImagesViews<selectViews.arImagesViews.length;contImagesViews++)
        {
            var nombreImagen = 'Imagen'+contImagesViews;
            //  boardCursos.t(nombreImagenes).accMoveInX(0.5);
            if(arAgrandadoImagenes[nombreImagen] === undefined) { arAgrandadoImagenes[nombreImagen]=0; }

            if(boardCursos.qstnIsMouseHover() || 0 < selectImageNumberFramesToMoveLeft || 0 < selectImageNumberFramesToMoveRight)
            {
                var boardCursosMousePosInX = boardCursos.getMousePosInX();
                if(boardCursosMousePosInX < selectViews.espacioDeActivacionEnLados || 0 < selectImageNumberFramesToMoveLeft)
                {
                    //  Si puede moverse mas a la izquierda
                    if(movimientoEnXDeLasImagenes < 0)
                    {
                        var velocidadEnX = parseInt(selectViews.velocidadMaxima*boardCursosMousePosInX/100)-selectViews.velocidadMaxima;
                        var movDeImagenesEnX = -(velocidadEnX);
                        if(0 < (movimientoEnXDeLasImagenes + movDeImagenesEnX)) { movDeImagenesEnX = 0 - movimientoEnXDeLasImagenes; }
                        boardCursos.t(nombreImagen).accMoveInX(movDeImagenesEnX);
                    }
                }
                else if(selectViews.achoTablero - selectViews.espacioDeActivacionEnLados < boardCursosMousePosInX || 0 < selectImageNumberFramesToMoveRight)
                {
                    //  Si puede moverse mas a la derecha
                    if(movimientoMaximosEnXDeLasImagenes < movimientoEnXDeLasImagenes)
                    {
                        var velocidadEnX = parseInt(selectViews.velocidadMaxima*(boardCursosMousePosInX-400)/100);
                        var movDeImagenesEnX = -(velocidadEnX);
                        if((movimientoEnXDeLasImagenes + movDeImagenesEnX) < movimientoMaximosEnXDeLasImagenes) { movDeImagenesEnX = movimientoMaximosEnXDeLasImagenes - movimientoEnXDeLasImagenes; }
                        boardCursos.t(nombreImagen).accMoveInX(movDeImagenesEnX);
                    }
                }
            }

            //  Si el mouse esta encima de este
            if(boardCursos.t(nombreImagen).qstnMouseOver())
            {
                if(arAgrandadoImagenes[nombreImagen] <= selectViews.anchoYAltoExtraImagenesOnHover)
                {
                    arAgrandadoImagenes[nombreImagen] = arAgrandadoImagenes[nombreImagen]+2;
                    boardCursos.t(nombreImagen).accChangeWidth(selectViews.anchoImagenes + arAgrandadoImagenes[nombreImagen]);
                    boardCursos.t(nombreImagen).accChangeHeight(selectViews.altoImagenes + arAgrandadoImagenes[nombreImagen]);
                    boardCursos.t(nombreImagen).accMoveInX(-1);
                    boardCursos.t(nombreImagen).accMoveInY(-1);
                }
            }
            else if(0 < arAgrandadoImagenes[nombreImagen])
            {
                arAgrandadoImagenes[nombreImagen] = arAgrandadoImagenes[nombreImagen]-2;
                boardCursos.t(nombreImagen).accChangeWidth(selectViews.anchoImagenes + arAgrandadoImagenes[nombreImagen]);
                boardCursos.t(nombreImagen).accChangeHeight(selectViews.altoImagenes + arAgrandadoImagenes[nombreImagen]);
                boardCursos.t(nombreImagen).accMoveInX(1);
                boardCursos.t(nombreImagen).accMoveInY(1);
            }

        }
        movimientoEnXDeLasImagenes = movimientoEnXDeLasImagenes+movDeImagenesEnX;
        if(0<selectImageNumberFramesToMoveLeft) { selectImageNumberFramesToMoveLeft--; }
        if(0<selectImageNumberFramesToMoveRight) { selectImageNumberFramesToMoveRight--; }
    }).startAnimation();
}

var selectImageNumberFramesToMoveLeft = 0;
function moveLeft()
{
    selectImageNumberFramesToMoveLeft = 25;
}var selectImageNumberFramesToMoveRight = 0;
function moveRight()
{
    selectImageNumberFramesToMoveRight = 25;
}
