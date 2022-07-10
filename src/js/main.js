// console.log('hey');

//GO-AWAY CARD
const closeButton = document.getElementById('close-button-newtransaction-modal');
const submitButton = document.getElementById('submit-button-new-transaction-modal');
const modalOverLayer = document.getElementById('modal-over-layer');

function animateModalOverLayer() {
    modalOverLayer.classList.add('shorten-animatable-layer-modal');
}

closeButton.onclick = animateModalOverLayer;

submitButton.onclick = () => {
    modalOverLayer.classList.add('fly-away-animatable-layer-modal');
};

modalOverLayer.addEventListener('animationend', () => {
    setTimeout(() => {
        modalOverLayer.classList.remove('shorten-animatable-layer-modal');
        modalOverLayer.classList.remove('fly-away-animatable-layer-modal');
    }, 1500)
});


//TEXT INPUT FIELD STYLES
const modalInputFields = document.querySelectorAll('.text-input-container');

function animateInputTextField(fieldContainer) {
    const label = fieldContainer.children[0];
    const field = fieldContainer.children[1];

    if(field.value !== "") {
        label.classList.remove('animatable-label');
        label.classList.add('fixed-label');
    } else {
        label.classList.add('animatable-label');
        label.classList.remove('fixed-label');
    }
}

for(let fieldContainer of modalInputFields) {
    const field = fieldContainer.children[1];

    field.addEventListener('blur', () => {
        animateInputTextField(fieldContainer);
    });
}