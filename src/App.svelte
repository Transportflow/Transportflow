<script>
    import {Router} from "svelte-routing";

    import TailwindCSS from "./Tailwindcss.svelte";

    import Index from "./views/Index.svelte";
    import Settings from "./views/Settings.svelte";
    import PageAnimator from "./utils/PageAnimator.svelte";

    // Darkmode
    let darkmode = !!localStorage.getItem("darkmode");
    function toggleDarkmode() {
        darkmode = !darkmode
    }
    const setDarkmode = (value) => {
        if (value) {
            darkmode = true;
            document.documentElement.classList.add('mode-dark');
        } else {
            darkmode = false;
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

    export let beta;
    export let url = "";
    let prevUrl = "";

    $: setTimeout(() => {prevUrl = url}, 500)
</script>

<main class="font-inter transition-bg duration-200 min-h-screen bg-gray-200 dark:bg-gray-800">
    <TailwindCSS/>
    <Router url="{url}">
        <div>
            <PageAnimator path="settings" {prevUrl}><Settings path="/settings" {darkmode} {toggleDarkmode}/></PageAnimator>
            <PageAnimator path="/" {prevUrl}><Index path="/" {beta} {toggleDarkmode}/></PageAnimator>
        </div>
    </Router>
</main>
