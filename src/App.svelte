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
        initialLocale: getLocaleFromNavigator(),
    })

    locale.set("en")


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
        window.dispatchEvent(new Event('storage'));
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



<main class="font-inter transition-bg duration-200 min-h-screen h-full bg-gray-200 dark:bg-gray-800">

    {#if development}
        <div class="text-sm bg-black text-white font-mono flex justify-between">
            <p>Transportflow - WIP</p>
            <div class="flex space-x-2">
                <div class="group">
                    <p class="cursor-pointer group-hover:bg-gray-300 group-hover:text-black">Locale</p>
                    <div style="z-index: 3000" class="absolute hidden group-hover:block text-left bg-black">
                        {#each $locales as l}
                            <button class="pl-1 pr-8 {$locale === l ? 'bg-blue-600' : ''}" on:click={() => locale.set(l)}>{l}</button><br/>
                        {/each}
                    </div>
                </div>
                <p class="cursor-pointer hover:bg-gray-300 hover:text-black" on:click={toggleDarkmode}>Darkmode</p>
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
            <div class="h-screen flex justify-center items-center dark:text-white">
                <div class="mb-12">
                    <h1 class="text-4xl font-black">404</h1>
                    <p class="dark:text-gray-500 text-gray-700">Seite nicht gefunden.</p>
                </div>
            </div>
        </Route>
    </Router>
</main>
