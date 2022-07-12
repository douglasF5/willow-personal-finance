//FORMAT TEXT
export function toTitleCaseWord(word) {
	let first = word[0];
  let rest = word.substr(1, word.length + 1);
  return first.toUpperCase() + rest;
}

//FORMAT DATE
export function formatDate(date) {
  const dateArray = date.split('-');
  const formattedDate = `${numberToMonth(dateArray[1])} ${dateArray[2]}, ${dateArray[0]}`;

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