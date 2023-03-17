import { writable, type Writable } from 'svelte/store'
import res from './chemicals.json'

const selectedColor = writable<string | null>(null);
const selected = writable<Tile | undefined>();
const learned: Writable<number[]> = writable([]);
const elements: Writable<ChemicalElement[]> = writable([]);

/* const URL = '../static/chemicals.json' */

const colors: { [key: string]: string } = {
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

/* let res: Response | ChemicalElement[] = await fetch(URL)
res = await res.json() */

elements.set((res as any[]).map(el => ({ ...el, color: colors[el.groupBlock] })))

export { selectedColor, selected, learned, elements }