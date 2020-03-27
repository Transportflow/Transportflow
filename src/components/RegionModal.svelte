<script>
    import {fade} from "svelte/transition";
    import axios from "axios";

    export let modalOpen;
    export let regionProp = localStorage.getItem("region");

    function closeModalInWhitespace(event) {
        if (event.target.id === "bg")
            modalOpen = false;
    }

    function closeModal() {
        modalOpen = false;
    }

    let lastClicked = regionProp;
    function regionClick(event) {
        regionProp = event.target.id;
        localStorage.setItem("region", event.target.id);

        if (lastClicked === event.target.id) {
            lastClicked = "";
            closeModal();
            return;
        }

        lastClicked = event.target.id;
    }

    let regions = undefined;
    let allRegions = undefined;
    axios.get("http://192.168.1.3:4567/providers").then(res => {
        allRegions = res.data;
        regions = allRegions;
    });

    let search = "";
    $: if (search !== "") {
        regions = [];
        if (allRegions !== undefined) {
            allRegions.forEach(region => {
                if (region.regionName.toLowerCase().includes(search.toLowerCase()))
                    regions.push(region)
            })
        }
    } else {
        regions = allRegions;
    }
</script>

{#if modalOpen}
    <div transition:fade="{{ duration: 200 }}" on:click={closeModalInWhitespace} id="bg" style="background-color: rgba(20, 20, 20, 0.6);"
         class="fixed w-full h-full top-0 left-0 flex items-center justify-center overflow-scroll">
        <div class="m-5 w-full sm:max-w-sm rounded-lg p-5 bg-white dark:bg-gray-700 shadow-lg">
            <div class="flex justify-between mb-2">
                <h1 class="text-gray-900 dark:text-gray-100 text-lg font-semibold">Region auswählen</h1>
                <button on:click={closeModal}>
                    <ion-icon name="close-circle-outline" class="my-auto dark:text-white pb-1 text-2xl"></ion-icon>
                </button>
            </div>
            <input bind:value={search} class="rounded p-1 shadow-xs bg-gray-300 dark:bg-gray-600 dark:text-gray-100 transition duration-300 focus:outline-none"
                   placeholder="Region suchen"/>
            <hr class="border-2 rounded border-gray-300 dark:border-gray-600 my-2"/>
            <div>
                {#if regions !== undefined}
                    {#each regions as {regionName, image, textColor}}
                        <div id={regionName} on:click={regionClick} class="pb-1 group cursor-pointer">
                            <div id={regionName} class={"rounded transition-all duration-200 h-10 group-hover:h-32 overflow-hidden " + (lastClicked === regionName ? "hover-shadow-outline-blue" : "")}>
                                <div id={regionName} class="h-full"
                                     style={"background: url("+image+"); background-size: cover; background-position: center;"}>
                                    <div id={regionName} class={"p-2 dark:text-white h-full flex "+(regionProp !== regionName ? "bg-gray-200 dark:bg-gray-800" : "bg-button-blue text-white") +" group-hover:bg-transparent group-hover:text-"+textColor+" transition duration-150"}>
                                        <h3 id={regionName} class="mr-auto font-bold">{regionName}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/each}
                {:else}
                    <p>Loading....</p>
                {/if}
            </div>
        </div>
    </div>
{/if}