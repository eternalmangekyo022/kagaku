<script lang='ts'>
    import { writable, type Writable } from "svelte/store";
    import TileComponent from "./Tile.svelte";
    
    export let randomTile: (current?: Tile) => Tile;
    export let save: () => void;
    export let learned: Writable<number[]>;

    let tile = randomTile();

    const selected = writable<Tile | undefined>();
    const selectedColor = writable<string | null>();

    let inputText: string | 'Not a number!' = '';
    let toggle: boolean = false;

    const inform = (msg: string) => {
        inputText = msg
        toggle = true
    }

    const checkInput = (): void => {
        if(isNaN(parseInt(inputText))) {
            if(inputText === '') tile = randomTile(tile)
            else inform('Not a number');
        } else if(parseInt(inputText) !== tile?.element?.atomicNumber) {
            inform(`${tile?.element?.name}: ${tile?.element?.atomicNumber}`)
            tile = randomTile(tile)
        } else {
            tile = randomTile(tile)
            inform('')
        }
    }

    const inputHandler: any = (e: InputEvent): void => {
        if(toggle) {inputText = e.data as string; toggle = false}
    }

</script>

<div class='w-[25%] h-[70%] flex flex-col justify-center items-center gap-8'> 
    <TileComponent {learned} {save} onClick={() => tile = randomTile(tile)} size={70} {tile} {selected} {selectedColor} position={'relative'}/>
    <input 
        type="text"
        class='text-center border-2' 
        bind:value={inputText} 
        on:keydown={e => e.key === 'Enter' && checkInput() } 
        on:focus={() => {
            if(toggle) {inputText = ''; toggle = false}
        }}
        on:input={inputHandler}
    >
    <button on:click={checkInput}>Check</button>
</div>