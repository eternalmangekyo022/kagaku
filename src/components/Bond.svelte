<script lang='ts'>
	export let bond: Bond;
</script>

{#if bond}
	<svg class='absolute w-full h-full'>
		<line x1={bond.pos[0][0]} x2={bond.pos[1][0]} y1={bond.pos[0][1]} y2={bond.pos[1][1]} 
			stroke='black'
			stroke-width=4
			fill='black'
		/>
	</svg>
{/if}