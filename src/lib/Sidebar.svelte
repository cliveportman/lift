<script>

  import { onMount } from 'svelte'
  import { Utilities, mapsApiLoaded, journey } from "./stores"
  import Autocomplete from './components/Autocomplete.svelte'
  import Checkbox from './components/Checkbox.svelte'

  let ready = false, start, destination, returnJourney

  onMount( async () => {
    Utilities.loadGoogleMapsApi()
    ready = true
  })

</script>


<div class="relative overflow-hidden py-10 px-6 bg-gradient-to-b from-teal-500 to-teal-600 sm:px-10 xl:p-12 text-left">

  {#if $mapsApiLoaded && ready}
    <h3 class="text-lg font-medium text-white">Add your journey</h3>
    <p class="mt-6 text-base text-teal-50 max-w-3xl">Whether you're looking to Liftshare as a driver or a passenger, listing your journey is the best way to find a match.</p>

    <div class="mt-6">
      <Autocomplete bind:location="{$journey.start}" label="Journey start" placeholder="Enter starting location" />
    </div>

    <div class="mt-6">
      <Autocomplete bind:location="{$journey.destination}" label="destination" placeholder="Enter destination" />
    </div>

    <div class="mt-6 relative flex items-start">
      <Checkbox bind:returnJourney="{$journey.returnJourney}" label="This is a return journey (round trip)" />
    </div>
  {/if}

</div>