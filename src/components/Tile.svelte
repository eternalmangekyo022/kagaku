<script lang='ts'>
    export let tile: Tile;
    export let selected: Tile | null
    const size = 4.5;
    const tileOffset = size + .4;
    
    if(!tile.element?.color) console.log(tile.element?.groupBlock)
</script>

<div
    on:click={() => {
        if(tile?.element) {
            selected = tile
        }
    }}
    on:keydown
    class={`absolute ${!tile.element && 'border-none'} -translate-x-1/2 -translate-y-1/2 transition-[.3s] cursor-pointer hover:scale-125 hover:z-10`}
    style={`background: #${tile.element?.color}; left: calc(${tile.x * tileOffset}rem + 15%); top: calc(${tile.y * tileOffset}rem + 15%); width: ${size}rem; height: ${size}rem;`}
>
    {#if tile.element}
        <span class='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 selection:outline-none'>{tile.element.symbol}</span>
    {/if}
</div>