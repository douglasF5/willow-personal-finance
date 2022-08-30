//FORMAT TEXT
export function toTitleCaseWord(word) {
	let first = word[0];
  let rest = word.substr(1, word.length);
  return first.toUpperCase() + rest;
}

//FORMAT DATE
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

//USE STATE HOOK
export function useState(initialValue){
  let currentState = { current: initialValue, prev: null };

  function setState(newValue) {
    let newState = { current: newValue, prev: currentState.current };
    Object.assign(currentState, newState);
  }

  return [currentState, setState];
}

//USE FINANCE HOOK
export function useFinance(){
  let currentState = { stats: {}, transactions: [] };

  function setState({ newStats, newTransactions }) {
    let newState = { stats: newStats, transactions: newTransactions };
    Object.assign(currentState, newState);
  }

  return [currentState, setState];
}