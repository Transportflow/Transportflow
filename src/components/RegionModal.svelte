<script>
    import {fade} from "svelte/transition";
    import {getRegions} from "../data";
    import ErrorModal from "../utils/ErrorModal.svelte";
    import InputField from "./InputField.svelte";
    import Divider from "./Divider.svelte";
    import Description from "./Description.svelte";
    import InformationModal from "./InformationModal.svelte";

    let addRegionVisible = false;
    function showRegionSuggestion() {
        closeModal();
        addRegionVisible = false;
        addRegionVisible = true;
    }

    let errorVisible = true;
    export let modalOpen;
    export let regionProp = localStorage.getItem("region");

    function closeModalInWhitespace(event) {
        if (event.target.id === "bg")
            closeModal();
    }

    function closeModal() {
        search = "";
        regions = allRegions;
        modalOpen = false;
    }

    let lastClicked = regionProp;

    function regionClick(event) {
        if (event.target.id === "")
            return;
        regionProp = event.target.id;
        localStorage.setItem("region", event.target.id);

        if (lastClicked === event.target.id) {
            lastClicked = "";
            closeModal();
            return;
        }

        lastClicked = event.target.id;
    }

    let error = undefined;
    let regions, allRegions = undefined;

    getRegions((err) => {
        error = err;
    }).then((res) => {
        regions = res;
        allRegions = res;
    });

    $: if (!!modalOpen && !!error) {
        errorVisible = true;
        closeModal();
    }

    let search = "";

    function searchRegion(event) {
        search = event.target.value
        if (search !== "") {
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
    }
</script>

<InformationModal shown={addRegionVisible} title="🗺 Region vorschlagen" text="<b>Transportflow ist nicht in Ihrer Region verfügbar?</b><br/>Schreiben Sie uns einfach eine Mail, in der Sie erläutern, warum wir Ihre Region hinzufügen sollten 📫 <br/><br/><i>hello@transportflow.online</i>" />
<ErrorModal {error} shown={errorVisible}/>
{#if modalOpen}
    <div transition:fade="{{ duration: 200 }}" on:click={closeModalInWhitespace} id="bg"
         style="background-color: rgba(20, 20, 20, 0.6);"
         class="fixed w-full h-full top-0 left-0 flex items-center justify-center overflow-auto">
        <div class="m-4 w-full sm:max-w-sm rounded-lg p-3 bg-white dark:bg-gray-800 transition-all duration-200 shadow-lg">
            <div class="px-2 pt-2">
                <div class="flex justify-between mb-2">
                    <h1 class="text-gray-900 dark:text-gray-100 text-lg font-semibold">Region auswählen</h1>
                    <button on:click={closeModal}>
                        <ion-icon name="close-circle-outline" class="my-auto dark:text-white pb-1 text-2xl"></ion-icon>
                    </button>
                </div>
                <InputField placeholder="Suche" onInput={searchRegion}/>
                <Divider className="mt-2"/>
            </div>
            <div style="max-height: 300px;" class="overflow-y-scroll p-2 transition-all duration-200">
                {#if regions !== undefined}
                    {#each regions as {regionName, image, textColor}}
                        <div id={regionName} on:click={regionClick} class="group cursor-pointer">
                            <div id={regionName}
                                 class={"mb-1 rounded transition-all duration-200 h-10 group-hover:h-32 overflow-hidden " + (lastClicked === regionName ? "hover-shadow-outline-blue" : "")}>
                                <div id={regionName} class="h-full"
                                     style={"background: url("+image+"); background-size: cover; background-position: center;"}>
                                    <div id={regionName}
                                         class={"p-2 dark:text-white h-full flex "+(regionProp !== regionName ? "bg-white dark:bg-gray-800" : "bg-button-blue text-white") +" group-hover:bg-transparent group-hover:text-"+textColor+" transition duration-200"}>
                                        <h3 id={regionName} class="mr-auto font-bold">{regionName.split("(")[0]} <span id={regionName} class="opacity-0 group-hover:opacity-100">{!!regionName.split("(")[1] ? "("+regionName.split("(")[1] : ""}</span></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/each}
                    {#if regions.length === 0}
                        <button on:click={showRegionSuggestion} class="p-2 w-full rounded dark:text-white h-full flex bg-white hover:bg-gray-300 dark-hover:bg-gray-900 dark:bg-gray-800 transition duration-200">
                            <ion-icon name="add-circle-outline" class="mr-1" style="zoom: 1.5;"></ion-icon> Region vorschlagen
                        </button>
                    {/if}
                {:else}
                    <Description>Loading....</Description>
                {/if}
            </div>
        </div>
    </div>
{/if}