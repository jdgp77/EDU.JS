var IDE_Game = {
    words: {
        notIncluded: [
            { ini: '/*', end: '*/' },
        ],
        quotes: [
            { ini: '"', end: '"' },
            { ini: "'", end: "'" },
        ],
        dividersWords: [' ','(',')','[',']','+','-','/',';','.','\r','\n',',','=','<','>',':'],
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
            },{
                word: 'inSeconds',
                title: 'Cambia el movimiento a un tiempo especifico',
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
                this.titleInput = new EduInt.Input.Input({ name: 'title', className: 'c_eicreategame_title', value: this.info.title.value });
                this.elemTitle.appendChild(this.titleInput.element);

            //  Descrición
            //  ==========
            this.elemDescription = document.getElementById(this.info.description.id);
                this.descriptionInput = new EduInt.Input.Input({ name: 'description', className: 'c_eicreategame_description', value: this.info.description.value });
                this.elemDescription.appendChild(this.descriptionInput.element);

            //  Caracteristicas
            //  ===============
            this.elemCaracteristics = document.getElementById(this.info.characteristics.id);
                this.elemCaracteristicsWidth = document.getElementById(this.info.characteristics.width.id);
                this.caracteristicsWidthInput = new EduInt.Input.Input({ name: 'width', className: 'c_eicreategame_width', value: this.info.characteristics.width.value });
                this.elemCaracteristicsWidth.appendChild(this.caracteristicsWidthInput.element);
                this.elemCaracteristicsHeight = document.getElementById(this.info.characteristics.height.id);
                this.caracteristicsHeightInput = new EduInt.Input.Input({ name: 'height', className: 'c_eicreategame_height', value: this.info.characteristics.height.value });
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
                this.startInput = new EduInt.Input.InputCode(inputOptions,IDE_Game.words);
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
                this.animationInput = new EduInt.Input.InputCode(inputOptions,IDE_Game.words);
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
