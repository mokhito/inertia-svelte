import page from './page';
import { mergeDataIntoQueryString, router, shouldIntercept } from '@inertiajs/core';
const link = (node, options = {}) => {
    const [href, data] = hrefAndData(options);
    node.href = href;
    options.data = data;
    node.dataset.active = "false";
    const unsubscribePage = page.subscribe((newPage) => {
        if (!newPage)
            return;
        const newUrl = new URL(newPage.url, window.location.origin);
        const targetUrl = new URL(href);
        node.dataset.active = (newUrl.pathname === targetUrl.pathname).toString();
    });
    function fireEvent(name, eventOptions = {}) {
        return node.dispatchEvent(new CustomEvent(name, eventOptions));
    }
    function hrefAndData(options) {
        options ??= {};
        return mergeDataIntoQueryString(options.method || 'get', node.href || options.href || '', options.data || {}, options.queryStringArrayFormat || 'brackets');
    }
    function visit(event) {
        if (!node.href) {
            throw new Error('Option "href" is required');
        }
        if (shouldIntercept(event)) {
            event.preventDefault();
            router.visit(node.href, {
                onCancelToken: () => fireEvent('cancel-token'),
                onBefore: (visit) => fireEvent('before', { detail: { visit } }),
                onStart: (visit) => fireEvent('start', { detail: { visit } }),
                onProgress: (progress) => fireEvent('progress', { detail: { progress } }),
                onFinish: (visit) => fireEvent('finish', { detail: { visit } }),
                onCancel: () => fireEvent('cancel'),
                onSuccess: (page) => fireEvent('success', { detail: { page } }),
                onError: (errors) => fireEvent('error', { detail: { errors } }),
                ...options,
            });
        }
    }
    node.addEventListener('click', visit);
    return {
        update(newOptions) {
            const [href, data] = hrefAndData(newOptions);
            node.href = href;
            options = { ...newOptions, data };
        },
        destroy() {
            node.removeEventListener('click', visit);
            unsubscribePage();
        },
    };
};
export default link;
