import { SvelteComponentTyped } from "svelte";
import type { PageProps } from '@inertiajs/core';
import type { InertiaComponentType } from '../types';
type RenderProps = {
    component: InertiaComponentType;
    props?: PageProps;
    children?: RenderProps[];
} | null;
export declare const h: (component: InertiaComponentType, props?: PageProps, children?: RenderProps[]) => RenderProps;
declare const __propDef: {
    props: {
        component: InertiaComponentType;
        props?: PageProps | undefined;
        children?: RenderProps[] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
type RenderProps_ = typeof __propDef.props;
export { RenderProps_ as RenderProps };
export type RenderEvents = typeof __propDef.events;
export type RenderSlots = typeof __propDef.slots;
export default class Render extends SvelteComponentTyped<RenderProps_, RenderEvents, RenderSlots> {
}
