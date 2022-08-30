import { useFinance } from './utils/utils.js';

// export const [finance, setFinance] = useFinance();
export let finance = null;
export function setFinance(newState) {
    finance = newState;
}