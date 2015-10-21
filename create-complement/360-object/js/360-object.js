function object360(dataObject360)
{
	boardImage360 = $('#id_board_360').createBoard('imagen360',200,300);

	boardImage360.t('imagen360').setDimensions(200,300).setImageUrl(dataObject360.imageUrl);


	numFramesParaRotar = dataObject360.numFramesParaRotar;
	numRotation = 0;
	numFrames360 = 0;
	contFramesInPosition = 0;
	positionInArObject360 = 0;
	boardImage360.createAnimation(function(){
		if(numFrames360%numFramesParaRotar==0)
		{
			switch(dataObject360.arSecuencia[positionInArObject360])
			{
				case 'left':
					if(contFramesInPosition<dataObject360.arTiempos[positionInArObject360])
					{ numRotation++; boardImage360.t('imagen360').element.style.backgroundPosition=((numRotation*200)+'px 0'); }
					else
					{
						if(positionInArObject360<dataObject360.arSecuencia.length-1)
						{ positionInArObject360++; } else { positionInArObject360=0 }
						contFramesInPosition=0;
					}
					break;
				case 'right':
					if(contFramesInPosition<dataObject360.arTiempos[positionInArObject360])
					{ numRotation--; boardImage360.t('imagen360').element.style.backgroundPosition=((numRotation*200)+'px 0'); }
					else
					{
						if(positionInArObject360<dataObject360.arSecuencia.length-1)
						{ positionInArObject360++; } else { positionInArObject360=0 }
						contFramesInPosition=0;
					}
					break;
				case 'stop':
					if(contFramesInPosition<dataObject360.arTiempos[positionInArObject360])
					{
						
					}
					else
					{
						if(positionInArObject360<dataObject360.arSecuencia.length-1)
						{ positionInArObject360++; } else { positionInArObject360=0 }
						contFramesInPosition=0;
					}
					break;
				default:
			}
			contFramesInPosition++;
		}
		numFrames360++;
	}).startAnimation();
}