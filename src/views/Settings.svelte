<script>
    import RegionModal from "../components/RegionModal.svelte";
    import PrimaryButton from "../components/PrimaryButton.svelte";
    import Button from "../components/Button.svelte";
    import BackButton from "../components/BackButton.svelte";


    export let toggleDarkmode;
    export let darkmode;

    let modalOpen = false;
    let regionName;

    function openModal() {
        modalOpen = false;
        modalOpen = true;
    }
</script>

<main>
    <BackButton/>

    <h1 class="mt-4 text-gray-900 dark:text-gray-100 text-2xl font-bold">⚙️ Einstellungen</h1>

    <h2 class="text-gray-900 dark:text-gray-100 mt-4 text-xl font-semibold">Region</h2>
    <p class="leading-snug text-gray-700 dark:text-gray-500 mb-3">
        Ihre aktuell gewählte Region ist <b>{regionName}</b>.<br/>
        Hier haben Sie die Möglichkeit eine andere Region zu wählen.
    </p>
    <PrimaryButton onClick={openModal} text="Region wählen"/>

    <RegionModal bind:regionProp={regionName} modalOpen={modalOpen}/>


    <hr class="my-8"/>


    <h2 class="text-gray-900 dark:text-gray-100 mt-4 text-xl font-semibold">Design</h2>
    <p class="leading-snug text-gray-700 dark:text-gray-500 mb-3">
        Wählen Sie Ihr präferiertes Design.
    </p>

    <div class="flex">
    <button
            class="my-auto focus:outline-none rounded-full bg-gray-800 dark:bg-gray-200 mr-2"
            style="width: 48px; height: 48px"
            on:click={toggleDarkmode()}>{darkmode ? "🌒" : "🌔"}</button>
    <p class="my-auto text-gray-700 dark:text-gray-300">{darkmode ? "hell" : "dunkel"}</p>
    </div>
</main>