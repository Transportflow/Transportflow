<script>
    import {link} from "svelte-routing";
    import Spinner from 'svelte-spinner';
    import {getUpcomingStops} from "../../../data";
    import {relativeTime, relativeToTime, clockTime} from "../../../data"
    import {_} from "svelte-i18n";

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
        <span class="my-auto">{$_('departures.loading_stop_information')}</span></p>
{:else}
    <div class="flex flex-no-wrap pt-2 pb-1 overflow-scroll overflow-y-hidden scrolling-touch scrollbar-none">
        {#each upcoming as stopover}
            <div style="margin-right: {(stopover.stop.products ? stopover.stop.products.length*1.5 : 3)/2}rem;"
                 class="text-left">
                <div class="h-5 whitespace-nowrap">
                    {#if stopover.stop.products}
                        {#each stopover.stop.products as product}
                            {#if product.img !== ""}
                                <img src={product.img} alt="" class="inline-block w-4 h-4 mr-1"/>
                            {/if}
                        {/each}
                    {/if}
                </div>
                <a use:link href="/monitor/{city}/{stopover.stop.id}"
                   class="whitespace-nowrap">{stopover.stop.name}</a>
                <p class="whitespace-nowrap">{relativeToTime(stopover.arrival || stopover.departure, new Date(Date.parse(relativeTo + " UTC")))} · {clockTime(stopover.arrival || stopover.departure)}</p>
            </div>
        {/each}
    </div>
{/if}
