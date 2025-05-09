<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import '../app.css';

	import { onMount } from 'svelte';
	import L from 'leaflet';

	let mapDiv: HTMLDivElement;
	let lat = $state(0);
	let lng = $state(0);

	onMount(() => {
		const map = L.map(mapDiv).setView([52.43162959873308, 4.911296367645265], 16);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; OpenStreetMap contributors'
		}).addTo(map);

		L.marker([52.43162959873308, 4.911296367645265])
			.addTo(map)
			.bindPopup('Begin route')
			.openPopup();

		map.on('click', (e: L.LeafletMouseEvent) => {
			lat = e.latlng.lat;
			lng = e.latlng.lng;
			console.log(`Clicked at: ${lat}, ${lng}`);
		});
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
