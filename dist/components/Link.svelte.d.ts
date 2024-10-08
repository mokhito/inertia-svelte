import { SvelteComponentTyped } from "svelte";
import type { Method, PreserveStateOption, RequestPayload } from '@inertiajs/core';
declare const __propDef: {
    props: {
        [x: string]: any;
        href: string;
        as?: keyof HTMLElementTagNameMap | undefined;
        data?: RequestPayload | undefined;
        method?: Method | undefined;
        replace?: boolean | undefined;
        preserveScroll?: PreserveStateOption | undefined;
        preserveState?: PreserveStateOption | null | undefined;
        only?: string[] | undefined;
        except?: string[] | undefined;
        headers?: Record<string, string> | undefined;
        queryStringArrayFormat?: "brackets" | "indices" | undefined;
    };
    events: {
        focus: FocusEvent;
        blur: FocusEvent;
        click: MouseEvent;
        dblclick: MouseEvent;
        mousedown: MouseEvent;
        mousemove: MouseEvent;
        mouseout: MouseEvent;
        mouseover: MouseEvent;
        mouseup: MouseEvent;
        'cancel-token': Event | FocusEvent | UIEvent | MouseEvent | ProgressEvent<EventTarget> | AnimationEvent | InputEvent | CompositionEvent | ClipboardEvent | DragEvent | ErrorEvent | FormDataEvent | PointerEvent | KeyboardEvent | SecurityPolicyViolationEvent | SubmitEvent | TouchEvent | TransitionEvent | WheelEvent;
        before: Event | FocusEvent | UIEvent | MouseEvent | ProgressEvent<EventTarget> | AnimationEvent | InputEvent | CompositionEvent | ClipboardEvent | DragEvent | ErrorEvent | FormDataEvent | PointerEvent | KeyboardEvent | SecurityPolicyViolationEvent | SubmitEvent | TouchEvent | TransitionEvent | WheelEvent;
        start: Event | FocusEvent | UIEvent | MouseEvent | ProgressEvent<EventTarget> | AnimationEvent | InputEvent | CompositionEvent | ClipboardEvent | DragEvent | ErrorEvent | FormDataEvent | PointerEvent | KeyboardEvent | SecurityPolicyViolationEvent | SubmitEvent | TouchEvent | TransitionEvent | WheelEvent;
        progress: ProgressEvent<EventTarget>;
        finish: Event | FocusEvent | UIEvent | MouseEvent | ProgressEvent<EventTarget> | AnimationEvent | InputEvent | CompositionEvent | ClipboardEvent | DragEvent | ErrorEvent | FormDataEvent | PointerEvent | KeyboardEvent | SecurityPolicyViolationEvent | SubmitEvent | TouchEvent | TransitionEvent | WheelEvent;
        cancel: Event;
        success: Event | FocusEvent | UIEvent | MouseEvent | ProgressEvent<EventTarget> | AnimationEvent | InputEvent | CompositionEvent | ClipboardEvent | DragEvent | ErrorEvent | FormDataEvent | PointerEvent | KeyboardEvent | SecurityPolicyViolationEvent | SubmitEvent | TouchEvent | TransitionEvent | WheelEvent;
        error: ErrorEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type LinkProps = typeof __propDef.props;
export type LinkEvents = typeof __propDef.events;
export type LinkSlots = typeof __propDef.slots;
export default class Link extends SvelteComponentTyped<LinkProps, LinkEvents, LinkSlots> {
}
export {};
