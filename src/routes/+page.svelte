<script lang='ts'>
    import TileComponent from "../components/Tile.svelte";
    import { onMount } from "svelte";
    import Quiz from "../components/Quiz.svelte";
    import Visualizer from "../components/Visualizer.svelte";

    import { selectedColor, selected, learned, elements } from '../store';
    let route: '/' | 'quiz' | 'visualizer' = '/';

    const colors: any = {
        nonmetal: 'FEC868',
        noble_gas: 'F6E1C3',
        'noble gas': 'F6E1C3',
        alkali_metal: 'D9ACF5',
        'alkali metal': 'D9ACF5',
        alkaline_earth_metal: 'AD7BE9',
        'alkaline earth metal': 'AD7BE9',
        metalloid: '9DC08B',
        halogen: 'C9F4AA',
        metal: 'DDD',
        transition_metal: 'FFE1E1',
        'transition metal': 'FFE1E1',
        lanthanoid: 'CDF0EA',
        actinoid: '789395',
        'post-transition metal': '82A284'
    }

    const maxColumns = 18;

    let tiles: Tile[] = [];
    let layout: (number[] | null)[] = [[1, 18], [1, 2, 13, 14, 15, 16, 17, 18], null, [], [], [-3], [-3], [-1, -2, -3], [-1, -2, -3]];

    const getFrom = (nums: number[]): number[] => {
        let ret: number[] = [];

        for(let i = 1; i < 19; i++) {
            if(!nums.includes(i * -1)) ret = [...ret, i];
        }

        return ret
    }

    const save = () => localStorage.setItem('learned', JSON.stringify(tiles.filter(i => i.learned && i.element).map(i => i?.element?.atomicNumber)))

    const randomTile = (current?: Tile): Tile => {
        let raw = tiles.filter(i => $learned.includes(i?.element?.atomicNumber || -1)).length > 0 ? tiles.filter(i => $learned.includes(i?.element?.atomicNumber || -1)) : tiles
        let temp: Tile = raw[Math.floor(Math.random() * raw.length)]

        while(!temp.element || temp?.element.atomicNumber === current?.element?.atomicNumber) {
            temp = raw[Math.floor(Math.random() * (raw.length - 2))]
        }
        return temp
    }

    /* const clearSaved = () => {learned.set([]); localStorage.setItem('learned', '[]')} */

    onMount(async() => {
        const temp: string = localStorage.getItem('learned') || '[]';
        learned.set(JSON.parse(temp));

        let elementsIdx = 0
        for(let i = 0; i < layout.length; i++) {
            const iter: number[] = layout[i] === null ? (layout[i - 1] as number[]) : 
                    ((layout[i] as number[]).find(num => num < 0) ? getFrom((layout[i] as number[])) : 
                        ((layout[i] as number[]).length > 0 ? layout[i] as number[] : 
                            [...Array(maxColumns)].map((_, idx) => idx + 1)));

            for(let j = 1; j < maxColumns + 1; j++) {
                let el: ChemicalElement | null = iter.includes(j) ? $elements[elementsIdx] : null;
                if(el) elementsIdx++;
                tiles = [...tiles, { y: i, x: j - 1, element: el, learned: $learned.includes(el?.atomicNumber || -1) }]
            }
        }
        selected.set(tiles[0]);
    })
/* 
  {
    "atomicMass": "1.00794(4)",
    "atomicNumber": 1,
    "atomicRadius": 37,
    "boilingPoint": 20,
    "bondingType": "diatomic",
    "cpkHexColor": "FFFFFF",
    "density": 0.0000899,
    "electronAffinity": -73,
    "electronegativity": 2.2,
    "electronicConfiguration": "1s1",
    "groupBlock": "nonmetal",
    "ionRadius": "",
    "ionizationEnergy": 1312,
    "meltingPoint": 14,
    "name": "Hydrogen",
    "oxidationStates": "-1, 1",
    "standardState": "gas",
    "symbol": "H",
    "vanDerWaalsRadius": 120,
    "yearDiscovered": 1766
  },
*/

</script>
<svelte:head>
    <link rel="shortcut icon" href="https://www.svgrepo.com/show/384593/chemistry-experiment-health-hospital-lab-medicine.svg" type="image/x-icon">
    <title>Kagaku</title>
</svelte:head>
<div class='w-[100vw] h-[100vh] relative flex flex-col'>
    <header class='w-full h-[10%] bg-lime-800'>
        <nav class='w-full h-full flex justify-around items-center'>
            <button on:click={() => route = '/'}>Periodic Table</button>
            <button on:click={() => route = 'quiz'}>Quiz</button>
            <button on:click={() => route = 'visualizer'}>Sketch</button>
        </nav>
    </header>
    <main class='w-full h-[90%] relative flex justify-center'>
        {#if route === '/'}
        <!-- container for periodic table -->
        <div
            class='w-[70%] h-[90%] relative bottom-10'
            on:mouseleave={() => selectedColor.set(null)}
        >
            {#if $selected}
                <div class='w-[14rem] h-[10rem] absolute left-1/2 top-[3rem] -translate-x-[110%] select-none'
                    style={`background: #${$selected.element?.color}`}
                >
                    <span class='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[70%] font-bold text-4xl'>{$selected?.element?.symbol}</span>
                    <span class='absolute right-1 top-[1px] text-2xl'>{$selected?.element?.atomicNumber}</span>
                    <span class='absolute left-1/2 top-[60%] text-lg -translate-x-1/2'>{$selected?.element?.name}</span>
                    <span class='absolute top-[80%] left-1/2 -translate-x-1/2 text-sm text-center w-full text-ellipsis whitespace-nowrap overflow-hidden'>{$selected?.element?.groupBlock}</span>
                </div>
                {#each tiles as tile}
                <TileComponent {learned} {tile} {selected} {selectedColor} position={"absolute"} {save}/>
                {/each}
                {/if}
            </div>
    {:else if route === 'quiz'}
    <Quiz {save} {randomTile} {learned}/>
    {:else if route === 'visualizer'}
    <Visualizer />
    {/if}
    </main>
</div>