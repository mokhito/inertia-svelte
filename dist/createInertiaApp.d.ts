import { type InertiaAppResponse, type Page } from '@inertiajs/core';
import type { ComponentType } from 'svelte';
import SvelteApp from './components/App.svelte';
import type { ComponentResolver } from './types';
interface CreateInertiaAppProps {
    id?: string;
    resolve: ComponentResolver;
    setup: (props: {
        el: Element;
        App: ComponentType<SvelteApp>;
        props: {
            initialPage: Page;
            resolveComponent: ComponentResolver;
        };
    }) => void | SvelteApp;
    progress?: false | {
        delay?: number;
        color?: string;
        includeCSS?: boolean;
        showSpinner?: boolean;
    };
    page?: Page;
}
export default function createInertiaApp({ id, resolve, setup, progress, page, }: CreateInertiaAppProps): InertiaAppResponse;
export {};
