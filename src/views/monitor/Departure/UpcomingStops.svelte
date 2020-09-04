<script>
    import {link} from "svelte-routing";
    import Spinner from 'svelte-spinner';
    import {getUpcomingStops} from "../../../data";
    import {relativeTime, clockTime} from "../../../data"

    export let city, tripId, currentStopId, lineName, when, relativeTo, relativeWhen;
    let error = null;
    let loading = true;
    let upcoming = [];

    $: {
        Object.assign("", relativeWhen);
        loadStops();
    }

    function loadStops() {
        loading = true;
        getUpcomingStops(city, tripId, currentStopId, lineName, when, relativeTo, (err) => {
            error = err;
            loading = false;
        }).then((res) => {
            upcoming = res;
            loading = false;
        })
    }
</script>

{#if error}
    {@html error}
{:else if loading}
    <p class="flex">
        <Spinner size="30" speed="1000" color="#85cb37" thickness="2" gap="40"/>
        <span class="my-auto">Lade Haltestelleninformationen</span></p>
{:else}
    <div class="flex flex-no-wrap overflow-scroll overflow-y-hidden scrollbar-none scrolling-touch pt-2 pb-1">
        {#each upcoming as stopover}
            <div style="margin-right: {(stopover.stop.products ? stopover.stop.products.length : 3)/2}rem;"
                 class="text-left">
                <div class="whitespace-no-wrap h-5">
                    {#if stopover.stop.products}
                        {#each stopover.stop.products as product}
                            {#if product.img !== ""}
                                <img src={product.img} alt="" class="inline-block h-4 w-4 mr-1"/>
                            {/if}
                        {/each}
                    {/if}
                </div>
                <a use:link href="/monitor/{city}/{stopover.stop.id}"
                   class="whitespace-no-wrap">{stopover.stop.name}</a>
                <p class="whitespace-no-wrap">{relativeTime(stopover.departure)} · {clockTime(stopover.departure)}</p>
            </div>
        {/each}
    </div>
{/if}