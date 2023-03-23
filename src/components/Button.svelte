<script lang='ts'>
    import { selectedColor } from "../store";
    export let onClick: any;
    export let mode: QuizMode /** note that this is a writable, not a string */;
    export let modeStr: string
    let active: boolean;
    $: active = $mode === modeStr
</script>

<button
    on:click={() => onClick(modeStr)}
    class='w-[60%] h-14 border-x-2'
    style='background: {active ? `radial-gradient(#${$selectedColor}, transparent)`: 'none'};'
>
    <slot/>
</button>