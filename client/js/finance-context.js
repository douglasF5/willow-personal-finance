
//FINANCE OBJECT
export let finance = null;
export function setFinance(newState) {
    finance = newState;
}

//HIDE VALUES ON THE UI
export const textPlaceholder = {
    hiddenValue: '🙈',
    hiddenValues: '🙈🙈🙈'
}; //••••••

export let areValuesHidden = false;
export function toggleValuesHidden(value) {
    areValuesHidden = value;
}