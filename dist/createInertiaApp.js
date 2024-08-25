import { router, setupProgress } from '@inertiajs/core';
import SvelteApp from './components/App.svelte';
import SSR from './components/SSR.svelte';
import store from './store';
export default async function createInertiaApp({ id = 'app', resolve, setup, progress = {}, page, }) {
    const isServer = typeof window === 'undefined';
    const el = isServer ? null : document.getElementById(id);
    const initialPage = page || JSON.parse(el?.dataset.page ?? '{}');
    const resolveComponent = (name) => Promise.resolve(resolve(name));
    await resolveComponent(initialPage.component).then((initialComponent) => {
        store.set({
            component: initialComponent,
            page: initialPage,
        });
    });
    if (!isServer) {
        if (!el) {
            throw new Error(`Element with ID "${id}" not found.`);
        }
        router.init({
            initialPage,
            resolveComponent,
            swapComponent: async ({ component, page, preserveState }) => {
                store.update((current) => ({
                    component: component,
                    page,
                    key: preserveState ? current.key : Date.now(),
                }));
            },
        });
        if (progress) {
            setupProgress(progress);
        }
        setup({
            el,
            App: SvelteApp,
            props: {
                initialPage,
                resolveComponent,
            },
        });
        return;
    }
    const { html, head, css } = SSR.render({ id, initialPage });
    return {
        body: html,
        head: [head, `<style data-vite-css>${css.code}</style>`],
    };
}
