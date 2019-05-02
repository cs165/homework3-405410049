// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
	this.onDragRight=this.onDragRight.bind(this);
	this.onDragLeft=this.onDragLeft.bind(this);
	this.title=null;
	this.card=null;
	this.rightCnt=0;
	this.wrongCnt=0;
	this.cardId=0;
	this.wrongArrIndex=1;
	this.endchose=false;
	this.wrongArr=new Array();
	document.addEventListener('dragRight',this.onDragRight);
	document.addEventListener('dragLeft',this.onDragLeft);
  }
	
  show(title,rightCnt,wrongCnt) {
	this.title=title;
    this.containerElement.classList.remove('inactive');
    const flashcardContainer = document.querySelector('#flashcard-container');
    if(this.card==null)
	{
		this.card = new Flashcard(flashcardContainer,title,rightCnt,wrongCnt,this.cardId);
		this.cardId++;
	}
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
  onDragRight()
  {
	//this.hide();
	//this.card.classList.add('inacitve');
	this.rightCnt++;
	let len=0,i,total=this.wrongCnt+this.rightCnt;
	for(i=0;i<FLASHCARD_DECKS.length;i++)
		if(FLASHCARD_DECKS[i].title==this.title)
			break;
	for(let x in FLASHCARD_DECKS[i].words)
		len++;
	if(total==len)
	{
		const eventInfo={
			rightCnt:this.rightCnt,
			wrongCnt:this.wrongCnt
		};
		document.dispatchEvent(new CustomEvent('endChose',{detail:eventInfo}));	
	}
	let parent=document.querySelector('#flashcard-container');
	let child=document.querySelector('.flashcard-box');
	parent.removeChild(child);
	const flashcardContainer = document.querySelector('#flashcard-container');
	this.card=new Flashcard(flashcardContainer,this.title,this.rightCnt,this.wrongCnt,this.cardId);
	this.cardId++;	
//	this.show(this.title,this.rightCnt,this.wrongCnt);
  }
  onDragLeft(event)
  {
	//this.hide();
	//this.card.classList.add('inacitve');
	this.wrongCnt++;
	let len=0,i,total=this.wrongCnt+this.rightCnt;
	for(i=0;i<FLASHCARD_DECKS.length;i++)
		if(FLASHCARD_DECKS[i].title==this.title)
			break;
	for(let x in FLASHCARD_DECKS[i].words)
		len++;
	if(total==len)
	{
		const eventInfo={
			rightCnt:this.rightCnt,
			wrongCnt:this.wrongCnt
		};
		document.dispatchEvent(new CustomEvent('endChose',{detail:eventInfo}));	
	}
	
	this.wrongArr.push(event.detail.index);
	let parent=document.querySelector('#flashcard-container');
	let child=document.querySelector('.flashcard-box');
	parent.removeChild(child);
	const flashcardContainer = document.querySelector('#flashcard-container');
	this.card=new Flashcard(flashcardContainer,this.title,this.rightCnt,this.wrongCnt,this.cardId);
	this.cardId++;
//	this.show(this.title,this.rightCnt,this.wrongCnt);
  }
}
