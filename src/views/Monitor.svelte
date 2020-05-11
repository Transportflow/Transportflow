<script>
    import BackButton from "../components/BackButton.svelte";
    import Description from "../components/Description.svelte";
    import Title from "../components/Title.svelte";
</script>
<main>
    <BackButton/>

    <Title>🚲 Monitor</Title>
    <Description>Echtzeit Fahrplanauskunft.</Description>

    <input class="w-full bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-400 p-2 rounded transition-bg duration-200 focus:outline-none" placeholder="Haltestelle"/>

    <p class="mt-12 text-lg">🚌🚍🚂🚇🚉🚀🛸</p>
</main>