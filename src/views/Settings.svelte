<script>
    export let toggleDarkmode;
    export let darkmode;
</script>

<main>
    <button
            class="my-auto focus:outline-none rounded-full bg-gray-800"
            style="width: 48px; height: 48px"
            on:click={toggleDarkmode()}>{darkmode ? "🌒" : "🌔"}</button>
</main>