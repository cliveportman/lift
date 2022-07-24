<script>

  import { mapsApiKey } from "../stores"
  import Autocomplete from './AutocompleteField.svelte'

  export let location, label, placeholder
  let place

  const autocompleteOptions = {
    fields: ['address_components', 'geometry'],
    types: []
  }
  let onChange = (e) => {
    location = e.detail.place // e.detail.place.geometry.location.lng())
  }
  let onReady = () => {
    //console.log('Autocomplete ready')
  } 

</script>

<label for="journey-start" class="block text-medium font-medium text-white">{label}</label>
<Autocomplete 
  apiKey="{mapsApiKey}" class="block mt-1 py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-gray-500 focus:border-grey-500 border-warm-gray-300 rounded-md"
  on:place_changed="{onChange}"
  {autocompleteOptions}
  on:ready="{onReady}"
  {placeholder}
  value="{place}"
/>