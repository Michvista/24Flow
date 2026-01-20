<script lang="ts">
    import { Loader2 } from 'lucide-svelte';
	import { Toaster, toast } from 'svelte-sonner';
		import SonnerToast from '../SonnerToast.svelte';

	function notifySuccess(title: string, message: string) {
		const id = Math.random().toString(36).substring(2, 9);

		toast.custom(SonnerToast, {
			id,
			componentProps: {
				toastId: id,
				title: title,
				message: message,
				type: 'success'
			},
			duration: 5000
		});
	}

	function notifyError(title: string, message: string) {
		const id = Math.random().toString(36).substring(2, 9);

		toast.custom(SonnerToast, {
			id,
			componentProps: {
				toastId: id,
				title: title,
				message: message,
				type: 'error'
			},
			duration: 5000
		});
	}

    let { onCancel, onAdd } = $props<{
        onCancel: () => void;
        onAdd: (task: any) => void;
    }>();

    let title = $state('');
    let description = $state('');
    let isSubmitting = $state(false);

    async function handleSubmit(e: Event) {
        e.preventDefault();
        if (title.trim() === '' || isSubmitting) return;

        isSubmitting = true;
        try {
            const res = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ title, description })
            });

            const result = await res.json();

            if (res.ok) {
                onAdd(result.data); 
                title = '';
                description = '';
				notifySuccess("Task Created", "Your new task has been created successfully.");
                onCancel(); 
            } else {
                console.error("Task creation failed", result.message);
				notifyError("Creation Failed", result.message || "Could not create task.");
            }
        } catch (err) {
            console.error("Network error", err);
			notifyError("Network Error", "Please check your connection and try again.");
        } finally {
            isSubmitting = false;
        }
    }
</script>

<div class="bg-[#0B111C] font-display text-white selection:bg-primary/30 w-full overflow-hidden">
    <main class="flex flex-col items-center py-8 px-4 sm:px-6">
        <div class="w-full max-w-xl">
            <div class="p-2 mb-6">
                <h1 class="text-white text-3xl sm:text-4xl font-black leading-tight tracking-tight">
                    New To-Do
                </h1>
            </div>

            <form onsubmit={handleSubmit} class="space-y-6">
                <div class="flex flex-col gap-2">
                    <label class="flex flex-col w-full" for="todo-title">
                        <p class="text-[#A1B4D0] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] pl-1">
                            Task Title
                        </p>
                        <input
                            id="todo-title"
                            bind:value={title}
                            autocomplete="off"
                            class="form-input w-full text-white focus:outline-0 focus:ring-4 focus:ring-[#3E63DD]/50 border-4 border-black bg-[#0C1524] h-14 placeholder:text-slate-600 p-4 text-base font-bold"
                            placeholder="What's the plan?"
                        />
                    </label>
                </div>

                <div class="flex flex-col gap-2">
                    <label class="flex flex-col w-full" for="todo-desc">
                        <p class="text-[#A1B4D0] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] pl-1">
                            Details (Optional)
                        </p>
                        <textarea
                            id="todo-desc"
                            bind:value={description}
                            class="form-textarea w-full resize-none text-white focus:outline-0 focus:ring-4 focus:ring-[#3E63DD]/50 border-4 border-black bg-[#0C1524] h-32 placeholder:text-slate-600 p-4 text-sm font-medium leading-relaxed"
                            placeholder="Add some context..."
                        ></textarea>
                    </label>
                </div>

                <div class="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        class="w-full sm:w-auto min-w-[160px] h-12 px-6 bg-[#3E63DD] text-white text-sm font-black uppercase tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {#if isSubmitting}
                            <Loader2 class="animate-spin" size={18} />
                            Creating...
                        {:else}
                            Create Task
                        {/if}
                    </button>

                    <button
                        type="button"
                        onclick={onCancel}
                        class="w-full sm:w-auto min-w-[120px] h-12 px-6 border-4 border-black bg-transparent text-[#A1B4D0] text-sm font-black uppercase tracking-wider hover:bg-black/20 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </main>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap');

    :global(.font-display) {
        font-family: 'Space Grotesk', sans-serif;
    }

    .form-input,
    .form-textarea {
        transition: all 0.2s ease;
    }

    .form-input:focus,
    .form-textarea:focus {
        border-color: #3e63dd;
    }
</style>