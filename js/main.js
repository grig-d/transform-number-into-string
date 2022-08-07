// распарсить -  Number.parseInt('x') - парсит цифры пока не встретит не цифру, точка - не цифра
// https://freehost.com.ua/ukr/faq/articles/dinamicheskie-formi-proverka-vvoda-na-javascript/

// const numInput = document.getElementById('numInput');
// const numInputBtn = document.getElementById('numInputBtn');
// numInputBtn.addEventListener('submit', getNum);
// function getNum(event) {
//   event.preventDefault();
//   console.log(numInput.value);

// }
// console.table(numInput);

// function isEmpty(str) {
//   for (var i = 0; i < str.length; i++)
//      if (" " != str.charAt(i))
//          return false;
//      return true;
// }

// // // // // // // // // // // // // // // //

// id="enter-btn"
// id="userNumber"
// id="output"

// en	English your number
// uk	Українська  ваше число
// de	Deutsch Ihre Nummer

// onKeyPress="if ((event.keyCode < 48) || (event.keyCode > 57)) event.returnValue = false;"
// object.addEventListener("keypress", myScript);

// // // // // // // // // // // // // // // //

// import CountdownTimer from './js/countdown.js';
// import ref from './js/reference.js';
// import storage from './js/storage.js';

// const deadlineArray = [];

// // // // // // // // // // // // // // // //

// console.log(storage.get('dateAndTime'));

// const deadLine = new CountdownTimer({
//   selector: '#timer-1',
//   // targetDate: new Date('Dec 31, 2021 18:00:00'),
//   targetDate: new Date(), // this time creates lines in timer instead of NaN
// });

// storage.set('dateAndTimeCheck', deadLine.targetDate);

// deadLine.startCountdown();

// deadLine.targetDate = new Date('Jan 3, 2022 03:38:30'); // updates timer every time you change this value
// deadLine.targetDate = new Date('Dec 30, 2021 18:00:00');

//////////////////////////////////

// const deadlineInfo = {
//   name: 'Охота на фазана',
//   author: 'Марта Кэтра',
//   genre: 'детектив',
//   pageCount: 724,
//   publisher: 'ООО Астрель',
// };

// const stringified = JSON.stringify(deadlineInfo); // object to JSON

// const parsed = JSON.parse(stringified); // JSON to object

// localStorage.setItem('key', 'value');
// const value = localStorage.getItem('key');
// console.log('value from localStorage: ', value);

// const settings = {
//   theme: 'dark',
//   fontSize: 14,
// };

// localStorage.setItem('settings', JSON.stringify(settings));

/////////////////////////

// $(function () {
//   $.datepicker.setDefaults({
//     changeMonth: true,
//     changeYear: true,
//   });
//   $('#datepicker').datepicker({
//     dateFormat: 'd M yy',
//   });
// });

// $(document).ready(function () {
//   $('#timepicker').timepicker({
//     timeFormat: 'HH:mm',
//     defaultTime: '0',
//     interval: 1,
//     dynamic: false,
//     dropdown: true,
//     scrollbar: true,
//   });
// });

//////////////////////

// TODO: console log from local
// if (localStorage.getItem('dateAndTime')) {
//   const parsed = JSON.parse(localStorage.getItem('dateAndTime'));
//   console.log('there is data: ', parsed);
// }

// ref.setDeadlineBtn.addEventListener('click', e => {
//   e.preventDefault();
//   if (ref.datePicker.value) {
//     const arr = ref.datePicker.value.split(' ');
//     const newDateTime = `${arr[1]} ${arr[0]}, ${arr[2]} ${ref.timePicker.value}:00`;
//     // console.log(new Date('Jan 4, 2022 22:00:00'));
//     // console.log(new Date(newDateTime));
//     deadLine.targetDate = new Date(newDateTime);

//     deadLine.startCountdown();

//     const stringified = JSON.stringify(new Date(newDateTime));
//     localStorage.setItem('dateAndTime', stringified);

//     const parsed = JSON.parse(localStorage.getItem('dateAndTime'));
//     console.log('there is data: ', parsed);
//   }
// });

// console.log(deadLine.targetDate);

// localStorage.clear();



// // // // // // // // // 
/*

function reset() {
  ref.delBtn.disabled = false;
  ref.row.textContent = '';
  for (let i = 0; i < 8; i++) {
    addColumn(i);
  }
}

reset();

function createColumn() {
  const newColumn = document.createElement('div');
  newColumn.id = ref.row.childNodes.length + 1;
  newColumn.classList.add('column');
  newColumn.appendChild(createQuad());
  return newColumn;
}

function addColumn() {
  ref.row.appendChild(createColumn());
  if (ref.row.childNodes.length) {
    ref.delBtn.disabled = false;
  }
}

function deleteColumn() {
  const select = document.getElementById('row');
  if (select.childNodes.length > 0) {
    select.removeChild(select.lastChild);
  }
  if (select.childNodes.length === 0) {
    ref.delBtn.disabled = true;
  }
}

function createQuad() {
  const newQuad = document.createElement('div');
  newQuad.classList.add('quad');
  return newQuad;
}

ref.resBtn.addEventListener('click', reset);
ref.delBtn.addEventListener('click', deleteColumn);
ref.addBtn.addEventListener('click', addColumn);

ref.row.addEventListener('click', addQuad);

function addQuad(event) {
  if (event.target.classList.contains('quad')) {
    const parent = event.target.parentElement;
    if (parent.childNodes.length > 1 && event.target !== parent.firstChild) {
      parent.removeChild(parent.lastChild);
      makeDecision(parent);
      return;
    }
    parent.appendChild(createQuad());

    makeDecision(parent);
  }
}

function makeDecision(parent) {
  if (parent.childNodes.length > 3) {
    makeBlinking(parent);
    return;
  }
  if (parent.childNodes.length < 4) {
    stopBlinking(parent);
    return;
  }
}

function makeBlinking(parent) {
  const array = [...parent.childNodes];
  const duration = array.length / 10;
  parent.textContent = '';
  array.forEach((element, index) => {
    element.style.animationDuration = `${duration}s`;
    element.style.animationDelay = `${index / 10}s`;
  });
  parent.append(...array);
}

function stopBlinking(parent) {
  const array = [...parent.childNodes];
  array.forEach((element, index) => {
    element.style = null;
  });
}

*/
