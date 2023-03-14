<script lang='ts'>
    import type { Writable } from "svelte/store";

    export let className: string = '';
    export let active: Writable<boolean>;

</script>

<div 
    style='display: flex; justify-content: {$active ? 'start' : 'end'}; align-items: center;'
    class={'' + ' ' + className}
    on:click={() => active.update(prev => !prev)}
    on:keyup
>
    <div class='rounded-full duration-150 bg-black w-2 h-2'></div>
</div>