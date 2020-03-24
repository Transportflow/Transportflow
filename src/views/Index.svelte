<script>
    import {Link} from "svelte-routing";
    import MenuButton from "../components/MenuButton.svelte";

    export let beta;
</script>

<main class="p-5 pt-12 sm:p-24 sm:pt-20 w-full sm:w-auto sm:max-w-lg">
    <div class="mb-5 flex justify-between">
        <div class="flex">
            <h1 class="text-4xl my-auto"><img alt="parrot" class="pt-1" style="height: 40px"
                                              src="https://twemoji.maxcdn.com/v/12.1.4/72x72/1f99c.png"></h1>
            <div class="ml-2">
                <h1 class="-mb-1 text-gray-900 dark:text-gray-100 text-2xl font-bold">Transportflow
                    {#if beta}
                        <span class="uppercase font-semibold text-xs parrot-green rounded align-text-top text-white tracking-wider ml-1 p-1 px-2">beta</span>
                    {/if}
                </h1>
                <p class="ml-1 text-gray-900 dark:text-gray-100">Kein Auto, kein Problem.</p>
            </div>
        </div>
    </div>

    <div class="rounded-lg overflow-hidden">
        <Link>
            <MenuButton icon="bus" name="Monitor" description="Echtzeit Fahrplanauskunft"/>
        </Link>
        <hr class="mb-1 border-0"/>
        {#if false}
            <Link>
                <MenuButton icon="trail-sign" name="Planer" description="Routenplanung"/>
            </Link>
            <hr class="mb-1 border-0"/>
        {/if}
        <Link>
            <MenuButton icon="cog" name="Einstellungen"/>
        </Link>
    </div>

    <p class="mt-64"></p>
    <Link to="/settings">yolo</Link>
</main>