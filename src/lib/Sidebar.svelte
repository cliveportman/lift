<script>

  import { onMount } from 'svelte'
  import { Utilities, mapsApiLoaded, mapsApiKey, journey } from "./stores"
  import Autocomplete from './components/Autocomplete.svelte'

  let ready = false, start, destination, returnJourney

  onMount( async () => {
    Utilities.loadGoogleMapsApi()
    ready = true
  })

  const autocompleteOptions = {
    fields: ['address_components', 'geometry'],
    types: []
  }
  let onStartChange = (e) => {
    $journey.start = e.detail.place // e.detail.place.geometry.location.lng())
  }
  let onDestinationChange = (e) => {
    $journey.destination = e.detail.place
  }
  let onReady = () => {
    //console.log('Autocomplete ready')
  } 

</script>


<div class="relative overflow-hidden py-10 px-6 bg-gradient-to-b from-teal-500 to-teal-600 sm:px-10 xl:p-12 text-left">

  {#if $mapsApiLoaded && ready}
    <h3 class="text-lg font-medium text-white">Add your journey</h3>
    <p class="mt-6 text-base text-teal-50 max-w-3xl">Whether you're looking to Liftshare as a driver or a passenger, listing your journey is the best way to find a match.</p>

    <div class="mt-6">
      <label for="journey-start" class="block text-medium font-medium text-white">Journey start</label>
        <Autocomplete 
          apiKey="{mapsApiKey}" class="block mt-1 py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-gray-500 focus:border-grey-500 border-warm-gray-300 rounded-md"
          on:place_changed="{onStartChange}"
          {autocompleteOptions}
          on:ready="{onReady}"
          placeholder="Enter starting location"
          value="{start}"
        />
    </div>

    <div class="mt-6">
      <label for="journey-destination" class="block text-medium font-medium text-white">Destination</label>
      <Autocomplete 
        apiKey="{mapsApiKey}" class="block mt-1 py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-gray-500 focus:border-grey-500 border-warm-gray-300 rounded-md"
        on:place_changed="{onDestinationChange}"
        {autocompleteOptions}
        on:ready="{onReady}"
        placeholder="Enter destination"
        value="{destination}"
      />
    </div>

    <div class="mt-6 relative flex items-start">
      <div class="flex items-center h-5">
        <input id="comments" aria-describedby="comments-description" name="1" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" bind:checked="{$journey.returnJourney}">
      </div>
      <div class="ml-3">
        <label for="comments" class="text-medium font-medium text-white">This is a return journey (round trip)</label>
      </div>
    </div>
  {/if}

</div>