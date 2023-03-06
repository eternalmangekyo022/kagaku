<script lang='ts'>
    import TileComponent from "./Tile.svelte";
    import { writable } from "svelte/store";
    const selected = writable<Tile | undefined>();
    const selectedColor = writable<string | null>();

    export let tile: Tile;
</script>

<div class='w-[25%] h-[70%] border-2 border-black flex justify-center items-center'> 
    <TileComponent size={70} {tile} {selected} {selectedColor} position={'relative'}/>
</div>