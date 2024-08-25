<script>import Render, { h } from "./Render.svelte";
import store from "../store";
$$props;
$:
  child = $store.component && h($store.component.default, $store.page?.props);
$:
  layout = $store.component && $store.component.layout;
$:
  components = layout ? Array.isArray(layout) ? layout.concat(child).reverse().reduce((child2, layout2) => h(layout2, $store.page?.props, [child2])) : h(layout, $store.page?.props, [child]) : child;
</script>

<Render {...components} />
