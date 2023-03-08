<script lang='ts'>
    export let onClick: any;
    export let mode: QuizMode /** note that this is a writable, not a string */;
    export let modeStr: string

</script>

<button
    on:click={() => onClick(modeStr)}
    class='border-2 w-[60%] h-14 rounded-xl'
    style={`${$mode === modeStr ? 'background: rgb(238,174,202);background: linear-gradient(180deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);': ''}`}
>
    <slot/>
</button>