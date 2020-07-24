<script>
    import {onMount} from "svelte";
    import {fade} from "svelte/transition";
    import {getDepartures} from "../../data";
    import Spinner from 'svelte-spinner';
    import ErrorModal from "../../utils/ErrorModal.svelte";
    import BackButton from "../../components/BackButton.svelte";
    import Button from "../../components/Button.svelte";
    import Title from "../../components/Title.svelte";
    import Departure from "./Departure/Departure.svelte";

    let loading = true;
    let error = null;
    export let city;
    export let stopId;

    let monitor = {};

    let maxDisplayedDepartures = 17;
    let displayedDepartures = [];

    let activeModes = [];
    let allModes = [];

    $: {
        Object.assign([], [city, stopId]);
        monitor.stop = null;
        activeModes = [];
        allModes = [];
        loadDepartures();
    }

    function loadDepartures() {
        loading = true;
        getDepartures(city, stopId, (err) => {
            error = null;
            error = err;
            loading = false;
        }).then((res) => {
            monitor = res;

            // Determine available MoTs
            monitor.stopovers.forEach(stopover => {
                let mot = stopover.line.product.title;
                if (allModes.indexOf(mot) === -1)
                    allModes.push(mot);
            })
            allModes = Object.assign([], allModes)

            displayStops();
            loading = false;
        })
    }

    function toggleMode(name) {
        if (activeModes.indexOf(name) === -1) {
            // activate mode
            activeModes.push(name);
        } else {
            // remove active mode
            activeModes.splice(activeModes.indexOf(name), 1);
        }
        // trigger layout reload
        activeModes = Object.assign([], activeModes);
        // update displayed stops
        displayStops();
    }

    function displayStops() {
        let toDisplay = [];
        monitor.stopovers.forEach((stopover) => {
            if (toDisplay.length > maxDisplayedDepartures)
                return;
            if (activeModes.indexOf(stopover.line.product.title) !== -1 || activeModes.length === 0)
                toDisplay.push(stopover)
        })
        console.log(toDisplay)
        displayedDepartures = toDisplay;
    }
</script>

<ErrorModal shown={error != null} {error}/>
<div class="overflow-hidden absolute w-full p-4 pt-12 sm:p-24 sm:pl-40 sm:pt-20" transition:fade="{{ duration: 100 }}">
    <div class="sm:max-w-lg">
        <BackButton backTo="/monitor">
            <Button onClick={loadDepartures}
                    className="bg-gray-200 dark:bg-gray-800 dark-hover:bg-gray-900 hover:bg-gray-300 text-gray-700 dark:text-gray-400 shadow-none">
                <div class="flex">
                    <ion-icon style="zoom: 1;" class="my-auto -ml-1 mr-1 text-gray-900 dark:text-gray-400"
                              name="refresh-circle"></ion-icon>
                    <p>Aktualisieren</p>
                </div>
            </Button>
        </BackButton>

        {#if monitor != null && monitor.stop != null && monitor.stop.products != null}
            <div class="flex mt-2 -mb-1" style="padding-left: 36px;">
                {#each monitor.stop.products as product}
                    <img class="h-5 w-5 mr-1" alt="" src="{product.img}"/>
                {/each}
            </div>
        {/if}
        <Title className="flex leading-tight">
            <img class="mr-2" style="margin-top: 0.2rem;height: 1.75rem;"
                 src="https://twemoji.maxcdn.com/v/12.1.4/72x72/1f68f.png" alt="">
            {#if loading}
                <div style="margin-left: -8.52px; margin-top: -5px;" class="absolute">
                    <Spinner
                            size="45"
                            speed="1000"
                            color="#85cb37"
                            thickness="2"
                            gap="40"
                    />
                </div>
            {/if}
            {#if monitor == null || monitor.stop == null}
                <span class="py-1"> Lade...</span>
            {:else if monitor != null && monitor.stop != null}
                <span class="py-1"> {monitor.stop.name}</span>
            {:else}
                <span class="py-1"> Fehler</span>
            {/if}
        </Title>
        <div class="mb-2 rounded overflow-scroll sm:overflow-x-hidden overflow-y-hidden flex flex-no-wrap sm:flex-wrap scrollbar-none">
            {#if allModes.length > 1}
                {#each allModes as mode}
                    <Button onClick={toggleMode.bind(null, mode)}
                            className="{activeModes.indexOf(mode) !== -1 ? 'dark:bg-gray-900 bg-gray-400' : ''} whitespace-no-wrap mr-2 sm:my-1 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-400 shadow-none">
                        {mode}
                    </Button>
                {/each}
            {/if}
        </div>
        <div style="max-height: 75vh;" class="scrollbar-none overflow-scroll overflow-x-hidden pb-56 rounded-lg">
            {#if displayedDepartures}
                {#each displayedDepartures as stopover (stopover.tripId+stopover.direction+stopover.line.fahrtNr+stopover.line.name+stopover.plannedWhen+stopover.platform)}
                    <Departure {stopover} {city} {stopId} />
                {/each}
            {/if}
        </div>
    </div>
</div>