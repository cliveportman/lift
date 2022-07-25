<script>

  export let checked, label

</script>

<div class="flex items-center h-5">
  <input id="comments" aria-describedby="comments-description" name="1" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" bind:checked="{checked}">
</div>
<div class="ml-3">
  <label for="comments" class="text-medium font-medium text-white">{label}</label>
</div>