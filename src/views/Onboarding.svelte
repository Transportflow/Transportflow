<script>
    import {fade} from "svelte/transition";
    import {onMount} from "svelte";
    import {Link} from "svelte-routing";
    import RegionModal from "../components/RegionModal.svelte";

    let bgs = [
        "vienna",
        "berlin",
        "vienna-2"
    ]

    let regionName;
    let modalOpen = false;

    function openModal() {
        modalOpen = false;
        modalOpen = true;
    }

    onMount(() => {
        loadRandomWallpaper()
    })

    function loadRandomWallpaper() {
        try {
            let selection = [];
            bgs.forEach((bg) => {
                if (document.getElementById("onboarding").classList.contains("bg-" + bg))
                    document.getElementById("onboarding").classList.remove("bg-" + bg)
                else
                    selection.push(bg);
            })
            document.getElementById("onboarding").classList.add("bg-" + selection[Math.round(Math.random() * (selection.length - 1))])
        } catch (e) {
            
        }
        setTimeout(loadRandomWallpaper, 7000)
    }
</script>

<div id="onboarding" class="w-screen h-screen"
     transition:fade="{{ duration: 100 }}">

    <div class="h-full flex justify-center items-center">
        <div class="pb-32">
            {#if !regionName}
                <img class="w-12 h-12 mx-auto" alt="logo" src="https://twemoji.maxcdn.com/v/12.1.4/svg/1f99c.svg"/>
                <h1 class="text-center text-4xl text-white font-bold">Transportflow</h1>
                <p class="text-white text-center">ÖPNV Abfahrtsmonitor.<br/>Schnell und einfach.</p>
                <button on:click={openModal} style="background: #0074D9; border-radius: 0.75rem;"
                        class="primary-button mt-4 w-full text-white py-2 px-auto hover:shadow-lg transition duration-200">
                    Einrichten ->
                </button>
            {:else}
                <div class="text-center px-auto">
                    <ion-icon class="text-white w-12 h-12" name="checkmark-circle"></ion-icon>
                </div>
                <h1 class="text-center text-4xl text-white font-bold">Fertig!</h1>
                <p class="text-white text-center">Transportflow ist eingerichtet.</p>
                <Link to="/">
                    <button style="background: #0074D9; border-radius: 0.75rem;"
                            class="primary-button mt-4 w-full text-white py-2 px-auto hover:shadow-lg transition duration-200">
                        Los geht's ->
                    </button>
                </Link>
            {/if}
        </div>
    </div>
    <Link to="impressprivacy">
        <p class="text-gray-200 opacity-50 hover:opacity-100 absolute bottom-0 text-center w-full mb-4 transition duration-1000">Impressum & Datenschutz</p>
    </Link>
    <RegionModal bind:regionProp={regionName} modalOpen={modalOpen}/>
</div>

<style>
    .primary-button {
        box-shadow: 0 3px 24px 0 rgba(0, 116, 217, 0.3);
    }

    .primary-button:hover {
        box-shadow: 0 3px 24px 2px rgba(0, 116, 217, 0.4);
    }

    #onboarding {
        background-color: #1a202c;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-transition: background-image 0.5s;
        -moz-transition: background-image 0.5s;
        -o-transition: background-image 0.5s;
        transition: background-image 0.5s;
    }

    
</style>
