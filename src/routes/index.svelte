<script>
	import { gsap } from 'gsap';
	import Moles from '$lib/Moles.svelte';
	import Mole from '$lib/Mole.svelte';
	import Timer from '$lib/Timer.svelte';
	import Score from '$lib/Score.svelte';
	import { TIME_LIMIT, generateMoles, MOLE_SCORE, NUMBER_OF_MOLES } from '$lib/constants';

	let playing = false;
	let finished = false;
	let score = 0;
	let molesArray = generateMoles(NUMBER_OF_MOLES, MOLE_SCORE, gsap.utils.random);

	const onWhack = (points) => (score += points);
	const endGame = () => {
		playing = false;
		finished = true;
	};
	const startGame = () => {
		score = 0;
		playing = true;
		finished = false;
	};
</script>

{#if !playing && !finished}
	<h1>Whack-a-Mole</h1>
	<button on:click={startGame}>Start Game</button>
{:else if playing}
	<button class="end-game" on:click={endGame}> End Game </button>
	<div class="info">
		<Score value={score} />
		<Timer time={TIME_LIMIT} onEnd={endGame} />
	</div>
	<Moles>
		{#each molesArray as { id, delay, duration, initialPoints } (id)}
			<Mole {onWhack} {initialPoints} {delay} {duration} {id} />
		{/each}
	</Moles>
{:else if !playing && finished}
	<Score value={score} />
	<button on:click={startGame}>Play Again</button>
{/if}

<style>
	* {
		box-sizing: border-box;
	}

	:root {
		--control: #e69119;
		--color: #fff;
	}

	:global(button) {
		background: var(--control);
		color: var(--color);
		padding: 1rem 2rem;
		border-radius: 1rem;
		border: 4px solid var(--color);
		font-family: 'Fredoka One', cursive;
		font-size: 1.2rem;
	}

	:global(body) {
		background: linear-gradient(#d1e9fa 0 40%, #86c270 40%);
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Fredoka One', cursive;
	}

	:global(h1) {
		font-size: 4rem;
	}

	.end-game {
		position: fixed;
		top: 1rem;
		right: 1rem;
	}

	.info {
		position: fixed;
		top: 1rem;
		left: 1rem;
	}
</style>
