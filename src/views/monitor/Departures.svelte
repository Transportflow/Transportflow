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
    import Map from "./Map.svelte";

    let loading = true;
    let error = null;
    export let city;
    export let stopId;

    let monitor = {};

    let maxDisplayedDepartures = 17;
    let displayedDepartures = [];
    let showMap = false;

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

            if (monitor === null) {
                loading = false;
                return
            }

            // Determine available MoTs
            monitor.stopovers.forEach(stopover => {
                let mode = stopover.line.product;

                let index = -1;
                allModes.forEach((m, i) => {
                    if (m.title === mode.title)
                        index = i;
                })

                if (index === -1)
                    allModes.push(mode);
            })
            allModes = Object.assign([], allModes)

            displayStops();
            loading = false;
        })
    }

    function toggleMode(mode) {
        let index = -1;

        activeModes.forEach((m, i) => {
            if (m.title === mode.title)
                index = i;
        })

        if (index === -1) {
            // activate mode
            activeModes.push(mode);
        } else {
            // remove active mode
            activeModes.splice(index, 1);
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

            let index = -1;
            activeModes.forEach((mode, i) => {
                if (mode.title === stopover.line.product.title)
                    index = i;
            })

            if (index !== -1 || activeModes.length === 0)
                toDisplay.push(stopover)
        })
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
            {#if loading && (monitor == null || monitor.stop == null)}
                <span class="py-1"> Lade...</span>
            {:else if monitor != null && monitor.stop != null}
                <span class="py-1"> {monitor.stop.name}</span>
            {:else}
                <span class="py-1"> Fehler</span>
            {/if}
        </Title>
        {#if monitor === null}
            <div class="flex items-center justify-center h-64">
                <div class="text-gray-700 dark:text-gray-300 text-center">
                    <p class="text-4xl -mb-2"><ion-icon name="alert-circle"></ion-icon></p>
                    <p>Keine Abfahrten gefunden</p>
                </div>
            </div>
        {/if}
        <div class="mb-2 rounded overflow-scroll sm:overflow-x-hidden overflow-y-hidden scrolling-touch flex flex-no-wrap sm:flex-wrap scrollbar-none">
            {#if monitor !== null && monitor.stopovers != undefined}
                <Button style="display: flex; align-items: center; height: 37px" onClick={() => {showMap = !showMap;}}
                        className="{showMap ? 'dark:bg-gray-900 bg-gray-400' : ''} mr-2 sm:my-1 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-400 shadow-none">
                    <ion-icon name="map" class="text-gray-700 dark:text-gray-400"></ion-icon>
                </Button>
            {/if}
            {#if allModes.length > 1 && !showMap}
                {#each allModes as mode (mode.title + mode.img)}
                    <Button onClick={toggleMode.bind(null, mode)}
                            className="{activeModes.indexOf(mode) !== -1 ? 'dark:bg-gray-900 bg-gray-400' : ''} relative flex mr-2 sm:my-1 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-400 shadow-none">
                        <span class="ml-6 whitespace-no-wrap">{mode.title}</span>
                        <img class="absolute h-5 w-5 mr-1" alt="" src="{mode.img}"/>
                    </Button>
                {/each}
            {/if}
        </div>
        <div style="max-height: 75vh;"
             class="scrollbar-none overflow-scroll overflow-x-hidden scrolling-touch pb-56 rounded-lg">
            {#if showMap}
                <Map lat={monitor.stop.location.latitude} lng={monitor.stop.location.longitude} />
            {:else if displayedDepartures}
                {#each displayedDepartures as stopover (stopover.tripId + stopover.direction + stopover.line.fahrtNr + stopover.line.name + stopover.when + stopover.platform)}
                    <Departure {stopover} {city} {stopId}/>
                {/each}
            {/if}
        </div>
    </div>
</div>