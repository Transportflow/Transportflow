<script>
    import {fade} from "svelte/transition";
    import axios from "axios";

    export let modalOpen;

    function closeModalInWhitespace(event) {
        if (event.target.id === "bg")
            modalOpen = false;
    }

    function closeModal() {
        modalOpen = false;
    }

    let regions = undefined;
    axios.get("http://192.168.1.2:4567/providers").then(res => {
        regions = res.data;
    });
</script>

{#if modalOpen}
    <div transition:fade on:click={closeModalInWhitespace} id="bg" style="background-color: rgba(20, 20, 20, 0.6);"
         class="fixed w-full h-full top-0 left-0 flex items-center justify-center overflow-scroll">
        <div class="m-5 w-full sm:max-w-sm rounded-lg p-5 bg-gray-100 dark:bg-gray-700 shadow-lg">
            <div class="flex justify-between mb-2">
                <h1 class="text-gray-900 dark:text-gray-100 text-lg font-semibold">Region auswählen</h1>
                <button on:click={closeModal}>
                    <ion-icon name="close-circle-outline" class="my-auto dark:text-white  pb-1 text-2xl"></ion-icon>
                </button>
            </div>
            <input class="rounded p-1 mb-2 shadow-xs bg-gray-300 dark:bg-gray-600 dark:text-gray-100 transition duration-300 focus:outline-none"
                   placeholder="Region suchen"/>
            <div>
                {#if regions !== undefined}
                    {#each regions as {regionName, image, textColor}}
                        <div class="pb-1 group cursor-pointer">
                            <div class="rounded transition-all duration-200 h-10 group-hover:h-32 overflow-hidden">
                                <div class="h-full"
                                     style="background: url({image}); background-size: cover; background-position: center;">
                                    <div class={"p-2 dark:bg-gray-800 dark:text-white h-full flex bg-white group-hover:bg-transparent group-hover:text-"+textColor+" transition duration-150"}>
                                        <h3 class="mr-auto font-bold">{regionName}</h3>
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