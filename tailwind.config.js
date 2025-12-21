/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			/* Fonts */
			fontFamily: {
				// Existing fonts
				robson: ['Robson', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif'],
				display: ['Space Grotesk', 'sans-serif'], // Adjusted to your existing 'display'

				// Added 'display-mono' for the retro scheduler font
				'display-mono': ['IBM Plex Mono', 'monospace']
			},

			/* Colors */
			colors: {
				/* Existing brand colors */
				'brand-primary': '#123F76',
				'brand-secondary': '#78c2Ed',
				'brand-accent': '#6F6F6F',
				'brand-accent-two': '#DCDCDC',

				/* New UI colors (Existing) */
				primary: '#3E63DD',
				'background-light': '#f6f7f8',
				'background-dark': '#0B111C',
				surface: '#0C1524',
				'border-color': '#4A5E7E',
				'text-primary': '#FFFFFF',
				'text-secondary': '#A1B4D0',

				// --- Colors from the Scheduler Design ---
				'primary-bg': '#0D1A3E',
				'primary-accent': '#3D7BFF',
				'secondary-yellow': '#F7FF5C',
				'secondary-green': '#00F57A',
				'secondary-purple': '#AF52DE',
				'off-white': '#F0F0F0'
				// ----------------------------------------
			},

			/* Shadows */
			boxShadow: {
				// Existing shadow
				neobrutalist: '5px 5px 0px 0px rgba(0,0,0,1)',

				// --- Shadows from the Scheduler Design ---
				hard: '4px 4px 0px #000000',
				'hard-light': '4px 4px 0px #F0F0F0',
				// Added for hover effects previously seen:
				'hard-hover': '5px 5px 0px #000000'
				// ------------------------------------------
			}
		}
	},
	plugins: [
		// Ensure the forms plugin is included if you plan to use it for inputs/checkboxes
		require('@tailwindcss/forms'),
		require('@tailwindcss/container-queries')
	]
};
