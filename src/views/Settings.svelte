<script>
    import RegionModal from "../components/RegionModal.svelte";
    import PrimaryButton from "../components/PrimaryButton.svelte";
    import Button from "../components/Button.svelte";
    import BackButton from "../components/BackButton.svelte";
    import Divider from "../components/Divider.svelte";
    import Title from "../components/Title.svelte";
    import Subtitle from "../components/Subtitle.svelte";
    import Description from "../components/Description.svelte";
    import OnboardingCheck from "../components/OnboardingCheck.svelte";
    import {Link} from "svelte-routing";


    export let toggleDarkmode;

    let modalOpen = false;
    let regionName;

    function openModal() {
        modalOpen = false;
        modalOpen = true;
    }

    function unregisterWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister();
            });
        }
        window.location.reload(true);
    }
</script>

<main>
    <OnboardingCheck/>
    <BackButton backTo="/"/>

    <Title>⚙️ Einstellungen</Title>

    <Subtitle>Region</Subtitle>
    <Description>
        Ihre aktuell gewählte Region ist<br/><b>{regionName === null ? "N/A" : regionName}</b>
        <br/>Hier haben Sie die Möglichkeit eine andere Region zu wählen.
    </Description>
    <PrimaryButton onClick={openModal} text="Region wählen"/>

    <RegionModal bind:regionProp={regionName} modalOpen={modalOpen}/>

    <Divider className="mb-5 mt-6"/>

    <Subtitle>Design</Subtitle>
    <Description>
        Wählen Sie Ihr präferiertes Design.
    </Description>

    <div class="flex">
        <button
                class="my-auto focus:outline-none rounded-full bg-gray-800 dark:bg-gray-200 mr-2"
                style="width: 48px; height: 48px"
                on:click={toggleDarkmode()}><span class="dark:hidden">🌔</span><span class="hidden dark:block">🌒</span>
        </button>
        <p class="my-auto text-gray-700 dark:text-gray-400"><span class="dark:hidden">hell</span><span
                class="hidden dark:block">dunkel</span></p>
    </div>

    <Link to="impressprivacy">
        <p class="text-black dark:text-gray-200 opacity-50 hover:opacity-100 w-full mt-5 transition duration-1000">
            Impressum & Datenschutz</p>
    </Link>
        <button on:click={unregisterWorker}
                class="w-auto text-black dark:text-gray-200 opacity-50 hover:opacity-100 transition duration-1000">
            Cache leeren
        </button>
</main>