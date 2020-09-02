import App from "./App.svelte";

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWorker.js')
}

const app = new App({
  target: document.body,
  props: {
    beta: false
  }
});

export default app;
