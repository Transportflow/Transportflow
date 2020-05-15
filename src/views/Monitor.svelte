<script>
    import BackButton from "../components/BackButton.svelte";
    import Description from "../components/Description.svelte";
    import Title from "../components/Title.svelte";
    import InputField from "../components/InputField.svelte";
    import {Circle3} from "svelte-loading-spinners";

    function handleInput(event) {
        console.log(event.target.value);

        loading = true;

        setTimeout(loading = false, 1000)
    }

    let loading = false;
</script>
<main>
    <BackButton/>

    TODO: Implement loading stuff
    <Title className="flex">
        {#if !loading}
            <img class="mr-2" style="margin-top: 0.2rem;height: 1.75rem;"
                 src="https://twemoji.maxcdn.com/v/12.1.4/72x72/1f687.png" alt="">
        {:else}
            <Circle3 size="30" color="#FF3E00" unit="px"/>
        {/if}
        <span> Monitor</span>
    </Title>
    <Description>Echtzeit Fahrplanauskunft.</Description>

    <InputField placeholder="Haltestelle" onInput={handleInput}/>
    <input on:input={handleInput}/>
</main>