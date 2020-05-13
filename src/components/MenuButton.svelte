<script>
    export let icon;
    export let name;
    export let description = undefined;
    export let onClick = () => {};
</script>

<button on:click={onClick} class="w-full p-2 pl-3 transition-bg duration-200 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 dark-hover:bg-gray-900 hover:bg-gray-300 dark-active:bg-black focus:outline-none active:bg-gray-400">
    <div class="flex items-center">
        <ion-icon style="font-size: 24px" name={icon}></ion-icon>
        <h2 class={"text-xl font-semibold ml-1" + (icon === "bus" ? " mt-1" : "")}>{name}</h2>
    </div>
    {#if description !== undefined}
        <p class="text-left">{description}</p>
    {/if}
</button>