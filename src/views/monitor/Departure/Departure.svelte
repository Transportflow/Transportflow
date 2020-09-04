<script>
    import {onMount} from "svelte";
    import UpcomingStops from "./UpcomingStops.svelte";
    import Wagenreihung from "./Wagenreihung.svelte";
    import {relativeTime, clockTime} from "../../../data";

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

<div class="trans-bg bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-medium font-inter rounded-lg overflow-hidden mb-2 p-2 pl-3 select-none cursor-pointer transition duration-200"
     on:click={toggleOpen}>
    <div
            class={(open ? "opacity-100 pb-1" : "opacity-0") + " overflow-hidden font-semibold text-sm tracking-wide uppercase text-center trans"}
            style="transition: all 0.25s ease-in-out; max-height: {open ? '60px' : '0'}">
        {#if stopover.cancelled}
            <span>Fällt aus</span>
        {:else}
            {#if stopover.delay == "0"}
                <span>Pünktlich</span>
            {:else if parseInt(stopover.delay) > 0}
                <span>+{stopover.delay} min verspätung</span>
            {:else}
                <span>{stopover.delay} min zu früh</span>
            {/if}
            {#if stopover.platform}
                <span>| Steig {stopover.platform}</span>
            {/if}
        {/if}
    </div>
    <div class="flex flex-shrink justify-between rounded-lg">
        <div class="w-3/4 sm:ml-1 my-auto">
            <p class="font-semibold text-2xl flex items-center leading-tight">
                {#if stopover.line.product.img !== ""}
                    <img
                            style="height:26px;margin-right:0.5rem;"
                            alt=""
                            src={stopover.line.product.img}
                    />
                {/if}
                <span class="truncate pt-1">{stopover.line.name}</span>
            </p>
            <p class="text-lg font-normal truncate text-gray-800 dark:text-gray-200">
                <span>{stopover.direction}</span>
            </p>
        </div>
        <div class="w-1/4 sm:w-1/5 md:w-1/6 bg-gray-400 dark:bg-gray-800 rounded-lg object-right p-2 sm:m-1 transition duration-200">
            <p class="text-center leading-tight">
                <span class="font-semibold text-2xl text-gray-800 dark:text-gray-200">
                    {relativeTime(stopover.when).replace("+", "")}
                </span>
                <br/>
                <span class="font-thin text-gray-800 dark:text-gray-200 text-base">
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