<script>

  export let checked, label

</script>

<div class="flex items-center h-6">
  <input id="comments" aria-describedby="comments-description" name="1" type="checkbox" class="h-4 w-4 text-indigo-600  border-slate-300 rounded" bind:checked="{checked}">
</div>
<div class="ml-3">
  <label for="comments" class="text-medium font-medium text-slate-600">{label}</label>
</div>