<script lang='ts'>
    import type { Writable } from "svelte/store";

    export let tile: Tile;
    export let selected: Writable<Tile | undefined>
    export let selectedColor: Writable<string | null>
    export let position: 'relative' | 'absolute';
    export let size = 4.5
    
    const tileOffset = size + .4;

    const left = position === 'relative' ? '0' : `${tile.x * tileOffset}rem`
    const top = position === 'relative' ? '0' : `calc(${tile.y * tileOffset}rem + 10%)`


</script>

<div
    on:click={() => {
        if(tile?.element) {
            selected.set(tile);
        }
    }}
    on:keydown
    on:mouseenter={() => {
        if(tile.element?.color) selectedColor.set(tile.element?.color)
        if(!tile.element) selectedColor.set(null)
    }}

    class={`${position === 'absolute' ? 'absolute -translate-x-1/2 -translate-y-1/2 ': 'relative '}transition-[.3s] 
            hover:transition-[1s] hover:scale-125 hover:z-10 hover:border-2 border-black
             p-2${!tile.element && ' border-none opacity-0'}
            `}
    style={`cursor: ${!tile.element ? 'default' : 'pointer'}; background: #${([null, tile.element?.color].includes($selectedColor)) ? tile.element?.color : (position === 'absolute' ? 'ECF2FF' : tile.element?.color)}; left: ${left}; top: ${top}; width: ${size}rem; height: ${size}rem;`}
    >   
    {#if tile.element}
            <span style={`font-size: ${position === 'relative' ? size * 0.15 : 1}rem`} class='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[70%] font-bold'>{tile.element.symbol}</span>
            {#if position === 'absolute'}
                <span style='font-size: 0.9rem;' class='absolute right-[10%] top-[10%]'>{tile.element.atomicNumber}</span>
            {/if}
            <span style={`font-size: ${position === 'relative' ? size * 0.1 : .75}rem`} class='absolute left-1/2 top-[60%] -translate-x-1/2'>{tile.element.name}</span>
            <span style={`font-size: ${position === 'relative' ? size * 0.08 : .65}rem`} class='absolute top-[80%] left-1/2 -translate-x-1/2 text-center w-full text-ellipsis whitespace-nowrap overflow-hidden'>{tile.element.groupBlock}</span>
    {/if}
</div>

<style>
    span::selection {
        outline: none;
    }
</style>