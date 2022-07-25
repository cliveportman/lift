<script>

  import { onMount } from 'svelte'
  import { Utilities, mapsApiLoaded, journey, route } from "./stores"
  import Autocomplete from './components/Autocomplete.svelte'
  import Checkbox from './components/Checkbox.svelte'

  let ready = false

  onMount( async () => {
    Utilities.loadGoogleMapsApi()
    ready = true
  })

</script>


<div class="relative overflow-hidden py-10 px-6 bg-gradient-to-b from-teal-500 to-teal-600 sm:px-10 xl:p-12 text-left">

  {#if $mapsApiLoaded && ready}

      <h2 class="text-lg font-bold text-white">Add your journey</h2>

        <p class="mt-6 text-base text-teal-50 max-w-3xl">Whether you're looking to Liftshare as a driver or a passenger, listing your journey is the best way to find a match.</p>

        <div class="mt-6">
          <Autocomplete bind:location="{$journey.start}" label="Journey start" placeholder="Enter starting location" />
        </div>

        <div class="mt-6">
          <Autocomplete bind:location="{$journey.destination}" label="Destination" placeholder="Enter destination" />
        </div>

        <div class="mt-6 relative flex items-start">
          <Checkbox bind:returnJourney="{$journey.returnJourney}" label="This is a return journey (round trip)" />
        </div>

        {#if $route}
          <div class="mt-6 text-white">
            <p>Great! We've found your route from <strong>{$journey.start.formatted_address}</strong> to <strong>{$journey.destination.formatted_address}</strong>, which is <strong>{$route.distance.text}</strong>.</p>
          </div>
        {/if}




  {/if}

</div>

<style lang="scss">
  .hide {
    height: 0; overflow: hidden;
    transition: 0.3s height;
  }
</style>