<script>

  import { onMount } from 'svelte'
  import { Utilities, locations } from '../stores';

  // The location is bound to the locations store in the parent
  export let label, location, placeholder

  let input, value = ''

  const options = {
    componentRestrictions: { country: "UK" },
    fields: ["address_components", "geometry", "name"],
  }

  // Mainly for use with hot reload under dev, but this keeps the field populated
  $: if (location) {
    value = Utilities.getFormattedAddress(location.address_components)
  }
  
  // There's probably a better way to do this, but when the user wants to start again,
  // we listen for the locations being emptied and reset the value of this field.
  $: if ($locations.start == null && $locations.destination == null) {
    value = ''
  }

  // Wait for the input field to mount before doing anything,
  onMount( async () => {  
    const autocomplete = new google.maps.places.Autocomplete(input, options)
    // Listen for the 'place_changed' event and return the location.
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