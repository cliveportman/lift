<script>

  import { onMount } from 'svelte'
  import { Utilities, locations } from '../stores';

  export let label, location, placeholder

  let input, value = ''

  const options = {
    componentRestrictions: { country: "UK" },
    fields: ["address_components", "geometry", "name"],
  }

  $: if (location) {
    value = Utilities.getFormattedAddress(location.address_components)
  }
  
  $: if ($locations.start == null && $locations.destination == null) {
    value = ''
  }

  onMount( async () => {  
    const autocomplete = new google.maps.places.Autocomplete(input, options)
    autocomplete.addListener('place_changed', function () {
      location = autocomplete.getPlace()
    })

  })

</script>

<label for="journey-start" class="block mt-3 text-medium font-medium text-slate-600">{label}</label>
<input 
  type="text" 
  value="{value}" 
  bind:this="{input}" 
  placeholder="{placeholder}" 
  class="block mt-1 py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-gray-500 focus:border-grey-500  border border-slate-300 rounded-md" 
/>