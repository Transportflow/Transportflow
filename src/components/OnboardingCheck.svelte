<script>
    import {onMount} from "svelte";
    import {navigate} from "svelte-routing";

    onMount(() => {
        if (!localStorage.getItem("region"))
            navigate("/onboarding")
    })
</script>