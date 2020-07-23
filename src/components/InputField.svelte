<script>
    export let placeholder;
    export let onInput;
    export let value = "";
</script>

<input on:input={onInput} bind:value={value} {placeholder} class="w-full bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-400 p-2 rounded transition-bg duration-200 focus:outline-none"/>
