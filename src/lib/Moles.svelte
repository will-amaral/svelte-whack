<div class="moles">
	<slot />
</div>

<style>
	.moles {
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: repeat(3, 20vmin);
		grid-template-rows: repeat(2, 20vmin);
		align-items: center;
	}

	.moles > *:nth-of-type(4),
	.moles > *:nth-of-type(5) {
		transform: translate(50%, 0);
	}
</style>
