import { areValuesHidden, toggleValuesHidden, refreshApp } from './finance-context.js';
import { get } from './utils/utils.js';
import { setUpToolTip, updateToolTip } from "./tool-tip.js";

const buttonHideValues = get('#hide-values-button');
const iconHideValues = get('#icon-button-hide-values');

//TOOL TIP
setUpToolTip(buttonHideValues, `${areValuesHidden ? 'Show' : 'Hide'} values`);

//HIDING VALUES
function handleHideValues() {
    let newIcon = `<use xlink:href="assets/icons.svg#${areValuesHidden ? 'eye' : 'eye-off'}"/>`;
    iconHideValues.innerHTML = newIcon;

    toggleValuesHidden(!areValuesHidden);
    updateToolTip(buttonHideValues, `${areValuesHidden ? 'Show' : 'Hide'} values`);
    refreshApp();
}

buttonHideValues.onclick = handleHideValues;

