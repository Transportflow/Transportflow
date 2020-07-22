<script>
    import {Link} from "svelte-routing";
    import {onMount} from "svelte";
    import BackButton from "../components/BackButton.svelte";
    import Description from "../components/Description.svelte";
    import Title from "../components/Title.svelte";
    import InputField from "../components/InputField.svelte";
    import Spinner from 'svelte-spinner';
    import ErrorModal from "../utils/ErrorModal.svelte";
    import {getStops, getNearbyStops} from "../data";

    function handleInput(event) {
        inputValue = event.target.value;
        loading = true;
        if (event.target.value === "") {
            stops = [];
            loading = false;
            return;
        }
        getStops(event.target.value, (err) => {
            error = null;
            error = err;
        }).then(res => {
            stops = res;
            loading = false;
        })
    }

    function loadNearbyStops() {
        navigator.geolocation.getCurrentPosition(function (location) {
            loading = true;
            getNearbyStops(location.coords.latitude, location.coords.longitude, (err) => {
                error = null;
                error = err;
            }).then(res => {
                nearbyStops = res;
                stops = nearbyStops;
                loading = false;
            })
        });
    }

    onMount(() => {
        loadNearbyStops();
    })

    let inputValue = "";
    let error = null;
    let loading = false;
    let stops = [];
    let nearbyStops = [];
</script>
<main>
    <BackButton/>

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

    <InputField placeholder="Haltestelle" onInput={handleInput}/>

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
                <p style="font-size: 0.965rem;" class="mt-auto text-gray-600">{stop.distance > 0 ? stop.distance + "m" : ""}</p>
            </div>
        </Link>
        {/each}
    {/if}

</main>