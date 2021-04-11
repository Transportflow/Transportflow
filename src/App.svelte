<script>
    import {Router, Route} from "svelte-routing";

    import TailwindCSS from "./Tailwindcss.svelte";

    import Index from "./views/Index.svelte";
    import Settings from "./views/Settings.svelte";
    import PageAnimator from "./utils/PageAnimator.svelte";
    import Monitor from "./views/Monitor.svelte";
    import Departures from "./views/monitor/Departures.svelte";
    import Onboarding from "./views/Onboarding.svelte";
    import ImpressPrivacy from "./views/ImpressPrivacy.svelte";


    // Language, Localisation
    import {addMessages, getLocaleFromNavigator, init, locale, locales, _} from 'svelte-i18n'
    import de from "./lang/de.json"
    import en from "./lang/en.json"

    addMessages('de', de)
    addMessages('en', en)

    init({
        fallbackLocale: 'en',
        initialLocale: localStorage.getItem("language") || getLocaleFromNavigator(),
    })
  
    // Darkmode
    let darkmode = !!localStorage.getItem("darkmode");

    function toggleDarkmode() {
        darkmode = !darkmode
    }

    const setDarkmode = (value) => {
        if (value) {
            document.documentElement.classList.add('mode-dark');
        } else {
            document.documentElement.classList.remove('mode-dark');
        }
        window.dispatchEvent( new Event('storage') );
    };
    $: if (darkmode) {
        setDarkmode(true);
        localStorage.setItem("darkmode", "true");
    } else if (!darkmode) {
        setDarkmode(false);
        localStorage.removeItem("darkmode");
    }
    window.matchMedia('(prefers-color-scheme: dark)').addListener((value) => {
        darkmode = value.matches;
    });

    let development = process.env.VERSION === "development"
    export let beta;
    export let url = "";

    let isAlt = false;

    function handleKeydown(event) {
        if (event.keyCode === 18) {
            isAlt = true;
        }
        if (isAlt && event.keyCode === 76) {
            darkmode = !darkmode;
        }
    }

    function handleKeyup(event) {
        if (event.keyCode === 18) {
            isAlt = false;
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup}/>



<main class="h-full min-h-screen duration-200 bg-gray-100 font-inter transition-bg dark:bg-gray-800">

    {#if development}
        <div class="flex justify-between font-mono text-sm text-white bg-black">
            <p>Transportflow - WIP</p>
            <div class="flex space-x-2">
                <div class="group">
                    <button class="cursor-pointer group-hover:bg-gray-300 group-hover:text-black">Locale</button>
                    <div style="z-index: 3000" class="absolute hidden text-left bg-black group-hover:block">
                        {#each $locales as l}
                            <button class="pl-1 pr-8 {$locale === l ? 'bg-blue-600' : ''}" on:click={() => locale.set(l)}>{l}</button><br/>
                        {/each}
                    </div>
                </div>
                <button class="cursor-pointer hover:bg-gray-300 hover:text-black" on:click={toggleDarkmode}>Darkmode</button>
            </div>
        </div>
    {/if}

    <TailwindCSS/>
    <Router url="{url}">
        <Route path="monitor/:city/:stopId" component="{Departures}"/>
        <PageAnimator path="monitor">
            <Monitor/>
        </PageAnimator>
        <PageAnimator path="settings">
            <Settings {toggleDarkmode}/>
        </PageAnimator>
        <Route path="impressprivacy" component="{ImpressPrivacy}"/>
        <Route path="onboarding" component="{Onboarding}"/>
        <PageAnimator path="/">
            <Index {beta}/>
        </PageAnimator>
        <Route>
            <div class="flex items-center justify-center h-screen dark:text-white">
                <div class="mb-12">
                    <h1 class="text-4xl font-black">404</h1>
                    <p class="text-gray-700 dark:text-gray-500">{$_('utility.page_not_found')}</p>
                </div>
            </div>
        </Route>
    </Router>
</main>
