<script>
    import BackButton from "../components/BackButton.svelte";
    import Description from "../components/Description.svelte";
    import Title from "../components/Title.svelte";
    import InputField from "../components/InputField.svelte";

    function handleInput(event) {
        console.log(event.target.value)
    }
</script>
<main>
    <BackButton/>

    <Title className="flex"><img class="mr-2" style="margin-top: 0.2rem;height: 1.75rem;" src="https://twemoji.maxcdn.com/v/12.1.4/72x72/1f687.png" alt=""> Monitor</Title>
    <Description>Echtzeit Fahrplanauskunft.</Description>

    <InputField placeholder="Haltestelle" onInput={handleInput}/>
</main>