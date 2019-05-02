// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
  }

  show(numberCorrect, numberWrong) {
    this.containerElement.classList.remove('inactive');
	var select=this.containerElement.querySelector('#results .correct');
	select.textContent=numberCorrect;
	select=this.containerElement.querySelector('#results .incorrect');
	select.textContent=numberWrong;
	const percent=Math.round(numberCorrect/(numberCorrect+numberWrong)*100);
	select=this.containerElement.querySelector('#results .percent');
	select.textContent=percent;
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
