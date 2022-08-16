import refs from './js/refs.js';
import placeholderNames from './js/placeholderNames.js';
import library from './js/library.js';

// add event listeners
refs.language.addEventListener('change', changePlaceholder);
refs.userInput.addEventListener('keypress', inputCharFilter);
refs.enterBtn.addEventListener('click', manager);
window.addEventListener('keypress', pressEnter);

// ordinal array index value in vocabulary object
// cardinal array index value in vocabulary object
const ordInd = 0;
const carInd = 1;

// placeholder name depending on the language
function changePlaceholder() {
  refs.userInput.placeholder = placeholderNames[refs.language.value];
}

// only digits on input
function inputCharFilter(event) {
  if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;
}

// 'Enter' by pressing keyboard
function pressEnter(event) {
  if (event.code === 'Enter') {
    manager();
  }
}

// result output in form
function print(input, result) {
  refs.outputNumber.textContent = `${input}:`;
  refs.outputResult.textContent = result;
}

// clear form input
function clearInput() {
  refs.userInput.value = '';
}

// find ordinal number
function findOrdinalNumber(number) {
  let base = 100;
  let ordinal = number % base;
  while (ordinal === 0) {
    base *= 10;
    ordinal = number % base;
  }
  return ordinal;
}

// language manager, getting result & output result
function manager() {
  // remove leading zeros
  const inputNumber = parseInt(refs.userInput.value, 10);
  // if input is zero or empty
  if (inputNumber === 0 || isNaN(inputNumber)) {
    clearInput();
    return;
  }
  const ordinalNumber = findOrdinalNumber(inputNumber);
  const cardinalNumber = inputNumber - ordinalNumber;
  const curLang = refs.language.value;

  console.log(
    'inputNumber =',
    inputNumber,
    'ordinalNumber =',
    ordinalNumber,
    'cardinalNumber =',
    cardinalNumber,
  ); //DEL

  // const outputValue = getCardinalWord(cardinalNumber) + getOrdinalWord(ordinalNumber);
  const outputValue = getCardinalWord(ordinalNumber, curLang, ordInd); //DEL
  print(inputNumber, outputValue);
  clearInput();
}



// (universal function to get cardinal or ordinal words depending on arguments)
// transform digits to cardinal number words
function getCardinalWord(number, lang, index) {
  if (number === 0) {
    // return '';
    return '-0-'; //DEL
  }
  // split number to parts by 3 or less digits in array to get levels
  const parts = [];
  const arrToSplit = number.toString().split('');
  let endIndex = arrToSplit.length;
  let startIndex;
  for (let i = 0; i < Math.ceil(arrToSplit.length / 3); i++) {
    startIndex = endIndex - 3 < 0 ? 0 : endIndex - 3;
    parts.push(arrToSplit.slice(startIndex, endIndex).join(''));
    endIndex -= 3;
  }

  console.log('parts', parts); //DEL

  const cardinalWords = [];
  const partsQty = parts.length;

  console.log('partsQty', partsQty); //DEL

  for (let i = 0; i < partsQty; i++) {
    // i - is level
    const numberFromPart = parseInt(parts[i]);
    console.log('numberFromPart', numberFromPart);
    // skip if part === 0
    if (numberFromPart > 0) {
      console.log('numberFromPart', numberFromPart);
      cardinalWords.push(library[lang].levels[i][carInd]);
      console.log(cardinalWords); //DEL
      // twoDigits - is number that consists of ones and tens
      const twoDigits = numberFromPart % 100;
      const ones = twoDigits % 10;
      const tens = twoDigits - ones;
      const hundreds = numberFromPart - twoDigits;
      console.log(
        'numberFromPart =',
        numberFromPart,
        'hundreds =',
        hundreds,
        'twoDigits =',
        twoDigits,
        'tens =',
        tens,
        'ones =',
        ones,
      );
      // from 1 to 19
      if (0 < twoDigits && twoDigits < 20) {
        cardinalWords.push(library[lang][twoDigits][index]);
        console.log(cardinalWords); //DEL
      }
      // TODO from 20 to 99 only tens
      // from 20 to 99
      else {
        cardinalWords.push(library[lang][ones][index]);
        cardinalWords.push(library[lang][tens][carInd]);
        console.log(cardinalWords); //DEL
      }
// TODO from 20 to 99 other cases

      // hundreds
      if (hundreds) {
        cardinalWords.push(
          library[lang][hundreds / 100][carInd] + ' ' + 'hundred',
        );
        console.log(cardinalWords); //DEL
      }
      // if levels then cardinal numbers & ordinal level
    }
  }
  const result = cardinalWords.reverse().join(' ');
  console.log(result);
  return result;
}

// transform digits to ordinal number words
function getOrdinalWord(number) {
  // body
  return number;
}
