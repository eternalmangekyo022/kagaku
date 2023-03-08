<script lang='ts'>
    import { writable, type Writable } from "svelte/store";
    import TileComponent from "./Tile.svelte";
    import Button from "./Button.svelte";
    
    export let randomTile: (current?: Tile) => Tile;
    export let save: () => void;
    export let learned: Writable<number[]>;
    let mode: QuizMode = writable('atomicNumber');

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
        if($mode === 'atomicNumber') {
            if(isNaN(parseInt(inputText)) || parseInt(inputText) !== tile?.element?.atomicNumber) {
                inform('')
            } else {
                tile = randomTile();
                inform('');
            };
        } else if($mode === 'symbol') {
            if(inputText.toLowerCase() === tile?.element?.symbol.toLowerCase()) {
                tile = randomTile()
                inform('')
            } else inform('');
        } else if($mode === 'name') {
            if(inputText.toLowerCase() === tile?.element?.name.toLowerCase()) {
                tile = randomTile()
                inform('')
            } else inform('');
        } else if($mode === 'groupBlock') {
            if(inputText.toLowerCase() === tile?.element?.groupBlock.toLowerCase()) {
                tile = randomTile()
                inform('')
            } else inform('');
        }
    }

    const inputHandler: any = (e: InputEvent): void => {
        if(toggle) {inputText = e.data as string; toggle = false}
    }

    const onClick = (modeType: string) => {
        mode.set(modeType);
    }

</script>

<div class='w-[40%] h-[70%] flex justify-around items-center gap-8'> 
    <div class='w-full h-full flex flex-col justify-around items-center'>
        <TileComponent {mode} {learned} {save} onClick={() => tile = randomTile(tile)} size={80} {tile} {selected} {selectedColor} position={'relative'}/>
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
    <div class='w-full h-full flex flex-col justify-evenly items-center'>
        {#each [['atomicNumber', 'Atomic number'], ['symbol', 'Symbol'], ['name', 'Name'], ['groupBlock', 'Group']] as [modeStr, _slot]}
            <Button {modeStr} {mode} {onClick}>{_slot}</Button>
        {/each}
    </div>
</div>