<script>

  import { mapsApiLoaded, journey, Utilities } from "./stores"

  let mapContainer, map, ready, center,
  zoom = 8

  $: if (mapContainer && $mapsApiLoaded && $journey.start && $journey.destination) {
    center = { lat: $journey.start.geometry.location.lat(), lng: $journey.start.geometry.location.lng() }
    ready = true
    createMap()
    $journey.route = Utilities.createRoute(map, $journey.start, $journey.destination)
  }

  let createMap = () => {
		map = new google.maps.Map(
      mapContainer, 
      {
        zoom,
			  center
      }
    )
    //Utilities.createMarker(map, $journey.start.geometry.location.lat(), $journey.start.geometry.location.lng(), "Journey start")
    //Utilities.createMarker(map, $journey.destination.geometry.location.lat(), $journey.destination.geometry.location.lng(), "Destination")
  }

</script>
<div class="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12" bind:this="{mapContainer}"> 
</div>