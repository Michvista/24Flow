<script lang="ts">
    import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-svelte';
    import { toast } from 'svelte-sonner';

    let { 
        title = "Notification", 
        message = "", 
        type = "success", 
        toastId 
    } = $props();

    const colors = {
        success: 'bg-[#1973f0]',
        error: 'bg-red-500',
        info: 'bg-[#1a2432]'
    };
</script>

<div class="flex w-[350px] items-start gap-4 border-2 border-white {colors[type] || colors.success} p-4 text-white shadow-[6px_6px_0px_0px_#000000] ring-1 ring-black/50">
    <div class="mt-1">
        {#if type === 'error'}
            <AlertTriangle size={22} />
        {:else if type === 'success'}
            <CheckCircle2 size={22} />
        {:else}
            <Info size={22} />
        {/if}
    </div>
    
    <div class="flex-1 flex flex-col gap-1">
        <h3 class="font-bold uppercase tracking-tighter text-lg leading-none">{title}</h3>
        {#if message}
            <p class="text-sm font-medium opacity-90 leading-tight">{message}</p>
        {/if}
    </div>

    <button 
        onclick={() => toast.dismiss(toastId)}
        class="hover:opacity-70 cursor-pointer p-1 transition-opacity"
    >
        <X size={18} />
    </button>
</div>