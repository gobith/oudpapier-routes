// src/types/leaflet-routing-machine.d.ts
import 'leaflet';

declare module 'leaflet' {
  namespace Routing {
    interface Waypoint {
      latLng: LatLng;
      name?: string;
      options?: any;
    }

    interface RoutingControlOptions extends ControlOptions {
      waypoints?: LatLng[];
      routeWhileDragging?: boolean;
      show?: boolean;
      fitSelectedRoutes?: boolean;
      showAlternatives?: boolean;
      lineOptions?: PolylineOptions;
      altLineOptions?: PolylineOptions;
      createMarker?: (i: number, waypoint: Waypoint, n: number) => Marker | null;
    }

    class Control extends Control {
      constructor(options?: RoutingControlOptions);
      getWaypoints(): Waypoint[];
      setWaypoints(waypoints: LatLng[]): void;
    }

    function control(options?: RoutingControlOptions): Control;
  }
}
