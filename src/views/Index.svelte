<script>
    import {Link} from "svelte-routing";
    import MenuButton from "../components/MenuButton.svelte";
    import InformationModal from "../components/InformationModal.svelte";
    import OnboardingCheck from "../components/OnboardingCheck.svelte";

    export let beta;

    // modal
    let shown = false;
    let title = "";
    let slot = "";

    // parrot emoji
    let unicode = "1f99c";

    async function sharePage() {
        shown = false;
        if (navigator.share === undefined) {
            shown = true;
            title = "💌 Teilen";
            slot = `<p class="dark:text-white -mt-1"><b>Transportflow</b> weiterempfehlen:<br/><div class="font-mono rounded dark:text-white p-2 text-sm leading-tight bg-gray-300 dark:bg-gray-900">Hast Du schon von Transportflow gehört?<br/>https://transportflow.online</div><button onclick="document.getElementById('shareBtn').innerHTML = 'Kopiert!'; navigator.clipboard.writeText('Hast Du schon von Transportflow gehört? https://transportflow.online');" id="shareBtn" class="bg-gray-400 dark:bg-gray-700 dark:text-white rounded px-2 py-1 mt-3 w-full hover:bg-gray-500 dark-hover:bg-gray-900 transition duration-200">Kopieren</button></p>`
            return;
        }

        try {
            await navigator.share({url: "https://transportflow.online", title: "Transportflow"});
            unicode = "1f389";
        } catch (err) {
            if (err.message === "Abort due to cancellation of share.") {
                unicode = "1f622";
            }
        }
    }
</script>

<main>
    <OnboardingCheck/>
    {#if shown}
        <InformationModal {title} {shown} text={slot}/>
    {/if}

    <div class="mb-5 flex justify-between">
        <div class="flex">
            <h1 class="text-4xl my-auto"><img alt="parrot" class="pt-1" style="height: 40px"
                                              src={"https://twemoji.maxcdn.com/v/12.1.4/72x72/"+unicode+".png"}></h1>
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

    <div class="rounded-lg overflow-hidden ">
        <Link to="monitor">
            <MenuButton icon="bus" name="Monitor" description="Echtzeit Fahrplanauskunft"/>
        </Link>
        <hr class="mb-1 border-0"/>
        {#if false}
            <Link>
                <MenuButton icon="trail-sign" name="Planer" description="Routenplanung"/>
            </Link>
            <hr class="mb-1 border-0"/>
        {/if}
        <Link to="/settings">
            <MenuButton icon="cog" name="Einstellungen"/>
        </Link>
        <hr class="mb-1 border-0"/>
        <MenuButton onClick={sharePage} icon="share" name="Teilen"/>
    </div>
</main>
