<script>
    import Button from "./Button.svelte";

    function goBack() {
        window.history.back();
    }

    function toggleDropdown(event) {
        if (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
            document.getElementById("crazzy").classList.toggle("group");
        }
    }

</script>

<div class="flex justify-between">
    <Button onClick={goBack}
            className="bg-gray-200 dark:bg-gray-800 dark-hover:bg-gray-900 hover:bg-gray-300 text-gray-700 dark:text-gray-400 shadow-none">
        <div class="flex">
            <ion-icon class="-ml-1 mr-1 my-auto text-gray-900 dark:text-gray-400"
                      name="chevron-back-outline"></ion-icon>
            Zurück
        </div>
    </Button>
    <div id="crazzy" class="group flex-row-reverse">
        <Button onClick={toggleDropdown}
                className="bg-gray-200 dark:bg-gray-800 dark-group-hover:bg-gray-900 group-hover:bg-gray-100 text-gray-700 dark:text-gray-400 shadow-none">
            <ion-icon class="mt-1 text-gray-900 dark:text-gray-400"
                      name="ellipsis-horizontal"></ion-icon>
        </Button>
        <div style="margin-left: -11.125rem;" class="flex w-full">
            <div style="max-height: 120px"
                 class="w-56 absolute rounded text-sm text-right h-0 group-hover:py-1 group-hover:h-auto overflow-hidden transition-all duration-200 font-light bg-gray-100 dark:text-gray-200 dark:bg-gray-900 -mt-1 shadow-lg">
                <p class="h-0 group-hover:h-auto">
                    <button class="px-2 py-1 w-full hover:bg-gray-200 dark-hover:bg-black text-right">
                        Fehler melden 🤖
                    </button>
                </p>
                <p class="h-0 group-hover:h-auto">
                    <button class="px-2 py-1 w-full hover:bg-gray-200 dark-hover:bg-black text-right">
                        Impressum & Datenschutz 🎈
                    </button>
                </p>
            </div>
        </div>
    </div>
</div>
