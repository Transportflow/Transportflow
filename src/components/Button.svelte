<script>
    export let onClick;
    export let className = "";
    export let style = "";
</script>

<button on:click={onClick}
        {style}
        class={"px-4 py-2 rounded shadow transition-bg duration-200 font-medium text-sm text-gray-100 focus:outline-none " + className}>
    <slot/>
</button>