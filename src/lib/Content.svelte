<script>

  import { mapsApiLoaded, locations, Utilities, journey, uiStage } from "./stores"

  let mapContainer, map, ready, center,
  zoom = 8

  

  $: if (mapContainer && $mapsApiLoaded && $locations.start && $locations.destination) {
    center = { lat: $locations.start.geometry.location.lat(), lng: $locations.start.geometry.location.lng() }
    ready = 1
    createMap()    
  }

  $: if ($journey.route == null) {
    ready = 0
  }

  let createMap = async () => {
		map = new google.maps.Map(
      mapContainer, 
      {
        zoom,
			  center
      }
    )
    $journey.route = await Utilities.createRoute(map, $locations.start, $locations.destination)
    $uiStage = 'schedule'
  }

</script>
<div class="col-span-2">
  <div class="container" bind:this="{mapContainer}" style:opacity="{ready}"></div>
</div>

<style lang="scss">
  .container {
    width: 100%;
    height: 100%;
  }
</style>