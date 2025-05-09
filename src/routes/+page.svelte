<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
	import '../app.css';
	import L from 'leaflet';
	import 'leaflet-routing-machine';

	import { onMount } from 'svelte';

	let mapDiv: HTMLDivElement;
	
	let waypointNumber = 8;

	onMount(() => {
		const map = L.map(mapDiv).setView([52.43162959873308, 4.911296367645265], 12);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; OpenStreetMap contributors'
		}).addTo(map);

		// L.marker([52.43162959873308, 4.911296367645265])
		// 	.addTo(map)
		// 	.bindPopup('1. Begin route')
		// 	.openPopup();

		
		const control = L.Routing.control({
			waypointMode: 'snap',
			waypoints: [
				L.Routing.waypoint(L.latLng(52.43162959873308, 4.911296367645265), '1'),
				L.Routing.waypoint(L.latLng(52.453028039046714, 4.908056259155273), '2'),
				L.Routing.waypoint(L.latLng(52.42101154027451, 4.907938241958619), '3'),
				L.Routing.waypoint(L.latLng(52.425087659372686, 4.911317825317384), '4'),

				L.Routing.waypoint(L.latLng(52.42958207610243, 4.913308024406434), ''),
				
				L.Routing.waypoint(L.latLng(52.42931713411541, 4.912932515144349), '5'),
				L.Routing.waypoint(L.latLng(52.428420898798656, 4.910067915916444), '6'),
			],
		
			createMarker: function (i, wp, n) {
				return L.marker(wp.latLng, {
					icon: L.divIcon({
						className: 'my-label',
						html: `${wp.name}`,
						iconAnchor: [15, 15]
					})
				});
			},
			// routeWhileDragging: false, // Prevent the route from being updated while dragging
			// autoRoute: true,
			// collapsible: false,
			// fitSelectedRoutes: false,
			// showAlternatives: false,
			lineOptions: {styles: [{color: '#242c81', weight: 3}] , extendToWaypoints: false , missingRouteTolerance: 0 , addWaypoints: false},
		
			

		});
		control.addTo(map);

		map.on('click', (e: L.LeafletMouseEvent) => {
			let lat = e.latlng.lat;
			let lng = e.latlng.lng;
			let waypoint = L.Routing.waypoint(L.latLng(lat, lng), `${waypointNumber}`);
			control.spliceWaypoints(control.getWaypoints().length, 0, waypoint);
			waypointNumber += 1
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

	:global(.my-label) {
		font-size: 1rem;
		background-color: white;
		border: 2px solid #242c81;
		border-radius: 50%;
		width: 30px !important;
		height: 30px !important;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		overflow: hidden;
	}
</style>
