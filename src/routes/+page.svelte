<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
	import '../app.css';
	import L from 'leaflet';
	import 'leaflet-routing-machine';

	import { onMount } from 'svelte';

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
			.bindPopup('1. Begin route')
			.openPopup();

		map.on('click', (e: L.LeafletMouseEvent) => {
			lat = e.latlng.lat;
			lng = e.latlng.lng;
			console.log(`Clicked at: ${lat}, ${lng}`);
		});

		L.Routing.control({
			waypoints: [
				L.Routing.waypoint(L.latLng(52.43162959873308, 4.911296367645265), 'Start Point'),
				L.Routing.waypoint(L.latLng(52.453028039046714, 4.908056259155273), 'End Point'),
				L.Routing.waypoint(L.latLng(52.42101154027451, 4.907938241958619), 'End Point')
			],
			routeWhileDragging: true
		}).addTo(map);
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
