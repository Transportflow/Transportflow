<script>
    export let placeholder;
    export let onInput;
    export let value = "";
</script>

<input on:input={onInput} bind:value={value} {placeholder} class="w-full p-2 text-gray-700 duration-200 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400 transition-bg focus:outline-none"/>
