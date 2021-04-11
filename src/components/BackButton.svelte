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
                className="bg-gray-100 dark:bg-gray-800 dark-hover:bg-gray-900 hover:bg-gray-300 text-gray-700 dark:text-gray-400 shadow-none">
            <div class="flex">
                <ion-icon class="my-auto mr-1 -ml-1 text-gray-900 dark:text-gray-400"
                          name="chevron-back-outline"></ion-icon>
                {$_('utility.back')}
            </div>
        </Button>
        <slot/>
    </div>
    <div id="crazzy" class="flex-row-reverse group">
        <Button onClick={toggleDropdown}
                className="bg-gray-100 dark:bg-gray-800 dark-group-hover:bg-gray-900 group-hover:bg-white text-gray-700 dark:text-gray-400 shadow-none">
            <ion-icon class="mt-1 text-gray-900 dark:text-gray-400"
                      name="ellipsis-horizontal"></ion-icon>
        </Button>
        <div style="margin-left: -11.125rem;" class="flex w-full">
            <div style="max-height: 120px; z-index: 300;"
                 class="absolute w-56 h-0 -mt-1 overflow-hidden text-sm font-light text-right transition-all duration-200 bg-white rounded shadow-lg group-hover:py-1 group-hover:h-auto dark:text-gray-200 dark:bg-gray-900">
                <p class="h-0 group-hover:h-auto">
                    <button on:click={openReportingModal}
                            class="w-full px-2 py-1 text-right hover:bg-gray-200 dark-hover:bg-black">
                        {$_('utility.report_a_problem')} 🤖
                    </button>
                </p>
                <p class="h-0 group-hover:h-auto">
                    <button on:click={toggleDarkmode}
                            class="w-full px-2 py-1 text-right hover:bg-gray-200 dark-hover:bg-black">
                        {$_('utility.darkmode')} 🌙
                    </button>
                </p>
                <p class="h-0 group-hover:h-auto">
                    <Link to="impressprivacy">
                        <button class="w-full px-2 py-1 text-right hover:bg-gray-200 dark-hover:bg-black">
                            {$_('utility.impress_privacy')} 🎈
                        </button>
                    </Link>
                </p>
            </div>
        </div>
    </div>
</div>
