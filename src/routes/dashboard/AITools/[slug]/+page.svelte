<script lang="ts">
    import type { Component } from 'svelte';
    import AutoFill from '$lib/components/dashboard/AIToolsHub/AutoFill.svelte';
    import StudyTimetable from '$lib/components/dashboard/AIToolsHub/StudyTimetable.svelte';
    import Optimizer from '$lib/components/dashboard/AIToolsHub/Optimizer.svelte';
    import OverlapFixer from '$lib/components/dashboard/AIToolsHub/OverlapFixer.svelte';
    import LanguageTranscriber from '$lib/components/dashboard/AIToolsHub/LanguageTranscriber.svelte';
    import SchoolTimetableGen from '$lib/components/dashboard/AIToolsHub/SchoolTimetableGen.svelte';

    interface PostData {
        slug: string;
        title: string;
        description?: string;
    }

    interface Props {
        data: {
            post: PostData;
        };
    }

    let { data }: Props = $props();

   
    const componentMap: Record<string, Component<any>> = {
        AutoFill,
        StudyTimetable,
        Optimizer,
        OverlapFixer,
        LanguageTranscriber,
        SchoolTimetableGen
    };

    const SelectedComponent = componentMap[data.post.slug];
</script>

<div class="min-h-screen bg-[#0B111C] ">
    <div class="">
        <!-- <header class="mb-10 border-b-4 border-black pb-6">
            <h1 class="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter">
                {data.post.title}
            </h1>
            {#if data.post.description}
                <p class="text-[#A1B4D0] mt-4 text-lg max-w-2xl font-medium">
                    {data.post.description}
                </p>
            {/if}
        </header> -->

        <div class="tool-container">
            {#if SelectedComponent}
                <SelectedComponent />
            {:else}
                <div class="p-10 border-4 border-dashed border-red-500 text-red-500 font-bold uppercase text-center">
                    Tool Component Not Found: {data.post.slug}
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .tool-container {
        animation: fadeIn 0.5s ease-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>