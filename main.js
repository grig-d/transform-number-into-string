import refs from './js/refs.js';
import placeholderNames from './js/placeholderNames.js';
import library from './js/library.js';

//DEL
let LOG = 0;
// LOG = 1;

//DEL
let testEN = 0;
// testEN = 1;
//DEL
let testUK = 0;
// testUK = 1;

// add event listeners
refs.language.addEventListener('change', changePlaceholder);
refs.userInput.addEventListener('keypress', inputCharFilter);
refs.enterBtn.addEventListener('click', composer);
window.addEventListener('keypress', pressEnter);

// ordinal array index value in vocabulary object
// cardinal array index value in vocabulary object
// genitive case array index in vocabulary object
// exception case array index in vocabulary object
const ORDINDX = 0;
const CARINDX = 1;
const GENINDX = 2;
const EXCINDX = 3;

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
    composer();
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
function findOrdinalEndingNumber(number, language) {
  // ordinal for UK
  if (language === 'UK') {
    let base = 100;
    let level = 0;
    let ordinal = number % base;
    while (ordinal === 0) {
      // ordinal number search formats are: xx, xxx, xxx_xxx, xxx_xxx_xxx, xxx_xxx_xxx_xxx, xxx_xxx_xxx_xxx_xxx
      base *= level ? 1000 : 10;
      level += 1;
      ordinal = number % base;
    }
    return ordinal;
  }
  // ordinal for EN
  let base = 100;
  let ordinal = number % base;
  while (ordinal === 0) {
    // ordinal number search formats are: xx, xxx, x_xxx, xx_xxx, xxx_xxx etc.
    base *= 10;
    ordinal = number % base;
  }
  return ordinal;
}

// getting, compose and output result
function composer() {
  // remove leading zeros
  const inputNumber = parseInt(refs.userInput.value, 10);
  // if input is zero or empty
  if (inputNumber === 0 || isNaN(inputNumber)) {
    clearInput();
    return;
  }
  // current language
  const curLang = refs.language.value;
  const ordinalEndingNumber = findOrdinalEndingNumber(inputNumber, curLang);
  const cardinalNumber = inputNumber - ordinalEndingNumber;

  //DEL
  if (LOG) {
    console.log(
      'inputNumber =',
      inputNumber,
      'ordinalEndingNumber =',
      ordinalEndingNumber,
    );
  }

  let outputValue;
  // compose EN result
  if (curLang === 'EN') {
    const fullCardinalWords = getWordsEN(inputNumber, curLang, CARINDX);
    const ordinalEndingWords = getWordsEN(
      ordinalEndingNumber,
      curLang,
      ORDINDX,
    );
    const limitIndex = fullCardinalWords.length - ordinalEndingWords.length;
    outputValue = [
      ...fullCardinalWords.filter((el, ind) => ind < limitIndex),
      ...ordinalEndingWords,
    ].join(' ');
  }
  // compose UK result
  if (curLang === 'UK') {
    const cardinalWords = getWordsUK(cardinalNumber, curLang, CARINDX);
    // if ordinalNumber > 999 then ordinal number is in genitive case
    const ordinalEndingWords = getWordsUK(
      ordinalEndingNumber,
      curLang,
      ordinalEndingNumber > 999 ? GENINDX : ORDINDX,
    );
    // connector for ordinal words
    const ordConnector = ordinalEndingNumber > 1000 ? '' : ' ';
    outputValue = (
      [...cardinalWords].join(' ') +
      ' ' +
      [...ordinalEndingWords].join(ordConnector)
    ).trim();
  }

  //DEL
  if (LOG) {
    console.log(outputValue);
  }
  print(inputNumber, outputValue);
  clearInput();
}

// get words depending on index argument for EN
function getWordsEN(number, lang, index) {
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
  for (let i = 0; i < partsQty; i++) {
    // i - is level
    const numberFromPart = parseInt(parts[i]);
    // skip if part === 0
    if (numberFromPart > 0) {
      words.push(library[lang].levels[i][index]);
      // twoDigits - is number that consists of ones and tens
      const twoDigits = numberFromPart % 100;
      const ones = twoDigits % 10;
      const tens = twoDigits - ones;
      const hundreds = numberFromPart - twoDigits;
      // from 1 to 19
      if (0 < twoDigits && twoDigits < 20) {
        words.push(library[lang][twoDigits][i ? CARINDX : index]); // if level > 0 then digits only cardinal
      }
      // from 20 to 99 only tens
      else if (twoDigits > 19 && ones === 0) {
        words.push(library[lang][tens][i ? CARINDX : index]); // if level > 0 then digits only cardinal
      }
      // from 20 to 99 with ones > 0
      else {
        words.push(library[lang][ones][i ? CARINDX : index]); // if level > 0 then digits only cardinal
        words.push(library[lang][tens][CARINDX]);
      }
      // hundreds
      if (hundreds) {
        words.push(
          library[lang][hundreds / 100][CARINDX] +
            ' ' +
            library[lang][100][i ? CARINDX : index], // if level > 0 then digits only cardinal
        );
      }
    }
  }
  // filter array to remove empty elements
  const result = words.filter(el => el).reverse();
  return result;
}

// get words depending on index argument for UK
function getWordsUK(number, lang, index) {
  if (number === 0) {
    return '';
  }
  // exceptions for UK ordinal 1_000 1_000_000 1_000_000_000 1_000_000_000_000
  if (index === GENINDX) {
    let base = 1000;
    let level = 1;
    do {
      if (number / base === 1) {
        return [library[lang].levels[level][ORDINDX]];
      }
      base *= 1000;
      level += 1;
    } while (number / base >= 1);
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
    console.log('initial words array', words);
    console.log('parts', parts);
  }

  for (let i = 0; i < partsQty; i++) {
    // i - is level
    const numberFromPart = parseInt(parts[i]);
    // skip if part === 0
    if (numberFromPart > 0) {
      let curInder = index;
      // switch current index for first word in array in genitive case
      if (words.length === 0 && index === GENINDX) {
        curInder = ORDINDX;
      }

      // twoDigits - is number that consists of ones and tens
      const twoDigits = numberFromPart % 100;
      const ones = twoDigits % 10;
      const tens = twoDigits - ones;
      const hundreds = numberFromPart - twoDigits;

      // levelQtyINDX - level quantity index in vocabulary array only in cardinal case levels
      let levelQtyINDX = curInder;
      if (index === CARINDX) {
        // if index is bigger than last element then take index of the last element in array
        levelQtyINDX =
          ones && ones < library[lang].levels[i].length
            ? ones
            : library[lang].levels[i].length - 1;
      }
      const elementToPush = library[lang].levels[i][levelQtyINDX];
      // to avoid pushing empty strings to words array
      if (elementToPush) {
        words.push(elementToPush);
      }

      //DEL
      if (LOG) {
        console.log('words', words);
        console.log('numberFromPart', numberFromPart);
        console.log('curInder', curInder);
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

      // switch current index if array is not empty in genitive case
      if (words.length > 0 && index === GENINDX) {
        curInder = GENINDX;
      }
      const CARorGEN = index === GENINDX && number > 1000 ? GENINDX : CARINDX;
      // from 1 to 19
      if (0 < twoDigits && twoDigits < 20) {
        // except for UK 1 and 2 thousand
        if (twoDigits < 3 && i === 1 && index === CARINDX) {
          words.push(library[lang][twoDigits][EXCINDX]);
        } else {
          words.push(library[lang][twoDigits][i ? CARorGEN : curInder]); // if level > 0 then digits only cardinal
        }
        //DEL
        if (LOG) {
          console.log(words);
        }
      }
      // from 20 to 99 only tens
      else if (twoDigits > 19 && ones === 0) {
        words.push(library[lang][tens][i ? CARorGEN : curInder]); // if level > 0 then digits only cardinal
        //DEL
        if (LOG) {
          console.log(words);
        }
      }
      // from 20 to 99 with ones > 0
      else {
        words.push(library[lang][ones][i ? CARorGEN : curInder]); // if level > 0 then digits only cardinal
        words.push(library[lang][tens][CARorGEN]);
        //DEL
        if (LOG) {
          console.log(words);
        }
      }
      // hundreds
      if (hundreds) {
        words.push(library[lang][hundreds][i ? CARorGEN : curInder]);
        //DEL
        if (LOG) {
          console.log(words);
        }
      }
    }
  }
  // filter array to remove empty elements
  const result = words.filter(el => el).reverse();
  //DEL
  if (LOG) {
    console.log(result);
  }
  return result;
}

// TEST
function test(stringToMatch, numberToCheck, curLang) {
  refs.language.value = curLang;
  refs.userInput.value = numberToCheck;
  composer();
  const outputValue = refs.outputResult.textContent;
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

if (testEN) {
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
}

if (testUK) {
  test('перший', 1, 'UK');
  test('десятий', 10, 'UK');
  test('одинадцятий', 11, 'UK');
  test('двадцятий', 20, 'UK');
  test('двадцять перший', 21, 'UK');
  test('сорок другий', 42, 'UK');
  test("дев'яносто дев'ятий", 99, 'UK');
  test('сотий', 100, 'UK');
  test('сто перший', 101, 'UK');
  test('сто двадцятий', 120, 'UK');
  test('сто двадцять четвертий', 124, 'UK');
  test('двісті двадцять четвертий', 224, 'UK');
  test("п'ятисотий", 500, 'UK');
  test("дев'ятсот дев'яносто дев'ятий", 999, 'UK');
  test('тисячний', 1_000, 'UK');
  test('одна тисяча перший', 1_001, 'UK');
  test('двохтисячний', 2_000, 'UK');
  test('дві тисячі другий', 2_002, 'UK');
  test('чотири тисячі чотирьохсотий', 4_400, 'UK');
  test('шість тисяч сотий', 6_100, 'UK');
  test('десятитисячний', 10_000, 'UK');
  test('сімдесятиоднотисячний', 71_000, 'UK');
  test('сімдесятидвохтисячний', 72_000, 'UK');
  test("сімдесятип'ятитисячний", 75_000, 'UK');
  test('стотисячний', 100_000, 'UK');
  test('стосорокаоднотисячний', 141_000, 'UK');
  test('двохсотсорокадвохтисячний', 242_000, 'UK');
  test("сто сорок п'ять тисяч перший", 145_001, 'UK');
  test("сто сорок п'ять тисяч сто перший", 145_101, 'UK');
  test("вісімсот вісім тисяч тридцять дев'ятий", 808_039, 'UK');
  test("дев'ятисоттрьохтисячний", 903_000, 'UK');
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
  test('два мільярди сотий', 2_000_000_100, 'UK');
  test('трильйонний', 1_000_000_000_000, 'UK');
}
