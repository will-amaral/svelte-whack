<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { POINTS_MULTIPLIER, TIME_MULTIPLIER } from '$lib/constants';

	export let onWhack = (score) => console.log(score);
	export let initialPoints = 100;
	export let delay = 0;
	export let duration = 2;
	export let pointsMin = 10;
	export let id;
	let animation;
	let points = initialPoints;
	let whacked = false;

	$: {
		if (whacked) {
			points = initialPoints;
			animation.pause();
			gsap.to(`#mole-${id}`, {
				yPercent: 100,
				duration: 0.1,
				onComplete: () => {
					gsap.delayedCall(gsap.utils.random(1, 3), () => {
						whacked = false;
						animation.restart().timeScale(animation.timeScale() * TIME_MULTIPLIER);
					});
				}
			});
		}
	}

	const handleWhack = () => {
		whacked = true;
		onWhack(points);
	};

	onMount(() => {
		gsap.set(`#mole-${id}`, { yPercent: 100, display: 'block' });
		animation = gsap.to(`#mole-${id}`, {
			yPercent: 10,
			duration,
			yoyo: true,
			delay,
			repeatDelay: delay,
			onRepeat: () => {
				points = Math.floor(Math.max(points * POINTS_MULTIPLIER, pointsMin));
			},
			repeat: -1
		});

		return () => {
			if (animation) animation.kill();
		};
	});
</script>

<div class="mole-hole">
	<button id="mole-{id}" class="mole" on:click={handleWhack}>
		<span class="sr-only">Mole</span>
	</button>
</div>

<style>
	.mole-hole {
		height: 100%;
		width: 100%;
		overflow: hidden;
		border-bottom: 2vmin solid hsl(35, 94%, 13%);
	}

	.mole {
		display: none;
		background: url(static/mole.svg);
		background-size: cover;
		height: 100%;
		width: 100%;
		border: 0;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
</style>
