<script>
    import {Router, Route} from "svelte-routing";

    import TailwindCSS from "./Tailwindcss.svelte";

    import Index from "./views/Index.svelte";
    import Settings from "./views/Settings.svelte";
    import PageAnimator from "./utils/PageAnimator.svelte";
    import Monitor from "./views/Monitor.svelte";
    import Departures from "./views/monitor/Departures.svelte";

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

<main class="font-inter transition-bg duration-200 min-h-screen bg-gray-200 dark:bg-gray-800">
    <TailwindCSS/>
    <Router url="{url}">
        <div>
            <Route path="monitor/:city/:stopId" component="{Departures}" />
            <PageAnimator path="monitor">
                <Monitor/>
            </PageAnimator>
            <PageAnimator path="settings">
                <Settings {toggleDarkmode}/>
            </PageAnimator>
            <PageAnimator path="/">
                <Index {beta}/>
            </PageAnimator>
        </div>
    </Router>
</main>
