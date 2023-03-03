<script lang='ts'>
    export let tile: Tile;
    export let selected;
    const size = 4.5;
    const tileOffset = size + .4;
</script>

<div 
    class={`absolute border-2 ${!tile.element && 'border-none'} -translate-x-1/2 -translate-y-1/2`}
    style={`left: calc(${tile.x * tileOffset}rem + 15%); top: calc(${tile.y * tileOffset}rem + 20%); width: ${size}rem; height: ${size}rem;`}
>
    {#if tile.element}
        <span class='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>{tile.element.symbol}</span>
    {/if}
</div>