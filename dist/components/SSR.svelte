<script>import App from "./App.svelte";
export let id;
export let initialPage;
</script>

<div data-server-rendered="true" {id} data-page={JSON.stringify(initialPage)}>
  <App />
</div>
