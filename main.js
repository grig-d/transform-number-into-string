import refs from './js/refs.js';
import placeholderNames from './js/placeholderNames.js';
import langLib from './js/languageLibrary.js';

refs.language.addEventListener('change', changePlaceholder);
refs.userInput.addEventListener('keypress', inputCharFilter);
refs.enterBtn.addEventListener('click', transformNumber);
window.addEventListener('keypress', pressEnter);

function changePlaceholder() {
  refs.userInput.placeholder = placeholderNames[refs.language.value];
}

function inputCharFilter(event) {
  if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;
}

function pressEnter(event) {
  if (event.code === 'Enter') {
    transformNumber();
  }
}

function print(value) {
  refs.output.textContent = value;
}

function clearInput() {
  refs.userInput.value = '';
}

function transformNumber() {
  const valueToNumber = Number(refs.userInput.value);
  if (valueToNumber === 0) {
    print('');
    return;
  }
  //// here we go
  const curLang = refs.language.value;
  const outputValue = `${valueToNumber}: ${langLib[curLang].ordinal[valueToNumber]}`;
  print(outputValue);
  clearInput();
}

// // // // // // // // // // // // // // // //
