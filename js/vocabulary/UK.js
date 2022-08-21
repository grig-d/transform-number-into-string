const UK = {
  0: ['', ''],
  1: ['перший', 'один'], // '', одна одно
  2: ['другий', 'два'], // 'двох', дві
  3: ['третій', 'три'], // 'трьох',
  4: ['четвертий', 'чотири'], // 'чотирьох',
  5: ["п'ятий", "п'ять"], // "п'яти",
  6: ['шостий', 'шість'], // 'шести',
  7: ['сьомий', 'сім'], // 'семи',
  8: ['восьмий', 'вісім'], // 'восьми',
  9: ["дев'ятий", "дев'ять"], // 'дев'яти',
  10: ['десятий', 'десять'], // 'десяти',
  11: ['одинадцятий', 'одинадцять'], // 'одинадцяти',
  12: ['дванадцятий', 'дванадцять'], // 'дванадцяти',
  13: ['тринадцятий', 'тринадцять'], // 'тринадцяти',
  14: ['чотирнадцятий', 'чотирнадцять'], // 'чотирнадцяти',
  15: ["п'ятнадцятий", "п'ятнадцять"], // "п'ятнадцяти",
  16: ['шістнадцятий', 'шістнадцять'], // 'шістнадцяти',
  17: ['сімнадцятий', 'сімнадцять'], // 'сімнадцяти',
  18: ['вісімнадцятий', 'вісімнадцять'], // 'вісімнадцяти',
  19: ["дев'ятнадцятий", "дев'ятнадцять"], // "дев'ятнадцяти",
  20: ['двадцятий', 'двадцять'], // 'двадцяти',
  30: ['тридцятий', 'тридцять'], // 'тридцяти',
  40: ['сороковий', 'сорок'], // 'сорока',
  50: ["п'ятдесятий", "п'ятдесят"], // "п'ятдесяти",
  60: ['шістдесятий', 'шістдесят'], // 'шістдесяти',
  70: ['сімдесятий', 'сімдесят'], // 'сімдесяти',
  80: ['вісімдесятий', 'вісімдесят'], // 'вісімдесяти',
  90: ["дев'яностий", "дев'яносто"], // "дев'яносто",
  100: ['сотий', 'сто'], // ''+сотий, ''+сто
  200: ['двохсотий', 'двісті'], // двох+сотий + тисячний мільйонний ... 'двохсот'
  300: ['трьохсотий', 'триста'], // 'трьохсот'+мільйонний
  400: ['чотирьохсотий', 'чотириста'],
  500: ["п'ятисотий", "п'ятсот"],
  600: ['шестисотий', 'шістсот'],
  700: ['семисотий', 'сімсот'],
  800: ['восьмисотий', 'вісімсот'],
  900: ["дев'ятисотий", "дев'ятсот"],
  centum: ['сотий', 'сто'], // 0 1=сто 2=сті 3=ста 4=ста 5=сот
  levels: [
    ['', ''],
    ['тисячний', 'тисяча'], // тисячі тисячі тисячі тисяч
    ['мільйонний', 'мільйон'], // мільйони мільйони мільйони мільйонів
    ['мільярдний', 'мільярд'], // мільярди мільярди мільярди мільярдів
    ['трильйонний', 'трильйон'], // трильйони трильйони трильйони трильйонів
  ],
};

// 2_000 двохтисячний
// дві тисячі
// три тисячі
// семитисячний сім тисяч
// восьмитисячний вісім тисяч
// дев'ятитисячний
// 10_000	десятитисячний
// 71_000 сімдесятиоднотисячний
// 72_000 сімдесятидвохтисячний
// 75_000 сімдесятип'ятитисячний
// 100_000 стотисячний
// 145_000 стосорокап'ятитисячний
// 145_001 сто сорок п'ять тисяч перший
// 145_101 сто сорок п'ять тисяч сто перший
// 808_039 вісімсот вісім тисяч тридцять дев'ятий
// 903_000 дев'ятсоттрьохтисячний
// 1_000_000 мільйонний
// 1_000_001 один мільйон перший
// 3_000_000 трьохмільйонний
// 3_000_001 три мільйони перший
// 4_000_100 чотири мільйони сотий
// 4_002_000 чотири мільйони двохтисячний
// 5_000_010 п'ять мільйонів десятий
// 7_000_010 сім мільйонів десятий
// 8_020_011 вісім мільйонів двадцять тисяч одинадцятий
// 9_032_000 дев'ять мільйонів тридцятидвохтисячний
// 100_000_000 стомільйонний
// 100_004_000 сто мільйонів чотирьохтисячний
// 1_000_000_000 мільярдний
// 1_000_000_020 один мільярд двадцятий
// 1_000_000_000_000 трильйонний

// first splice cardinal array and then concat ordinal array and spread to result

export default UK;
