<script>
    import {fade} from "svelte/transition";
    import {getDepartures} from "../../data";
    import Spinner from 'svelte-spinner';
    import ErrorModal from "../../utils/ErrorModal.svelte";
    import BackButton from "../../components/BackButton.svelte";
    import Title from "../../components/Title.svelte";
    import Departure from "./Departure.svelte";

    let loading = true;
    let error = null;
    export let city;
    export let stopId;

    let monitor = {};

    getDepartures(city, stopId, (err) => {
        error = null;
        error = err;
        loading = false;
    }).then((res) => {
        loading = false;
        monitor = res;
    })
</script>

<ErrorModal shown={error != null} {error}/>
<div class="overflow-hidden absolute w-full p-4 pt-12 sm:p-24 sm:pl-40 sm:pt-20" transition:fade="{{ duration: 100 }}">
    <div class="sm:max-w-md">
        <BackButton/>

        {#if !loading && monitor != null && monitor.stop != null && monitor.stop.products != null}
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
                <span class="py-1"> Lade...</span>
            {:else if monitor != null && monitor.stop != null}
                <span class="py-1"> {monitor.stop.name}</span>
            {:else}
                <span class="py-1"> Fehler</span>
            {/if}
        </Title>
        <div style="max-height: 75vh;" class="scrollbar-none overflow-scroll overflow-x-hidden mt-3 pb-56 rounded-lg">
            {#if !loading && monitor != null && monitor.stopovers != null}
                {#each monitor.stopovers as stopover}
                    <Departure {stopover}/>
                {/each}
            {/if}
        </div>
    </div>
</div>