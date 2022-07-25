<script>
  
  import Tailwind from './Tailwind.svelte'
  import Sidebar from './lib/Sidebar.svelte'
  import Content from './lib/Content.svelte'

</script>

<!-- Include the Tailwind CSS -->
<Tailwind />
 
<div class="grid grid-cols-1 lg:grid-cols-3">  
  <Sidebar />
  <Content />        
</div>