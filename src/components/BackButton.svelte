<script>
    import Button from "./Button.svelte";
    import InformationModal from "./InformationModal.svelte";
    import {navigate, Link} from 'svelte-routing';
    import {_} from "svelte-i18n";

    export let backTo = null;

    function goBack() {
        if (!backTo)
            window.history.back();
        else
            navigate(backTo)
    }

    function toggleDropdown(event) {
        if (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
            document.getElementById("crazzy").classList.toggle("group");
        }
    }

    let reportingModalShown = false;

    function openReportingModal() {
        reportingModalShown = false;
        reportingModalShown = true;
    }

    function toggleDarkmode() {
        if (document.documentElement.classList.contains("mode-dark")) {
            document.documentElement.classList.remove("mode-dark")
            localStorage.removeItem("darkmode");
        } else {
            document.documentElement.classList.add("mode-dark")
            localStorage.setItem("darkmode", "true");
        }
        window.dispatchEvent(new Event('storage'));
    }

</script>

<InformationModal shown={reportingModalShown} title="🤖 {$_('utility.report_a_problem')}"
                  text="{$_('utility.modals.report_a_problem')}"/>
<div class="flex justify-between">
    <div>
        <Button onClick={goBack}
                className="bg-gray-200 dark:bg-gray-800 dark-hover:bg-gray-900 hover:bg-gray-300 text-gray-700 dark:text-gray-400 shadow-none">
            <div class="flex">
                <ion-icon class="-ml-1 mr-1 my-auto text-gray-900 dark:text-gray-400"
                          name="chevron-back-outline"></ion-icon>
                {$_('utility.back')}
            </div>
        </Button>
        <slot/>
    </div>
    <div id="crazzy" class="group flex-row-reverse">
        <Button onClick={toggleDropdown}
                className="bg-gray-200 dark:bg-gray-800 dark-group-hover:bg-gray-900 group-hover:bg-gray-100 text-gray-700 dark:text-gray-400 shadow-none">
            <ion-icon class="mt-1 text-gray-900 dark:text-gray-400"
                      name="ellipsis-horizontal"></ion-icon>
        </Button>
        <div style="margin-left: -11.125rem;" class="flex w-full">
            <div style="max-height: 120px; z-index: 300;"
                 class="w-56 absolute rounded text-sm text-right h-0 group-hover:py-1 group-hover:h-auto overflow-hidden transition-all duration-200 font-light bg-gray-100 dark:text-gray-200 dark:bg-gray-900 -mt-1 shadow-lg">
                <p class="h-0 group-hover:h-auto">
                    <button on:click={openReportingModal}
                            class="px-2 py-1 w-full hover:bg-gray-200 dark-hover:bg-black text-right">
                        {$_('utility.report_a_problem')} 🤖
                    </button>
                </p>
                <p class="h-0 group-hover:h-auto">
                    <button on:click={toggleDarkmode}
                            class="px-2 py-1 w-full hover:bg-gray-200 dark-hover:bg-black text-right">
                        {$_('utility.darkmode')} 🌙
                    </button>
                </p>
                <p class="h-0 group-hover:h-auto">
                    <Link to="impressprivacy">
                        <button class="px-2 py-1 w-full hover:bg-gray-200 dark-hover:bg-black text-right">
                            {$_('utility.impress_privacy')} 🎈
                        </button>
                    </Link>
                </p>
            </div>
        </div>
    </div>
</div>
