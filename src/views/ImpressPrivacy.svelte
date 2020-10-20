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

<div class="p-4 pt-12 sm:p-24 sm:pl-40 sm:pt-20 w-full h-screen dark:text-gray-200 overflow-y-scroll scrolling-touch">
    <BackButton/>

    {#if $locale === "de"}
        <German {responsible} {street} {city} {telephone} {mail}/>
    {:else}
        <English {responsible} {street} {city} {telephone} {mail}/>
    {/if}
</div>
