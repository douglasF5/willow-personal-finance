import { showModal, hideModal } from './modal.js';
import { getStats } from './stats.js';
import { toTitleCaseWord } from './utils/utils.js';

const openModalTrigger = document.getElementById('button-see-details');
const closeModalTrigger = document.getElementById('dismiss-button-balance-details-modal');
const modalBodyContentContainer = document.getElementById('body-balance-details-modal');

function updateBodyContent() {
    let statsData = getStats();
    modalBodyContentContainer.innerHTML = "";
    const formatStatAmount = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    for(let statKey in statsData) {
        const stat = statsData[statKey];
        const containerEl = document.createElement('DIV');
        const mathSymbols = {
            income: '+',
            expenses: '-',
            balance: '='
        }
        containerEl.classList.add('content-row-balance-details-modal');

        containerEl.innerHTML = `<div class="stat-title-balance-details-modal">
        <h3>(${mathSymbols[statKey]}) Total ${toTitleCaseWord(statKey)}</h3>
        <p>${stat.count} transaction${stat.count !== 1 ? 's' : ''}</p>
    </div>
    <strong>${formatStatAmount.format(stat.amount)}</strong>`;
        modalBodyContentContainer.append(containerEl);
    }
}

openModalTrigger.onclick = () => {
    showModal('balance-details-modal');
    updateBodyContent();
};

closeModalTrigger.onclick = () => {
    hideModal('balance-details-modal');
};