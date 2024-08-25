/// <reference types="svelte" />
import type { Errors, Method, Progress, VisitOptions } from '@inertiajs/core';
import { type Writable } from 'svelte/store';
interface InertiaFormProps<TForm extends Record<string, unknown>> {
    isDirty: boolean;
    errors: Partial<Record<keyof TForm, string>>;
    hasErrors: boolean;
    progress: Progress | null;
    wasSuccessful: boolean;
    recentlySuccessful: boolean;
    processing: boolean;
    setStore(data: InertiaFormProps<TForm>): void;
    setStore(key: keyof InertiaFormProps<TForm>, value?: any): void;
    data(): TForm;
    transform(callback: (data: TForm) => object): this;
    defaults(): this;
    defaults(fields: Record<keyof TForm, string>): this;
    defaults(field?: keyof TForm, value?: string): this;
    reset(...fields: (keyof TForm)[]): this;
    clearErrors(...fields: (keyof TForm)[]): this;
    setError(field: keyof TForm, value: string): this;
    setError(errors: Errors): this;
    submit(method: Method, url: string, options?: Partial<VisitOptions>): void;
    get(url: string, options?: Partial<VisitOptions>): void;
    post(url: string, options?: Partial<VisitOptions>): void;
    put(url: string, options?: Partial<VisitOptions>): void;
    patch(url: string, options?: Partial<VisitOptions>): void;
    delete(url: string, options?: Partial<VisitOptions>): void;
    cancel(): void;
}
export type InertiaForm<TForm extends Record<string, unknown>> = TForm & InertiaFormProps<TForm>;
export default function useForm<TForm extends Record<string, unknown>>(data: TForm | (() => TForm)): Writable<InertiaForm<TForm>>;
export default function useForm<TForm extends Record<string, unknown>>(rememberKey: string, data: TForm | (() => TForm)): Writable<InertiaForm<TForm>>;
export {};
