<script>
    import RegionModal from "../components/RegionModal.svelte";
    import PrimaryButton from "../components/PrimaryButton.svelte";
    import Button from "../components/Button.svelte";
    import BackButton from "../components/BackButton.svelte";
    import Divider from "../components/Divider.svelte";
    import Title from "../components/Title.svelte";
    import Subtitle from "../components/Subtitle.svelte";
    import Description from "../components/Description.svelte";


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

    <Title>⚙️ Einstellungen</Title>

    <Subtitle>Region</Subtitle>
    <Description>
        Ihre aktuell gewählte Region ist <b>{regionName === null ? "N/A" : regionName}</b>.<br/>
        Hier haben Sie die Möglichkeit eine andere Region zu wählen.
    </Description>
    <PrimaryButton onClick={openModal} text="Region wählen"/>

    <RegionModal bind:regionProp={regionName} modalOpen={modalOpen}/>

    <Divider/>

    <Subtitle>Design</Subtitle>
    <Description>
        Wählen Sie Ihr präferiertes Design.
    </Description>

    <div class="flex">
    <button
            class="my-auto focus:outline-none rounded-full bg-gray-800 dark:bg-gray-200 mr-2"
            style="width: 48px; height: 48px"
            on:click={toggleDarkmode()}>{darkmode ? "🌒" : "🌔"}</button>
    <p class="my-auto text-gray-700 dark:text-gray-400">{darkmode ? "hell" : "dunkel"}</p>
    </div>
</main>