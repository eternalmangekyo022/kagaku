// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	type ChemicalElement = {
		atomicMass: string
		atomicNumber: number
		atomicRadius: number
		boilingPoint: number
		bondingType: string
		cpkHexColor: string
		density: number
		electronAffinity: number
		electronConfiguration: string
		groupBlock: string
		ionRadius: string
		ionozationEnergy: number
		meltingPoint: number
		name: string
		oxidationStates: string
		standardState: string
		symbol: string
		vanDerWaalsRadius: number
		yearDiscovered: number
		color: Writable<string | null>
	}
	type Tile = {
		x: number
		y: number
		element: ChemicalElement | null
		learned: boolean
	}
	type QuizMode = Writable<'atomicNumber' | 'symbol' | 'groupBlock' | 'name'>
	type Tab<T> = { name: string, elements: T[] }
	type Item = { x: number, y: number, active: boolean }
	type BondType = {}

	interface Bond extends Item {
		bondType: BondType
	}

	interface GraphicElement extends ChemicalElement, Item {}

}

export {};
