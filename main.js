import refs from './js/refs.js';
import placeholderNames from './js/placeholderNames.js';
import getWordsEN from './js/getWordsEN.js';
import getWordsUK from './js/getWordsUK.js';
import getWordsDE from './js/getWordsDE.js';

// ordinal array index value in vocabulary object
// cardinal array index value in vocabulary object
// genitive case array index in vocabulary object
// exception case array index in vocabulary object
const ORDINDX = 0,
  CARINDX = 1,
  GENINDX = 2,
  EXCINDX = 3;

// add event listeners
refs.language.addEventListener('change', changePlaceholder);
refs.userInput.addEventListener('keypress', inputCharFilter);
refs.enterBtn.addEventListener('click', composer);
window.addEventListener('keypress', pressEnter);

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
function findOrdinalNumber(number, language) {
  // ordinal for UK and DE
  if (language === 'UK' || language === 'DE') {
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

// get words, compose and output result
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
  const ordinalEndingNumber = findOrdinalNumber(inputNumber, curLang);
  const cardinalNumber = inputNumber - ordinalEndingNumber;

  let outputValue;
  // compose EN or DE result
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
  // compose DE result
  if (curLang === 'DE') {
    const fullCardinalWords = getWordsDE(inputNumber, curLang, CARINDX);
    const ordinalEndingWords = getWordsDE(
      ordinalEndingNumber,
      curLang,
      ORDINDX,
    );
    const limitIndex = fullCardinalWords.length - ordinalEndingWords.length;
    outputValue = [
      ...fullCardinalWords.filter((el, ind) => ind < limitIndex),
      ...ordinalEndingWords,
    ].join('');
  }
  print(inputNumber, outputValue);
  clearInput();
}

// ---------------------------------------------------------------------------------

let testEN = 0;
testEN = 1;
let testUK = 0;
testUK = 1;
let testDE = 0;
testDE = 1;

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
  test("двісті сорок п'ять тисяч сто перший", 245_101, 'UK');
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

if (testDE) {
  test('erste', 1, 'DE');
  test('fünfte', 5, 'DE');
  test('zehnte', 10, 'DE');
  test('fünfzehnte', 15, 'DE');
  test('fünfundzwanzigste', 25, 'DE');
  test('neunzigste', 90, 'DE');
  test('einundneunzigste', 91, 'DE');
  test('einhunderterste', 101, 'DE');
  test('einhundertzwanzigste', 120, 'DE');
  test('einhundertzweiundzwanzigste', 122, 'DE');
  test('zweihundertste', 200, 'DE');
  test('vierhundertste', 400, 'DE');
  test('vierhunderterste', 401, 'DE');
  test('vierhunderteinundneunzigste', 491, 'DE');
  test('eintausendste', 1_000, 'DE');
  test('eintausendzweite', 1_002, 'DE');
  test('eintausendfünfzigste', 1_050, 'DE');
  test('eintausendeinhundertste', 1_100, 'DE');
  test('eintausendzweihundertfünfzigste', 1_250, 'DE');
  test('eintausendzweihunderteinundfünfzigste', 1_251, 'DE');
  test('eintausendsiebenhundertachte', 1_708, 'DE');
  test('zweitausendste', 2_000, 'DE');
  test('zweitausendachte', 2_008, 'DE');
  test('zweitausendvierzehnte', 2_014, 'DE');
  test('dreitausendsechshundertsiebenundzwanzigste', 3_627, 'DE');
  test('dreitausendsiebenhundertste', 3_700, 'DE');
  test('zehntausendste', 10_000, 'DE');
  test('einundsiebzigtausendste', 71_000, 'DE');
  test('einhunderttausendste', 100_000, 'DE');
  test('einhundertfünfundvierzigtausendste', 145_000, 'DE');
  test('einhundertfünfundvierzigtausenderste', 145_001, 'DE');
  test('einhundertfünfundvierzigtausendeinhunderterste', 145_101, 'DE');
  test('achthundertachttausendeinunddreißigste', 808_031, 'DE');
  test('neunhundertdreitausendste', 903_000, 'DE');
  test('einmillionste', 1_000_000, 'DE');
  test('dreimillionste', 3_000_000, 'DE');
  test('drei Millionen erste', 3_000_001, 'DE');
  test('drei Millionen zehnte', 3_000_010, 'DE');
  test('drei Millionen zweitausendste', 3_002_000, 'DE');
  test('sieben Millionen zweiunddreißigtausendste', 7_032_000, 'DE');
  test('einhundertmillionste', 100_000_000, 'DE');
  test('zehn Millionen viertausendste', 10_004_000, 'DE');
  test('eine Milliarde einhundertsiebzigtausendste', 1_000_170_000, 'DE');
  test(
    'fünfzehn Milliarden neunhundertzwölf Millionen fünfzigtausendste',
    15_912_050_000,
    'DE',
  );
  test('dreiundzwanzigmilliardste', 23_000_000_000, 'DE');
  test('einhundertmilliardste', 100_000_000_000, 'DE');
  test('zweihundertachtmilliardste', 208_000_000_000, 'DE');
  test('einbillionste', 1_000_000_000_000, 'DE');
  test(
    'fünfzehn Billionen neunhundertzwölf Milliarden fünfzigmillionste',
    15_912_050_000_000,
    'DE',
  );
}