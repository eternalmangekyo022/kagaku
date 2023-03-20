<script lang='ts'>
	import Switch from "./Switch.svelte";
	import { elements } from "../store";
	import { writable, type Writable } from "svelte/store";
    import { onDestroy } from "svelte";

	const active: Writable<boolean> = writable(false);
	const tabs: [Tab<ChemicalElement>, Tab<Bond>] = [{ name: 'Elements', elements: $elements }, { name: 'Bonds', elements: [] }];
	let items: (Bond | GraphicElement)[] = [];

	let mouse: [number, number] = [0, 0];

	const isChemicalElement = (obj: ChemicalElement | Bond): obj is ChemicalElement => 'name' in obj && 'symbol' in obj
	let intervals: number[] = [];

	let selectWidth = 0;
	let rectangle: Rectangle | null = null;

	const clearIntervals = () => intervals.forEach(i => clearInterval(i));

	onmouseup = () => {
		clearIntervals();
		intervals = [];
		rectangle = null;

		items = items.map(i => ({ ...i, active: false }));
	}

	const getLeft = (): number => {
		if(!rectangle) return 0
		return Math.min(rectangle.pos[0][0], mouse[0]);
	}

	const getTop = (): number => {
		if(!rectangle) return 0
		return Math.min(rectangle.pos[0][1], mouse[1]);
	}

	onDestroy(() => {
		clearIntervals();
	})

	$: rectangle, () => {
		if(rectangle) {
			rectangle.left = getLeft()
			rectangle.top = getTop()
		}
	}

</script>

<div class='h-full w-full flex overflow-x-hidden'>
	<!-- select element or bond -->
	<div class='h-full w-[15%] resize-x overflow-x-hidden min-w-[12%] max-w-[35%] border-r-2' bind:clientWidth='{selectWidth}'>
		<!-- place for switch -->
		<div class='w-full h-[6%] border-b-2 flex justify-center items-center gap-10'>
			<span>Elements</span>
			<Switch {active} className='w-[2.5rem] h-[1rem] cursor-pointer border-2 border-black'/>
			<span>Bonds</span>
		</div>

		<div class='w-full h-fit flex flex-wrap'>
			{#if $active}
				{#each tabs[1].elements as tab}
					<div class=''></div>
				{/each}
			{:else}
				{#each tabs[0].elements as tab}
					<div class='aspect-square border-2 flex flex-col cursor-pointer w-1/3 relative'
						on:click="{() => {
							items = [...items, { ...tab, x: 30, y: 30, active: false }]
						}}"
						on:keyup
					>
						{#each [tab.atomicNumber, tab.symbol, tab.name] as x, idx}
							<span 
								class='h-1/3 w-full flex justify-center items-center {idx === 1 ? 'text-[150%]': ''}
								text-ellipsis whitespace-nowrap overflow-hidden select-none'
								>{x}
							</span>
						{/each}
					</div>
				{/each}
			{/if}
		</div>
	</div>
	<!-- visualize shit -->
	<div class='h-full bg-gray-200 relative' style='width: {window.innerWidth - selectWidth}px;'
		on:mousemove='{({ pageX, pageY, currentTarget  }) => {
			mouse = [pageX - currentTarget.offsetLeft, pageY - currentTarget.getBoundingClientRect().top]
		}}'
		on:mousedown={() => {
			if(items.filter(i => i.active).length === 0) {
				const startLocation = mouse;
				intervals.push(setInterval(() => {
					rectangle = { pos: [startLocation, [...mouse]], left: getLeft(), top: getTop() };
				}, 5))
		}}}>
		{#each items as item}
			<div
				class='select-none w-20 aspect-square absolute flex justify-center items-center -translate-x-1/2 -translate-y-1/2'
				style='left: {item.x}px; top: {item.y}px; cursor: {item.active ? 'grabbing' : 'pointer'};'
				on:mousedown='{() => {
					intervals.push(setInterval(() => {
						item = { ...item, x: mouse[0], y: mouse[1] };
					}, 5))
					item.active = true
				}}'

			>{isChemicalElement(item) ? item.symbol : item}
			</div>
		{/each}
		{#if rectangle}
			<div class='absolute bg-blue-300 border-2 border-blue-500 opacity-40' style='width: {Math.abs(rectangle.pos[0][0] - rectangle.pos[1][0])}px; 
				height: {Math.abs(rectangle.pos[0][1] - rectangle.pos[1][1])}px;
				left: {rectangle.left}px; top: {rectangle.top}px;
				'/>
		{/if}
	</div>
</div>