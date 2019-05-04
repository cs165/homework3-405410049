// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {
    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement);
	this.hideMenu=this.hideMenu.bind(this);	
	document.addEventListener('menuClick',this.hideMenu);
	this.title=null;
	this.continue_flag=false;
	
    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement);
	this.hideFlashcards=this.hideFlashcards.bind(this);	
	document.addEventListener('endChose',this.hideFlashcards);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);
	this.showMenu=this.showMenu.bind(this);
	this.again=this.again.bind(this);
	var select=document.querySelector('.to-menu');	
	select.addEventListener('click',this.showMenu);
	select=document.querySelector('.continue');
	select.addEventListener('click',this.again);

  }
   hideMenu(event)
	{
		// Uncomment this pair of lines to see the "flashcard" screen:
	 this.title=event.detail.title;
	 this.menu.hide();
     this.flashcards.show(this.title,0,0);

	}
	//end chose 
   hideFlashcards(event)
   {
	 const rightCnt=event.detail.rightCnt;
	 const wrongCnt=event.detail.wrongCnt;
	 this.flashcards.hide();
     this.results.show(rightCnt,wrongCnt);
	 const select=document.querySelector('.continue');
	 if(rightCnt==this.flashcards.decks_len)
	 {
		this.continue_flag=false;
		select.textContent="start over";
	 }
	 else
	 {
		this.continue_flag=true;
		select.textContent="continue";
	 }
   }
   showMenu()
   {
	 this.results.hide();
	 this.menu.show();
	 var select=document.querySelectorAll('.status span')
	 for(let x of select)
		 x.textContent=0;
	 delete this.flashcards;
	 let parent=document.querySelector('#flashcard-container');
	 let child=document.querySelector('.flashcard-box');
	 //在again可能已經remove過一遍
	 if(child!=null)
		parent.removeChild(child);
	 const mainElement = document.querySelector('#main');
	 this.flashcards = new FlashcardScreen(mainElement);
	 this.flashcards.again_flag=false;
	 console.log("new card"+this.flashcards.card);
   }
   //click continue or start over
   again()
   {
	 var flashcard=this.flashcards;
	 var wrongArr=flashcard.wrongArr,card,select;
	 this.results.hide();
	 let parent=document.querySelector('#flashcard-container');
	 let child=document.querySelector('.flashcard-box');
	 if(child!=null)
		parent.removeChild(child);
	 if(this.continue_flag)	//continue
	 {	
	 	this.flashcards.show(this.title);
		flashcard.rightCnt=flashcard.rightCnt;
		flashcard.wrongCnt=0;
		select=document.querySelectorAll('.status span');
		select[0].textContent=flashcard.rightCnt;
		select[1].textContent=flashcard.wrongCnt;
		const flashcardContainer = document.querySelector('#flashcard-container');
		// for(let x of wrongArr)
		if(wrongArr.length!=0)
		{
			flashcard.card = new Flashcard(flashcardContainer,this.title,this.flashcards.rightCnt,this.flashcards.wrongCnt,wrongArr[0]);
			flashcard.again_flag=true;
		}
	 }
	 else	//strat over
	 {
		delete this.flashcards;
		const mainElement = document.querySelector('#main');
		this.flashcards = new FlashcardScreen(mainElement);
		this.flashcards.show(this.title,0,0);
		const select=document.querySelectorAll('.status span')
		for(let x of select)
			x.textContent=0;
	 }
   }
}
