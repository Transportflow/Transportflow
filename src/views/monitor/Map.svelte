<script>
    import {onMount} from "svelte";
    import Spinner from 'svelte-spinner';

    export let lng;
    export let lat;

    const streetsTheme = "mapbox/streets-v11" // mapbox/streets-v11
    const darkTheme = "mapbox/dark-v9" // adwirawien/ckg6twnyu4xlz19qk0qwiw80i

    let imageSource = ""

    function updateImageSource() {
        let dark = false;
        if (document.documentElement.classList.contains("mode-dark")) {
            dark = true;
        }

        imageSource = "https://api.mapbox.com/styles/v1/" + (dark ? darkTheme : streetsTheme) + "/static/pin-s-circle+FF8167(" + lng + "," + lat + ")/" + lng + "," + lat + ",14.25/512x512@2x?access_token=" + process.env.MAPBOX_TOKEN

        try {
            mapImage.src = imageSource
        } catch (ignore) {

        }
    }

    let loading = true;
    let mapImage;

    onMount(() => {
        updateImageSource()

        mapImage.onload = () => {
            loading = false;
        };
    })

    window.onstorage = () => {
        updateImageSource()
    };

    function openMapApp() {
        const url = "http://maps.apple.com/?daddr=" + lat + "," + lng + "&dirflg=w";
        window.open(url, "_blank");
    }
</script>

<div class="flex justify-center items-center">
    {#if loading}
        <Spinner
                size="45"
                speed="1000"
                color="#85cb37"
                thickness="2"
                gap="40"
        />
    {/if}
        <img alt="map location" class="rounded-lg cursor-pointer" src={imageSource} bind:this={mapImage}
             on:click={openMapApp}/>
</div>
