import { SvelteComponentTyped } from "svelte";
import type { Page } from '@inertiajs/core';
declare const __propDef: {
    props: {
        id: string;
        initialPage: Page;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SsrProps = typeof __propDef.props;
export type SsrEvents = typeof __propDef.events;
export type SsrSlots = typeof __propDef.slots;
export default class Ssr extends SvelteComponentTyped<SsrProps, SsrEvents, SsrSlots> {
}
export {};
