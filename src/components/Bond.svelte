<script lang='ts'>
	export let bond: Bond;
	export let mouseDown: (e: MouseEvent) => void = () => {};
	export let mouseUp: (e: MouseEvent) => void = () => {};

	const getWidth = (): number => {

		return 0
	}

	const getHeight = (): number => {
		return 0
	}
</script>

{#if bond}
	<svg class='absolute w-full h-full' on:keyup>
		<line class='cursor-pointer z-10' on:mousedown={e => mouseDown(e)} on:mouseup={mouseUp} x1={bond.pos.start.x} x2={bond.pos.end.x} y1={bond.pos.start.y} y2={bond.pos.end.y} 
			stroke='black'
			stroke-width=4
			fill='black'
		/>
	</svg>
{/if}