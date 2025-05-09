<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import '../app.css';

	import { onMount } from 'svelte';
	import L from 'leaflet';

	let mapDiv: HTMLDivElement;

	onMount(() => {
		const map = L.map(mapDiv).setView([51.505, -0.09], 13);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; OpenStreetMap contributors'
		}).addTo(map);

		L.marker([51.505, -0.09])
			.addTo(map)
			.bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
			.openPopup();
	});
</script>

<div bind:this={mapDiv}></div>

<style>
	div {
        height: 100vh;
        width: 100%;
        margin: 0;
        padding: 0;
	}
</style>
