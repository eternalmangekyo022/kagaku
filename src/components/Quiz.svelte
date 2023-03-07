<script lang='ts'>
    import { writable, type Writable } from "svelte/store";
    import TileComponent from "./Tile.svelte";
    
    export let randomTile: () => Tile;

    let tile = randomTile();

    const selected = writable<Tile | undefined>();
    const selectedColor = writable<string | null>();

    let inputText: string | 'Not a number!' = '';
    let toggle: boolean = false;

    const inform = (msg: string) => {
        inputText = msg
        toggle = true
    }

    const checkInput = () => {
        if(isNaN(parseInt(inputText))) {
            if(inputText === '') tile = randomTile()
            else inform('Not a number');
        } else if(parseInt(inputText) !== tile?.element?.atomicNumber) {
            inform(`${tile?.element?.name}: ${tile?.element?.atomicNumber}`)
            tile = randomTile()
        } else {
            tile = randomTile()
            inform('')
        }
    }

</script>

<div class='w-[25%] h-[70%] flex flex-col justify-center items-center gap-8'> 
    <TileComponent onClick={() => tile = randomTile()} size={70} {tile} {selected} {selectedColor} position={'relative'}/>
    <input 
        type="text"
        class='text-center border-2' 
        bind:value={inputText} 
        on:keydown={e => e.key === 'Enter' && checkInput() } 
        on:focus={() => {
            if(toggle) {inputText = ''; toggle = false}
        }}
        on:input={e => {
            if(toggle) {inputText = e.data; toggle = false}
        }}
    >
    <button on:click={checkInput}>Check</button>
</div>