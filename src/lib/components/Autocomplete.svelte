<script>

  import { onMount } from 'svelte'
  import { Utilities } from '../stores';

  export let label, location, placeholder 

  let input, value = ''

  const options = {
    componentRestrictions: { country: "UK" },
    fields: ["address_components", "geometry", "name"],
  }

  $: if (location) {
    value = Utilities.getFormattedAddress(location.address_components)
  }

  onMount( async () => {  
    const autocomplete = new google.maps.places.Autocomplete(input, options)
    autocomplete.addListener('place_changed', function () {
      location = autocomplete.getPlace()
    })

  })

</script>

<label for="journey-start" class="block text-medium font-medium text-white">{label}</label>
<input 
  type="text" 
  value="{value}" 
  bind:this="{input}" 
  placeholder="{placeholder}" 
  class="block mt-1 py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-gray-500 focus:border-grey-500 border-warm-gray-300 rounded-md" 
/>