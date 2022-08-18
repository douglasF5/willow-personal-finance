import './new-transaction-modal/style-animation-new-transaction-modal.js';
import './new-transaction-modal/submission-new-transaction-modal.js';
import './balance-details-modal.js';
import './hide-values.js';
import './stats.js';
import './transactions-table/listing-transactions.js';
import { toggleTheme } from './color-scheme.js';
import './tool-tip.js';

window.addEventListener("keydown", (e) => {
    if(e.key.toLowerCase() === 't' && e.ctrlKey) {
        toggleTheme();
    }
})