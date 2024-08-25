<script>import { beforeUpdate } from "svelte";
import { inertia } from "../index";
export let href;
export let as = "a";
export let data = {};
export let method = "get";
export let replace = false;
export let preserveScroll = false;
export let preserveState = null;
export let only = [];
export let except = [];
export let headers = {};
export let queryStringArrayFormat = "brackets";
beforeUpdate(() => {
  if (as === "a" && method.toLowerCase() !== "get") {
    console.warn(
      `Creating POST/PUT/PATCH/DELETE <a> links is discouraged as it causes "Open Link in New Tab/Window" accessibility issues.

Please specify a more appropriate element using the "as" attribute. For example:

<Link href="${href}" method="${method}" as="button">...</Link>`
    );
  }
});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
  this={as}
  use:inertia={{
    ...(as !== 'a' ? { href } : {}),
    data,
    method,
    replace,
    preserveScroll,
    preserveState: preserveState ?? method !== 'get',
    only,
    except,
    headers,
    queryStringArrayFormat,
  }}
  {...as === 'a' ? { href } : {}}
  {...$$restProps}
  on:focus
  on:blur
  on:click
  on:dblclick
  on:mousedown
  on:mousemove
  on:mouseout
  on:mouseover
  on:mouseup
  on:cancel-token
  on:before
  on:start
  on:progress
  on:finish
  on:cancel
  on:success
  on:error
>
  <slot />
</svelte:element>
