var sopadeletras = {
    id: 'id_board_sopadeletras',
    matriz: [
        [['A'],['V'],['N'],['E'],['D'],['D'],['N'],['R'],['A'],['I'],['Z'],['M'],['N']],
        [['C'],['E'],['N'],['U'],['S'],['L'],['T'],['Y'],['C'],['O'],['E'],['A'],['O']],
        [['C'],['A'],['R'],['A'],['C'],['O'],['L'],['N'],['H'],['N'],['U'],['U'],['I']],
        [['D'],['R'],['A'],['R'],['A'],['C'],['L'],['M'],['T'],['U'],['A'],['R'],['N']],
        [['T'],['B'],['T'],['I'],['O'],['A'],['E'],['E'],['O'],['P'],['T'],['U'],['N']],
        [['U'],['O'],['L'],['E'],['D'],['A'],['P'],['O'],['S'],['Y'],['A'],['C'],['E']],
        [['C'],['L'],['E'],['N'],['T'],['O'],['O'],['O'],['I'],['N'],['R'],['I'],['E']],
        [['A'],['A'],['N'],['H'],['A'],['C'],['U'],['F'],['T'],['A'],['O'],['O'],['F']],
        [['C'],['T'],['A'],['T'],['L'],['N'],['T'],['E'],['R'],['R'],['A'],['I'],['T']],
        [['I'],['A'],['G'],['M'],['O'],['E'],['O'],['L'],['O'],['S'],['S'],['Ñ'],['E']],
        [['O'],['O'],['N'],['L'],['D'],['E'],['R'],['E'],['R'],['E'],['E'],['O'],['T']],
        [['N'],['E'],['F'],['5'],['S'],['O'],['R'],['A'],['R'],['O'],['Ñ'],['I'],['C']],
        [['I'],['E'],['D'],['U'],['C'],['A'],['C'],['I'],['O'],['N'],['A'],['R'],['I']],
    ],
    id_palabras: 'id_board_sopadeletras_palabras',
    palabras: [
        'EDUCACION',
        'HTML5',
        'CARACOL',
        'LENTO'
    ]
}

stAppSopaDeLetras = {
    clickOnThing: function(thing)
    {
        if(thing.Board.my.clickEnX===undefined) { thing.Board.my.clickEnX=thing.getPosInX(); }
        if(thing.Board.my.clickEnY===undefined) { thing.Board.my.clickEnY=thing.getPosInY(); }

        if(this.qstnItsNear(thing))
        {
            if(this.qstnItsLineal(thing))
            {
                this.select(thing);
            }
            else
            {
                this.unSelectAll(thing.Board);
                this.select(thing);
            }
        }
        else
        {
            this.unSelectAll(thing.Board);
            this.select(thing);
        }

        if(this.compareWithWords(thing.Board))
        {
            var palabraSeleccionada = this.returnWordSelected(thing.Board);
            var divWord = this.getElementByWord(thing.Board,palabraSeleccionada);
            divWord.className= 'c_sopadeletras_palabra_ok'
            this.unSelectAll(thing.Board,true);
        }
    },
    switchSelection: function(thing)
    {
        if(!thing.my.bnSeleccionado)
        { this.select(); }
        else
        { this.unselect(); }
    },
    select: function(thing)
    {
        thing.addClass('c_selected');
        thing.my.bnSeleccionado=true;
        thing.Board.my.arSelected[thing.Board.my.arSelected.length]=thing;
        thing.Board.my.arInXSelected[thing.Board.my.numSelected]=thing.my.sopadeletrasPosInX;
        thing.Board.my.arInYSelected[thing.Board.my.numSelected]=thing.my.sopadeletrasPosInY;
        thing.Board.my.arLetters[thing.Board.my.numSelected]=thing.getValue();
        thing.Board.my.numSelected++;
    },
    unselect: function(thing,bnIsWordSelected)
    {
        if(bnIsWordSelected==undefined) { bnIsWordSelected=false; }

        thing.rmClass('c_selected'); thing.my.bnSeleccionado=false;

        if(bnIsWordSelected)
        { thing.addClass('c_wordfind'); }
    },
    qstnItsLineal: function(thing)
    {
        if(thing.Board.my.numSelected==0)
        { return true; }
        else if(thing.Board.my.numSelected==1)
        {
            if(
                (thing.Board.my.arInXSelected[0]==thing.my.sopadeletrasPosInX)
                ||
                (thing.Board.my.arInYSelected[0]==thing.my.sopadeletrasPosInY)
            )
            { return true; }
            else
            { return false; }
        }
        else if(1<thing.Board.my.numSelected)
        {
            if(thing.Board.my.arInXSelected[0]==thing.Board.my.arInXSelected[1])
            { thing.Board.my.bnDireccionEnX = true; }
            else
            { thing.Board.my.bnDireccionEnX = false; }

            if(thing.Board.my.arInYSelected[0]==thing.Board.my.arInYSelected[1])
            { thing.Board.my.bnDireccionEnY = true; }
            else
            { thing.Board.my.bnDireccionEnY = false; }
        }

        if(thing.Board.my.bnDireccionEnX)
        {
            if(thing.Board.my.arInXSelected[0]==thing.my.sopadeletrasPosInX)
            { return true; }
            else
            { return false; }
        }
        else if(thing.Board.my.bnDireccionEnY)
        {
            if(thing.Board.my.arInYSelected[0]==thing.my.sopadeletrasPosInY)
            { return true; }
            else
            { return false; }
        }
        else
        {
            return false;
        }
    },
    qstnItsNear: function(thing)
    {
        //  Si no existe alguno antes retorna true
        if(thing.Board.my.numSelected == 0)
        { return true; }
        else
        {
            if(
                (
                    1==Math.abs(thing.my.sopadeletrasPosInX-thing.Board.my.arInXSelected[thing.Board.my.numSelected-1])
                    &&
                    0==Math.abs(thing.my.sopadeletrasPosInY-thing.Board.my.arInYSelected[thing.Board.my.numSelected-1])
                )
                ||
                (
                    0==Math.abs(thing.my.sopadeletrasPosInX-thing.Board.my.arInXSelected[thing.Board.my.numSelected-1])
                    &&
                    1==Math.abs(thing.my.sopadeletrasPosInY-thing.Board.my.arInYSelected[thing.Board.my.numSelected-1])
                )
            )
            { return true; }
            else
            { return false; }
        }
    },
    unSelectAll: function(board,bnIsWordSelected)
    {
        if(bnIsWordSelected==undefined) { bnIsWordSelected=false; }

        for(var countThingSelected=0;countThingSelected<board.my.arSelected.length;countThingSelected++)
        {
            this.unselect(board.my.arSelected[countThingSelected],bnIsWordSelected);
        }
        board.my.arSelected=[];
        board.my.numSelected=0;
    },
    returnWordSelected: function(board)
    {
        return this.compareWithWords(board,false);
    },
    compareWithWords: function(board,bnRetornarBoleano)
    {
        if(bnRetornarBoleano===undefined) { bnRetornarBoleano=true; }
        for(var countWords=0;countWords<board.my.sopadeletras.palabras.length;countWords++)
        {
            var palabra=board.my.sopadeletras.palabras[countWords];
            if(board.my.numSelected==palabra.length)
            {
                var numIgual = 1;
                var numIgualReves = 1;
                for(var countLettersOfWord=0;countLettersOfWord<palabra.length;countLettersOfWord++)
                {
                    if(board.my.arLetters[countLettersOfWord]==palabra[countLettersOfWord])
                    { numIgual=numIgual*1; }
                    else
                    { numIgual=numIgual*0; }

                    if(board.my.arLetters[palabra.length-1-countLettersOfWord]==palabra[countLettersOfWord])
                    { numIgualReves=numIgualReves*1; }
                    else
                    { numIgualReves=numIgualReves*0; }
                }
                if(numIgual==1 || numIgualReves==1)
                { var bnSonIguales=true; }
                else
                { var bnSonIguales=false; }

                if(bnSonIguales)
                {
                    if(bnRetornarBoleano) { return true; } else { return palabra; }
                }
            }
        }
        return false;
    },
    getElementByWord: function(board,palabra)
    {
        return board.my.arElemPalabras[palabra];
    }
};
AppSopaDeLetras = function()
{
    this.create = function(sopadeletras)
    {
        this.sopadeletras = sopadeletras;
        this.matriz = this.sopadeletras.matriz;

        //  Cargamos el lugad donde colocaremos las palabras
        this.elemPalabras = document.getElementById(this.sopadeletras.id_palabras);
        //  Arrego de elementos con la llave de la misma palbra
        this.arElemPalabras=[];
        //  Pasamos por cada una de las palabras
        for(var countPalabras=0;countPalabras<this.sopadeletras.palabras.length;countPalabras++)
        {
            //  Cargamos la palabra
            var palabra = this.sopadeletras.palabras[countPalabras];
            //  Creaos el div que lo contendra
            var divPalabra=document.createElement('div');
            divPalabra.className='c_sopadeletras_palabra';
            divPalabra.innerHTML=palabra;
            //  Aasignamos el elemento a un arreglo
            this.arElemPalabras[palabra]=divPalabra;
            //  Lo colocamos en el elemento con las palabras
            this.elemPalabras.appendChild(divPalabra);
        }


        this.board = $('#'+this.sopadeletras.id).createBoard(this.sopadeletras.id,400,400);
        this.board.my.sopadeletras = this.sopadeletras;
        this.board.my.arElemPalabras = this.arElemPalabras;
        this.board.my.arSelected = [];
        this.board.my.sopadeletras=this.sopadeletras;
        this.board.my.matriz=this.matriz;
        this.board.my.dirEnXoEnYSelected;
        this.board.my.arInXSelected=[];
        this.board.my.arInYSelected=[];
        this.board.my.arLetters=[];
        this.board.my.numSelected=0;
        this.board.my.clickEnX;
        this.board.my.clickEnY;
        this.board.start(function(){
            for(var countInY=0;countInY<this.my.matriz.length;countInY++)
            {
                for(var countInX=0;countInX<this.my.matriz[countInY].length;countInX++)
                {
                    var letra = this.my.matriz[countInY][countInX];
                    if(letra=='.') { var letra=''; }

                    this.t('cuadro_'+countInX+'_'+countInY).setType('text').setText(letra);
                    this.t('cuadro_'+countInX+'_'+countInY).setTextAlign('center').setLineHeight(29);
                    this.t('cuadro_'+countInX+'_'+countInY).setPosition(countInX*30,countInY*30).setDimensions(29,29);
                    this.t('cuadro_'+countInX+'_'+countInY).addClass('c_sopadeletras_letra');
                    this.t('cuadro_'+countInX+'_'+countInY).my.sopadeletrasPosInX=countInX;
                    this.t('cuadro_'+countInX+'_'+countInY).my.sopadeletrasPosInY=countInY;

                    this.t('cuadro_'+countInX+'_'+countInY).my.bnSeleccionado=false;
                    this.t('cuadro_'+countInX+'_'+countInY).setEvOnClick(function(){
                        stAppSopaDeLetras.clickOnThing(this);
                    });
                }
            }
        });
        this.board.createAnimation(function(){

        });//.startAnimation();
    }
}

$(document).ready(function() {
    var appSopaDeLetras1 = new AppSopaDeLetras();
    appSopaDeLetras1.create(sopadeletras);
});


