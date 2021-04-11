<script>
    import {onMount} from "svelte";
    import UpcomingStops from "./UpcomingStops.svelte";
    import Wagenreihung from "./Wagenreihung.svelte";
    import {relativeTime, clockTime} from "../../../data";
    import {_} from "svelte-i18n";

    export let city;
    export let stopId;
    export let stopover;

    let loadData = false;
    let open = false;

    function toggleOpen() {
        open = !open;
        if (open)
            loadData = true;
    }

    onMount(() => {
        if (stopover.cancelled) {
            open = true;
        }
    })
</script>

<div class="p-2 pl-3 mb-2 overflow-hidden font-medium text-gray-900 transition duration-200 bg-gray-200 rounded-lg cursor-pointer select-none trans-bg dark:bg-gray-900 dark:text-gray-100 font-inter"
     on:click={toggleOpen}>
    <div
            class={(open ? "opacity-100 pb-1" : "opacity-0") + " overflow-hidden font-semibold text-sm tracking-wide uppercase text-center trans"}
            style="transition: all 0.25s ease-in-out; max-height: {open ? '60px' : '0'}">
        {#if stopover.cancelled}
            <span>{$_("departures.cancelled")}</span>
        {:else}
            {#if stopover.delay == "0"}
                <span>{$_('departures.in_time')}</span>
            {:else if parseInt(stopover.delay) > 0}
                <span>+{stopover.delay} min {$_('departures.too_late')}</span>
            {:else}
                <span>{stopover.delay} min {$_('departures.too_early')}</span>
            {/if}
            {#if stopover.platform}
                <span>| {$_('departures.platform')} {stopover.platform}</span>
            {/if}
        {/if}
    </div>
    <div class="flex justify-between flex-shrink rounded-lg">
        <div class="w-3/4 my-auto sm:ml-1">
            <p class="flex items-center text-2xl font-semibold leading-tight">
                {#if stopover.line.product.img !== ""}
                    <img
                            style="height:26px;margin-right:0.5rem;"
                            alt=""
                            src={stopover.line.product.img}
                    />
                {/if}
                <span class="pt-1 truncate">{stopover.line.name}</span>
            </p>
            <p class="text-lg font-normal text-gray-800 truncate dark:text-gray-200">
                <span>{stopover.direction}</span>
            </p>
        </div>
        <div class="object-right w-1/4 p-2 transition duration-200 bg-gray-300 rounded-lg sm:w-1/5 md:w-1/6 dark:bg-gray-800 sm:m-1">
            <p class="leading-tight text-center">
                <span class="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    {relativeTime(stopover.when).replace("+", "")}
                </span>
                <br/>
                <span class="text-base font-thin text-gray-800 dark:text-gray-200">
                    {clockTime(stopover.when)}
                </span>
            </p>
        </div>
    </div>
    <div class={(open ? "opacity-100" : "opacity-0") + " overflow-hidden text-sm tracking-wide text-center trans"}
         style="transition: all 0.25s ease-in-out; max-height: {open ? '200px' : '0'}">
        {#if !stopover.cancelled && loadData}
            {#if stopover.line.mode === "train" && stopover.line.product.name !== "tram"}
                <Wagenreihung lineName={stopover.line.name} plannedDeparture={stopover.plannedWhen}/>
            {/if}
            <UpcomingStops {city}
                           tripId={stopover.tripId}
                           currentStopId={stopId}
                           lineName={stopover.line.name}
                           when={stopover.rawWhen || 0}
                           relativeTo={stopover.when}
                           relativeWhen={stopover.relativeWhen}
            />
        {/if}
    </div>
</div>
