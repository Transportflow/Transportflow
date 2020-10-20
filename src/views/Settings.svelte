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
    import {_, locales, locale} from "svelte-i18n";


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

    function setLocale(l) {
        locale.set(l)
        localStorage.setItem("language", l)
    }
</script>

<main class="pb-20">
    <OnboardingCheck/>
    <BackButton backTo="/"/>

    <Title><ion-icon style="font-size: 36px" class="-mb-2" name="cog"></ion-icon> {$_('settings.title')}</Title>

    <Subtitle>🧭 {$_('settings.region_title')}</Subtitle>
    <Description>
        {@html $_('settings.region_text', {values: {region: regionName === null ? "N/A" : regionName}})}
    </Description>
    <PrimaryButton onClick={openModal} text="{$_('settings.choose_region')}"/>

    <RegionModal bind:regionProp={regionName} modalOpen={modalOpen}/>

    <Divider className="mb-5 mt-6"/>

    <Subtitle>🗺 {$_('settings.language_title')}</Subtitle>
    <Description>
        {@html $_('settings.language_text')}
    </Description>
    {#each $locales as l}
        <PrimaryButton disableColor={true} className="mr-1 {$locale !== l ? 'bg-gray-900' : 'bg-button-blue'}" onClick={() => setLocale(l)} text="{l.replace('de', 'Deutsch').replace('en', 'English')}"/>
    {/each}


    <Divider className="mb-5 mt-6"/>

    <Subtitle>🕯 {$_('settings.appearance_title')}</Subtitle>
    <Description>
        {$_('settings.appearance_text')}
    </Description>

    <div class="flex">
        <button
                class="my-auto focus:outline-none rounded-full bg-gray-800 dark:bg-gray-200 mr-2"
                style="width: 48px; height: 48px"
                on:click={toggleDarkmode()}><span class="dark:hidden">🌔</span><span class="hidden dark:block">🌒</span>
        </button>
        <p class="my-auto text-gray-700 dark:text-gray-400"><span class="dark:hidden">{$_('settings.light')}</span><span
                class="hidden dark:block">{$_('settings.dark')}</span></p>
    </div>

    <Link to="impressprivacy">
        <p class="text-black dark:text-gray-200 opacity-50 hover:opacity-100 w-full mt-5 transition duration-1000">
            {$_('utility.impress_privacy')}</p>
    </Link>
        <button on:click={unregisterWorker}
                class="w-auto text-black dark:text-gray-200 opacity-50 hover:opacity-100 transition duration-1000">
            {$_('settings.clear_cache')}
        </button>
</main>
