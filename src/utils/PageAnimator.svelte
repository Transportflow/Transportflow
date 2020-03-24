<script>
    import {fly, fade} from "svelte/transition";
    import {Router, Route} from "svelte-routing";

    export let path;
    export let prevUrl;
</script>


<Route {path}>
    <div class="absolute w-full"
         in:fly={prevUrl.length > path.length ? '{{ x: 2000, duration: 500 }}' : '{{ x: -500, duration: 500 }}'}
         out:fly={prevUrl.length > path.length ? '{{ x: -500, duration: 500 }}' : '{{ x: 2000, duration: 500 }}'}>
        <slot/>
    </div>
</Route>
