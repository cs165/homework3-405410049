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

    // Uncomment this pair of lines to see the "results" screen:
    // this.menu.hide();
    // this.results.show();
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
	 console.log(this.flashcards.wrongArr);
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
	 parent.removeChild(child);
	 const mainElement = document.querySelector('#main');
	 this.flashcards = new FlashcardScreen(mainElement);
   }
   //click continue or start over
   again()
   {
	 const flashcard=this.flashcards;
	 flashcard.rightCnt=flashcard.rightCnt-1;
	 flashcard.wrongCnt=0;
	 
	 console.log(this.flashcards.rightCnt+","+this.flashcards.wrongCnt);
	 var wrongArr=flashcard.wrongArr,card,select;
	 this.results.hide();
	 	 this.flashcards.show(this.title);
	 let parent=document.querySelector('#flashcard-container');
	 let child=document.querySelector('.flashcard-box');
	 parent.removeChild(child);

	 select=document.querySelectorAll('.status span');
	 select[0].textContent=flashcard.rightCnt;
	 select[1].textContent=flashcard.wrongCnt;
	 const flashcardContainer = document.querySelector('#flashcard-container');
	// for(let x of wrongArr)
	  flashcard.card = new Flashcard(flashcardContainer,this.title,this.flashcards.rightCnt,this.flashcards.wrongCnt,wrongArr[0]);
  
   }
}
