<script>
    export let onClick;
    export let text;
</script>

<button on:click={onClick}
        class="px-4 py-2 rounded shadow transition-bg duration-200 font-medium text-sm text-gray-100 bg-button-blue hover:shadow-outline focus:outline-none active:bg-blue-700">
    {text}
</button>