<script>
    import {fade} from "svelte/transition";

    export let error = null;
    export let shown;

    function closeModal(event) {
        event.preventDefault();
        if (event.target.id === "close")
            shown = false
    }
</script>

{#if error && shown}
    <div transition:fade="{{ duration: 200 }}" on:click={closeModal} id="close"
         style="background-color: rgba(20, 20, 20, 0.6);z-index:300;"
         class="fixed w-full h-full top-0 left-0 flex items-center justify-center overflow-scroll">
        <div class="m-4 w-full sm:max-w-sm rounded-lg p-5 bg-white dark:bg-gray-800 transition duration-200 shadow-lg">
            <div class="flex justify-between mb-2">
                <h1 class="text-gray-900 dark:text-gray-100 text-lg font-semibold">🤖 Fehler</h1>
                <button on:click={closeModal} id="close">
                    <ion-icon name="close-circle-outline" id="close"
                              class="my-auto dark:text-white pb-1 text-2xl"></ion-icon>
                </button>
            </div>
            <p class="dark:text-white">{@html error}</p>
            <p class="text-gray-600 dark:text-gray-500 text-sm italic mt-3">Für weitere Hilfe kontaktieren Sie bitte <a href="mailto:hello@transportflow.online">hello@transportflow.online</a></p>
        </div>
    </div>
{/if}