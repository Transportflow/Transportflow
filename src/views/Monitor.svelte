<script>
    import BackButton from "../components/BackButton.svelte";
    import Description from "../components/Description.svelte";
    import Title from "../components/Title.svelte";
</script>
<main>
    <BackButton/>

    <Title className="flex mt-4"><img class="mr-2" style="margin-top: 0.05rem; height: 1.75rem;" src="https://twemoji.maxcdn.com/v/12.1.4/72x72/1f6f8.png"> Monitor</Title>
    <Description>Echtzeit Fahrplanauskunft.</Description>

    <input class="w-full bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-400 p-2 rounded transition-bg duration-200 focus:outline-none" placeholder="Haltestelle"/>
</main>