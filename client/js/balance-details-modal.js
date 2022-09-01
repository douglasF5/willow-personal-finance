import { showModal, hideModal } from './modal.js';
import { finance, areValuesHidden, textPlaceholder } from './finance-context.js';
import { toTitleCaseWord, formatCurrency, get, create, append } from './utils/utils.js';

const openModalTrigger = get('#button-see-details');

//CREATING MODAL
const balanceDetailsModal = () => {
    let statsData = finance.stats;
    const mathSymbols = {
        income: '+',
        expenses: '-',
        balance: '='
    };
    let statsRows = [];

    const modalContentContainer = create(`<div class="balance-details-modal-content"></div>`);
    const modalTitle = create(`<h2 class="title-balance-details-modal">Balance details</h2>`);

    const modalBodyContentContainer = create(`<div class="body-balance-details-modal" id="body-balance-details-modal"></div>`);

    const closeModalTrigger = create(`<button type="button" class="dismiss-button-balance-details-modal" id="dismiss-button-balance-details-modal">Ok, I understand</button>`);

    closeModalTrigger.onclick = hideModal;

    for (let statKey in statsData) {
        const stat = statsData[statKey];

        const statRow = create(`
            <div class="content-row-balance-details-modal">
                <div class="stat-title-balance-details-modal">
                    <h3>(${mathSymbols[statKey]}) Total ${toTitleCaseWord(statKey)}</h3>
                    <p>${areValuesHidden ? textPlaceholder.hiddenValue : stat.count} transaction${stat.count !== 1 ? 's' : ''}</p>
                </div>
                <strong>${areValuesHidden ? textPlaceholder.hiddenValues : formatCurrency.format(stat.amount)}</strong>
            </div>
        `);
        statsRows.push(statRow);
    }

    append(modalBodyContentContainer, statsRows, true);
    append(modalContentContainer, [modalTitle, modalBodyContentContainer, closeModalTrigger], true);

    return modalContentContainer;
};

//SHOW MODAL
openModalTrigger.onclick = () => {
    showModal(balanceDetailsModal());
};