import { getData, refreshApp } from './finance-context.js';
import './form-submission.js';
import './new-transaction-modal.js';
import './balance-details-modal.js';
import './hide-values.js';
import './color-scheme.js';

async function appInit() {
    await getData();
    refreshApp();
}

appInit();