<script>
    import {onMount} from "svelte";
    import Spinner from 'svelte-spinner';

    export let lng;
    export let lat;

    let imageSource = "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-circle+FF8167(" + lng + "," + lat + ")/" + lng + "," + lat + ",14.25/512x512@2x?access_token=" + process.env.MAPBOX_TOKEN

    let loading = true;
    let mapImage;

    onMount(() => {
        mapImage.onload = () => {
            loading = false;
        };
    })

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
    <img alt="map location" class="rounded-lg cursor-pointer" src={imageSource} bind:this={mapImage} on:click={openMapApp}/>
</div>