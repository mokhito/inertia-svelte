import { router } from '@inertiajs/core';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { writable } from 'svelte/store';
export default function useForm(rememberKeyOrData, maybeData) {
    const rememberKey = typeof rememberKeyOrData === 'string' ? rememberKeyOrData : null;
    const data = typeof rememberKeyOrData === 'string' ? maybeData : rememberKeyOrData;
    const restored = rememberKey
        ? router.restore(rememberKey)
        : null;
    let defaults = typeof data === 'function' ? cloneDeep(data()) : cloneDeep(data);
    let cancelToken = null;
    let recentlySuccessfulTimeoutId = null;
    let transform = (data) => data;
    const store = writable({
        ...(restored ? restored.data : data),
        isDirty: false,
        errors: restored ? restored.errors : {},
        hasErrors: false,
        progress: null,
        wasSuccessful: false,
        recentlySuccessful: false,
        processing: false,
        setStore(keyOrData, maybeData) {
            store.update((store) => {
                return Object.assign(store, typeof keyOrData === 'string' ? { [keyOrData]: maybeData } : keyOrData);
            });
        },
        data() {
            return Object.keys((typeof data === 'function' ? data() : data)).reduce((carry, key) => {
                carry[key] = this[key];
                return carry;
            }, {});
        },
        transform(callback) {
            transform = callback;
            return this;
        },
        defaults(fieldOrFields, maybeValue) {
            if (typeof fieldOrFields === 'undefined') {
                defaults = Object.assign(defaults, cloneDeep(this.data()));
                return this;
            }
            defaults = Object.assign(cloneDeep(defaults), cloneDeep(typeof fieldOrFields === 'string' ? { [fieldOrFields]: maybeValue } : fieldOrFields));
            return this;
        },
        reset(...fields) {
            const resolvedData = typeof data === 'object' ? cloneDeep(defaults) : cloneDeep(data());
            const clonedData = cloneDeep(resolvedData);
            if (fields.length === 0) {
                this.setStore(clonedData);
            }
            else {
                this.setStore(Object.keys(clonedData)
                    .filter((key) => fields.includes(key))
                    .reduce((carry, key) => {
                    carry[key] = clonedData[key];
                    return carry;
                }, {}));
            }
            return this;
        },
        setError(fieldOrFields, maybeValue) {
            this.setStore('errors', {
                ...this.errors,
                ...(typeof fieldOrFields === 'string' ? { [fieldOrFields]: maybeValue } : fieldOrFields),
            });
            return this;
        },
        clearErrors(...fields) {
            this.setStore('errors', Object.keys(this.errors).reduce((carry, field) => ({
                ...carry,
                ...(fields.length > 0 && !fields.includes(field) ? { [field]: this.errors[field] } : {}),
            }), {}));
            return this;
        },
        submit(method, url, options = {}) {
            const data = transform(this.data());
            const _options = {
                ...options,
                onCancelToken: (token) => {
                    cancelToken = token;
                    if (options.onCancelToken) {
                        return options.onCancelToken(token);
                    }
                },
                onBefore: (visit) => {
                    this.setStore('wasSuccessful', false);
                    this.setStore('recentlySuccessful', false);
                    if (recentlySuccessfulTimeoutId) {
                        clearTimeout(recentlySuccessfulTimeoutId);
                    }
                    if (options.onBefore) {
                        return options.onBefore(visit);
                    }
                },
                onStart: (visit) => {
                    this.setStore('processing', true);
                    if (options.onStart) {
                        return options.onStart(visit);
                    }
                },
                onProgress: (event) => {
                    this.setStore('progress', event);
                    if (options.onProgress) {
                        return options.onProgress(event);
                    }
                },
                onSuccess: async (page) => {
                    this.setStore('processing', false);
                    this.setStore('progress', null);
                    this.clearErrors();
                    this.setStore('wasSuccessful', true);
                    this.setStore('recentlySuccessful', true);
                    recentlySuccessfulTimeoutId = setTimeout(() => this.setStore('recentlySuccessful', false), 2000);
                    if (options.onSuccess) {
                        return options.onSuccess(page);
                    }
                },
                onError: (errors) => {
                    this.setStore('processing', false);
                    this.setStore('progress', null);
                    this.clearErrors().setError(errors);
                    if (options.onError) {
                        return options.onError(errors);
                    }
                },
                onCancel: () => {
                    this.setStore('processing', false);
                    this.setStore('progress', null);
                    if (options.onCancel) {
                        return options.onCancel();
                    }
                },
                onFinish: (visit) => {
                    this.setStore('processing', false);
                    this.setStore('progress', null);
                    cancelToken = null;
                    if (options.onFinish) {
                        return options.onFinish(visit);
                    }
                },
            };
            if (method === 'delete') {
                router.delete(url, { ..._options, data });
            }
            else {
                router[method](url, data, _options);
            }
        },
        get(url, options) {
            this.submit('get', url, options);
        },
        post(url, options) {
            this.submit('post', url, options);
        },
        put(url, options) {
            this.submit('put', url, options);
        },
        patch(url, options) {
            this.submit('patch', url, options);
        },
        delete(url, options) {
            this.submit('delete', url, options);
        },
        cancel() {
            cancelToken?.cancel();
        },
    });
    store.subscribe((form) => {
        if (form.isDirty === isEqual(form.data(), defaults)) {
            form.setStore('isDirty', !form.isDirty);
        }
        const hasErrors = Object.keys(form.errors).length > 0;
        if (form.hasErrors !== hasErrors) {
            form.setStore('hasErrors', !form.hasErrors);
        }
        if (rememberKey) {
            router.remember({ data: form.data(), errors: form.errors }, rememberKey);
        }
    });
    return store;
}
