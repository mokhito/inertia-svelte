/// <reference types="svelte" />
import type { Page } from '@inertiajs/core';
import type { InertiaComponentType } from './types';
interface Store {
    component: InertiaComponentType | null;
    page: Page | null;
    key?: number | null;
}
declare const store: import("svelte/store").Writable<Store>;
export default store;
