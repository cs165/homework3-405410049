// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {

  constructor(containerElement) {
    this.containerElement = containerElement;
	var select=containerElement.querySelector('#choices');
	for(let i=0;i<FLASHCARD_DECKS.length;i++)
	{
		let	node=document.createElement("div");
		let text=document.createTextNode(FLASHCARD_DECKS[i].title);
		node.appendChild(text);
		select.appendChild(node);
	}	
	select=document.querySelectorAll('#choices div');
		for(let i=0;i<FLASHCARD_DECKS.length;i++)
			select[i].addEventListener('click',this.onClick);
  }
   	onClick()
	{		
		const eventInfo = {
		title:this.textContent
		};
		console.log('menu click '+this.textContent);
		document.dispatchEvent(new CustomEvent('menuClick',{detail:eventInfo}));
	}
	show() {
		this.containerElement.classList.remove('inactive');
	}

	hide() {
		this.containerElement.classList.add('inactive');
	}
}
