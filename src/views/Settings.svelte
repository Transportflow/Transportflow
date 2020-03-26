<script>
    import RegionModal from "../components/RegionModal.svelte";

    export let toggleDarkmode;
    export let darkmode;

    let modalOpen = false;

    function openModal() {
        modalOpen = false;
        modalOpen = true;
    }
</script>

<main>
    <h1 class="text-gray-900 dark:text-gray-100 text-2xl font-bold">⚙️ Einstellungen</h1>

    <h2 class="text-gray-900 dark:text-gray-100 text-xl font-semibold">Region</h2>
    <button on:click={openModal}
            class="p-2 rounded-lg border border-gray-400 shadow-sm transition-bg duration-200 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 dark-hover:bg-gray-900 hover:bg-gray-300 dark-active:bg-black focus:outline-none active:bg-gray-400">
        Dresden
    </button>

    <RegionModal modalOpen={modalOpen}/>


    <hr class="my-8"/>
    <button
            class="my-auto focus:outline-none rounded-full bg-gray-800"
            style="width: 48px; height: 48px"
            on:click={toggleDarkmode()}>{darkmode ? "🌒" : "🌔"}</button>
</main>