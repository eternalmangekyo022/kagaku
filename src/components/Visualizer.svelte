<script lang='ts'>
	import { elements } from "../store";
    import { onDestroy } from "svelte";
	import BondComponent from "./Bond.svelte";
    import { type Writable, writable } from "svelte/store";

	const tabs: [Tab<ChemicalElement>, Tab<Bond>] = [{ name: 'Elements', elements: $elements }, { name: 'Bonds', elements: [] }];
	let bonds: Bond[] = []
	let graphicElements: GraphicElement[] = []

	let mouse: Coords = { x: 0, y: 0 };
	let bond: Writable<null | Bond> = writable(null);
	let mouseMode: 'select' | 'bond' = 'select'

	const mouseActions: { select: () => void, bond: () => void } = {
		select: () => {
			if(graphicElements.filter(i => i.active).length === 0 &&  bonds.filter(i => i.active).length === 0) {
				const start = mouse;
				intervals.push(setInterval(() => {
					rectangle = { pos: { start, end: { ...mouse } }, left: getLeft(), top: getTop() };
				}, 5))
			}
		},
		bond: () => {
			const startLocation = mouse;
			bond.set({
				bondType: 'ionic',
				active: false,
				pos: { start: startLocation, end: startLocation }
			});

			intervals.push(setInterval(() => {
				bond.update(prev => ({ ...prev!, pos: { start: startLocation, end: { ...mouse } } }));
			}, 5));
		}
	}

	let intervals: number[] = [];

	let selectWidth = 0;
	let rectangle: Rectangle | null = null;

	const clearIntervals = () => intervals.forEach(i => clearInterval(i));

	onmouseup = (e) => {
		clearIntervals();
		intervals = [];
		graphicElements = graphicElements.map(i => ({ ...i, active: !!rectangle && (i.x < Math.max(rectangle!.pos.start.x, rectangle!.pos.end.x) && i.x > Math.max(rectangle!.pos.start.x, rectangle!.pos.end.x) && i.y > Math.min(rectangle!.pos.start.y, rectangle!.pos.end.y) && i.y < Math.max(rectangle!.pos.start.y, rectangle!.pos.end.y))}));
		bonds = bonds.map(i => ({ ...i, active: !!rectangle && (i.x < Math.max(rectangle!.pos.start.x, rectangle!.pos.end.x) && i.x > Math.max(rectangle!.pos.start.x, rectangle!.pos.end.x) && i.y > Math.min(rectangle!.pos.start.y, rectangle!.pos.end.y) && i.y < Math.max(rectangle!.pos.start.y, rectangle!.pos.end.y))}));
		rectangle = null;
		if(e.target && !((e.target as Element).classList.contains('exception')) && mouseMode === 'bond' && $bond) {
			bonds = [...bonds,	$bond];
			bond.set(null);
		}
	}

	const getLeft = (): number => {
		if(!rectangle) return 0;
		return Math.min(rectangle.pos.start.x, mouse.x);
	}

	const getTop = (): number => {
		if(!rectangle) return 0;
		return Math.min(rectangle.pos.start.y, mouse.y);
	}

	onDestroy(() => {
		clearIntervals();
	})

	$: rectangle, () => {
		if(rectangle) {
			rectangle.left = getLeft();
			rectangle.top = getTop();
		};
	}

</script>

<div class='h-full w-full flex overflow-x-hidden'>
	<!-- select element or bond -->
	<div class='h-full w-[15%] resize-x overflow-x-hidden min-w-[12%] max-w-[35%] border-r-2' bind:clientWidth='{selectWidth}'>
		<div class='w-full h-12 relative'>
			<span class='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>Elements</span>
		</div>
		<div class='w-full h-fit flex flex-wrap'>
			{#each tabs[0].elements as tab}
				<div class='aspect-square border-2 flex flex-col cursor-pointer w-1/3 relative'
					on:click="{() => {
						graphicElements = [...graphicElements, { ...tab, x: 30, y: 30, active: false }]
					}}"
					on:keyup
				>
					{#each [tab.atomicNumber, tab.symbol, tab.name] as x, idx }
						<span 
							class='h-1/3 w-full flex justify-center items-center {idx === 1 ? 'text-[150%]': ''}
							text-ellipsis whitespace-nowrap overflow-hidden select-none'
							>{x}
						</span>
					{/each}
				</div>
			{/each}
		</div>
	</div>
	<!-- visualize shit -->
	<div class='h-full w-[85%] flex flex-col'>
		<div class='relative w-full h-[6%] flex justify-start gap-12 border-2 border-b-zinc-400 exception'>
			<div class='w-12 aspect-square grid place-items-center exception cursor-pointer' style='{mouseMode === 'select' ? 'background: radial-gradient(#000, transparent 70%);' : ''}' on:click={() => mouseMode = 'select' } on:keyup>
				<svg class='relative exception pointer-events-none' viewBox="-15.03 -15.03 180.32 180.32" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000" stroke-width="0.0015026" transform="matrix(1, 0, 0, 1, 0, 0)rotate(270)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30052"></g><g id="SVGRepo_iconCarrier"> <defs> <style>.cls-1{fill:#ffffff;}</style> </defs> <g id="Layer_2" data-name="Layer 2"> <g id="Layer_1-2" data-name="Layer 1"> <path d="M68.89,106,30.12,150.26c-4.4-1.76-8.24-4.75-12-7.63A150.09,150.09,0,0,1,3.49,129.42c-4.41-4.44-4.64-7.86-.69-12.93,7.57-9.7,15.5-19.11,23.2-28.71,2.84-3.53,5.47-7.24,8.35-11.08-4.3-4.91-8-9.56-12.92-13.11a81.86,81.86,0,0,1-7.1-6.22,6.08,6.08,0,0,1-1.76-6.59c3.31-2.88,7.81-4,12-5.84,8.64-3.81,17.28-7.63,25.94-11.39C60.17,29.33,70,25.27,79.63,21q15.69-7,31.23-14.28c3.86-1.81,7.44-4.24,11.29-6.07,3.44-1.63,6.47.06,6.74,3.83a36.9,36.9,0,0,1-.39,10.24,303.52,303.52,0,0,1-12.65,43.64c-4.14,11-7.76,22.18-10.93,33.47-1.84,6.56-2.35,13.49-3.43,20.26-.18,1.13-.25,2.28-.32,3.42-.43,6.6-5.38,8.85-10.8,5.41-4.83-3.06-9.55-6.28-14.27-9.51C73.78,109.79,71.6,108,68.89,106ZM23.79,55c2.07,1.83,3.34,2.91,4.56,4.05,4.38,4.1,8.81,8.16,13.09,12.36,2.51,2.47,2.83,4,1.13,6.87a128.77,128.77,0,0,1-8,12.12c-7.07,9.34-14.39,18.49-21.52,27.8a51.53,51.53,0,0,0-3.42,6,57,57,0,0,0,17.74,15.21c7.83-8.37,15.56-16.37,23-24.65,4.19-4.68,7.79-9.87,11.8-14.72,2.62-3.18,4.7-3.83,8.25-2.14a31.27,31.27,0,0,1,7,4.79A57.78,57.78,0,0,0,91.16,112c.58-2.29,1.21-4.14,1.51-6C94.22,96,97.15,86.49,100.4,77,106,60.51,113,44.46,117.25,27.51a75.3,75.3,0,0,0,2.81-15.86C88.44,27.53,55.71,38.76,23.79,55Z"></path> <path class="cls-1 exception" d="M23.79,55c31.92-16.28,64.65-27.51,96.27-43.39a75.3,75.3,0,0,1-2.81,15.86C113,44.46,106,60.51,100.4,77c-3.25,9.5-6.18,19-7.73,28.94-.3,1.91-.93,3.76-1.51,6a57.78,57.78,0,0,1-13.76-9.29,31.27,31.27,0,0,0-7-4.79c-3.55-1.69-5.63-1-8.25,2.14-4,4.85-7.61,10-11.8,14.72C42.93,123,35.2,131,27.37,139.41A57,57,0,0,1,9.63,124.2a51.53,51.53,0,0,1,3.42-6c7.13-9.31,14.45-18.46,21.52-27.8a128.77,128.77,0,0,0,8-12.12c1.7-2.85,1.38-4.4-1.13-6.87-4.28-4.2-8.71-8.26-13.09-12.36C27.13,58,25.86,56.87,23.79,55Z"></path> </g> </g> </g></svg>
			</div>
			<div class='h-full w-12 relative cursor-pointer exception' on:keyup on:click={() => mouseMode = 'bond'} style='{mouseMode === 'bond' ? 'background: radial-gradient(rgba(0, 0, 0, 0.5), transparent 70%);' : ''}'>
				<svg class='exception'>
					<line class='exception' x1='0' y1='5%' x2='10%' y2='25%' stroke='black' stroke-width='2'/>
				</svg>
			</div>
		</div>
		<div class='h-[94%] bg-gray-200 relative' style='width: {window.innerWidth - selectWidth}px;'
			on:mousemove='{({ pageX, pageY, currentTarget }) => {
				mouse = { x: pageX - currentTarget.offsetLeft, y: pageY - currentTarget.getBoundingClientRect().top };
			}}'
			on:mousedown={() => {
				if(mouseMode === 'select') {
					mouseActions.select();
				} else if(mouseMode === 'bond') {
					mouseActions.bond()
				};
			}}>
			{#if $bond}
				<BondComponent bond={$bond}/>
			{/if}
			<!-- mouse mode -->
			{#each graphicElements as item}
					<div
						class='select-none w-20 aspect-square absolute flex justify-center items-center -translate-x-1/2 -translate-y-1/2 z-10'
						style='left: {item.x}px; top: {item.y}px; cursor: {item.active ? 'grabbing' : (mouseMode === 'select' ? 'pointer': 'default')};'
						on:mousedown='{() => {
							if(mouseMode === 'select') {
								intervals.push(setInterval(() => {
									const { x, y } = mouse
									item = { ...item, x, y };
								}, 5))
								item.active = true
							}
						}}'
					>
						{item.symbol}
					</div>
			{/each}
			{#each bonds as bond}
				<BondComponent mouseUp={clearIntervals} mouseDown={({ clientX: x, clientY: y }) => {
						bond.active = true;
						intervals.push(setInterval(() => {
							const pos = { start: { x: bond.pos.start.x + (x - mouse.x) * -1, y: bond.pos.start.y + (y - mouse.y) * -1 }, end: { x: bond.pos.end.x + (x - mouse.x) * -1, y: bond.pos.end.y + (y - mouse.y) * -1 } }
							bond = { ...bond, pos }
						}, 10))
				}} {bond}/>
			{/each}
			{#if rectangle}
				<div class='absolute bg-gradient-to-br from-gray-400 to-amber-100 border-2 border-blue-200 opacity-40' style='width: {Math.abs(rectangle.pos.start.x - rectangle.pos.end.x)}px; 
					height: {Math.abs(rectangle.pos.start.y - rectangle.pos.end.y)}px;
					left: {rectangle.left}px; top: {rectangle.top}px;
					'/>
			{/if}
		</div>
	</div>
</div>