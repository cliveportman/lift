<script>

  import { onMount } from 'svelte'
  import { Utilities, mapsApiLoaded, locations, journey, uiStage } from "./stores"
  import Autocomplete from './components/Autocomplete.svelte'
  import Checkbox from './components/Checkbox.svelte'

  let ready = false

  // Wait for everything to mount before loading the API
  onMount( async () => {
    Utilities.loadGoogleMapsApi()
    // With hot reload, we could already have the API loaded but the page not have mounted.
    // Use ready for this and test for both before displaing anything requiring the API.
    ready = true
  })

  // If unchecking the return option, empty the return date from the journey to avoid any confusion
  $: if (!$journey.isReturn) {
    $journey.return = null
  }

  let startAgain = () => {
    // Clear everything but some work needs doing elsewhere, e.g. hiding map
    $locations = {start: null, destination: null }
    $journey = {route: null, isReturn: false, depart: null, return: null}
  }

</script>


<div class="relative overflow-hidden py-10 px-6 sm:px-10 xl:p-12 text-left">

  {#if $mapsApiLoaded && ready}

    <div class="border border-slate-300 rounded-md">
      <h2 class="border-b border-slate-300 px-3 py-2">
        <button type="button" class="text-xl font-bold text-slate-600 " on:click="{ () => {$uiStage = 'locations'} }">Your Journey</button>
      </h2>
      <div class="panel px-3" class:hide="{$uiStage != 'locations'}">

        <p class="mt-1 text-m text-slate-600">Whether you're looking to Liftshare as a driver or a passenger, tell us where you want to go.</p>        
        <Autocomplete bind:location="{$locations.start}" label="Journey start" placeholder="Enter starting location" />
        <Autocomplete bind:location="{$locations.destination}" label="Destination" placeholder="Enter destination" />      

        <div class="mt-3 pb-2 relative flex items-start">
          <Checkbox bind:checked="{$journey.isReturn}" label="This is a return journey (round trip)" />
        </div>

        <div class="pt-1 pb-3 flex justify-between">
          <button type="button" class="border-b border-slate-300 inline-flex items-center px-4 py-2 border border-transparent text-m font-medium rounded-md shadow-sm text-white bg-slate-300 hover:bg-slate-600" on:click="{ () => { startAgain() } }">Start again</button>
          <button type="button" class="border-b border-slate-300 inline-flex items-center px-4 py-2 border border-transparent text-m font-medium rounded-md shadow-sm text-white bg-slate-600 hover:bg-slate-600" disabled="{!($locations.start && $locations.destination)}" on:click="{ () => { $uiStage = 'schedule'} }">Continue</button>
        </div>
      
      </div>
    </div>

    <div class=" mt-6 border border-slate-300 rounded-md">
      <h2 class="border-b border-slate-300 px-3 py-2">
        <button type="button" class="text-xl font-bold text-slate-600" on:click="{ () => {$uiStage = 'schedule'} }">Your schedule</button>
      </h2>
      <div class="panel px-3" class:hide="{$uiStage != 'schedule'}">

        {#if $journey.route}
          <label class="block pb-3">
            <span class="block mt-3 text-medium font-medium text-slate-600">Departure date</span>
            <input type="date" bind:value="{$journey.depart}" placeholder="When do you depart?" class="block mt-1 py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-gray-500 focus:border-grey-500  border border-slate-300 rounded-md">
          </label>

          {#if $journey.isReturn}
            <label class="block pb-3">
              <span class="block text-medium font-medium text-slate-600">Return date</span>
              <input type="date" bind:value="{$journey.return}" placeholder="When do you return?" class="block mt-1 py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-gray-500 focus:border-grey-500  border border-slate-300 rounded-md">
            </label>
          {/if}
        {/if}

        <div class="pt-1 pb-3 flex justify-between">
          <button type="button" class="border-b border-slate-300 inline-flex items-center px-4 py-2 border border-transparent text-m font-medium rounded-md shadow-sm text-white bg-slate-300 hover:bg-slate-600" on:click="{ () => { $uiStage = 'locations'} }">Back</button>
          <button type="button" class="border-b border-slate-300 inline-flex items-center px-4 py-2 border border-transparent text-m font-medium rounded-md shadow-sm text-white bg-slate-600 hover:bg-slate-600"  disabled="{!($locations.start && $locations.destination && $journey.depart && ($journey.isReturn ? $journey.return : true))}" on:click="{ () => { $uiStage = 'review'} }">Continue</button>
        </div>

      </div>
    </div>

    <div class="mt-6 border border-slate-300 rounded-md">
      <h2 class="border-b border-slate-300 px-3 py-2">
        <button type="button" class="text-xl font-bold text-slate-600" on:click="{ () => {$uiStage = 'review'} }">Confirm details</button>
      </h2>
      <div class="panel px-3" class:hide="{$uiStage != 'review'}">

        {#if $journey.route}
          <div class="mt-1 text-m text-slate-600">
            <p class="mt-1 mb-3 text-m text-slate-600">Please confirm you're happy with these details before continuing.</p> 
            <p class="mb-3">From: <strong>{Utilities.getFormattedAddress($locations.start.address_components)}</strong></p>
            <p class="mb-3">To: <strong>{Utilities.getFormattedAddress($locations.destination.address_components)}</strong></p>
            <p class="mb-3">Distance: <strong>{$journey.route.distance.text}</strong>.</p>
            <p class="mb-3">Departure date: <strong>{Utilities.getFormattedDate($journey.depart)}</strong></p>
            {#if $journey.isReturn}
              <p class="mb-3">Return date: <strong>{Utilities.getFormattedDate($journey.return)}</strong></p>
            {/if}
          </div>
        {/if}

        <div class="pb-3 flex justify-between">
          <button type="button" class="border-b border-slate-300 inline-flex items-center px-4 py-2 border border-transparent text-m font-medium rounded-md shadow-sm text-white bg-slate-300 hover:bg-slate-600" on:click="{ () => { $uiStage = 'schedule'} }">Back</button>
          <button type="button" class="border-b border-slate-300 inline-flex items-center px-4 py-2 border border-transparent text-m font-medium rounded-md shadow-sm text-white bg-slate-600 hover:bg-slate-600">Confirm</button>
        </div>

      </div>
    </div>




  {/if}

</div>

<style lang="scss">
  .hide {
    height: 0; overflow: hidden;
    transition: 0.3s height;
  }
</style>