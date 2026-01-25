<script lang="ts">
	import {
		Image as ImageIcon,
		ScanText,
		ZoomIn,
		Trash2,
		CloudUpload,
		ListFilter,
		Plus,
		Clock,
		Tag,
		X,
		ArrowRight,
		Loader2
	} from 'lucide-svelte';
	import Navbar from '../../../../components/dashboard/Navbar.svelte';
	import { Toaster, toast } from 'svelte-sonner';
	import SonnerToast from '../../../../components/SonnerToast.svelte';

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

	// --- Types & State Management ---
	interface TaskItem {
		id: number;
		text: string;
		time: string;
		tag: string;
		checked: boolean;
		lowConfidence: boolean;
	}

	interface ImageItem {
		file: File;
		url: string;
		dimensions: string;
	}

	let tasks: TaskItem[] = [];
	let showOverlay = false;
	let images: ImageItem[] = [];
	let activeImageIndex = 0;
	let fileInput: HTMLInputElement | null = null;
	let isProcessing = false;
	let isSaving = false;

	// --- Derived (reactive) State ---
	let selectedCount = 0;
	$: selectedCount = tasks.filter((t) => t.checked).length;

	let currentFile: ImageItem | null = null;
	$: currentFile = images[activeImageIndex] ?? null;

	let fileName = 'No image uploaded';
	$: fileName = currentFile ? currentFile.file.name : 'No image uploaded';

	let fileSize = '0 MB';
	$: fileSize = currentFile ? (currentFile.file.size / (1024 * 1024)).toFixed(2) + ' MB' : '0 MB';

	let dimensions = '0x0';
	$: dimensions = currentFile ? currentFile.dimensions : '0x0';

	// Helper to convert File to Base64
	const toBase64 = (file: File): Promise<string> =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve((reader.result as string).split(',')[1]);
			reader.onerror = (error) => reject(error);
		});

	// Get auth token from localStorage or wherever you store it
	const getAuthToken = () => {
		// Adjust this based on your auth implementation
		return localStorage.getItem('token') || '';
	};

	// --- Actions ---
	const processFile = async (file: File) => {
		// Validate file size (warn if > 5MB since backend might have limits)
		if (file.size > 5 * 1024 * 1024) {
			notifyError(
				'File Too Large',
				'Please upload images smaller than 5MB for optimal processing.'
			);
			return;
		}

		// Add image to gallery
		const url = URL.createObjectURL(file);
		const img = new Image();
		img.onload = () => {
			const newImg: ImageItem = {
				file,
				url,
				dimensions: `${img.width}x${img.height}`
			};
			const newImages = [...images, newImg];
			images = newImages;
			activeImageIndex = newImages.length - 1;
		};
		img.src = url;

		isProcessing = true;
		try {
			const base64String = await toBase64(file);

			const response = await fetch('http://localhost:3000/ai/tool', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({
					toolType: 'DIGITIZE_OCR',
					payload: {
						image: base64String,
						mimeType: file.type
					}
				})
			});

			if (!response.ok) {
				throw new Error(`Server error: ${response.status}`);
			}

			const result = await response.json();

			if (result.status === 'success' && result.data?.tasks) {
				const newTasks = result.data.tasks.map((t: any) => ({
					id: Date.now() + Math.random(),
					text: t.text,
					time: t.time || '',
					tag: t.tag || '',
					checked: true,
					lowConfidence: t.lowConfidence || false
				}));

				// Append tasks to the existing list (immutable assignment)
				tasks = [...tasks, ...newTasks];

				notifySuccess(
					'Tasks Extracted!',
					`Found ${newTasks.length} task${newTasks.length !== 1 ? 's' : ''} from ${file.name}`
				);
			} else {
				throw new Error('No tasks found in the response');
			}
		} catch (err) {
			console.error('Auto-OCR Failed', err);
			notifyError(
				'OCR Failed',
				err instanceof Error ? err.message : 'Could not extract tasks from this image.'
			);
		} finally {
			isProcessing = false;
		}
	};

	const handleFileUpload = (e: Event) => {
		const files = (e.target as HTMLInputElement).files;
		if (files) Array.from(files).forEach(processFile);
	};

	const removeImage = (index: number) => {
		URL.revokeObjectURL(images[index].url);
		const newImages = images.filter((_, i) => i !== index);
		images = newImages;
		if (activeImageIndex >= newImages.length) activeImageIndex = Math.max(0, newImages.length - 1);
	};

	const removeTask = (id: number) => {
		tasks = tasks.filter((t) => t.id !== id);
	};

	const addTask = () => {
		const newId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
		const newTask: TaskItem = {
			id: newId,
			text: '',
			time: '',
			tag: '',
			checked: true,
			lowConfidence: false
		};
		tasks = [...tasks, newTask];
	};

	function toggleChecked(id: number, checked: boolean) {
		tasks = tasks.map((t) => (t.id === id ? { ...t, checked } : t));
	}

	const triggerUpload = () => fileInput?.click();
	const openZoom = () => {
		if (currentFile?.url) {
			window.open(currentFile.url, '_blank');
		}
	};

	// Function to save the confirmed tasks to the DB
	const confirmAndSchedule = async () => {
		const selectedTasks = tasks.filter((t) => t.checked);
		if (selectedTasks.length === 0) {
			notifyError('No Tasks Selected', 'Please select at least one task to schedule.');
			return;
		}

		isSaving = true;
		try {
			const response = await fetch('http://localhost:3000/ai/tool', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({
					toolType: 'BULK_SAVE_TASKS',
					// backend expects payload.tasks: Array<{ title: string, description?: string }>
					payload: {
						tasks: selectedTasks.map((t) => ({
							title: String(t.text || '').trim(),
							description: `time:${t.time || ''} | tag:${t.tag || ''} | lowConfidence:${!!t.lowConfidence}`
						}))
					}
				})
			});

			if (!response.ok) {
				throw new Error(`Server error: ${response.status}`);
			}

			const result = await response.json();

			if (result.status === 'success') {
				notifySuccess(
					'Tasks Scheduled!',
					`Successfully added ${selectedTasks.length} task${selectedTasks.length !== 1 ? 's' : ''} to your calendar.`
				);
				console.log(selectedTasks);
				tasks = []; // Clear list on success
				images = []; // Clear images too
			} else {
				throw new Error('Failed to save tasks');
			}
		} catch (err) {
			console.error('Save failed', err);
			notifyError(
				'Save Failed',
				err instanceof Error ? err.message : 'Could not save tasks to your calendar.'
			);
		} finally {
			isSaving = false;
		}
	};
</script>

<Navbar />

<main
	class="flex-1 flex flex-col items-center justify-start w-full px-4 py-8 md:px-8 lg:py-12 bg-background-dark text-white font-display min-h-screen"
>
	<div class="w-full max-w-[1400px] flex flex-col gap-8">
		<div
			class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-border-dark pb-6"
		>
			<div class="flex flex-col gap-2">
				<h1
					class="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white"
				>
					Digitize Task List
				</h1>
				<p class="text-slate-400 font-body text-base max-w-xl">
					Upload screenshots or photos. Our AI will extract items so you can schedule them
					instantly.
				</p>
			</div>
			<div class="flex gap-3">
				<span
					class="inline-flex items-center gap-1 px-3 py-1 bg-[#1a2634] border border-border-dark text-xs font-bold text-primary uppercase"
				>
					<ImageIcon size={14} /> JPG
				</span>
				<span
					class="inline-flex items-center gap-1 px-3 py-1 bg-[#1a2634] border border-border-dark text-xs font-bold text-primary uppercase"
				>
					<ImageIcon size={14} /> PNG
				</span>
			</div>
		</div>

		<input
			type="file"
			multiple
			accept="image/*"
			class="hidden"
			bind:this={fileInput}
			onchange={handleFileUpload}
		/>

		<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
			<div
				class="lg:col-span-5 flex flex-col gap-6 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar"
			>
				<div
					class="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm sticky top-0 bg-background-dark z-10 pb-2"
				>
					<ScanText size={16} /> Source Gallery ({images.length})
				</div>

				<div class="bg-surface-dark border-2 border-border-dark p-1 shadow-neo">
					<div
						class="relative w-full aspect-[4/3] bg-black overflow-hidden border border-border-dark group"
						onclick={() => (showOverlay = !showOverlay)}
					>
						{#if currentFile}
							<div
								class="w-full h-full bg-cover bg-center transition-opacity
    {showOverlay ? 'opacity-100' : 'opacity-90 group-hover:opacity-100'}"
								style="background-image: url({currentFile.url});"
							></div>
						{:else}
							<div class="w-full h-full flex items-center justify-center bg-[#0d1117]">
								<div class="text-center text-slate-500">
									<ImageIcon size={48} class="mx-auto mb-2 opacity-50" />
									<p class="text-sm font-bold">No image uploaded</p>
								</div>
							</div>
						{/if}

						<!-- Processing Overlay -->
						{#if isProcessing}
							<div
								class="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm"
							>
								<div class="text-center">
									<Loader2 size={40} class="text-primary animate-spin mx-auto mb-2" />
									<p class="text-white font-bold text-sm">Processing with AI...</p>
								</div>
							</div>
						{/if}

						<div
							class="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 backdrop-blur-[2px] transition-opacity
    {showOverlay ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}"
						>
							<button
								onclick={(e) => {
									e.stopPropagation();
									openZoom();
								}}
								disabled={!currentFile}
								class="flex items-center justify-center size-12 bg-white text-black hover:bg-primary hover:text-white border-2 border-black shadow-neo-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<ZoomIn size={20} />
							</button>

							{#if images.length > 0}
								<button
									onclick={(e) => {
										e.stopPropagation();
										removeImage(activeImageIndex);
									}}
									class="flex items-center justify-center size-12 bg-white text-black hover:bg-red-500 hover:text-white border-2 border-black shadow-neo-sm transition-colors cursor-pointer"
								>
									<Trash2 size={20} />
								</button>
							{/if}
						</div>

						{#if currentFile}
							<div
								class="absolute top-4 left-4 bg-green-500 text-black text-xs font-bold px-3 py-1 border-2 border-black uppercase shadow-neo-sm"
							>
								Active
							</div>
						{/if}
					</div>

					<div
						class="p-4 flex items-center justify-between bg-[#111822] mt-1 border border-border-dark"
					>
						<div class="flex flex-col">
							<span class="text-white font-bold text-sm truncate max-w-[200px]">{fileName}</span>
							<span class="text-slate-500 text-xs font-mono">{fileSize} • {dimensions}</span>
						</div>
						<button
							onclick={triggerUpload}
							disabled={isProcessing}
							class="text-xs font-bold text-primary hover:text-white uppercase tracking-wider hover:underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
							>Add More</button
						>
					</div>
				</div>

				{#if images.length > 1}
					<div class="flex gap-2 overflow-x-auto pb-2">
						{#each images as img, i}
							<button
								onclick={() => (activeImageIndex = i)}
								class="size-16 border-2 flex-shrink-0 {activeImageIndex === i
									? 'border-primary'
									: 'border-border-dark'}"
							>
								<img src={img.url} alt="thumb" class="w-full h-full object-cover" />
							</button>
						{/each}
					</div>
				{/if}

				<button
					onclick={triggerUpload}
					disabled={isProcessing}
					ondragover={(e) => e.preventDefault()}
					ondrop={(e) => {
						e.preventDefault();
						if (isProcessing) return;
						const files = e.dataTransfer?.files;
						if (files) Array.from(files).forEach(processFile);
					}}
					class="relative border-2 border-dashed border-border-dark hover:border-primary hover:bg-[#1a2634] transition-colors p-8 flex flex-col items-center justify-center text-center gap-3 cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<div
						class="p-3 bg-surface-dark rounded-full border border-border-dark group-hover:scale-110 transition-transform"
					>
						<CloudUpload class="text-slate-400 group-hover:text-primary" />
					</div>
					<div>
						<p class="text-white font-bold text-sm uppercase">
							{isProcessing ? 'Processing...' : 'Drop more files'}
						</p>
						<p class="text-slate-500 text-xs mt-1">AI will merge tasks from all images</p>
					</div>
				</button>
			</div>

			<div class="lg:col-span-7 flex flex-col h-full sticky top-8">
				<div class="flex flex-col h-full bg-surface-dark border-2 border-border-dark shadow-neo">
					<div
						class="p-5 border-b-2 border-border-dark flex items-center justify-between bg-[#111822]"
					>
						<div class="flex items-center gap-3">
							<div class="bg-primary text-white p-1 border border-white/20">
								<ListFilter size={20} />
							</div>
							<h3 class="text-xl font-bold uppercase tracking-tight">Extracted Tasks</h3>
						</div>
						<div class="flex gap-2">
							<button
								onclick={() => (tasks = [])}
								disabled={tasks.length === 0}
								class="px-3 py-1 text-xs font-bold uppercase bg-transparent border border-border-dark text-slate-400 hover:text-white hover:border-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
								>Clear All</button
							>
							<button
								onclick={addTask}
								class="flex items-center gap-1 px-3 py-1 text-xs font-bold uppercase bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
							>
								<Plus size={14} /> Add Item
							</button>
						</div>
					</div>

					<div class="flex-1 p-6 flex flex-col gap-4 overflow-y-auto max-h-[600px] bg-[#111822]">
						{#if tasks.length === 0}
							<div class="flex flex-col items-center justify-center py-12 text-center">
								<ScanText size={48} class="text-slate-600 mb-4" />
								<p class="text-slate-500 font-bold text-sm">No tasks extracted yet</p>
								<p class="text-slate-600 text-xs mt-1">Upload an image to get started</p>
							</div>
						{:else}
							{#each tasks as task (task.id)}
								<div
									class="group flex items-start gap-4 p-4 bg-surface-dark border border-border-dark hover:border-primary transition-colors shadow-sm {!task.checked
										? 'opacity-40'
										: ''}"
								>
									<div class="pt-1">
										<input
											type="checkbox"
											checked={task.checked}
											onchange={(e) =>
												toggleChecked(task.id, (e.target as HTMLInputElement).checked)}
											class="checkbox-neo"
										/>
									</div>
									<div class="flex-1 flex flex-col gap-2">
										<input
											class="w-full bg-transparent border-b-2 border-border-dark focus:border-primary text-white font-medium pb-1 outline-none transition-colors"
											type="text"
											bind:value={task.text}
										/>

										<div class="flex flex-wrap gap-3 mt-1">
											{#if task.lowConfidence}
												<div class="flex items-center gap-2">
													<span
														class="text-[10px] font-bold uppercase text-yellow-500 border border-yellow-500/50 px-1"
														>Low Confidence</span
													>
													<p class="text-[10px] text-slate-500 italic">Verify spelling</p>
												</div>
											{/if}
											{#if task.time}
												<div
													class="flex items-center gap-1 text-[10px] text-slate-400 bg-black/30 px-2 py-1 border border-border-dark"
												>
													<Clock size={10} />
													{task.time}
												</div>
											{/if}
											{#if task.tag}
												<div
													class="flex items-center gap-1 text-[10px] text-slate-400 bg-black/30 px-2 py-1 border border-border-dark"
												>
													<Tag size={10} />
													{task.tag}
												</div>
											{/if}
										</div>
									</div>
									<button
										onclick={() => removeTask(task.id)}
										class="text-slate-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
										><X size={20} /></button
									>
								</div>
							{/each}
						{/if}
					</div>

					<div class="p-6 border-t-2 border-border-dark bg-surface-dark">
						<div class="flex flex-col sm:flex-row items-center justify-between gap-4">
							<p class="text-sm text-slate-400">
								<span class="text-white font-bold">{selectedCount}</span> task{selectedCount !== 1
									? 's'
									: ''} selected for import
							</p>
							<button
								onclick={confirmAndSchedule}
								disabled={isSaving || selectedCount === 0}
								class="w-full sm:w-auto flex items-center justify-center gap-2 px-8 h-12 bg-primary hover:bg-[#1563d3] text-white font-bold uppercase tracking-wider border-2 border-transparent hover:border-white shadow-neo active:shadow-none active:translate-x-1 active:translate-y-1 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-x-0 disabled:active:translate-y-0"
							>
								{#if isSaving}
									<Loader2 size={20} class="animate-spin" />
									Saving...
								{:else}
									Confirm & Schedule <ArrowRight size={20} />
								{/if}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

<Toaster position="bottom-right" expand={false} richColors />

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 6px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: #2d3b4e;
		border-radius: 10px;
	}

	.checkbox-neo {
		appearance: none;
		background-color: transparent;
		width: 1.5em;
		height: 1.5em;
		border: 2px solid #324867;
		display: grid;
		place-content: center;
		cursor: pointer;
	}
	.checkbox-neo::before {
		content: '';
		width: 0.85em;
		height: 0.85em;
		transform: scale(0);
		transition: 120ms transform ease-in-out;
		background-color: #1973f0;
	}
	.checkbox-neo:checked::before {
		transform: scale(1);
	}
	.shadow-neo {
		box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
	}
	.shadow-neo-sm {
		box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 1);
	}
</style>
