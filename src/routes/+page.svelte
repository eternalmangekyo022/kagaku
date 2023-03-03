<!-- svelte-ignore empty-block -->
<script lang='ts'>
    import TileComponent from "../components/Tile.svelte";
    import { onMount } from "svelte";

    const maxColumns = 18;
    let elements: ChemicalElement[] = [];
    let tiles: Tile[] = [];

    let layout: (number[] | null)[] = [[1, 18], [1, 2, 13, 14, 15, 16, 17, 18], null, [], [], [-3], [-3], [-1, -2, -3], [-1, -2, -3]];

    const getFrom = (nums: number[]): number[] => {
        let ret: number[] = [];

        for(let i = 1; i < 19; i++) {
            if(!nums.includes(i * -1)) ret = [...ret, i];
        }

        return ret
    }

    onMount(async() => {
        let res: Response | ChemicalElement[] = await fetch('https://neelpatel05.pythonanywhere.com/')
        res = await res.json()
        elements = [...(res as ChemicalElement[])]

        let elementsIdx = 0
        for(let i = 0; i < layout.length; i++) {
            const iter: number[] = layout[i] === null ? (layout[i - 1] as number[]) : 
                    ((layout[i] as number[]).find(num => num < 0) ? getFrom((layout[i] as number[])) : 
                        ((layout[i] as number[]).length > 0 ? layout[i] as number[] : 
                            [...Array(maxColumns)].map((_, idx) => idx + 1)));

            for(let j = 1; j < maxColumns + 1; j++) {
                let el: ChemicalElement | null = iter.includes(j) ? elements[elementsIdx] : null;
                if(el) elementsIdx++;
                tiles = [...tiles, { y: i, x: j - 1, element: el }]
            }
        }
        console.log(tiles)
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

<div class='w-[100vw] h-[100vh] relative flex flex-col'>
    <header class='w-full h-[10%]'></header>
    <main class='w-full h-[80%] relative'>
        <div class='w-full h-full'>
            {#each tiles as tile}
                <TileComponent {tile}/>
            {/each}
        </div>
    </main>
    <footer class='w-full h-[10%]'>

    </footer>
</div>