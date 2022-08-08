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
    clearInput();
    return;
  }
  //// here we go
  const curLang = refs.language.value;
  const outputValue = `${valueToNumber}: ${langLib[curLang].ordinal[valueToNumber]}`;
  print(outputValue);
  clearInput();
}

// // // // // // // // // // // // // // // // en

// one hundred twenty fourth


// ones
// tens
// hundreds

// // // // // // // // // // // // // // // // uk
// порядковий числівник

// https://github.com/idapgroup/Guidelines/blob/master/Internship/iOS/2021-KR/Task.md
// https://en.wiktionary.org/wiki/%D0%BF%27%D1%8F%D1%82%D0%B8%D0%B9#Ukrainian
// https://en.wiktionary.org/wiki/%D0%BF%27%D1%8F%D1%82%D0%B4%D0%B5%D1%81%D1%8F%D1%82%D0%B8%D0%B9#Ukrainian
// https://en.wiktionary.org/wiki/%D0%BF%27%D1%8F%D1%82%D0%B8%D1%81%D0%BE%D1%82%D0%B8%D0%B9#Ukrainian
// https://en.wiktionary.org/wiki/%D1%82%D1%80%D1%8C%D0%BE%D1%85%D1%81%D0%BE%D1%82%D0%B8%D0%B9#Ukrainian
// https://en.wiktionary.org/wiki/%D0%BF%27%D1%8F%D1%82%D0%B8%D1%81%D0%BE%D1%82%D0%B8%D0%B9#Ukrainian

// https://uk.wiktionary.org/wiki/%D1%88%D1%96%D1%81%D1%82%D0%B4%D0%B5%D1%81%D1%8F%D1%82%D0%B8%D0%B9
// https://en.wiktionary.org/wiki/%D1%88%D0%B5%D1%81%D1%82%D0%B8%D1%81%D0%BE%D1%82%D0%B8%D0%B9#Ukrainian
// https://en.wiktionary.org/wiki/%D1%82%D0%B8%D1%81%D1%8F%D1%87%D0%BD%D0%B8%D0%B9#Ukrainian

// https://webpen.com.ua/pages/Morphology_and_spelling/numerals_compound_words.html
// https://webpen.com.ua/pages/Morphology_and_spelling/numerals_declination.html

// // // // // // // // // // // // // // // // de
// fünfte