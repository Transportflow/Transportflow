<script>
    import BackButton from "../components/BackButton.svelte";
    import {locale} from "svelte-i18n";
    import German from "./privacy/German.svelte";
    import English from "./privacy/English.svelte";

    let responsible = process.env.IMPRESS_RESPONSIBLE || "Max Mustermann"
    let street = process.env.IMPRESS_STREET || "Neuhauser Straße 1b"
    let city = process.env.IMPRESS_CITY || "Oberunterbach"
    let telephone = process.env.IMPRESS_PHONE || "+49 123 4567123"
    let mail = process.env.IMPRESS_MAIL || "muster@mann.de"
</script>

<svelte:head>
  <meta name="robots" content="noindex">
</svelte:head>

<div class="w-full h-screen p-4 pt-12 overflow-y-scroll scrolling-touch sm:p-24 sm:pl-40 sm:pt-20 dark:text-gray-200">
    <BackButton/>

    {#if $locale === "de"}
        <German {responsible} {street} {city} {telephone} {mail}/>
    {:else}
        <English {responsible} {street} {city} {telephone} {mail}/>
    {/if}
</div>
