<script lang='ts'>
	import Switch from "./Switch.svelte";
	import { elements } from "../store";
	import { writable, type Writable } from "svelte/store";

	const active: Writable<boolean> = writable(false);
	const tabs: [Tab<ChemicalElement>, Tab<Item.Bond>] = [{ name: 'Elements', elements: $elements }, { name: 'Bonds', elements: [] }];
	let items: [Item.Bond | Item.Element] | [] = [];

	let isHovering: boolean = false;
	let mouse = { x: 0, y: 0 }
	onmousemove = ({ clientX, clientY }: { clientX: number, clientY: number }) => mouse = { x: clientX, y: clientY }

	$: console.log(isHovering)
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
					<div class='w-1/3 aspect-square relative border-2 flex flex-col cursor-pointer'
						on:mousedown="{() => console.log(tab.name)}"
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
	<div class='w-[85%] h-full bg-gray-200'
		on:mouseenter="{() => isHovering = true}"
		on:mouseleave="{() => isHovering = false}"
	>

	</div>
</div>