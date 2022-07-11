//TOGGLE ICON ON UI
const buttonHideValues = document.getElementById('hide-values-button');
const iconHideValues = document.getElementById('icon-button-hide-values');
let areValuesHidden = false;
let iconName = areValuesHidden ? 'eye' : 'eye-off';

buttonHideValues.onclick = () => {
    let newIcon = `<use xlink:href="assets/icons.svg#${iconName}"/>`;
    iconHideValues.innerHTML = newIcon;
    areValuesHidden = !areValuesHidden;
    iconName = areValuesHidden ? 'eye' : 'eye-off';
};