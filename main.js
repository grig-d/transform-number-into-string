import refs from './js/refs.js';
import placeholderNames from './js/placeholderNames.js';
import library from './js/library.js';

//DEL
// const LOG = 0;
const LOG = 1;

// add event listeners
refs.language.addEventListener('change', changePlaceholder);
refs.userInput.addEventListener('keypress', inputCharFilter);
refs.enterBtn.addEventListener('click', transformManager);
window.addEventListener('keypress', pressEnter);

// ordinal array index value in vocabulary object
// cardinal array index value in vocabulary object
// genitive case array index in vocabulary object
const ORDINDX = 0;
const CARINDX = 1;
const GENINDX = 2;

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

  //DEL
  if (LOG) {
    console.log(
      'inputNumber =',
      inputNumber,
      'ordinalEndingNumber =',
      ordinalEndingNumber,
    );
  }

  const fullCardinalWords = getWords(inputNumber, curLang, CARINDX);
  const ordinalEndingWords = getWords(ordinalEndingNumber, curLang, ORDINDX);
  const limitIndex = fullCardinalWords.length - ordinalEndingWords.length;
  const outputValue = [
    ...fullCardinalWords.filter((el, ind) => ind < limitIndex),
    ...ordinalEndingWords,
  ].join(' ');
  //DEL
  if (LOG) {
    console.log(outputValue);
  }
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

  const words = [];
  const partsQty = parts.length;

  //DEL
  if (LOG) {
    console.log('parts', parts);
    console.log('partsQty', partsQty);
  }

  for (let i = 0; i < partsQty; i++) {
    // i - is level
    const numberFromPart = parseInt(parts[i]);
    //DEL
    if (LOG) {
      console.log('numberFromPart', numberFromPart);
    }
    // skip if part === 0
    if (numberFromPart > 0) {
      words.push(library[lang].levels[i][index]);
      //DEL
      if (LOG) {
        console.log('numberFromPart', numberFromPart);
        console.log(words);
      }
      // twoDigits - is number that consists of ones and tens
      const twoDigits = numberFromPart % 100;
      const ones = twoDigits % 10;
      const tens = twoDigits - ones;
      const hundreds = numberFromPart - twoDigits;
      //DEL
      if (LOG) {
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
      }
      // from 1 to 19
      if (0 < twoDigits && twoDigits < 20) {
        words.push(library[lang][twoDigits][i ? CARINDX : index]); // if level > 0 then digits only cardinal
        //DEL
        if (LOG) {
          console.log(words);
        }
      }
      // from 20 to 99 only tens
      else if (twoDigits > 19 && ones === 0) {
        words.push(library[lang][tens][i ? CARINDX : index]); // if level > 0 then digits only cardinal
        //DEL
        if (LOG) {
          console.log(words);
        }
      }
      // from 20 to 99 with ones > 0
      else {
        words.push(library[lang][ones][i ? CARINDX : index]); // if level > 0 then digits only cardinal
        words.push(library[lang][tens][CARINDX]);
        //DEL
        if (LOG) {
          console.log(words);
        }
      }
      // hundreds
      if (hundreds && lang === 'EN') {
        words.push(
          library[lang][hundreds / 100][CARINDX] +
            ' ' +
            library[lang][100][i ? CARINDX : index], // if level > 0 then digits only cardinal
        );
        //DEL
        if (LOG) {
          console.log(words);
        }
      }

      if (hundreds && lang === 'UK') {
        console.log('українські сотні');
      }
    }
  }
  const result = words.filter(el => el).reverse();
  //DEL
  if (LOG) {
    console.log(result);
  }
  return result;
}

// TEST
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

/*
test('first', 1, 'EN');
test('fifth', 5, 'EN');
test('tenth', 10, 'EN');
test('fifteenth', 15, 'EN');
test('twenty fifth', 25, 'EN');
test('ninetieth', 90, 'EN');
test('one hundredth', 100, 'EN');
test('one hundred first', 101, 'EN');
test('one hundred twentieth', 120, 'EN');
test('one hundred twenty fourth', 124, 'EN');
test('four hundred ninety first', 491, 'EN');
test('five hundredth', 500, 'EN');
test('two thousandth', 2_000, 'EN');
test('two thousand eighth', 2_008, 'EN');
test('two thousand fourteenth', 2_014, 'EN');
test('three thousand seven hundredth', 3_700, 'EN');
test('ten thousandth', 10_000, 'EN');
test('seventy one thousandth', 71_000, 'EN');
test('one hundred forty five thousandth', 145_000, 'EN');
test('nine hundred three thousandth', 903_000, 'EN');
test('one million two hundred ninety thousandth', 1_290_000, 'EN');
test('nine millionth', 9_000_000, 'EN');
test('ten million four thousandth', 10_004_000, 'EN');
test('one hundred millionth', 100_000_000, 'EN');
test('one billion one hundred seventy thousandth', 1_000_170_000, 'EN');
test(
  'fifteen billion nine hundred twelve million fifty thousandth',
  15_912_050_000,
  'EN',
);
test('twenty three billionth', 23_000_000_000, 'EN');
test('one hundred billionth', 100_000_000_000, 'EN');
test('two hundred eight billionth', 208_000_000_000, 'EN');
test('one trillionth', 1_000_000_000_000, 'EN');
test('nine hundred ninety nine trillionth', 999_000_000_000_000, 'EN');
test('nine hundred ninety nine trillion first', 999_000_000_000_001, 'EN');
*/

/*
test('перший', 1, 'UK');
test("п'ятий", 5, 'UK');
test('десятий', 10, 'UK');
test("п'ятнадцятий", 15, 'UK');
test('двадцятий', 20, 'UK');
test('двадцять перший', 21, 'UK');
test("двадцять п'ятий", 25, 'UK');
test('тридцятий', 30, 'UK');
test('сорок восьмий', 48, 'UK');
test("дев'яностий", 90, 'UK');
test('сотий', 100, 'UK');
test('сто перший', 101, 'UK');
test('сто двадцятий', 120, 'UK');
test('сто двадцять четвертий', 124, 'UK');
test('двісті двадцять четвертий', 224, 'UK');
test('двісті сороковий', 240, 'UK');
test('чотирьохсотий', 400, 'UK');
test('чотириста третій', 403, 'UK');
test("чотириста дев'яносто перший", 491, 'UK');
test("п'ятисотий", 500, 'UK');
test('тисячний', 1_000, 'UK');
test('двохтисячний', 2_000, 'UK');
test('дві тисячі перший', 2_001, 'UK');
test('дві тисячі чотирнадцятий', 2_014, 'UK');
test('три тисячі семисотий', 3_700, 'UK');
test('вісім тисяч сотий', 8_100, 'UK');
test('десятитисячний', 10_000, 'UK');
test('сімдесятиоднотисячний', 71_000, 'UK');
test('сімдесятидвохтисячний', 72_000, 'UK');
test("сімдесятип'ятитисячний", 75_000, 'UK');
test('стотисячний', 100_000, 'UK');
test("стосорокап'ятитисячний", 145_000, 'UK');
test("сто сорок п'ять тисяч перший", 145_001, 'UK');
test("сто сорок п'ять тисяч сто перший", 145_101, 'UK');
test("вісімсот вісім тисяч тридцять дев'ятий", 808_039, 'UK');
test("дев'ятсоттрьохтисячний", 903_000, 'UK');
test('мільйонний', 1_000_000, 'UK');
test('один мільйон перший', 1_000_001, 'UK');
test('трьохмільйонний', 3_000_000, 'UK');
test('три мільйони перший', 3_000_001, 'UK');
test('чотири мільйони сотий', 4_000_100, 'UK');
test('чотири мільйони двохтисячний', 4_002_000, 'UK');
test("дев'ять мільйонів тридцятидвохтисячний", 9_032_000, 'UK');
test("п'ять мільйонів десятий", 5_000_010, 'UK');
test('сім мільйонів десятий', 7_000_010, 'UK');
test('вісім мільйонів двадцять тисяч одинадцятий', 8_020_011, 'UK');
test('чотири мільйони сотий', 4_000_100, 'UK');
test('стомільйонний', 100_000_000, 'UK');
test('сто мільйонів чотирьохтисячний', 100_004_000, 'UK');
test('мільярдний', 1_000_000_000, 'UK');
test('один мільярд двадцятий', 1_000_000_020, 'UK');
test('трильйонний', 1_000_000_000_000, 'UK');
*/
