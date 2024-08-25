import { writable } from 'svelte/store';
const store = writable({
    component: null,
    page: null,
    key: null,
});
export default store;
