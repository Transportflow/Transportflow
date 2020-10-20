<script>
    import Button from "./Button.svelte";
    export let onClick;
    export let text;
    export let className = "";
    export let disableColor = false;
</script>

<Button {onClick} className="{!disableColor ? 'bg-button-blue' : ''} hover:shadow-outline active:bg-blue-700 {className}">{text}</Button>
