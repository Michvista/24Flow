<script>
  import AIToolsHub from "../../components/dashboard/AIToolsHub.svelte";
  import Navbar from "../../components/dashboard/Navbar.svelte";
  import Settings from "../../components/dashboard/Settings.svelte";

  // Default view
  let activeTab = "AI Tools Hub"; 
</script>

<div>
  <Navbar bind:activeTab />

  <main>
    {#if activeTab === "AI Tools Hub"}
      <AIToolsHub />
    {:else if activeTab === "Settings"}
      <Settings />
    {/if}
  </main>
</div>