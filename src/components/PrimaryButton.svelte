<script>
    import Button from "./Button.svelte";
    export let onClick;
    export let text;
</script>

<Button {onClick} className="bg-button-blue hover:shadow-outline active:bg-blue-700">{text}</Button>