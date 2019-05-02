// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement,title,rightCnt,wrongCnt,cardId) {
    this.containerElement = containerElement;
	this.title=title;
	this.cardId=cardId;
	this.dragStart=false;
	this.originX=null;
	this.originY=null;
	this.rightCnt=rightCnt;
	this.wrongCnt=wrongCnt;
	this.deltaX=0;
	this.offsetX=0;
	this.offsetY=0;

    this._flipCard = this._flipCard.bind(this);
	this.onDragStart=this.onDragStart.bind(this);
    this.onDragMove=this.onDragMove.bind(this);
	this.onDragEnd=this.onDragEnd.bind(this);
	this._createFlashcardDOM=this._createFlashcardDOM.bind(this);
	
	this.flashcardElement = this._createFlashcardDOM();
    this.containerElement.append(this.flashcardElement);

    this.flashcardElement.addEventListener('pointerup', this._flipCard);
	
	this.flashcardElement.addEventListener('pointerdown', this.onDragStart);
	this.flashcardElement.addEventListener('pointermove', this.onDragMove);
	this.flashcardElement.addEventListener('pointerup', this.onDragEnd);
  }
  onDragStart(event)
  {
	this.originX = event.clientX;
	this.originY=event.clientY;
	this.dragStart = true;
	event.currentTarget.setPointerCapture(event.pointerId);
  }
  onDragMove(event)
  {
	if (!this.dragStart){
		return;
	}	
	event.preventDefault();
	const currentX=event.clientX;
	const currentY=event.clientY;
	this.deltaX=currentX-this.originX;
	const deltaY=currentY-this.originY;
	const translateX = this.offsetX + this.deltaX;
	const translateY = this.offsetY + deltaY;
	//console.log('transform:translate(' + this.delta + 'px,'+deltaY+'px) rotate('+this.delta*0.2+'deg);transform-origin:center');
	//this.containerElement.style.cssText ='transform:translate(' + this.deltaX + 'px,+'+deltaY+'px) rotate('+this.deltaX*0.2+'deg);transform-origin:center'; 
	event.currentTarget.style.transform= 'translate(' + 
    translateX + 'px, ' + translateY + 'px) rotate('+translateX*0.2+'deg)';
	
	const select=document.querySelector('body');
	if(this.deltaX>150||this.deltaX<-150)
		select.style.backgroundColor='#97b7b7';
	else
		select.style.backgroundColor='#d0e6df';
  }
 onDragEnd()
 {
	this.dragStart=false;
	this.offsetX += event.clientX - this.originX;
	this.offsetY += event.clientY - this.originY;
	var select=document.querySelector('body');
	select.style.backgroundColor='#d0e6df';	
	if(this.deltaX>150)
	{
		document.dispatchEvent(new CustomEvent('dragRight'));
		select=document.querySelector('.status .correct');
		//this.rightCnt++;
		select.textContent=this.rightCnt+1;
		this.flashcardElement.style='';
	}
	if(this.deltaX<-150)
	{
		console.log("cardid"+this.cardId);
		const eventInfo={
			index:this.cardId	
		};
		document.dispatchEvent(new CustomEvent('dragLeft',{detail:eventInfo}));
		select=document.querySelector('.status .incorrect');
		//this.wrongCnt++;
		select.textContent=this.wrongCnt+1;
		this.flashcardElement.style='';
	}
	else
	{	
		//this.containerElement.style.transformDelay="2s";
		//this.containerElement.style.transform='';
		//this.containerElement.classList.add('release_middle');
		this.flashcardElement.style.cssText="transition-duration:0.6s";
	}
 }
  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  _createFlashcardDOM() {
	//chose the correct title	
	var i,wordArr=new Array(),defArr=new Array(),j=0;;
	for(i=0;i<FLASHCARD_DECKS.length;i++)
		if(FLASHCARD_DECKS[i].title==this.title)
			break;
	for(let x in FLASHCARD_DECKS[i].words)
		wordArr[j++]=x;
	j=0;
	console.log("i:"+i);
    for(let x in FLASHCARD_DECKS[i].words)
		defArr[j++]=FLASHCARD_DECKS[i].words[x];
/*
	let total=this.wrongCnt+this.rightCnt-2;
	if(total==wordArr.length)
	{
		const eventInfo={
			rightCnt:this.rightCnt,
			wrongCnt:this.wrongCnt
		};
		document.dispatchEvent(new CustomEvent('endChose',{detail:eventInfo}));	
	}
	*/
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');
	
	const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    //wordSide.textContent = frontText;
    wordSide.textContent=wordArr[this.cardId];

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
   // definitionSide.textContent= backText;
    definitionSide.textContent=defArr[this.cardId];

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  _flipCard(event) {
    this.flashcardElement.classList.toggle('show-word');
  }
}
