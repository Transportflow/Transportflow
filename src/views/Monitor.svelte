<script>
    import {Link} from "svelte-routing";
    import {onMount} from "svelte";
    import BackButton from "../components/BackButton.svelte";
    import Button from "../components/Button.svelte";
    import Description from "../components/Description.svelte";
    import Title from "../components/Title.svelte";
    import InputField from "../components/InputField.svelte";
    import Spinner from 'svelte-spinner';
    import ErrorModal from "../utils/ErrorModal.svelte";
    import {getStops, getNearbyStops} from "../data";

    let inputValue = localStorage.getItem("lastStopSearch") || "";
    let loading = true;
    let error = null;
    let stops = [];
    let nearbyStops = [];

    function handleInput(event) {
        inputValue = event.target.value;
        localStorage.setItem("lastStopSearch", inputValue)
        loading = true;
        if (inputValue === "") {
            if (nearbyStops.length === 0)
                loadNearbyStops();
            stops = [];
            loading = false;
            return;
        }
        loadStops(event.target.value)
    }

    function loadStops(value) {
        getStops(value, (err) => {
            error = null;
            error = err;
            loading = false;
        }).then(res => {
            if (value !== inputValue)
                return;
            stops = res;
            loading = false;
        })
    }

    function loadNearbyStops() {
        loading = true;
        navigator.geolocation.getCurrentPosition(function (location) {
            getNearbyStops(location.coords.latitude, location.coords.longitude, (err) => {
                error = null;
                error = err;
                loading = false;
            }).then(res => {
                nearbyStops = res;
                stops = nearbyStops;
                loading = false;
            })
        });

    }

    function clearInput() {
        inputValue = "";
        localStorage.setItem("lastStopSearch", "");
        stops = [];
        loadNearbyStops();
    }

    onMount(() => {
        if (inputValue === "")
            loadNearbyStops();
        else
            loadStops(inputValue);
    })
</script>
<main>
    <BackButton>
        {#if inputValue.length > 0}
            <Button onClick={clearInput}
                    className="bg-gray-200 dark:bg-gray-800 dark-hover:bg-gray-900 hover:bg-gray-300 text-gray-700 dark:text-gray-400 shadow-none">
                <div class="flex">
                    <ion-icon style="zoom: 1;" class="my-auto -ml-1 mr-1 text-gray-900 dark:text-gray-400"
                              name="close"></ion-icon>
                    <p>Eingabe löschen</p>
                </div>
            </Button>
        {/if}
    </BackButton>

    <ErrorModal shown={error != null} {error}/>
    <Title className="flex">
        <img class="mr-2" style="margin-top: 0.2rem;height: 1.75rem;"
             src="https://twemoji.maxcdn.com/v/12.1.4/72x72/1f687.png" alt="">
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
        <span> Monitor</span>
    </Title>
    <Description>Region: <b>{localStorage.getItem("region") || "N/A"}</b></Description>

    <InputField value={inputValue} placeholder="Haltestelle" onInput={handleInput}/>

    <hr class="mt-2 mb-1 h-0 opacity-0"/>

    {#if (stops != null && inputValue !== "") || nearbyStops != null}
        {#each inputValue !== "" && stops != null ? stops : nearbyStops as stop}
            <Link to="/monitor/{localStorage.getItem('region')}/{stop.id}">
                <div class="my-1 px-2 py-1 rounded dark:text-gray-300 hover:bg-gray-300 dark-hover:bg-gray-900 transition duration-200 cursor-pointer select-none flex justify-between">
                    <div>
                        {#if stop.products}
                            <div class="flex pt-1">
                                {#each stop.products as product}
                                    <img class="h-5 w-5 mr-1" src={product.img} alt=""/>
                                {/each}
                            </div>
                        {/if}
                        <p style="font-size: 0.965rem;">{stop.name}</p>
                    </div>
                    <p style="font-size: 0.965rem;"
                       class="mt-auto text-gray-600">{stop.distance > 0 ? stop.distance + "m" : ""}</p>
                </div>
            </Link>
        {/each}
    {/if}
    {#if !loading && ((stops == null || stops.length < 1) && (nearbyStops == null || nearbyStops.length === 0))}
        <div class="w-full mt-12">
            <img class="mx-auto" alt="" src="/idyll.svg"/>
            <p class="text-center italic text-gray-700 dark:text-gray-300">Keine Haltestellen in der Nähe<br/>Genießen
                Sie die Idylle</p>
        </div>
    {/if}
</main>