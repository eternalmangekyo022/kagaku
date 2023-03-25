<script lang='ts'>
	export let bond: Bond;
	export let mouseDown: (e: MouseEvent) => void = () => {};
	export let mouseUp: (e: MouseEvent) => void = () => {};
	
	const { pos: { start: { x: startX, y: startY }, end: { x: endX, y: endY } } } = bond
	let left = Math.min(startX, endX);
	let top = Math.min(startY, endY)

	const getWidth = (): number => Math.abs(startX - endX);
	const getHeight = (): number => Math.abs(startY - endY);

	let width = getWidth();
	let height = getHeight();

	$: bond, () => {
		left = Math.min(startX, endX);
		console.log('fefef')
	}
</script>

{#if bond}
	{#key bond}
		<svg class='absolute h-full overflow-visible'
			style='width: {width}px; height: {height}px; left: {bond.pos.start.x}px; top: {bond.pos.start.y}px;'
		>
			<line class='cursor-pointer z-10 w-full h-full absolute'
				on:mousedown={e => mouseDown(e)}
				on:mouseup={mouseUp}
				x1={0}
				x2={width}
				y1={0} 
				y2={height} 
				stroke='black'
				stroke-width=4
				fill='black'
			/>
		</svg>
	{/key}
{/if}