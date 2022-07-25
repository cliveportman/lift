<script>

  import { onMount } from 'svelte'
  import { Utilities, mapsApiLoaded, locations, journey, isReturn } from "./stores"
  import Autocomplete from './components/Autocomplete.svelte'
  import Checkbox from './components/Checkbox.svelte'

  let ready = false

  onMount( async () => {
    Utilities.loadGoogleMapsApi()
    ready = true
  })

  // If unchecking the return option, empty the return date from the journey to avoid any confusion
  $: if (!$isReturn) {
    $journey.return = null
  }

  $: console.log($journey)

</script>


<div class="relative overflow-hidden py-10 px-6 bg-gradient-to-b from-teal-500 to-teal-600 sm:px-10 xl:p-12 text-left">

  {#if $mapsApiLoaded && ready}

      <h2 class="text-lg font-bold text-white">Add your journey</h2>

        <p class="mt-6 text-base text-teal-50 max-w-3xl">Whether you're looking to Liftshare as a driver or a passenger, listing your locations is the best way to find a match.</p>

        <div class="mt-6">
          <Autocomplete bind:location="{$locations.start}" label="Journey start" placeholder="Enter starting location" />
        </div>

        <div class="mt-6">
          <Autocomplete bind:location="{$locations.destination}" label="Destination" placeholder="Enter destination" />
        </div>

        <div class="mt-6 relative flex items-start">
          <Checkbox bind:checked="{$isReturn}" label="This is a return journey (round trip)" />
        </div>

        {#if $journey.route}
          <div class="mt-6 text-white">
            <p>Great! We've found your route!<br>From: <strong>{Utilities.getFormattedAddress($locations.start.address_components)}</strong><br>To: <strong>{Utilities.getFormattedAddress($locations.destination.address_components)}</strong><br>Distance: <strong>{$journey.route.distance.text}</strong>.</p>
          </div>

          <label class="block mt-6">
            <span class="block text-medium font-medium text-white">Departure date</span>
            <input type="date" bind:value="{$journey.depart}" placeholder="When do you depart?" class="block mt-1 py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-gray-500 focus:border-grey-500 border-warm-gray-300 rounded-md">
          </label>

          {#if $isReturn}
            <label class="block mt-6">
              <span class="block text-medium font-medium text-white">Return date</span>
              <input type="date" bind:value="{$journey.return}" placeholder="When do you return?" class="block mt-1 py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-gray-500 focus:border-grey-500 border-warm-gray-300 rounded-md">
            </label>
          {/if}
        {/if}




  {/if}

</div>

<style lang="scss">
  .hide {
    height: 0; overflow: hidden;
    transition: 0.3s height;
  }
</style>