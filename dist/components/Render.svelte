<script context="module">export const h = (component, props, children) => {
  return {
    component,
    ...props ? { props } : {},
    ...children ? { children } : {}
  };
};
</script>

<script>import store from "../store";
export let component;
export let props = {};
export let children = [];
let prev = component;
let key = (/* @__PURE__ */ new Date()).getTime();
function updateKey(component2) {
  if (prev !== component2) {
    prev = component2;
    key = (/* @__PURE__ */ new Date()).getTime();
  }
}
$:
  updateKey(component);
</script>

{#if $store.component}
  {#key key}
    <svelte:component this={component} {...props}>
      {#each children as child, index (component && component.length === index ? $store.key : null)}
        <svelte:self {...child} />
      {/each}
    </svelte:component>
  {/key}
{/if}
