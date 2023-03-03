<script lang='ts'>
    export let tile: Tile
</script>

<div 
    class={`w-16 h-16 absolute border-2 border-black ${!tile.element && 'border-none'}`}
    style={`left: ${tile.x * 4}rem; top: ${tile.y * 4}rem;`}
>
    
</div>