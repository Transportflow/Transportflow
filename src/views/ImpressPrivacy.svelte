<script>
  import BackButton from "../components/BackButton.svelte";
  import { locale, _ } from "svelte-i18n";
  import German from "./privacy/German.svelte";
  import English from "./privacy/English.svelte";
  import GermanImpress from "./impress/German.svelte";
  import EnglishImpress from "./impress/English.svelte";

  let responsible = process.env.RESPONSIBLE || "---";
  let hoster = process.env.HOSTER || "---";

  let site = "impress";
</script>

<svelte:head>
  <meta name="robots" content="noindex" />
</svelte:head>

<div
  class="w-full h-screen p-4 pt-12 overflow-y-scroll scrolling-touch sm:p-24 sm:pl-40 sm:pt-20 dark:text-gray-200"
>
  <BackButton />

  <button class="mb-10" on:click={() => (site = site === "impress" ? "privacy" : "impress")}
    >{"-> "}{site === "impress" ? $_('utility.see_privacy') : $_('utility.see_impress')}</button
  >

  {#if site === "impress"}
  <div class="prose bg-gray-100 select-none">
    {#if $locale === "de"}
      <GermanImpress {responsible} />
    {:else}
      <EnglishImpress {responsible} />
    {/if}
  </div>
  {/if}
  {#if site === "privacy"}
  <div class="prose bg-gray-100 select-none">
    {#if $locale === "de"}
      <German {responsible} {hoster} />
    {:else}
      <English {responsible} {hoster} />
    {/if}
  </div>
  {/if}
</div>
