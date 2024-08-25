/// <reference types="svelte" />
import { type VisitOptions } from '@inertiajs/core';
import type { Action } from 'svelte/action';
interface ActionElement extends HTMLElement {
    href?: string;
}
type ActionParameters = VisitOptions & {
    href?: string;
} | undefined;
declare const link: Action<ActionElement, ActionParameters>;
export default link;
