<script lang='ts'>
    import type { Writable } from "svelte/store";
    import { learned } from "../store";

    export let tile: Tile;
    export let selected: Writable<Tile | undefined>
    export let selectedColor: Writable<string | null>
    export let position: 'relative' | 'absolute';
    export let size = 5.25
    export let save: () => void;
    export let mode: QuizMode | undefined = undefined; 

    //optional

    export let onClick: null | (() => {}) = null
    
    const offset = { left: -7, top: 11 }

    const left = position === 'relative' ? '0' : `${tile.x * size * 1.2 + offset.left}%`
    const top = position === 'relative' ? '0' : `${tile.y * size * 2.3 + offset.top}%`


</script>

<div
    on:click={() => {
        if(tile?.element) {
            selected.set(tile);
        }
        onClick && onClick()
    }}
    on:keydown
    on:mouseenter={() => {
        if(tile.element?.color) selectedColor.set(tile.element?.color)
        if(!tile.element) selectedColor.set(null)
    }}
    on:contextmenu={e => {
        e.preventDefault();
        if(tile.learned) {
            learned.update(prev => prev.filter(i => tile?.element?.atomicNumber !== i))
        } else learned.update(prev => [...prev, tile?.element?.atomicNumber || -1])
        tile.learned = !tile.learned;
        save();
    }}

    class='{position === 'absolute' ? 'absolute -translate-x-1/2 -translate-y-1/2 hover:transition-[1s] hover:scale-125 hover:z-10 hover:border-2 border-black ': 'relative '}transition-[.3s]
    p-2{!tile.element && ' border-none opacity-0'}'
    style='cursor: {!tile.element ? 'default' : 'pointer'}; background: #{([null, tile.element?.color].includes($selectedColor)) ? tile.element?.color : (position === 'absolute' ? 'ECF2FF' : tile.element?.color)}; left: {left}; top: {top}; width: {size}%; aspect-ratio: 1/1;'
    >   
    {#if tile.element}
            {#if tile.learned}
                <span class='absolute left-[6%] top-[6%] selection:bg-transparent'><img src="https://www.svgrepo.com/show/458643/done.svg" alt="Done" width={position === 'absolute' ? 25 : 50}></span>
            {/if}
            <span style='font-size: {position === 'relative' ? size * 0.07 : 1}rem' class='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[70%] font-bold'>{#if $mode !== 'symbol'}{tile.element.symbol}{:else}?{/if}</span>
            <span style='font-size: {position === 'relative' ? size * 0.03 : .8}rem' class='absolute right-[15%] top-[10%]'>{#if $mode !== 'atomicNumber'}{tile.element.atomicNumber}{:else}?{/if}</span>
            <span style='font-size: {position === 'relative' ? size * 0.03 : .75}rem' class='absolute left-1/2 top-[60%] -translate-x-1/2'>{#if $mode !== 'name'}{tile.element.name}{:else}?{/if}</span>
            <span style='font-size: {position === 'relative' ? size * 0.02 : .65}rem' class='absolute top-[80%] left-1/2 -translate-x-1/2 text-center w-full text-ellipsis whitespace-nowrap overflow-hidden'>{#if $mode !== 'groupBlock'}{tile.element.groupBlock}{:else}?{/if}</span>
    {/if}
</div>

<style>
    span::selection {
        outline: none;
    }
</style>