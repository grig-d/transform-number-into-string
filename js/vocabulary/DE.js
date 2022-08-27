const DE = {
  0: ['', ''],
  1: ['erste', 'ein', '', 'eine'],
  2: ['zweite', 'zwei'],
  3: ['dritte', 'drei'],
  4: ['vierte', 'vier'],
  5: ['fünfte', 'fünf'],
  6: ['sechste', 'sechs'],
  7: ['siebte', 'sieben'],
  8: ['achte', 'acht'],
  9: ['neunte', 'neun'],
  10: ['zehnte', 'zehn'],
  11: ['elfte', 'elf'],
  12: ['zwölfte', 'zwölf'],
  13: ['dreizehnte', 'dreizehn'],
  14: ['vierzehnte', 'vierzehn'],
  15: ['fünfzehnte', 'fünfzehn'],
  16: ['sechszehnte', 'sechszehn'],
  17: ['siebzehnte', 'siebzehn'],
  18: ['achtzehnte', 'achtzehn'],
  19: ['neunzehnte', 'neunzehn'],
  20: ['zwanzigste', 'zwanzig'],
  30: ['dreißigste', 'dreißig'],
  40: ['vierzigste', 'vierzig'],
  50: ['fünfzigste', 'fünfzig'],
  60: ['sechzigste', 'sechzig'],
  70: ['siebzigste', 'siebzig'],
  80: ['achtzigste', 'achtzig'],
  90: ['neunzigste', 'neunzig'],
  100: ['hundertste', 'hundert'],
  levels: [
    ['', ''],
    ['tausendste', 'tausend'],
    ['millionste', 'Million', 'Millionen'], 
    ['milliardste', 'Milliarde', 'Milliarden'],
    ['billionste', 'Billion', 'Billionen'],
  ],
};

export default DE;

//  plural level index is cardinal index + 1 (CARIND + 1) for level > 1
/*
eine Million
zwei Millionen
eine Milliarde
eine Billion
zwei Billionen
*/