<script>
    import {fade} from "svelte/transition";
    import {Router, Route} from "svelte-routing";

    export let path;
</script>


<Route {path}>
    <div class="absolute w-full p-5 pt-12 sm:p-24 sm:pl-40 sm:pt-20" transition:fade>
        <div class="sm:max-w-xs">
            <slot/>
        </div>
    </div>
</Route>
