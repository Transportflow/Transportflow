<script>
    import {onMount} from "svelte";
    import {Link} from "svelte-routing";
    import BackButton from "../components/BackButton.svelte";
    import Button from "../components/Button.svelte";
    import Description from "../components/Description.svelte";
    import Title from "../components/Title.svelte";
    import InputField from "../components/InputField.svelte";
    import Spinner from 'svelte-spinner';
    import ErrorModal from "../utils/ErrorModal.svelte";
    import {getNearbyStops, getStops} from "../data";
    import OnboardingCheck from "../components/OnboardingCheck.svelte";
    import RegionModal from "../components/RegionModal.svelte";

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
            processStops(res)
            stops = res;
            loading = false;
        })
    }

    function loadNearbyStops() {
        loading = true;
        navigator.geolocation.getCurrentPosition(function (location) {
            latitude = location.coords.latitude
            longitude = location.coords.longitude
            getNearbyStops(location.coords.latitude, location.coords.longitude, (err) => {
                error = null;
                error = err;
                loading = false;
            }).then(res => {
                processStops(res)
                nearbyStops = res;
                stops = nearbyStops;
                loading = false;
            })
        }, function (err) {
            loading = false;
        })

    }

    function processStops(stops) {
        stops.forEach(stop => {
            if (stop.location === undefined)
                return

            const stopLatitude = stop.location.latitude
            const stopLongitude = stop.location.longitude

            const lat1 = latitude * Math.PI / 180; // φ, λ in radians
            const lat2 = stopLatitude * Math.PI / 180;
            const deltaLon = (stopLongitude - longitude) * Math.PI / 180;

            const y = Math.sin(deltaLon) * Math.cos(lat2);
            const x = Math.cos(lat1) * Math.sin(lat2) -
                Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);
            const gamma = Math.atan2(y, x);
            stop.bearing = (gamma * 180 / Math.PI + 360) % 360
        })
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


        if ("DeviceOrientationEvent" in window) {
            console.log("Supports Orientation! 🎉")

            requestPermission().then(result => {
                console.log(result)
                console.log("Adding event listener")
                window.addEventListener('deviceorientation', function (event) {
                    console.log(event)
                    compass = event.webkitCompassHeading || event.alpha
                });
            }).catch(err => {
                console.log("Permission failed!")
            })
        }
    })

    let latitude = null;
    let longitude = null;
    let compass = null;
    let modalOpen = false;
    let regionName = localStorage.getItem("region") || "N/A";

    $: {
        regionName;

        if (inputValue === "")
            loadNearbyStops();
        else
            loadStops(inputValue);
    }

    function openModal() {
        modalOpen = false;
        modalOpen = true;
    }

    async function requestPermission() {
        return new Promise((resolve, reject) => {
            if (DeviceOrientationEvent.requestPermission) {
                DeviceOrientationEvent.requestPermission().then(value => {
                    resolve(value)
                }).catch(err => {
                    reject(err)
                })
            } else {
                resolve(null)
            }
        })
    }
</script>
<main>
    <OnboardingCheck/>
    <BackButton backTo="/">
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
    <Description>Region:
        <button on:click={openModal}><b>{regionName}</b></button>
    </Description>
    <RegionModal bind:regionProp={regionName} modalOpen={modalOpen}/>

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
                                    {#if product.img !== ""}
                                        <img class="h-5 w-5 mr-1" src={product.img} alt=""/>
                                    {/if}
                                {/each}
                            </div>
                        {/if}
                        <p style="font-size: 0.965rem;">{stop.name}</p>
                    </div>
                    <p style="font-size: 0.965rem;"
                       class="mt-auto text-gray-600">
                        {stop.distance > 0 ? stop.distance + "m" : ""}
                        {#if compass != null}
                            <ion-icon name="navigate"
                                      style={"transform: rotate("+ ((stop.bearing-compass) -45) + "deg)"}></ion-icon>
                        {/if}
                    </p>
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