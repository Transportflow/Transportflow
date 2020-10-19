<script>
    import {Link} from "svelte-routing";
    import MenuButton from "../components/MenuButton.svelte";
    import InformationModal from "../components/InformationModal.svelte";
    import OnboardingCheck from "../components/OnboardingCheck.svelte";
    import {onMount} from "svelte";
    import {_} from "svelte-i18n";

    export let beta;

    // modal
    let shown = false;
    let title = "";
    let slot = "";

    // parrot emoji
    let unicode = "1f99c";

    onMount(() => {
        shown = false;
        if (localStorage.getItem("network")) {
            localStorage.removeItem("network");
            shown = true;
            title = "💚 Lieber Transportflow Nutzer";
            slot = `<p class="dark:text-white -mt-1">Nach einer langen Entwicklungszeit haben wir mit diesem Update zahlreiche Verkehrsbetriebe hinzugefügt, sowie Design, Funktionalität und Zuverlässigkeit verbessert. Ohne Verbesserungsvorschläge und Ideen vieler Transportflow Nutzer wäre das nicht möglich gewesen.<br/><b>Vielen Dank, dass Du Transportflow nutzt.</b><br/><br/>Kein Auto, kein Problem. 🦜<br/><i>Adrian - Gründer & CEO von Transportflow</i></p>`
        }

        if (location.hostname === "transportflow.de") {
            shown = true;
            title = "🚧 Achtung"
            slot = `<p class="dark:text-white -mt-1 leading-snug">Wir werden <span class="text-blue-600">transportflow.de</span> nur noch bis zum 14.12.2020 betreiben.<br>Sie können Transportflow weiterhin unter <span class="text-blue-600">transportflow.online</span> nutzen.</p><div class="mb-2 mt-4"><a href="https://transportflow.online" target="_blank" class="px-4 py-2 rounded cursor-pointer shadow transition-bg duration-200 font-medium text-sm text-gray-100 focus:outline-none bg-button-blue hover:shadow-outline active:bg-blue-700">Öffnen</a></div>`
        }
    })

    async function sharePage() {
        shown = false;
        if (navigator.share === undefined) {
            shown = true;
            title = "💌 " + $_('index.share');
            slot = `<p class="dark:text-white -mt-1">${$_('index.share_modal.text')}<br/><div class="font-mono rounded dark:text-white p-2 text-sm leading-tight bg-gray-300 dark:bg-gray-900">${$_('index.share_modal.message_text')}<br/>https://transportflow.online</div><button onclick="document.getElementById('shareBtn').innerHTML = '${$_('index.share_modal.copied')}'; navigator.clipboard.writeText($_('index.share_modal.message_text') + ' https://transportflow.online');" id="shareBtn" class="bg-gray-400 dark:bg-gray-700 dark:text-white rounded px-2 py-1 mt-3 w-full hover:bg-gray-500 dark-hover:bg-gray-900 transition duration-200">${$_('index.share_modal.copy')}</button></p>`
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
                <p class="ml-1 text-gray-900 dark:text-gray-100">{$_('index.slogan')}</p>
            </div>
        </div>
    </div>

    <div class="rounded-lg overflow-hidden">
        <Link to="monitor">
            <MenuButton icon="bus" name={$_('index.monitor')} description={$_('index.monitor_description')}/>
        </Link>
        <hr class="mb-1 border-0"/>
        {#if false}
            <Link>
                <MenuButton icon="trail-sign" name="Planer" description="Routenplanung"/>
            </Link>
            <hr class="mb-1 border-0"/>
        {/if}
        <Link to="/settings">
            <MenuButton icon="cog" name={$_('index.settings')}/>
        </Link>
        <hr class="mb-1 border-0"/>
        <MenuButton onClick={sharePage} icon="share" name={$_('index.share')}/>
    </div>

    <p class="mt-3 select-none text-center text-gray-400 dark:text-gray-700 transition duration-200"><span class="font-medium">{process.env.VERSION}</span></p>
</main>
