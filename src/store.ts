import { writable, type Writable } from 'svelte/store'

const selectedColor = writable<string | null>(null);
const selected = writable<Tile | undefined>();
const learned: Writable<number[]> = writable([]);
const elements: Writable<ChemicalElement[]> = writable([]);


export { selectedColor, selected, learned, elements }