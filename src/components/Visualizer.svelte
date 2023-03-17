<script lang='ts'>
	import Switch from "./Switch.svelte";
	import { elements } from "../store";
	import { writable, type Writable } from "svelte/store";

	const active: Writable<boolean> = writable(false);
	const tabs: [Tab<ChemicalElement>, Tab<Bond>] = [{ name: 'Elements', elements: $elements }, { name: 'Bonds', elements: [] }];
	let items: (Bond | GraphicElement)[] = [];

	let mouse = { x: 0, y: 0 }

	const isChemicalElement = (obj: ChemicalElement | Bond): obj is ChemicalElement => 'name' in obj && 'symbol' in obj
	let interval: number;
	let currentActive: null | Item = null 

	onmouseup = () => {
		clearInterval(interval)
		if(currentActive) {
			currentActive.active = false
			currentActive = null
		}
	}

</script>

<div class='h-full w-full flex'>
	<!-- select element or bond -->
	<div class='h-full w-[15%] resize-x overflow-x-hidden min-w-[12%] max-w-[35%] border-r-2'>
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
							items = [...items, { ...tab, x: 0, y: 0, active: false }]
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
	<div class='w-[85%] h-full bg-gray-200 relative'
		on:mousemove='{({ pageX, pageY, currentTarget  }) => {
			mouse = { x: pageX - currentTarget.offsetLeft, y: pageY - currentTarget.getBoundingClientRect().top }
		}}'
	>
		{#each items as item}
			<div
				class='select-none w-20 aspect-square absolute cursor-pointer flex justify-center items-center {item.active ? '-translate-x-1/2 -translate-y-1/2' : ''}'
				style='left: {item.x}px; top: {item.y}px'
				on:mousedown='{() => {
					interval = setInterval(() => {
						item.x = mouse.x
						item.y = mouse.y
						item.active = true
					}, 5)
				}}'

			>{isChemicalElement(item) ? item.symbol : item}</div>
		{/each}
	</div>
</div>