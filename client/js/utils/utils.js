//FORMATTING TEXT
export function toTitleCaseWord(word) {
	let first = word[0];
  let rest = word.substr(1, word.length);
  return first.toUpperCase() + rest;
}

//FORMATING DATE
export function formatDate(date, pattern='Mmm dd, yyyy') {
  let dateArray;
  let formattedDate;

  switch (pattern) {
    case 'yyyy-mm-dd':
      dateArray = date.split('/');
      formattedDate = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
      break;
    case 'Mmm dd, yyyy':
      dateArray = date.split('-');
      formattedDate = `${numberToMonth(dateArray[1])} ${dateArray[2]}, ${dateArray[0]}`;
      break;
    default:
      return date;
  }

  return formattedDate;
}

function numberToMonth(monthNum) {
  const monthsMMM = {
      '01': "Jan",
      '02': "Feb",
      '03': "Mar",
      '04': "Apr",
      '05': "May",
      '06': "Jun",
      '07': "Jul",
      '08': "Aug",
      '09': "Sep",
      '10': "Oct",
      '11': "Nov",
      '12': "Dec",
  }
  return monthsMMM[monthNum];
}

//GETTING ELEMENTS
export function get(
  query,
  getAll = false
) {
  if (getAll) {
    const elementCollection = document.querySelectorAll(query);
    return elementCollection;
  } else {
    const element = document.querySelector(query);
    return element;
  }
}

//APPENDING ELEMENTS
export function append(
  parent,
  children,
  cleanup = false
) {
  if (cleanup) {
    parent.innerHTML = '';
  }

  children.forEach((el) => {
    parent.append(el);
  });
}

//CREATING ELEMENTS
export function create(str) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = str;
  const newElement = wrapper.firstElementChild;

  return newElement;
}