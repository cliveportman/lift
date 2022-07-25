<script>

  import { mapsApiLoaded, locations, Utilities, route } from "./stores"

  let mapContainer, map, ready, center,
  zoom = 8

  $: if (mapContainer && $mapsApiLoaded && $locations.start && $locations.destination) {
    center = { lat: $locations.start.geometry.location.lat(), lng: $locations.start.geometry.location.lng() }
    ready = true
    createMap()
    
  }

  let createMap = async () => {
		map = new google.maps.Map(
      mapContainer, 
      {
        zoom,
			  center
      }
    )
    $route = await Utilities.createRoute(map, $locations.start, $locations.destination)
  }

</script>
<div class="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12" bind:this="{mapContainer}"> 
</div>