<script>

  import { onMount } from 'svelte'

  export let label, location, placeholder 

  let input, value = ''

  const options = {
    componentRestrictions: { country: "UK" },
    fields: ["address_components", "geometry", "name"],
  }

  $: if (location) {
    value = ''
    location.address_components.forEach(component => {
      const type = component.types[0]
      switch (type) {
        case "street_number": {
          value += component.long_name
          break
        }
        case "route": {
          value += ' ' + component.long_name
          break
        }
        case "postal_town": {
          value += ', ' + component.long_name
          break
        }
        case "postal_code": {
          value += ', ' + component.long_name
          break
        }
      }      
    })
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