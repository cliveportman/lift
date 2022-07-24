<script>
  
  import Tailwind from './Tailwind.svelte'
  import Sidebar from './lib/Sidebar.svelte'
  import Content from './lib/Content.svelte'

</script>

<Tailwind />

<section class="relative bg-white" aria-labelledby="contact-heading">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="relative bg-white shadow-xl">      
      <div class="grid grid-cols-1 lg:grid-cols-3">
        
        <Sidebar />
        <Content />

              
      </div>
    </div>
  </div>
</section>