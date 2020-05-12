<script>
    import Button from "./Button.svelte";

    function goBack() {
        window.history.back();
    }
</script>

<Button onClick={goBack} className="bg-gray-200 dark:bg-gray-800 dark-hover:bg-gray-900 hover:bg-gray-300 text-gray-700 dark:text-gray-400 shadow-none"><div class="flex"><ion-icon class="-ml-1 mr-1 my-auto text-gray-900 dark:text-gray-400" name="chevron-back-outline"></ion-icon> Zurück</div></Button>
