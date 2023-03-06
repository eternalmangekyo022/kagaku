<script lang='ts'>
    import { writable } from "svelte/store";
    import TileComponent from "./Tile.svelte";
    
    export let randomTile: () => Tile;

    let tile = randomTile();

    const selected = writable<Tile | undefined>();
    const selectedColor = writable<string | null>();

    let inputText: string | 'Not a number!';
    let toggle: boolean = false;

    const inform = (msg: string) => {
        inputText = msg
        toggle = true
    }

</script>

<div class='w-[25%] h-[70%] flex flex-col justify-center items-center gap-8'> 
    <TileComponent size={70} {tile} {selected} {selectedColor} position={'relative'}/>
    <input bind:value={inputText} type="text" class='text-center border-2' on:focus={() => {
        if(toggle) {inputText = ''; toggle = false}
    }}>
    <button on:click={() => {
        if(isNaN(parseInt(inputText))) {
            inform('Not a number');
        } else if(parseInt(inputText) !== tile?.element?.atomicNumber) {
            inform('Incorrect')
        } else {
            tile = randomTile()
            inform('')
        }
    }}>Check</button>
</div>