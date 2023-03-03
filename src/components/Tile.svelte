<script lang='ts'>
    import type { Writable } from "svelte/store";
    import { writable } from "svelte/store";

    export let tile: Tile;
    export let selected: Tile | null
    export let selectedWritable: Writable<string | null>
    const size = 4.5;
    const tileOffset = size + .4;

    // store values

    let selectedColor: string | null;

    selectedWritable.subscribe(val => {
        selectedColor = val
    })



</script>

<div
    on:click={() => {
        if(tile?.element) {
            selected = tile
        }
    }}
    on:keydown
    on:mouseenter={() => {
        if(tile.element?.color) selectedWritable.set(tile.element?.color)
        if(!tile.element) selectedWritable.set(null)

    }}
    on:mouseleave={() => {

    }}

    class={`absolute -translate-x-1/2 -translate-y-1/2 transition-[.3s] 
            cursor-pointer hover:transition-[1s] hover:scale-100 hover:z-10 hover:border-2 border-black
             p-2${!tile.element && ' border-none cursor-default invisible'}
            `}
    style={`background: #${([null, tile.element?.color].includes(selectedColor)) ? tile.element?.color : 'ECF2FF'}; left: calc(${tile.x * tileOffset}rem + 15%); top: calc(${tile.y * tileOffset}rem + 15%); width: ${size}rem; height: ${size}rem;`}
>   
    {#if tile.element}
            <span class='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[70%] font-bold'>{tile.element.symbol}</span>
            <span class='absolute right-1 top-[1px]'>{tile.element.atomicNumber}</span>
            <span class='absolute left-1/2 top-[60%] text-[.7rem] -translate-x-1/2'>{tile.element.name}</span>
            <span class='absolute top-[80%] left-1/2 -translate-x-1/2 text-[.6rem] text-center w-full text-ellipsis whitespace-nowrap overflow-hidden'>{tile.element.groupBlock}</span>
    {/if}
</div>

<style>
    span::selection {
        outline: none;
    }
</style>