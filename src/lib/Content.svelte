<script>

  import { mapsApiLoaded, locations, Utilities, journey, uiStage, mapStyles } from "./stores"

  let mapContainer, map, opacity, center,
  zoom = 8

  

  $: if (mapContainer && $mapsApiLoaded && $locations.start && $locations.destination) {
    center = { lat: $locations.start.geometry.location.lat(), lng: $locations.start.geometry.location.lng() }
    opacity = 1
    createMap()    
  }

  $: if ($journey.route == null) {
    // We're recommended to re-use maps rather than delete them. So, when clearing the user's chouces
    // we just hide the existing map until it's ready to be used again
    opacity = 0
  }

  let createMap = async () => {
		map = new google.maps.Map(
      mapContainer, 
      {
        zoom,
			  center,        
			  styles: mapStyles
      }
    )
    $journey.route = await Utilities.createRoute(map, $locations.start, $locations.destination)
  }

</script>
<div class="col-span-2">
  <div class="container" bind:this="{mapContainer}" style:opacity="{opacity}"></div>
</div>

<style lang="scss">
  .container {
    width: 100%;
    height: 100%;
  }
</style>