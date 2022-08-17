import refs from './js/refs.js';
import placeholderNames from './js/placeholderNames.js';
import library from './js/library.js';

// add event listeners
refs.language.addEventListener('change', changePlaceholder);
refs.userInput.addEventListener('keypress', inputCharFilter);
refs.enterBtn.addEventListener('click', transformManager);
window.addEventListener('keypress', pressEnter);

// ordinal array index value in vocabulary object
// cardinal array index value in vocabulary object
const ORDINDX = 0;
const CARINDX = 1;

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
  if (event.code === 'Enter' || event.code === 'NumpadEnter') {
    transformManager();
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
function findOrdinalEndingNumber(number) {
  let base = 100;
  let ordinal = number % base;
  while (ordinal === 0) {
    base *= 10;
    ordinal = number % base;
  }
  return ordinal;
}

// getting result & output result
function transformManager() {
  // remove leading zeros
  const inputNumber = parseInt(refs.userInput.value, 10);
  // if input is zero or empty
  if (inputNumber === 0 || isNaN(inputNumber)) {
    clearInput();
    return;
  }
  const ordinalEndingNumber = findOrdinalEndingNumber(inputNumber);
  const curLang = refs.language.value;

  console.log(
    'inputNumber =',
    inputNumber,
    'ordinalEndingNumber =',
    ordinalEndingNumber,
  ); //DEL

  const fullCardinalWords = getWords(inputNumber, curLang, CARINDX);
  const ordinalEndingWords = getWords(ordinalEndingNumber, curLang, ORDINDX);
  const limitIndex = fullCardinalWords.length - ordinalEndingWords.length;
  const outputValue = [
    ...fullCardinalWords.filter((el, ind) => ind < limitIndex),
    ...ordinalEndingWords,
  ].join(' ');
  console.log(outputValue); //DEL
  print(inputNumber, outputValue);
  clearInput();
}

// get cardinal or ordinal words depending on index argument
function getWords(number, lang, index) {
  if (number === 0) {
    return '';
  }
  // split number into parts by 3 or less digits in array to get levels
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

  const words = [];
  const partsQty = parts.length;

  console.log('partsQty', partsQty); //DEL

  for (let i = 0; i < partsQty; i++) {
    // i - is level
    const numberFromPart = parseInt(parts[i]);
    console.log('numberFromPart', numberFromPart);
    // skip if part === 0
    if (numberFromPart > 0) {
      console.log('numberFromPart', numberFromPart);
      words.push(library[lang].levels[i][index]);
      console.log(words); //DEL
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
        words.push(library[lang][twoDigits][i ? CARINDX : index]); // if level > 0 then digits only cardinal
        console.log(words); //DEL
      }
      // from 20 to 99 only tens
      else if (twoDigits > 19 && ones === 0) {
        words.push(library[lang][tens][i ? CARINDX : index]); // if level > 0 then digits only cardinal
        console.log(words); //DEL
      }
      // from 20 to 99 with ones > 0
      else {
        words.push(library[lang][ones][i ? CARINDX : index]); // if level > 0 then digits only cardinal
        words.push(library[lang][tens][CARINDX]);
        console.log(words); //DEL
      }
      // hundreds
      if (hundreds) {
        words.push(
          library[lang][hundreds / 100][CARINDX] +
            ' ' +
            library[lang][100][i ? CARINDX : index], // if level > 0 then digits only cardinal
        );
        console.log(words); //DEL
      }
    }
  }
  const result = words.filter(el => el).reverse();
  console.log(result);
  return result;
}

// // // // TEST
function test(stringToMatch, numberToCheck, curLang) {
  // return;
  const ordinalEndingNumber = findOrdinalEndingNumber(numberToCheck);
  const fullCardinalWords = getWords(numberToCheck, curLang, CARINDX);
  const ordinalEndingWords = getWords(ordinalEndingNumber, curLang, ORDINDX);
  const limitIndex = fullCardinalWords.length - ordinalEndingWords.length;
  const outputValue = [
    ...fullCardinalWords.filter((el, ind) => ind < limitIndex),
    ...ordinalEndingWords,
  ].join(' ');

  if (outputValue === stringToMatch) {
    console.log(
      '%c OK ',
      'color: white; font-weight: 600; background-color: green',
      numberToCheck,
      stringToMatch,
      '-',
      outputValue,
    );
  } else {
    console.log(
      '%c NO ',
      'color: white; font-weight: 600; background-color: red',
      numberToCheck,
      stringToMatch,
      '-',
      outputValue,
    );
  }
}

test('first', 1, 'EN');
test('fifth', 5, 'EN');
test('tenth', 10, 'EN');
test('fifteenth', 15, 'EN');
test('twenty fifth', 25, 'EN');
test('ninetieth', 90, 'EN');
test('one hundredth', 100, 'EN');
test('one hundred first', 101, 'EN');
test('one hundred twentieth', 120, 'EN');
test('four hundred ninety first', 491, 'EN');
test('five hundredth', 500, 'EN');
test('two thousandth', 2000, 'EN');
test('two thousand eighth', 2008, 'EN');
test('two thousand fourteenth', 2014, 'EN');
test('three thousand seven hundredth', 3700, 'EN');
test('ten thousandth', 10000, 'EN');
test('seventy one thousandth', 71000, 'EN');
test('one hundred forty five thousandth', 145000, 'EN');
test('nine hundred three thousandth', 903000, 'EN');
test('one million two hundred ninety thousandth', 1290000, 'EN');
test('nine millionth', 9000000, 'EN');
test('ten million four thousandth', 10004000, 'EN');
test('one hundred millionth', 100000000, 'EN');
test('one billion one hundred seventy thousandth', 1000170000, 'EN');
test(
  'fifteen billion nine hundred twelve million fifty thousandth',
  15912050000,
  'EN',
);
test('twenty three billionth', 23000000000, 'EN');
test('one hundred billionth', 100000000000, 'EN');
test('two hundred eight billionth', 208000000000, 'EN');
test('one trillionth', 1000000000000, 'EN');
test('nine hundred ninety nine trillionth', 999000000000000, 'EN');
test('nine1 hundred ninety nine trillion first', 999000000000001, 'EN');
